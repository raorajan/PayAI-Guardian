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
app.set('trust proxy', 1);
const API_USER_URL = process.env.API_USER_URL || 'http://localhost:8001';
const NODE_ENV = process.env.NODE_ENV || 'development';

// 1. Helmet Configuration - Before CORS
app.use('/api-docs', helmet({ contentSecurityPolicy: false }));
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. OPTIONS Preflight Handler - MUST be first
app.use((req: Request, res: Response, next) => {
  if (req.method === 'OPTIONS') {
  const origin = req.headers.origin;
  
  // Development mode: allow any origin
  if (NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', origin || '*');
  } else {
    // Production mode: validate origin
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3002'];
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
  } else {
    next();
  }
});

// 3. CORS Middleware Configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    // Development mode: allow any origin
    if (NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Production mode: validate against allowed origins
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3002'];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma', 'Expires', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'X-Request-Id'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Swagger Documentation
const swaggerDir = path.resolve(__dirname, 'swagger');
const gatewayDocs = YAML.load(path.join(swaggerDir, 'gateway.swagger.yaml'));
const authDocs = YAML.load(path.join(swaggerDir, 'auth.swagger.yaml'));

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

// 3. Proxy Routes with CORS Header Management

// Function to process CORS headers on proxied responses
const processCorsHeaders = (headers: any, req: Request) => {
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
  } else if (origin) {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['http://localhost:3002'];
    if (allowedOrigins.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
  }
  
  headers['Access-Control-Allow-Credentials'] = 'true';
  headers['Vary'] = 'Origin';
  
  return headers;
};

// Catch-all for /api/v1 to proxy to User Service
app.use('/api/v1', proxy(API_USER_URL, {
  proxyReqPathResolver: (req) => req.originalUrl,
  preserveHostHdr: true,
  // Preserve headers
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = {
      ...proxyReqOpts.headers,
      'Origin': srcReq.headers.origin || 'http://localhost:3002',
    };
    return proxyReqOpts;
  },
  // Ensure the body is correctly forwarded after being parsed by express.json()
  proxyReqBodyDecorator: (bodyContent, srcReq) => {
    return srcReq.body && Object.keys(srcReq.body).length ? JSON.stringify(srcReq.body) : bodyContent;
  },
  // Process CORS headers on response
  userResHeaderDecorator: (headers, req) => processCorsHeaders(headers, req as Request)
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