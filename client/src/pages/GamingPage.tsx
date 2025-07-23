import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState } from "react";
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

  // Quiz data structure
  const quizData = {
    question: "What is the 50/30/20 rule in budgeting?",
    answers: [
      "50% savings, 30% rent, 20% food",
      "50% investment, 30% debt, 30% rent",
      "50% groceries, 30% bills, 20% investment"
    ],
    correctAnswer: 0
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
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-8 w-3 h-3 bg-white/20 rounded-full"></div>
      <div className="absolute top-32 right-12 w-2 h-2 bg-white/15 rounded-full"></div>
      <div className="absolute bottom-40 left-16 w-4 h-4 bg-white/10 rounded-full"></div>
      <div className="absolute top-48 right-8 w-2 h-2 bg-white/25 rounded-full"></div>
      
      <div className="flex items-center justify-between mb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('main')}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold font-['Poppins']">Map 1</h1>
          <p className="text-sm opacity-75 mt-1">Financial Basics Journey</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Map Progress Path */}
      <div className="flex flex-col items-center space-y-6 mt-12 relative">
        {/* Level 4 - Locked */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300/30">
            <span className="text-white font-bold text-xl">4</span>
          </div>
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-400/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Connecting Path */}
        <div className="w-2 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full relative">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full"></div>
        </div>
        
        {/* Level 3 - Locked */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300/30">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-400/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Connecting Path */}
        <div className="w-2 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full relative">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full"></div>
        </div>
        
        {/* Level 2 - Locked */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300/30">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gray-400/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Connecting Path - Active */}
        <div className="w-2 h-16 bg-gradient-to-b from-green-400 to-green-500 rounded-full relative animate-pulse">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full shadow-lg"></div>
        </div>
        
        {/* Level 1 - Active/Available */}
        <div className="relative">
          <Button
            onClick={() => setCurrentView('quiz')}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-full flex items-center justify-center shadow-xl border-4 border-green-300/50 transition-all duration-300 hover:scale-110"
          >
            <span className="text-white font-bold text-xl">1</span>
          </Button>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-green-400/70 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 bg-green-400/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="absolute bottom-8 left-6 right-6 space-y-3">
        {/* Current Challenge Info */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
          <div className="text-orange-400 text-3xl mb-2">!</div>
          <p className="text-sm font-medium mb-1">Complete Level 1 to unlock the next challenge</p>
          <p className="text-xs opacity-75">Progress: 0/4 levels completed</p>
        </div>
        
        {/* Next Map Preview */}
        <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-4 text-center border border-orange-400/30">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-sm font-medium text-orange-300">Map 2</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
          <p className="text-xs opacity-90">Advanced Financial Planning</p>
          <p className="text-xs opacity-75 mt-1">🔓 Unlocks tomorrow</p>
        </div>
      </div>
    </div>
  );

  const renderQuizView = () => (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('map')}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-['Poppins']">Question {currentQuestion}</h1>
        <div className="w-10"></div>
      </div>

      {/* Question Card */}
      <Card className="bg-white text-gray-900 border-0 rounded-3xl shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">?</span>
            </div>
            <h2 className="text-lg font-semibold mb-4">{quizData.question}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Answer Options */}
      <div className="space-y-4 mb-8">
        {quizData.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            className={`w-full p-4 text-left rounded-2xl transition-all ${
              selectedAnswer === answer 
                ? 'bg-green-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {answer}
          </Button>
        ))}
      </div>

      {/* Submit Button */}
      {selectedAnswer && (
        <Button
          onClick={() => setCurrentView('success')}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold"
        >
          Submit Answer
        </Button>
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