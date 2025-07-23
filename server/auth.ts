import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User, OTP } from './database';
import type { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

// Email configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId }, 
    JWT_SECRET, 
    {
      expiresIn: '7d',
      issuer: 'face2finance-app',
      audience: 'face2finance-users'
    }
  );
};

// Verify JWT token
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'face2finance-app',
      audience: 'face2finance-users'
    }) as { userId: string };
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};

// Generate OTP
export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // Email credentials not configured, using development mode
      return true; // For development
    }

    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Face2Finance - Password Reset OTP',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #4157ff; text-align: center;">Face2Finance</h1>
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          
          <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4157ff; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #666;">This OTP will expire in 10 minutes for security reasons.</p>
          
          <p style="color: #666;">If you didn't request this password reset, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email from Face2Finance. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};



// Middleware to authenticate requests
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      message: 'Authentication required', 
      details: 'Please log in to access this resource'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ 
      message: 'Session expired', 
      details: 'Please log in again to continue'
    });
  }

  try {
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ 
        message: 'Account not found', 
        details: 'Please contact support if this issue persists'
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      message: 'Authentication service error', 
      details: 'Please try again later'
    });
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      try {
        const user = await User.findById(decoded.userId).select('-password');
        if (user) {
          (req as any).user = user;
        }
      } catch (error) {
        console.error('Optional auth error:', error);
      }
    }
  }

  next();
};