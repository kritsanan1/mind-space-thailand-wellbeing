
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface PremiumCTAProps {
  onUpgrade: () => void;
}

const PremiumCTA = ({ onUpgrade }: PremiumCTAProps) => {
  const { t, language } = useLanguage();

  return (
    <Card className="p-6 bg-gradient-to-r from-mind-green-500 to-mind-blue-500 text-white mx-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-lg font-bold mb-1 ${language === 'th' ? 'thai' : ''}`}>
            {t('premium.unlock')}
          </h3>
          <p className={`text-sm opacity-90 ${language === 'th' ? 'thai' : ''}`}>
            {t('premium.benefits') || 'Unlimited AI chats & exclusive content'}
          </p>
        </div>
        <Button
          onClick={onUpgrade}
          variant="secondary"
          size="sm"
          className={`bg-white text-mind-green-600 hover:bg-gray-100 font-semibold px-4 py-2 ${language === 'th' ? 'thai' : ''}`}
        >
          {t('premium.upgrade')}
        </Button>
      </div>
    </Card>
  );
};

export default PremiumCTA;
