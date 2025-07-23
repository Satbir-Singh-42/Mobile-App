import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'financial_literacy'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for efficient queries
quizQuestionSchema.index({ level: 1, isActive: 1 });
quizQuestionSchema.index({ category: 1, difficulty: 1 });

export const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);