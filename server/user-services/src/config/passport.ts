import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as AppleStrategy } from 'passport-apple';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { db } from './database';
import { users } from '../models';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
      callbackURL: `${process.env.AUTH_SERVICE_URL}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
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

// Microsoft Strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID || 'dummy',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || 'dummy',
      callbackURL: `${process.env.AUTH_SERVICE_URL}/api/v1/auth/microsoft/callback`,
      scope: ['user.read'],
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const email = profile.emails?.[0].value || profile.userPrincipalName;
        if (!email) return done(new Error('No email found in Microsoft profile'));

        let existing = await db.select().from(users).where(eq(users.microsoftId, profile.id));
        if (existing.length) return done(null, existing[0]);

        existing = await db.select().from(users).where(eq(users.email, email));
        if (existing.length) {
          const updated = await db.update(users)
            .set({ microsoftId: profile.id, isVerified: true })
            .where(eq(users.id, existing[0].id))
            .returning();
          return done(null, updated[0]);
        }

        const inserted = await db.insert(users).values({
          fullName: profile.displayName || 'Microsoft User',
          email,
          microsoftId: profile.id,
          isVerified: true,
        }).returning();
        return done(null, inserted[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Note: Apple strategy requires more complex config (Certificates, etc.)
// We implement the structure, but user will need to provide valid credentials.
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID || 'dummy',
      teamID: process.env.APPLE_TEAM_ID || 'dummy',
      keyID: process.env.APPLE_KEY_ID || 'dummy',
      privateKeyString: process.env.APPLE_PRIVATE_KEY || 'dummy',
      callbackURL: `${process.env.AUTH_SERVICE_URL}/api/v1/auth/apple/callback`,
      passReqToCallback: true,
    },
    async (req: any, accessToken: any, refreshToken: any, idToken: any, profile: any, done: any) => {
       // Apple doesn't provide profile on subsequent logins, only on first.
       // idToken contains the email.
       try {
         const decoded: any = idToken ? JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString()) : {};
         const email = decoded.email;
         const appleId = decoded.sub;

         if (!appleId) return done(new Error('No Apple ID found'));

         let existing = await db.select().from(users).where(eq(users.appleId, appleId));
         if (existing.length) return done(null, existing[0]);

         if (email) {
           existing = await db.select().from(users).where(eq(users.email, email));
           if (existing.length) {
             const updated = await db.update(users)
               .set({ appleId, isVerified: true })
               .where(eq(users.id, existing[0].id))
               .returning();
             return done(null, updated[0]);
           }
         }

         const inserted = await db.insert(users).values({
           fullName: (req.body?.user ? JSON.parse(req.body.user).name?.firstName : 'Apple User') || 'Apple User',
           email: email || `apple_${appleId}@privaterelay.appleid.com`,
           appleId,
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
