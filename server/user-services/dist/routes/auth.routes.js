"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.register);
authRouter.post('/login', auth_controller_1.login);
authRouter.post('/logout', auth_controller_1.logout);
authRouter.post('/forgot-password', auth_controller_1.forgotPassword);
authRouter.get('/verify', auth_controller_1.verifyEmail);
authRouter.post('/reset-password', auth_controller_1.resetPassword);
authRouter.post('/resend-verification', auth_controller_1.resendVerification);
authRouter.get('/auth/me', auth_middleware_1.default, auth_controller_1.getMe);
// Social Auth Routes
authRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback', passport_1.default.authenticate('google', { session: false }), auth_controller_1.socialCallback);
authRouter.post('/google-one-tap', auth_controller_1.googleOneTap);
exports.default = authRouter;
