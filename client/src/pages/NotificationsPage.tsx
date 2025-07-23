import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/auth";
import { 
  ArrowLeftIcon, 
  BellIcon,
  BookOpenIcon,
  CreditCardIcon,
  UserIcon,
  SettingsIcon,
  TrendingUpIcon,
  ShieldIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  Clock3Icon,
  GraduationCapIcon,
  TrashIcon
} from "lucide-react";

export const NotificationsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authAPI.getUser();
    setUser(userData);
  }, []);

  // Dynamic notifications based on user activity
  const generateNotifications = () => {
    const notifications = [];
    const now = new Date();
    
    // Welcome notification for new users
    if (!user?.lastLogin || (now.getTime() - new Date(user.lastLogin).getTime()) > 86400000) {
      notifications.push({
        id: 1,
        title: "Welcome to Face2Finance",
        message: "Start your financial literacy journey today! Complete your first task to earn points.",
        time: "Just now",
        icon: InfoIcon,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        isRead: false,
        category: "welcome"
      });
    }
    
    return notifications;
  };

  const initialNotifications = generateNotifications();

  const [notifications, setNotifications] = useState(initialNotifications);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowClearConfirm(false);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Notification</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => notifications.length > 0 ? setShowClearConfirm(true) : null}
            className={`p-2 text-sm ${notifications.length > 0 ? 'text-[#6366F1] hover:text-[#4F46E5]' : 'text-gray-400 cursor-not-allowed'}`}
            disabled={notifications.length === 0}
          >
            Clear all
          </Button>
        </div>
      </div>

      {/* Clear All Confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <Card className="bg-white p-6 max-w-sm w-full">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold mb-2">Clear All Notifications</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to clear all notifications? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={clearAllNotifications}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications List */}
      <main className="px-6 py-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Notifications</h3>
            <p className="text-gray-400">You're all caught up! Check back later for new updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                    notification.isRead ? 'bg-gray-50' : 'bg-white'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-5 h-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium mb-1 leading-tight ${
                          notification.isRead ? 'text-gray-600' : 'text-[#1F2937]'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className={`text-sm mb-2 leading-relaxed ${
                          notification.isRead ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 h-6 w-6"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};