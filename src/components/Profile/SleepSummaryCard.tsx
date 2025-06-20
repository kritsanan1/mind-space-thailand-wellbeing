
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Moon, Clock, TrendingUp } from 'lucide-react';

interface SleepData {
  duration: number; // in hours
  quality: 'good' | 'average' | 'poor';
  bedtime: string;
  wakeTime: string;
  deepSleep: number; // percentage
  lightSleep: number; // percentage
  remSleep: number; // percentage
}

const SleepSummaryCard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sleep data
    setTimeout(() => {
      const mockSleepData: SleepData = {
        duration: 7.5,
        quality: 'good',
        bedtime: '23:30',
        wakeTime: '07:00',
        deepSleep: 25,
        lightSleep: 60,
        remSleep: 15
      };
      setSleepData(mockSleepData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'good': return 'text-green-600';
      case 'average': return 'text-orange-500';
      case 'poor': return 'text-red-500';
      default: return 'text-mind-neutral-600';
    }
  };

  const getQualityText = (quality: string) => {
    if (language === 'th') {
      switch (quality) {
        case 'good': return 'การนอนหลับดี';
        case 'average': return 'การนอนหลับปานกลาง';
        case 'poor': return 'การนอนหลับไม่ดี';
        default: return 'ไม่ทราบ';
      }
    } else {
      switch (quality) {
        case 'good': return 'Good Sleep';
        case 'average': return 'Average Sleep';
        case 'poor': return 'Poor Sleep';
        default: return 'Unknown';
      }
    }
  };

  const handlePreBedMeditation = () => {
    navigate('/content');
  };

  if (isLoading) {
    return (
      <Card className="p-6 card-shadow mb-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-5 h-5 bg-mind-neutral-200 rounded"></div>
            <div className="h-5 bg-mind-neutral-200 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-mind-neutral-200 rounded"></div>
            <div className="h-4 bg-mind-neutral-200 rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!sleepData) {
    return (
      <Card className="p-6 card-shadow mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Moon className="w-5 h-5 text-blue-500" />
          <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'สรุปการนอนหลับ' : 'Sleep Summary'}
          </h3>
        </div>
        <div className="text-center py-8">
          <Moon className="w-12 h-12 text-mind-neutral-300 mx-auto mb-4" />
          <p className={`text-mind-neutral-600 mb-4 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' 
              ? 'เชื่อมต่อสมาร์ทวอทช์เพื่อติดตามการนอนหลับ' 
              : 'Connect smartwatch to track sleep'}
          </p>
          <Button
            onClick={() => navigate('/profile')}
            className="bg-mind-green-500 hover:bg-mind-green-600 text-white"
          >
            {language === 'th' ? 'เชื่อมต่ออุปกรณ์' : 'Connect Device'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 card-shadow mb-6 animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <Moon className="w-5 h-5 text-blue-500" />
        <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
          {language === 'th' ? 'สรุปการนอนหลับ' : 'Sleep Summary'}
        </h3>
      </div>

      {/* Sleep Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-500">{sleepData.duration}h</div>
          <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'ระยะเวลา' : 'Duration'}
          </div>
        </div>

        <div className="text-center">
          <div className={`w-12 h-12 mx-auto bg-${sleepData.quality === 'good' ? 'green' : sleepData.quality === 'average' ? 'orange' : 'red'}-100 rounded-full flex items-center justify-center mb-2`}>
            <TrendingUp className={`w-6 h-6 ${getQualityColor(sleepData.quality)}`} />
          </div>
          <div className={`text-sm font-bold ${getQualityColor(sleepData.quality)}`}>
            {getQualityText(sleepData.quality)}
          </div>
          <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'คุณภาพ' : 'Quality'}
          </div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Moon className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-500">{sleepData.deepSleep}%</div>
          <div className={`text-xs text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'หลับลึก' : 'Deep Sleep'}
          </div>
        </div>
      </div>

      {/* Sleep Chart */}
      <div className="mb-6">
        <h4 className={`text-sm font-semibold text-mind-neutral-700 mb-3 ${language === 'th' ? 'thai' : ''}`}>
          {language === 'th' ? 'รูปแบบการนอนหลับ' : 'Sleep Pattern'}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'หลับลึก' : 'Deep Sleep'}
            </span>
            <span className="text-mind-neutral-800">{sleepData.deepSleep}%</span>
          </div>
          <div className="w-full bg-mind-neutral-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${sleepData.deepSleep}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'หลับตื้น' : 'Light Sleep'}
            </span>
            <span className="text-mind-neutral-800">{sleepData.lightSleep}%</span>
          </div>
          <div className="w-full bg-mind-neutral-200 rounded-full h-2">
            <div 
              className="bg-blue-300 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${sleepData.lightSleep}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'REM' : 'REM Sleep'}
            </span>
            <span className="text-mind-neutral-800">{sleepData.remSleep}%</span>
          </div>
          <div className="w-full bg-mind-neutral-200 rounded-full h-2">
            <div 
              className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${sleepData.remSleep}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sleep Schedule */}
      <div className="flex items-center justify-between text-sm text-mind-neutral-600 mb-4">
        <div>
          <span className={`${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'เข้านอน:' : 'Bedtime:'} 
          </span>
          <span className="font-semibold text-mind-neutral-800 ml-1">{sleepData.bedtime}</span>
        </div>
        <div>
          <span className={`${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'ตื่นนอน:' : 'Wake up:'} 
          </span>
          <span className="font-semibold text-mind-neutral-800 ml-1">{sleepData.wakeTime}</span>
        </div>
      </div>

      {/* Pre-bed Meditation Button */}
      <Button
        onClick={handlePreBedMeditation}
        className="w-full bg-mind-green-500 hover:bg-mind-green-600 text-white flex items-center justify-center space-x-2"
      >
        <Moon className="w-4 h-4" />
        <span className={`${language === 'th' ? 'thai' : ''}`}>
          {language === 'th' ? 'สมาธิก่อนนอน' : 'Pre-Bed Meditation'}
        </span>
      </Button>
    </Card>
  );
};

export default SleepSummaryCard;
