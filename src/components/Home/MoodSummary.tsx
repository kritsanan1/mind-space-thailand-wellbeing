
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Smile, Meh, Frown } from "lucide-react";

interface MoodSummaryProps {
  onUpdateMood: () => void;
}

const MoodSummary = ({ onUpdateMood }: MoodSummaryProps) => {
  const { t, language } = useLanguage();
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');

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
      case 'happy': return t('home.mood_happy') || 'Feeling Good';
      case 'neutral': return t('home.mood_neutral') || 'Balanced';
      case 'sad': return t('home.mood_sad') || 'Need Support';
    }
  };

  return (
    <Card className="p-5 border-none bg-gradient-to-r from-mind-blue-100 to-mind-green-100 mx-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getMoodIcon()}
          <div>
            <h3 className={`font-semibold text-mind-neutral-800 text-lg ${language === 'th' ? 'thai' : ''}`}>
              {t('home.mood_summary')}
            </h3>
            <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {getMoodText()}
            </p>
          </div>
        </div>
        <Button
          onClick={onUpdateMood}
          variant="outline"
          size="sm"
          className="border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50 rounded-full px-4 py-2"
        >
          <span className={`text-xs font-medium ${language === 'th' ? 'thai' : ''}`}>
            Update
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default MoodSummary;
