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
  StarIcon,
  MoreVertical,
  CheckCircle,
  XCircle,
  Gift,
  Lock,
  HelpCircle
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';

// SVG Icon Components
const LockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.8 2 8 3.8 8 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.2-1.8-4-4-4zM10 6c0-1.1.9-2 2-2s2 .9 2 2v2h-4V6z"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zM9 6h6v2H9V6zM4 16v4c0 1.1.9 2 2 2h3v-6H4zM15 22h3c1.1 0 2-.9 2-2v-4h-5v6z"/>
  </svg>
);

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string; // Only available during feedback
  explanation: string;
}

interface QuizSession {
  sessionId: string;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: Array<{questionId: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean}>;
  score: number;
  level: number;
}

export const GamingPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = useState<'main' | 'map' | 'quiz' | 'success'>('main');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [levelUnlocked, setLevelUnlocked] = useState<boolean>(false);

  const achievements = [
    { name: "Budget Master", points: 100, completed: true, icon: "💰" },
    { name: "Savings Champion", points: 150, completed: true, icon: "🏆" },
    { name: "Quiz Expert", points: 75, completed: false, icon: "🧠" },
    { name: "Goal Setter", points: 200, completed: false, icon: "🎯" },
  ];

  // Store correct answers for current quiz session (received from server)
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});

  // Get user progress from server (persistent across logins with daily reset check)
  const { data: userProgressData, error: progressError } = useQuery({
    queryKey: ['/api/gaming/progress'],
    enabled: true,
    refetchOnMount: true,
    retry: 1
  });

  const userProgress = (userProgressData as any)?.progress;

  // Handle daily reset notifications
  useEffect(() => {
    if ((userProgressData as any)?.dailyResetOccurred && userProgress) {
      const currentMap = userProgress.currentMap;
      const notification = currentMap > 1 
        ? `🗺️ New Map ${currentMap} unlocked! Previous map completed successfully.`
        : `🔄 Map ${currentMap} restarted from Level 1. Complete all levels to unlock next map!`;
      
      console.log('Daily Reset Notification:', notification);
      // In a real app, you'd show this as a toast or modal notification
    }
  }, [(userProgressData as any)?.dailyResetOccurred, userProgress?.currentMap]);

  // Handle authentication errors
  useEffect(() => {
    if (progressError && progressError.message.includes('Session expired')) {
      console.log('Session expired, redirecting to login');
      setLocation('/login');
    }
  }, [progressError, setLocation]);

  // Sync user level with server progress
  useEffect(() => {
    if (userProgress && typeof userProgress === 'object' && userProgress !== null) {
      const serverLevel = userProgress.currentLevel || 1;
      setUserLevel(serverLevel);
      
      // Also update localStorage for backup (but server is source of truth)
      localStorage.setItem('userLevel', serverLevel.toString());
    }
  }, [userProgress]);

  // Start quiz mutation
  const startQuizMutation = useMutation({
    mutationFn: async (level: number) => {
      const response = await apiRequest('/api/gaming/start-quiz', {
        method: 'POST',
        body: { level }
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      if (data.questions && data.questions.length > 0) {
        setQuizSession({
          sessionId: data.sessionId,
          currentQuestionIndex: 0,
          questions: data.questions,
          answers: [],
          score: 0,
          level: data.level
        });
        setCurrentView('quiz');
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsCorrect(null);
        setQuestionAnswers({});
      } else {
        console.error('No questions received from server');
      }
    },
    onError: (error) => {
      console.error('Failed to start quiz:', error);
    }
  });

  // Submit answer mutation  
  const submitAnswerMutation = useMutation({
    mutationFn: async (answerData: {
      sessionId: string;
      questionId: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      level: number;
    }) => {
      const response = await apiRequest('/api/gaming/submit-answer', {
        method: 'POST',
        body: answerData
      });
      
      return response.json();
    }
  });



  // Complete quiz mutation
  const completeQuizMutation = useMutation({
    mutationFn: async (completionData: {
      sessionId: string;
      score: number;
      level: number;
    }) => {
      const response = await apiRequest('/api/gaming/complete-quiz', {
        method: 'POST',
        body: completionData
      });
      
      return response.json();  
    },
    onSuccess: (data) => {
      // Update user level and bonus points from server response
      if (data.passed && !data.isRepeatLevel && data.levelUnlocked) {
        setUserLevel(data.levelUnlocked);
        localStorage.setItem('userLevel', data.levelUnlocked.toString());
        setLevelUnlocked(data.bonusUnlocked || false);
        setBonusPoints(data.bonusUnlocked ? 100 : 0);
      } else {
        // For repeat levels, don't change progression state
        setLevelUnlocked(false);
        setBonusPoints(0);
      }
      
      // Refresh progress data from server to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['/api/gaming/progress'] });
      queryClient.refetchQueries({ queryKey: ['/api/gaming/progress'] });
      setCurrentView('success');
    },
    onError: (error) => {
      console.error('Failed to complete quiz:', error);
    }
  });

  const handleAnswerSubmit = (answer: string) => {
    if (!quizSession) return;
    
    setSelectedAnswer(answer);
    
    const currentQuestion = quizSession.questions[quizSession.currentQuestionIndex];
    
    // Don't show feedback until we get server response
    setShowFeedback(false);
    setIsCorrect(null);
    
    // Submit answer to backend and get correctness result
    submitAnswerMutation.mutate({
      sessionId: quizSession.sessionId,
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      correctAnswer: answer, // Server will use the stored correct answer
      isCorrect: false, // Server will determine this
      level: quizSession.level
    }, {
      onSuccess: (data) => {
        // Server returns correctness, correct answer, and explanation
        setIsCorrect(data.isCorrect);
        setShowFeedback(true); // Show feedback only after getting server response
        
        // Store the correct answer for feedback display
        setQuestionAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: data.correctAnswer
        }));
        
        // Add answer to session
        const newAnswer = {
          questionId: currentQuestion.id,
          selectedAnswer: answer,
          correctAnswer: data.correctAnswer,
          isCorrect: data.isCorrect
        };

        setQuizSession(prev => prev ? {
          ...prev,
          answers: [...prev.answers, newAnswer],
          score: data.isCorrect ? prev.score + 1 : prev.score
        } : null);

        // Only auto-advance if not on the last question (to prevent skipping)
        // Removed auto-advance to give users time to read feedback
      }
    });
  };

  const handleNextQuestion = () => {
    if (!quizSession) return;

    if (quizSession.currentQuestionIndex < quizSession.questions.length - 1) {
      // Move to next question
      setQuizSession(prev => prev ? {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      } : null);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      // Quiz completed - submit final score and show success
      completeQuizMutation.mutate({
        sessionId: quizSession.sessionId,
        score: quizSession.score,
        level: quizSession.level
      });
    }
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

  const renderMapView = () => {
    // Use server progress data as source of truth, fallback to local state
    const serverLevel = userProgress?.currentLevel || 1;
    const currentMap = userProgress?.currentMap || 1;
    const completedLevels = userProgress?.completedLevels || [];
    const completedMaps = userProgress?.completedMaps || [];
    const mapProgress = userProgress?.mapProgress || {};
    const totalXP = userProgress?.totalXP || 0;
    const currentLevel = Math.max(serverLevel, userLevel); // Use highest level available

    // Get current map progress
    const currentMapProgress = mapProgress[currentMap.toString()] || { completed: false, levelsCompleted: [], pointsEarned: false };
    
    return (
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
          <h1 className="text-xl font-bold font-['Poppins']">Map {currentMap}</h1>
          <div className="w-10"></div>
        </div>

        {/* Hexagonal Map Layout with Assets */}
        <div className="flex flex-col items-center space-y-8 mt-16">
          {/* Row 1: Level 4 and Gift */}
          <div className="flex items-center space-x-8">
            <Button
              onClick={() => {
                // Gift box clicked - give bonus points
                setBonusPoints(100);
                setQuizSession({
                  sessionId: 'gift',
                  currentQuestionIndex: 0,
                  questions: [],
                  answers: [],
                  score: 0,
                  level: 1
                });
                setCurrentView('success');
              }}
              className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
            >
              <div className="transform -rotate-45 text-white">
                <GiftIcon />
              </div>
            </Button>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            {/* Level 4 */}
            {currentLevel >= 4 ? (
              <Button
                onClick={() => startQuizMutation.mutate(4)}
                disabled={startQuizMutation.isPending}
                className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <div className="transform -rotate-45 text-white font-bold text-xl">4</div>
              </Button>
            ) : (
              <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
                <div className="transform -rotate-45 text-white">
                  <LockIcon />
                </div>
              </div>
            )}
          </div>

          {/* Connecting Lines */}
          <div className={`w-1 h-12 rounded-full ${currentLevel >= 3 ? 'bg-teal-400' : 'bg-white/30'}`}></div>

          {/* Row 2: Level 3 alone */}
          {currentLevel >= 3 ? (
            <Button
              onClick={() => startQuizMutation.mutate(3)}
              disabled={startQuizMutation.isPending}
              className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
            >
              <div className="transform -rotate-45 text-white font-bold text-xl">3</div>
            </Button>
          ) : (
            <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
              <div className="transform -rotate-45 text-white">
                <LockIcon />
              </div>
            </div>
          )}

          {/* Connecting Lines */}
          <div className={`w-1 h-12 rounded-full ${currentLevel >= 2 ? 'bg-teal-400' : 'bg-white/30'}`}></div>

          {/* Row 3: Level 2 and Gift */}
          <div className="flex items-center space-x-8">
            {/* Level 2 */}
            {currentLevel >= 2 ? (
              <Button
                onClick={() => startQuizMutation.mutate(2)}
                disabled={startQuizMutation.isPending}
                className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              >
                <div className="transform -rotate-45 text-white font-bold text-xl">2</div>
              </Button>
            ) : (
              <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
                <div className="transform -rotate-45 text-white">
                  <LockIcon />
                </div>
              </div>
            )}
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <Button
              onClick={() => {
                // Gift box gives bonus XP when clicked (only if level 2+ is unlocked)
                if (currentLevel >= 2) {
                  setBonusPoints(50);
                  setCurrentView('success');
                  setQuizSession({
                    sessionId: 'gift',
                    currentQuestionIndex: 0,
                    questions: [],
                    answers: [],
                    score: 0,
                    level: 1
                  });
                }
              }}
              disabled={currentLevel < 2}
              className={`w-20 h-20 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 ${
                currentLevel >= 2 
                  ? 'bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 hover:scale-110 cursor-pointer' 
                  : 'bg-gradient-to-br from-teal-400/60 to-teal-500/60'
              }`}
            >
              <div className="transform -rotate-45 text-white">
                <GiftIcon />
              </div>
            </Button>
          </div>

          {/* Connecting Lines */}
          <div className="w-1 h-12 bg-teal-400 rounded-full shadow-lg"></div>

          {/* Row 4: Level 1 - Always available */}
          <Button
            onClick={() => startQuizMutation.mutate(1)}
            disabled={startQuizMutation.isPending}
            className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transform rotate-45 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
          >
            <div className="transform -rotate-45 text-white font-bold text-xl">1</div>
          </Button>
        </div>

        {/* Bottom Progress Bar */}
        <div className="fixed bottom-20 left-6 right-6">
          <div className="bg-white/10 rounded-full h-2 mb-4">
            <div className="bg-orange-400 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentLevel / 4) * 100}%` }}></div>
          </div>
        </div>


      </div>
    );
  };

  const renderQuizView = () => {
    if (!quizSession || !quizSession.questions || quizSession.questions.length === 0) return null;
    
    const currentQuestion = quizSession.questions[quizSession.currentQuestionIndex];
    if (!currentQuestion) return null;
    
    const questionNumber = quizSession.currentQuestionIndex + 1;
    const progressWidth = (questionNumber / quizSession.questions.length) * 100;

    return (
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
          <h1 className="text-lg font-bold font-['Poppins']">Question {questionNumber}</h1>
          <Button variant="ghost" size="icon" className="text-white p-2">
            <MoreVertical size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 mb-8">
          <div className="bg-white/20 rounded-full h-2">
            <div className="bg-orange-400 h-2 rounded-full transition-all duration-300" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          {/* Question Card */}
          <Card className="bg-white text-gray-900 border-0 rounded-3xl shadow-xl mb-6">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="text-white">
                    <QuestionIcon />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{currentQuestion.question}</h2>
              </div>
            </CardContent>
          </Card>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options?.map((answer: string, index: number) => (
              <Button
                key={index}
                onClick={() => !showFeedback && handleAnswerSubmit(answer)}
                disabled={showFeedback}
                className={`w-full p-6 text-left rounded-2xl font-medium transition-all text-base min-h-[70px] flex items-start ${
                  selectedAnswer === answer 
                    ? showFeedback && isCorrect
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                      : showFeedback && !isCorrect
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
                >
                  <span className="break-words whitespace-normal leading-relaxed text-left w-full">
                    {answer}
                  </span>
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <Card className="bg-white border-0 rounded-2xl mb-6 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <XCircle className="text-red-500" size={24} />
                    )}
                    <span className="font-bold text-lg text-gray-900">
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {currentQuestion.explanation}
                  </p>
                </CardContent>
              </Card>
            )}

          {/* Continue Button */}
          {showFeedback && (
            <Button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg text-lg"
            >
              {quizSession.currentQuestionIndex < quizSession.questions.length - 1 ? 'Next Stage' : 'Complete Quiz'}
            </Button>
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
  };

  const renderSuccessView = () => {
    if (!quizSession) return null;
    
    const isGiftBox = quizSession.sessionId === 'gift';
    
    if (isGiftBox) {
      // Special success view for gift box rewards
      return (
        <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <GiftIcon />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Gift Claimed!</h1>
            <p className="text-lg mb-6">You found a hidden treasure!</p>
            
            <div className="bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-lg p-4 mb-8">
              <p className="text-2xl font-bold text-teal-300">+{bonusPoints} Bonus Points!</p>
            </div>
            
            <Button
              onClick={() => {
                setCurrentView('map');
                setBonusPoints(0);
                setLevelUnlocked(false);
                queryClient.invalidateQueries({ queryKey: ['/api/gaming/progress'] });
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold"
            >
              Back to Map
            </Button>
          </div>
        </div>
      );
    }
    
    // Regular quiz completion view
    const scorePercentage = (quizSession.score / quizSession.questions.length) * 100;
    // Star system: 4/4 = 3 stars, 3/4 = 2 stars, 2/4 = 1 star, 1/4 or 0/4 = 1 star
    const stars = quizSession.score === 4 ? 3 : quizSession.score === 3 ? 2 : 1;
    const basePoints = quizSession.score * 25; // 25 points per correct answer
    const totalPoints = basePoints + bonusPoints;
    
    return (
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {levelUnlocked ? 'Level Unlocked!' : 'Nice Work!'}
          </h1>
          <p className="text-lg mb-6">You got {quizSession.score} out of {quizSession.questions.length} correct</p>
          
          {/* Show replay message if this is a repeated level */}
          {!levelUnlocked && bonusPoints === 0 && (
            <p className="text-sm text-white/80 mb-4">
              Level replayed - your progress remains unchanged
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3].map((starNum) => (
              <StarIcon 
                key={starNum}
                className={`h-8 w-8 ${starNum <= stars ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
              />
            ))}
          </div>
          
          {/* Points breakdown */}
          <div className="space-y-2 mb-8">
            <p className="text-lg">Quiz Points: {basePoints} pts</p>
            {levelUnlocked && (
              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-3 mb-4">
                <p className="text-lg font-bold text-green-300">🎉 New Level Unlocked!</p>
                <p className="text-base text-green-200">Bonus: +{bonusPoints} pts</p>
              </div>
            )}
            <p className="text-xl font-bold">Total: {totalPoints} pts</p>
          </div>
          
          <Button
            onClick={() => {
              // Check if this was level 4 completion (map completion)
              if (quizSession.level === 4) {
                // Show completion message or redirect appropriately
                setCurrentView('map');
              } else {
                setCurrentView('map');
              }
              // Reset bonus state
              setBonusPoints(0);
              setLevelUnlocked(false);
              // Invalidate progress to refresh the map with new progress
              queryClient.invalidateQueries({ queryKey: ['/api/gaming/progress'] });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold mb-4"
          >
            {quizSession.level === 4 ? 'Map Complete!' : 'Continue to Map'}
          </Button>
        </div>
      </div>
    );
  };

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

export default GamingPage;