import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { SearchIcon, HomeIcon, GiftIcon, MessageCircleIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

// Import images using @assets alias for proper bundling
import budgetingImg from "@assets/Image-4_1753339425047.png";
import savingImg from "@assets/10_1753339425044.png";
import taxImg from "@assets/9_1753339425044.png";
import fraudImg from "@assets/Image-5_1753339425047.png";
import privacyImg from "@assets/Image-1_1753339425045.png";
import calculatorImg from "@assets/Image_1753339425045.png";

export const LearningPage = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Recommended", "Favorite"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with clean blue gradient matching dashboard style */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 pt-8 pb-6 relative">
        {/* Header content matching dashboard style */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-1 font-['Poppins']">Ready To Learn?</h1>
            <p className="text-white/90 text-sm">Choose your subject</p>
          </div>
        </div>

        {/* Search Bar exactly matching Figma */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tutorials, fraud types, or finance tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white border-0 rounded-xl shadow-sm h-12 text-sm"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-6">
        {/* Tabs exactly matching Figma */}
        <div className="flex gap-8 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium pb-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Learning Categories Grid - Exactly matching Figma layout */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Budgeting Card - Pink */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-32">
            <CardContent className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Budgeting</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to plan your monthly expenses</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={budgetingImg} alt="Budgeting" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Saving & Investment Card - Green */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-32">
            <CardContent className="bg-gradient-to-br from-green-200 to-green-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Saving & Investment</h3>
                <p className="text-xs text-gray-600 leading-tight">Start your savings & beginner investing</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={savingImg} alt="Saving & Investment" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Fraud Awareness Card - Blue */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-32">
            <CardContent className="bg-gradient-to-br from-blue-200 to-blue-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Fraud Awareness</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to avoid scams and keep yourself safe</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={fraudImg} alt="Fraud Awareness" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Tax Basics Card - Orange */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-32">
            <CardContent className="bg-gradient-to-br from-orange-200 to-orange-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Tax Basics</h3>
                <p className="text-xs text-gray-600 leading-tight">Know about income tax and returns</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={taxImg} alt="Tax Basics" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Data Privacy Card - Yellow */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden h-32">
            <CardContent className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Data Privacy</h3>
                <p className="text-xs text-gray-600 leading-tight">Secure your digital financial identity</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={privacyImg} alt="Data Privacy" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Financial Calculators Card - Purple */}
          <Card 
            className="border-0 shadow-sm rounded-2xl overflow-hidden h-32 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setLocation("/calculators")}
          >
            <CardContent className="bg-gradient-to-br from-purple-200 to-purple-300 p-4 h-full flex flex-col justify-between relative">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Financial Calculators</h3>
                <p className="text-xs text-gray-600 leading-tight">Free out EMI and Tax calculations</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={calculatorImg} alt="Financial Calculators" className="w-full h-full object-contain" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional spacing for content */}
        <div className="pb-20"></div>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-24 right-4 z-50">
        <ChatWidget 
          userContext={{
            username: "User",
            hasCompletedQuestionnaire: true,
            currentPage: "learning"
          }}
        />
      </div>

      {/* Bottom Navigation exactly matching Figma */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Home/Dashboard */}
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
          
          {/* Learning - Active with blue accent matching Figma */}
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-0 min-w-0">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#6366F1]">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span className="text-xs text-[#6366F1] font-medium">Learn</span>
          </Button>
          
          {/* Gaming/Circle icon */}
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
          
          {/* Chat */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <MessageCircleIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Chat</span>
          </Button>
          
          {/* Profile */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <span className="text-xs text-gray-500">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};