
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Content from "./pages/Content";
import Therapist from "./pages/Therapist";
import Profile from "./pages/Profile";
import Meditation from "./pages/Meditation";
import TherapistBooking from "./pages/TherapistBooking";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import MetaTags from "./components/SEO/MetaTags";
import StructuredData from "./components/SEO/StructuredData";
import { trackPageView, trackWebVitals } from "./utils/analytics";

const queryClient = new QueryClient();

// Component to handle SEO for each route
const SEOWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const getPageSEO = (pathname: string) => {
    switch (pathname) {
      case '/':
        return {
          title: 'AI Mental Health & Meditation App',
          description: 'Start your mental wellness journey with AI-powered mood analysis, guided meditation, and professional therapist support in Thailand.',
          keywords: 'mental health thailand, meditation app, ai therapy, mood tracking',
          type: 'MobileApplication'
        };
      case '/home':
        return {
          title: 'Dashboard - Your Wellness Journey',
          description: 'Track your mood, monitor stress levels, and access personalized meditation recommendations on your wellness dashboard.',
          keywords: 'wellness dashboard, mood tracking, stress monitoring, meditation tracker',
          type: 'WebPage'
        };
      case '/chat':
        return {
          title: 'AI Chat - Mental Health Support',
          description: 'Get instant mental health support with our AI-powered chat assistant. Available 24/7 in Thai and English.',
          keywords: 'ai mental health chat, therapy chatbot, mental health support thailand',
          type: 'WebPage'
        };
      case '/content':
        return {
          title: 'Meditation Library - Guided Sessions',
          description: 'Explore our comprehensive library of guided meditation sessions, breathing exercises, and mindfulness practices.',
          keywords: 'guided meditation, breathing exercises, mindfulness, meditation library thailand',
          type: 'WebPage'
        };
      case '/therapist':
        return {
          title: 'Licensed Therapists - Professional Support',
          description: 'Connect with licensed mental health professionals in Thailand. Book consultations and get professional therapy support.',
          keywords: 'therapist thailand, mental health professional, therapy booking, counseling thailand',
          type: 'WebPage'
        };
      case '/profile':
        return {
          title: 'Profile & Settings - Personalize Your Experience',
          description: 'Manage your wellness profile, connect smartwatch devices, and customize your mental health app experience.',
          keywords: 'wellness profile, smartwatch integration, app settings, health data',
          type: 'WebPage'
        };
      default:
        return {
          title: 'Page',
          description: 'AI-powered mental health app for young adults in Thailand.',
          keywords: 'mental health, meditation, thailand',
          type: 'WebPage'
        };
    }
  };

  const seoData = getPageSEO(location.pathname);

  return (
    <>
      <MetaTags {...seoData} />
      <StructuredData 
        type={seoData.type as any}
        title={seoData.title}
        description={seoData.description}
      />
    </>
  );
};

const App = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    setHasCompletedOnboarding(completed === 'true');
    
    // Initialize web vitals tracking
    trackWebVitals();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SEOWrapper />
            <div className="mobile-container">
              <Routes>
                <Route path="/" element={hasCompletedOnboarding ? <Home /> : <Index />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/content" element={<Content />} />
                <Route path="/meditation/:type" element={<Meditation />} />
                <Route path="/therapist" element={<Therapist />} />
                <Route path="/therapist/:id/book" element={<TherapistBooking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
