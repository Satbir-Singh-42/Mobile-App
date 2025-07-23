# Face2Finance - Mobile Financial Literacy Application

## Overview
Face2Finance is a mobile-first financial literacy onboarding application with complete authentication flow and biometric security options. The app provides a structured learning journey: landing page → walkthrough → login/signup with OTP → questionnaire → dashboard with educational modules.

## Project Architecture
- **Frontend**: React with Vite, using shadcn/ui components and Tailwind CSS
- **Backend**: Express.js with TypeScript and JWT authentication
- **Database**: MongoDB with Mongoose ODM for persistent data storage
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for data fetching and caching
- **Authentication**: JWT tokens with OTP email verification
- **Security**: Biometric authentication (fingerprint/Face ID) support via WebAuthn API

## User Preferences
- Mobile-only responsive design with smooth layout and mobile UX focus
- Remove mobile status icons (battery, internet) from top of screen
- Node.js and MongoDB for authentication (not in-memory storage)
- Biometric/fingerprint/password verification as 2FA option in settings
- Device compatibility for biometric authentication features
- Exact Figma design implementation for landing page

## Recent Changes
- ✓ Implemented mobile-only responsive design with centered mobile viewport
- ✓ Integrated MongoDB database connection with fallback handling
- ✓ Created comprehensive authentication system with real database storage
- ✓ Added biometric authentication settings page with WebAuthn support
- ✓ Updated landing page to match exact Figma design with background patterns
- ✓ Added mobile-first CSS optimizations and touch-friendly interactions
- ✓ Implemented complete user registration, login, and questionnaire flows
- ✓ Successfully migrated to Replit environment (July 23, 2025)
- ✓ Fixed MongoDB Atlas integration with proper connection string
- ✓ Resolved authentication schema integration and password verification
- ✓ Removed time display and login button from landing page per user request
- ✓ Moved back buttons to top of signup and login pages for better mobile UX

## Security Considerations
- Client/server separation implemented
- JWT-based authentication with secure password hashing
- Biometric authentication via WebAuthn API
- OTP verification for password reset
- No common security vulnerabilities identified
- Following robust security practices