import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { users } from '../models';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing?.length) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const inserted = await db.insert(users).values({ fullName, email, passwordHash }).returning();
    const created = Array.isArray(inserted) ? inserted[0] : inserted;

    res.status(201).json({ success: true, user: { id: created.id, email: created.email, fullName: created.fullName } });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

    const rows = await db.select().from(users).where(eq(users.email, email));
    const user = rows?.[0];
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: (process.env.JWT_EXPIRE as any) || '7d' }
    );
    res.json({ success: true, token });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Missing email' });

    const rows = await db.select().from(users).where(eq(users.email, email));
    const user = rows?.[0];
    if (!user) return res.status(200).json({ success: true, message: 'If that email exists, a reset link has been sent' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // If Resend API key provided, try to send an email. Otherwise return token in response (dev mode).
    const resendApiKey = process.env.RESEND_EMAIL_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'no-reply@example.com',
          to: email,
          subject: 'Password reset',
          html: `<p>Use this token to reset your password (expires in 1 hour):</p><p><code>${token}</code></p>`,
        });
        return res.json({ success: true, message: 'Reset email sent' });
      } catch (sendErr) {
        console.error('email send error', sendErr);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      }
    }

    // dev fallback: return token so the developer can complete the flow
    res.json({ success: true, token, note: 'No RESEND_API_KEY configured; token returned for development.' });
  } catch (err) {
    console.error('forgotPassword error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
