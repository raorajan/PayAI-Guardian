import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { connectDB, db } from './config/database';
import { sql } from 'drizzle-orm';
import authRoutes from './routes/auth.routes';
import passport from './config/passport';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8001;
app.set('trust proxy', 1);
app.use(helmet()); 
app.use(passport.initialize());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming Request: ${req.method} ${req.path}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to User Service' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'User Service is healthy' });
});

// Auth routes
app.use('/api/v1', authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('SERVER ERROR:', err.stack || err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const server = app.listen(PORT, async () => {
  console.log(`User Service running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  await connectDB();
});


process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

export default app;
