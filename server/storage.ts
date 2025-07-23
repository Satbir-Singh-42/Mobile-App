import { User, OTP, Questionnaire } from "./database";
import type { 
  InsertUser, 
  QuestionnaireData, 
  User as UserType
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUserById(id: string): Promise<UserType | null>;
  getUserByUsername(username: string): Promise<UserType | null>;
  getUserByEmail(email: string): Promise<UserType | null>;
  createUser(user: InsertUser): Promise<UserType>;
  updateUser(id: string, updates: Partial<UserType>): Promise<UserType | null>;
  
  // Questionnaire operations
  saveQuestionnaire(data: QuestionnaireData): Promise<void>;
  getQuestionnaireByUserId(userId: string): Promise<QuestionnaireData | null>;
  
  // OTP operations
  storeOTP(email: string, otp: string): Promise<boolean>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
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
}

export const storage = new MongoStorage();
