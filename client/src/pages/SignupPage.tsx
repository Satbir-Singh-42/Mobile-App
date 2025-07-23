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
    <div className="bg-prima-1 min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1062px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Anta'] text-[#242424] text-4xl md:text-[121px] tracking-[-4.17px] mb-6">
            Face2Finance
          </h1>
          
          <div className="mb-6">
            <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-2xl md:text-[55.8px] leading-[1.6] mb-2">
              Create Account
            </h2>
            <p className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[49.6px]">
              Join Face2Finance today
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="bg-prima-1 border-none shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
                  Username
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
                  placeholder="Choose a username"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px] pr-16"
                    placeholder="Create a password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-[#4157ff]" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-[#4157ff]" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px] pr-16"
                    placeholder="Confirm your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-[#4157ff]" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-[#4157ff]" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                  className="border-[#4157ff] data-[state=checked]:bg-[#4157ff] mt-1"
                />
                <label htmlFor="terms" className="font-['Poppins'] font-medium text-[#090f47] text-sm md:text-[20px] leading-relaxed">
                  I agree to the{" "}
                  <span className="text-[#4157ff] underline cursor-pointer">Terms and Conditions</span>
                  {" "}and{" "}
                  <span className="text-[#4157ff] underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-bold text-lg md:text-[32px] h-12 md:h-[80px] rounded-[15.49px]"
              >
                Create Account
              </Button>
            </form>

            {/* Login link */}
            <div className="text-center mt-6">
              <p className="font-['Poppins'] font-medium text-[#090f47] text-sm md:text-[24px]">
                Already have an account?{" "}
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/login")}
                  className="font-['Poppins'] font-bold text-[#4157ff] text-sm md:text-[24px] hover:bg-transparent p-0 h-auto underline"
                >
                  Login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back button */}
        <div className="mt-6">
          <Button
            onClick={() => setLocation("/walkthrough")}
            variant="ghost"
            className="font-['Overpass'] font-bold text-[#4157ff] text-lg hover:bg-transparent flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};