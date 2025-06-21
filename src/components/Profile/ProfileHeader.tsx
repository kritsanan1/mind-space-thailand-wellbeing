
import { User, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileHeaderProps {
  userStats: {
    name: string;
    email: string;
    level: number;
  };
  isPremium: boolean;
}

const ProfileHeader = ({ userStats, isPremium }: ProfileHeaderProps) => {
  const { language } = useLanguage();

  return (
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
    </div>
  );
};

export default ProfileHeader;
