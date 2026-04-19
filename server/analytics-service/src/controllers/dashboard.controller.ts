import { Request, Response } from 'express';
import axios from 'axios';
import awaitHandlerFactory from 'shared/middleware/awaitHandlerFactory.middleware';

// Internal service URLs (In production, these would be service names or internal IPs)
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:8002/api/v1';
const FRAUD_SERVICE_URL = process.env.FRAUD_SERVICE_URL || 'http://localhost:8003/api/v1';

export const getDashboardSummary = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId is required'
    });
  }

  try {
    // 1. Fetch Accounts and Transactions from Payment Service
    const [accountsRes, transactionsRes, alertsRes, metricsRes] = await Promise.all([
      axios.get(`${PAYMENT_SERVICE_URL}/accounts?userId=${userId}`),
      axios.get(`${PAYMENT_SERVICE_URL}/transactions?userId=${userId}&limit=6`),
      axios.get(`${FRAUD_SERVICE_URL}/fraud?userId=${userId}&isResolved=false`),
      axios.get(`${FRAUD_SERVICE_URL}/fraud/metrics/${userId}`).catch(() => ({ data: { data: null } }))
    ]);

    res.status(200).json({
      success: true,
      data: {
        accounts: accountsRes.data.data,
        recentTransactions: transactionsRes.data.data,
        activeAlerts: alertsRes.data.data,
        securityMetrics: metricsRes.data.data
      }
    });
  } catch (error: any) {
    console.error('DASHBOARD_AGGREGATION_ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to aggregate dashboard data from microservices',
      error: error.message
    });
  }
});

export const getSpendingStats = awaitHandlerFactory(async (req: Request, res: Response) => {
    const { userId } = req.query;
  
    try {
      // In a real app, this would be a specialized aggregation query in the payment-service
      const transactionsRes = await axios.get(`${PAYMENT_SERVICE_URL}/transactions?userId=${userId}`);
      const txs = transactionsRes.data.data;
  
      // Simple aggregation logic for the chart
      const categories: Record<string, number> = {};
      txs.forEach((tx: any) => {
        if (!categories[tx.category]) categories[tx.category] = 0;
        categories[tx.category] += Math.abs(parseFloat(tx.amount));
      });
  
      res.status(200).json({
        success: true,
        data: {
          categories,
          total: Object.values(categories).reduce((a, b) => a + b, 0)
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch spending stats',
        error: error.message
      });
    }
  });
