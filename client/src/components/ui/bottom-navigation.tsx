import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { HomeIcon, SearchIcon, CalendarIcon, UserIcon } from "lucide-react";

interface BottomNavigationProps {
  currentPage?: string;
}

export const BottomNavigation = ({ currentPage = "" }: BottomNavigationProps) => {
  const [, setLocation] = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
      activePages: ["dashboard", ""]
    },
    {
      id: "learning",
      label: "Learning", 
      icon: SearchIcon,
      path: "/learning",
      activePages: ["learning", "search", "calculators", "calculator"]
    },
    {
      id: "planner",
      label: "Planner",
      icon: CalendarIcon,
      path: "/planner", 
      activePages: ["planner"]
    },
    {
      id: "gaming",
      label: "Gaming",
      icon: () => <span className="text-lg">🎮</span>,
      path: "/gaming",
      activePages: ["gaming", "quiz"]
    },
    {
      id: "settings",
      label: "Settings",
      icon: UserIcon,
      path: "/settings",
      activePages: ["settings", "profile", "edit-profile", "security-settings", "goals-summary", "learning-progress", "help-feedback"]
    }
  ];

  const isActive = (item: any) => {
    return item.activePages.some((page: string) => 
      currentPage.toLowerCase().includes(page) || 
      (page === "" && currentPage === "dashboard")
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-2">
        {navItems.map((item) => {
          const active = isActive(item);
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="flex flex-col items-center gap-1 p-2 min-w-0"
              onClick={() => setLocation(item.path)}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                active ? 'bg-[#6366F1]' : 'bg-gray-100'
              }`}>
                {typeof IconComponent === 'function' && item.id === 'gaming' ? (
                  <IconComponent />
                ) : (
                  <IconComponent className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500'}`} />
                )}
              </div>
              <span className={`text-xs ${active ? 'text-[#6366F1] font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};