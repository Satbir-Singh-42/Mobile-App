# Face2Finance Database Structure

## MongoDB Collections Overview

### 1. Users Collection
```javascript
{
  _id: ObjectId("..."),
  username: "john_doe",
  email: "john@example.com", 
  phone: "+1234567890",
  password: "hashed_password",
  isVerified: false,
  resetPasswordToken: "optional_token",
  resetPasswordExpires: Date(),
  createdAt: Date(),
  updatedAt: Date()
}
```

### 2. Tasks Collection (Planner)
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."), // References Users._id
  title: "Design Changes",
  description: "Lorem ipsum dolor sit amet...",
  date: "Oct 24, 2020",
  startTime: "01:22 pm", 
  endTime: "03:20 pm",
  category: "Design", // Design, Meeting, Coding, Self, Testing, Others
  completed: false,
  color: "bg-[#6366F1]", // CSS class for task color
  createdAt: Date(),
  updatedAt: Date()
}
```

### 3. OTPs Collection
```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  otp: "123456",
  expiresAt: Date(), // 10 minutes from creation
  used: false,
  createdAt: Date(),
  updatedAt: Date()
}
```

### 4. Questionnaires Collection
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."), // References Users._id
  age: "25-30",
  income: "$50,000-$75,000", 
  goals: "Save for emergency fund",
  experience: "Beginner",
  practiceTime: "1-2 hours per week",
  language: "en",
  createdAt: Date(),
  updatedAt: Date()
}
```

## Database Relationships

```
Users (1) ←→ (N) Tasks
Users (1) ←→ (1) Questionnaires  
Users (1) ←→ (N) OTPs
```

## Indexes for Performance

```javascript
// Users Collection
{ "username": 1 }
{ "email": 1 }

// Tasks Collection  
{ "userId": 1, "date": 1 }
{ "userId": 1, "createdAt": -1 }

// OTPs Collection
{ "email": 1, "expiresAt": 1 }
{ "expiresAt": 1 } // TTL index for auto-deletion
```

## Current Database Status
- **Connection**: MongoDB Atlas (face2finance database)
- **Host**: ac-irjro8i-shard-00-01.ygrqvfb.mongodb.net:27017
- **Authentication**: Working ✅
- **CRUD Operations**: Fully functional ✅
- **Real-time Data**: All operations persist to MongoDB ✅