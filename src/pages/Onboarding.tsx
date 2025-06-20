
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleLanguageSelection = (lang: 'en' | 'th') => {
    setLanguage(lang);
    setCurrentStep(2);
  };

  const handlePrivacyAccept = () => {
    if (!acceptedPrivacy) {
      toast.error("Please accept the privacy policy to continue");
      return;
    }
    setCurrentStep(3);
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/home');
    toast.success("Welcome to MindSpace! 🌱");
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-white p-4">
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-mind-green-500' : 'bg-mind-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        {/* Step 1: Language Selection */}
        {currentStep === 1 && (
          <div className="animate-fade-in space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-mind-neutral-800">
                Choose Your Language
              </h1>
              <p className="text-mind-neutral-600">
                เลือกภาษาของคุณ / Select your language
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => handleLanguageSelection('en')}
                variant="outline"
                className="w-full py-6 text-lg border-2 border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50 rounded-2xl"
              >
                🇺🇸 English
              </Button>
              
              <Button
                onClick={() => handleLanguageSelection('th')}
                variant="outline"
                className="w-full py-6 text-lg border-2 border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50 rounded-2xl font-sarabun"
              >
                🇹🇭 ภาษาไทย
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Privacy Consent */}
        {currentStep === 2 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-mind-green-500" />
              </div>
              <h1 className={`text-3xl font-bold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                {t('onboarding.privacy_title')}
              </h1>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl card-shadow space-y-4">
                <div className="flex items-start space-x-3">
                  <Lock className="w-6 h-6 text-mind-blue-500 mt-1" />
                  <div>
                    <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                      End-to-End Encryption
                    </h3>
                    <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                      Your conversations are encrypted and stored securely
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Eye className="w-6 h-6 text-mind-blue-500 mt-1" />
                  <div>
                    <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                      No Data Sharing
                    </h3>
                    <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                      We never sell or share your personal information
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-mind-green-500 mt-1" />
                  <div>
                    <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                      PDPA & GDPR Compliant
                    </h3>
                    <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                      Full compliance with Thai and European privacy laws
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-mind-green-50 rounded-2xl">
                <Checkbox
                  checked={acceptedPrivacy}
                  onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                  className="mt-1"
                />
                <label className={`text-sm text-mind-neutral-700 cursor-pointer ${language === 'th' ? 'thai' : ''}`}>
                  {t('onboarding.accept_privacy')}
                </label>
              </div>

              <Button
                onClick={handlePrivacyAccept}
                disabled={!acceptedPrivacy}
                className={`w-full py-4 text-lg font-semibold bg-mind-green-500 hover:bg-mind-green-600 disabled:bg-mind-neutral-300 text-white rounded-2xl ${language === 'th' ? 'thai' : ''}`}
              >
                {t('button.continue')}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Completion */}
        {currentStep === 3 && (
          <div className="animate-fade-in space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center animate-pulse-gentle">
                <CheckCircle className="w-12 h-12 text-mind-green-500" />
              </div>
              <h1 className={`text-3xl font-bold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                You're All Set! 🌱
              </h1>
              <p className={`text-lg text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                Ready to start your mental wellness journey
              </p>
            </div>

            <Button
              onClick={handleComplete}
              className={`w-full py-4 text-lg font-semibold bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl hover:scale-105 transition-all duration-300 ${language === 'th' ? 'thai' : ''}`}
            >
              Enter MindSpace
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
