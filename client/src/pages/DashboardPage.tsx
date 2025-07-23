import { useState, useEffect } from "react";
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
  Clock3Icon
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { authAPI } from "@/lib/auth";

export const DashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [forceRerender, setForceRerender] = useState(0);

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

  const categories = [
    {
      id: "budgeting",
      title: "Budgeting",
      icon: PiggyBankIcon,
      color: "bg-[#FF8A95]"
    },
    {
      id: "saving",
      title: "Saving & Investment",
      icon: TrendingUpIcon,
      color: "bg-[#52D1B8]"
    },
    {
      id: "fraud",
      title: "Cyber Fraud Types",
      icon: ShieldIcon,
      color: "bg-[#6BB6FF]"
    },
    {
      id: "privacy",
      title: "Data Privacy & Protection",
      icon: MoreHorizontalIcon,
      color: "bg-[#FFB347]"
    },
    {
      id: "calculator",
      title: "Calculator",
      icon: CalculatorIcon,
      color: "bg-[#A78BFA]"
    },
    {
      id: "tax",
      title: "Tax",
      icon: BookOpenIcon,
      color: "bg-[#FF8A95]"
    },
    {
      id: "quiz",
      title: "Quiz",
      icon: Gamepad2Icon,
      color: "bg-[#52D1B8]"
    },
    {
      id: "goals",
      title: "Goals",
      icon: TargetIcon,
      color: "bg-[#EF4444]"
    }
  ];

  const monthlyStats = [
    {
      id: "completed",
      title: "Lessons Completed", 
      value: "22",
      color: "bg-[#52D1B8]"
    },
    {
      id: "progress",
      title: "Modules in Progress",
      value: "7", 
      color: "bg-[#FFB347]"
    },
    {
      id: "goals",
      title: "Goals Being Tracked",
      value: "12",
      color: "bg-[#FF8A95]"
    },
    {
      id: "attempted",
      title: "Quizzes Attempted",
      value: "14",
      color: "bg-[#6BB6FF]"
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

      {/* Header Greeting Card */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-0 text-white relative overflow-hidden">
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-2`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs font-['Poppins'] text-center text-gray-700 leading-tight">
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
          
          {/* Design Changes Items */}
          <div className="space-y-3 mb-4">
            <Card className="border border-gray-200">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-[#6366F1] rounded-xl flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937]">Design Changes</h4>
                  <p className="text-sm text-gray-500">2 Day Ago</p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-[#6366F1] rounded-xl flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-['Poppins'] font-medium text-[#1F2937]">Design Changes</h4>
                  <p className="text-sm text-gray-500">1 Day Ago</p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          </div>
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

        {/* Info Cards */}
        <div className="space-y-4 mb-6">
          <Card className="bg-[#6366F1] border-0 text-white">
            <CardContent className="p-4">
              <h4 className="font-['Poppins'] font-medium mb-2">Never share your OTP—even with someone claiming to be from your bank.</h4>
              <Button variant="ghost" className="text-white border-white hover:bg-white/20 mt-2">
                Read more tips
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-[#10B981] border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-['Poppins'] font-medium mb-1">You're off to a great start!</h4>
                  <p className="text-sm opacity-90">Let's power on</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Start to finish</p>
                  <Button variant="ghost" className="text-white border-white hover:bg-white/20 mt-1 text-xs">
                    Take Quiz now
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
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <CreditCardIcon className="w-6 h-6 text-gray-400" />
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
    </div>
  );
};