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

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for data fetching and caching
- **UI Components**: shadcn/ui with Tailwind CSS
- **Styling**: Tailwind CSS with custom Poppins font integration

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email Service**: Nodemailer for OTP verification
- **Session Management**: Express sessions with MongoDB store

### Database
- **Primary Database**: MongoDB Atlas with Mongoose ODM
- **Collections**:
  - `users`: User accounts and authentication data
  - `userProgress`: Gaming progress and achievements
  - `tasks`: User-created financial planning tasks
  - `quizQuestions`: AI-generated and pre-seeded quiz questions
  - `userAnsweredQuestions`: User quiz responses and scores

### AI Integration
- **Provider**: Google Gemini 1.5 Flash
- **Features**: Dynamic quiz generation, personalized financial tips
- **Fallback System**: Pre-defined content when AI is unavailable

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
- **Replit**: Configured for direct deployment
- **Vercel**: Compatible with Vercel deployment
- **Railway**: Ready for Railway deployment
- **Heroku**: Works with Heroku platform

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