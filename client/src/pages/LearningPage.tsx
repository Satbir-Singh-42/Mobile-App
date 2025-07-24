import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { SearchIcon, ArrowLeftIcon, BookmarkIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

const categories = [
  {
    id: 1,
    title: "Budgeting",
    subtitle: "Learn to plan your monthly expenses",
    bgColor: "bg-gradient-to-br from-pink-200 to-pink-300",
    icon: "💰"
  },
  {
    id: 2,
    title: "Saving & Investment",
    subtitle: "Start your savings & beginner investing",
    bgColor: "bg-gradient-to-br from-green-200 to-green-300",
    icon: "📈"
  },
  {
    id: 3,
    title: "Tax Basics",
    subtitle: "Know about income tax and returns",
    bgColor: "bg-gradient-to-br from-orange-200 to-orange-300",
    icon: "📋"
  },
  {
    id: 4,
    title: "Fraud Awareness",
    subtitle: "Learn to avoid scams and keep yourself safe",
    bgColor: "bg-gradient-to-br from-blue-200 to-blue-300",
    icon: "🛡️"
  },
  {
    id: 5,
    title: "Data Privacy",
    subtitle: "Secure your digital financial identity",
    bgColor: "bg-gradient-to-br from-yellow-200 to-yellow-300",
    icon: "🔒"
  },
  {
    id: 6,
    title: "Financial Calculators",
    subtitle: "Free out EMI and Tax calculations",
    bgColor: "bg-gradient-to-br from-purple-200 to-purple-300",
    icon: "🧮"
  }
];

const calculators = [
  {
    id: 1,
    title: "SIP Calculator",
    subtitle: "Estimate investment returns",
    iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
    image: "@assets/attached_assets/Saly-10 1_1753339425048.png"
  },
  {
    id: 2,
    title: "Budget Planner",
    subtitle: "Split expenses smartly",
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
    image: "@assets/attached_assets/Image-2_1753339425046.png"
  },
  {
    id: 3,
    title: "EMI Calculator",
    subtitle: "Split expenses smartly",
    iconBg: "bg-gradient-to-br from-green-100 to-green-200",
    image: "@assets/attached_assets/Image-3_1753339425046.png"
  },
  {
    id: 4,
    title: "Tax Estimator",
    subtitle: "Estimate tax payable",
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
    image: "@assets/attached_assets/Image_1753339425045.png"
  }
];

export const LearningPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Recommended", "Favorite"];

  const categoryData = [
    { id: 1, title: "Budgeting", subtitle: "Learn to plan your monthly expenses" },
    { id: 2, title: "Saving & Investment", subtitle: "Start your savings & beginner investing" },
    { id: 3, title: "Tax Basics", subtitle: "Know about income tax and returns" },
    { id: 4, title: "Fraud Awareness", subtitle: "Learn to avoid scams and keep yourself safe" },
    { id: 5, title: "Data Privacy", subtitle: "Secure your digital financial identity" },
    { id: 6, title: "Financial Calculators", subtitle: "Free out EMI and Tax calculations" }
  ];

  const filteredCategories = categoryData.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCalculators = calculators.filter(calc =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#A855F7] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="px-6 py-4 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Ready To Learn?</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">S</span>
            </div>
          </div>
        </div>
        <p className="text-white/80 text-sm mb-6">Choose your subject</p>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tutorials, fraud types, or finance tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-white border-white"
                  : "text-white/60 border-transparent hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-6">
        {/* Learning Categories Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Budgeting Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Budgeting</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to plan your monthly expenses</p>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="w-10 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-8 bg-pink-400 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">💰</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-2 h-2 bg-pink-400 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Saving & Investment Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-green-200 to-green-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Saving & Investment</h3>
                <p className="text-xs text-gray-600 leading-tight">Start your savings & beginner investing</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="relative">
                  <div className="w-12 h-8 bg-green-400 rounded-full flex items-center justify-center relative">
                    <div className="w-2 h-4 bg-white rounded-full"></div>
                    <div className="absolute -top-1 right-2 w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-1 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-2 right-8 w-3 h-3 bg-white/30 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Tax Basics Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-orange-200 to-orange-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Tax Basics</h3>
                <p className="text-xs text-gray-600 leading-tight">Know about income tax and returns</p>
              </div>
              <div className="absolute bottom-1 right-1">
                <div className="w-14 h-10 bg-white/20 rounded-lg flex items-center justify-center relative">
                  <div className="w-8 h-6 bg-orange-400 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-4 right-12 w-2 h-2 bg-orange-400 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Fraud Awareness Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-blue-200 to-blue-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Fraud Awareness</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn to avoid scams and keep yourself safe</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-10 h-12 bg-blue-400 rounded-lg flex items-center justify-center relative">
                  <div className="w-6 h-8 bg-white/30 rounded flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🛡️</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-14 w-3 h-3 bg-white/30 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Data Privacy Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Data Privacy</h3>
                <p className="text-xs text-gray-600 leading-tight">Secure your digital financial identity</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-12 h-10 bg-yellow-400 rounded-lg flex items-center justify-center relative">
                  <div className="w-6 h-6 bg-white/40 rounded flex items-center justify-center">
                    <span className="text-yellow-700 text-sm">🔒</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-8 right-16 w-2 h-2 bg-yellow-500 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Financial Calculators Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
            <CardContent className="bg-gradient-to-br from-purple-200 to-purple-300 p-4 h-36 flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Financial Calculators</h3>
                <p className="text-xs text-gray-600 leading-tight">Free out EMI and Tax calculations</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-12 h-10 bg-purple-400 rounded-lg flex items-center justify-center relative">
                  <div className="w-8 h-6 bg-white/30 rounded flex items-center justify-center">
                    <span className="text-purple-700 text-sm">🧮</span>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-4 right-8 w-4 h-4 bg-white/20 rounded-full"></div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Calculators Section */}
        {(activeTab === "All" || activeTab === "Recommended") && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Financial Calculators</h2>
              <Button variant="ghost" size="sm" className="text-[#6366F1] font-medium">
                <ArrowLeftIcon className="w-4 h-4 mr-1 rotate-180" />
                Detail Course
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">4 Calculators</p>
            <p className="text-sm text-gray-500 mb-6">Plan your finances better with easy-to-use tools.</p>

            <div className="space-y-3">
              {filteredCalculators.map((calc) => (
                <Card key={calc.id} className="border border-gray-100 shadow-sm rounded-2xl">
                  <CardContent className="flex items-center p-4 space-x-4">
                    <div className={`w-14 h-14 ${calc.iconBg} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                      {/* Image placeholder - in real implementation you'd use the actual image */}
                      <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-400 rounded"></div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{calc.title}</h3>
                      <p className="text-xs text-gray-500">{calc.subtitle}</p>
                    </div>
                    <BookmarkIcon className="w-5 h-5 text-gray-300" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Favorite Tab */}
        {activeTab === "Favorite" && (
          <div className="text-center py-12">
            <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6">
              Save your favorite learning materials to access them quickly.
            </p>
            <Button
              onClick={() => setActiveTab("All")}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-lg"
            >
              Browse All Content
            </Button>
          </div>
        )}

        {/* Search Results Empty State */}
        {searchQuery && filteredCategories.length === 0 && filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Results Found</h3>
            <p className="text-gray-500 mb-6">
              Try searching with different keywords or browse all content.
            </p>
            <Button
              onClick={() => setSearchQuery("")}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-lg"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Bottom padding for navigation */}
        <div className="h-20"></div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        userContext={{
          hasCompletedQuestionnaire: true,
          currentPage: "learning"
        }}
      />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 text-[#6366F1]"
          >
            <div className="w-6 h-6 bg-[#6366F1] rounded"></div>
            <span className="text-xs font-medium">Learning</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/planner")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">Planner</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/gaming")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">Gaming</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/profile")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};