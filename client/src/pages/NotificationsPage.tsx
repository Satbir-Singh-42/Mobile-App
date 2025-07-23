import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, BellIcon, TrendingUpIcon, BookOpenIcon, CreditCardIcon, CheckIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const NotificationsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      title: "Complete your budgeting lesson",
      description: "You're 75% through the budgeting basics module",
      time: "2 hours ago",
      icon: CreditCardIcon,
      color: "bg-[#b4ffb2]",
      unread: true
    },
    {
      id: 2,
      title: "New investment tip available",
      description: "Learn about diversification strategies",
      time: "1 day ago",
      icon: TrendingUpIcon,
      color: "bg-[#b2e3ff]",
      unread: true
    },
    {
      id: 3,
      title: "Weekly financial goal reminder",
      description: "Review your savings progress this week",
      time: "2 days ago",
      icon: BookOpenIcon,
      color: "bg-[#c6b2ff]",
      unread: false
    },
    {
      id: 4,
      title: "Profile update completed",
      description: "Your profile information has been saved",
      time: "3 days ago",
      icon: CheckIcon,
      color: "bg-[#ffb2db]",
      unread: false
    }
  ];

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
        <h1 className="font-['Poppins'] font-semibold text-lg text-[#242424]">Notifications</h1>
        <Button variant="ghost" size="sm" className="font-['Poppins'] text-[#4157ff]">
          Mark all read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card key={notification.id} className={`border shadow-sm ${notification.unread ? 'border-[#4157ff] bg-[#4157ff0a]' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${notification.color} rounded-lg flex-shrink-0`}>
                      <IconComponent className="h-6 w-6 text-[#242424]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-['Poppins'] font-semibold text-[#242424] text-sm">
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#4157ff] rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                      <p className="font-['Poppins'] text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <p className="font-['Poppins'] text-xs text-gray-400 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-['Poppins'] font-semibold text-lg text-gray-400 mb-2">
              No notifications
            </h3>
            <p className="font-['Poppins'] text-sm text-gray-500">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};