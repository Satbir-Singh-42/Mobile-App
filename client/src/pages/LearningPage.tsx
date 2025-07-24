import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { SearchIcon, BellIcon, UserIcon, ArrowLeftIcon, BookmarkIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

// Use direct paths to the images
const budgetingImg = "/attached_assets/Image-4_1753339425047.png";
const savingImg = "/attached_assets/10_1753339425044.png";
const taxImg = "/attached_assets/9_1753339425044.png";
const fraudImg = "/attached_assets/Image-5_1753339425047.png";
const privacyImg = "/attached_assets/Image-1_1753339425045.png";
const calculatorImg = "/attached_assets/Image_1753339425045.png";
const sipImg = "/attached_assets/Saly-10 1_1753339425048.png";
const budgetPlannerImg = "/attached_assets/Image-2_1753339425046.png";
const emiImg = "/attached_assets/Image-3_1753339425046.png";

export const LearningPage = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Recommended", "Favorite"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with blue gradient background matching Figma */}
      <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-6 pt-12 pb-8 relative">
        {/* Status bar simulation */}
        <div className="flex items-center justify-between text-white text-sm font-medium mb-4">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3/4 h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div></div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">3</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2 font-['Poppins']">Ready To Learn?</h1>
          <p className="text-white/80 text-sm">Choose your subject</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tutorials, fraud types, or finance tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-0 rounded-xl shadow-sm h-12"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-[#4F46E5] border-[#4F46E5]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Learning Categories Grid - Exact Figma Design */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Budgeting Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Budgeting</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to plan your monthly expenses</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={budgetingImg} alt="Budgeting" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Saving & Investment Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-green-200 to-green-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Saving & Investment</h3>
                <p className="text-xs text-gray-600 leading-tight">Start your savings & beginner investing</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={savingImg} alt="Saving & Investment" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Tax Basics Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-orange-200 to-orange-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Tax Basics</h3>
                <p className="text-xs text-gray-600 leading-tight">Know about income tax and returns</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={taxImg} alt="Tax Basics" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Fraud Awareness Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-blue-200 to-blue-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Fraud Awareness</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to avoid scams and keep yourself safe</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={fraudImg} alt="Fraud Awareness" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Data Privacy Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Data Privacy</h3>
                <p className="text-xs text-gray-600 leading-tight">Secure your digital financial identity</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={privacyImg} alt="Data Privacy" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Financial Calculators Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-purple-200 to-purple-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Financial Calculators</h3>
                <p className="text-xs text-gray-600 leading-tight">Free out EMI and Tax calculations</p>
              </div>
              <div className="absolute bottom-2 right-2 w-12 h-12">
                <img src={calculatorImg} alt="Financial Calculators" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Calculators Section - Matching exact Figma design */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Header with back arrow and bookmark */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
              <span className="text-sm">Detail Course</span>
            </div>
            <BookmarkIcon className="w-5 h-5 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4">Financial Calculators</h2>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-4 right-8 w-8 h-8 bg-blue-400 rounded-full opacity-30"></div>
        </div>

        {/* Calculator Cards */}
        <div className="mt-6 bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">4 Calculators</h3>
          </div>
          <p className="text-sm text-gray-600 mb-6">Plan your finances better with easy-to-use tools.</p>

          <div className="space-y-3">
            {/* SIP Calculator */}
            <Card className="border border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="flex items-center p-4 space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <img src={sipImg} alt="SIP Calculator" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">SIP Calculator</h3>
                  <p className="text-xs text-gray-500">Estimate investment returns</p>
                </div>
                <BookmarkIcon className="w-5 h-5 text-gray-300" />
              </CardContent>
            </Card>

            {/* Budget Planner */}
            <Card className="border border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="flex items-center p-4 space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <img src={budgetPlannerImg} alt="Budget Planner" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Budget Planner</h3>
                  <p className="text-xs text-gray-500">Split expenses smartly</p>
                </div>
                <BookmarkIcon className="w-5 h-5 text-gray-300" />
              </CardContent>
            </Card>

            {/* EMI Calculator */}
            <Card className="border border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="flex items-center p-4 space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <img src={emiImg} alt="EMI Calculator" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">EMI Calculator</h3>
                  <p className="text-xs text-gray-500">Split expenses smartly</p>
                </div>
                <BookmarkIcon className="w-5 h-5 text-gray-300" />
              </CardContent>
            </Card>

            {/* Tax Estimator */}
            <Card className="border border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="flex items-center p-4 space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <img src={calculatorImg} alt="Tax Estimator" className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Tax Estimator</h3>
                  <p className="text-xs text-gray-500">Estimate tax payable</p>
                </div>
                <BookmarkIcon className="w-5 h-5 text-gray-300" />
              </CardContent>
            </Card>
          </div>
        </div>
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
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
            </div>
            <span className="text-xs text-gray-500">Dashboard</span>
          </Button>
          
          {/* Learning - Active */}
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 min-w-0">
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
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
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
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
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