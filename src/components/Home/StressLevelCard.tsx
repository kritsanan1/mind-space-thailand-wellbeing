
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Wind } from 'lucide-react';

interface StressLevel {
  level: 'low' | 'medium' | 'high';
  heartRate: number;
  timestamp: Date;
}

const StressLevelCard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [stressData, setStressData] = useState<StressLevel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stress data from smartwatch
    setTimeout(() => {
      const mockStressLevels: StressLevel[] = [
        { level: 'low', heartRate: 68, timestamp: new Date() },
        { level: 'medium', heartRate: 85, timestamp: new Date() },
        { level: 'high', heartRate: 105, timestamp: new Date() }
      ];
      
      const randomStress = mockStressLevels[Math.floor(Math.random() * mockStressLevels.length)];
      setStressData(randomStress);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStressLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-orange-500';
      case 'high': return 'text-red-500';
      default: return 'text-mind-neutral-600';
    }
  };

  const getStressLevelText = (level: string) => {
    if (language === 'th') {
      switch (level) {
        case 'low': return 'ความเครียดต่ำ';
        case 'medium': return 'ความเครียดปานกลาง';
        case 'high': return 'ความเครียดสูง';
        default: return 'ไม่ทราบ';
      }
    } else {
      switch (level) {
        case 'low': return 'Low Stress';
        case 'medium': return 'Medium Stress';
        case 'high': return 'High Stress';
        default: return 'Unknown';
      }
    }
  };

  const handleStartBreathing = () => {
    navigate('/content');
  };

  if (isLoading) {
    return (
      <Card className="p-5 bg-gradient-to-r from-mind-green-100 to-mind-blue-100 mx-6 mb-4">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-mind-neutral-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-mind-neutral-200 rounded w-32"></div>
              <div className="h-3 bg-mind-neutral-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!stressData) {
    return (
      <Card className="p-5 bg-mind-neutral-50 mx-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-mind-neutral-400" />
            <div>
              <h3 className={`font-semibold text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'ระดับความเครียด' : 'Stress Level'}
              </h3>
              <p className={`text-sm text-mind-neutral-500 ${language === 'th' ? 'thai' : ''}`}>
                {language === 'th' ? 'เชื่อมต่อสมาร์ทวอทช์เพื่อดูข้อมูล' : 'Connect smartwatch to view data'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/profile')}
            className="border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50"
          >
            <span className={`text-xs font-medium ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'เชื่อมต่อ' : 'Connect'}
            </span>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-mind-green-100 mx-6 mb-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Heart className={`w-8 h-8 ${getStressLevelColor(stressData.level)} ${stressData.level === 'high' ? 'animate-pulse' : ''}`} />
            {stressData.level === 'high' && (
              <div className="absolute -inset-1 rounded-full bg-red-200 animate-ping opacity-75"></div>
            )}
          </div>
          <div>
            <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {getStressLevelText(stressData.level)}
            </h3>
            <p className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'อัตราการเต้น' : 'Heart Rate'}: {stressData.heartRate} BPM
            </p>
          </div>
        </div>
        
        {stressData.level === 'high' && (
          <Button
            onClick={handleStartBreathing}
            className="bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-full px-4 py-2 flex items-center space-x-2 hover:scale-105 transition-all duration-300"
          >
            <Wind className="w-4 h-4" />
            <span className={`text-xs font-medium ${language === 'th' ? 'thai' : ''}`}>
              {language === 'th' ? 'หายใจ' : 'Breathe'}
            </span>
          </Button>
        )}
        
        {stressData.level !== 'high' && (
          <div className={`text-xs text-mind-neutral-500 ${language === 'th' ? 'thai' : ''}`}>
            {language === 'th' ? 'สุขภาพดี' : 'Looking good'}
          </div>
        )}
      </div>
      
      {stressData.level === 'high' && (
        <div className={`mt-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400 ${language === 'th' ? 'thai' : ''}`}>
          <p className="text-sm text-orange-700">
            {language === 'th' 
              ? 'ระดับความเครียดสูง - ลองหายใจเข้าลึกๆ เพื่อผ่อนคลาย' 
              : 'High stress detected - Try some deep breathing to relax'}
          </p>
        </div>
      )}
    </Card>
  );
};

export default StressLevelCard;
