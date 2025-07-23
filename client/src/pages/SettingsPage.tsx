import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "wouter";
import { ArrowLeftIcon, FingerprintIcon, ShieldCheckIcon, KeyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiometricSettings {
  fingerprintEnabled: boolean;
  faceIdEnabled: boolean;
  passwordEnabled: boolean;
  isSupported: {
    fingerprint: boolean;
    faceId: boolean;
  };
}

export const SettingsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [biometricSettings, setBiometricSettings] = useState<BiometricSettings>({
    fingerprintEnabled: false,
    faceIdEnabled: false,
    passwordEnabled: true,
    isSupported: {
      fingerprint: false,
      faceId: false,
    },
  });

  useEffect(() => {
    // Check for biometric support
    checkBiometricSupport();
    loadSettings();
  }, []);

  const checkBiometricSupport = async () => {
    let fingerprintSupported = false;
    let faceIdSupported = false;

    // Check for WebAuthn support (modern biometric authentication)
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        fingerprintSupported = available;
        faceIdSupported = available;
      } catch (error) {
        console.log("Biometric check failed:", error);
      }
    }

    // Check for iOS Touch ID / Face ID
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      faceIdSupported = true;
    }

    // Check for Android fingerprint
    if (navigator.userAgent.includes('Android')) {
      fingerprintSupported = true;
    }

    setBiometricSettings(prev => ({
      ...prev,
      isSupported: {
        fingerprint: fingerprintSupported,
        faceId: faceIdSupported,
      },
    }));
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('biometricSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setBiometricSettings(prev => ({
        ...prev,
        ...parsed,
      }));
    }
  };

  const saveSettings = (newSettings: Partial<BiometricSettings>) => {
    const updated = { ...biometricSettings, ...newSettings };
    setBiometricSettings(updated);
    localStorage.setItem('biometricSettings', JSON.stringify(updated));
  };

  const handleFingerprintToggle = async (enabled: boolean) => {
    if (enabled && biometricSettings.isSupported.fingerprint) {
      try {
        // Request biometric authentication
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "Face2Finance" },
            user: {
              id: new Uint8Array(16),
              name: "user@face2finance.com",
              displayName: "Face2Finance User",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required",
            },
          },
        });

        if (credential) {
          saveSettings({ fingerprintEnabled: true });
          toast({
            title: "Fingerprint Enabled",
            description: "Fingerprint authentication has been set up successfully.",
          });
        }
      } catch (error) {
        console.error("Fingerprint setup failed:", error);
        toast({
          title: "Setup Failed",
          description: "Could not set up fingerprint authentication. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      saveSettings({ fingerprintEnabled: enabled });
      if (!enabled) {
        toast({
          title: "Fingerprint Disabled",
          description: "Fingerprint authentication has been disabled.",
        });
      }
    }
  };

  const handleFaceIdToggle = async (enabled: boolean) => {
    if (enabled && biometricSettings.isSupported.faceId) {
      try {
        // Request Face ID authentication
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "Face2Finance" },
            user: {
              id: new Uint8Array(16),
              name: "user@face2finance.com",
              displayName: "Face2Finance User",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required",
            },
          },
        });

        if (credential) {
          saveSettings({ faceIdEnabled: true });
          toast({
            title: "Face ID Enabled",
            description: "Face ID authentication has been set up successfully.",
          });
        }
      } catch (error) {
        console.error("Face ID setup failed:", error);
        toast({
          title: "Setup Failed",
          description: "Could not set up Face ID authentication. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      saveSettings({ faceIdEnabled: enabled });
      if (!enabled) {
        toast({
          title: "Face ID Disabled",
          description: "Face ID authentication has been disabled.",
        });
      }
    }
  };

  const handlePasswordToggle = (enabled: boolean) => {
    saveSettings({ passwordEnabled: enabled });
    toast({
      title: enabled ? "Password Enabled" : "Password Disabled",
      description: `Password authentication has been ${enabled ? "enabled" : "disabled"}.`,
    });
  };

  return (
    <div className="bg-prima-1 min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6 text-[#4157ff]" />
        </Button>
        <h1 className="font-['Poppins'] font-semibold text-xl text-[#242424]">Security Settings</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Two-Factor Authentication Card */}
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-[#4157ff]" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="font-['Poppins'] text-sm text-gray-600">
              Add an extra layer of security to your account with biometric or password verification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fingerprint Authentication */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="biometric-icon">
                  <FingerprintIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-medium text-[#242424]">Fingerprint</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600">
                    {biometricSettings.isSupported.fingerprint
                      ? "Use your fingerprint to verify it's you"
                      : "Not supported on this device"}
                  </p>
                </div>
              </div>
              <Switch
                checked={biometricSettings.fingerprintEnabled}
                onCheckedChange={handleFingerprintToggle}
                disabled={!biometricSettings.isSupported.fingerprint}
              />
            </div>

            {/* Face ID Authentication */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="biometric-icon">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.12.23-2.18.65-3.15C6.08 9.75 7.5 10.5 9 10.5s2.92-.75 4.35-1.65c.42.97.65 2.03.65 3.15 0 4.41-3.59 8-8 8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-medium text-[#242424]">Face ID</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600">
                    {biometricSettings.isSupported.faceId
                      ? "Use face recognition to verify it's you"
                      : "Not supported on this device"}
                  </p>
                </div>
              </div>
              <Switch
                checked={biometricSettings.faceIdEnabled}
                onCheckedChange={handleFaceIdToggle}
                disabled={!biometricSettings.isSupported.faceId}
              />
            </div>

            {/* Password Authentication */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="biometric-icon">
                  <KeyIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-medium text-[#242424]">Password Verification</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600">
                    Require password for sensitive actions
                  </p>
                </div>
              </div>
              <Switch
                checked={biometricSettings.passwordEnabled}
                onCheckedChange={handlePasswordToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="border-2 border-blue-100 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-['Poppins'] font-medium text-[#4157ff] mb-2">Security Tips</h3>
            <ul className="font-['Poppins'] text-sm text-gray-700 space-y-1">
              <li>• Enable at least one form of 2FA for better security</li>
              <li>• Biometric authentication is more secure than passwords alone</li>
              <li>• You can enable multiple authentication methods</li>
              <li>• These settings only affect this device</li>
            </ul>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={() => {
            toast({
              title: "Settings Saved",
              description: "Your security settings have been updated successfully.",
            });
            setLocation("/dashboard");
          }}
          className="w-full bg-[#4157ff] hover:bg-[#3146e6] text-white font-['Poppins'] font-semibold text-lg h-14 rounded-xl"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};