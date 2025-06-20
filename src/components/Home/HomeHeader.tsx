
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const { t, language } = useLanguage();

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white p-6 rounded-b-3xl card-shadow mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className={`text-2xl font-bold text-mind-neutral-800 mb-1 ${language === 'th' ? 'thai' : ''}`}>
            {t('home.welcome')}, {userName}! 👋
          </h1>
          <p className={`text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
            {t('home.how_feeling') || 'How are you feeling today?'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-mind-neutral-500">
            {getCurrentDate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
