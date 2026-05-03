"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.set('trust proxy', 1);
const API_USER_URL = process.env.API_USER_URL || 'http://localhost:8001';
const API_PAYMENT_URL = process.env.API_PAYMENT_URL || 'http://localhost:8002';
const API_FRAUD_URL = process.env.API_FRAUD_URL || 'http://localhost:8003';
const API_AI_URL = process.env.API_AI_URL || 'http://localhost:8004';
const API_ANALYTICS_URL = process.env.API_ANALYTICS_URL || 'http://localhost:8006';
const API_NOTIFICATION_URL = process.env.API_NOTIFICATION_URL || 'http://localhost:8005';
const NODE_ENV = process.env.NODE_ENV || 'development';
// 1. Helmet Configuration - Before CORS
app.use('/api-docs', (0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
// 2. OPTIONS Preflight Handler - MUST be first
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        const origin = req.headers.origin;
        // Development mode: allow any origin
        if (NODE_ENV !== 'production') {
            res.header('Access-Control-Allow-Origin', origin || '*');
        }
        else {
            // Production mode: validate origin
            const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',').map(o => o.trim().toLowerCase().replace(/\/$/, '')) || ['https://payaiguardian.raorajan.pro'];
            const normalizedOrigin = origin?.trim().toLowerCase().replace(/\/$/, '');
            if (normalizedOrigin && allowedOrigins.includes(normalizedOrigin)) {
                res.header('Access-Control-Allow-Origin', origin);
            }
        }
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Cache-Control, Pragma, Expires, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Max-Age', '86400'); // 24 hours
        res.header('Vary', 'Origin');
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// 3. CORS Middleware Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Development mode: allow any origin
        if (NODE_ENV !== 'production') {
            return callback(null, true);
        }
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin)
            return callback(null, true);
        // Production mode: validate against allowed origins
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',').map(o => o.trim().toLowerCase().replace(/\/$/, '')) || ['https://payaiguardian.raorajan.pro'];
        const normalizedOrigin = origin.trim().toLowerCase().replace(/\/$/, '');
        if (allowedOrigins.indexOf(normalizedOrigin) !== -1) {
            callback(null, true);
        }
        else {
            console.error(`[CORS Error] Origin rejected: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type', 'X-Request-Id'],
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 4. Swagger Documentation
const swaggerDir = path_1.default.resolve(__dirname, 'swagger');
const gatewayDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'gateway.swagger.yaml'));
const authDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'auth.swagger.yaml'));
const aiDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'ai.swagger.yaml'));
const paymentsDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'payments.swagger.yaml'));
const fraudDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'fraud.swagger.yaml'));
const analyticsDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'analytics.swagger.yaml'));
const combinedDocs = {
    openapi: '3.0.0',
    info: gatewayDocs.info,
    servers: [
        { url: `http://localhost:${PORT}`, description: 'Local Development' },
        { url: 'https://api.payaiguardian.raorajan.pro', description: 'Production' }
    ],
    tags: [
        ...(gatewayDocs.tags || []),
        ...(authDocs.tags || []),
        ...(aiDocs.tags || []),
        ...(paymentsDocs.tags || []),
        ...(fraudDocs.tags || []),
        ...(analyticsDocs.tags || []),
    ],
    paths: {
        ...gatewayDocs.paths,
        ...authDocs.paths,
        ...aiDocs.paths,
        ...paymentsDocs.paths,
        ...fraudDocs.paths,
        ...analyticsDocs.paths,
    },
    components: {
        schemas: {
            ...(gatewayDocs.components?.schemas || {}),
            ...(authDocs.components?.schemas || {}),
            ...(aiDocs.components?.schemas || {}),
            ...(paymentsDocs.components?.schemas || {}),
            ...(fraudDocs.components?.schemas || {}),
            ...(analyticsDocs.components?.schemas || {}),
        },
        securitySchemes: {
            ...(gatewayDocs.components?.securitySchemes || {}),
            ...(authDocs.components?.securitySchemes || {}),
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
    },
    security: [{ bearerAuth: [] }]
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(combinedDocs));
const processCorsHeaders = (headers, req) => {
    delete headers['access-control-allow-origin'];
    delete headers['Access-Control-Allow-Origin'];
    delete headers['access-control-allow-credentials'];
    delete headers['Access-Control-Allow-Credentials'];
    delete headers['access-control-allow-methods'];
    delete headers['Access-Control-Allow-Methods'];
    delete headers['access-control-allow-headers'];
    delete headers['Access-Control-Allow-Headers'];
    const origin = req.headers.origin;
    if (NODE_ENV !== 'production') {
        headers['Access-Control-Allow-Origin'] = origin || '*';
    }
    else if (origin) {
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',').map(o => o.trim().toLowerCase().replace(/\/$/, '')) || ['https://payaiguardian.raorajan.pro'];
        const normalizedOrigin = origin.trim().toLowerCase().replace(/\/$/, '');
        if (allowedOrigins.includes(normalizedOrigin)) {
            headers['Access-Control-Allow-Origin'] = origin;
        }
    }
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
    return headers;
};
// Proxy error helper
const onProxyError = (err, res, target) => {
    console.error(`[Proxy Error] Connection failed to ${target}: ${err.message}`);
    res.status(503).json({
        success: false,
        message: 'Service temporarily unavailable. Please try again later.',
    });
};
// --- Proxy Routes ---
// AI Service
app.use('/api/v1/ai', (0, express_http_proxy_1.default)(API_AI_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_AI_URL),
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            'Origin': srcReq.headers.origin || 'https://payaiguardian.raorajan.pro',
        };
        return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        return srcReq.body && Object.keys(srcReq.body).length ? JSON.stringify(srcReq.body) : bodyContent;
    },
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// Payment Service
app.use('/api/v1/payments', (0, express_http_proxy_1.default)(API_PAYMENT_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_PAYMENT_URL),
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// Fraud Detection Service
app.use('/api/v1/fraud', (0, express_http_proxy_1.default)(API_FRAUD_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_FRAUD_URL),
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// Analytics Service
app.use('/api/v1/analytics', (0, express_http_proxy_1.default)(API_ANALYTICS_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_ANALYTICS_URL),
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// Notification Service
app.use('/api/v1/notifications', (0, express_http_proxy_1.default)(API_NOTIFICATION_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_NOTIFICATION_URL),
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// User Service (Catch-all for other v1 routes)
app.use('/api/v1', (0, express_http_proxy_1.default)(API_USER_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    preserveHostHdr: true,
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_USER_URL),
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            'Origin': srcReq.headers.origin || 'https://payaiguardian.raorajan.pro',
        };
        return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        return srcReq.body && Object.keys(srcReq.body).length ? JSON.stringify(srcReq.body) : bodyContent;
    },
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
app.get('/health', (0, express_http_proxy_1.default)(API_USER_URL, {
    proxyReqPathResolver: () => '/health',
    proxyErrorHandler: (err, res, next) => onProxyError(err, res, API_USER_URL)
}));
app.get('/', (req, res) => {
    res.json({ success: true, message: 'API Gateway is running' });
});
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
    console.log(`📖 Documentation available at http://localhost:${PORT}/api-docs`);
});
exports.default = app;
