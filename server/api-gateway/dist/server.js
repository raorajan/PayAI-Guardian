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
// 1. CORS & Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));
app.use(express_1.default.json());
// 2. Swagger Documentation
const swaggerDir = path_1.default.resolve(__dirname, 'swagger');
const gatewayDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'gateway.swagger.yaml'));
const authDocs = yamljs_1.default.load(path_1.default.join(swaggerDir, 'auth.swagger.yaml'));
const combinedDocs = {
    openapi: '3.0.0',
    info: gatewayDocs.info,
    servers: [
        ...(gatewayDocs.servers || []),
        ...(authDocs.servers || []),
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
// 3. Proxy Routes
app.use('/api/v1/auth', (0, express_http_proxy_1.default)(API_USER_URL, {
    proxyReqPathResolver: (req) => req.originalUrl
}));
app.use('/api/v1/user', (0, express_http_proxy_1.default)(API_USER_URL, {
    proxyReqPathResolver: (req) => req.originalUrl
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
