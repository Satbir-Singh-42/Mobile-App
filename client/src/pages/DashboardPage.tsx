import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  SearchIcon, 
  BellIcon, 
  UserIcon, 
  BookOpenIcon, 
  CreditCardIcon, 
  ShieldCheckIcon, 
  TrendingUpIcon, 
  PlusIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  TargetIcon,
  TrophyIcon,
  CalendarIcon
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { authAPI } from "@/lib/auth";

export const DashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [forceRerender, setForceRerender] = useState(0);
  const [userProgress, setUserProgress] = useState({
    lessonsCompleted: 0,
    hoursLearned: 0,
    currentStreak: 0,
    totalModules: 4
  });

  useEffect(() => {
    const userData = authAPI.getUser();
    setUser(userData);

    // Listen for language changes
    const handleLanguageChange = () => {
      setForceRerender(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setLocation("/");
  };

  const modules = [
    {
      id: "budgeting",
      title: "Budgeting Basics",
      description: "Master the fundamentals of personal budgeting",
      icon: CreditCardIcon,
      progress: userProgress.lessonsCompleted > 0 ? 25 : 0,
      color: "bg-[#E8F5E8]",
      iconColor: "text-[#2ECC40]",
      isUnlocked: true,
      lessons: 8,
      duration: "2 weeks"
    },
    {
      id: "saving",
      title: "Smart Saving",
      description: "Build wealth through strategic saving",
      icon: TrendingUpIcon,
      progress: userProgress.lessonsCompleted > 3 ? 15 : 0,
      color: "bg-[#E3F2FD]",
      iconColor: "text-[#2196F3]",
      isUnlocked: userProgress.lessonsCompleted > 3,
      lessons: 6,
      duration: "1.5 weeks"
    },
    {
      id: "investing", 
      title: "Investment Basics",
      description: "Start your investment journey",
      icon: BookOpenIcon,
      progress: 0,
      color: "bg-[#F3E5F5]",
      iconColor: "text-[#9C27B0]",
      isUnlocked: userProgress.lessonsCompleted > 8,
      lessons: 10,
      duration: "3 weeks"
    },
    {
      id: "security",
      title: "Financial Security",
      description: "Protect your financial future",
      icon: ShieldCheckIcon,
      progress: 0,
      color: "bg-[#FFF3E0]",
      iconColor: "text-[#FF9800]",
      isUnlocked: userProgress.lessonsCompleted > 15,
      lessons: 5,
      duration: "1 week"
    }
  ];

  const todaysTips = [
    {
      id: 1,
      title: "Track your daily expenses",
      description: "Small purchases add up quickly",
      category: "Budgeting",
      isCompleted: false
    },
    {
      id: 2,
      title: "Review your financial goals",
      description: "Stay motivated and on track",
      category: "Planning",
      isCompleted: false
    }
  ];

  const quickActions = [
    {
      id: "budget",
      title: "Create Budget",
      icon: PlusIcon,
      color: "bg-[#4157ff]",
      action: () => {}
    },
    {
      id: "goal",
      title: "Set Goal", 
      icon: TargetIcon,
      color: "bg-[#2ECC40]",
      action: () => {}
    },
    {
      id: "track",
      title: "Track Expense",
      icon: CalendarIcon,
      color: "bg-[#FF9800]",
      action: () => {}
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full mobile-status-hidden">
      {/* Modern Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#4157ff] text-white text-lg font-['Poppins'] font-semibold rounded-full flex items-center justify-center">
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-600">{getGreeting()}</p>
                <h1 className="font-['Poppins'] font-semibold text-lg text-[#242424]">
                  {user?.username || "User"}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/search")}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <SearchIcon className="h-6 w-6 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/notifications")}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <BellIcon className="h-6 w-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-['Poppins']">2</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/profile")}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <UserIcon className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20">
        {/* Progress Overview Card */}
        <Card className="mb-6 bg-gradient-to-r from-[#4157ff] to-[#3146e6] border-0">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-['Poppins'] font-semibold text-lg">Your Progress</h2>
                <p className="font-['Poppins'] text-sm opacity-90">Keep up the great work!</p>
              </div>
              <TrophyIcon className="h-8 w-8 opacity-90" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{userProgress.lessonsCompleted}</div>
                <div className="text-xs opacity-90">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{userProgress.currentStreak}</div>
                <div className="text-xs opacity-90">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{Math.round((userProgress.lessonsCompleted / 29) * 100)}%</div>
                <div className="text-xs opacity-90">Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {userProgress.lessonsCompleted > 0 && (
          <div className="mb-6">
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#242424] mb-3">Quick Actions</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    onClick={action.action}
                    className={`${action.color} text-white hover:opacity-90 min-w-[120px] h-16 flex-col gap-1 flex-shrink-0`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs font-['Poppins']">{action.title}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Today's Tips - Only show if user has started learning */}
        {userProgress.lessonsCompleted > 0 && (
          <div className="mb-6">
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#242424] mb-3">Today's Tips</h3>
            <div className="space-y-3">
              {todaysTips.map((tip) => (
                <Card key={tip.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        tip.isCompleted ? 'bg-[#4157ff] border-[#4157ff]' : 'border-gray-300'
                      }`}>
                        {tip.isCompleted && <CheckCircleIcon className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-['Poppins'] font-medium text-[#242424]">{tip.title}</h4>
                        <p className="font-['Poppins'] text-sm text-gray-600">{tip.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs font-['Poppins'] text-gray-600 rounded-full">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Learning Path */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#242424]">Learning Path</h3>
            <Button variant="ghost" size="sm" className="font-['Poppins'] text-[#4157ff]">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              const isLocked = !module.isUnlocked;
              
              return (
                <Card key={module.id} className={`border ${isLocked ? 'border-gray-200 opacity-60' : 'border-gray-200 hover:border-[#4157ff]'} transition-all duration-200`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center flex-shrink-0 ${isLocked ? 'grayscale' : ''}`}>
                        <IconComponent className={`w-7 h-7 ${module.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-['Poppins'] font-semibold text-[#242424] truncate">
                            {module.title}
                          </h4>
                          {isLocked && (
                            <div className="bg-gray-100 px-2 py-1 rounded-full">
                              <span className="text-xs font-['Poppins'] text-gray-600">Locked</span>
                            </div>
                          )}
                        </div>
                        <p className="font-['Poppins'] text-sm text-gray-600 mb-2">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{module.lessons} lessons</span>
                          <span>{module.duration}</span>
                        </div>
                        
                        {!isLocked && module.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-['Poppins'] text-gray-600">Progress</span>
                              <span className="text-xs font-['Poppins'] text-gray-600">{module.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-[#4157ff] h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${module.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0">
                        {!isLocked ? (
                          <Button 
                            size="sm"
                            className="bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] rounded-lg"
                          >
                            {module.progress > 0 ? (
                              <>
                                <PlayIcon className="w-4 h-4 mr-1" />
                                Continue
                              </>
                            ) : (
                              <>
                                <PlayIcon className="w-4 h-4 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            disabled
                            variant="outline"
                            className="font-['Poppins'] rounded-lg"
                          >
                            {userProgress.lessonsCompleted < 3 ? "Complete Budgeting first" : 
                             userProgress.lessonsCompleted < 8 ? "Complete more lessons" :
                             "Unlock soon"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Motivational Message for New Users */}
        {userProgress.lessonsCompleted === 0 && (
          <Card className="mb-6 border-[#4157ff] bg-[#4157ff0a]">
            <CardContent className="p-6 text-center">
              <TrophyIcon className="h-12 w-12 text-[#4157ff] mx-auto mb-3" />
              <h3 className="font-['Poppins'] font-semibold text-lg text-[#242424] mb-2">
                Start Your Financial Journey!
              </h3>
              <p className="font-['Poppins'] text-sm text-gray-600 mb-4">
                Complete your first lesson in Budgeting Basics to unlock new features and track your progress.
              </p>
              <Button 
                className="bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] rounded-lg"
                onClick={() => {}}
              >
                Begin Learning
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};