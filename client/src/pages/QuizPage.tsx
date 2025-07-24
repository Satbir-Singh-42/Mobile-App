import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
// Simple Progress component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-white h-2 rounded-full transition-all duration-300" 
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
import { 
  ArrowLeftIcon, 
  CheckIcon,
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  GiftIcon,
  UserIcon,
  StarIcon,
  TrophyIcon
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const QuizPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% savings, 30% rent, 20% food",
        "50% needs, 30% wants, 20% savings",
        "50% investments, 30% debt, 20% rent",
        "50% entertainment, 30% food, 20% bills"
      ],
      correctAnswer: 1,
      explanation: "The 50/30/20 rule is a simple budgeting method where you allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.",
      category: "Budgeting"
    },
    {
      id: 2,
      question: "What is compound interest?",
      options: [
        "Interest paid only on principal",
        "Interest earned on interest",
        "Fixed interest rate",
        "Monthly interest payments"
      ],
      correctAnswer: 1,
      explanation: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It's often called 'interest on interest' and helps your money grow faster over time.",
      category: "Investing"
    },
    {
      id: 3,
      question: "What should be your first financial priority?",
      options: [
        "Investing in stocks",
        "Building an emergency fund",
        "Buying insurance",
        "Paying off all debt"
      ],
      correctAnswer: 1,
      explanation: "Building an emergency fund of 3-6 months of expenses should be your first priority. This provides financial security and prevents you from going into debt during unexpected situations.",
      category: "Financial Planning"
    },
    {
      id: 4,
      question: "What is diversification in investing?",
      options: [
        "Buying only one stock",
        "Spreading investments across different assets",
        "Investing only in bonds",
        "Keeping all money in savings"
      ],
      correctAnswer: 1,
      explanation: "Diversification means spreading your investments across different types of assets, sectors, and geographic regions to reduce risk. It's based on the principle of not putting all your eggs in one basket.",
      category: "Investing"
    },
    {
      id: 5,
      question: "What is a good credit score range?",
      options: [
        "300-500",
        "500-650",
        "650-750",
        "750-850"
      ],
      correctAnswer: 3,
      explanation: "A credit score of 750-850 is considered excellent. Scores in this range typically qualify you for the best interest rates on loans and credit cards, saving you thousands of dollars over time.",
      category: "Credit"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You have strong financial knowledge.";
    if (percentage >= 60) return "Good job! Keep learning to improve your financial skills.";
    if (percentage >= 40) return "Not bad! There's room for improvement in your financial knowledge.";
    return "Keep studying! Financial literacy is a journey, not a destination.";
  };

  const progressPercentage = ((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100;

  if (quizCompleted) {
    return (
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen w-full mobile-status-hidden pb-24 flex items-center justify-center">
        <Card className="mx-6 w-full max-w-sm bg-white rounded-3xl shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <TrophyIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nice Work!</h2>
              <div className="flex justify-center mb-4">
                {[1, 2, 3].map((star) => (
                  <StarIcon 
                    key={star} 
                    className={`w-8 h-8 ${score >= star * 2 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-4xl font-bold text-[#6366F1] mb-2">{score}/{questions.length}</div>
              <p className="text-gray-600 mb-6">{getScoreMessage()}</p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={resetQuiz}
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold"
              >
                Next Stage
              </Button>
              <Button
                onClick={() => setLocation("/dashboard")}
                variant="outline"
                className="w-full py-3 rounded-xl font-semibold"
              >
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <BottomNavigation currentPage="gaming" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen w-full mobile-status-hidden pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/gaming")}
            className="p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <div className="text-white text-center">
            <div className="text-lg font-semibold">Question {currentQuestion + 1}</div>
            <div className="text-sm opacity-80">of {questions.length}</div>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-white/20"
          />
        </div>
      </div>

      {showFeedback ? (
        /* Feedback Screen */
        <div className="px-6 flex-1 flex items-center justify-center">
          <Card className="w-full bg-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❌</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
              
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold"
              >
                {currentQuestion < questions.length - 1 ? "Continue" : "See Results"}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Question Screen */
        <div className="px-6 flex-1 flex items-center justify-center">
          <Card className="w-full bg-white rounded-3xl shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❓</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className={`w-full p-4 text-left justify-start rounded-xl border-2 transition-all ${
                      selectedAnswer === index 
                        ? 'border-[#6366F1] bg-[#6366F1]/5 text-[#6366F1]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm">{option}</span>
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation currentPage="gaming" />
    </div>
  );
};