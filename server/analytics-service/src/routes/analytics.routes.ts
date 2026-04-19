import { Router } from 'express';
import * as DashboardController from '../controllers/dashboard.controller';

const router = Router();

router.get('/dashboard/summary', DashboardController.getDashboardSummary);
router.get('/spending-stats', DashboardController.getSpendingStats);

export default router;
