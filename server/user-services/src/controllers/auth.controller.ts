import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { users } from '../models';
import { eq, or } from 'drizzle-orm';
// @ts-ignore
import sendEmail from 'shared/utils/sendEmail';

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

    // Send verification email
    const verificationToken = jwt.sign({ userId: created.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    const verificationLink = `${process.env.AUTH_SERVICE_URL}/api/v1/auth/verify?token=${verificationToken}`;
    
    await sendEmail({
      from: 'Welcome <welcome@raorajan.pro>',
      to: email,
      subject: 'Verify your account',
      html: `<h1>Welcome to PayAI Guardian</h1><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`
    });

    res.status(201).json({ success: true, message: 'User registered. Please check your email for verification.', user: { id: created.id, email: created.email, fullName: created.fullName } });
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
      process.env.JWT_SECRET!, 
      { expiresIn: (process.env.JWT_EXPIRE as any) || '7d' }
    );

    // Check if email is verified
    if (!(user as any).isVerified) {
      const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
      const verificationLink = `${process.env.AUTH_SERVICE_URL}/api/v1/auth/verify?token=${verificationToken}`;
      
      await sendEmail({
        from: 'Security <security@raorajan.pro>',
        to: email,
        subject: 'Email Verification Reminder',
        html: `<p>Your email is not verified yet. Please verify it by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`
      });
      
      return res.json({ success: true, token, message: 'Please verify your email to unlock all features.' });
    }

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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Use shared sendEmail utility
    try {
      const resetLink = `${process.env.AUTH_SERVICE_URL}/api/v1/reset-password?token=${token}`;
      
      await sendEmail({
        from: 'Auth <auth@raorajan.pro>',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link will expire in 1 hour.</p>
        `,
      });
      return res.json({ success: true, message: 'Reset email sent' });
    } catch (sendErr) {
      console.error('email send error', sendErr);
      // dev fallback: return link so the developer can complete the flow
      const resetLink = `${process.env.AUTH_SERVICE_URL}/api/v1/reset-password?token=${token}`;
      return res.json({ success: true, resetLink, note: 'Failed to send email; reset link returned for development.' });
    }
  } catch (err) {
    console.error('forgotPassword error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    const userId = decoded.userId;
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password
    const result = await db.update(users)
      .set({ passwordHash })
      .where(eq(users.id, userId))
      .returning();

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Password reset successful. You can now log in.' });

  } catch (err) {
    console.error('resetPassword error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is missing' });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    const userId = decoded.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid token payload' });
    }

    // Update user verification status
    const result = await db.update(users)
      .set({ isVerified: true })
      .where(eq(users.id, userId))
      .returning();

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // For now, return a success message. 
    // In a real app, you might redirect to a frontend "Success" page.
    res.status(200).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #4CAF50;">Email Verified Successfully!</h1>
        <p>Your account has been verified. You can now close this window and log in.</p>
      </div>
    `);

  } catch (err) {
    console.error('verifyEmail error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
