import { z } from "zod";

// User Schema for MongoDB
export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6),
  isVerified: z.boolean().default(false),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const insertUserSchema = userSchema.omit({
  _id: true,
  isVerified: true,
  createdAt: true,
  updatedAt: true,
});

// Quiz Question Schema for MongoDB
export const quizQuestionSchema = z.object({
  _id: z.string().optional(),
  level: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
  category: z.string().default("financial_literacy"),
  difficulty: z.string().default("medium"),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
});

export const insertQuizQuestionSchema = quizQuestionSchema.omit({
  _id: true,
  createdAt: true,
});

// User Answered Questions Schema (to prevent repetition)
export const userAnsweredQuestionSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  questionId: z.string(),
  level: z.number(),
  isCorrect: z.boolean(),
  answeredAt: z.date().default(() => new Date()),
});

export const insertUserAnsweredQuestionSchema = userAnsweredQuestionSchema.omit({
  _id: true,
  answeredAt: true,
});

// User Progress Schema for Gaming
export const userProgressSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  currentLevel: z.number().default(1),
  currentMap: z.number().default(1),
  completedLevels: z.array(z.number()).default([]),
  completedMaps: z.array(z.number()).default([]),
  mapProgress: z.record(z.object({
    completed: z.boolean().default(false),
    levelsCompleted: z.array(z.number()).default([]),
    pointsEarned: z.boolean().default(false)
  })).default({}),
  totalScore: z.number().default(0),
  totalXP: z.number().default(0),
  achievements: z.array(z.string()).default([]),
  lastPlayedAt: z.date().default(() => new Date()),
  lastNotificationDate: z.date().optional(),
  lastDailyReset: z.date().optional(),
  streakDays: z.number().min(0).default(0),
  isReturningUser: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const insertUserProgressSchema = userProgressSchema.omit({
  _id: true,
  createdAt: true,
});

// Quiz Session Schema
export const quizSessionSchema = z.object({
  _id: z.string().optional(),
  sessionId: z.string(),
  userId: z.string(),
  level: z.number(),
  questionIds: z.array(z.string()),
  answers: z.array(z.object({
    questionId: z.string(),
    selectedAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
  })).default([]),
  score: z.number().default(0),
  completed: z.boolean().default(false),
  completedAt: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const insertQuizSessionSchema = quizSessionSchema.omit({
  _id: true,
  createdAt: true,
});

// Task Schema for Planner
export const taskSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().optional().default(""),
  date: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isAllDay: z.boolean().default(false),
  category: z.string(),
  completed: z.boolean().default(false),
  color: z.string().default("#4157ff"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const insertTaskSchema = taskSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

// Questionnaire Schema
export const questionnaireSchema = z.object({
  userId: z.string(),
  age: z.string(),
  income: z.string(),
  goals: z.string(),
  experience: z.string(),
  practiceTime: z.string(),
  language: z.string(),
  completedAt: z.date().default(() => new Date()),
});

// OTP Schema
export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  expiresAt: z.date(),
  used: z.boolean().default(false),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type UserAnsweredQuestion = z.infer<typeof userAnsweredQuestionSchema>;
export type InsertUserAnsweredQuestion = z.infer<typeof insertUserAnsweredQuestionSchema>;
export type UserProgress = z.infer<typeof userProgressSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type QuizSession = z.infer<typeof quizSessionSchema>;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

// Additional validation schemas
export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

// Additional type exports
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpData = z.infer<typeof verifyOtpSchema>;
export type QuestionnaireData = z.infer<typeof questionnaireSchema>;
export type OtpData = z.infer<typeof otpSchema>;
