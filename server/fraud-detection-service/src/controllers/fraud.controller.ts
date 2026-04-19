import { Request, Response } from 'express';
import { db } from '../config/database';
import { fraudAlerts, securityMetrics } from '../models';
import { eq, desc } from 'drizzle-orm';
import awaitHandlerFactory from 'shared/middleware/awaitHandlerFactory.middleware';

// ─── Get All Alerts ─────────────────────────────────────────────
export const getAlerts = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId, isResolved } = req.query;
  
  const query = db.select().from(fraudAlerts).orderBy(desc(fraudAlerts.createdAt));
  
  if (userId) {
    query.where(eq(fraudAlerts.userId, Number(userId)));
  }
  
  if (isResolved !== undefined) {
    query.where(eq(fraudAlerts.isResolved, isResolved === 'true'));
  }

  const result = await query;

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// ─── Create Alert ───────────────────────────────────────────────
export const createAlert = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId, type, title, description, actionTaken, severityScore } = req.body;

  if (!userId || !type || !title || !description) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const inserted = await db.insert(fraudAlerts).values({
    userId: Number(userId),
    type,
    title,
    description,
    actionTaken: actionTaken || 'Review',
    severityScore: severityScore || 0,
    isResolved: false
  }).returning();

  res.status(201).json({
    success: true,
    data: inserted[0]
  });
});

// ─── Resolve Alert ──────────────────────────────────────────────
export const resolveAlert = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await db.update(fraudAlerts)
    .set({ isResolved: true, updatedAt: new Date() })
    .where(eq(fraudAlerts.id, Number(id)))
    .returning();

  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: 'Alert not found'
    });
  }

  res.status(200).json({
    success: true,
    data: result[0]
  });
});

// ─── Get Security Metrics ───────────────────────────────────────
export const getSecurityMetrics = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await db.select().from(securityMetrics).where(eq(securityMetrics.userId, Number(userId)));

  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: 'Security metrics not found for this user'
    });
  }

  res.status(200).json({
    success: true,
    data: result[0]
  });
});
