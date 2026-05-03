"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const passport_1 = __importDefault(require("./config/passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8001;
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use(passport_1.default.initialize());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.path}`);
    next();
});
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to User Service' });
});
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'User Service is healthy' });
});
// Auth routes
app.use('/api/v1', auth_routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack || err);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
const server = app.listen(PORT, async () => {
    console.log(`User Service running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    await (0, database_1.connectDB)();
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
exports.default = app;
