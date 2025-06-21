
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SleepSummaryCard from "./SleepSummaryCard";
import { 
  Clock, 
  TrendingUp, 
  Award, 
  Trophy 
} from "lucide-react";

interface ProfileOverviewProps {
  userStats: {
    meditationMinutes: number;
    moodStreak: number;
    achievements: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    date?: string;
    progress?: number;
  }>;
}

const ProfileOverview = ({ userStats, achievements }: ProfileOverviewProps) => {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Stats Overview */}
      <Card className="p-6 card-shadow mb-6">
        <h2 className={`text-lg font-semibold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
          {t('profile.progress')}
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-mind-green-500" />
            </div>
            <div className="text-2xl font-bold text-mind-green-500">{userStats.meditationMinutes}</div>
            <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {t('profile.meditation_minutes')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-mind-blue-100 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-mind-blue-500" />
            </div>
            <div className="text-2xl font-bold text-mind-blue-500">{userStats.moodStreak}</div>
            <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {t('profile.mood_streak')}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-500">{userStats.achievements}</div>
            <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {t('profile.achievements')}
            </div>
          </div>
        </div>
      </Card>

      {/* Sleep Summary */}
      <SleepSummaryCard />

      {/* Achievements */}
      <Card className="p-6 card-shadow mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-orange-500" />
          <h2 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
            {t('profile.achievements')}
          </h2>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-xl ${
              achievement.earned ? 'bg-mind-green-50' : 'bg-mind-neutral-50'
            }`}>
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className={`font-semibold ${achievement.earned ? 'text-mind-green-700' : 'text-mind-neutral-600'} ${language === 'th' ? 'thai' : ''}`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${achievement.earned ? 'text-mind-green-600' : 'text-mind-neutral-500'} ${language === 'th' ? 'thai' : ''}`}>
                  {achievement.description}
                </p>
                {!achievement.earned && achievement.progress && (
                  <div className="mt-1">
                    <div className="w-full bg-mind-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-mind-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-mind-neutral-500">{achievement.progress}%</span>
                  </div>
                )}
              </div>
              {achievement.earned && achievement.date && (
                <div className="text-xs text-mind-green-600">
                  {new Date(achievement.date).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default ProfileOverview;
