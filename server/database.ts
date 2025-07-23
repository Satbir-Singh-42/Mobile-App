import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
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
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Define interface for user document
interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  used: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Questionnaire Schema
const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: String,
    required: true
  },
  income: {
    type: String,
    required: true
  },
  goals: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  practiceTime: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Task Schema for Planner
const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    maxlength: 1000
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create indexes for performance
otpSchema.index({ email: 1, expiresAt: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
taskSchema.index({ userId: 1, date: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
export const OTP = mongoose.model('OTP', otpSchema);
export const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
export const Task = mongoose.model('Task', taskSchema);

// Database connection
export const connectDB = async (): Promise<void> => {
  try {
    // Use the provided MongoDB connection string
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://satbirsinghubhi:Nobody.1234@cluster0.ygrqvfb.mongodb.net/face2finance?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    // MongoDB connected successfully
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // For development, we'll continue without MongoDB
    console.log('Continuing with fallback storage for development');
  }
};

// Close database connection
export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};