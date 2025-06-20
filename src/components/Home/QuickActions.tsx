
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Heart } from "lucide-react";

interface QuickActionsProps {
  onStartMeditation: () => void;
  onCheckMood: () => void;
}

const QuickActions = ({ onStartMeditation, onCheckMood }: QuickActionsProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-4 mx-6 mb-6">
      <Button
        onClick={onStartMeditation}
        className="h-24 bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-all duration-300 shadow-lg"
      >
        <Brain className="w-6 h-6" />
        <span className={`text-sm font-semibold ${language === 'th' ? 'thai' : ''}`}>
          {t('home.start_meditation')}
        </span>
      </Button>

      <Button
        onClick={onCheckMood}
        variant="outline"
        className="h-24 border-2 border-mind-green-200 text-mind-green-600 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-mind-green-50 hover:scale-105 transition-all duration-300 bg-white"
      >
        <Heart className="w-6 h-6" />
        <span className={`text-sm font-semibold ${language === 'th' ? 'thai' : ''}`}>
          {t('home.check_mood')}
        </span>
      </Button>
    </div>
  );
};

export default QuickActions;
