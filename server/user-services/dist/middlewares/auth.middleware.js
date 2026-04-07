"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const models_1 = require("../models");
const drizzle_orm_1 = require("drizzle-orm");
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const isAuthenticatedUser = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('Authorization header is missing');
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log('Authorization token is malformed:', authHeader);
        return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }
    const token = parts[1];
    console.log('Received JWT token:', token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const rows = await database_1.db.select().from(models_1.users).where((0, drizzle_orm_1.eq)(models_1.users.id, decoded.userId));
        const user = rows?.[0];
        if (!user) {
            console.log('User not found for token:', decoded.userId);
            return res.status(401).json({ error: 'Invalid token or user not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log('JWT verification failed:', error.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.default = isAuthenticatedUser;
