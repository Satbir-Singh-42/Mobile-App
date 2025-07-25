import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Using custom avatar since Avatar component might not be available
import { useLocation } from "wouter";
import { 
  ArrowLeftIcon, 
  EditIcon, 
  BookOpenIcon, 
  TrendingUpIcon, 
  ShieldCheckIcon, 
  HelpCircleIcon,
  HomeIcon,
  MessageCircleIcon,
  BarChart3Icon,
  FolderIcon,
  UserIcon,
  LogOutIcon
} from "lucide-react";
import { authAPI } from "@/lib/auth";
import { useTranslation } from "@/lib/i18n";
import { BottomNavigation } from "@/components/ui/bottom-navigation";

export const ProfilePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const { t } = useTranslation();
  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = authAPI.getUser();
        
        console.log("Profile page authentication check:", {
          hasToken: !!token,
          hasUserData: !!userData,
          userData: userData
        });
        
        if (!token || !userData) {
          console.log("No token or user data found, redirecting to login");
          setLocation("/login");
          return;
        }
        
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLocation("/login");
      }
    };

    fetchUserData();

    // Listen for language changes
    const handleLanguageChange = () => {
      setForceRerender(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [setLocation]);

  const getInitials = (username: string) => {
    return username ? username.charAt(0).toUpperCase() : "U";
  };

  const menuItems = [
    {
      icon: <EditIcon className="h-5 w-5 text-gray-600" />,
      title: t('edit_profile'),
      action: () => setLocation("/edit-profile")
    },
    {
      icon: <BookOpenIcon className="h-5 w-5 text-gray-600" />,
      title: t('learning_progress'),
      action: () => setLocation("/learning-progress")
    },
    {
      icon: <TrendingUpIcon className="h-5 w-5 text-gray-600" />,
      title: t('goals_summary'),
      action: () => setLocation("/goals-summary")
    },
    {
      icon: <ShieldCheckIcon className="h-5 w-5 text-gray-600" />,
      title: t('security_settings'),
      action: () => setLocation("/security-settings")
    },

    {
      icon: <HelpCircleIcon className="h-5 w-5 text-gray-600" />,
      title: t('help_feedback'),
      action: () => setLocation("/help-feedback")
    },
    {
      icon: <LogOutIcon className="h-5 w-5 text-red-600" />,
      title: t('logout'),
      action: () => {
        authAPI.logout();
        setLocation("/");
      }
    }
  ];

  const bottomNavItems = [
    {
      icon: <HomeIcon className="h-6 w-6" />,
      action: () => setLocation("/dashboard")
    },
    {
      icon: <MessageCircleIcon className="h-6 w-6" />,
      action: () => {}
    },
    {
      icon: <BarChart3Icon className="h-6 w-6" />,
      action: () => {}
    },
    {
      icon: <FolderIcon className="h-6 w-6" />,
      action: () => {}
    },
    {
      icon: <UserIcon className="h-6 w-6 text-[#4157ff]" />,
      action: () => setLocation("/profile"),
      active: true
    }
  ];

  if (!user) {
    return (
      <div className="bg-[#F8F9FF] min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4157ff] mx-auto"></div>
          <p className="font-['Poppins'] text-gray-600 mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Button>
        <h1 className="font-['Poppins'] font-semibold text-lg text-[#242424]">Profile</h1>
        <div className="w-10" />
      </div>

      {/* Profile Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#4157ff] text-white text-xl font-['Poppins'] font-semibold rounded-full flex items-center justify-center">
            {getInitials(user.username)}
          </div>
          <div className="flex-1">
            <h2 className="font-['Poppins'] font-semibold text-xl text-[#242424]">
              Hi, {user.username}!
            </h2>
            <p className="font-['Poppins'] text-sm text-gray-600">
              {t('welcome_to_face2finance')}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  onClick={item.action}
                  className="w-full justify-start p-4 h-auto hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-['Poppins'] text-[#242424] text-base flex-1 text-left">
                      {item.title}
                    </span>
                    <ArrowLeftIcon className="h-4 w-4 text-gray-400 rotate-180" />
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation currentPage="profile" />

      {/* Add bottom padding to prevent content being hidden behind bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};