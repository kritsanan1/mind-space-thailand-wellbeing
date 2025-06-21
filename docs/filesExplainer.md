
# Project Structure Analysis - MindfulThai App

## 📋 Table of Contents
- [Directory Overview](#directory-overview)
- [File Analysis](#file-analysis)
- [Usage Indicators](#usage-indicators)
- [Dependencies Map](#dependencies-map)

## 📁 Directory Overview

```
MindfulThai/
├── 📁 docs/                          # Project documentation suite
├── 📁 public/                        # Static assets and public files
│   ├── 📄 favicon.ico                 # App favicon - 🔴 Supporting
│   ├── 📄 placeholder.svg             # Placeholder images - 🔴 Supporting
│   └── 📄 robots.txt                  # SEO configuration - 🔴 Supporting
├── 📁 src/                           # Main application source code
│   ├── 📁 components/                 # Reusable UI components
│   │   ├── 📁 Home/                   # Home page specific components
│   │   │   ├── 📄 HomeHeader.tsx      # Welcome header component - 🟡 Important
│   │   │   ├── 📄 MoodSummary.tsx     # Daily mood tracking display - 🟡 Important
│   │   │   ├── 📄 PremiumCTA.tsx      # Premium upgrade call-to-action - 🟡 Important
│   │   │   ├── 📄 ProgressOverview.tsx # User progress statistics - 🟡 Important
│   │   │   ├── 📄 QuickActions.tsx    # Quick meditation/mood buttons - 🟡 Important
│   │   │   ├── 📄 QuickTips.tsx       # Daily wellness tips - 🟡 Important
│   │   │   └── 📄 StressLevelCard.tsx # Smartwatch stress monitoring - 🟢 Critical
│   │   ├── 📁 Profile/                # Profile page components
│   │   │   ├── 📄 DeviceSettings.tsx  # Smartwatch connection management - 🟢 Critical
│   │   │   ├── 📄 ProfileHeader.tsx   # User profile header - 🟡 Important
│   │   │   ├── 📄 ProfileOverview.tsx # Stats and achievements - 🟡 Important
│   │   │   ├── 📄 ProfileSettings.tsx # App settings and preferences - 🟡 Important
│   │   │   ├── 📄 ProfileTabs.tsx     # Tab navigation component - 🟡 Important
│   │   │   └── 📄 SleepSummaryCard.tsx # Sleep tracking display - 🟢 Critical
│   │   ├── 📁 ui/                     # Shadcn UI component library
│   │   │   ├── 📄 button.tsx          # Button component - 🟢 Critical
│   │   │   ├── 📄 card.tsx            # Card layout component - 🟢 Critical
│   │   │   ├── 📄 switch.tsx          # Toggle switch component - 🟡 Important
│   │   │   └── 📄 [30+ other components] # Complete UI kit - Various usage levels
│   │   └── 📄 BottomNavigation.tsx    # Main app navigation - 🟢 Critical
│   ├── 📁 contexts/                   # React context providers
│   │   └── 📄 LanguageContext.tsx     # Internationalization context - 🟢 Critical
│   ├── 📁 hooks/                      # Custom React hooks
│   │   ├── 📄 use-mobile.tsx          # Mobile device detection - 🟡 Important
│   │   ├── 📄 use-toast.ts            # Toast notification hook - 🟡 Important
│   │   └── 📄 useSmartwatch.ts        # Smartwatch integration hook - 🟢 Critical
│   ├── 📁 integrations/               # External service integrations
│   │   └── 📁 supabase/               # Supabase backend integration
│   │       ├── 📄 client.ts           # Supabase client configuration - 🟡 Important
│   │       └── 📄 types.ts            # Database type definitions - 🟡 Important
│   ├── 📁 lib/                        # Utility libraries
│   │   └── 📄 utils.ts                # Common utility functions - 🟢 Critical
│   ├── 📁 pages/                      # Application pages/routes
│   │   ├── 📄 AIChat.tsx              # AI-powered chat interface - 🟡 Important
│   │   ├── 📄 Content.tsx             # Meditation content library - 🟡 Important
│   │   ├── 📄 Home.tsx                # Main dashboard page - 🟢 Critical
│   │   ├── 📄 Index.tsx               # Landing/welcome page - 🟡 Important
│   │   ├── 📄 Meditation.tsx          # Meditation session player - 🟡 Important
│   │   ├── 📄 NotFound.tsx            # 404 error page - 🔴 Supporting
│   │   ├── 📄 Onboarding.tsx          # User onboarding flow - 🟡 Important
│   │   ├── 📄 Profile.tsx             # User profile management - 🟢 Critical
│   │   ├── 📄 Therapist.tsx           # Therapist directory - 🟡 Important
│   │   └── 📄 TherapistBooking.tsx    # Appointment booking - 🟡 Important
│   ├── 📄 App.tsx                     # Main application component - 🟢 Critical
│   ├── 📄 index.css                   # Global styles and Tailwind - 🟢 Critical
│   ├── 📄 main.tsx                    # Application entry point - 🟢 Critical
│   └── 📄 vite-env.d.ts              # Vite environment types - 🔴 Supporting
├── 📄 README.md                       # Project overview and setup - 🟡 Important
├── 📄 package.json                    # Dependencies and scripts - 🟢 Critical
├── 📄 tailwind.config.ts              # Tailwind CSS configuration - 🟡 Important
├── 📄 tsconfig.json                   # TypeScript configuration - 🟡 Important
└── 📄 vite.config.ts                  # Vite build configuration - 🟡 Important
```

## 🎯 Usage Indicators

### 🟢 Critical Components (10+ imports)
- **App.tsx** - Main application router and provider setup
- **BottomNavigation.tsx** - Used across all main pages
- **LanguageContext.tsx** - Internationalization for entire app
- **useSmartwatch.ts** - Core smartwatch functionality
- **StressLevelCard.tsx** - Key wellness feature
- **DeviceSettings.tsx** - Primary smartwatch interface
- **utils.ts** - Utility functions used throughout
- **UI Components** - Button, Card, and other core UI elements

### 🟡 Important Components (3-9 imports)
- **Profile Components** - User management and settings
- **Home Components** - Dashboard and quick actions
- **Page Components** - Main application routes
- **Configuration Files** - Build and type definitions

### 🔴 Supporting Components (0-2 imports)
- **Static Assets** - Images, icons, SEO files
- **Error Pages** - 404 and fallback components
- **Type Definitions** - Environment and build types

## 🔗 Dependencies Map

### Core Dependencies
```
App.tsx
├── LanguageProvider (contexts/)
├── QueryClientProvider (@tanstack/react-query)
├── BrowserRouter (react-router-dom)
└── TooltipProvider (ui/tooltip)

Home.tsx
├── BottomNavigation
├── HomeHeader
├── StressLevelCard
├── QuickActions
├── MoodSummary
└── ProgressOverview

Profile.tsx
├── ProfileHeader
├── ProfileTabs
├── ProfileOverview (includes SleepSummaryCard)
├── DeviceSettings
└── ProfileSettings
```

### Smartwatch Integration Flow
```
useSmartwatch.ts
├── Device Connection Logic
├── Heart Rate Data Processing
├── Sleep Data Analysis
└── Notification System

StressLevelCard.tsx
├── useSmartwatch hook
├── Real-time HR monitoring
└── Stress level calculation

DeviceSettings.tsx
├── Device pairing interface
├── Permission management
└── Data sync status
```

---

**Last Updated:** 2025-01-21  
**Code Ownership:** Full-stack development team  
**Import Analysis:** Based on static code analysis of component dependencies
