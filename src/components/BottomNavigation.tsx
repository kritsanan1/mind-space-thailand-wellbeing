
import { Home, MessageCircle, BookOpen, UserRound, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: t('nav.home'), 
      path: '/home' 
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      label: t('nav.chat'), 
      path: '/chat' 
    },
    { 
      id: 'content', 
      icon: BookOpen, 
      label: t('nav.content'), 
      path: '/content' 
    },
    { 
      id: 'therapist', 
      icon: UserRound, 
      label: t('nav.therapist'), 
      path: '/therapist' 
    },
    { 
      id: 'profile', 
      icon: User, 
      label: t('nav.profile'), 
      path: '/profile' 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-mind-neutral-200 px-2 py-2 max-w-sm mx-auto">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'bg-mind-green-100 text-mind-green-600' 
                  : 'text-mind-neutral-500 hover:bg-mind-neutral-100'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'animate-scale-in' : ''}`} />
              <span className={`text-xs font-medium ${language === 'th' ? 'thai' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
