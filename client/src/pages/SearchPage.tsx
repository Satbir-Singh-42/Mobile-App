import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { ArrowLeftIcon, SearchIcon, TrendingUpIcon, BookOpenIcon, CreditCardIcon, ShieldCheckIcon, HomeIcon, CalendarIcon, GiftIcon, UserIcon, BellIcon, Calculator, PiggyBank, FileText, Eye, Database, ChevronRight, BookmarkIcon, Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { ChatWidget } from "@/components/ui/chat-widget";
import { authAPI } from "@/lib/auth";

export const SearchPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    const userData = authAPI.getUser();
    setUser(userData);
  }, []);

  // Dynamic search results based on query and user progress
  const getSearchResults = (query: string) => {
    const allTopics = [
      {
        id: "budgeting",
        title: "Budgeting Basics",
        description: "Learn how to create and manage your budget effectively",
        icon: CreditCardIcon,
        category: "Financial Planning",
        keywords: ["budget", "money", "plan", "expense"]
      },
      {
        id: "saving", 
        title: "Smart Saving Strategies",
        description: "Discover ways to save money and build wealth",
        icon: TrendingUpIcon,
        category: "Savings",
        keywords: ["save", "invest", "wealth", "growth"]
      },
      {
        id: "investing",
        title: "Investment Fundamentals", 
        description: "Get started with investing and grow your money",
        icon: BookOpenIcon,
        category: "Investment",
        keywords: ["invest", "stocks", "portfolio", "returns"]
      },
      {
        id: "security",
        title: "Financial Security Tips",
        description: "Protect yourself from scams and frauds",
        icon: ShieldCheckIcon,
        category: "Security",
        keywords: ["security", "fraud", "scam", "protection"]
      }
    ];

    if (!query.trim()) return allTopics;
    
    const lowerQuery = query.toLowerCase();
    return allTopics.filter(topic => 
      topic.title.toLowerCase().includes(lowerQuery) ||
      topic.description.toLowerCase().includes(lowerQuery) ||
      topic.category.toLowerCase().includes(lowerQuery) ||
      topic.keywords.some(keyword => keyword.includes(lowerQuery))
    );
  };

  const searchResults = getSearchResults(searchQuery);

  const filteredResults = searchResults.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-prima-1 min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Button>
        <h1 className="font-['Poppins'] font-semibold text-lg text-[#242424]">Search</h1>
        <div className="w-10" />
      </div>

      {/* Search Input */}
      <div className="p-4 bg-white">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search financial topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-['Poppins'] border-2 border-gray-200 focus:border-[#4157ff] rounded-xl"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 p-4">
        {searchQuery ? (
          <div className="space-y-3">
            <h2 className="font-['Poppins'] font-semibold text-lg text-[#242424]">
              Results for "{searchQuery}"
            </h2>
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Card key={item.id} className="border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#4157ff0f] rounded-lg">
                          <IconComponent className="h-6 w-6 text-[#4157ff]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-['Poppins'] font-semibold text-[#242424]">
                            {item.title}
                          </h3>
                          <p className="font-['Poppins'] text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs font-['Poppins'] text-gray-600 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="font-['Poppins'] text-gray-500">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="font-['Poppins'] font-semibold text-lg text-[#242424]">
              Popular Topics
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["Budgeting", "Saving", "Investing", "Insurance", "Credit", "Taxes"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  onClick={() => setSearchQuery(topic)}
                  className="h-auto p-4 border-2 border-gray-200 hover:border-[#4157ff] font-['Poppins']"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        )}
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
              <HomeIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Dashboard</span>
          </Button>
          
          {/* Learning */}
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
            onClick={() => setLocation("/profile")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Settings</span>
          </Button>
        </div>
      </div>

      {/* AI Chat Widget */}
      <ChatWidget 
        userContext={{
          username: user?.username,
          hasCompletedQuestionnaire: !!user,
          currentPage: "search"
        }}
      />
    </div>
  );
};