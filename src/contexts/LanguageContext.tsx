
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.chat': 'AI Chat',
    'nav.content': 'Content',
    'nav.therapist': 'Therapist',
    'nav.profile': 'Profile',
    
    // Home
    'home.welcome': 'Welcome back',
    'home.mood_summary': 'Today\'s Mood',
    'home.start_meditation': 'Start Meditation',
    'home.check_mood': 'Check Your Mood',
    'home.quick_tips': 'Quick Tips for Wellbeing',
    'home.tip_breathing': 'Take 3 deep breaths when feeling stressed',
    'home.tip_nature': 'Spend 10 minutes in nature daily',
    'home.tip_gratitude': 'Practice gratitude by listing 3 things you\'re thankful for',
    
    // AI Chat
    'chat.title': 'AI Mood Support',
    'chat.placeholder': 'How are you feeling today?',
    'chat.save_mood': 'Save Mood',
    'chat.feeling_stressed': 'You seem stressed. Would you like to try a 5-minute breathing exercise?',
    'chat.try_breathing': 'Try Breathing Exercise',
    
    // Content
    'content.meditation': 'Guided Meditation',
    'content.breathing': 'Breathing Exercises',
    'content.articles': 'Mental Health Articles',
    'content.5min': '5 Minutes',
    'content.10min': '10 Minutes',
    'content.15min': '15 Minutes',
    'content.sleep': 'Sleep',
    'content.stress': 'Stress Relief',
    'content.anxiety': 'Anxiety',
    
    // Therapist
    'therapist.title': 'Find a Therapist',
    'therapist.filter': 'Filter by',
    'therapist.price': 'Price Range',
    'therapist.expertise': 'Expertise',
    'therapist.book': 'Book Session',
    'therapist.rate': 'per hour',
    
    // Profile
    'profile.title': 'Your Profile',
    'profile.progress': 'Your Progress',
    'profile.meditation_minutes': 'Meditation Minutes',
    'profile.mood_streak': 'Mood Tracking Streak',
    'profile.achievements': 'Achievements',
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.upgrade': 'Upgrade to Premium',
    
    // Onboarding
    'onboarding.welcome': 'Welcome to MindSpace',
    'onboarding.subtitle': 'Your journey to mental wellness starts here',
    'onboarding.privacy_title': 'Your Privacy Matters',
    'onboarding.privacy_text': 'We protect your data according to PDPA and GDPR standards. Your conversations are encrypted and never shared.',
    'onboarding.get_started': 'Get Started',
    'onboarding.accept_privacy': 'I accept the privacy policy',
    
    // General
    'button.continue': 'Continue',
    'button.back': 'Back',
    'button.save': 'Save',
    'button.cancel': 'Cancel',
    'premium.unlock': 'Unlock Premium Content',
    'premium.upgrade': 'Upgrade Now'
  },
  th: {
    // Navigation
    'nav.home': 'หน้าแรก',
    'nav.chat': 'แชท AI',
    'nav.content': 'เนื้อหา',
    'nav.therapist': 'นักจิตวิทยา',
    'nav.profile': 'โปรไฟล์',
    
    // Home
    'home.welcome': 'ยินดีต้อนรับกลับมา',
    'home.mood_summary': 'อารมณ์วันนี้',
    'home.start_meditation': 'เริ่มการทำสมาธิ',
    'home.check_mood': 'ตรวจสอบอารมณ์',
    'home.quick_tips': 'เคล็ดลับเพื่อสุขภาพจิต',
    'home.tip_breathing': 'หายใจลึกๆ 3 ครั้งเมื่อรู้สึกเครียด',
    'home.tip_nature': 'ใช้เวลา 10 นาทีในธรรมชาติทุกวัน',
    'home.tip_gratitude': 'ฝึกความกตัญญูโดยนึกถึง 3 สิ่งที่รู้สึกขอบคุณ',
    
    // AI Chat
    'chat.title': 'AI ช่วยเหลือจิตใจ',
    'chat.placeholder': 'วันนี้คุณรู้สึกอย่างไร?',
    'chat.save_mood': 'บันทึกอารมณ์',
    'chat.feeling_stressed': 'คุณดูเครียด อยากลองออกกำลังกายหายใจ 5 นาทีไหม?',
    'chat.try_breathing': 'ลองออกกำลังกายหายใจ',
    
    // Content
    'content.meditation': 'การทำสมาธิแบบมีคำแนะนำ',
    'content.breathing': 'การออกกำลังกายหายใจ',
    'content.articles': 'บทความสุขภาพจิต',
    'content.5min': '5 นาที',
    'content.10min': '10 นาที',
    'content.15min': '15 นาที',
    'content.sleep': 'การนอนหลับ',
    'content.stress': 'บรรเทาความเครียด',
    'content.anxiety': 'ความวิตกกังวล',
    
    // Therapist
    'therapist.title': 'ค้นหานักจิตวิทยา',
    'therapist.filter': 'กรองตาม',
    'therapist.price': 'ช่วงราคา',
    'therapist.expertise': 'ความเชี่ยวชาญ',
    'therapist.book': 'จองเซสชัน',
    'therapist.rate': 'ต่อชั่วโมง',
    
    // Profile
    'profile.title': 'โปรไฟล์ของคุณ',
    'profile.progress': 'ความก้าวหน้า',
    'profile.meditation_minutes': 'นาทีการทำสมาธิ',
    'profile.mood_streak': 'ติดตามอารมณ์ต่อเนื่อง',
    'profile.achievements': 'ความสำเร็จ',
    'profile.settings': 'การตั้งค่า',
    'profile.language': 'ภาษา',
    'profile.notifications': 'การแจ้งเตือน',
    'profile.upgrade': 'อัพเกรดเป็นพรีเมียม',
    
    // Onboarding
    'onboarding.welcome': 'ยินดีต้อนรับสู่ MindSpace',
    'onboarding.subtitle': 'การเดินทางสู่สุขภาพจิตที่ดีเริ่มต้นที่นี่',
    'onboarding.privacy_title': 'ความเป็นส่วนตัวของคุณสำคัญ',
    'onboarding.privacy_text': 'เราปกป้องข้อมูลของคุณตามมาตรฐาน PDPA และ GDPR การสนทนาของคุณถูกเข้ารหัสและไม่เอาไปแชร์',
    'onboarding.get_started': 'เริ่มต้น',
    'onboarding.accept_privacy': 'ฉันยอมรับนโยบายความเป็นส่วนตัว',
    
    // General
    'button.continue': 'ดำเนินการต่อ',
    'button.back': 'กลับ',
    'button.save': 'บันทึก',
    'button.cancel': 'ยกเลิก',
    'premium.unlock': 'ปลดล็อกเนื้อหาพรีเมียม',
    'premium.upgrade': 'อัพเกรดตอนนี้'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
