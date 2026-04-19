import { Request, Response } from 'express';
import { db } from '../config/database';
import { transactions } from '../models';
import { eq, desc } from 'drizzle-orm';
import awaitHandlerFactory from 'shared/middleware/awaitHandlerFactory.middleware';

// ─── Get All Transactions ───────────────────────────────────────
export const getTransactions = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId, accountId, limit } = req.query;
  
  const query = db.select().from(transactions).orderBy(desc(transactions.timestamp));
  
  if (userId) {
    query.where(eq(transactions.userId, Number(userId)));
  }
  
  if (accountId) {
    query.where(eq(transactions.accountId, Number(accountId)));
  }

  if (limit) {
    query.limit(Number(limit));
  }

  const result = await query;

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});

// ─── Create Transaction ──────────────────────────────────────────
export const createTransaction = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId, accountId, description, amount, category, location, riskScore, status } = req.body;

  if (!userId || !description || !amount || !category) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const inserted = await db.insert(transactions).values({
    userId: Number(userId),
    accountId: accountId ? Number(accountId) : null,
    description,
    amount: amount.toString(),
    category,
    location: location || 'Online',
    riskScore: riskScore || 0,
    status: status || 'approved'
  }).returning();

  res.status(201).json({
    success: true,
    data: inserted[0]
  });
});

// ─── Get Transaction By ID ──────────────────────────────────────
export const getTransactionById = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await db.select().from(transactions).where(eq(transactions.id, Number(id)));

  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }

  res.status(200).json({
    success: true,
    data: result[0]
  });
});
