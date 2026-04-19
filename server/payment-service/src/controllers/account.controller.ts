import { Request, Response } from 'express';
import { db } from '../config/database';
import { accounts } from '../models';
import { eq } from 'drizzle-orm';
import awaitHandlerFactory from 'shared/middleware/awaitHandlerFactory.middleware';
// ─── Get All Accounts ───────────────────────────────────────────
export const getAccounts = awaitHandlerFactory(async (req: Request, res: Response) => {
  // In a real app, we'd filter by req.user.id
  const { userId } = req.query;
  
  const query = db.select().from(accounts);
  if (userId) {
    query.where(eq(accounts.userId, Number(userId)));
  }

  const result = await query;

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// ─── Create Account ──────────────────────────────────────────────
export const createAccount = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { bankName, accountType, last4, balance, colorTheme, userId } = req.body;

  if (!bankName || !accountType || !last4 || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const inserted = await db.insert(accounts).values({
    userId: Number(userId),
    bankName,
    accountType,
    last4,
    balance: balance || '0.00',
    colorTheme: colorTheme || '#00C8FF',
    isDefault: req.body.isDefault || false
  }).returning();

  res.status(201).json({
    success: true,
    data: inserted[0]
  });
});

// ─── Get Account By ID ──────────────────────────────────────────
export const getAccountById = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await db.select().from(accounts).where(eq(accounts.id, Number(id)));

  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: 'Account not found'
    });
  }

  res.status(200).json({
    success: true,
    data: result[0]
  });
});
