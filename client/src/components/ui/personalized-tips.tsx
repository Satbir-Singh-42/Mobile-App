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

  const fetchDailyTip = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const today = new Date().toDateString();
      const cachedTip = localStorage.getItem(`dailyTip_${today}`);
      
      // Skip cache if forcing refresh or no cache exists
      if (cachedTip && !forceRefresh) {
        const parsed = JSON.parse(cachedTip);
        // Check if it's not just the fallback OTP message
        if (parsed.message !== "Never share your OTP—even with someone claiming to be from your bank.") {
          setDailyTip(parsed);
          setIsLoading(false);
          return;
        }
      }

      const token = localStorage.getItem('auth_token')?.trim();
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

      console.log('Fetching new daily tip from API...');
      console.log('Request details:', { userId, userContext, date: today });
      console.log('Token available:', !!token);
      
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

      console.log('Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Daily tip API error:', response.status, response.statusText, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Daily tip API response:', data);
      
      if (data.tip && data.tip.message) {
        const tip = {
          id: data.tip.id || `daily_${Date.now()}`,
          message: data.tip.message,
          date: today
        };
        setDailyTip(tip);
        localStorage.setItem(`dailyTip_${today}`, JSON.stringify(tip));
        console.log('New daily tip cached:', tip);
      } else {
        throw new Error('Invalid tip data received');
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
    // Auto-refresh every 6 hours
    const now = new Date();
    const today = now.toDateString();
    const currentHour = Math.floor(now.getHours() / 6) * 6; // 0, 6, 12, 18
    const refreshKey = `${today}_${currentHour}h`;
    
    const lastRefreshKey = localStorage.getItem('lastTipRefresh');
    
    // Clear cache if it's been 6+ hours
    if (lastRefreshKey !== refreshKey) {
      localStorage.removeItem(`dailyTip_${today}`);
      localStorage.setItem('lastTipRefresh', refreshKey);
      console.log('Auto-refreshing tips for 6-hour cycle:', refreshKey);
      fetchDailyTip(true);
    } else {
      fetchDailyTip(false);
    }

    // Set up interval to refresh every 6 hours
    const interval = setInterval(() => {
      const newNow = new Date();
      const newToday = newNow.toDateString();
      const newCurrentHour = Math.floor(newNow.getHours() / 6) * 6;
      const newRefreshKey = `${newToday}_${newCurrentHour}h`;
      
      if (localStorage.getItem('lastTipRefresh') !== newRefreshKey) {
        localStorage.removeItem(`dailyTip_${newToday}`);
        localStorage.setItem('lastTipRefresh', newRefreshKey);
        console.log('Auto-refreshing tips for 6-hour cycle:', newRefreshKey);
        fetchDailyTip(true);
      }
    }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds

    return () => clearInterval(interval);
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
    return (
      <Card className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-0 text-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <h4 className="font-['Poppins'] font-medium text-lg mb-3 leading-tight">
            Never share your OTP—even with someone claiming to be from your bank.
          </h4>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] border-0 text-white rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <h4 className="font-['Poppins'] font-medium text-lg mb-3 leading-tight">
          {dailyTip.message}
        </h4>
        <div className="flex items-center justify-between">
          <div className="bg-white/20 text-white border-0 hover:bg-white/30 rounded-full px-4 py-2 text-sm font-medium">
            {dailyTip.message.includes("Never share your OTP") ? "Security Tip" : "AI Personalized"}
          </div>
          <div className="text-white/60 text-xs">
            Updates every 6 hours
          </div>
        </div>
      </CardContent>
    </Card>
  );
};