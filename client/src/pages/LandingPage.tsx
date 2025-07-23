import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export const LandingPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-prima-1 min-h-screen w-full relative overflow-hidden mobile-status-hidden">
      {/* Background Pattern - matching Figma design */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 375 812" fill="none">
          <defs>
            <pattern id="lines" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0 20L20 0M-5 5L5 -5M15 25L25 15" stroke="#9CA3AF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)"/>
          
          {/* Curved elements */}
          <path d="M-50 150 Q100 120 200 180 T400 200" stroke="#E5E7EB" strokeWidth="2" fill="none"/>
          <path d="M-50 250 Q150 220 300 280 T450 300" stroke="#E5E7EB" strokeWidth="2" fill="none"/>
          <path d="M-50 600 Q100 570 250 630 T400 650" stroke="#E5E7EB" strokeWidth="2" fill="none"/>
          <path d="M-50 700 Q200 670 350 730 T500 750" stroke="#E5E7EB" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      


      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-20">
        {/* Face2Finance Logo */}
        <div className="text-center mb-16">
          <h1 className="font-['Anta'] text-[#242424] text-5xl tracking-[-2px] leading-tight">
            Face2Finance
          </h1>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-xs">
          <Button
            onClick={() => setLocation("/walkthrough")}
            className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-semibold text-lg h-14 rounded-xl transition-all duration-200 transform active:scale-95"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};