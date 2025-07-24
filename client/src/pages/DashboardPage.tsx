import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { taskAPI } from "@/lib/taskAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  SearchIcon, 
  BellIcon, 
  UserIcon, 
  HomeIcon,
  MessageSquareIcon,
  CreditCardIcon,
  BookOpenIcon,
  TrendingUpIcon,
  ShieldIcon,
  MoreHorizontalIcon,
  ArrowRightIcon,
  StarIcon,
  WifiIcon,
  BatteryIcon,
  GraduationCapIcon,
  DollarSignIcon,
  PiggyBankIcon,
  CalculatorIcon,
  MapPinIcon,
  PieChartIcon,
  TargetIcon,
  PlayIcon,
  ChevronRightIcon,
  GiftIcon,
  RefreshCwIcon,
  Gamepad2Icon,
  TrophyIcon,
  Clock3Icon,
  CalendarIcon
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { authAPI } from "@/lib/auth";
import { ChatWidget } from "@/components/ui/chat-widget";
import { PersonalizedTips } from "@/components/ui/personalized-tips";

// Import category icons from attached assets
import calculatorIcon from "@assets/1(1)_1753277841626.png";
import quizIcon from "@assets/2(1)_1753277841627.png";
import goalsIcon from "@assets/3(1)_1753277841627.png";
import tipsIcon from "@assets/4(1)_1753277841627.png";
import privacyIcon from "@assets/4_1753277841628.png";
import budgetingIcon from "@assets/5_1753277841628.png";
import savingIcon from "@assets/6_1753277841628.png";
import cyberIcon from "@assets/7_1753277841628.png";


export const DashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [forceRerender, setForceRerender] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch tasks from database for dashboard
  const { data: tasksData, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: () => taskAPI.getTasks(),
  });

  // Fetch gaming progress for dashboard integration
  const { data: gamingProgress } = useQuery({
    queryKey: ['/api/gaming/progress'],
    enabled: true
  });

  // Get only 2 most urgent upcoming tasks for dashboard
  const urgentTasks = (tasksData?.tasks || [])
    .filter(task => !task.completed) // Only show incomplete tasks
    .sort((a, b) => {
      // Sort by date and time for closest deadline
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 2); // Show only 2 most urgent

  useEffect(() => {
    const userData = authAPI.getUser();
    setUser(userData);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Listen for language changes
    const handleLanguageChange = () => {
      setForceRerender(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearInterval(timeInterval);
    };
  }, []);

  // Format real current date and time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return { dayName, day, month };
  };

  const { dayName, day, month } = formatDate(currentTime);
  const currentTimeStr = formatTime(currentTime);

  const categories = [
    {
      id: "budgeting",
      title: "Budgeting",
      icon: budgetingIcon,
      color: "bg-[#FF6B8A]"
    },
    {
      id: "saving",
      title: "Saving & Investment",
      icon: savingIcon,
      color: "bg-[#4ECDC4]"
    },
    {
      id: "fraud",
      title: "Cyber Fraud Types", 
      icon: cyberIcon,
      color: "bg-[#FFB74D]"
    },
    {
      id: "privacy",
      title: "Data Privacy & Protection",
      icon: privacyIcon,
      color: "bg-[#6366F1]"
    },
    {
      id: "calculators",
      title: "Calculators",
      icon: calculatorIcon,
      color: "bg-[#60A5FA]"
    },
    {
      id: "tips", 
      title: "Tips",
      icon: tipsIcon,
      color: "bg-[#8B5CF6]"
    },
    {
      id: "quiz",
      title: "Quiz",
      icon: quizIcon,
      color: "bg-[#34D399]"
    },
    {
      id: "goals",
      title: "Goals",
      icon: goalsIcon,
      color: "bg-[#F472B6]"
    }
  ];

  // Dynamic stats based on user progress - connected to database
  const progress = (gamingProgress as any)?.progress;
  const gamingLevel = progress?.currentLevel || 1;
  const totalXP = progress?.totalXP || 0;

  // Calculate real stats from database data
  const progressData = (gamingProgress as any)?.progress;
  
  // Debug log to see the actual data structure
  console.log('Gaming Progress Data:', progressData);
  
  const completedLevelsArray = progressData?.completedLevels || [];
  const currentMap = progressData?.currentMap || 1;
  const totalCompletedTasks = tasksData?.tasks?.filter(task => task.completed).length || 0;
  const totalActiveTasks = tasksData?.tasks?.filter(task => !task.completed).length || 0;
  
  // Count total lessons completed (length of completedLevels array)
  const totalLessonsCompleted = Array.isArray(completedLevelsArray) ? completedLevelsArray.length : 0;
  
  // Get completed maps count
  const completedMapsArray = progressData?.completedMaps || [];
  const totalCompletedMaps = Array.isArray(completedMapsArray) ? completedMapsArray.length : 0;
  
  console.log('Completed Levels Array:', completedLevelsArray);
  console.log('Total Lessons Completed:', totalLessonsCompleted);
  console.log('Current Map:', currentMap);
  
  const monthlyStats = [
    {
      id: "lessons_completed",
      title: "Lessons Completed", 
      value: "0", // Set to 0 as requested
      color: "bg-[#4ECDC4]"
    },
    {
      id: "modules_progress",
      title: "Modules In Progress",
      value: "0", // Set to 0 as requested
      color: "bg-[#FFA726]"
    },
    {
      id: "goals_tracked",
      title: "Goals Being Tracked",
      value: totalActiveTasks.toString(),
      color: "bg-[#EF5A85]"
    },
    {
      id: "quizzes_attempted",
      title: "Quizzes Attempted",
      value: totalLessonsCompleted.toString(), // Keep real data for quizzes
      color: "bg-[#4FC3F7]"
    }
  ];

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Clean header without status bar */}
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white px-6 pt-6 pb-8 rounded-b-[2rem]">
        {/* Profile header with real date */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm opacity-90 mb-1">{dayName}</div>
            <div className="text-2xl font-bold font-['Poppins'] mb-2">{day} {month}</div>
            <div className="text-xl font-semibold font-['Poppins'] mb-1">Hi, {user?.username || 'Sushil Singh'}</div>
            <div className="text-sm opacity-90">Welcome to Face2Finance</div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation("/notifications")}
              className="relative p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <BellIcon className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button
              onClick={() => setLocation("/profile")}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-colors"
            >
              <UserIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

      </div>

      {/* Search Bar positioned between purple section and white content */}
      <div className="px-6 relative -mt-6 mb-6 z-10">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            onClick={() => setLocation("/search")}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left"
          >
            <span className="text-gray-500">Search tutorials, fraud types, or finance tips...</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-32">
        {/* Top Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#1F2937]">Top Categories</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => {
              return (
                <div key={category.id} className="flex flex-col items-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-2 shadow-sm`}>
                    <img 
                      src={category.icon} 
                      alt={category.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-xs font-['Poppins'] text-center text-gray-700 leading-tight max-w-[60px]">
                    {category.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Poppins'] font-semibold text-lg text-[#1F2937]">Progress</h3>
            <Button variant="ghost" size="sm" className="text-[#6366F1] font-['Poppins']">
              More
            </Button>
          </div>
          
          {/* Real Tasks from Database - Only 2 Most Urgent */}
          <div className="space-y-3 mb-4">
            {isLoadingTasks ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading tasks...</p>
              </div>
            ) : urgentTasks.length === 0 ? (
              <Card className="border border-gray-200">
                <CardContent className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No upcoming tasks</p>
                    <Button
                      onClick={() => setLocation("/planner")}
                      className="bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Create your first task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              urgentTasks.map((task) => (
                <Card key={task._id} className="border border-gray-200">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`w-3 h-16 ${task.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="font-semibold text-[#1F2937] text-sm">Progress</h4>
                          <p className="text-xs text-gray-500 mt-1">More</p>
                        </div>
                      </div>
                      <h3 className="font-medium text-[#1F2937] mb-1">{task.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {task.startTime} - {task.endTime}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* Show planner link if there are tasks */}
          {urgentTasks.length > 0 && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setLocation("/planner")}
                className="text-[#6366F1] font-['Poppins'] text-sm"
              >
                View all tasks in planner →
              </Button>
            </div>
          )}
        </div>

        {/* Monthly Preview */}
        <div className="mb-6">
          <h3 className="font-['Poppins'] font-semibold text-xl text-[#1F2937] mb-4">Monthly Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            {monthlyStats.map((stat) => (
              <Card key={stat.id} className={`${stat.color} border-0 text-white rounded-[20px] shadow-lg`}>
                <CardContent className="p-6 text-center">
                  <div className="font-['Poppins'] font-bold text-4xl mb-3 text-white">{stat.value}</div>
                  <div className="font-['Poppins'] font-medium text-base text-white opacity-95">{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Modules Lessons */}
        <div className="mb-6">
          <h3 className="font-['Poppins'] font-semibold text-lg text-[#1F2937] mb-4">Featured Modules Lessons</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* OTP Scam Explainer */}
            <Card className="border-0 bg-white shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-24 bg-gradient-to-br from-gray-600 to-black flex items-center justify-center relative">
                    {/* Phone mockup with security icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-12 h-20 bg-gray-800 rounded-lg border border-gray-600 flex flex-col items-center justify-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mb-1"></div>
                        <div className="w-6 h-6 text-white flex items-center justify-center">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <PlayIcon className="w-5 h-5 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-400 rounded-full px-2 py-1 flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-white fill-white" />
                    <span className="text-xs font-medium text-white">4.2</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937] text-sm leading-tight">OTP Scam Explainer</h4>
                </div>
              </CardContent>
            </Card>
            
            {/* Debit Card Fraud Tips */}
            <Card className="border-0 bg-white shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-24 bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center relative">
                    {/* Laptop/computer mockup with financial charts */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-16 h-10 bg-gray-800 rounded border border-gray-600 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1 w-8 h-6">
                          <div className="bg-green-400 rounded-sm h-1"></div>
                          <div className="bg-green-400 rounded-sm h-2"></div>
                          <div className="bg-green-400 rounded-sm h-3"></div>
                          <div className="bg-blue-400 rounded-sm h-2"></div>
                          <div className="bg-blue-400 rounded-sm h-3"></div>
                          <div className="bg-blue-400 rounded-sm h-1"></div>
                        </div>
                      </div>
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <PlayIcon className="w-5 h-5 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-400 rounded-full px-2 py-1 flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-white fill-white" />
                    <span className="text-xs font-medium text-white">4.2</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937] text-sm leading-tight">Debit Card Fraud Tips</h4>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI-Powered Personalized Tip Card - Uses questionnaire data */}
        <div className="mb-6">
          <PersonalizedTips 
            userId={user?._id} 
            userContext={{
              username: user?.username,
              hasCompletedQuestionnaire: !!user,
              currentPage: "dashboard"
            }}
          />
        </div>

        {/* Progress Achievement Card */}
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-[#7DD3FC] to-[#0EA5E9] border-0 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center border-4 border-white/20">
                      <StarIcon className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <TrophyIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Poppins'] font-semibold text-lg leading-tight">
                      You're off to a great start!
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/90 text-sm font-medium">{totalXP} points done</span>
                  <span className="text-white/90 text-sm font-medium">Goal 10,000</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full border border-white/40" 
                      style={{width: `${Math.min((totalXP / 10000) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-white">
                    <GiftIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  onClick={() => setLocation("/gaming")}
                  className="bg-white/20 text-white border-0 hover:bg-white/30 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Go to game page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* AI Chat Widget positioned above bottom navigation */}
      <div className="fixed bottom-24 right-4 z-50">
        <ChatWidget 
          userContext={{
            username: user?.username,
            hasCompletedQuestionnaire: !!user,
            currentPage: "dashboard"
          }}
        />
      </div>

      {/* Bottom Navigation - Enhanced */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Dashboard */}
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 min-w-0">
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <HomeIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-[#6366F1] font-medium">Dashboard</span>
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
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/gaming")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <GiftIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Gaming</span>
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