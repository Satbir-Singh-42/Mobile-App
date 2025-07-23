import mongoose from 'mongoose';

const userAnsweredQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizQuestion',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  answeredAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to prevent duplicate answers and enable efficient queries
userAnsweredQuestionSchema.index({ userId: 1, questionId: 1 }, { unique: true });
userAnsweredQuestionSchema.index({ userId: 1, level: 1 });

export const UserAnsweredQuestion = mongoose.model('UserAnsweredQuestion', userAnsweredQuestionSchema);