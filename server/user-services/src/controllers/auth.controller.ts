import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { users } from '../models';
import { eq, or } from 'drizzle-orm';
import sendEmail from 'shared/utils/sendEmail';
import awaitHandlerFactory from 'shared/middleware/awaitHandlerFactory.middleware';

export const register = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Missing required fields' 
    });
  }

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing?.length) {
    return res.status(409).json({ 
      statusCode: 409,
      success: false, 
      message: 'Email already registered' 
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const inserted = await db.insert(users).values({ fullName, email, passwordHash }).returning();
  const created = Array.isArray(inserted) ? inserted[0] : inserted;

  // Send verification email
  const verificationToken = jwt.sign({ userId: created.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
  
  await sendEmail({
    from: 'Welcome To PayAI <welcome@raorajan.pro>',
    to: email,
    subject: 'Verify Your PayAI Guardian Account',
    html: `<h1>Welcome to PayAI Guardian</h1><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email Address</a>`
  });

  res.status(201).json({ 
    statusCode: 201,
    success: true, 
    message: 'User registered successfully. Please check your email for verification.',
    data: { 
      user: { 
        id: created.id, 
        email: created.email, 
        fullName: created.fullName,
        isVerified: created.isVerified,
        createdAt: created.createdAt
      } 
    } 
  });
});

export const login = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Email and password are required' 
    });
  }

  const rows = await db.select().from(users).where(eq(users.email, email));
  const user = rows?.[0];
  if (!user) {
    return res.status(401).json({ 
      statusCode: 401,
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  if (!user.passwordHash) {
    return res.status(401).json({ 
      statusCode: 401,
      success: false, 
      message: 'This account uses social login. Please sign in with Google.' 
    });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ 
      statusCode: 401,
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  // Check if email is verified - Block login if not verified
  if (!(user as any).isVerified) {
    // Generate verification token and link
    const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    
    // Send verification email
    await sendEmail({
      from: 'Security PayAI <security@raorajan.pro>',
      to: email,
      subject: 'Verify Your Email - PayAI Guardian',
      html: `
        <h1>Email Verification Required - PayAI Guardian</h1>
        <p>Your email is not verified yet. Please verify your email to login:</p>
        <a href="${verificationLink}">Verify Email Address</a>
        <p>This link will expire in 24 hours.</p>
      `
    });
    
    return res.status(403).json({ 
      statusCode: 403,
      success: false, 
      message: 'Email not verified. Please verify your email to login. A verification email has been sent.',
      data: { 
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          isVerified: user.isVerified
        },
        verificationLink: process.env.NODE_ENV === 'development' ? verificationLink : undefined
      } 
    });
  }

  // Generate token only for verified users
  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    process.env.JWT_SECRET!, 
    { expiresIn: (process.env.JWT_EXPIRE as any) || '7d' }
  );

  res.status(200).json({ 
    statusCode: 200,
    success: true, 
    message: 'Login successful',
    data: { 
      token,
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName,
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    } 
  });
});

export const forgotPassword = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Email is required' 
    });
  }

  const rows = await db.select().from(users).where(eq(users.email, email));
  const user = rows?.[0];
  if (!user) {
    return res.status(200).json({ 
      statusCode: 200,
      success: true, 
      message: 'If that email exists, a password reset link has been sent' 
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Use shared sendEmail utility
  try {
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    
    await sendEmail({
      from: 'Auth PayAI <auth@raorajan.pro>',
      to: email,
      subject: 'Password Reset - PayAI Guardian',
      html: `
        <h1>Password Reset - PayAI Guardian</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Your Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });
    return res.status(200).json({ 
      statusCode: 200,
      success: true, 
      message: 'Password reset email sent successfully' 
    });
  } catch (sendErr) {
    console.error('email send error', sendErr);
    // dev fallback: return link so the developer can complete the flow
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    return res.status(200).json({ 
      statusCode: 200,
      success: true, 
      message: 'Failed to send email; reset link returned for development.',
      data: { resetLink }
    });
  }
});

export const resetPassword = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Token and new password are required' 
    });
  }

  try {
    // Verify token
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(400).json({ 
        statusCode: 400,
        success: false, 
        message: 'Invalid token' 
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password
    const result = await db.update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    if (!result || result.length === 0) {
      return res.status(404).json({ 
        statusCode: 404,
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({ 
      statusCode: 200,
      success: true, 
      message: 'Password reset successful. You can now log in with your new password.' 
    });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ 
        statusCode: 400,
        success: false, 
        message: 'Reset token has expired. Please request a new one.' 
      });
    }
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Invalid reset token' 
    });
  }
});

export const verifyEmail = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Verification token is required' 
    });
  }

  try {
    // Verify token
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(400).json({ 
        statusCode: 400,
        success: false, 
        message: 'Invalid token payload' 
      });
    }

    // Update user verification status
    const result = await db.update(users)
      .set({ isVerified: true, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    if (!result || result.length === 0) {
      return res.status(404).json({ 
        statusCode: 404,
        success: false, 
        message: 'User not found' 
      });
    }

    // Generate token for auto-login after verification
    const loginToken = jwt.sign(
      { userId: result[0].id, email: result[0].email }, 
      process.env.JWT_SECRET!, 
      { expiresIn: (process.env.JWT_EXPIRE as any) || '7d' }
    );

    res.status(200).json({ 
      statusCode: 200,
      success: true, 
      message: 'Email verified successfully. Logging you in...',
      data: {
        token: loginToken,
        user: {
          id: result[0].id,
          email: result[0].email,
          fullName: result[0].fullName,
          isVerified: result[0].isVerified
        }
      }
    });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ 
        statusCode: 400,
        success: false, 
        message: 'Verification token has expired. Please request a new one.' 
      });
    }
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Invalid verification token' 
    });
  }
});

export const resendVerification = awaitHandlerFactory(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Email is required' 
    });
  }

  const rows = await db.select().from(users).where(eq(users.email, email));
  const user = rows?.[0];
  
  if (!user) {
    return res.status(404).json({ 
      statusCode: 404,
      success: false, 
      message: 'User not found' 
    });
  }

  if (user.isVerified) {
    return res.status(400).json({ 
      statusCode: 400,
      success: false, 
      message: 'Email is already verified' 
    });
  }

  // Generate verification token and link
  const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
  
  // Send verification email
  await sendEmail({
    from: 'Security PayAI <security@raorajan.pro>',
    to: email,
    subject: 'Resend: Verify Your Email - PayAI Guardian',
    html: `
      <h1>Verify Your Email - PayAI Guardian</h1>
      <p>You requested to resend the verification email. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email Address</a>
      <p>This link will expire in 24 hours.</p>
    `
  });

  res.status(200).json({ 
    statusCode: 200,
    success: true, 
    message: 'Verification email sent successfully' 
  });
});

export const socialCallback = awaitHandlerFactory(async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL}/auth?error=Social login failed`);
  }

  // Generate token for social login
  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    process.env.JWT_SECRET!, 
    { expiresIn: (process.env.JWT_EXPIRE as any) || '7d' }
  );

  // Redirect to frontend with token in URL (frontend will parse and store it)
  res.redirect(`${process.env.FRONTEND_URL}/auth?token=${token}`);
});

export const getMe = awaitHandlerFactory(async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      success: false,
      message: 'User profile not found'
    });
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Profile fetched successfully',
    data: {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  });
});
