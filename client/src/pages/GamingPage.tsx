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

  // AI Quiz state
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Generate AI quiz question
  const { data: aiQuestion, refetch: generateQuestion } = useQuery({
    queryKey: ['/api/ai/quiz-question', currentQuestion],
    enabled: false,
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: (answer: string) => 
      apiRequest('/api/ai/check-answer', 'POST', { 
        question: currentQuizQuestion?.question,
        answer,
        correctAnswer: currentQuizQuestion?.correctAnswer 
      }),
    onSuccess: (result) => {
      setIsCorrect(result.isCorrect);
      setShowFeedback(true);
    }
  });

  // Load question when quiz view opens
  useEffect(() => {
    if (currentView === 'quiz' && !currentQuizQuestion) {
      generateQuestion().then((result) => {
        if (result.data) {
          setCurrentQuizQuestion(result.data);
        }
      });
    }
  }, [currentView]);

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    submitAnswerMutation.mutate(answer);
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
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('map')}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold font-['Poppins']">Question 1</h1>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-white/20 rounded-full h-2">
          <div className="bg-orange-400 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      {currentQuizQuestion ? (
        <>
          {/* Question Card */}
          <Card className="bg-white text-gray-900 border-0 rounded-3xl shadow-xl mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-white">
                    <QuestionIcon />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{currentQuizQuestion.question}</h2>
              </div>
            </CardContent>
          </Card>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuizQuestion.options.map((answer: string, index: number) => (
              <Button
                key={index}
                onClick={() => !showFeedback && handleAnswerSubmit(answer)}
                disabled={showFeedback}
                variant="outline"
                className={`w-full p-4 text-left justify-start rounded-xl border-2 text-sm transition-all ${
                  selectedAnswer === answer 
                    ? showFeedback && isCorrect
                      ? 'bg-green-500 text-white border-green-500' 
                      : showFeedback && !isCorrect
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-orange-500 text-white border-orange-500'
                    : showFeedback && answer === currentQuizQuestion.correctAnswer
                    ? 'bg-green-400 text-white border-green-400'
                    : 'bg-purple-100 text-gray-900 border-purple-200 hover:border-purple-300'
                }`}
              >
                {answer}
              </Button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <Card className="bg-white border-0 rounded-2xl shadow-lg mb-6">
              <CardContent className="p-4">
                <div className={`text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">{currentQuizQuestion.explanation}</p>
                  {!isCorrect && (
                    <p className="text-xs text-gray-600">
                      Correct answer: {currentQuizQuestion.correctAnswer}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Button */}
          {showFeedback && (
            <Button
              onClick={() => setCurrentView('success')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
            >
              Continue
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Generating your question...</p>
          </div>
        </div>
      )}
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