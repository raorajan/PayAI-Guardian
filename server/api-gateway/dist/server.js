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
const API_USER_URL = process.env.API_USER_URL || 'http://localhost:8001';
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
            const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
            if (origin && allowedOrigins.includes(origin)) {
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
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
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
// 2. Swagger Documentation
const swaggerDir = path_1.default.resolve(__dirname, 'swagger');
const gatewayDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'gateway.swagger.yaml'));
const authDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'auth.swagger.yaml'));
const combinedDocs = {
    openapi: '3.0.0',
    info: gatewayDocs.info,
    servers: [
        ...(gatewayDocs.servers || []),
    ],
    tags: [
        ...(gatewayDocs.tags || []),
        ...(authDocs.tags || []),
    ],
    paths: {
        ...gatewayDocs.paths,
        ...authDocs.paths,
    },
    components: {
        schemas: {
            ...(gatewayDocs.components?.schemas || {}),
            ...(authDocs.components?.schemas || {}),
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
// 3. Proxy Routes with CORS Header Management
// Function to process CORS headers on proxied responses
const processCorsHeaders = (headers, req) => {
    // Remove backend service CORS headers to prevent conflicts
    delete headers['access-control-allow-origin'];
    delete headers['Access-Control-Allow-Origin'];
    delete headers['access-control-allow-credentials'];
    delete headers['Access-Control-Allow-Credentials'];
    delete headers['access-control-allow-methods'];
    delete headers['Access-Control-Allow-Methods'];
    delete headers['access-control-allow-headers'];
    delete headers['Access-Control-Allow-Headers'];
    // Set gateway CORS headers
    const origin = req.headers.origin;
    if (NODE_ENV !== 'production') {
        headers['Access-Control-Allow-Origin'] = origin || '*';
    }
    else if (origin) {
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
        if (allowedOrigins.includes(origin)) {
            headers['Access-Control-Allow-Origin'] = origin;
        }
    }
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
    return headers;
};
// Catch-all for /api/v1 to proxy to User Service
app.use('/api/v1', (0, express_http_proxy_1.default)(API_USER_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
    // Preserve headers
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            'Origin': srcReq.headers.origin || 'http://localhost:3000',
        };
        return proxyReqOpts;
    },
    // Process CORS headers on response
    userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req)
}));
// Health Check
app.get('/', (req, res) => {
    res.json({ success: true, message: 'API Gateway is running' });
});
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
    console.log(`📖 Documentation available at http://localhost:${PORT}/api-docs`);
});
exports.default = app;
