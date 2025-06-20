
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Smile, 
  Meh, 
  Frown, 
  Brain, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Clock,
  Award
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [userName] = useState('Alex'); // This would come from user data
  const [meditationStreak, setMeditationStreak] = useState(7);
  const [todayMinutes, setTodayMinutes] = useState(15);

  useEffect(() => {
    // Simulate loading user's recent mood
    const moods = ['happy', 'neutral', 'sad'] as const;
    setCurrentMood(moods[Math.floor(Math.random() * moods.length)]);
  }, []);

  const getMoodIcon = () => {
    switch (currentMood) {
      case 'happy': return <Smile className="w-8 h-8 text-mind-green-500" />;
      case 'neutral': return <Meh className="w-8 h-8 text-mind-blue-500" />;
      case 'sad': return <Frown className="w-8 h-8 text-orange-500" />;
    }
  };

  const getMoodText = () => {
    switch (currentMood) {
      case 'happy': return 'Feeling Good';
      case 'neutral': return 'Balanced';
      case 'sad': return 'Need Support';
    }
  };

  const quickTips = [
    t('home.tip_breathing'),
    t('home.tip_nature'),
    t('home.tip_gratitude')
  ];

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-3xl card-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className={`text-2xl font-bold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {t('home.welcome')}, {userName}! 👋
            </h1>
            <p className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              How are you feeling today?
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-mind-neutral-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Today's Mood Summary */}
        <Card className="p-4 border-none bg-gradient-to-r from-mind-blue-100 to-mind-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getMoodIcon()}
              <div>
                <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                  {t('home.mood_summary')}
                </h3>
                <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                  {getMoodText()}
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/chat')}
              variant="outline"
              size="sm"
              className="border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50"
            >
              Update
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/content')}
            className="h-24 bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-all duration-300"
          >
            <Brain className="w-6 h-6" />
            <span className={`text-sm font-medium ${language === 'th' ? 'thai' : ''}`}>
              {t('home.start_meditation')}
            </span>
          </Button>

          <Button
            onClick={() => navigate('/chat')}
            variant="outline"
            className="h-24 border-2 border-mind-blue-300 text-mind-blue-600 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-mind-blue-50 hover:scale-105 transition-all duration-300"
          >
            <Heart className="w-6 h-6" />
            <span className={`text-sm font-medium ${language === 'th' ? 'thai' : ''}`}>
              {t('home.check_mood')}
            </span>
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 bg-white card-shadow">
          <h3 className={`text-lg font-semibold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
            Your Progress Today
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-mind-green-100 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-mind-green-500" />
              </div>
              <p className="text-2xl font-bold text-mind-green-500">{todayMinutes}</p>
              <p className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                {t('profile.meditation_minutes')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-mind-blue-100 rounded-full flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-mind-blue-500" />
              </div>
              <p className="text-2xl font-bold text-mind-blue-500">{meditationStreak}</p>
              <p className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                Day Streak
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-orange-500">3</p>
              <p className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                {t('profile.achievements')}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6 bg-white card-shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-mind-green-500" />
            <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {t('home.quick_tips')}
            </h3>
          </div>
          
          <div className="space-y-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-mind-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-mind-green-500 rounded-full mt-2"></div>
                <p className={`text-sm text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Premium Upgrade CTA */}
        <Card className="p-6 bg-gradient-to-r from-mind-green-500 to-mind-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-bold mb-1 ${language === 'th' ? 'thai' : ''}`}>
                {t('premium.unlock')}
              </h3>
              <p className={`text-sm opacity-90 ${language === 'th' ? 'thai' : ''}`}>
                Unlimited AI chats & exclusive content
              </p>
            </div>
            <Button
              onClick={() => navigate('/profile')}
              variant="secondary"
              size="sm"
              className={`bg-white text-mind-green-600 hover:bg-gray-100 ${language === 'th' ? 'thai' : ''}`}
            >
              {t('premium.upgrade')}
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
