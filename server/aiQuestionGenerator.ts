import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export interface AIGeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  level: number;
  mapNumber: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export class AIQuestionGenerator {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateQuestions(level: number, mapNumber: number, count: number = 4): Promise<AIGeneratedQuestion[]> {
    try {
      const difficulty = this.getDifficultyForLevel(level);
      const topics = this.getTopicsForMap(mapNumber);
      
      const prompt = `Generate ${count} multiple-choice financial literacy questions for:
- Level: ${level} (${difficulty} difficulty)
- Map: ${mapNumber} (${topics})
- Each question should have exactly 3 options
- Include detailed explanations for learning
- Focus on practical financial knowledge

Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3"],
    "correctAnswer": "Exact text of correct option",
    "explanation": "Detailed explanation of why this is correct",
    "level": ${level},
    "mapNumber": ${mapNumber},
    "category": "budgeting|investing|credit|insurance|retirement",
    "difficulty": "${difficulty}"
  }
]

Make questions practical and educational for real-world financial planning.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const questions = JSON.parse(text.trim()) as AIGeneratedQuestion[];
      
      // Validate the response
      if (!Array.isArray(questions) || questions.length !== count) {
        throw new Error('Invalid AI response format');
      }
      
      // Validate each question structure
      questions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 3 || 
            !q.correctAnswer || !q.explanation || !q.options.includes(q.correctAnswer)) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });
      
      return questions;
    } catch (error) {
      console.error('Error generating AI questions:', error);
      throw new Error('Failed to generate AI questions');
    }
  }

  private getDifficultyForLevel(level: number): 'easy' | 'medium' | 'hard' {
    if (level <= 1) return 'easy';
    if (level <= 2) return 'medium';
    return 'hard';
  }

  private getTopicsForMap(mapNumber: number): string {
    const mapTopics = {
      1: 'Basic budgeting, savings, emergency funds, basic investing concepts',
      2: 'Credit scores, debt management, retirement planning, advanced investing',
      3: 'Real estate, insurance, tax planning, estate planning',
      4: 'Advanced investments, business finance, wealth management'
    };
    
    return mapTopics[mapNumber as keyof typeof mapTopics] || 'General financial literacy';
  }

  async isAPIWorking(): Promise<boolean> {
    try {
      if (!process.env.GOOGLE_API_KEY) {
        return false;
      }
      
      // Test with a simple question
      const result = await this.model.generateContent('Generate a simple test response: "API is working"');
      const response = await result.response;
      const text = response.text();
      
      return text.includes('API is working');
    } catch (error) {
      console.error('Gemini API test failed:', error);
      return false;
    }
  }
}

export const aiQuestionGenerator = new AIQuestionGenerator();