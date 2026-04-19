import { Router } from 'express';
import * as FraudController from '../controllers/fraud.controller';

const router = Router();

router.get('/', FraudController.getAlerts);
router.post('/', FraudController.createAlert);
router.patch('/:id/resolve', FraudController.resolveAlert);
router.get('/metrics/:userId', FraudController.getSecurityMetrics);

export default router;
