"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ─── Users Table ─────────────────────────────────────────────
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    fullName: (0, pg_core_1.varchar)('full_name', { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    passwordHash: (0, pg_core_1.text)('password_hash'), // Nullable for social login users
    googleId: (0, pg_core_1.varchar)('google_id', { length: 255 }),
    appleId: (0, pg_core_1.varchar)('apple_id', { length: 255 }),
    microsoftId: (0, pg_core_1.varchar)('microsoft_id', { length: 255 }),
    isVerified: (0, pg_core_1.boolean)('is_verified').default(false),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
