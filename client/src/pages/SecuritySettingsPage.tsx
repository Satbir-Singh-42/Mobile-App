import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "wouter";
import { ArrowLeftIcon, ShieldCheckIcon, FingerprintIcon, LanguagesIcon, FileTextIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation, createLanguageChangeEvent } from "@/lib/i18n";

interface BiometricSettings {
  fingerprintEnabled: boolean;
  faceIdEnabled: boolean;
  passwordEnabled: boolean;
  isSupported: {
    fingerprint: boolean;
    faceId: boolean;
  };
}

export const SecuritySettingsPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [biometricSettings, setBiometricSettings] = useState<BiometricSettings>({
    fingerprintEnabled: false,
    faceIdEnabled: false,
    passwordEnabled: true,
    isSupported: {
      fingerprint: false,
      faceId: false,
    },
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const availableLanguages = ['English', 'Hindi (हिंदी)', 'Punjabi (ਪੰਜਾਬੀ)'];

  useEffect(() => {
    checkBiometricSupport();
    loadSettings();
    // Load saved language preference
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
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
        // Silently handle error
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
    const saved = localStorage.getItem('biometricSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setBiometricSettings(prev => ({ ...prev, ...settings }));
      } catch (error) {
        console.error('Failed to load biometric settings:', error);
      }
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
        // Request fingerprint authentication
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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('userLanguage', language);
    createLanguageChangeEvent();
    toast({
      title: t('language_updated'),
      description: `${t('language_changed_to')} ${language}`,
    });
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
          <h1 className="text-xl font-semibold text-[#1F2937]">Security & Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Two-Factor Authentication */}
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-[#4157ff]" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="font-['Poppins'] text-sm text-gray-600">
              Secure your account with biometric authentication methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Fingerprint Authentication */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <FingerprintIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-['Poppins'] text-sm font-medium">Fingerprint</p>
                  <p className="font-['Poppins'] text-xs text-gray-500">
                    {biometricSettings.isSupported.fingerprint 
                      ? "Use your fingerprint to unlock the app" 
                      : "Not supported on this device"
                    }
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
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-['Poppins'] text-sm font-medium">Face ID</p>
                  <p className="font-['Poppins'] text-xs text-gray-500">
                    {biometricSettings.isSupported.faceId 
                      ? "Use Face ID to unlock the app" 
                      : "Not supported on this device"
                    }
                  </p>
                </div>
              </div>
              <Switch
                checked={biometricSettings.faceIdEnabled}
                onCheckedChange={handleFaceIdToggle}
                disabled={!biometricSettings.isSupported.faceId}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Preferences */}
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <LanguagesIcon className="h-6 w-6 text-[#4157ff]" />
              Language Preferences
            </CardTitle>
            <CardDescription className="font-['Poppins'] text-sm text-gray-600">
              Choose your preferred language for the app interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="font-['Poppins'] text-sm font-medium">App Language</label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-white font-['Poppins'] text-sm"
              >
                {availableLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Questionnaire Settings */}
        <Card className="border-2 border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <FileTextIcon className="h-6 w-6 text-[#4157ff]" />
              Questionnaire Settings
            </CardTitle>
            <CardDescription className="font-['Poppins'] text-sm text-gray-600">
              Update your financial profile and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setLocation("/questionnaire")}
              className="w-full bg-[#4157ff] hover:bg-[#3146e6] font-['Poppins']"
            >
              Edit Questionnaire
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};