import { Router } from 'express';
import { register, login, forgotPassword, verifyEmail, resetPassword, resendVerification, socialCallback, getMe } from '../controllers/auth.controller';
import passport from 'passport';
import isAuthenticatedUser from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/verify', verifyEmail);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/resend-verification', resendVerification);
authRouter.get('/auth/me', isAuthenticatedUser, getMe);

// Social Auth Routes
authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport.authenticate('google', { session: false }), socialCallback);

export default authRouter;
