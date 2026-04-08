"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const models_1 = require("../models");
const drizzle_orm_1 = require("drizzle-orm");
const sendEmail_1 = __importDefault(require("shared/utils/sendEmail"));
const awaitHandlerFactory_middleware_1 = __importDefault(require("shared/middleware/awaitHandlerFactory.middleware"));
exports.register = (0, awaitHandlerFactory_middleware_1.default)(async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Missing required fields'
        });
    }
    const existing = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
    if (existing?.length) {
        return res.status(409).json({
            statusCode: 409,
            success: false,
            message: 'Email already registered'
        });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const inserted = await database_1.db.insert(models_1.users).values({ fullName, email, passwordHash }).returning();
    const created = Array.isArray(inserted) ? inserted[0] : inserted;
    // Send verification email
    const verificationToken = jsonwebtoken_1.default.sign({ userId: created.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    await (0, sendEmail_1.default)({
        from: 'Welcome To PayAI <welcome@raorajan.pro>',
        to: email,
        subject: 'Verify Your PayAI Guardian Account',
        html: `<h1>Welcome to PayAI Guardian</h1><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email Address</a>`
    });
    res.status(201).json({
        statusCode: 201,
        success: true,
        message: 'User registered successfully. Please check your email for verification.',
        data: {
            user: {
                id: created.id,
                email: created.email,
                fullName: created.fullName,
                isVerified: created.isVerified,
                createdAt: created.createdAt
            }
        }
    });
});
exports.login = (0, awaitHandlerFactory_middleware_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Email and password are required'
        });
    }
    const rows = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
    const user = rows?.[0];
    if (!user) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: 'Invalid email or password'
        });
    }
    const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({
            statusCode: 401,
            success: false,
            message: 'Invalid email or password'
        });
    }
    // Check if email is verified - Block login if not verified
    if (!user.isVerified) {
        // Generate verification token and link
        const verificationToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
        // Send verification email
        await (0, sendEmail_1.default)({
            from: 'Security PayAI <security@raorajan.pro>',
            to: email,
            subject: 'Verify Your Email - PayAI Guardian',
            html: `
        <h1>Email Verification Required - PayAI Guardian</h1>
        <p>Your email is not verified yet. Please verify your email to login:</p>
        <a href="${verificationLink}">Verify Email Address</a>
        <p>This link will expire in 24 hours.</p>
      `
        });
        return res.status(403).json({
            statusCode: 403,
            success: false,
            message: 'Email not verified. Please verify your email to login. A verification email has been sent.',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    isVerified: user.isVerified
                },
                verificationLink: process.env.NODE_ENV === 'development' ? verificationLink : undefined
            }
        });
    }
    // Generate token only for verified users
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: {
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isVerified: user.isVerified,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
    });
});
exports.forgotPassword = (0, awaitHandlerFactory_middleware_1.default)(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Email is required'
        });
    }
    const rows = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
    const user = rows?.[0];
    if (!user) {
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'If that email exists, a password reset link has been sent'
        });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Use shared sendEmail utility
    try {
        const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        await (0, sendEmail_1.default)({
            from: 'Auth PayAI <auth@raorajan.pro>',
            to: email,
            subject: 'Password Reset - PayAI Guardian',
            html: `
        <h1>Password Reset - PayAI Guardian</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Your Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
        });
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Password reset email sent successfully'
        });
    }
    catch (sendErr) {
        console.error('email send error', sendErr);
        // dev fallback: return link so the developer can complete the flow
        const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Failed to send email; reset link returned for development.',
            data: { resetLink }
        });
    }
});
exports.resetPassword = (0, awaitHandlerFactory_middleware_1.default)(async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Token and new password are required'
        });
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Invalid token'
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
        // Update user password
        const result = await database_1.db.update(models_1.users)
            .set({ passwordHash, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(models_1.users.id, userId))
            .returning();
        if (!result || result.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Password reset successful. You can now log in with your new password.'
        });
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Reset token has expired. Please request a new one.'
            });
        }
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Invalid reset token'
        });
    }
});
exports.verifyEmail = (0, awaitHandlerFactory_middleware_1.default)(async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Verification token is required'
        });
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Invalid token payload'
            });
        }
        // Update user verification status
        const result = await database_1.db.update(models_1.users)
            .set({ isVerified: true, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(models_1.users.id, userId))
            .returning();
        if (!result || result.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Email verified successfully. You can now log in.',
            data: {
                user: {
                    id: result[0].id,
                    email: result[0].email,
                    fullName: result[0].fullName,
                    isVerified: result[0].isVerified
                }
            }
        });
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Verification token has expired. Please request a new one.'
            });
        }
        return res.status(400).json({
            statusCode: 400,
            success: false,
            message: 'Invalid verification token'
        });
    }
});
