import { Router } from 'express';
import * as TransactionController from '../controllers/transaction.controller';

const router = Router();

router.get('/', TransactionController.getTransactions);
router.post('/', TransactionController.createTransaction);
router.get('/:id', TransactionController.getTransactionById);

export default router;
