import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PersonalizedTip {
  id: string;
  title: string;
  message: string;
  category: "security" | "budgeting" | "investment" | "savings" | "general";
  priority: "high" | "medium" | "low";
}

export interface DailyTip {
  id: string;
  message: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export class GeminiService {
  // Generate personalized financial tips based on user data
  static async generatePersonalizedTips(userData: any): Promise<PersonalizedTip[]> {
    try {
      const hasQuestionnaireData = userData.age || userData.income || userData.goals || userData.experience;
      
      const prompt = `Based on this user's financial profile, generate 3 personalized financial tips:
      
User Profile:
- Age: ${userData.age || 'Not specified'}
- Income Level: ${userData.income || 'Not specified'}
- Financial Goals: ${userData.goals?.join(', ') || 'Not specified'}
- Experience Level: ${userData.experience || 'Beginner'}
- Learning Time: ${userData.practiceTime || 'Not specified'}
- Language: ${userData.language || 'English'}

${hasQuestionnaireData ? 
  'Customize tips based on their specific profile.' : 
  'Since no questionnaire data is available, provide general financial literacy tips with emphasis on security.'
}

Generate exactly 3 tips in JSON format with this structure:
[
  {
    "id": "tip_1",
    "title": "Tip Title",
    "message": "Detailed tip message (50-80 words)",
    "category": "budgeting|investment|savings|security|general",
    "priority": "high|medium|low"
  }
]

Always include at least one security tip like "Never share your OTP—even with someone claiming to be from your bank." Focus on practical, actionable advice.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                message: { type: "string" },
                category: { type: "string", enum: ["security", "budgeting", "investment", "savings", "general"] },
                priority: { type: "string", enum: ["high", "medium", "low"] }
              },
              required: ["id", "title", "message", "category", "priority"]
            }
          }
        },
        contents: prompt,
      });

      const tips = JSON.parse(response.text || "[]");
      return tips;
    } catch (error) {
      console.error("Error generating personalized tips:", error);
      // Fallback tips with security focus
      return [
        {
          id: "security_1",
          title: "OTP Security Alert",
          message: "Never share your OTP—even with someone claiming to be from your bank. Banks will never ask for OTPs over phone or email.",
          category: "security",
          priority: "high"
        },
        {
          id: "budgeting_1", 
          title: "Start Your Budget Journey",
          message: "Begin with the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
          category: "budgeting",
          priority: "medium"
        },
        {
          id: "savings_1",
          title: "Emergency Fund Priority",
          message: "Build an emergency fund covering 3-6 months of expenses before investing in other financial products.",
          category: "savings",
          priority: "high"
        }
      ];
    }
  }

  // Handle chat conversations
  static async handleChatMessage(message: string, userContext?: any): Promise<string> {
    try {
      const systemPrompt = `You are Face2Finance AI, a helpful financial literacy assistant. 
      
Guidelines:
- Provide accurate, practical financial advice
- Keep responses concise (under 150 words)
- Focus on financial literacy, budgeting, saving, investing, and security
- Always prioritize user safety and fraud prevention
- Use simple language suitable for all experience levels
- Include actionable tips when relevant

User Context: ${userContext ? JSON.stringify(userContext) : 'No specific context'}

Respond helpfully to the user's financial question.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
        },
        contents: message,
      });

      return response.text || "I apologize, but I'm unable to provide a response right now. Please try asking your question again.";
    } catch (error) {
      console.error("Error handling chat message:", error);
      return "I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.";
    }
  }

  // Generate security alerts based on current trends
  static async generateSecurityAlert(): Promise<string> {
    try {
      const prompt = `Generate a brief financial security tip or alert (under 100 words) about current fraud trends or protection methods. Focus on practical advice users can implement immediately.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "Always verify the identity of anyone asking for your financial information by contacting your bank directly through official channels.";
    } catch (error) {
      console.error("Error generating security alert:", error);
      return "Never share your OTP—even with someone claiming to be from your bank.";
    }
  }

  // Generate daily tip based on user questionnaire data
  static async generateDailyTip(userData: any, date: string): Promise<DailyTip> {
    try {
      const hasQuestionnaireData = userData.age || userData.income || userData.goals || userData.experience;
      
      const prompt = `Generate a single daily financial tip based on this user's profile for ${date}:

User Profile:
- Age: ${userData.age || 'Not specified'}
- Income Level: ${userData.income || 'Not specified'}
- Financial Goals: ${userData.goals?.join(', ') || 'Not specified'}
- Experience Level: ${userData.experience || 'Beginner'}
- Learning Time: ${userData.practiceTime || 'Not specified'}
- Language: ${userData.language || 'English'}

${hasQuestionnaireData ? 
  'Create a personalized tip based on their specific profile.' : 
  'Provide a general financial literacy tip with emphasis on security.'
}

Generate exactly one tip in JSON format:
{
  "id": "daily_tip_" + "${date}",
  "message": "Single practical financial tip (40-60 words)"
}

Focus on actionable advice. Include security tips frequently like OTP safety, fraud prevention, or safe banking practices.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              id: { type: "string" },
              message: { type: "string" }
            },
            required: ["id", "message"]
          }
        },
        contents: prompt,
      });

      const tipData = JSON.parse(response.text || "{}");
      
      return {
        id: tipData.id || `daily_${Date.now()}`,
        message: tipData.message || "Never share your OTP—even with someone claiming to be from your bank.",
        date
      };
    } catch (error) {
      console.error("Error generating daily tip:", error);
      // Fallback daily tip
      return {
        id: `daily_fallback_${Date.now()}`,
        message: "Never share your OTP—even with someone claiming to be from your bank.",
        date
      };
    }
  }

  static async generateQuizQuestion(user: any, questionnaire: any): Promise<any> {
    const geminiService = new GeminiService();
    
    const userLevel = questionnaire?.experience || 'beginner';
    const userGoals = questionnaire?.goals || 'basic financial knowledge';
    
    const prompt = `Create a financial literacy quiz question for a ${userLevel} level user whose goals are: ${userGoals}.

    Return a JSON object with this exact structure:
    {
      "question": "Clear, educational question about finance",
      "options": ["Option A", "Option B", "Option C"],
      "correctAnswer": "The correct option text",
      "explanation": "Brief explanation of why this is correct and educational context"
    }

    Topics to focus on: budgeting, saving, investing basics, debt management, emergency funds, or financial planning.
    Make sure the question is practical and relevant to daily financial decisions.`;

    try {
      const response = await geminiService.ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
      });
      const result = response.text || "";
      // Try to parse as JSON
      const cleanResult = result.trim().replace(/```json|```/g, '');
      return JSON.parse(cleanResult);
    } catch (error) {
      console.error('Error generating quiz question:', error);
      // Return fallback question
      return {
        question: "What is the 50/30/20 rule in budgeting?",
        options: [
          "50% needs, 30% wants, 20% savings",
          "50% savings, 30% rent, 20% food", 
          "50% investment, 30% debt, 20% rent"
        ],
        correctAnswer: "50% needs, 30% wants, 20% savings",
        explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
      };
    }
  }
}