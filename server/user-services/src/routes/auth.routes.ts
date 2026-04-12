import { Router } from 'express';
import { register, login, forgotPassword, verifyEmail, resetPassword, resendVerification, socialCallback } from '../controllers/auth.controller';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/verify', verifyEmail);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/resend-verification', resendVerification);

// Social Auth Routes
authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport.authenticate('google', { session: false }), socialCallback);

authRouter.get('/auth/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }));
authRouter.get('/auth/microsoft/callback', passport.authenticate('microsoft', { session: false }), socialCallback);

authRouter.get('/auth/apple', passport.authenticate('apple'));
authRouter.post('/auth/apple/callback', passport.authenticate('apple', { session: false }), socialCallback);

export default authRouter;
