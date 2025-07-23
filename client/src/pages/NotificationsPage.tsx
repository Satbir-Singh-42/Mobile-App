import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
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
  GraduationCapIcon
} from "lucide-react";

export const NotificationsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const notifications = [
    {
      id: 1,
      title: "We know that—for children AND adults—learning is most effective when it is consistent.",
      message: "Aug 12, 2020 at 12:08 PM",
      time: "Aug 12, 2020 at 12:08 PM",
      icon: InfoIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isRead: false
    },
    {
      id: 2,
      title: "The future of professional learning is immersive. Community opportunities for growth and learning.",
      message: "Aug 10, 2020 at 12:02 PM", 
      time: "Aug 10, 2020 at 12:02 PM",
      icon: GraduationCapIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isRead: false
    },
    {
      id: 3,
      title: "With this in mind, Global Online Academy created the Blended Learning Design.",
      message: "Aug 10, 2020 at 12:08 PM",
      time: "Aug 10, 2020 at 12:08 PM",
      icon: InfoIcon,
      color: "text-blue-600", 
      bgColor: "bg-blue-100",
      isRead: false
    },
    {
      id: 4,
      title: "Technology should serve, not drive, pedagogy. Schools often discuss.",
      message: "Aug 12, 2020 at 12:08 PM",
      time: "Aug 12, 2020 at 12:08 PM",
      icon: SettingsIcon,
      color: "text-gray-600",
      bgColor: "bg-gray-100", 
      isRead: false
    },
    {
      id: 5,
      title: "Peer learning works. By building robust personal learning communities both…",
      message: "Aug 12, 2020 at 12:08 PM",
      time: "Aug 12, 2020 at 12:08 PM",
      icon: UserIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      isRead: false
    }
  ];

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
            className="p-2 text-[#6366F1] text-sm"
          >
            Clear all
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <main className="px-6 py-4">
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#1F2937] mb-2 leading-tight">
                        {notification.title}
                      </h3>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};