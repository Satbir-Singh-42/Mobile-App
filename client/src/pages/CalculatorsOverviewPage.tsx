import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, BookmarkIcon, HomeIcon, MessageCircleIcon, UserIcon } from "lucide-react";
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
      {/* Header with dark gradient matching Figma */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 pt-12 pb-6 relative">
        {/* Status bar */}
        <div className="flex items-center justify-between text-white text-sm font-semibold mb-6">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1.5 bg-white rounded-full"></div>
              <div className="w-1 h-2 bg-white rounded-full"></div>
              <div className="w-1 h-2.5 bg-white rounded-full"></div>
            </div>
            <svg className="w-4 h-4 fill-white ml-1" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <div className="w-6 h-3 border border-white rounded-sm ml-1 relative">
              <div className="w-4/5 h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Header content matching Figma exactly */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation("/learning")}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-xl font-bold mb-1">Financial Calculators</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Subtitle matching Figma */}
        <div className="text-white/90 text-sm mb-2">
          <span className="font-medium">{calculators.length} Calculators</span>
        </div>
        <p className="text-white/80 text-sm">Plan your finances better with easy-to-use tools.</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-8">
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
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-24 right-4 z-50">
        <ChatWidget 
          userContext={{
            username: "User",
            hasCompletedQuestionnaire: true,
            currentPage: "calculators-overview"
          }}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/dashboard")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/learning")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-500">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500">Learn</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/gaming")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500">Game</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-0 min-w-0">
            <div className="w-6 h-6 flex items-center justify-center">
              <MessageCircleIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};