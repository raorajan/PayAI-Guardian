import { Router } from 'express';
import { register, login, forgotPassword, verifyEmail, resetPassword } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/verify', verifyEmail);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
