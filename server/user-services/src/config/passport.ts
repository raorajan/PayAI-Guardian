import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from './database';
import { users } from '../models';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const googleCallbackURL = (() => {
  const baseUrl = (process.env.AUTH_SERVICE_URL || 'http://localhost:8000').replace(/\/$/, '');
  // If baseUrl already ends with the callback path, don't append it again
  if (baseUrl.endsWith('/api/v1/auth/google/callback')) {
    return baseUrl;
  }
  return `${baseUrl}/api/v1/auth/google/callback`;
})();

console.log('--- PASSPORT GOOGLE STRATEGY INITIALIZED ---');
console.log('Callback URL:', googleCallbackURL);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || 'dummy',
      clientSecret: process.env.CLIENT_SECRET || 'dummy',
      callbackURL: googleCallbackURL,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log('--- GOOGLE AUTH CALLBACK RECEIVED ---');
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error('No email found in Google profile'));

        // Check if user exists by googleId
        let existing = await db.select().from(users).where(eq(users.googleId, profile.id));
        
        if (existing.length) {
          return done(null, existing[0]);
        }

        // Check if user exists by email (link account)
        existing = await db.select().from(users).where(eq(users.email, email));
        if (existing.length) {
          const updated = await db.update(users)
            .set({ googleId: profile.id, isVerified: true })
            .where(eq(users.id, existing[0].id))
            .returning();
          return done(null, updated[0]);
        }

        // Create new user
        const inserted = await db.insert(users).values({
          fullName: profile.displayName || 'Google User',
          email,
          googleId: profile.id,
          isVerified: true,
        }).returning();
        
        return done(null, inserted[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
