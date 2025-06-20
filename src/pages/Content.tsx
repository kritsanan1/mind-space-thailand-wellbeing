
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Brain, 
  Wind, 
  BookOpen, 
  Play, 
  Clock, 
  Star,
  Lock,
  Heart,
  Moon,
  Shield
} from "lucide-react";

const Content = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'meditation' | 'breathing' | 'articles'>('meditation');

  const meditationSessions = [
    {
      id: 'mindfulness-5',
      title: language === 'th' ? 'สติในปัจจุบัน' : 'Mindful Awareness',
      duration: 5,
      category: 'mindfulness',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      isPremium: false,
      rating: 4.8
    },
    {
      id: 'stress-relief-10',
      title: language === 'th' ? 'บรรเทาความเครียด' : 'Stress Relief',
      duration: 10,
      category: 'stress',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
      isPremium: false,
      rating: 4.9
    },
    {
      id: 'sleep-15',
      title: language === 'th' ? 'เตรียมการนอน' : 'Sleep Preparation',
      duration: 15,
      category: 'sleep',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      isPremium: true,
      rating: 4.7
    },
    {
      id: 'anxiety-relief-10',
      title: language === 'th' ? 'คลายวิตกกังวล' : 'Anxiety Relief',
      duration: 10,
      category: 'anxiety',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400',
      isPremium: true,
      rating: 4.8
    }
  ];

  const breathingExercises = [
    {
      id: 'box-breathing',
      title: language === 'th' ? 'การหายใจแบบกล่อง' : 'Box Breathing',
      duration: 5,
      description: language === 'th' ? 'เทคนิคหายใจ 4-4-4-4' : '4-4-4-4 breathing technique',
      isPremium: false
    },
    {
      id: '478-breathing',
      title: language === 'th' ? 'การหายใจ 4-7-8' : '4-7-8 Breathing',
      duration: 3,
      description: language === 'th' ? 'เพื่อการนอนหลับที่ดี' : 'For better sleep',
      isPremium: false
    },
    {
      id: 'calm-breathing',
      title: language === 'th' ? 'การหายใจเพื่อความสงบ' : 'Calming Breath',
      duration: 8,
      description: language === 'th' ? 'ลดความเครียดทันที' : 'Immediate stress relief',
      isPremium: true
    }
  ];

  const articles = [
    {
      id: 'mindfulness-daily',
      title: language === 'th' ? 'สติในชีวิตประจำวัน' : 'Mindfulness in Daily Life',
      excerpt: language === 'th' ? 'วิธีฝึกสติในกิจกรรมประจำวัน' : 'How to practice mindfulness in everyday activities',
      readTime: 5,
      category: 'mindfulness',
      isPremium: false
    },
    {
      id: 'stress-management',
      title: language === 'th' ? 'จัดการความเครียดอย่างมีประสิทธิภาพ' : 'Effective Stress Management',
      excerpt: language === 'th' ? 'เทคนิคการจัดการความเครียดแบบองค์รวม' : 'Holistic approaches to managing stress',
      readTime: 8,
      category: 'stress',
      isPremium: true
    },
    {
      id: 'sleep-hygiene',
      title: language === 'th' ? 'สุขอนามัยการนอน' : 'Sleep Hygiene Essentials',
      excerpt: language === 'th' ? 'สร้างนิสัยการนอนที่ดีเพื่อสุขภาพจิต' : 'Building healthy sleep habits for mental wellness',
      readTime: 6,
      category: 'sleep',
      isPremium: false
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stress': return <Shield className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      case 'anxiety': return <Heart className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stress': return 'bg-orange-100 text-orange-600';
      case 'sleep': return 'bg-purple-100 text-purple-600';
      case 'anxiety': return 'bg-blue-100 text-blue-600';
      default: return 'bg-mind-green-100 text-mind-green-600';
    }
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-mind-neutral-200">
        <h1 className={`text-2xl font-bold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
          {t('nav.content')}
        </h1>
        
        {/* Tabs */}
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveTab('meditation')}
            variant={activeTab === 'meditation' ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full ${activeTab === 'meditation' 
              ? 'bg-mind-green-500 text-white' 
              : 'border-mind-neutral-300 text-mind-neutral-600'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            <Brain className="w-4 h-4 mr-1" />
            {t('content.meditation')}
          </Button>
          
          <Button
            onClick={() => setActiveTab('breathing')}
            variant={activeTab === 'breathing' ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full ${activeTab === 'breathing' 
              ? 'bg-mind-green-500 text-white' 
              : 'border-mind-neutral-300 text-mind-neutral-600'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            <Wind className="w-4 h-4 mr-1" />
            {t('content.breathing')}
          </Button>
          
          <Button
            onClick={() => setActiveTab('articles')}
            variant={activeTab === 'articles' ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full ${activeTab === 'articles' 
              ? 'bg-mind-green-500 text-white' 
              : 'border-mind-neutral-300 text-mind-neutral-600'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            {t('content.articles')}
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Meditation Tab */}
        {activeTab === 'meditation' && (
          <div className="space-y-6">
            {/* Duration Filter */}
            <div className="flex space-x-2">
              <Badge variant="outline" className="border-mind-green-500 text-mind-green-500">
                {t('content.5min')}
              </Badge>
              <Badge variant="outline" className="border-mind-blue-500 text-mind-blue-500">
                {t('content.10min')}
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                {t('content.15min')}
              </Badge>
            </div>

            {/* Meditation Sessions */}
            <div className="grid gap-4">
              {meditationSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden card-shadow">
                  <div className="flex">
                    <div className="w-24 h-24 bg-cover bg-center" style={{ backgroundImage: `url(${session.image})` }}>
                      <div className="w-full h-full bg-black/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                          {session.title}
                        </h3>
                        {session.isPremium && (
                          <Lock className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-mind-neutral-500" />
                          <span className="text-xs text-mind-neutral-500">
                            {session.duration} min
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-mind-neutral-500">
                            {session.rating}
                          </span>
                        </div>
                        
                        <Badge size="sm" className={getCategoryColor(session.category)}>
                          {getCategoryIcon(session.category)}
                          <span className="ml-1 capitalize">{session.category}</span>
                        </Badge>
                      </div>
                      
                      <Button
                        onClick={() => navigate(`/meditation/${session.id}`)}
                        size="sm"
                        disabled={session.isPremium}
                        className={`${session.isPremium 
                          ? 'bg-mind-neutral-300 text-mind-neutral-500' 
                          : 'bg-mind-green-500 hover:bg-mind-green-600 text-white'
                        } rounded-full ${language === 'th' ? 'thai' : ''}`}
                      >
                        {session.isPremium ? 'Premium Only' : 'Start Session'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Breathing Tab */}
        {activeTab === 'breathing' && (
          <div className="space-y-4">
            {breathingExercises.map((exercise) => (
              <Card key={exercise.id} className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {exercise.title}
                  </h3>
                  {exercise.isPremium && (
                    <Lock className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                
                <p className={`text-mind-neutral-600 mb-4 ${language === 'th' ? 'thai' : ''}`}>
                  {exercise.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-mind-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{exercise.duration} min</span>
                  </div>
                  
                  <Button
                    onClick={() => navigate(`/meditation/${exercise.id}`)}
                    disabled={exercise.isPremium}
                    size="sm"
                    className={`${exercise.isPremium 
                      ? 'bg-mind-neutral-300 text-mind-neutral-500' 
                      : 'bg-mind-blue-500 hover:bg-mind-blue-600 text-white'
                    } rounded-full ${language === 'th' ? 'thai' : ''}`}
                  >
                    <Wind className="w-4 h-4 mr-1" />
                    {exercise.isPremium ? 'Premium' : 'Start'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="p-6 card-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {article.title}
                  </h3>
                  {article.isPremium && (
                    <Lock className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                
                <p className={`text-mind-neutral-600 mb-4 ${language === 'th' ? 'thai' : ''}`}>
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge size="sm" className={getCategoryColor(article.category)}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1 capitalize">{article.category}</span>
                    </Badge>
                    
                    <span className="text-xs text-mind-neutral-500">
                      {article.readTime} min read
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={article.isPremium}
                    className={`${article.isPremium 
                      ? 'border-mind-neutral-300 text-mind-neutral-500' 
                      : 'border-mind-green-500 text-mind-green-500 hover:bg-mind-green-50'
                    } rounded-full ${language === 'th' ? 'thai' : ''}`}
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    {article.isPremium ? 'Premium' : 'Read'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Premium Upgrade CTA */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-mind-green-500 to-mind-blue-500 text-white">
          <div className="text-center space-y-3">
            <h3 className={`text-lg font-bold ${language === 'th' ? 'thai' : ''}`}>
              {t('premium.unlock')}
            </h3>
            <p className={`text-sm opacity-90 ${language === 'th' ? 'thai' : ''}`}>
              Access all meditation sessions, breathing exercises, and premium articles
            </p>
            <Button
              onClick={() => navigate('/profile')}
              variant="secondary"
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

export default Content;
