import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const WalkthroughPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const walkthroughSteps = [
    {
      id: 1,
      title: "Master Your Money",
      description: "Learn budgeting, saving, and investment — one step at a time.",
      image: "/figmaAssets/2.png",
    },
    {
      id: 2,
      title: "Learn Your Way", 
      description: "Get personalized tips based on your age, income, and goals.",
      image: "/figmaAssets/1.png",
    },
    {
      id: 3,
      title: "Stay Safe Online",
      description: "Detect and avoid frauds like OTP scams and phishing traps.",
      image: "/figmaAssets/3.png",
    },
  ];

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/signup");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setLocation("/");
    }
  };

  const handleSkip = () => {
    setLocation("/signup");
  };

  const currentStepData = walkthroughSteps[currentStep];

  return (
    <div className="bg-white min-h-screen w-full relative overflow-hidden">
      <div className="max-w-[1162px] mx-auto h-screen relative">
        {/* Header */}
        <div className="absolute top-12 left-0 right-0 flex justify-between items-center px-12">
          <h1 className="font-['Anta'] text-[#242424] text-4xl md:text-[121px] tracking-[-4.17px]">
            Face2Finance
          </h1>
          
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="font-['Overpass'] text-[#090f4773] text-lg md:text-[43.4px] hover:bg-transparent"
          >
            Skip
          </Button>
        </div>

        {/* Main content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Illustration */}
          <div className="w-[300px] md:w-[774px] h-[300px] md:h-[774px] mx-auto mb-8">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-[#4157ff0f] rounded-full" />
              <img
                className="absolute inset-0 w-full h-full object-contain p-4 md:p-8"
                alt={currentStepData.title}
                src={currentStepData.image}
              />
            </div>
          </div>

          {/* Title and description */}
          <div className="max-w-[793px] mx-auto">
            <h2 className="font-['Overpass'] font-bold text-[#090f47] text-3xl md:text-[74.2px] leading-[1.3] mb-4">
              {currentStepData.title}
            </h2>
            <p className="font-['Overpass'] font-light text-[#090f4773] text-lg md:text-[49.5px] leading-[1.5]">
              {currentStepData.description}
            </p>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-12 left-0 right-0 px-12">
          {/* Progress dots */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4 md:space-x-[37px]">
              {walkthroughSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentStep ? "bg-[#4157ff]" : "bg-[#c4c4c4]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="font-['Overpass'] font-bold text-[#4157ff] text-lg md:text-[43.4px] hover:bg-transparent flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-6 h-6" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              className="bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Overpass'] font-bold text-lg md:text-[43.4px] px-8 py-4 h-auto rounded-[15.49px] flex items-center gap-2"
            >
              {currentStep === walkthroughSteps.length - 1 ? "Get Started" : "Next"}
              <ArrowRightIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};