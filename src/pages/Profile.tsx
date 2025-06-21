
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import DeviceSettings from "@/components/Profile/DeviceSettings";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import ProfileSettings from "@/components/Profile/ProfileSettings";

const Profile = () => {
  const { language } = useLanguage();
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

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <ProfileHeader userStats={userStats} isPremium={isPremium} />

      {/* Tab Navigation */}
      <div className="p-6 pb-0">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="p-6 pt-6">
        {activeTab === 'overview' && (
          <ProfileOverview userStats={userStats} achievements={achievements} />
        )}

        {activeTab === 'devices' && (
          <DeviceSettings />
        )}

        {activeTab === 'settings' && (
          <ProfileSettings 
            isPremium={isPremium}
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
          />
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
