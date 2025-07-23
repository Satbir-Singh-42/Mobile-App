import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { authAPI } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export const SignupPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to terms and conditions!",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await authAPI.register({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      
      toast({
        title: "Registration Successful",
        description: `Welcome, ${result.user.username}! Please complete your profile.`,
      });
      
      setLocation("/questionnaire"); // Redirect to questionnaire for first-time users
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-prima-1 min-h-screen h-screen w-full flex flex-col px-4 py-4 sm:py-8 overflow-y-auto">
      {/* Back Button - Top */}
      <div className="flex justify-start mb-4 sm:mb-6 flex-shrink-0">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setLocation("/login")}
          className="flex items-center gap-2 p-2 hover:bg-transparent"
        >
          <ArrowLeftIcon className="h-6 w-6 text-[#4157ff]" />
          <span className="font-['Poppins'] font-medium text-[#4157ff] text-lg">Back</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-2 sm:px-4 max-w-full">
        <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="font-['Anta'] text-[#242424] text-2xl sm:text-3xl md:text-4xl tracking-[-2px] sm:tracking-[-4px]">
              Face2Finance
            </h1>
            
            <div className="space-y-1 sm:space-y-2">
              <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-lg sm:text-xl md:text-2xl leading-tight">
                Create Account
              </h2>
              <p className="font-['Poppins'] font-medium text-[#4157ff] text-sm sm:text-base">
                Join Face2Finance today
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <Card className="bg-prima-1 border-none shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
                {/* Username Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm block">
                    Username
                  </label>
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="h-10 sm:h-11 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm px-3 sm:px-4 w-full"
                    placeholder="Choose a username"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-10 sm:h-11 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm px-3 sm:px-4 w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-10 sm:h-11 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm px-3 sm:px-4 w-full"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm block">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="h-10 sm:h-11 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm px-3 sm:px-4 pr-12 w-full"
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-[#4157ff]" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-[#4157ff]" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="h-10 sm:h-11 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm px-3 sm:px-4 pr-12 w-full"
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-[#4157ff]" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-[#4157ff]" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                    className="border-[#4157ff] data-[state=checked]:bg-[#4157ff] mt-1 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="font-['Poppins'] font-medium text-[#090f47] text-xs sm:text-sm leading-relaxed">
                    I agree to the{" "}
                    <span className="text-[#4157ff] underline cursor-pointer">Terms and Conditions</span>
                    {" "}and{" "}
                    <span className="text-[#4157ff] underline cursor-pointer">Privacy Policy</span>
                  </label>
                </div>

                {/* Signup Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4157ff] hover:bg-[#3146e6] disabled:bg-[#c4c4c4] disabled:cursor-not-allowed text-white font-['Poppins'] font-bold text-sm sm:text-base h-11 sm:h-12 rounded-[15.49px] transition-colors"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Login link */}
              <div className="text-center mt-4 sm:mt-6">
                <p className="font-['Poppins'] font-medium text-[#090f47] text-sm">
                  Already have an account?{" "}
                  <Button
                    variant="ghost"
                    onClick={() => setLocation("/login")}
                    className="font-['Poppins'] font-bold text-[#4157ff] text-sm hover:bg-transparent p-0 h-auto underline"
                  >
                    Login
                  </Button>
                </p>
              </div>
          </CardContent>
        </Card>

        </div>
      </div>
    </div>
  );
};