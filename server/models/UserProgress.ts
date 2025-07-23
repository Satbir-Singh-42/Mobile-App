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
  completedLevels: {
    type: [Number],
    default: []
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
  completedLevels: number[];
  totalScore: number;
  totalXP: number;
  achievements: string[];
  lastPlayedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create and export the model
export const UserProgress = mongoose.model<IUserProgress>('UserProgress', userProgressSchema);