import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { BookOpenIcon, CreditCardIcon, ShieldCheckIcon, TrendingUpIcon, UserIcon, LogOutIcon, SettingsIcon } from "lucide-react";

export const DashboardPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // TODO: Implement logout logic
    setLocation("/");
  };

  const modules = [
    {
      id: "budgeting",
      title: "Budgeting Basics",
      description: "Learn how to create and manage your budget effectively",
      icon: CreditCardIcon,
      progress: 0,
      color: "bg-[#b4ffb2]"
    },
    {
      id: "saving",
      title: "Smart Saving",
      description: "Discover strategies to save money and build wealth",
      icon: TrendingUpIcon,
      progress: 0,
      color: "bg-[#b2e3ff]"
    },
    {
      id: "investing", 
      title: "Investment Fundamentals",
      description: "Get started with investing and grow your money",
      icon: BookOpenIcon,
      progress: 0,
      color: "bg-[#c6b2ff]"
    },
    {
      id: "security",
      title: "Financial Security",
      description: "Protect yourself from scams and frauds",
      icon: ShieldCheckIcon,
      progress: 0,
      color: "bg-[#ffb2db]"
    }
  ];

  return (
    <div className="bg-prima-1 min-h-screen w-full">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#c4c4c4]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-['Anta'] text-[#242424] text-2xl md:text-[60px] tracking-[-2px]">
            Face2Finance
          </h1>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/profile")}
              className="font-['Poppins'] text-[#4157ff] hover:bg-[#4157ff0f] flex items-center gap-2"
            >
              <UserIcon className="w-5 h-5" />
              Profile
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="font-['Poppins'] text-[#090f4773] hover:bg-[#f5f5f5] flex items-center gap-2"
            >
              <LogOutIcon className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-['Poppins'] font-bold text-[#090f47] text-2xl md:text-[40px] mb-2">
            Welcome back!
          </h2>
          <p className="font-['Poppins'] text-[#090f4773] text-base md:text-[24px]">
            Continue your financial literacy journey
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-[#c4c4c4] rounded-[15.49px]">
          <CardHeader>
            <CardTitle className="font-['Poppins'] font-bold text-[#090f47] text-xl md:text-[28px]">
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-[40px] font-bold text-[#4157ff] mb-1">0</div>
                <div className="text-sm md:text-[16px] text-[#090f4773]">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-[40px] font-bold text-[#4157ff] mb-1">0</div>
                <div className="text-sm md:text-[16px] text-[#090f4773]">Hours Learned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-[40px] font-bold text-[#4157ff] mb-1">4</div>
                <div className="text-sm md:text-[16px] text-[#090f4773]">Available Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-[40px] font-bold text-[#4157ff] mb-1">0%</div>
                <div className="text-sm md:text-[16px] text-[#090f4773]">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="mb-8">
          <h3 className="font-['Poppins'] font-bold text-[#090f47] text-xl md:text-[32px] mb-6">
            Learning Modules
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              
              return (
                <Card key={module.id} className="border-[#c4c4c4] rounded-[15.49px] hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-[10px] ${module.color}`}>
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-[#090f47]" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-['Poppins'] font-bold text-[#090f47] text-lg md:text-[24px] mb-2">
                          {module.title}
                        </h4>
                        <p className="font-['Poppins'] text-[#090f4773] text-sm md:text-[18px] mb-4">
                          {module.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs md:text-[14px] text-[#090f4773]">Progress</span>
                            <span className="text-xs md:text-[14px] text-[#090f4773]">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-[#c4c4c4] rounded-full h-2">
                            <div
                              className="bg-[#4157ff] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <Button className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-medium text-sm md:text-[18px] h-10 md:h-12 rounded-[10px]">
                          {module.progress === 0 ? "Start Learning" : "Continue"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-['Poppins'] font-bold text-[#090f47] text-xl md:text-[32px] mb-6">
            Quick Actions
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-16 md:h-20 border-[#4157ff] text-[#4157ff] hover:bg-[#4157ff0f] font-['Poppins'] font-medium text-base md:text-[20px] rounded-[10px]"
            >
              Take Quiz
            </Button>
            
            <Button
              variant="outline"
              className="h-16 md:h-20 border-[#4157ff] text-[#4157ff] hover:bg-[#4157ff0f] font-['Poppins'] font-medium text-base md:text-[20px] rounded-[10px]"
            >
              View Progress
            </Button>
            
            <Button
              variant="outline"
              className="h-16 md:h-20 border-[#4157ff] text-[#4157ff] hover:bg-[#4157ff0f] font-['Poppins'] font-medium text-base md:text-[20px] rounded-[10px]"
            >
              Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};