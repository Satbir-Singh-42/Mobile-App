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

    // Listen for language changes
    const handleLanguageChange = () => {
      setForceRerender(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // SVG Icon Components
  const BudgetingIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  );

  const SavingIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2c0-.55-.45-1-1-1s-1 .45-1 1v2H4c-.55 0-1 .45-1 1s.45 1 1 1h1v2c0 .55.45 1 1 1s1-.45 1-1V6h1c.55 0 1-.45 1-1s-.45-1-1-1H7zM12 9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-7zm7 10h-7v-8h7v8z"/>
    </svg>
  );

  const CyberIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );

  const PrivacyIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.3V16H7.7V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
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
      color: "bg-[#4FC3F7]"
    },
    {
      id: "privacy",
      title: "Data Privacy & Protection",
      icon: PrivacyIcon,
      color: "bg-[#FFB74D]"
    },
    {
      id: "calculator",
      title: "Calculator",
      icon: CalculatorIcon,
      color: "bg-[#BA68C8]"
    },
    {
      id: "tax", 
      title: "Tax",
      icon: BookOpenIcon,
      color: "bg-[#FF7043]"
    },
    {
      id: "quiz",
      title: "Quiz",
      icon: Gamepad2Icon,
      color: "bg-[#66BB6A]"
    },
    {
      id: "goals",
      title: "Goals",
      icon: TargetIcon,
      color: "bg-[#EF5350]"
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
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-6 py-3 text-sm font-medium bg-white">
        <span className="text-[#1F2937]">9:41</span>
        <div className="flex items-center gap-1">
          <WifiIcon className="w-4 h-4 text-black" />
          <div className="flex gap-1 mx-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <BatteryIcon className="w-6 h-4 text-black" />
        </div>
      </div>

      {/* NEW FIGMA DESIGN: Header Greeting Card */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-0 text-white relative overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Monday</p>
                <h1 className="text-2xl font-bold mb-1">25 October</h1>
                <h2 className="text-xl font-semibold mb-1">Hi, {user?.username || "Rahul"}</h2>
                <p className="text-sm opacity-90">Welcome to Face2Finance</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/notifications")}
                  className="p-2 text-white hover:bg-white/20 relative"
                >
                  <BellIcon className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">5</span>
                  </div>
                </Button>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials, fraud types, or finance tips"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 text-gray-700 placeholder-gray-400 text-sm"
                onClick={() => setLocation("/search")}
              />
            </div>
          </CardContent>
        </Card>
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
            <Card className="border-0 bg-white shadow-sm relative overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1 flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-white">4.5</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937] text-sm leading-tight">OTP Scam Explainer</h4>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white shadow-sm relative overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-24 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1 flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-white">4.5</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937] text-sm leading-tight">Debit Card Fraud Tips</h4>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personalized Tips Section */}
        <div className="mb-6">
          <PersonalizedTips 
            userId={user?._id} 
            userContext={{
              username: user?.username,
              hasCompletedQuestionnaire: !!user
            }}
            maxTips={2}
          />
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-6">
          <Card className="bg-[#10B981] border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-['Poppins'] font-medium mb-1">You're off to a great start!</h4>
                  <p className="text-sm opacity-90">Keep building your financial knowledge</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Progress</p>
                  <Button variant="ghost" className="text-white border-white hover:bg-white/20 mt-1 text-xs">
                    Continue Learning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

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