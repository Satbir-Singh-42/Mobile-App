import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircleIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  PiggyBankIcon,
  CreditCardIcon,
  XIcon,
  RefreshCwIcon
} from "lucide-react";

interface PersonalizedTip {
  id: string;
  title: string;
  message: string;
  category: "security" | "budgeting" | "investment" | "savings" | "general";
  priority: "high" | "medium" | "low";
}

interface PersonalizedTipsProps {
  userId?: string;
  userContext?: any;
  maxTips?: number;
}

export const PersonalizedTips = ({ userId, userContext, maxTips = 3 }: PersonalizedTipsProps): JSX.Element => {
  const [tips, setTips] = useState<PersonalizedTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <ShieldCheckIcon className="h-5 w-5" />;
      case "budgeting":
        return <CreditCardIcon className="h-5 w-5" />;
      case "investment":
        return <TrendingUpIcon className="h-5 w-5" />;
      case "savings":
        return <PiggyBankIcon className="h-5 w-5" />;
      default:
        return <LightbulbIcon className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string, priority: string) => {
    const baseColor = {
      security: priority === "high" ? "text-red-600 bg-red-100" : "text-red-500 bg-red-50",
      budgeting: "text-blue-600 bg-blue-100",
      investment: "text-green-600 bg-green-100", 
      savings: "text-purple-600 bg-purple-100",
      general: "text-gray-600 bg-gray-100"
    };
    return baseColor[category as keyof typeof baseColor] || baseColor.general;
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500";
      case "medium":
        return "border-l-4 border-l-yellow-500";
      case "low":
        return "border-l-4 border-l-green-500";
      default:
        return "border-l-4 border-l-gray-500";
    }
  };

  const fetchPersonalizedTips = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch("/api/personalized-tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          userContext,
          maxTips
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.tips && Array.isArray(data.tips)) {
        setTips(data.tips.filter((tip: PersonalizedTip) => !dismissedTips.includes(tip.id)));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching personalized tips:", error);
      // Fallback tips with security focus
      setTips([
        {
          id: "security_fallback",
          title: "OTP Security Alert",
          message: "Never share your OTP—even with someone claiming to be from your bank. Banks will never ask for OTPs over phone or email.",
          category: "security",
          priority: "high"
        },
        {
          id: "budgeting_fallback",
          title: "Start Your Budget Journey",
          message: "Begin with the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
          category: "budgeting",
          priority: "medium"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissTip = (tipId: string) => {
    const newDismissed = [...dismissedTips, tipId];
    setDismissedTips(newDismissed);
    setTips(prev => prev.filter(tip => tip.id !== tipId));
    
    // Store dismissed tips in localStorage
    localStorage.setItem("dismissedTips", JSON.stringify(newDismissed));
  };

  const refreshTips = () => {
    fetchPersonalizedTips();
  };

  useEffect(() => {
    // Load dismissed tips from localStorage
    const stored = localStorage.getItem("dismissedTips");
    if (stored) {
      setDismissedTips(JSON.parse(stored));
    }
    
    fetchPersonalizedTips();
  }, [userId, userContext]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tips.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 text-center">
          <LightbulbIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No new tips available right now.</p>
          <Button
            onClick={refreshTips}
            variant="outline"
            className="gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Get New Tips
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800">Personalized Tips</h3>
        <Button
          onClick={refreshTips}
          variant="ghost"
          size="sm"
          className="gap-1 text-sm"
        >
          <RefreshCwIcon className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {tips.map((tip) => (
        <Card 
          key={tip.id} 
          className={`border-0 shadow-sm hover:shadow-md transition-shadow ${getPriorityBorder(tip.priority)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getCategoryColor(tip.category, tip.priority)}`}>
                {getCategoryIcon(tip.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {tip.title}
                  </h4>
                  <Button
                    onClick={() => dismissTip(tip.id)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tip.message}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(tip.category, tip.priority)}`}>
                    {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                  </span>
                  {tip.priority === "high" && (
                    <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                      <AlertCircleIcon className="h-3 w-3" />
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};