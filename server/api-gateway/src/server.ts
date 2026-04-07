import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import proxy from 'express-http-proxy';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;
const API_USER_URL = process.env.API_USER_URL || 'http://localhost:8001';

// 1. CORS & Middlewares
// Disable CSP for /api-docs so Swagger UI can load its inline scripts/styles
app.use('/api-docs', helmet({ contentSecurityPolicy: false }));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// 2. Swagger Documentation
const swaggerDir = path.resolve(__dirname, 'swagger');
const gatewayDocs = YAML.load(path.join(swaggerDir, 'gateway.swagger.yaml'));
const authDocs = YAML.load(path.join(swaggerDir, 'auth.swagger.yaml'));

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedDocs));

// 3. Proxy Routes
// Catch-all for /api/v1 to proxy to User Service
app.use('/api/v1', proxy(API_USER_URL, {
  proxyReqPathResolver: (req) => req.originalUrl
}));

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
  console.log(`📖 Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;