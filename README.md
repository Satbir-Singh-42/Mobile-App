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

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `POST /api/auth/change-password` - Change user password
- `GET /api/auth/user` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Gaming System
- `GET /api/gaming/progress` - Get user gaming progress
- `POST /api/gaming/start-quiz` - Start quiz for specific level
- `POST /api/gaming/submit-answer` - Submit quiz answer
- `POST /api/gaming/complete-quiz` - Complete quiz session

### Task Management
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI Features
- `POST /api/daily-tip` - Get personalized daily tip
- `GET /api/ai/status` - Check AI service availability

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