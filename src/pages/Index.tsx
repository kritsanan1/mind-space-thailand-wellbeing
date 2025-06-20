
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Shield, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen meditation-gradient flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-fade-in space-y-8 max-w-sm">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center card-shadow breathe">
            <Brain className="w-12 h-12 text-mind-green-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-mind-green-500 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className={`text-4xl font-bold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
            {t('onboarding.welcome')}
          </h1>
          <p className={`text-lg text-mind-neutral-600 leading-relaxed ${language === 'th' ? 'thai' : ''}`}>
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-2xl glass">
            <Brain className="w-6 h-6 text-mind-blue-500" />
            <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
              AI-Powered Mood Analysis
            </span>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-2xl glass">
            <Heart className="w-6 h-6 text-mind-green-500" />
            <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
              Guided Meditation & Breathing
            </span>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-2xl glass">
            <Shield className="w-6 h-6 text-mind-neutral-500" />
            <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
              Privacy-First Approach
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleGetStarted}
          className={`w-full py-4 text-lg font-semibold bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${language === 'th' ? 'thai' : ''}`}
        >
          {t('onboarding.get_started')}
        </Button>

        {/* Cultural Element */}
        <div className="pt-4">
          <div className="w-16 h-1 bg-gradient-to-r from-mind-blue-300 to-mind-green-300 rounded-full mx-auto"></div>
          <p className={`text-sm text-mind-neutral-500 mt-2 ${language === 'th' ? 'thai' : ''}`}>
            Inspired by mindfulness practices
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
