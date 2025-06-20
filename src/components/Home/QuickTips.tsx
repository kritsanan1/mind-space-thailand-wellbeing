
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";

const QuickTips = () => {
  const { t, language } = useLanguage();

  const quickTips = [
    t('home.tip_breathing'),
    t('home.tip_nature'),
    t('home.tip_gratitude')
  ];

  return (
    <Card className="p-6 bg-white card-shadow mx-6 mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-mind-green-500" />
        <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
          {t('home.quick_tips')}
        </h3>
      </div>
      
      <div className="space-y-3">
        {quickTips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-mind-blue-50 rounded-xl">
            <div className="w-2 h-2 bg-mind-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className={`text-sm text-mind-neutral-700 leading-relaxed ${language === 'th' ? 'thai' : ''}`}>
              {tip}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuickTips;
