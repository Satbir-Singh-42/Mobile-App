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
    <div className="bg-prima-1 min-h-screen w-full flex flex-col px-4 py-8">
      {/* Back Button - Top */}
      <div className="flex justify-start mb-6">
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

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[1062px]">
          {/* Header */}
          <div className="text-center mb-12">
          <h1 className="font-['Anta'] text-[#242424] text-4xl md:text-[121px] tracking-[-4.17px] mb-8">
            Face2Finance
          </h1>
          
          <div className="mb-8">
            <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-2xl md:text-[55.8px] leading-[1.6] mb-2">
              Welcome Back
            </h2>
            <p className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[49.6px]">
              Login to continue
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-prima-1 border-none shadow-none">
          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-8">
              {/* Username Field */}
              <div className="space-y-3">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[49.6px] block">
                  Enter your username or phone number
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="h-16 md:h-[136px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-lg md:text-[43.4px] px-6 md:px-[59px]"
                  placeholder="Enter username or phone"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[49.6px] block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="h-16 md:h-[136px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-lg md:text-[43.4px] px-6 md:px-[59px] pr-20"
                    placeholder="Enter password"
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

              {/* Forgot Password */}
              <div className="text-right">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLocation("/forgot-password")}
                  className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[43.4px] hover:bg-transparent p-0 h-auto"
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4157ff] hover:bg-[#3146e6] disabled:bg-[#c4c4c4] disabled:cursor-not-allowed text-white font-['Poppins'] font-bold text-lg md:text-[43.4px] h-16 md:h-[136px] rounded-[15.49px]"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Sign up link */}
            <div className="text-center mt-8">
              <p className="font-['Poppins'] font-medium text-[#090f47] text-lg md:text-[32px]">
                Don't have an account?{" "}
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/signup")}
                  className="font-['Poppins'] font-bold text-[#4157ff] text-lg md:text-[32px] hover:bg-transparent p-0 h-auto underline"
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