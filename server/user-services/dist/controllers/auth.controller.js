"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const models_1 = require("../models");
const drizzle_orm_1 = require("drizzle-orm");
// @ts-ignore
const sendEmail_1 = __importDefault(require("shared/utils/sendEmail"));
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }
        const existing = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
        if (existing?.length) {
            return res.status(409).json({ success: false, message: 'Email already registered' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const inserted = await database_1.db.insert(models_1.users).values({ fullName, email, passwordHash }).returning();
        const created = Array.isArray(inserted) ? inserted[0] : inserted;
        // Send verification email
        const verificationToken = jsonwebtoken_1.default.sign({ userId: created.id }, JWT_SECRET, { expiresIn: '24h' });
        const verificationLink = `${process.env.AUTH_SERVICE_URL}/api/v1/auth/verify?token=${verificationToken}`;
        await (0, sendEmail_1.default)({
            from: 'Welcome <welcome@raorajan.pro>',
            to: email,
            subject: 'Verify your account',
            html: `<h1>Welcome to PayAI Guardian</h1><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`
        });
        res.status(201).json({ success: true, message: 'User registered. Please check your email for verification.', user: { id: created.id, email: created.email, fullName: created.fullName } });
    }
    catch (err) {
        console.error('register error', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Missing fields' });
        const rows = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
        const user = rows?.[0];
        if (!user)
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!ok)
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
        // Check if email is verified
        if (!user.isVerified) {
            const verificationToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
            const verificationLink = `${process.env.AUTH_SERVICE_URL}/api/v1/auth/verify?token=${verificationToken}`;
            await (0, sendEmail_1.default)({
                from: 'Security <security@raorajan.pro>',
                to: email,
                subject: 'Email Verification Reminder',
                html: `<p>Your email is not verified yet. Please verify it by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`
            });
            return res.json({ success: true, token, message: 'Please verify your email to unlock all features.' });
        }
        res.json({ success: true, token });
    }
    catch (err) {
        console.error('login error', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ success: false, message: 'Missing email' });
        const rows = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.email, email));
        const user = rows?.[0];
        if (!user)
            return res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // Use shared sendEmail utility
        try {
            await (0, sendEmail_1.default)({
                from: 'Auth <auth@raorajan.pro>',
                to: email,
                subject: 'Password Reset Request',
                html: `<p>Use this token to reset your password (expires in 1 hour):</p><p><code>${token}</code></p>`,
            });
            return res.json({ success: true, message: 'Reset email sent' });
        }
        catch (sendErr) {
            console.error('email send error', sendErr);
            // dev fallback: return token so the developer can complete the flow
            return res.json({ success: true, token, note: 'Failed to send email; token returned for development.' });
        }
    }
    catch (err) {
        console.error('forgotPassword error', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.forgotPassword = forgotPassword;
