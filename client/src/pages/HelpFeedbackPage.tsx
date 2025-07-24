import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, HelpCircleIcon, SmartphoneIcon, StarIcon } from "lucide-react";

export const HelpFeedbackPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const handleAppStoreRedirect = () => {
    // Detect platform and redirect accordingly
    const userAgent = navigator.userAgent || navigator.vendor;
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      // iOS - redirect to App Store
      window.open('https://apps.apple.com/app/face2finance', '_blank');
    } else if (/android/i.test(userAgent)) {
      // Android - redirect to Google Play Store
      window.open('https://play.google.com/store/apps/details?id=com.face2finance', '_blank');
    } else {
      // Default fallback - could be web app or desktop
      window.open('https://face2finance.com/download', '_blank');
    }
  };

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/profile")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Help & Feedback</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6">
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircleIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-['Poppins'] text-xl text-[#242424]">
              Need Help or Want to Give Feedback?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 font-['Poppins'] leading-relaxed">
              We'd love to hear from you! Rate our app and share your experience to help us improve Face2Finance.
            </p>

            {/* App Store Redirect Button */}
            <div className="space-y-4">
              <Button
                onClick={handleAppStoreRedirect}
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-4 rounded-lg font-['Poppins'] font-medium text-lg hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center justify-center gap-3">
                  <SmartphoneIcon className="w-5 h-5" />
                  Rate Us on App Store
                </div>
              </Button>

              <div className="flex items-center justify-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-sm text-gray-500 font-['Poppins']">
                Your feedback helps us create better financial literacy experiences
              </p>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-['Poppins']">
                You'll be redirected to the appropriate app store for your device
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};