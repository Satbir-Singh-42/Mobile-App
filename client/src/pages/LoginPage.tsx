import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { authAPI } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export const LoginPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authAPI.login(formData);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.user.username}!`,
      });
      setLocation("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
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
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 p-2 hover:bg-transparent"
        >
          <ArrowLeftIcon className="h-6 w-6 text-[#4157ff]" />
          <span className="font-['Poppins'] font-medium text-[#4157ff] text-lg">Back</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-2 sm:px-4 max-w-full">
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="font-['Anta'] text-[#242424] text-2xl sm:text-3xl md:text-4xl tracking-[-2px] sm:tracking-[-4px]">
              Face2Finance
            </h1>
            
            <div className="space-y-2">
              <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-lg sm:text-xl md:text-2xl leading-tight">
                Welcome Back
              </h2>
              <p className="font-['Poppins'] font-medium text-[#4157ff] text-sm sm:text-base">
                Login to continue
              </p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="bg-prima-1 border-none shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm sm:text-base block">
                    Enter your username or phone number
                  </label>
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="h-11 sm:h-12 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm sm:text-base px-4 w-full"
                    placeholder="Enter username or phone"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="font-['Poppins'] font-medium text-[#4157ff] text-sm sm:text-base block">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="h-11 sm:h-12 bg-prima-1 rounded-[15.49px] border-[2px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-sm sm:text-base px-4 pr-12 w-full"
                      placeholder="Enter password"
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

                {/* Forgot Password */}
                <div className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setLocation("/forgot-password")}
                    className="font-['Poppins'] font-medium text-[#4157ff] text-sm hover:bg-transparent p-0 h-auto"
                  >
                    Forgot Password?
                  </Button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4157ff] hover:bg-[#3146e6] disabled:bg-[#c4c4c4] disabled:cursor-not-allowed text-white font-['Poppins'] font-bold text-sm sm:text-base h-11 sm:h-12 rounded-[15.49px] transition-colors"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>

              {/* Sign up link */}
              <div className="text-center mt-4 sm:mt-6">
                <p className="font-['Poppins'] font-medium text-[#090f47] text-sm">
                  Don't have an account?{" "}
                  <Button
                    variant="ghost"
                    onClick={() => setLocation("/signup")}
                    className="font-['Poppins'] font-bold text-[#4157ff] text-sm hover:bg-transparent p-0 h-auto underline"
                  >
                    Sign Up
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