import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { users } from '../models';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

export interface AuthRequest extends Request {
  user?: any;
}

const isAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const rows = await db.select().from(users).where(eq(users.id, decoded.userId));
    const user = rows?.[0];

    if (!user) {
      console.log('User not found for token:', decoded.userId);
      return res.status(401).json({ error: 'Invalid token or user not found' });
    }

    (req as AuthRequest).user = user;
    next();
  } catch (error: any) {
    console.log('JWT verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default isAuthenticatedUser;
