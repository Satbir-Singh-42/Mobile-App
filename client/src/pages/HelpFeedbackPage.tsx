import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { ArrowLeftIcon, HelpCircleIcon, MessageSquareIcon, SendIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { authAPI } from "@/lib/auth";

export const HelpFeedbackPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'feedback' // feedback, support, bug
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate sending feedback
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent",
        description: "Thank you for your feedback! We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'feedback'
      });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            onClick={() => setLocation("/settings")}
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
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <MessageSquareIcon className="h-6 w-6 text-[#4157ff]" />
              Send us a Message
            </CardTitle>
            <CardDescription className="font-['Poppins'] text-sm text-gray-600">
              We'd love to hear from you! Share your feedback, report issues, or ask for help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Message Type */}
              <div className="space-y-2">
                <Label className="font-['Poppins'] text-sm font-medium">Message Type</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white font-['Poppins'] text-sm"
                >
                  <option value="feedback">General Feedback</option>
                  <option value="support">Support Request</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-['Poppins'] text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-['Poppins'] text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-['Poppins'] text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Brief description of your message"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-['Poppins'] text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg font-['Poppins'] min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#4157ff]"
                  placeholder="Please provide details about your feedback, issue, or question..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4157ff] hover:bg-[#3146e6] font-['Poppins'] flex items-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Resources */}
        <Card className="border-2 border-gray-100 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <HelpCircleIcon className="h-6 w-6 text-[#4157ff]" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Financial Planning Tips</h4>
              <p className="text-sm text-blue-800">
                Check out our AI chat widget for personalized financial advice and tips.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Technical Support</h4>
              <p className="text-sm text-green-800">
                Having technical issues? Use the "Bug Report" option above to get technical assistance.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Feature Requests</h4>
              <p className="text-sm text-purple-800">
                Got ideas for new features? We'd love to hear them! Use the feedback form above.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};