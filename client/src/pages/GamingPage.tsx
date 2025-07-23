import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  ArrowLeftIcon, 
  TrophyIcon,
  StarIcon,
  GiftIcon,
  TargetIcon,
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  UserIcon
} from "lucide-react";

export const GamingPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const achievements = [
    { name: "Budget Master", points: 100, completed: true, icon: "💰" },
    { name: "Savings Champion", points: 150, completed: true, icon: "🏆" },
    { name: "Quiz Expert", points: 75, completed: false, icon: "🧠" },
    { name: "Goal Setter", points: 200, completed: false, icon: "🎯" },
  ];

  const challenges = [
    { title: "Weekly Budget Challenge", reward: "50 points", difficulty: "Easy" },
    { title: "Investment Quiz Marathon", reward: "100 points", difficulty: "Medium" },
    { title: "Financial Goal Master", reward: "200 points", difficulty: "Hard" },
  ];

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white px-6 pt-6 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold font-['Poppins']">Game Arena</h1>
          <div className="w-10"></div>
        </div>

        {/* Points Display */}
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">1,250</div>
          <div className="text-sm opacity-90">Total Points Earned</div>
        </div>
      </div>

      <main className="px-6 py-6 space-y-6">
        {/* Current Challenges */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h2>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-green-600 font-medium">{challenge.reward}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-[#6366F1] hover:bg-[#5856EB] text-white"
                    >
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`border-0 shadow-sm ${
                achievement.completed ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gray-50'
              }`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{achievement.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{achievement.points} pts</span>
                  </div>
                  {achievement.completed && (
                    <div className="mt-2">
                      <TrophyIcon className="w-4 h-4 text-green-600 mx-auto" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Rank</h2>
              <Button variant="ghost" size="sm" className="text-[#6366F1]">
                View All
              </Button>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6366F1] mb-1">#12</div>
              <div className="text-sm text-gray-600">Out of 1,847 users</div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Dashboard */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/dashboard")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <HomeIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Dashboard</span>
          </Button>
          
          {/* Learning */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/search")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Learning</span>
          </Button>
          
          {/* Planner */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/planner")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Planner</span>
          </Button>
          
          {/* Gaming */}
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 min-w-0">
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <GiftIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-[#6366F1] font-medium">Gaming</span>
          </Button>
          
          {/* Settings */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};