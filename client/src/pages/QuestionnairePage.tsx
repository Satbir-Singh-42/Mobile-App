import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowLeftIcon, ArrowRightIcon, GraduationCapIcon, BookOpenIcon, TrendingUpIcon, BarChart3Icon, CrownIcon } from "lucide-react";
import { authAPI } from "@/lib/auth";

interface Question {
  id: string;
  title: string;
  options: string[];
  required: boolean;
  icons?: JSX.Element[];
  hasNetworkImages?: boolean;
}

export const QuestionnairePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: Question[] = [
    {
      id: "age",
      title: "What's your age group?",
      options: [
        "From 13 to 17 years old",
        "18 to 24 years old", 
        "25 to 34 years old",
        "35 to 44 years old",
        "45 to 54 years old",
        "55 to 64 years old",
        "65+"
      ],
      required: true
    },
    {
      id: "income",
      title: "What's your monthly income range?",
      options: [
        "No income",
        "Below ₹20,000",
        "₹20,000 - ₹50,000",
        "₹50,000 - ₹1,00,000", 
        "₹1,00,000 - ₹2,00,000",
        "Above ₹2,00,000",
        "Prefer not to say"
      ],
      required: true
    },
    {
      id: "goals",
      title: "What are your main financial goals?",
      options: [
        "Building an emergency fund",
        "Saving for retirement",
        "Buying a house/property",
        "Paying off debt",
        "Starting a business",
        "Travel and experiences",
        "Children's education",
        "Prefer not to say"
      ],
      required: true
    },
    {
      id: "experience",
      title: "How would you describe your financial knowledge?",
      options: [
        "I'm a complete beginner",
        "I have basic knowledge",
        "I have some experience",
        "I'm quite knowledgeable",
        "I'm an expert"
      ],
      required: true,
      hasNetworkImages: true
    },
    {
      id: "practice_time",
      title: "How much time can you dedicate to learning about finance daily?",
      options: [
        "5-10 minutes",
        "15-20 minutes", 
        "25-30 minutes",
        "35-45 minutes",
        "1 hour or more"
      ],
      required: true
    },
    {
      id: "language",
      title: "Which language do you prefer for learning?",
      options: [
        "English",
        "Hindi (हिंदी)",
        "Punjabi (ਪੰਜਾਬੀ)"
      ],
      required: true
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = answers[currentQuestion.id];

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      try {
        // Map answers to match schema
        const questionnaireData = {
          age: answers.age,
          income: answers.income,
          goals: answers.goals,
          experience: answers.experience,
          practiceTime: answers.practice_time,
          language: answers.language
        };
        
        await authAPI.saveQuestionnaire(questionnaireData);
        console.log("Questionnaire submitted successfully");
        setLocation("/dashboard");
      } catch (error) {
        console.error("Failed to save questionnaire:", error);
        // Still redirect to dashboard even if questionnaire fails
        setLocation("/dashboard");
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setLocation("/signup");
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  // Removed different colors for consistency

  const getKnowledgeVisualization = (level: string, index: number) => {
    // Using reliable CDN images for different knowledge levels
    const knowledgeImages = [
      "https://img.icons8.com/fluency/48/student-male.png", // Complete beginner - student
      "https://img.icons8.com/fluency/48/reading.png", // Basic knowledge - reading
      "https://img.icons8.com/fluency/48/calculator.png", // Some experience - calculator
      "https://img.icons8.com/fluency/48/graph.png", // Quite knowledgeable - graph
      "https://img.icons8.com/fluency/48/expert.png"  // Expert - expert
    ];

    return (
      <div className="flex items-center justify-center">
        <img 
          src={knowledgeImages[index] || knowledgeImages[0]} 
          alt={`Knowledge level ${index + 1}`}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            // Fallback to bars if image fails to load
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallbackDiv = target.nextElementSibling as HTMLElement;
            if (fallbackDiv) {
              fallbackDiv.style.display = 'flex';
            }
          }}
        />
        <div className="hidden items-end justify-center gap-1">
          {Array.from({length: 3}).map((_, barIndex) => (
            <div
              key={barIndex}
              className={`w-2 rounded-t ${
                barIndex <= index ? "bg-[#5589f4]" : "bg-[#5589f433]"
              } ${
                barIndex === 0 ? "h-4" : barIndex === 1 ? "h-6" : "h-8"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-prima-1 min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Anta'] text-[#242424] text-4xl md:text-[80px] tracking-[-4.17px] mb-4">
            Face2Finance
          </h1>
          
          <div className="mb-6">
            <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-xl md:text-[40px] leading-[1.6] mb-2">
              Let's personalize your experience
            </h2>
            <p className="font-['Poppins'] font-medium text-[#090f4773] text-base md:text-[24px]">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#c4c4c4] rounded-full h-2 mb-8">
            <div
              className="bg-[#4157ff] h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-prima-1 border-[3.1px] border-[#4157ff] rounded-[15.49px] shadow-lg">
          <CardContent className="p-8">
            <h3 className="font-['Poppins'] font-bold text-[#090f47] text-xl md:text-[32px] mb-8 text-center">
              {currentQuestion.title}
            </h3>

            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={option} className="relative">
                  <div
                    className={`p-4 rounded-[10px] border-2 cursor-pointer transition-all ${
                      answers[currentQuestion.id] === option
                        ? "border-[#4157ff] bg-[#4157ff0f]"
                        : "border-[#c4c4c4] hover:border-[#4157ff66]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="border-[#4157ff] text-[#4157ff]"
                      />
                      {currentQuestion.hasNetworkImages && currentQuestion.id === "experience" && (
                        <div className="flex-shrink-0">
                          {getKnowledgeVisualization(option, index)}
                        </div>
                      )}
                      {currentQuestion.icons && currentQuestion.icons[index] && !currentQuestion.hasNetworkImages && (
                        <div className="flex-shrink-0">
                          {currentQuestion.icons[index]}
                        </div>
                      )}
                      <Label
                        htmlFor={option}
                        className="font-['Poppins'] font-medium text-[#090f47] text-base md:text-[20px] cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>

                    {/* Remove old knowledge level visualization since it's now in the main option */}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="font-['Overpass'] font-bold text-[#4157ff] text-lg hover:bg-transparent flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-[#4157ff] hover:bg-[#3146e6] disabled:bg-[#c4c4c4] disabled:cursor-not-allowed text-white font-['Poppins'] font-bold text-lg px-8 py-4 h-auto rounded-[15.49px] flex items-center gap-2"
          >
            {isLastQuestion ? "Complete Setup" : "Next"}
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};