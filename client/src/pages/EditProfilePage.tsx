import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowLeftIcon, EditIcon, CameraIcon, UserIcon, KeyIcon } from "lucide-react";
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
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

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

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const result = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast({
        title: "Password Changed",
        description: result.message || "Your password has been changed successfully.",
      });
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast({
        title: "Password Change Failed",
        description: error.message || "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
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
            onClick={() => setLocation("/dashboard")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Profile</h1>
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
                onClick={() => setLocation("/dashboard")}
                className="flex-1 font-['Poppins']"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Section */}
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <KeyIcon className="h-6 w-6 text-[#4157ff]" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isChangingPassword ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Keep your account secure by updating your password regularly.</p>
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-[#4157ff] hover:bg-[#3146e6] font-['Poppins']"
                >
                  Change Password
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="font-['Poppins'] text-sm font-medium">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="font-['Poppins']"
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="font-['Poppins'] text-sm font-medium">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="font-['Poppins']"
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-['Poppins'] text-sm font-medium">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="font-['Poppins']"
                    placeholder="Confirm your new password"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={isUpdatingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex-1 bg-[#4157ff] hover:bg-[#3146e6] font-['Poppins']"
                  >
                    {isUpdatingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="flex-1 font-['Poppins']"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};