import mongoose from 'mongoose';

// User Progress Schema for Gaming
const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  currentLevel: {
    type: Number,
    default: 1,
    min: 1
  },
  currentMap: {
    type: Number,
    default: 1,
    min: 1
  },
  completedLevels: {
    type: [Number],
    default: []
  },
  completedMaps: {
    type: [Number],
    default: []
  },
  mapProgress: {
    type: Map,
    of: {
      completed: Boolean,
      levelsCompleted: [Number],
      pointsEarned: Boolean
    },
    default: new Map()
  },
  totalScore: {
    type: Number,
    default: 0,
    min: 0
  },
  totalXP: {
    type: Number,
    default: 0,
    min: 0
  },
  achievements: {
    type: [String],
    default: []
  },
  lastPlayedAt: {
    type: Date,
    default: Date.now
  },
  lastNotificationDate: {
    type: Date,
    default: null
  },
  lastDailyReset: {
    type: Date,
    default: null
  },
  streakDays: {
    type: Number,
    default: 0,
    min: 0
  },
  isReturningUser: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Creates createdAt and updatedAt automatically
});

// Add indexes for better performance
userProgressSchema.index({ userId: 1 });
userProgressSchema.index({ currentLevel: 1 });
userProgressSchema.index({ lastPlayedAt: -1 });

// Define interface for user progress document
export interface IUserProgress extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  currentLevel: number;
  currentMap: number;
  completedLevels: number[];
  completedMaps: number[];
  mapProgress: Map<string, { completed: boolean; levelsCompleted: number[]; pointsEarned: boolean }>;
  totalScore: number;
  totalXP: number;
  achievements: string[];
  lastPlayedAt: Date;
  lastNotificationDate?: Date;
  lastDailyReset?: Date;
  streakDays: number;
  isReturningUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create and export the model
export const UserProgress = mongoose.model<IUserProgress>('UserProgress', userProgressSchema);