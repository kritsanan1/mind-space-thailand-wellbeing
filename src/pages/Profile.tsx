import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import DeviceSettings from "@/components/Profile/DeviceSettings";
import SleepSummaryCard from "@/components/Profile/SleepSummaryCard";
import { 
  User, 
  Settings, 
  Trophy, 
  Crown, 
  Bell, 
  Globe, 
  Shield,
  HelpCircle,
  LogOut,
  TrendingUp,
  Clock,
  Heart,
  Award,
  Zap,
  Smartphone
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { t, language, setLanguage } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPremium] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'settings'>('overview');
  
  // Mock user data
  const userStats = {
    name: 'Alex Chen',
    email: 'alex@example.com',
    memberSince: '2024-01-01',
    meditationMinutes: 245,
    moodStreak: 7,
    achievements: 8,
    level: 3
  };

  const achievements = [
    {
      id: '1',
      title: language === 'th' ? 'นักสมาธิใหม่' : 'Meditation Novice',
      description: language === 'th' ? 'ทำสมาธิครั้งแรก' : 'Complete your first meditation',
      icon: '🧘',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: language === 'th' ? 'ติดตามอารมณ์ 7 วัน' : '7-Day Mood Tracker',
      description: language === 'th' ? 'บันทึกอารมณ์ต่อเนื่อง 7 วัน' : 'Track mood for 7 consecutive days',
      icon: '📊',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: '3',
      title: language === 'th' ? 'นักสมาธิมือโปร' : 'Meditation Master',
      description: language === 'th' ? 'ทำสมาธิ 100 นาที' : 'Complete 100 minutes of meditation',
      icon: '⭐',
      earned: false,
      progress: 68
    }
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'th');
    toast.success(language === 'th' ? 'เปลี่ยนภาษาแล้ว' : 'Language changed successfully');
  };

  const handleUpgradeToPremium = () => {
    toast.info(language === 'th' ? 'เปิดหน้าการชำระเงิน...' : 'Opening payment page...');
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-mind-neutral-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-mind-green-400 to-mind-blue-400 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className={`text-xl font-bold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
              {userStats.name}
            </h1>
            <p className="text-mind-neutral-600 text-sm">{userStats.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="px-2 py-1 bg-mind-green-100 rounded-full">
                <span className="text-xs text-mind-green-600 font-medium">Level {userStats.level}</span>
              </div>
              {isPremium && (
                <Crown className="w-4 h-4 text-orange-500" />
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-6 bg-mind-neutral-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-mind-green-600 shadow-sm'
                : 'text-mind-neutral-600 hover:text-mind-neutral-800'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            {language === 'th' ? 'ภาพรวม' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'devices'
                ? 'bg-white text-mind-green-600 shadow-sm'
                : 'text-mind-neutral-600 hover:text-mind-neutral-800'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            <div className="flex items-center justify-center space-x-1">
              <Smartphone className="w-4 h-4" />
              <span>{language === 'th' ? 'อุปกรณ์' : 'Devices'}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-white text-mind-green-600 shadow-sm'
                : 'text-mind-neutral-600 hover:text-mind-neutral-800'
            } ${language === 'th' ? 'thai' : ''}`}
          >
            {language === 'th' ? 'ตั้งค่า' : 'Settings'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
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
                    {achievement.earned && (
                      <div className="text-xs text-mind-green-600">
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeTab === 'devices' && (
          <DeviceSettings />
        )}

        {activeTab === 'settings' && (
          <>
            {/* Premium Upgrade */}
            {!isPremium && (
              <Card className="p-6 bg-gradient-to-r from-mind-green-500 to-mind-blue-500 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="w-5 h-5" />
                      <h3 className={`text-lg font-bold ${language === 'th' ? 'thai' : ''}`}>
                        {t('profile.upgrade')}
                      </h3>
                    </div>
                    <p className={`text-sm opacity-90 ${language === 'th' ? 'thai' : ''}`}>
                      Unlimited AI chats, premium content & more
                    </p>
                  </div>
                  <Button
                    onClick={handleUpgradeToPremium}
                    variant="secondary"
                    className={`bg-white text-mind-green-600 hover:bg-gray-100 ${language === 'th' ? 'thai' : ''}`}
                  >
                    Upgrade
                  </Button>
                </div>
              </Card>
            )}

            {/* Settings */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-mind-neutral-600" />
                <h2 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                  {t('profile.settings')}
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-mind-neutral-500" />
                    <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                      {t('profile.language')}
                    </span>
                  </div>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 EN</SelectItem>
                      <SelectItem value="th">🇹🇭 TH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-mind-neutral-500" />
                    <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                      {t('profile.notifications')}
                    </span>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-mind-neutral-500" />
                    <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                      Privacy Settings
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-mind-neutral-500">
                    →
                  </Button>
                </div>

                {/* Help */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-mind-neutral-500" />
                    <span className={`text-mind-neutral-700 ${language === 'th' ? 'thai' : ''}`}>
                      Help & Support
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-mind-neutral-500">
                    →
                  </Button>
                </div>

                {/* Logout */}
                <div className="flex items-center justify-between pt-4 border-t border-mind-neutral-200">
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className={`text-red-500 ${language === 'th' ? 'thai' : ''}`}>
                      Sign Out
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    →
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
