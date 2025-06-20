
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, TrendingUp, Award } from "lucide-react";

interface ProgressOverviewProps {
  todayMinutes: number;
  meditationStreak: number;
  achievements: number;
}

const ProgressOverview = ({ todayMinutes, meditationStreak, achievements }: ProgressOverviewProps) => {
  const { t, language } = useLanguage();

  return (
    <Card className="p-6 bg-white card-shadow mx-6 mb-6">
      <h3 className={`text-lg font-semibold text-mind-neutral-800 mb-6 ${language === 'th' ? 'thai' : ''}`}>
        {t('home.progress_today') || 'Your Progress Today'}
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-mind-green-500" />
          </div>
          <p className="text-2xl font-bold text-mind-green-500 mb-1">{todayMinutes}</p>
          <p className={`text-xs text-mind-neutral-600 leading-tight ${language === 'th' ? 'thai' : ''}`}>
            {t('profile.meditation_minutes') || 'Minutes'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-mind-blue-100 rounded-full flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-mind-blue-500" />
          </div>
          <p className="text-2xl font-bold text-mind-blue-500 mb-1">{meditationStreak}</p>
          <p className={`text-xs text-mind-neutral-600 leading-tight ${language === 'th' ? 'thai' : ''}`}>
            {t('home.day_streak') || 'Day Streak'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-500 mb-1">{achievements}</p>
          <p className={`text-xs text-mind-neutral-600 leading-tight ${language === 'th' ? 'thai' : ''}`}>
            {t('profile.achievements') || 'Achievements'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressOverview;
