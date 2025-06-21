
import { Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileTabsProps {
  activeTab: 'overview' | 'devices' | 'settings';
  setActiveTab: (tab: 'overview' | 'devices' | 'settings') => void;
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex space-x-1 bg-mind-neutral-100 p-1 rounded-lg">
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
  );
};

export default ProfileTabs;
