# Face2Finance - Mobile Financial Literacy Application

A comprehensive mobile-first financial literacy application with gamified learning, task management, and AI-powered personalized tips. Built with React, Node.js, MongoDB, and featuring biometric authentication.

## 📱 Features

### Core Functionality
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly UI
- **User Authentication**: JWT-based auth with OTP email verification and password reset
- **Biometric Security**: WebAuthn support for fingerprint/Face ID authentication
- **Multilingual Support**: English, Hindi, and Punjabi language options

### Educational & Gaming
- **AI-Powered Quiz System**: Dynamic question generation using Google Gemini AI
- **Gamified Learning**: Map-based progression with levels, XP points, and achievements
- **Daily Challenges**: Automated daily map resets at 5:00 AM
- **Progress Tracking**: Comprehensive user progress with streak counting

### Personal Finance Tools
- **Task Planner**: Create, edit, and manage financial planning tasks
- **Personalized AI Tips**: Daily financial advice based on user questionnaire data
- **Goal Tracking**: Set and monitor financial goals with progress visualization
- **Dashboard Analytics**: Real-time statistics and progress metrics

### Additional Features
- **Smart Notifications**: Dynamic notifications based on user activity and progress
- **AI Chat Widget**: Floating chat assistant available across all pages
- **Profile Management**: Complete profile editing with image upload support
- **Learning Progress**: Track completed lessons and modules

## 🏗️ Complete Technical Architecture

### Frontend Stack
- **Framework**: React 18.2+ with TypeScript 5.0+
- **Build Tool**: Vite 4.0+ for fast development and optimized builds
- **Routing**: Wouter 3.0+ for lightweight client-side routing
- **State Management**: TanStack Query v5 for server state and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS 3.3+ with custom design system
- **Typography**: Poppins font family via Google Fonts
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Custom toast system with shadcn/ui
- **Charts**: Recharts for data visualization
- **File Structure**:
  ```
  client/
  ├── src/
  │   ├── components/ui/     # Reusable UI components
  │   ├── pages/            # Page components
  │   ├── lib/              # Utility functions and API clients
  │   ├── hooks/            # Custom React hooks
  │   └── main.tsx          # Application entry point
  ├── public/               # Static assets
  └── index.html           # HTML template
  ```

### Backend Architecture
- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4.18+ with TypeScript
- **Authentication**: 
  - JWT tokens with RS256 algorithm
  - bcrypt for password hashing (12+ rounds)
  - Session management with connect-mongo
- **Middleware Stack**:
  - CORS for cross-origin requests
  - Helmet for security headers
  - Morgan for request logging
  - Express rate limit for DDoS protection
- **Email Service**: Nodemailer with SMTP transport
- **File Upload**: Multer for image handling
- **Validation**: Zod schemas for request validation
- **Error Handling**: Centralized error middleware
- **File Structure**:
  ```
  server/
  ├── models/           # Database models
  ├── routes/           # API route handlers
  ├── middleware/       # Custom middleware
  ├── utils/           # Utility functions
  ├── config/          # Configuration files
  └── index.ts         # Server entry point
  ```

### Database Design (MongoDB)
- **Platform**: MongoDB Atlas (Cloud) or Self-hosted MongoDB 6.0+
- **ODM**: Mongoose 7.0+ for schema validation and queries
- **Indexing Strategy**:
  - User emails: Unique index
  - User progress: Compound index on userId + mapNumber
  - Tasks: Compound index on userId + date
  - Quiz questions: Index on mapNumber + levelNumber

#### Detailed Schema Design

**Users Collection**
```javascript
{
  _id: ObjectId,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  phone: { type: String, sparse: true },
  questionnaire: {
    financialGoals: [String], // ["save_money", "buy_house", "invest"]
    currentSituation: String, // "beginner", "intermediate", "advanced"
    timeCommitment: String,   // "5-10 minutes", "15-20 minutes"
    knowledgeLevel: String    // "beginner", "intermediate", "expert"
  },
  profileImage: String,       // Base64 or URL
  isEmailVerified: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  preferredLanguage: { type: String, default: "en" },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}
```

**UserProgress Collection**
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  currentLevel: { type: Number, default: 1 },
  currentMap: { type: Number, default: 1 },
  completedLevels: [Number],    // [1, 2, 3, 4]
  completedMaps: [Number],      // [1]
  mapProgress: {
    "1": {
      completed: Boolean,
      levelsCompleted: [Number],
      pointsEarned: Boolean,
      completedAt: Date
    },
    "2": {
      completed: Boolean,
      levelsCompleted: [Number],
      pointsEarned: Boolean,
      completedAt: Date
    }
  },
  totalScore: { type: Number, default: 0 },
  totalXP: { type: Number, default: 0 },
  achievements: [String],       // ["first_quiz", "perfect_score"]
  lastPlayedAt: Date,
  lastNotificationDate: Date,
  lastDailyReset: Date,
  streakDays: { type: Number, default: 0 },
  isReturningUser: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

**Tasks Collection**
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["Budget Planning", "Investment Research", "Bill Payments", 
           "Financial Review", "Emergency Fund", "Debt Management"],
    required: true
  },
  date: { type: String, required: true }, // YYYY-MM-DD format
  startTime: String,        // HH:MM format, optional for all-day
  endTime: String,          // HH:MM format, optional for all-day
  isAllDay: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  reminder: {
    enabled: Boolean,
    time: String    // Minutes before task
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**QuizQuestions Collection**
```javascript
{
  _id: ObjectId,
  mapNumber: { type: Number, required: true },
  levelNumber: { type: Number, required: true },
  question: { type: String, required: true },
  options: [String],        // Multiple choice options
  correctAnswer: String,    // Correct option
  explanation: String,      // Why this answer is correct
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  category: String,         // "budgeting", "investing", "saving"
  isAIGenerated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

**UserAnsweredQuestions Collection**
```javascript
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User', required: true },
  questionId: { type: ObjectId, ref: 'QuizQuestion', required: true },
  userAnswer: String,
  isCorrect: Boolean,
  timeSpent: Number,        // Seconds
  mapNumber: Number,
  levelNumber: Number,
  sessionId: String,        // Group answers by quiz session
  answeredAt: { type: Date, default: Date.now }
}
```

### AI Integration Architecture
- **Provider**: Google Gemini 1.5 Flash API
- **API Key Management**: Environment variables with validation
- **Rate Limiting**: Built-in request throttling
- **Fallback Strategy**: 
  1. Try AI generation
  2. Use pre-seeded questions from database
  3. Display hardcoded fallback content
- **Content Types**:
  - Dynamic quiz questions based on user level
  - Personalized financial tips from questionnaire data
  - Educational content recommendations
- **Caching**: 6-hour cache for generated tips
- **Error Handling**: Graceful degradation when API unavailable

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Google AI API key (optional, for AI features)



### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd face2finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/face2finance
   
   # Authentication
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   SESSION_SECRET=your-session-secret-key-here
   
   # Email Configuration (for OTP)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # AI Integration (Optional)
   GOOGLE_API_KEY=your-google-gemini-api-key
   
   # Environment
   NODE_ENV=development
   PORT=5000
   ```

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier available)

2. **Database Configuration**
   - Create database: `face2finance`
   - Set up database user with read/write permissions
   - Whitelist your IP address or use 0.0.0.0/0 for development

3. **Get Connection String**
   - Navigate to "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password
   - Update `MONGODB_URI` in your `.env` file

### Google AI API Setup (Optional)

1. **Get API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create new API key
   - Add to `.env` as `GOOGLE_API_KEY`

2. **Without AI Features**
   - App works with fallback content if no API key provided
   - Quiz questions use pre-seeded database content
   - Tips show security-focused fallback messages

### Email Configuration

1. **Gmail Setup** (Recommended)
   - Enable 2-factor authentication on your Gmail account
   - Generate App Password: Account Settings → Security → App Passwords
   - Use the app password as `SMTP_PASS`

2. **Alternative SMTP Providers**
   - Update SMTP settings for other providers (Outlook, SendGrid, etc.)
   - Ensure SMTP credentials are correct in `.env`

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

This starts both frontend (Vite) and backend (Express) servers:
- Frontend: `http://localhost:5173` (proxied through backend)
- Backend API: `http://localhost:5000`
- Combined: Access via `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // bcrypt hashed
  phone: String,
  questionnaire: {
    financialGoals: [String],
    currentSituation: String,
    timeCommitment: String,
    knowledgeLevel: String
  },
  createdAt: Date,
  lastLogin: Date
}
```

### UserProgress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  currentLevel: Number,
  currentMap: Number,
  completedLevels: [Number],
  completedMaps: [Number],
  mapProgress: {
    "1": {
      completed: Boolean,
      levelsCompleted: [Number],
      pointsEarned: Boolean
    }
  },
  totalScore: Number,
  totalXP: Number,
  achievements: [String],
  lastPlayedAt: Date,
  lastDailyReset: Date,
  streakDays: Number,
  isReturningUser: Boolean
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  category: String,
  dueDate: Date,
  startTime: String, // Optional for all-day tasks
  endTime: String,   // Optional for all-day tasks
  isAllDay: Boolean,
  completed: Boolean,
  createdAt: Date
}
```

## 🔧 API Endpoints & Functionality

### Authentication Endpoints
- **`POST /api/auth/register`**
  - **Purpose**: Create new user account
  - **Payload**: `{ username, email, password, phone? }`
  - **Response**: User object with JWT token
  - **Validation**: Email uniqueness, password strength
  - **Database**: Creates user record in users collection

- **`POST /api/auth/login`**
  - **Purpose**: User authentication and session creation
  - **Payload**: `{ email/username, password }`
  - **Response**: JWT token and user profile
  - **Security**: bcrypt password verification, token generation
  - **Flow**: Redirects to dashboard or questionnaire

- **`POST /api/auth/logout`**
  - **Purpose**: Session termination and token invalidation
  - **Security**: Clears server-side session data
  - **Client**: Removes localStorage tokens

- **`POST /api/auth/forgot-password`**
  - **Purpose**: Password recovery initiation
  - **Payload**: `{ email }`
  - **Process**: Generates OTP, sends email via Nodemailer
  - **Security**: Time-limited tokens (15 minutes)

- **`POST /api/auth/reset-password`**
  - **Purpose**: Complete password reset with OTP
  - **Payload**: `{ email, otp, newPassword }`
  - **Validation**: OTP verification, password requirements
  - **Security**: Token expiration checking

- **`POST /api/auth/change-password`**
  - **Purpose**: Update password for authenticated users
  - **Payload**: `{ currentPassword, newPassword }`
  - **Security**: Current password verification required

- **`GET /api/auth/user`**
  - **Purpose**: Retrieve current user profile
  - **Authentication**: JWT token required
  - **Response**: User data without sensitive fields

- **`PUT /api/auth/profile`**
  - **Purpose**: Update user profile information
  - **Payload**: `{ username?, email?, phone? }`
  - **Validation**: Field validation and uniqueness checks

### Gaming System Endpoints
- **`GET /api/gaming/progress`**
  - **Purpose**: Fetch user gaming progress and statistics
  - **Response**: Current level, maps, XP, achievements
  - **Features**: Daily reset logic, progress persistence
  - **Database**: UserProgress collection with gaming data

- **`POST /api/gaming/start-quiz`**
  - **Purpose**: Initialize quiz session for specific level
  - **Payload**: `{ mapNumber, levelNumber }`
  - **Response**: 4 randomized questions for the level
  - **AI Integration**: Dynamic question generation when available

- **`POST /api/gaming/submit-answer`**
  - **Purpose**: Process individual quiz answer
  - **Payload**: `{ questionId, selectedAnswer, userAnswer }`
  - **Response**: Correct/incorrect with explanation
  - **Tracking**: Records answer in userAnsweredQuestions

- **`POST /api/gaming/complete-quiz`**
  - **Purpose**: Finalize quiz session and award XP
  - **Payload**: `{ mapNumber, levelNumber, score }`
  - **Logic**: Updates progress, unlocks next level
  - **Rewards**: XP calculation based on performance

### Task Management Endpoints
- **`GET /api/tasks`**
  - **Purpose**: Retrieve user's financial planning tasks
  - **Authentication**: User-specific data filtering
  - **Response**: Array of tasks with full details
  - **Sorting**: Chronological order with deadline proximity

- **`POST /api/tasks`**
  - **Purpose**: Create new financial planning task
  - **Payload**: `{ title, description, category, date, startTime?, endTime?, isAllDay? }`
  - **Validation**: Required fields, date format validation
  - **Categories**: Financial planning focused categories

- **`PUT /api/tasks/:id`**
  - **Purpose**: Update existing task details
  - **Payload**: Task object with updated fields
  - **Security**: User ownership verification
  - **Features**: Partial updates supported

- **`DELETE /api/tasks/:id`**
  - **Purpose**: Remove task from user's planner
  - **Security**: User ownership verification
  - **Confirmation**: Requires explicit user confirmation

### AI Features Endpoints
- **`POST /api/daily-tip`**
  - **Purpose**: Generate personalized financial advice
  - **Payload**: `{ userContext, date }`
  - **AI Integration**: Google Gemini API for content generation
  - **Personalization**: Based on questionnaire responses
  - **Fallback**: Security tips when AI unavailable
  - **Caching**: 6-hour refresh cycle for tips

- **`GET /api/ai/status`**
  - **Purpose**: Check Google Gemini API availability
  - **Response**: Boolean status of AI services
  - **Usage**: Prevents unnecessary API calls
  - **Fallback**: Enables graceful degradation

### Utility Endpoints
- **`GET /api/health`**
  - **Purpose**: Application health check
  - **Response**: Server status and database connectivity
  - **Monitoring**: Uptime and service availability

- **`POST /api/notifications`**
  - **Purpose**: Manage user notifications
  - **Features**: Mark as read, delete, clear all
  - **Types**: Gaming achievements, reminders, progress updates

### Middleware & Security
- **JWT Authentication**: Protects all authenticated endpoints
- **Input Validation**: Zod schema validation on all inputs
- **Rate Limiting**: Prevents abuse and brute force attacks
- **CORS Configuration**: Secure cross-origin request handling
- **Error Handling**: Consistent error responses with proper HTTP codes

## 💻 Complete Frontend Implementation

### Component Architecture
```
client/src/components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx        # Button variants and states
│   ├── input.tsx         # Form input components
│   ├── card.tsx          # Card layouts
│   ├── dialog.tsx        # Modal dialogs
│   ├── toast.tsx         # Notification toasts
│   └── ...               # 40+ UI components
├── layout/               # Layout components
│   ├── Navbar.tsx        # Bottom navigation
│   ├── Header.tsx        # Page headers
│   └── Sidebar.tsx       # Settings sidebar
├── forms/                # Form components
│   ├── LoginForm.tsx     # Authentication forms
│   ├── TaskForm.tsx      # Task creation forms
│   └── ProfileForm.tsx   # Profile editing forms
└── widgets/              # Feature widgets
    ├── ChatWidget.tsx    # AI chat interface
    ├── PersonalizedTips.tsx # AI tips component
    └── ProgressCard.tsx  # Progress visualization
```

### State Management Implementation
```typescript
// client/src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error.status === 401) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// API request helper with authentication
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`/api${url}`, config);
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
```

### Custom Hooks Implementation
```typescript
// client/src/hooks/useAuth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          });
          
          localStorage.setItem('auth_token', response.token);
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
```

### Form Validation with Zod
```typescript
// client/src/lib/validations.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum([
    'Budget Planning',
    'Investment Research', 
    'Bill Payments',
    'Financial Review',
    'Emergency Fund',
    'Debt Management'
  ]),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isAllDay: z.boolean().default(false),
});
```

## 🗄️ Complete Backend Implementation

### Server Architecture
```typescript
// server/index.ts - Complete server setup
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDatabase } from './database';
import { authRoutes } from './routes/auth';
import { gamingRoutes } from './routes/gaming';
import { taskRoutes } from './routes/tasks';
import { aiRoutes } from './routes/ai';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'" , "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://generativelanguage.googleapis.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI!,
    touchAfter: 24 * 3600, // lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gaming', gamingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details 
    });
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
```

### Authentication Middleware
```typescript
// server/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId }, 
    process.env.JWT_REFRESH_SECRET!, 
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
```

### Complete Database Models
```typescript
// server/models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'] 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },
  phone: { 
    type: String, 
    sparse: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  questionnaire: {
    financialGoals: [String],
    currentSituation: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    timeCommitment: {
      type: String,
      enum: ['5-10 minutes', '15-20 minutes', '25-30 minutes', '30+ minutes']
    },
    knowledgeLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert']
    }
  },
  profileImage: String,
  isEmailVerified: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  preferredLanguage: { 
    type: String, 
    enum: ['en', 'hi', 'pa'], 
    default: 'en' 
  },
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
}, {
  timestamps: true,
  toJSON: { 
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.resetPasswordToken;
      delete ret.emailVerificationToken;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ emailVerificationToken: 1 });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Increment login attempts
userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { loginAttempts: 1, lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    };
  }
  
  return this.updateOne(updates);
};

export const User = mongoose.model('User', userSchema);
```

### Email Service Implementation
```typescript
// server/services/emailService.ts
import nodemailer from 'nodemailer';
import crypto from 'crypto';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Face2Finance" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset OTP - Face2Finance',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366F1;">Face2Finance</h2>
            <p>Your password reset OTP is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This OTP will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  async sendWelcomeEmail(email: string, username: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Face2Finance" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Welcome to Face2Finance!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366F1;">Welcome to Face2Finance, ${username}!</h2>
            <p>Thank you for joining our financial literacy platform.</p>
            <p>Start your journey by:</p>
            <ul>
              <li>Completing your financial questionnaire</li>
              <li>Exploring our interactive learning modules</li>
              <li>Playing financial literacy games</li>
              <li>Setting up your financial goals</li>
            </ul>
            <p>Get started: <a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a></p>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error('Welcome email failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
```

## 🗃️ Complete Database Implementation

### MongoDB Connection & Configuration
```typescript
// server/database.ts
import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority',
    };

    await mongoose.connect(process.env.MONGODB_URI!, options);
    
    console.log('✅ MongoDB Atlas connected successfully');
    
    // Set up connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Database health check
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (error) {
    return false;
  }
};
```

### Database Seeding & Migration
```typescript
// server/utils/seedDatabase.ts
import { User } from '../models/User';
import { QuizQuestion } from '../models/QuizQuestion';
import { UserProgress } from '../models/UserProgress';

export const seedQuizQuestions = async (): Promise<void> => {
  try {
    const existingQuestions = await QuizQuestion.countDocuments();
    if (existingQuestions > 0) {
      console.log('Quiz questions already seeded');
      return;
    }

    const questions = [
      {
        mapNumber: 1,
        levelNumber: 1,
        question: "What is the recommended percentage of income to save each month?",
        options: ["5%", "10-20%", "30%", "50%"],
        correctAnswer: "10-20%",
        explanation: "Financial experts recommend saving 10-20% of your income for emergencies and future goals.",
        difficulty: "easy",
        category: "saving"
      },
      // Add 40+ more questions...
    ];

    await QuizQuestion.insertMany(questions);
    console.log(`✅ Seeded ${questions.length} quiz questions`);
  } catch (error) {
    console.error('❌ Failed to seed quiz questions:', error);
  }
};

export const createIndexes = async (): Promise<void> => {
  try {
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ username: 1 }, { unique: true });
    
    // UserProgress indexes
    await UserProgress.collection.createIndex({ userId: 1 });
    await UserProgress.collection.createIndex({ userId: 1, currentMap: 1 });
    
    // QuizQuestion indexes
    await QuizQuestion.collection.createIndex({ mapNumber: 1, levelNumber: 1 });
    await QuizQuestion.collection.createIndex({ category: 1 });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    console.error('❌ Failed to create indexes:', error);
  }
};
```

### Performance Optimization
```typescript
// server/utils/cacheManager.ts
import NodeCache from 'node-cache';

class CacheManager {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 300, // 5 minutes default
      checkperiod: 60, // Check for expired keys every minute
    });
  }

  set(key: string, value: any, ttl?: number): boolean {
    return this.cache.set(key, value, ttl);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  del(key: string): number {
    return this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache.getStats();
  }
}

export const cacheManager = new CacheManager();

// Usage in API routes
export const getCachedUserProgress = async (userId: string) => {
  const cacheKey = `user_progress_${userId}`;
  let progress = cacheManager.get(cacheKey);
  
  if (!progress) {
    progress = await UserProgress.findOne({ userId });
    if (progress) {
      cacheManager.set(cacheKey, progress, 600); // Cache for 10 minutes
    }
  }
  
  return progress;
};
```

## 📱 Page-by-Page Documentation

### 🏠 Landing & Authentication Flow

#### **Landing Page** (`/`)
- **Purpose**: First impression and app introduction
- **Features**:
  - Clean hero section with app branding
  - Feature highlights with visual icons
  - Mobile-optimized design matching Figma specifications
  - Automatic navigation to walkthrough for new users
- **Navigation**: Leads to walkthrough page
- **Design**: Purple gradient header, centered mobile viewport

#### **Walkthrough Page** (`/walkthrough`)
- **Purpose**: Guided introduction to app features
- **Features**:
  - Multi-step carousel showcasing key features
  - Progress indicators showing current step
  - Skip option for returning users
  - Smooth animations between slides
- **Navigation**: Leads to login page after completion
- **Key Info**: Explains gaming, learning, and financial tools

#### **Login Page** (`/login`)
- **Purpose**: User authentication and access
- **Features**:
  - Email/username and password fields
  - "Remember me" functionality
  - Forgot password link
  - Social authentication placeholders
  - Input validation with error messages
- **Navigation**: 
  - Success → Dashboard (if questionnaire completed) or Questionnaire
  - Back button → Walkthrough
  - Sign up link → Signup page
- **Security**: JWT token generation, bcrypt password verification

#### **Signup Page** (`/signup`)
- **Purpose**: New user registration
- **Features**:
  - Username, email, password, confirm password fields
  - Phone number (optional)
  - Real-time validation
  - Terms and conditions acceptance
  - Password strength indicator
- **Navigation**: 
  - Success → Questionnaire page
  - Back button → Login page
- **Database**: Creates new user record in MongoDB

#### **Forgot Password Page** (`/forgot-password`)
- **Purpose**: Password recovery process
- **Features**:
  - Email input for password reset
  - OTP generation and email sending
  - OTP verification step
  - New password creation
  - Loading states for each step
- **Navigation**: Back to login after successful reset
- **Security**: Time-limited OTP tokens, secure email delivery

#### **Questionnaire Page** (`/questionnaire`)
- **Purpose**: User financial profiling for personalization
- **Features**:
  - Multi-step form with progress indicator
  - Financial goals selection (multiple choice)
  - Current financial situation assessment
  - Time commitment preferences
  - Knowledge level evaluation
  - Visual icons for better engagement
- **Navigation**: Leads to dashboard after completion
- **AI Integration**: Data used for personalized tips and recommendations

### 🎯 Main Application Pages

#### **Dashboard Page** (`/dashboard`) - Main Hub
- **Purpose**: Central control panel and overview
- **Features**:
  - **Header Section**:
    - User greeting with profile avatar
    - Time-based greetings (Good morning, afternoon, evening)
    - Profile access button
  - **Search Bar**:
    - Floating design between header and content
    - Quick access to learning materials
    - Keyword-based content search
  - **Top Categories Grid**:
    - 6 financial literacy categories
    - Colorful rounded icons
    - Touch-friendly 2x3 grid layout
  - **Monthly Preview Cards**:
    - Real-time statistics from database
    - Lessons completed count
    - Modules in progress
    - Quizzes attempted
    - Study streak tracking
  - **Featured Modules**:
    - Video thumbnails with play buttons
    - Star ratings and duration
    - Progress indicators
  - **Progress Achievement Card**:
    - Real XP points from gaming system
    - Progress bar toward 10,000 XP goal
    - "Go to game page" navigation
  - **Personalized Tips**:
    - AI-generated daily financial tips
    - Based on questionnaire responses
    - Fallback to security tips when AI unavailable
    - 6-hour refresh cycle
- **Navigation**: Central hub with bottom navigation
- **Data Sources**: MongoDB user progress, tasks, gaming data

#### **Gaming Page** (`/gaming`) - Gamified Learning
- **Purpose**: Interactive financial literacy through gaming
- **Features**:
  - **Map-Based Progression**:
    - Hexagonal level layout using design assets
    - Map 1: 4 levels with financial literacy quizzes
    - Map 2: Unlocks after Map 1 completion
    - Lock and gift icons for visual feedback
  - **Level System**:
    - Each level = 4 quiz questions
    - Star-based scoring (3 stars: 75%+, 2 stars: 50-74%, 1 star: <50%)
    - XP rewards for completion
    - Bonus points for perfect scores
  - **Daily Reset System**:
    - Automatic reset at 5:00 AM daily
    - Incomplete maps restart from Level 1
    - Completed maps unlock next map
  - **Interactive Elements**:
    - Gift boxes provide bonus XP
    - Hover effects and click feedback
    - Progress persistence across sessions
  - **AI-Powered Questions**:
    - Google Gemini AI generates dynamic questions
    - Fallback to pre-seeded database questions
    - Smart question distribution system
- **Navigation**: Integrated with bottom navigation
- **Database**: UserProgress collection tracks all gaming data

#### **Quiz Page** (`/quiz`) - Interactive Assessment
- **Purpose**: Individual quiz gameplay interface
- **Features**:
  - **Question Display**:
    - Clean question text with multiple choice answers
    - 4 questions per quiz session
    - Random question selection from pool
  - **Answer Feedback**:
    - Immediate correct/incorrect indication
    - White background feedback section
    - 5-second auto-advance timing
  - **Progress Tracking**:
    - Question counter (1 of 4)
    - Visual progress indicators
    - Session completion tracking
  - **Completion Flow**:
    - "Complete Quiz" button on final question
    - Automatic level progression
    - XP award calculation
    - Return to gaming map
- **Navigation**: Back to gaming page after completion
- **API Integration**: Real-time answer submission and validation

#### **Search/Learning Page** (`/search`) - Content Discovery
- **Purpose**: Educational content search and discovery
- **Features**:
  - **Search Interface**:
    - Prominent search bar with placeholder text
    - Keyword-based content filtering
    - Search suggestions and autocomplete
  - **Content Categories**:
    - Organized learning modules
    - Topic-based categorization
    - Difficulty level indicators
  - **Search Results**:
    - Relevant content matching queries
    - Preview snippets and thumbnails
    - Direct access to learning materials
  - **Recent Searches**:
    - Search history for quick access
    - Popular search terms
- **Navigation**: Bottom navigation integration
- **Functionality**: Keyword matching and content filtering

#### **Planner Page** (`/planner`) - Task Management
- **Purpose**: Financial planning and task organization
- **Features**:
  - **Calendar Interface**:
    - Current date display (dynamic, not hardcoded)
    - Monthly view with task indicators
    - Date selection for task viewing
  - **Task Management**:
    - Create new financial planning tasks
    - Edit existing tasks with inline editing
    - Delete tasks with confirmation
    - Mark tasks as complete
  - **Task Details**:
    - Title and description fields
    - Category selection (financial planning focused)
    - Date and time scheduling
    - "All Day" toggle option
    - Optional start/end times
  - **Task Display**:
    - Latest 2 tasks closest to deadline on dashboard
    - Full task list in planner view
    - Visual task cards with category colors
    - Three-dot menu for edit/delete options
  - **Categories**:
    - Budget Planning
    - Investment Research
    - Bill Payments
    - Financial Review
    - Emergency Fund
    - Debt Management
- **Navigation**: Integrated with dashboard progress section
- **Database**: Tasks collection with user-specific data

#### **Notifications Page** (`/notifications`) - Activity Updates
- **Purpose**: User activity and system notifications
- **Features**:
  - **Notification Types**:
    - Gaming achievements and level completions
    - Daily learning reminders for inactive users (24+ hours)
    - New map unlocks and progression updates
    - Task reminders and deadlines
  - **Notification Management**:
    - Mark individual notifications as read
    - Delete specific notifications with confirmation
    - Clear all notifications functionality
    - Notification count badge
  - **Dynamic Content**:
    - Time-based notifications (returning users)
    - Achievement-based messages
    - Progress milestone celebrations
  - **Empty State**:
    - Clean design when no notifications
    - Encouraging message to stay active
- **Navigation**: Bottom navigation access
- **Database**: Integrated with UserProgress for activity tracking

### ⚙️ Settings & Profile Management

#### **Profile Page** (`/profile`) - Settings Hub
- **Purpose**: Main settings navigation center
- **Features**:
  - **User Profile Display**:
    - Username and avatar
    - Profile initials if no image
    - User greeting and basic info
  - **Settings Menu**:
    - Edit Profile → Profile editing page
    - Learning Progress → Progress tracking
    - Goals Summary → Planner history
    - Security Settings → Authentication options
    - Advanced Settings → Comprehensive settings
    - Help & Feedback → App store rating
  - **Bottom Navigation**:
    - Highlighted settings icon
    - Quick access to main app sections
- **Navigation**: Central hub accessible from all pages
- **Design**: Clean menu layout with icons

#### **Edit Profile Page** (`/edit-profile`) - User Management
- **Purpose**: Personal information management
- **Features**:
  - **Profile Image**:
    - Camera icon for image upload
    - File picker with image preview
    - Default gradient avatar with initials
  - **Form Fields**:
    - Username editing
    - Email address update
    - Phone number (optional)
    - Real-time validation
  - **Password Management**:
    - Change password section
    - Current password verification
    - New password with confirmation
    - Password strength validation
  - **Actions**:
    - Save changes with loading states
    - Cancel to return to profile
    - Success/error notifications
- **Navigation**: Back to profile page
- **Database**: Updates user collection in MongoDB

#### **Security Settings Page** (`/security-settings`) - Authentication
- **Purpose**: Security and authentication management
- **Features**:
  - **Two-Factor Authentication**:
    - Enable/disable 2FA toggle
    - QR code generation for authenticator apps
    - Backup codes display
  - **Biometric Authentication**:
    - WebAuthn fingerprint/Face ID setup
    - Device compatibility checking
    - Fallback to password authentication
  - **Language Preferences**:
    - English, Hindi, Punjabi options
    - Real-time language switching
    - Preference persistence
  - **Questionnaire Management**:
    - Retake questionnaire option
    - View current questionnaire responses
    - Update financial preferences
- **Navigation**: Back to profile page
- **Security**: WebAuthn API integration for biometrics

#### **Learning Progress Page** (`/learning-progress`) - Academic Tracking
- **Purpose**: Educational progress visualization
- **Features**:
  - **Coming Soon State**:
    - Clean empty state design
    - Future implementation placeholder
    - Navigation to dashboard
  - **Planned Features**:
    - Completed lessons tracking
    - Module progress visualization
    - Achievement badges
    - Learning streak information
- **Navigation**: Back to profile page
- **Status**: Prepared for future enhancement

#### **Goals Summary Page** (`/goals-summary`) - Planning Overview
- **Purpose**: Complete planner history and management
- **Features**:
  - **Statistics Dashboard**:
    - Total tasks created
    - Completed task count
    - Visual progress indicators
    - Color-coded metrics
  - **Task History**:
    - Complete chronological list
    - Most recent tasks first
    - Task details with categories
    - Date and time information
  - **Bulk Management**:
    - Clear all tasks option
    - Confirmation dialogs
    - Mass delete functionality
  - **Individual Task Actions**:
    - Edit task details
    - Delete specific tasks
    - Task completion status
- **Navigation**: Back to profile page
- **Database**: Full CRUD operations on tasks collection

#### **Help & Feedback Page** (`/help-feedback`) - Support
- **Purpose**: User support and app rating
- **Features**:
  - **App Store Integration**:
    - Platform detection (iOS/Android/Desktop)
    - Automatic redirect to appropriate store
    - "Rate Us on App Store" prominent button
  - **Visual Elements**:
    - 5-star rating display
    - Gradient design matching app theme
    - Encouraging messaging
  - **Platform Support**:
    - iOS → Apple App Store
    - Android → Google Play Store
    - Desktop → Download page fallback
  - **User Experience**:
    - Single-click rating process
    - Clear call-to-action
    - Information about redirect behavior
- **Navigation**: Back to profile page
- **Integration**: Opens external app stores

#### **Advanced Settings Page** (`/settings`) - Comprehensive Options
- **Purpose**: Advanced application configuration
- **Features**:
  - **Profile Management**:
    - Advanced profile options
    - Account preferences
    - Data management
  - **App Configuration**:
    - Display settings
    - Notification preferences
    - Theme options (if implemented)
  - **Privacy Settings**:
    - Data privacy controls
    - Account deletion options
    - Export data functionality
  - **Developer Options**:
    - Debug information
    - Version details
    - API status checking
- **Navigation**: Back to profile page via "Advanced Settings" menu
- **Access**: Through profile page menu system

## 🎨 UI/UX Features

### Mobile Optimization
- **Responsive Design**: Works on all screen sizes with mobile-first approach
- **Touch Interactions**: Optimized for touch gestures and mobile interactions
- **Clean Interface**: Modern, minimalist design with consistent spacing
- **Fast Navigation**: Smooth transitions between pages

### Design System
- **Color Scheme**: Blue gradient primary (#6366F1 to #8B5CF6)
- **Typography**: Poppins font family for modern appearance
- **Components**: Consistent shadcn/ui components throughout
- **Icons**: Lucide React icons for consistent iconography

### User Experience
- **Onboarding Flow**: Guided walkthrough for new users
- **Progress Visualization**: Clear progress indicators and achievements
- **Feedback System**: Toast notifications for user actions
- **Loading States**: Skeleton screens and loading indicators

## 🔐 Security Features

### Authentication Security
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Express sessions with MongoDB store
- **OTP Verification**: Email-based verification for password resets

### Biometric Authentication
- **WebAuthn Support**: Modern biometric authentication
- **Device Compatibility**: Works with fingerprint and Face ID
- **Fallback Options**: Traditional password authentication available

### Data Protection
- **Input Validation**: Zod schema validation on all endpoints
- **Error Handling**: Secure error messages without sensitive data exposure
- **Rate Limiting**: Protection against brute force attacks (configurable)

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=super-secure-production-jwt-secret
SESSION_SECRET=super-secure-production-session-secret
GOOGLE_API_KEY=your-production-google-api-key
PORT=5000
```

### Deployment Platforms
- **Vercel**: Compatible with Vercel deployment
- **Railway**: Ready for Railway deployment
- **Heroku**: Works with Heroku platform
- **DigitalOcean**: App Platform deployment ready
- **AWS**: EC2 and Lambda deployment compatible

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Testing Features
- Authentication flow testing
- API endpoint testing
- Database connection testing
- AI integration testing

## 📝 Development Guidelines

### Code Structure
- **Modular Components**: Reusable React components
- **TypeScript**: Full TypeScript support with strict types
- **API Organization**: RESTful API structure
- **Error Handling**: Comprehensive error handling throughout

### Performance Optimization
- **Lazy Loading**: Components loaded on demand
- **Caching**: TanStack Query for efficient data caching
- **Bundle Optimization**: Vite for fast development and builds
- **Database Indexing**: Optimized MongoDB queries

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

**MongoDB Connection Issues**
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

**Email OTP Not Working**
- Verify SMTP credentials
- Check spam/junk folders
- Ensure app password is used for Gmail

**AI Features Not Working**
- Verify Google API key is valid
- Check API quotas and billing
- App works with fallback content if AI unavailable

**Build/Deployment Issues**
- Ensure all environment variables are set
- Check Node.js version compatibility
- Verify all dependencies are installed

### Getting Help
- Check the troubleshooting section above
- Review error logs in console
- Ensure all environment variables are properly configured
- Verify database connectivity

### Contact
For additional support or questions about integration, please check the project documentation or create an issue in the repository.

---

**Made with ❤️ for financial literacy education**