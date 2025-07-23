import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { connectDB } from "./database";
import { 
  generateToken, 
  generateOTP, 
  sendOTPEmail,
  authenticateToken 
} from "./auth";
import { 
  insertUserSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  verifyOtpSchema,
  resetPasswordSchema,
  questionnaireSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB (non-blocking)
  connectDB().catch(console.error);

  // Database test endpoint
  app.get("/api/test-db", async (req: Request, res: Response) => {
    try {
      // Test MongoDB connection and database operations
      const mongoose = require('mongoose');
      
      if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ 
          success: false,
          message: "MongoDB not connected",
          connectionState: mongoose.connection.readyState,
          states: {
            0: "disconnected",
            1: "connected", 
            2: "connecting",
            3: "disconnecting"
          }
        });
      }

      // Test database operations
      const testUser = {
        username: `test_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        phone: "1234567890",
        password: "testpass123"
      };

      // Create a test user to verify database write operations
      const createdUser = await storage.createUser(testUser);
      
      // Verify read operations  
      const retrievedUser = await storage.getUserById(createdUser._id!);
      
      // Clean up test user
      const { User } = require('./database');
      await User.findByIdAndDelete(createdUser._id);

      res.json({
        success: true,
        message: "MongoDB connection and operations successful",
        connectionState: mongoose.connection.readyState,
        database: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        testResults: {
          userCreated: !!createdUser,
          userRetrieved: !!retrievedUser,
          idsMatch: createdUser._id === retrievedUser?._id
        }
      });

    } catch (error: any) {
      console.error("Database test error:", error);
      res.status(500).json({ 
        success: false,
        message: "Database test failed",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

  // Authentication Routes

  // Register/Signup
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByUsername = await storage.getUserByUsername(validatedData.username);
      const existingUserByEmail = await storage.getUserByEmail(validatedData.email);

      if (existingUserByUsername || existingUserByEmail) {
        return res.status(400).json({ 
          message: "User with this username or email already exists" 
        });
      }

      // Create new user
      const user = await storage.createUser(validatedData);
      const token = generateToken(user._id!);

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone
        },
        token
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Find user by username or email using the storage method
      const user = await storage.getUserForLogin(username);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password using the model's comparePassword method
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id);

      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone
        },
        token
      });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Forgot Password - Send OTP
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User with this email not found" });
      }

      // Generate and send OTP
      const otp = generateOTP();
      const otpStored = await storage.storeOTP(email, otp);
      
      if (!otpStored) {
        return res.status(500).json({ message: "Failed to generate OTP" });
      }

      const emailSent = await sendOTPEmail(email, otp);
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send OTP email" });
      }

      res.json({ 
        message: "OTP sent to your email address",
        email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // Mask email for security
      });
    } catch (error: any) {
      console.error("Forgot password error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to process forgot password request" });
    }
  });

  // Verify OTP
  app.post("/api/auth/verify-otp", async (req: Request, res: Response) => {
    try {
      const { email, otp } = verifyOtpSchema.parse(req.body);
      
      const isValid = await storage.verifyOTP(email, otp);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Generate a temporary token for password reset
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = generateToken(user._id!.toString());

      res.json({ 
        message: "OTP verified successfully",
        resetToken
      });
    } catch (error: any) {
      console.error("OTP verification error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "OTP verification failed" });
    }
  });

  // Reset Password
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = resetPasswordSchema.parse(req.body);
      
      // Verify token (this should be the reset token from OTP verification)
      const authHeader = req.headers.authorization;
      const resetToken = authHeader && authHeader.split(' ')[1];
      
      if (!resetToken) {
        return res.status(401).json({ message: "Reset token required" });
      }

      // For simplicity, we'll use the same token verification function
      // In production, you might want a separate reset token system
      const decoded = require('./auth').verifyToken(resetToken);
      if (!decoded) {
        return res.status(403).json({ message: "Invalid or expired reset token" });
      }

      // Update password
      const user = await storage.getUserById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await storage.updateUser(decoded.userId, { password: hashedPassword });

      res.json({ message: "Password reset successfully" });
    } catch (error: any) {
      console.error("Password reset error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Password reset failed" });
    }
  });

  // Protected Routes

  // Get current user
  app.get("/api/auth/me", authenticateToken, async (req: Request, res: Response) => {
    res.json({ user: (req as any).user });
  });

  // Save questionnaire
  app.post("/api/questionnaire", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const questionnaireData = questionnaireSchema.parse({
        ...req.body,
        userId
      });

      await storage.saveQuestionnaire(questionnaireData);

      res.json({ message: "Questionnaire saved successfully" });
    } catch (error: any) {
      console.error("Questionnaire save error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid questionnaire data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to save questionnaire" });
    }
  });

  // Get questionnaire
  app.get("/api/questionnaire", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const questionnaire = await storage.getQuestionnaireByUserId(userId);

      if (!questionnaire) {
        return res.status(404).json({ message: "Questionnaire not found" });
      }

      res.json({ questionnaire });
    } catch (error) {
      console.error("Get questionnaire error:", error);
      res.status(500).json({ message: "Failed to get questionnaire" });
    }
  });

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "OK", message: "Face2Finance API is running" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
