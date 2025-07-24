# Face2Finance - Mobile Financial Literacy Application

A comprehensive mobile-first financial literacy application with gamified learning, task management, and AI-powered personalized tips. Built with React, Node.js, MongoDB, and featuring biometric authentication with automatic database schema construction.

## 📱 Complete Feature Overview

### Core Authentication & Security
- **JWT Authentication**: Secure token-based authentication with automatic session management
- **OTP Email Verification**: Email-based OTP system for password reset and account verification
- **Biometric Security**: WebAuthn support for fingerprint/Face ID authentication
- **Comprehensive Logout**: Session cleanup across all pages and components
- **Password Management**: Secure password change with current password verification
- **Session Expiry**: Automatic token refresh and session management

### Educational & Gaming System
- **AI-Powered Quiz System**: Dynamic question generation using Google Gemini API
- **Gamified Learning**: Map-based progression with 4 levels per map
- **XP Point System**: Experience points for completed quizzes and unlocked levels
- **Daily Map Resets**: Automated 5:00 AM daily map progression resets
- **Progress Tracking**: Persistent user progress with MongoDB storage
- **Star Rating System**: 3-star scoring based on quiz performance (75%+, 50-74%, <50%)
- **Gift Box Rewards**: Interactive bonus point collection system

### Personal Finance Management
- **Task Planner**: Create, edit, delete, and manage financial planning tasks
- **Calendar Integration**: Dynamic calendar showing current date and task scheduling
- **All-Day Task Support**: Tasks with optional time scheduling
- **Task Categories**: Budget Planning, Financial Goal, Investment, Learning, Review, Other
- **Personalized AI Tips**: Daily financial advice based on user questionnaire responses
- **Goal Tracking**: Financial goal setting and progress monitoring
- **Dashboard Analytics**: Real-time statistics from database data

### Learning & Calculator Tools
- **Learning Categories**: Budgeting, Saving & Investment, Tax Basics, Fraud Awareness, Data Privacy
- **Financial Calculators**: SIP Calculator, EMI Calculator, Budget Planner, Tax Estimator
- **Tutorial System**: Comprehensive learning materials with search functionality
- **Progress Tracking**: Learning progress monitoring with completion statistics

### User Experience Features
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly UI
- **Multilingual Support**: English, Hindi, and Punjabi language switching
- **Smart Notifications**: Dynamic notifications based on user activity and gaming progress
- **AI Chat Widget**: Floating chat assistant available across all pages
- **Profile Management**: Complete profile editing with image upload support
- **Search Functionality**: Global search across tutorials, tips, and content
- **Bottom Navigation**: Enhanced navigation bar with proper spacing and active states

## 🏗️ Complete Technical Architecture

### Frontend Stack (React Web Application)
```
Technology Stack:
- React 18.3.1 with TypeScript 5.6.3
- Vite 5.4.14 for fast development and optimized builds
- Wouter 3.3.5 for lightweight client-side routing
- TanStack Query v5.60.5 for server state and caching
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS 3.4.17 with custom design system
- Poppins font family via Google Fonts
- Lucide React 0.453.0 for consistent iconography
- React Hook Form 7.55.0 with Zod 3.24.2 validation
- Framer Motion 11.13.1 for animations
- Recharts 2.15.2 for data visualization
```

**File Structure:**
```
client/
├── src/
│   ├── components/ui/        # 16 optimized UI components
│   │   ├── bottom-navigation.tsx    # Enhanced navigation bar
│   │   ├── chat-widget.tsx         # AI chat widget
│   │   ├── personalized-tips.tsx   # AI-powered tips
│   │   └── ... (other UI components)
│   ├── pages/               # 22 active page components
│   │   ├── DashboardPage.tsx       # Main dashboard with stats
│   │   ├── PlannerPage.tsx         # Task management
│   │   ├── GamingPage.tsx          # Quiz and gaming system
│   │   ├── LearningPage.tsx        # Educational content
│   │   ├── LoginPage.tsx           # Authentication
│   │   ├── SignupPage.tsx          # User registration
│   │   ├── QuestionnairePage.tsx   # User profile setup
│   │   └── ... (other pages)
│   ├── lib/                 # Core utilities and APIs
│   │   ├── auth.ts                 # Authentication utilities
│   │   ├── taskAPI.ts              # Task management API
│   │   ├── queryClient.ts          # TanStack Query setup
│   │   ├── i18n.ts                 # Internationalization
│   │   └── utils.ts                # Utility functions
│   ├── hooks/               # Custom React hooks
│   │   └── use-toast.ts            # Toast notification hook
│   └── main.tsx             # Application entry point
├── public/                  # 18 actively used assets
│   └── attached_assets/     # Category icons and images
└── index.html              # HTML template
```

### Backend Architecture (Node.js + Express)
```
Technology Stack:
- Node.js 18+ LTS with TypeScript
- Express.js 4.21.2 with comprehensive middleware
- MongoDB 8.16.4 with Mongoose ODM
- JWT Authentication with bcryptjs 3.0.2
- Google Gemini AI API integration
- Nodemailer 7.0.5 for email services
- WebSocket support with ws 8.18.0
```

**Server Structure:**
```
server/
├── index.ts                 # Express server entry point
├── routes.ts                # All API endpoints (50+ routes)
├── auth.ts                  # JWT and authentication utilities
├── database.ts              # MongoDB connection and models
├── storage.ts               # Database abstraction layer
├── gemini.ts                # Google AI integration
├── aiQuestionGenerator.ts   # AI question generation
├── models/                  # MongoDB schemas
│   ├── QuizQuestion.ts      # Quiz question model
│   ├── UserProgress.ts      # Gaming progress model
│   └── UserAnsweredQuestion.ts # Quiz history model
└── vite.ts                  # Vite dev server integration
```

### Database Architecture (MongoDB Atlas)

**Automatic Schema Construction:**
The application automatically constructs database schemas and collections when a new user connects. No manual database setup required.

**7 MongoDB Collections:**

#### 1. Users Collection
```typescript
{
  _id: ObjectId,
  username: string,           // Unique username
  email: string,             // Unique email address
  phone: string,             // Phone number
  password: string,          // bcrypt hashed password
  createdAt: Date,
  updatedAt: Date,
  profileImage?: string      // Optional profile image path
}
```

#### 2. Questionnaires Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to user
  experience: string,        // Financial experience level
  goals: string[],          // Financial goals array
  timeCommitment: string,   // Learning time commitment
  knowledgeLevel: string,   // Current knowledge level
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Tasks Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to user
  title: string,            // Task title
  description: string,      // Task description
  date: string,            // Task date (formatted)
  startTime?: string,      // Optional start time
  endTime?: string,        // Optional end time
  isAllDay: boolean,       // All-day task flag
  category: string,        // Task category
  color: string,           // Visual color identifier
  completed: boolean,      // Completion status
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. UserProgresses Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,              // Reference to user
  currentLevel: number,          // Current gaming level
  currentMap: number,            // Current map number
  totalXP: number,              // Total experience points
  completedLevels: number[],    // Array of completed levels
  completedMaps: number[],      // Array of completed maps
  mapProgress: object,          // Map completion status
  lastPlayedAt: Date,           // Last gaming session
  lastDailyReset: Date,         // Last daily reset timestamp
  notificationsSent: number,    // Notification tracking
  streakCount: number,          // Gaming streak count
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. QuizQuestions Collection
```typescript
{
  _id: ObjectId,
  questionText: string,      // Question content
  options: string[],         // Multiple choice options
  correctAnswer: string,     // Correct answer
  explanation: string,       // Answer explanation
  level: number,            // Difficulty level (1-4)
  mapNumber: number,        // Map assignment
  category: string,         // Question category
  createdAt: Date,
  isAIGenerated: boolean    // AI vs manual question flag
}
```

#### 6. UserAnsweredQuestions Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to user
  questionId: ObjectId,      // Reference to question
  selectedAnswer: string,    // User's selected answer
  correctAnswer: string,     // Correct answer
  isCorrect: boolean,       // Answer correctness
  sessionId: string,        // Quiz session identifier
  answeredAt: Date,
  level: number,            // Question level
  mapNumber: number         // Map number
}
```

#### 7. OTPs Collection
```typescript
{
  _id: ObjectId,
  email: string,            // Email address for OTP
  otp: string,             // Generated OTP code
  expiresAt: Date,         // OTP expiration time
  isUsed: boolean,         // Usage status
  createdAt: Date
}
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ LTS
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email OTP (optional)
- Google AI API key (optional - for AI features)

### 1. Clone and Install
```bash
git clone <repository-url>
cd face2finance
npm install
```

### 2. Environment Setup
Create `.env` file in root directory:
```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/face2finance

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Optional)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Google AI Configuration (Optional)
GOOGLE_API_KEY=your-google-ai-api-key

# Server Configuration
NODE_ENV=development
PORT=5000
```

### 3. Database Auto-Setup
The application automatically creates all necessary database collections and indexes on first run. No manual database setup required.

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### 5. Build for Production
```bash
npm run build
npm start
```

## 📊 API Endpoints Documentation

### Authentication Routes
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me          # Get current user
POST /api/auth/forgot-password  # Password reset request
POST /api/auth/verify-otp   # OTP verification
POST /api/auth/reset-password   # Password reset
PUT  /api/auth/update-profile   # Profile update
PUT  /api/auth/change-password  # Password change
```

### Questionnaire Routes
```
POST /api/questionnaire     # Save questionnaire
PUT  /api/questionnaire     # Update questionnaire
GET  /api/questionnaire/:userId  # Get user questionnaire
```

### Task Management Routes
```
GET    /api/tasks          # Get user tasks
POST   /api/tasks          # Create new task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

### Gaming System Routes
```
GET  /api/gaming/progress       # Get user progress
POST /api/gaming/start-quiz     # Start quiz session
POST /api/gaming/submit-answer  # Submit quiz answer
POST /api/gaming/complete-quiz  # Complete quiz session
GET  /api/gaming/questions/:level  # Get questions by level
```

### AI & Personalization Routes
```
POST /api/ai/daily-tip         # Get personalized tip
POST /api/ai/chat             # AI chat interaction
GET  /api/ai/status           # Check AI service status
```

### Utility Routes
```
GET /api/test-db              # Database connection test
GET /api/health               # Health check endpoint
```

## 🔧 Configuration & Customization

### Database Configuration
MongoDB connection with automatic retry and fallback:
```typescript
// Automatic connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
```

### AI Integration Setup
Google Gemini AI integration for dynamic content:
```typescript
// AI service configuration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Automatic fallback when AI is unavailable
const generateQuestions = async (level: number) => {
  try {
    // AI generation logic
    return await model.generateContent(prompt);
  } catch (error) {
    // Fallback to stored questions
    return await QuizQuestion.find({ level }).limit(4);
  }
};
```

### Authentication Flow
Comprehensive JWT-based authentication:
```typescript
// Token generation with secure configuration
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId, timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );
};

// Automatic token validation middleware
const authenticateToken = (req, res, next) => {
  // Validation logic with automatic cleanup
};
```

## 📱 Mobile App Development Guide

### React Native Conversion Overview
The existing codebase is designed for easy React Native conversion:

**Shared Components:**
- All business logic is separated from UI components
- API clients can be reused directly
- Database schemas and backend remain unchanged
- Authentication flow compatible with AsyncStorage

**Mobile-Specific Adaptations Needed:**
- Replace DOM elements with React Native components
- Update navigation from Wouter to React Navigation
- Implement AsyncStorage for token storage
- Add react-native-biometrics for fingerprint/Face ID
- Integrate push notifications for user engagement

### Key Conversion Steps:
1. **Setup React Native Project** with TypeScript
2. **Install Mobile Dependencies** (React Navigation, AsyncStorage, etc.)
3. **Convert UI Components** from HTML to React Native components
4. **Implement Mobile Navigation** using React Navigation
5. **Add Biometric Authentication** with react-native-biometrics
6. **Setup Push Notifications** with Firebase Cloud Messaging
7. **Test on iOS and Android** devices

## 🔒 Security Implementation

### Authentication Security
- JWT tokens with 7-day expiration
- bcrypt password hashing (12+ rounds)
- Session-based authentication with automatic cleanup
- CORS protection for API endpoints
- Rate limiting for login attempts

### Data Security
- MongoDB connection with TLS encryption
- Environment variable protection for secrets
- Input validation with Zod schemas
- XSS protection with sanitized inputs
- CSRF protection with proper headers

### Mobile Security Considerations
- Secure token storage with Keychain (iOS) / Keystore (Android)
- Certificate pinning for API calls
- Biometric authentication with hardware security
- App state security with background blur
- Root/jailbreak detection capabilities

## 🚀 Deployment Guide

### Production Environment Setup
```bash
# Build the application
npm run build

# Set production environment variables
export NODE_ENV=production
export MONGODB_URI=your-production-mongodb-uri
export JWT_SECRET=your-production-jwt-secret

# Start production server
npm start
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Database Migration
No manual migration needed - the application automatically creates all collections and indexes on first run with any MongoDB instance.

## 📈 Performance Optimizations

### Frontend Performance
- Code splitting with React.lazy()
- Image optimization with lazy loading
- TanStack Query for efficient caching
- Memoized components with React.memo()
- Bundle optimization with Vite

### Backend Performance
- Database connection pooling
- Query optimization with indexes
- Response caching for static data
- Compression middleware
- Rate limiting for API protection

### Mobile Performance Considerations
- Image caching with react-native-fast-image
- List virtualization with FlatList
- Memory management with proper cleanup
- Background task optimization
- Battery usage optimization

## 🧪 Testing Strategy

### Automated Testing Setup
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Testing Coverage Areas
- Authentication flow testing
- API endpoint testing
- Component rendering tests
- Database operation tests
- Gaming system logic tests
- AI integration tests

## 📚 Additional Resources

### Development Resources
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Express.js Guide](https://expressjs.com/)
- [JWT Authentication Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

### Mobile Development Resources
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Guide](https://reactnavigation.org/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [Biometric Authentication Guide](https://github.com/SelfLender/react-native-biometrics)

### AI Integration Resources
- [Google Gemini AI Documentation](https://ai.google.dev/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🤝 Contributing Guidelines

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Conventional commit messages
- Component and hook documentation
- Test coverage for new features

---

**Built with ❤️ for financial literacy education**

For questions or support, please refer to the issues section or contact the development team.