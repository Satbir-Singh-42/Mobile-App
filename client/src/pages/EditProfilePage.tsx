import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowLeftIcon, EditIcon, CameraIcon, UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/auth";

export const EditProfilePage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    profileImage: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    const user = authAPI.getUser();
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: ''
      });
    }
  };

  const handleProfileUpdate = async () => {
    setIsUpdating(true);
    try {
      const result = await authAPI.updateProfile(profileData);
      toast({
        title: "Profile Updated",
        description: result.message || "Your profile has been updated successfully.",
      });
      setLocation("/profile");
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profileImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
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
          <h1 className="text-xl font-semibold text-[#1F2937]">Edit Profile</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6">
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <EditIcon className="h-6 w-6 text-[#4157ff]" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center overflow-hidden">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-white" />
                  )}
                </div>
                <label htmlFor="profileImage" className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-50">
                  <CameraIcon className="w-4 h-4 text-gray-600" />
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">Tap the camera icon to change your profile picture</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-['Poppins'] text-sm font-medium">Username</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-['Poppins'] text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-['Poppins'] text-sm font-medium">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="font-['Poppins']"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="flex-1 bg-[#4157ff] hover:bg-[#3146e6] font-['Poppins']"
              >
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/profile")}
                className="flex-1 font-['Poppins']"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};