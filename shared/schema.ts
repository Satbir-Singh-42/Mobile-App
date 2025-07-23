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

// Task Schema for Planner
export const taskSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  category: z.string(),
  completed: z.boolean().default(false),
  color: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const insertTaskSchema = taskSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpData = z.infer<typeof verifyOtpSchema>;
export type QuestionnaireData = z.infer<typeof questionnaireSchema>;
export type OtpData = z.infer<typeof otpSchema>;
export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
