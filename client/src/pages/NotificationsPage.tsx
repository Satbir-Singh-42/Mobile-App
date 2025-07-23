import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState } from "react";
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

  const initialNotifications = [
    {
      id: 1,
      title: "Learning Consistency Reminder",
      message: "For children AND adults—learning is most effective when it is consistent. Keep up your daily financial literacy practice!",
      time: "2 hours ago",
      icon: InfoIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isRead: false,
      category: "educational"
    },
    {
      id: 2,
      title: "New Course Available",
      message: "The future of professional learning is immersive. Check out our new 'Investment Basics' course now available!",
      time: "5 hours ago", 
      icon: GraduationCapIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isRead: false,
      category: "course"
    },
    {
      id: 3,
      title: "Blended Learning Update",
      message: "New interactive modules have been added to your financial planning course. Complete them to earn bonus points!",
      time: "1 day ago",
      icon: BookOpenIcon,
      color: "text-purple-600", 
      bgColor: "bg-purple-100",
      isRead: false,
      category: "update"
    },
    {
      id: 4,
      title: "Security Alert",
      message: "Technology should serve, not drive, your financial decisions. Learn about the latest fraud prevention techniques.",
      time: "2 days ago",
      icon: ShieldIcon,
      color: "text-red-600",
      bgColor: "bg-red-100", 
      isRead: false,
      category: "security"
    },
    {
      id: 5,
      title: "Community Achievement",
      message: "Peer learning works! You've successfully completed 5 group challenges. Join our next community session.",
      time: "3 days ago",
      icon: UserIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      isRead: false,
      category: "achievement"
    }
  ];

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