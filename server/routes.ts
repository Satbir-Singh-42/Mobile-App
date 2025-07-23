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
  questionnaireSchema,
  insertTaskSchema,
  insertUserProgressSchema,
  insertQuizSessionSchema
} from "@shared/schema";
import { GeminiService } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB and seed questions
  connectDB().then(async () => {
    await storage.seedQuizQuestions();
  }).catch(console.error);

  // Database test endpoint
  app.get("/api/test-db", async (req: Request, res: Response) => {
    try {
      // Test MongoDB connection and database operations
      const mongoose = await import('mongoose');
      
      if (mongoose.default.connection.readyState !== 1) {
        return res.status(500).json({ 
          success: false,
          message: "MongoDB not connected",
          connectionState: mongoose.default.connection.readyState,
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
      const { User } = await import('./database');
      await User.findByIdAndDelete(createdUser._id);

      res.json({
        success: true,
        message: "MongoDB connection and operations successful",
        connectionState: mongoose.default.connection.readyState,
        database: mongoose.default.connection.name,
        host: mongoose.default.connection.host,
        port: mongoose.default.connection.port,
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
        return res.status(409).json({ 
          message: "Account already exists", 
          details: "An account with this username or email is already registered. Please try logging in instead."
        });
      }

      // Create new user
      const user = await storage.createUser(validatedData);
      const token = generateToken(user._id!);

      res.status(201).json({
        message: "Account created successfully",
        details: "Welcome to Face2Finance! You are now logged in.",
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
          message: "Invalid registration data", 
          details: "Please check all required fields are filled correctly",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Registration service unavailable", 
        details: "Please try again in a moment"
      });
    }
  });

  // Login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Find user by username or email using the storage method
      const user = await storage.getUserForLogin(username);

      if (!user) {
        return res.status(401).json({ 
          message: "Invalid username or password", 
          details: "Please check your credentials and try again"
        });
      }

      // Check password using the model's comparePassword method
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          message: "Invalid username or password", 
          details: "Please check your credentials and try again"
        });
      }

      const token = generateToken(user._id);

      res.json({
        message: "Login successful",
        details: `Welcome back, ${user.username}!`,
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
          message: "Invalid input format", 
          details: "Please check your username and password format",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Login service unavailable", 
        details: "Please try again in a moment"
      });
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

  // Update user profile
  app.put("/api/auth/profile", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const { username, email, phone } = req.body;
      
      // Check if username/email already exists for other users
      if (username) {
        const existingUser = await storage.getUserByUsername(username);
        if (existingUser && existingUser._id !== userId) {
          return res.status(409).json({ 
            message: "Username already taken", 
            details: "Please choose a different username"
          });
        }
      }
      
      if (email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser._id !== userId) {
          return res.status(409).json({ 
            message: "Email already in use", 
            details: "Please use a different email address"
          });
        }
      }
      
      const updateData: any = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ 
          message: "User not found", 
          details: "Profile could not be updated"
        });
      }
      
      res.json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone
        }
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      res.status(500).json({ 
        message: "Profile update failed", 
        details: "Please try again later"
      });
    }
  });

  // Change password
  app.put("/api/auth/change-password", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          details: "Both current and new password are required"
        });
      }
      
      // Get user with password for verification
      const user = await storage.getUserForLogin((req as any).user.username);
      if (!user) {
        return res.status(404).json({ 
          message: "User not found", 
          details: "Password could not be changed"
        });
      }
      
      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ 
          message: "Current password is incorrect", 
          details: "Please enter your current password correctly"
        });
      }
      
      // Hash new password
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      await storage.updateUser(userId, { password: hashedPassword });
      
      res.json({ 
        message: "Password changed successfully",
        details: "Your password has been updated"
      });
    } catch (error: any) {
      console.error("Password change error:", error);
      res.status(500).json({ 
        message: "Password change failed", 
        details: "Please try again later"
      });
    }
  });

  // Update questionnaire
  app.put("/api/questionnaire", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const questionnaireData = questionnaireSchema.parse({
        ...req.body,
        userId
      });

      await storage.saveQuestionnaire(questionnaireData);

      res.json({ message: "Questionnaire updated successfully" });
    } catch (error: any) {
      console.error("Questionnaire update error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid questionnaire data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update questionnaire" });
    }
  });

  // Task/Planner Routes

  // Get tasks for authenticated user
  app.get("/api/tasks", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const tasks = await storage.getTasksByUserId(userId);
      res.json({ tasks });
    } catch (error: any) {
      console.error("Get tasks error:", error);
      res.status(500).json({ 
        message: "Failed to get tasks", 
        details: "Please try again later"
      });
    }
  });

  // Create new task
  app.post("/api/tasks", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const taskData = { ...req.body, userId };
      const validatedData = insertTaskSchema.parse(taskData);
      
      const task = await storage.createTask(validatedData);
      
      res.status(201).json({
        message: "Task created successfully",
        task
      });
    } catch (error: any) {
      console.error("Create task error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid task data", 
          details: "Please check all required fields are filled correctly",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Failed to create task", 
        details: "Please try again later"
      });
    }
  });

  // Update task
  app.put("/api/tasks/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const userId = (req as any).user._id.toString();
      
      // Verify task belongs to user
      const existingTasks = await storage.getTasksByUserId(userId);
      const taskExists = existingTasks.find(task => task._id === taskId);
      
      if (!taskExists) {
        return res.status(404).json({ 
          message: "Task not found", 
          details: "Task does not exist or you don't have permission to modify it"
        });
      }
      
      const updatedTask = await storage.updateTask(taskId, req.body);
      
      if (!updatedTask) {
        return res.status(404).json({ 
          message: "Task not found", 
          details: "Task could not be updated"
        });
      }
      
      res.json({
        message: "Task updated successfully",
        task: updatedTask
      });
    } catch (error: any) {
      console.error("Update task error:", error);
      res.status(500).json({ 
        message: "Failed to update task", 
        details: "Please try again later"
      });
    }
  });

  // Delete task
  app.delete("/api/tasks/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const userId = (req as any).user._id.toString();
      
      // Verify task belongs to user
      const existingTasks = await storage.getTasksByUserId(userId);
      const taskExists = existingTasks.find(task => task._id === taskId);
      
      if (!taskExists) {
        return res.status(404).json({ 
          message: "Task not found", 
          details: "Task does not exist or you don't have permission to delete it"
        });
      }
      
      const deleted = await storage.deleteTask(taskId);
      
      if (!deleted) {
        return res.status(404).json({ 
          message: "Task not found", 
          details: "Task could not be deleted"
        });
      }
      
      res.json({
        message: "Task deleted successfully"
      });
    } catch (error: any) {
      console.error("Delete task error:", error);
      res.status(500).json({ 
        message: "Failed to delete task", 
        details: "Please try again later"
      });
    }
  });

  // AI Chat API
  app.post("/api/chat", authenticateToken, async (req: Request, res: Response) => {
    try {
      const { message, userContext } = req.body;
      const userId = (req as any).user._id.toString();
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          message: "Message is required",
          details: "Please provide a valid message"
        });
      }

      // Get user data for context
      const user = await storage.getUserById(userId);
      const questionnaire = await storage.getQuestionnaireByUserId(userId);
      
      const contextData = {
        user: user ? {
          username: user.username,
          email: user.email
        } : null,
        questionnaire,
        ...userContext
      };

      const response = await GeminiService.handleChatMessage(message, contextData);
      
      res.json({ 
        response,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        message: "Chat service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  // Daily Tip API
  app.post("/api/daily-tip", authenticateToken, async (req: Request, res: Response) => {
    try {
      const { date } = req.body;
      const userId = (req as any).user._id.toString();
      
      // Get user data and questionnaire for personalization
      const user = await storage.getUserById(userId);
      const questionnaire = await storage.getQuestionnaireByUserId(userId);
      
      if (!user) {
        return res.status(404).json({ 
          message: "User not found",
          details: "Please log in again"
        });
      }

      const userData = {
        username: user.username,
        email: user.email,
        age: questionnaire?.age,
        income: questionnaire?.income,
        goals: questionnaire?.goals,
        experience: questionnaire?.experience,
        practiceTime: questionnaire?.practiceTime,
        language: questionnaire?.language
      };

      const tip = await GeminiService.generateDailyTip(userData, date);
      
      res.json({ 
        tip,
        generated: new Date().toISOString(),
        userId
      });
    } catch (error: any) {
      console.error("Daily tip API error:", error);
      res.status(500).json({ 
        message: "Daily tip service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  // Security Alert API
  app.get("/api/security-alert", authenticateToken, async (req: Request, res: Response) => {
    try {
      const alert = await GeminiService.generateSecurityAlert();
      
      res.json({ 
        alert,
        type: "security",
        priority: "high",
        generated: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Security alert API error:", error);
      res.status(500).json({ 
        message: "Security alert service temporarily unavailable",
        alert: "Never share your OTP—even with someone claiming to be from your bank."
      });
    }
  });

  // AI Quiz Question endpoint
  app.get("/api/ai/quiz-question", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const user = await storage.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Set a timeout for AI generation (5 seconds max)
      const questionnaire = await storage.getQuestionnaireByUserId(userId);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI timeout")), 5000)
      );
      
      const aiPromise = GeminiService.generateQuizQuestion(user, questionnaire);
      
      try {
        const response = await Promise.race([aiPromise, timeoutPromise]);
        res.json(response);
      } catch (timeoutError) {
        // Return fallback immediately if AI is slow
        res.json({ 
          question: "What percentage of your income should ideally go to savings?",
          options: [
            "At least 20% of your income",
            "10% is more than enough", 
            "5% should be sufficient"
          ],
          correctAnswer: "At least 20% of your income",
          explanation: "Financial experts recommend saving at least 20% of your income for emergencies, retirement, and future goals."
        });
      }
    } catch (error) {
      console.error("AI Quiz Question Error:", error);
      res.json({ 
        question: "What is the 50/30/20 rule in budgeting?",
        options: [
          "50% needs, 30% wants, 20% savings",
          "50% savings, 30% rent, 20% food", 
          "50% investment, 30% debt, 20% rent"
        ],
        correctAnswer: "50% needs, 30% wants, 20% savings",
        explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
      });
    }
  });

  // AI Check Answer endpoint
  app.post("/api/ai/check-answer", authenticateToken, async (req: Request, res: Response) => {
    try {
      const { question, answer, correctAnswer } = req.body;
      
      const isCorrect = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
      
      res.json({ 
        isCorrect,
        feedback: isCorrect 
          ? "Great job! You got it right." 
          : `Not quite. The correct answer is: ${correctAnswer}`
      });
    } catch (error) {
      console.error("AI Check Answer Error:", error);
      res.status(500).json({ 
        isCorrect: false,
        feedback: "Unable to verify your answer at this time."
      });
    }
  });

  // Gaming Routes - User Progress and Quiz Sessions

  // Get user progress
  app.get("/api/gaming/progress", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const progress = await storage.getUserProgress(userId);
      
      res.json({ progress });
    } catch (error: any) {
      console.error("Get user progress error:", error);
      res.status(500).json({ 
        message: "Failed to get user progress", 
        details: "Please try again later"
      });
    }
  });

  // Check daily gaming notification for returning users
  app.get("/api/gaming/daily-notification", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const notification = await storage.checkDailyGamingNotification(userId);
      
      res.json({ notification });
    } catch (error: any) {
      console.error("Daily gaming notification error:", error);
      res.status(500).json({ 
        message: "Failed to check daily notification", 
        details: "Please try again later"
      });
    }
  });

  // Start quiz session
  app.post("/api/gaming/start-quiz", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const { level } = req.body;
      const currentLevel = level || 1;
      
      // Get available questions for this level (4 questions per round)
      const questions = await storage.getAvailableQuestions(userId, currentLevel, 4);
      
      if (questions.length === 0) {
        return res.status(404).json({ 
          message: "No questions available for this level", 
          details: "Please try again later"
        });
      }

      // Generate session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create new quiz session with question IDs
      const quizSession = await storage.createQuizSession({
        sessionId,
        userId,
        level: currentLevel,
        questionIds: questions.map(q => q._id!),
        answers: [],
        score: 0,
        completed: false
      });
      
      res.json({ 
        message: "Quiz session started",
        sessionId: quizSession._id,
        level: quizSession.level,
        questions: questions.map(q => ({
          id: q._id,
          question: q.question,
          options: q.options,
          explanation: q.explanation
        }))
      });
    } catch (error: any) {
      console.error("Start quiz error:", error);
      res.status(500).json({ 
        message: "Failed to start quiz", 
        details: "Please try again later"
      });
    }
  });

  // Submit quiz answer
  app.post("/api/gaming/submit-answer", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const { sessionId, questionId, selectedAnswer, level } = req.body;
      
      // Get the correct answer from the database
      const { QuizQuestion } = await import('./models/QuizQuestion');
      const question = await QuizQuestion.findById(questionId);
      
      if (!question) {
        return res.status(404).json({ 
          message: "Question not found",
          isCorrect: false
        });
      }
      
      // Check if the answer is correct
      const isCorrect = selectedAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
      
      // Mark question as answered to prevent repetition
      await storage.markQuestionAsAnswered(userId, questionId, level, isCorrect);
      
      // Update quiz session with the answer
      await storage.addQuizAnswer(sessionId, {
        questionId,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      });
      
      res.json({ 
        message: "Answer submitted",
        isCorrect,
        correctAnswer: question.correctAnswer, // Send correct answer for feedback
        explanation: question.explanation
      });
    } catch (error: any) {
      console.error("Submit answer error:", error);
      res.status(500).json({ 
        message: "Failed to submit answer", 
        details: "Please try again later",
        isCorrect: false
      });
    }
  });

  // Complete quiz session with map-based progression
  app.post("/api/gaming/complete-quiz", authenticateToken, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user._id.toString();
      const { sessionId, score, level } = req.body;
      
      // Mark quiz session as completed
      await storage.completeQuizSession(sessionId, score);
      
      // Get current progress
      const progress = await storage.getUserProgress(userId);
      if (!progress) {
        return res.status(404).json({
          message: "User progress not found",
          details: "Unable to find gaming progress for user"
        });
      }

      const currentMap = progress.currentMap || 1;
      const mapKey = currentMap.toString();
      const mapProgress = progress.mapProgress[mapKey] || { completed: false, levelsCompleted: [], pointsEarned: false };

      // Check if this level was already completed in this map (no points for repeat)
      const isRepeatLevel = mapProgress.levelsCompleted.includes(level);
      
      // Update user progress if score is passing (2/4 or higher for progression)
      if (score >= 2) {
        // Calculate XP only for new levels
        let earnedXP = isRepeatLevel ? 0 : (score * 25); // 25 XP per correct answer
        if (score === 4 && !isRepeatLevel) earnedXP += 50; // Perfect score bonus
        if (!isRepeatLevel) earnedXP += 100; // Level completion bonus

        // Update map progress
        const updatedLevelsCompleted = [...mapProgress.levelsCompleted];
        if (!updatedLevelsCompleted.includes(level)) {
          updatedLevelsCompleted.push(level);
        }

        // Check if map is completed (all 4 levels done)
        const isMapCompleted = updatedLevelsCompleted.length === 4;
        
        // Determine next level (restart from 1 if map not completed daily, or stay at 4 if completed)
        const nextLevel = isMapCompleted ? 4 : Math.min(level + 1, 4);

        // Update map progress
        const newMapProgress = {
          ...progress.mapProgress,
          [mapKey]: {
            completed: isMapCompleted,
            levelsCompleted: updatedLevelsCompleted,
            pointsEarned: !isRepeatLevel || mapProgress.pointsEarned
          }
        };

        // Update overall progress
        const completedLevels = [...progress.completedLevels];
        if (!completedLevels.includes(level)) {
          completedLevels.push(level);
        }

        const completedMaps = [...(progress.completedMaps || [])];
        if (isMapCompleted && !completedMaps.includes(currentMap)) {
          completedMaps.push(currentMap);
        }

        // Update progress in database
        await storage.updateUserProgress(userId, {
          currentLevel: nextLevel,
          currentMap,
          completedLevels,
          completedMaps,
          mapProgress: newMapProgress,
          totalScore: progress.totalScore + score,
          totalXP: progress.totalXP + earnedXP,
          lastPlayedAt: new Date()
        });
        
        res.json({ 
          message: isRepeatLevel ? "Level replayed (no bonus XP)" : "Quiz completed successfully!",
          score,
          earnedXP,
          totalXP: progress.totalXP + earnedXP,
          levelUnlocked: nextLevel,
          currentMap,
          isMapCompleted,
          isRepeatLevel,
          passed: true,
          mapStatus: isMapCompleted ? `Map ${currentMap} completed! New map unlocks daily.` : `Map ${currentMap} - Level ${nextLevel} unlocked`,
          bonusUnlocked: !isRepeatLevel
        });
      } else {
        res.json({ 
          message: "Quiz completed. Try again to unlock the next level.",
          score,
          earnedXP: 0,
          passed: false,
          currentMap,
          currentLevel: level
        });
      }
    } catch (error: any) {
      console.error("Complete quiz error:", error);
      res.status(500).json({ 
        message: "Failed to complete quiz", 
        details: "Please try again later"
      });
    }
  });

  // Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "OK", message: "Face2Finance API is running" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
