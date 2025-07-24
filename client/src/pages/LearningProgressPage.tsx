import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";

export const LearningProgressPage = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/settings")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Learning Progress</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6">
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardContent className="p-8 text-center">
            <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Learning Progress Coming Soon</h3>
            <p className="text-gray-500 mb-6">
              Your learning progress and achievements will be displayed here once available.
            </p>
            <Button
              onClick={() => setLocation("/dashboard")}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-lg"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};