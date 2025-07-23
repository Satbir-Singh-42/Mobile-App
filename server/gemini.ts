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
      const prompt = `Based on this user's financial profile, generate 3 personalized financial tips:
      
User Profile:
- Age: ${userData.age || 'Not specified'}
- Income Level: ${userData.income || 'Not specified'}
- Financial Goals: ${userData.goals || 'Not specified'}
- Experience Level: ${userData.experience || 'Beginner'}
- Learning Time: ${userData.practiceTime || 'Not specified'}

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

Focus on practical, actionable advice. Include security tips like "Never share your OTP—even with someone claiming to be from your bank."`;

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
}