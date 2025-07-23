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

      {/* Hexagonal Map Layout */}
      <div className="flex flex-col items-center space-y-8 mt-16">
        {/* Row 1: Level 4 and Gift */}
        <div className="flex items-center space-x-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white text-2xl">🎁</div>
          </div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white text-2xl">🔒</div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-white/30 rounded-full"></div>

        {/* Row 2: Level 3 alone */}
        <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
          <div className="transform -rotate-45 text-white text-2xl">🔒</div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-white/30 rounded-full"></div>

        {/* Row 3: Level 2 and Gift */}
        <div className="flex items-center space-x-8">
          <div className="w-16 h-16 bg-gray-500/60 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white text-2xl">🔒</div>
          </div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 transform rotate-45 rounded-lg flex items-center justify-center shadow-lg">
            <div className="transform -rotate-45 text-white text-2xl">🎁</div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="w-1 h-12 bg-teal-400 rounded-full shadow-lg"></div>

        {/* Row 4: Level 1 - Active */}
        <Button
          onClick={() => setCurrentView('quiz')}
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

      {/* Question Card */}
      <Card className="bg-white text-gray-900 border-0 rounded-3xl shadow-xl mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-4xl font-bold">?</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{quizData.question}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {quizData.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            variant="outline"
            className={`w-full p-4 text-left justify-start rounded-xl border-2 text-sm transition-all ${
              selectedAnswer === answer 
                ? 'bg-orange-500 text-white border-orange-500' 
                : index === 1
                ? 'bg-orange-400 text-white border-orange-400'
                : 'bg-purple-100 text-gray-900 border-purple-200 hover:border-purple-300'
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
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
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