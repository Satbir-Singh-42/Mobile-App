import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";

type Step = "email" | "otp" | "newPassword" | "success";

export const ForgotPasswordPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send OTP to email
    console.log("Sending OTP to:", formData.email);
    setCurrentStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Verify OTP
    console.log("Verifying OTP:", formData.otp);
    setCurrentStep("newPassword");
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // TODO: Reset password
    console.log("Resetting password");
    setCurrentStep("success");
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
          Enter your email address
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
          placeholder="Enter your email"
          required
        />
        <p className="font-['Poppins'] text-[#090f4773] text-sm md:text-[18px]">
          We'll send you a verification code to reset your password
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-bold text-lg md:text-[32px] h-12 md:h-[80px] rounded-[15.49px]"
      >
        Send Verification Code
      </Button>
    </form>
  );

  const renderOtpStep = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
          Enter verification code
        </label>
        <Input
          type="text"
          value={formData.otp}
          onChange={(e) => setFormData({...formData, otp: e.target.value})}
          className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px] text-center tracking-widest"
          placeholder="000000"
          maxLength={6}
          required
        />
        <p className="font-['Poppins'] text-[#090f4773] text-sm md:text-[18px]">
          Enter the 6-digit code sent to {formData.email}
        </p>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-bold text-lg md:text-[32px] h-12 md:h-[80px] rounded-[15.49px]"
        >
          Verify Code
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          onClick={() => setCurrentStep("email")}
          className="w-full font-['Poppins'] font-medium text-[#4157ff] text-base md:text-[24px] hover:bg-transparent"
        >
          Resend Code
        </Button>
      </div>
    </form>
  );

  const renderNewPasswordStep = () => (
    <form onSubmit={handlePasswordReset} className="space-y-6">
      <div className="space-y-3">
        <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
          New Password
        </label>
        <Input
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
          className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
          placeholder="Enter new password"
          required
        />
      </div>

      <div className="space-y-3">
        <label className="font-['Poppins'] font-medium text-[#4157ff] text-lg md:text-[32px] block">
          Confirm New Password
        </label>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          className="h-12 md:h-[80px] bg-prima-1 rounded-[15.49px] border-[3.1px] border-[#4157ff] font-['Poppins'] font-medium text-[#090f47] text-base md:text-[24px] px-4 md:px-[30px]"
          placeholder="Confirm new password"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-bold text-lg md:text-[32px] h-12 md:h-[80px] rounded-[15.49px]"
      >
        Reset Password
      </Button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckIcon className="w-8 h-8 md:w-12 md:h-12 text-green-600" />
      </div>
      
      <div>
        <h3 className="font-['Poppins'] font-bold text-[#090f47] text-xl md:text-[32px] mb-2">
          Password Reset Successful
        </h3>
        <p className="font-['Poppins'] text-[#090f4773] text-base md:text-[24px]">
          Your password has been successfully reset. You can now login with your new password.
        </p>
      </div>

      <Button
        onClick={() => setLocation("/login")}
        className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-bold text-lg md:text-[32px] h-12 md:h-[80px] rounded-[15.49px]"
      >
        Go to Login
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Reset Password";
      case "otp":
        return "Verify Email";
      case "newPassword":
        return "Create New Password";
      case "success":
        return "Password Reset";
      default:
        return "Reset Password";
    }
  };

  return (
    <div className="bg-prima-1 min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Anta'] text-[#242424] text-4xl md:text-[80px] tracking-[-4.17px] mb-6">
            Face2Finance
          </h1>
          
          <div className="mb-6">
            <h2 className="font-['Poppins'] font-bold text-[#4157ff] text-2xl md:text-[40px] leading-[1.6]">
              {getStepTitle()}
            </h2>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-prima-1 border-none shadow-none">
          <CardContent className="p-0">
            {currentStep === "email" && renderEmailStep()}
            {currentStep === "otp" && renderOtpStep()}
            {currentStep === "newPassword" && renderNewPasswordStep()}
            {currentStep === "success" && renderSuccessStep()}
          </CardContent>
        </Card>

        {/* Back button */}
        {currentStep !== "success" && (
          <div className="mt-6">
            <Button
              onClick={() => {
                if (currentStep === "email") {
                  setLocation("/login");
                } else if (currentStep === "otp") {
                  setCurrentStep("email");
                } else if (currentStep === "newPassword") {
                  setCurrentStep("otp");
                }
              }}
              variant="ghost"
              className="font-['Overpass'] font-bold text-[#4157ff] text-lg hover:bg-transparent flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};