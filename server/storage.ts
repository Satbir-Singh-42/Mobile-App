import { User, OTP, Questionnaire, Task } from "./database";
import { QuizQuestion } from "./models/QuizQuestion";
import { UserAnsweredQuestion } from "./models/UserAnsweredQuestion";
import type { 
  InsertUser, 
  QuestionnaireData, 
  User as UserType,
  Task as TaskType,
  InsertTask,
  UserProgress,
  InsertUserProgress,
  QuizSession,
  InsertQuizSession,
  QuizQuestion as QuizQuestionType,
  InsertQuizQuestion,
  UserAnsweredQuestion as UserAnsweredQuestionType,
  InsertUserAnsweredQuestion
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUserById(id: string): Promise<UserType | null>;
  getUserByUsername(username: string): Promise<UserType | null>;
  getUserByEmail(email: string): Promise<UserType | null>;
  getUserForLogin(username: string): Promise<{ _id: string; username: string; email: string; phone: string; comparePassword: (password: string) => Promise<boolean> } | null>;
  createUser(user: InsertUser): Promise<UserType>;
  updateUser(id: string, updates: Partial<UserType>): Promise<UserType | null>;
  
  // Questionnaire operations
  saveQuestionnaire(data: QuestionnaireData): Promise<void>;
  getQuestionnaireByUserId(userId: string): Promise<QuestionnaireData | null>;
  
  // OTP operations
  storeOTP(email: string, otp: string): Promise<boolean>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
  
  // Task operations
  createTask(task: InsertTask): Promise<TaskType>;
  getTasksByUserId(userId: string): Promise<TaskType[]>;
  updateTask(id: string, updates: Partial<TaskType>): Promise<TaskType | null>;
  deleteTask(id: string): Promise<boolean>;
  
  // Gaming operations
  getUserProgress(userId: string): Promise<UserProgress | null>;
  updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | null>;
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  addQuizAnswer(sessionId: string, answer: { questionId: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }): Promise<void>;
  completeQuizSession(sessionId: string, score: number): Promise<void>;
  
  // Quiz Question operations
  getAvailableQuestions(userId: string, level: number, count: number): Promise<QuizQuestionType[]>;
  markQuestionAsAnswered(userId: string, questionId: string, level: number, isCorrect: boolean): Promise<void>;
  seedQuizQuestions(): Promise<void>;
}

export class MongoStorage implements IStorage {
  async getUserById(id: string): Promise<UserType | null> {
    try {
      const user = await User.findById(id).select('-password');
      if (!user) return null;
      
      const userObj = user.toObject() as any;
      return {
        ...userObj,
        _id: userObj._id.toString(),
        createdAt: userObj.createdAt || new Date(),
        updatedAt: userObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<UserType | null> {
    try {
      const user = await User.findOne({ username }).select('-password');
      if (!user) return null;
      
      const userObj = user.toObject() as any;
      return {
        ...userObj,
        _id: userObj._id.toString(),
        createdAt: userObj.createdAt || new Date(),
        updatedAt: userObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error getting user by username:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserType | null> {
    try {
      const user = await User.findOne({ email }).select('-password');
      if (!user) return null;
      
      const userObj = user.toObject() as any;
      return {
        ...userObj,
        _id: userObj._id.toString(),
        createdAt: userObj.createdAt || new Date(),
        updatedAt: userObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async createTask(task: InsertTask): Promise<TaskType> {
    try {
      const newTask = new Task(task);
      const savedTask = await newTask.save();
      const taskObj = savedTask.toObject() as any;
      return {
        ...taskObj,
        _id: taskObj._id.toString(),
        userId: taskObj.userId.toString(),
        createdAt: taskObj.createdAt || new Date(),
        updatedAt: taskObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getTasksByUserId(userId: string): Promise<TaskType[]> {
    try {
      const tasks = await Task.find({ userId });
      return tasks.map(task => {
        const taskObj = task.toObject() as any;
        return {
          ...taskObj,
          _id: taskObj._id.toString(),
          userId: taskObj.userId.toString(),
          createdAt: taskObj.createdAt || new Date(),
          updatedAt: taskObj.updatedAt || new Date(),
        };
      });
    } catch (error) {
      console.error('Error getting tasks by user ID:', error);
      return [];
    }
  }

  async updateTask(id: string, updates: Partial<TaskType>): Promise<TaskType | null> {
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedTask) return null;
      
      const taskObj = updatedTask.toObject() as any;
      return {
        ...taskObj,
        _id: taskObj._id.toString(),
        userId: taskObj.userId.toString(),
        createdAt: taskObj.createdAt || new Date(),
        updatedAt: taskObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const result = await Task.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  async createUser(userData: InsertUser): Promise<UserType> {
    try {
      const user = new User(userData);
      const savedUser = await user.save();
      const userObject = savedUser.toObject() as any;
      
      return {
        _id: userObject._id.toString(),
        username: userObject.username,
        email: userObject.email,
        phone: userObject.phone,
        password: userObject.password, // Will be removed in response
        isVerified: userObject.isVerified,
        resetPasswordToken: userObject.resetPasswordToken,
        resetPasswordExpires: userObject.resetPasswordExpires,
        createdAt: userObject.createdAt || new Date(),
        updatedAt: userObject.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, updates: Partial<UserType>): Promise<UserType | null> {
    try {
      const user = await User.findByIdAndUpdate(
        id, 
        { ...updates, updatedAt: new Date() }, 
        { new: true }
      ).select('-password');
      
      if (!user) return null;
      
      const userObj = user.toObject() as any;
      return {
        ...userObj,
        _id: userObj._id.toString(),
        createdAt: userObj.createdAt || new Date(),
        updatedAt: userObj.updatedAt || new Date(),
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async saveQuestionnaire(data: QuestionnaireData): Promise<void> {
    try {
      // Remove existing questionnaire for this user
      await Questionnaire.deleteMany({ userId: data.userId });
      
      // Save new questionnaire
      const questionnaire = new Questionnaire(data);
      await questionnaire.save();
    } catch (error) {
      console.error('Error saving questionnaire:', error);
      throw error;
    }
  }

  async getQuestionnaireByUserId(userId: string): Promise<QuestionnaireData | null> {
    try {
      const questionnaire = await Questionnaire.findOne({ userId });
      if (!questionnaire) return null;
      
      const questionnaireObj = questionnaire.toObject();
      return {
        userId: questionnaireObj.userId.toString(),
        age: questionnaireObj.age,
        income: questionnaireObj.income,
        goals: questionnaireObj.goals,
        experience: questionnaireObj.experience,
        practiceTime: questionnaireObj.practiceTime,
        language: questionnaireObj.language,
        completedAt: questionnaireObj.createdAt || new Date(),
      };
    } catch (error) {
      console.error('Error getting questionnaire:', error);
      return null;
    }
  }

  async storeOTP(email: string, otp: string): Promise<boolean> {
    try {
      // Remove any existing OTPs for this email
      await OTP.deleteMany({ email });
      
      // Create new OTP
      await OTP.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      });
      
      return true;
    } catch (error) {
      console.error('Error storing OTP:', error);
      return false;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const otpRecord = await OTP.findOne({
        email,
        otp,
        used: false,
        expiresAt: { $gt: new Date() },
      });

      if (!otpRecord) {
        return false;
      }

      // Mark OTP as used
      otpRecord.used = true;
      await otpRecord.save();

      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }

  async getUserForLogin(username: string): Promise<{ _id: string; username: string; email: string; phone: string; comparePassword: (password: string) => Promise<boolean> } | null> {
    try {
      const user = await User.findOne({ 
        $or: [{ username }, { email: username }] 
      });
      
      if (!user) return null;
      
      return {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        phone: user.phone,
        comparePassword: user.comparePassword.bind(user)
      };
    } catch (error) {
      console.error('Error getting user for login:', error);
      return null;
    }
  }

  // Gaming operations implementation
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      // For now, return default progress if none exists
      return {
        _id: `progress_${userId}`,
        userId,
        currentLevel: 1,
        completedLevels: [],
        totalScore: 0,
        totalXP: 0,
        achievements: [],
        lastPlayedAt: new Date(),
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  async updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | null> {
    try {
      // For now, return updated progress
      const progress = await this.getUserProgress(userId);
      if (!progress) return null;
      
      return {
        ...progress,
        ...updates,
        userId
      };
    } catch (error) {
      console.error('Error updating user progress:', error);
      return null;
    }
  }

  async createQuizSession(session: InsertQuizSession): Promise<QuizSession> {
    try {
      // Generate a session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        _id: sessionId,
        ...session,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error creating quiz session:', error);
      throw error;
    }
  }

  async addQuizAnswer(sessionId: string, answer: { questionId: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }): Promise<void> {
    try {
      // For now, just log the answer - in a real implementation, this would update the session in the database
      console.log(`Answer added to session ${sessionId}:`, answer);
    } catch (error) {
      console.error('Error adding quiz answer:', error);
      throw error;
    }
  }

  async completeQuizSession(sessionId: string, score: number): Promise<void> {
    try {
      // For now, just log completion - in a real implementation, this would mark the session as completed
      console.log(`Quiz session ${sessionId} completed with score: ${score}`);
    } catch (error) {
      console.error('Error completing quiz session:', error);
      throw error;
    }
  }

  async getAvailableQuestions(userId: string, level: number, count: number): Promise<QuizQuestionType[]> {
    try {
      // Get questions that the user hasn't answered yet for this level
      const answeredQuestions = await UserAnsweredQuestion.find({ 
        userId, 
        level 
      }).select('questionId');
      
      const answeredQuestionIds = answeredQuestions.map(aq => aq.questionId.toString());
      
      // Get available questions (not answered by user)
      const questions = await QuizQuestion.find({
        level,
        isActive: true,
        _id: { $nin: answeredQuestionIds }
      }).limit(count);

      // If we don't have enough unanswered questions, get some answered ones
      if (questions.length < count) {
        const additionalQuestions = await QuizQuestion.find({
          level,
          isActive: true,
          _id: { $in: answeredQuestionIds }
        }).limit(count - questions.length);
        
        questions.push(...additionalQuestions);
      }

      return questions.map(q => ({
        _id: q._id.toString(),
        level: q.level,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        category: q.category,
        difficulty: q.difficulty,
        isActive: q.isActive,
        createdAt: q.createdAt
      }));
    } catch (error) {
      console.error('Error getting available questions:', error);
      return [];
    }
  }

  async markQuestionAsAnswered(userId: string, questionId: string, level: number, isCorrect: boolean): Promise<void> {
    try {
      // Use upsert to avoid duplicate entries
      await UserAnsweredQuestion.findOneAndUpdate(
        { userId, questionId },
        { 
          userId, 
          questionId, 
          level, 
          isCorrect,
          answeredAt: new Date()
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error marking question as answered:', error);
      throw error;
    }
  }

  async seedQuizQuestions(): Promise<void> {
    try {
      const existingCount = await QuizQuestion.countDocuments();
      if (existingCount > 0) {
        console.log('Quiz questions already seeded');
        return;
      }

      const questionsToSeed = [
        // Level 1 Questions
        {
          level: 1,
          question: "What is the 50/30/20 rule in budgeting?",
          options: [
            "50% needs, 30% wants, 20% savings",
            "50% savings, 30% rent, 20% food", 
            "50% investment, 30% debt, 20% rent"
          ],
          correctAnswer: "50% needs, 30% wants, 20% savings",
          explanation: "The 50/30/20 rule is a simple budgeting method where you allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment. This helps balance between essential expenses, lifestyle spending, and future goals."
        },
        {
          level: 1,
          question: "What percentage of your income should ideally go to savings?",
          options: [
            "At least 20% of your income",
            "10% is more than enough", 
            "5% should be sufficient"
          ],
          correctAnswer: "At least 20% of your income",
          explanation: "Financial experts recommend saving at least 20% of your income for emergencies, retirement, and future goals to build long-term financial security."
        },
        {
          level: 1,
          question: "How many months of expenses should you keep in an emergency fund?",
          options: [
            "3-6 months of expenses",
            "1 month is enough", 
            "12 months minimum"
          ],
          correctAnswer: "3-6 months of expenses",
          explanation: "An emergency fund should cover 3-6 months of living expenses to protect you from unexpected financial setbacks like job loss or medical emergencies."
        },
        {
          level: 1,
          question: "What should you do first when creating a budget?",
          options: [
            "Track your current spending for a month",
            "Cut all unnecessary expenses immediately", 
            "Set up automatic savings transfers"
          ],
          correctAnswer: "Track your current spending for a month",
          explanation: "Before making changes, you need to understand where your money currently goes by tracking expenses for at least a month to identify spending patterns."
        },
        // Level 2 Questions
        {
          level: 2,
          question: "What is compound interest?",
          options: [
            "Interest earned on both principal and previously earned interest",
            "Interest that only applies to the original amount", 
            "A type of bank fee"
          ],
          correctAnswer: "Interest earned on both principal and previously earned interest",
          explanation: "Compound interest is when you earn interest on both your original investment and any interest previously earned, creating exponential growth over time."
        },
        {
          level: 2,
          question: "What is diversification in investing?",
          options: [
            "Spreading investments across different asset types to reduce risk",
            "Putting all money in one high-performing stock", 
            "Only investing in government bonds"
          ],
          correctAnswer: "Spreading investments across different asset types to reduce risk",
          explanation: "Diversification means spreading your investments across different asset classes, sectors, and geographies to reduce overall portfolio risk."
        },
        {
          level: 2,
          question: "What is a credit score used for?",
          options: [
            "To determine your creditworthiness for loans and credit cards",
            "To calculate your income tax", 
            "To track your spending habits"
          ],
          correctAnswer: "To determine your creditworthiness for loans and credit cards",
          explanation: "Credit scores help lenders assess the risk of lending money to you, affecting interest rates and approval for loans, credit cards, and even rentals."
        },
        {
          level: 2,
          question: "What is dollar-cost averaging?",
          options: [
            "Investing the same amount regularly regardless of market conditions",
            "Buying stocks only when prices are low", 
            "Calculating the average cost of your purchases"
          ],
          correctAnswer: "Investing the same amount regularly regardless of market conditions",
          explanation: "Dollar-cost averaging involves investing a fixed amount regularly, which can help reduce the impact of market volatility over time."
        },
        // Level 3 Questions
        {
          level: 3,
          question: "What is the difference between a traditional and Roth IRA?",
          options: [
            "Traditional is pre-tax contributions, Roth is after-tax contributions",
            "Traditional is for young people, Roth is for older people", 
            "There is no difference between them"
          ],
          correctAnswer: "Traditional is pre-tax contributions, Roth is after-tax contributions",
          explanation: "Traditional IRAs offer tax deductions now but taxable withdrawals in retirement, while Roth IRAs use after-tax money but offer tax-free withdrawals in retirement."
        },
        {
          level: 3,
          question: "What is an expense ratio in mutual funds?",
          options: [
            "The annual fee expressed as a percentage of your investment",
            "The ratio of gains to losses", 
            "The minimum investment required"
          ],
          correctAnswer: "The annual fee expressed as a percentage of your investment",
          explanation: "Expense ratios represent the annual fees charged by mutual funds and ETFs, expressed as a percentage of your investment. Lower expense ratios mean more money stays invested for you."
        },
        {
          level: 3,
          question: "What is asset allocation?",
          options: [
            "How you divide your investment portfolio among different asset categories",
            "The process of buying individual stocks", 
            "Calculating investment returns"
          ],
          correctAnswer: "How you divide your investment portfolio among different asset categories",
          explanation: "Asset allocation is the strategy of dividing your investment portfolio among different asset categories like stocks, bonds, and cash to balance risk and reward based on your goals and timeline."
        },
        {
          level: 3,
          question: "What is inflation and how does it affect your money?",
          options: [
            "Rising prices that reduce your money's purchasing power over time",
            "A type of investment return", 
            "The interest rate on savings accounts"
          ],
          correctAnswer: "Rising prices that reduce your money's purchasing power over time",
          explanation: "Inflation is the general increase in prices over time, which means your money can buy less in the future than it can today, making it important to invest for growth."
        },
        // Level 4 Questions
        {
          level: 4,
          question: "What is options trading?",
          options: [
            "Contracts that give you the right to buy or sell assets at specific prices",
            "A type of savings account", 
            "A form of life insurance"
          ],
          correctAnswer: "Contracts that give you the right to buy or sell assets at specific prices",
          explanation: "Options are financial contracts that give you the right (but not obligation) to buy or sell an underlying asset at a predetermined price within a specific timeframe."
        },
        {
          level: 4,
          question: "What is leverage in investing?",
          options: [
            "Using borrowed money to increase potential investment returns",
            "The process of selling investments", 
            "A type of retirement account"
          ],
          correctAnswer: "Using borrowed money to increase potential investment returns",
          explanation: "Leverage involves using borrowed capital to increase potential returns, but it also magnifies potential losses and increases investment risk."
        },
        {
          level: 4,
          question: "What are derivatives in finance?",
          options: [
            "Financial instruments whose value is based on underlying assets",
            "A type of bank account", 
            "Government-issued bonds"
          ],
          correctAnswer: "Financial instruments whose value is based on underlying assets",
          explanation: "Derivatives are complex financial instruments that derive their value from underlying assets like stocks, bonds, or commodities. Examples include options, futures, and swaps."
        },
        {
          level: 4,
          question: "What is a hedge fund?",
          options: [
            "An investment fund that uses complex strategies to generate returns",
            "A type of savings account for emergencies", 
            "A government retirement program"
          ],
          correctAnswer: "An investment fund that uses complex strategies to generate returns",
          explanation: "Hedge funds are private investment funds that use sophisticated strategies, including leverage, derivatives, and alternative investments, typically available only to accredited investors."
        }
      ];

      await QuizQuestion.insertMany(questionsToSeed);
      console.log(`Seeded ${questionsToSeed.length} quiz questions`);
    } catch (error) {
      console.error('Error seeding quiz questions:', error);
      throw error;
    }
  }
}

export const storage = new MongoStorage();
