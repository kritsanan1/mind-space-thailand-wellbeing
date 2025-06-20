
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import HomeHeader from "@/components/Home/HomeHeader";
import MoodSummary from "@/components/Home/MoodSummary";
import QuickActions from "@/components/Home/QuickActions";
import ProgressOverview from "@/components/Home/ProgressOverview";
import QuickTips from "@/components/Home/QuickTips";
import PremiumCTA from "@/components/Home/PremiumCTA";

const Home = () => {
  const navigate = useNavigate();
  const [userName] = useState('Alex');
  const [meditationStreak] = useState(7);
  const [todayMinutes] = useState(15);
  const [achievements] = useState(3);

  const handleStartMeditation = () => {
    navigate('/content');
  };

  const handleCheckMood = () => {
    navigate('/chat');
  };

  const handleUpdateMood = () => {
    navigate('/chat');
  };

  const handleUpgrade = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      <HomeHeader userName={userName} />
      
      <MoodSummary onUpdateMood={handleUpdateMood} />
      
      <QuickActions 
        onStartMeditation={handleStartMeditation}
        onCheckMood={handleCheckMood}
      />
      
      <ProgressOverview 
        todayMinutes={todayMinutes}
        meditationStreak={meditationStreak}
        achievements={achievements}
      />
      
      <QuickTips />
      
      <PremiumCTA onUpgrade={handleUpgrade} />

      <BottomNavigation />
    </div>
  );
};

export default Home;
