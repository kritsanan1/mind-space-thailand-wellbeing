
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Crown, 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { toast } from "sonner";

interface ProfileSettingsProps {
  isPremium: boolean;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const ProfileSettings = ({ 
  isPremium, 
  notificationsEnabled, 
  setNotificationsEnabled 
}: ProfileSettingsProps) => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'th');
    toast.success(language === 'th' ? 'เปลี่ยนภาษาแล้ว' : 'Language changed successfully');
  };

  const handleUpgradeToPremium = () => {
    toast.info(language === 'th' ? 'เปิดหน้าการชำระเงิน...' : 'Opening payment page...');
  };

  return (
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
  );
};

export default ProfileSettings;
