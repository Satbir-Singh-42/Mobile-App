import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";

interface DailyTip {
  id: string;
  message: string;
  date: string;
}

interface DailyTipProps {
  userId?: string;
  userContext?: any;
}

export const PersonalizedTips = ({ userId, userContext }: DailyTipProps): JSX.Element => {
  const [dailyTip, setDailyTip] = useState<DailyTip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailyTip = async () => {
    setIsLoading(true);
    try {
      const today = new Date().toDateString();
      const cachedTip = localStorage.getItem(`dailyTip_${today}`);
      
      if (cachedTip) {
        setDailyTip(JSON.parse(cachedTip));
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        // Show fallback tip without auth
        const fallbackTip = {
          id: `daily_${Date.now()}`,
          message: "Never share your OTP—even with someone claiming to be from your bank.",
          date: today
        };
        setDailyTip(fallbackTip);
        localStorage.setItem(`dailyTip_${today}`, JSON.stringify(fallbackTip));
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/daily-tip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          userContext,
          date: today
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.tip) {
        const tip = {
          id: data.tip.id,
          message: data.tip.message,
          date: today
        };
        setDailyTip(tip);
        localStorage.setItem(`dailyTip_${today}`, JSON.stringify(tip));
      }
    } catch (error) {
      console.error("Error fetching daily tip:", error);
      // Fallback tip
      const fallbackTip = {
        id: `daily_fallback_${Date.now()}`,
        message: "Never share your OTP—even with someone claiming to be from your bank.",
        date: new Date().toDateString()
      };
      setDailyTip(fallbackTip);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyTip();
  }, [userId, userContext]);

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dailyTip) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
            <LightbulbIcon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Daily Financial Tip</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {dailyTip.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};