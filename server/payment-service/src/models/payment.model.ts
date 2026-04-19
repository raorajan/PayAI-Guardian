import { pgTable, serial, varchar, decimal, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// ─── Accounts Table ─────────────────────────────────────────────
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // Linked to User Service id
  bankName: varchar('bank_name', { length: 255 }).notNull(),
  accountType: varchar('account_type', { length: 50 }).notNull(), // Checking, Savings, etc.
  last4: varchar('last4', { length: 4 }).notNull(),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('0.00').notNull(),
  currency: varchar('currency', { length: 10 }).default('USD').notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  colorTheme: varchar('color_theme', { length: 20 }).default('#00C8FF').notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Transactions Table ──────────────────────────────────────────
export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  accountId: integer('account_id').references(() => accounts.id),
  description: varchar('description', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).default('Online'),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(), // Food, Shopping, etc.
  status: varchar('status', { length: 50 }).default('approved').notNull(), // approved, blocked, received
  riskScore: integer('risk_score').default(0).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
