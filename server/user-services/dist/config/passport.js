"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const database_1 = require("./database");
const models_1 = require("../models");
const drizzle_orm_1 = require("drizzle-orm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID || 'dummy',
    clientSecret: process.env.CLIENT_SECRET || 'dummy',
    callbackURL: googleCallbackURL,
    passReqToCallback: true,
    proxy: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    console.log('--- GOOGLE AUTH CALLBACK RECEIVED ---');
    try {
        const email = profile.emails?.[0].value;
        if (!email)
            return done(new Error('No email found in Google profile'));
        // Check if user exists by googleId
        let existing = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.googleId, profile.id));
        if (existing.length) {
            return done(null, existing[0]);
        }
        // Check if user exists by email (link account)
        existing = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
        if (existing.length) {
            const updated = await database_1.db.update(models_1.users)
                .set({ googleId: profile.id, isVerified: true })
                .where((0, drizzle_orm_1.eq)(models_1.users.id, existing[0].id))
                .returning();
            return done(null, updated[0]);
        }
        // Create new user
        const inserted = await database_1.db.insert(models_1.users).values({
            fullName: profile.displayName || 'Google User',
            email,
            googleId: profile.id,
            isVerified: true,
        }).returning();
        return done(null, inserted[0]);
    }
    catch (err) {
        return done(err);
    }
}));
exports.default = passport_1.default;
