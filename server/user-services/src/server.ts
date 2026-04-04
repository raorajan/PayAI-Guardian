import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8001;
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to User Service' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
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
