import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { 
  ArrowLeftIcon, 
  CheckIcon,
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  GamepadIcon,
  UserIcon,
  StarIcon
} from "lucide-react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// SVG Icon Components
const LockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.8 2 8 3.8 8 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.2-1.8-4-4-4zM10 6c0-1.1.9-2 2-2s2 .9 2 2v2h-4V6z"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
  </svg>
);

export const GamingPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentView, setCurrentView] = useState<'main' | 'map' | 'quiz' | 'success'>('main');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const achievements = [
    { name: "Budget Master", points: 100, completed: true, icon: "💰" },
    { name: "Savings Champion", points: 150, completed: true, icon: "🏆" },
    { name: "Quiz Expert", points: 75, completed: false, icon: "🧠" },
    { name: "Goal Setter", points: 200, completed: false, icon: "🎯" },
  ];

  // Quiz question bank for instant loading
  const questionBank = [
    {
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% needs, 30% wants, 20% savings",
        "50% savings, 30% rent, 20% food", 
        "50% investment, 30% debt, 20% rent"
      ],
      correctAnswer: "50% needs, 30% wants, 20% savings",
      explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
    },
    {
      question: "What percentage of your income should ideally go to savings?",
      options: [
        "At least 20% of your income",
        "10% is more than enough", 
        "5% should be sufficient"
      ],
      correctAnswer: "At least 20% of your income",
      explanation: "Financial experts recommend saving at least 20% of your income for emergencies, retirement, and future goals."
    },
    {
      question: "How many months of expenses should you keep in an emergency fund?",
      options: [
        "3-6 months of expenses",
        "1 month is enough", 
        "12 months minimum"
      ],
      correctAnswer: "3-6 months of expenses",
      explanation: "An emergency fund should cover 3-6 months of living expenses to protect you from unexpected financial setbacks."
    },
    {
      question: "What should you do first when creating a budget?",
      options: [
        "Track your current spending for a month",
        "Cut all unnecessary expenses immediately", 
        "Set up automatic savings transfers"
      ],
      correctAnswer: "Track your current spending for a month",
      explanation: "Before making changes, you need to understand where your money currently goes by tracking expenses for at least a month."
    }
  ];

  // Quiz state
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Load question instantly when quiz view opens
  useEffect(() => {
    if (currentView === 'quiz' && !currentQuizQuestion) {
      // Pick a random question from the bank for instant loading
      const randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
      setCurrentQuizQuestion(randomQuestion);
    }
  }, [currentView]);

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Check answer locally for instant feedback
    const correct = answer.trim() === currentQuizQuestion.correctAnswer.trim();
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const renderMainView = () => (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-24 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative Question Marks - Enhanced */}
      <div className="absolute top-16 left-4 text-8xl opacity-15 rotate-12">?</div>
      <div className="absolute top-32 right-8 text-6xl opacity-20 -rotate-12">?</div>
      <div className="absolute bottom-32 left-12 text-7xl opacity-10 rotate-45">?</div>
      <div className="absolute top-48 left-1/2 text-5xl opacity-10 -rotate-12">?</div>
      <div className="absolute bottom-16 right-16 text-6xl opacity-15 rotate-12">?</div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-16 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/dashboard")}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <div className="w-10"></div>
      </div>

      {/* Main Content - Centered */}
      <div className="text-center relative z-10 flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 font-['Poppins']">Interesting QUIZ</h1>
        <h2 className="text-3xl font-semibold mb-6">Awaits You</h2>
        <p className="text-lg opacity-90 mb-12 leading-relaxed max-w-xs mx-auto">
          Test yourself on finance basics<br/>and get various prizes
        </p>
        
        <Button 
          onClick={() => setCurrentView('map')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-full font-semibold text-lg mx-auto"
        >
          Start →
        </Button>
      </div>
    </div>
  );

  const renderMapView = () => (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-32 relative overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('main')}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-['Poppins']">Map 1</h1>
        <div className="w-10"></div>
      </div>

      {/* Hexagonal Map Layout with Assets */}
      <div className="flex flex-col items-center space-y-8 mt-16">
        {/* Row 1: Level 4 and Gift */}
        <div className="flex items-center space-x-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white">
              <GiftIcon />
            </div>
          </div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white">
              <LockIcon />
            </div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-white/30 rounded-full"></div>

        {/* Row 2: Level 3 alone */}
        <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
          <div className="transform -rotate-45 text-white">
            <LockIcon />
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-white/30 rounded-full"></div>

        {/* Row 3: Level 2 and Gift */}
        <div className="flex items-center space-x-8">
          <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white">
              <LockIcon />
            </div>
          </div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white">
              <GiftIcon />
            </div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-teal-400 rounded-full shadow-lg"></div>

        {/* Row 4: Level 1 - Active */}
        <Button
          onClick={() => {
            setCurrentView('quiz');
            setCurrentQuizQuestion(null);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setIsCorrect(null);
          }}
          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        >
          <div className="transform -rotate-45 text-white font-bold text-xl">1</div>
        </Button>
      </div>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-20 left-6 right-6">
        <div className="bg-white/10 rounded-full h-2 mb-4">
          <div className="bg-orange-400 h-2 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>
  );

  const renderQuizView = () => (
    <div className="fixed inset-0 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6] text-white flex flex-col">
      {/* Mobile Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
        <span>19:27</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <div className="ml-2">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <path d="M1 3.5C1 2.12 2.12 1 3.5 1h9C13.88 1 15 2.12 15 3.5v5c0 1.38-1.12 2.5-2.5 2.5h-9C2.12 11 1 9.88 1 8.5v-5z"/>
            </svg>
          </div>
          <div className="w-6 h-3 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('map')}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-['Poppins']">Question 1</h1>
        <Button variant="ghost" size="icon" className="text-white p-2">
          <MoreVertical size={20} />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-8">
        <div className="bg-white/20 rounded-full h-2">
          <div className="bg-orange-400 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto">

        {currentQuizQuestion ? (
          <>
            {/* Question Card */}
            <Card className="bg-white text-gray-900 border-0 rounded-3xl shadow-xl mb-6">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <div className="text-white">
                      <QuestionIcon />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">{currentQuizQuestion.question}</h2>
                </div>
              </CardContent>
            </Card>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQuizQuestion.options.map((answer: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => !showFeedback && handleAnswerSubmit(answer)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left rounded-2xl text-white font-medium transition-all text-base ${
                    selectedAnswer === answer 
                      ? showFeedback && isCorrect
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 border-2 border-orange-300' 
                        : showFeedback && !isCorrect
                        ? 'bg-red-500 hover:bg-red-500'
                        : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600'
                      : showFeedback && answer === currentQuizQuestion.correctAnswer
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 border-2 border-orange-300'
                      : 'bg-white/20 hover:bg-white/30 border-2 border-transparent hover:border-white/50'
                  }`}
                >
                  {answer}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <Card className="bg-white/10 border-0 rounded-2xl mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="text-green-400" size={24} />
                    ) : (
                      <XCircle className="text-red-400" size={24} />
                    )}
                    <span className="font-bold text-lg">
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className="text-white/90 leading-relaxed text-base">
                    {currentQuizQuestion.explanation}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            {showFeedback && (
              <Button
                onClick={() => setCurrentView('success')}
                className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg text-lg"
              >
                Continue
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading question...</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Dots */}
      <div className="flex justify-center pb-4">
        <div className="flex space-x-2">
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderSuccessView = () => (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Nice Work</h1>
        
        <div className="flex items-center justify-center space-x-2 mb-6">
          <StarIcon className="h-6 w-6 text-yellow-400 fill-current" />
          <StarIcon className="h-6 w-6 text-yellow-400 fill-current" />
          <StarIcon className="h-6 w-6 text-gray-400" />
        </div>
        
        <p className="text-lg mb-8">You Earned 50 pts</p>
        
        <Button
          onClick={() => setCurrentView('main')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold mb-4"
        >
          Next Stage
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'map':
        return renderMapView();
      case 'quiz':
        return renderQuizView();
      case 'success':
        return renderSuccessView();
      default:
        return renderMainView();
    }
  };

  return (
    <>
      {renderContent()}
      
      {/* Bottom Navigation - Only show on main view */}
      {currentView === 'main' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <HomeIcon className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Dashboard</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/search")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Learning</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/planner")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Planner</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 p-2"
          >
            <GamepadIcon className="h-5 w-5 text-[#6366F1]" />
            <span className="text-xs text-[#6366F1] font-medium">Gaming</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/settings")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <UserIcon className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Settings</span>
          </Button>
        </div>
      )}
    </>
  );
};