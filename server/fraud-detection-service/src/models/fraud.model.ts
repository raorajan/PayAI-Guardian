import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal } from 'drizzle-orm/pg-core';

// ─── Fraud Alerts Table ──────────────────────────────────────────
export const fraudAlerts = pgTable('fraud_alerts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // critical, warning, info
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  actionTaken: varchar('action_taken', { length: 100 }), // Review, Verify, Confirm
  isResolved: boolean('is_resolved').default(false).notNull(),
  severityScore: integer('severity_score').default(0), // 0-100
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── User Security Metrics ───────────────────────────────────────
export const securityMetrics = pgTable('security_metrics', {
  userId: integer('user_id').primaryKey(),
  totalProtectedAmount: decimal('total_protected_amount', { precision: 15, scale: 2 }).default('0.00'),
  fraudAttemptsBlocked: integer('fraud_attempts_blocked').default(0),
  aiTrustScore: integer('ai_trust_score').default(95),
  avgProcessingTime: varchar('avg_processing_time', { length: 50 }).default('450ms'),
  lastAnalysisAt: timestamp('last_analysis_at').defaultNow(),
});
