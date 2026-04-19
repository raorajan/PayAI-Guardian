import { Router } from 'express';
import * as AccountController from '../controllers/account.controller';

const router = Router();

router.get('/', AccountController.getAccounts);
router.post('/', AccountController.createAccount);
router.get('/:id', AccountController.getAccountById);

export default router;
