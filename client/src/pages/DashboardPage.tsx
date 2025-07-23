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

  // Updated SVG Icon Components matching Figma design
  const BudgetingIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
      <path d="M15 13.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
    </svg>
  );

  const SavingIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  );

  const CyberIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
    </svg>
  );

  const PrivacyIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9L10,17Z"/>
    </svg>
  );

  const CalculatorIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z"/>
    </svg>
  );

  const TipsIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z"/>
    </svg>
  );

  const QuizIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M13,9H11V7H13V9M13,17H11V11H13V17Z"/>
      <path d="M9,12L11,14L15,10"/>
    </svg>
  );

  const GoalsIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
    </svg>
  );

  const categories = [
    {
      id: "budgeting",
      title: "Budgeting",
      icon: BudgetingIcon,
      color: "bg-[#FF6B8A]"
    },
    {
      id: "saving",
      title: "Saving & Investment",
      icon: SavingIcon,
      color: "bg-[#4ECDC4]"
    },
    {
      id: "fraud",
      title: "Cyber Fraud Types", 
      icon: CyberIcon,
      color: "bg-[#FFB74D]"
    },
    {
      id: "privacy",
      title: "Data Privacy & Protection",
      icon: PrivacyIcon,
      color: "bg-[#6366F1]"
    },
    {
      id: "calculators",
      title: "Calculators",
      icon: CalculatorIcon,
      color: "bg-[#60A5FA]"
    },
    {
      id: "tips", 
      title: "Tips",
      icon: TipsIcon,
      color: "bg-[#8B5CF6]"
    },
    {
      id: "quiz",
      title: "Quiz",
      icon: QuizIcon,
      color: "bg-[#34D399]"
    },
    {
      id: "goals",
      title: "Goals",
      icon: GoalsIcon,
      color: "bg-[#F472B6]"
    }
  ];

  // Dynamic stats based on user progress - connected to database
  const monthlyStats = [
    {
      id: "completed",
      title: "Tasks Completed", 
      value: tasksData?.tasks?.filter(task => task.completed).length.toString() || "0",
      color: "bg-[#4ECDC4]"
    },
    {
      id: "progress",
      title: "Active Tasks",
      value: tasksData?.tasks?.filter(task => !task.completed).length.toString() || "0", 
      color: "bg-[#FFB74D]"
    },
    {
      id: "goals",
      title: "Total Tasks",
      value: tasksData?.tasks?.length.toString() || "0",
      color: "bg-[#FF6B8A]"
    },
    {
      id: "attempted",
      title: "Categories Used",
      value: tasksData?.tasks ? Array.from(new Set(tasksData.tasks.map(task => task.category))).length.toString() : "0",
      color: "bg-[#4FC3F7]"
    }
  ];

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Figma-style header with built-in status bar */}
      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        {/* Top status bar simulation with real time */}
        <div className="flex items-center justify-between mb-6 text-sm font-medium">
          <div>{currentTimeStr}</div>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white/60 rounded-full"></div>
            </div>
            <WifiIcon className="w-4 h-4 ml-2" />
            <BatteryIcon className="w-5 h-3 ml-1" />
          </div>
        </div>

        {/* Profile header with real date */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm opacity-90 mb-1">{dayName}</div>
            <div className="text-2xl font-bold font-['Poppins'] mb-2">{day} {month}</div>
            <div className="text-xl font-semibold font-['Poppins'] mb-1">Hi, {user?.username || 'Rahul'}</div>
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

        {/* Search Bar matching Figma */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tutorials, fraud types, or finance tips..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-sm"
            onClick={() => setLocation("/search")}
            readOnly
          />
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
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="flex flex-col items-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-2 shadow-sm`}>
                    <IconComponent />
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
          <h3 className="font-['Poppins'] font-semibold text-lg text-[#1F2937] mb-4">Monthly Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            {monthlyStats.map((stat) => (
              <Card key={stat.id} className={`${stat.color} border-0 text-white`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.title}</div>
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
                  <span className="text-white/90 text-sm font-medium">0 points done</span>
                  <span className="text-white/90 text-sm font-medium">Goal 10,000</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full border border-white/40" style={{width: '0%'}}></div>
                  </div>
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-white">
                    <GiftIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  className="bg-white/20 text-white border-0 hover:bg-white/30 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Go to game page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* AI Chat Widget */}
      <ChatWidget userContext={user} />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/search")}
          >
            <SearchIcon className="w-6 h-6 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/planner")}
          >
            <CalendarIcon className="w-6 h-6 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/notifications")}
          >
            <MessageSquareIcon className="w-6 h-6 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/profile")}
          >
            <UserIcon className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* AI Chat Widget */}
      <ChatWidget 
        userContext={{
          username: user?.username,
          hasCompletedQuestionnaire: !!user,
          currentPage: "dashboard"
        }}
      />
    </div>
  );
};