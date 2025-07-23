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
    <>
      {/* Purple Header with Question Marks */}
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white px-6 pt-12 pb-16 rounded-b-[2rem] relative overflow-hidden">
        {/* Decorative Question Marks */}
        <div className="absolute top-8 left-4 text-6xl opacity-20 rotate-12">?</div>
        <div className="absolute top-16 right-8 text-4xl opacity-15 -rotate-12">?</div>
        <div className="absolute bottom-8 left-12 text-5xl opacity-10 rotate-45">?</div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
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

        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold mb-4 font-['Poppins']">Interesting QUIZ</h1>
          <h2 className="text-xl font-semibold mb-2">Awaits You</h2>
          <p className="text-sm opacity-90 mb-6">Test yourself on finance basics<br/>and get various prizes</p>
          
          <Button 
            onClick={() => setCurrentView('map')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            Start →
          </Button>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">{achievement.name}</h3>
                <p className="text-xs text-gray-600">{achievement.points} pts</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-900 mb-2">Your Rank</h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">#15 in Leaderboard</p>
                  <p className="text-sm text-gray-600">1,250 points earned</p>
                </div>
                <div className="text-orange-500 text-2xl">🏆</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );

  const renderMapView = () => (
    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] min-h-screen text-white px-6 pt-12 pb-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
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

      {/* Map Progress Nodes */}
      <div className="flex flex-col items-center space-y-8 mt-16">
        {/* Level 4 - Locked */}
        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">4</span>
        </div>
        
        {/* Connecting Line */}
        <div className="w-1 h-12 bg-gray-400"></div>
        
        {/* Level 3 - Locked */}
        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">3</span>
        </div>
        
        {/* Connecting Line */}
        <div className="w-1 h-12 bg-gray-400"></div>
        
        {/* Level 2 - Locked */}
        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">2</span>
        </div>
        
        {/* Connecting Line */}
        <div className="w-1 h-12 bg-green-400"></div>
        
        {/* Level 1 - Active/Available */}
        <Button
          onClick={() => setCurrentView('quiz')}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center"
        >
          <span className="text-white font-bold">1</span>
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-6 right-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <div className="text-orange-400 text-2xl mb-2">!</div>
          <p className="text-sm">Complete Level 1 to unlock the next challenge</p>
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
        return (
          <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden pb-24">
            {renderMainView()}
          </div>
        );
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