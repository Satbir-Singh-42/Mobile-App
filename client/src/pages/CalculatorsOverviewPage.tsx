import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, HomeIcon, MessageCircleIcon, SearchIcon, GiftIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

// Import calculator images from assets
import sipImg from "@assets/Saly-10 1_1753338498072.png";
import budgetPlannerImg from "@assets/Image-2_1753339425046.png";
import emiImg from "@assets/Image-3_1753339425046.png";
import taxImg from "@assets/Image_1753339425045.png";

export const CalculatorsOverviewPage = () => {
  const [, setLocation] = useLocation();

  const calculators = [
    {
      id: "sip",
      name: "SIP Calculator",
      description: "Estimate investment returns",
      image: sipImg,
      bgColor: "from-blue-100 to-blue-200"
    },
    {
      id: "budget",
      name: "Budget Planner",
      description: "Split expenses smartly",
      image: budgetPlannerImg,
      bgColor: "from-purple-100 to-purple-200"
    },
    {
      id: "emi",
      name: "EMI Calculator",
      description: "Split expenses smartly",
      image: emiImg,
      bgColor: "from-orange-100 to-orange-200"
    },
    {
      id: "tax",
      name: "Tax Estimator",
      description: "Estimate tax payable",
      image: taxImg,
      bgColor: "from-cyan-100 to-cyan-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching Dashboard style - Purple gradient */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 pt-8 pb-8 relative">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/learning")}
            className="text-white hover:bg-white/10 p-2 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-white text-xl font-bold font-['Poppins']">Financial Calculators</h1>
            <p className="text-white/90 text-sm">Plan your finances with smart tools</p>
          </div>
        </div>
      </div>

      {/* Search Bar positioned between purple section and white content - same as dashboard */}
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
        {/* Calculator Cards Grid - exactly matching Figma layout */}
        <div className="space-y-4">
          {calculators.map((calculator) => (
            <Card 
              key={calculator.id}
              className="border-0 shadow-sm rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setLocation(`/calculator/${calculator.id}`)}
            >
              <CardContent className={`bg-gradient-to-r ${calculator.bgColor} p-0 h-20 flex items-center relative`}>
                <div className="flex items-center flex-1 px-4">
                  <div className="w-12 h-12 flex-shrink-0 mr-4">
                    <img 
                      src={calculator.image} 
                      alt={calculator.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-semibold text-base mb-1">{calculator.name}</h3>
                    <p className="text-gray-600 text-sm">{calculator.description}</p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pb-20"></div>
      </main>

      {/* AI Chat Widget positioned above bottom navigation */}
      <div className="fixed bottom-24 right-4 z-50">
        <ChatWidget 
          userContext={{
            username: "Calculator User",
            hasCompletedQuestionnaire: true,
            currentPage: "calculators"
          }}
        />
      </div>

      {/* Bottom Navigation - Same as Dashboard */}
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
          
          {/* Learning - Active */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/learning")}
          >
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-[#6366F1] font-medium">Learning</span>
          </Button>
          
          {/* Planner */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/planner")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📅</span>
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
              <span className="text-lg">👤</span>
            </div>
            <span className="text-xs text-gray-500">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};