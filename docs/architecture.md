
# System Architecture - MindfulThai App

## 📋 Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagrams](#architecture-diagrams)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Integration Points](#integration-points)
- [Security Architecture](#security-architecture)

## 🏗️ System Overview

MindfulThai is a progressive web application built for mental health and wellness, featuring smartwatch integration for real-time health monitoring. The architecture follows modern React patterns with TypeScript, emphasizing component reusability and maintainable code structure.

### Technology Stack
- **Frontend:** React 18, TypeScript, Vite
- **UI Framework:** Tailwind CSS, Shadcn/UI
- **State Management:** React Context, TanStack Query
- **Routing:** React Router DOM
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions)
- **Health Integration:** HealthKit (iOS), Samsung Health, Fitbit APIs

## 📊 Architecture Diagrams

### System Overview
```mermaid
graph TB
    subgraph "Client Layer"
        PWA[PWA - MindfulThai App]
        SW[Service Worker]
    end
    
    subgraph "Smartwatch Layer"
        AW[Apple Watch]
        GW[Galaxy Watch]
        FB[Fitbit]
    end
    
    subgraph "Backend Services"
        SB[Supabase Backend]
        AUTH[Authentication Service]
        DB[(PostgreSQL Database)]
        EDGE[Edge Functions]
    end
    
    subgraph "External APIs"
        HK[HealthKit API]
        SH[Samsung Health API]
        FBA[Fitbit API]
    end
    
    PWA --> SW
    PWA --> SB
    PWA --> HK
    PWA --> SH
    PWA --> FBA
    
    AW --> HK
    GW --> SH
    FB --> FBA
    
    SB --> AUTH
    SB --> DB
    SB --> EDGE
    
    HK --> EDGE
    SH --> EDGE
    FBA --> EDGE
```

### Component Architecture
```mermaid
graph TD
    subgraph "App Shell"
        APP[App.tsx]
        ROUTER[React Router]
        PROVIDERS[Context Providers]
    end
    
    subgraph "Pages"
        HOME[Home Page]
        PROFILE[Profile Page]
        CONTENT[Content Page]
        CHAT[AI Chat Page]
    end
    
    subgraph "Shared Components"
        NAV[Bottom Navigation]
        UI[UI Components]
        LANG[Language Context]
    end
    
    subgraph "Feature Components"
        STRESS[Stress Level Card]
        DEVICE[Device Settings]
        SLEEP[Sleep Summary]
        MOOD[Mood Tracking]
    end
    
    subgraph "Hooks & Services"
        WATCH[useSmartwatch]
        TOAST[useToast]
        QUERY[React Query]
    end
    
    APP --> ROUTER
    APP --> PROVIDERS
    ROUTER --> HOME
    ROUTER --> PROFILE
    ROUTER --> CONTENT
    ROUTER --> CHAT
    
    HOME --> STRESS
    HOME --> MOOD
    PROFILE --> DEVICE
    PROFILE --> SLEEP
    
    STRESS --> WATCH
    DEVICE --> WATCH
    SLEEP --> WATCH
    
    PROVIDERS --> LANG
    PROVIDERS --> QUERY
```

### Data Flow Architecture
```mermaid
sequenceDiagram
    participant U as User
    participant APP as React App
    participant SW as Smartwatch
    participant API as Health APIs
    participant SB as Supabase
    participant DB as Database
    
    U->>APP: Open App
    APP->>SB: Authenticate User
    SB->>DB: Fetch User Profile
    DB-->>APP: User Data
    
    U->>APP: Connect Smartwatch
    APP->>API: Request Device Pairing
    API->>SW: Establish Connection
    SW-->>API: Connection Success
    API-->>APP: Device Connected
    
    SW->>API: Stream Health Data
    API->>APP: Real-time HR/Sleep Data
    APP->>APP: Process & Analyze Data
    APP->>U: Display Insights
    
    APP->>SB: Store Health Insights
    SB->>DB: Persist Data
    
    APP->>SW: Send Wellness Notifications
    SW->>U: Display Notifications
```

### Database ERD
```mermaid
erDiagram
    users {
        uuid id PK
        string email
        string name
        timestamp created_at
        boolean is_premium
        jsonb preferences
    }
    
    user_profiles {
        uuid id PK
        uuid user_id FK
        int meditation_minutes
        int mood_streak
        int achievements_count
        int level
        timestamp updated_at
    }
    
    connected_devices {
        uuid id PK
        uuid user_id FK
        string device_type
        string device_name
        boolean is_connected
        timestamp last_sync
        int battery_level
        jsonb device_metadata
    }
    
    health_data {
        uuid id PK
        uuid user_id FK
        uuid device_id FK
        string data_type
        jsonb data_payload
        timestamp recorded_at
        timestamp synced_at
    }
    
    achievements {
        uuid id PK
        uuid user_id FK
        string achievement_type
        string title
        string description
        boolean earned
        int progress_percentage
        timestamp earned_at
    }
    
    meditation_sessions {
        uuid id PK
        uuid user_id FK
        string session_type
        int duration_minutes
        timestamp started_at
        timestamp completed_at
        jsonb session_metadata
    }
    
    users ||--|| user_profiles : has
    users ||--o{ connected_devices : owns
    users ||--o{ health_data : generates
    users ||--o{ achievements : earns
    users ||--o{ meditation_sessions : completes
    connected_devices ||--o{ health_data : produces
```

## 🧩 Component Architecture

### Core Application Components

#### **App.tsx** - Application Root
The main application component that sets up routing, context providers, and global configuration. It manages the application's initialization state and handles the onboarding flow.

**Key Responsibilities:**
- Route configuration and navigation
- Context provider setup (Language, Query Client)
- Global state initialization
- Onboarding flow management
- Error boundary implementation

**Dependencies:** React Router, TanStack Query, Language Context

#### **LanguageContext.tsx** - Internationalization
Provides comprehensive i18n support for Thai and English languages throughout the application. Manages language preferences, text translations, and cultural formatting.

**Key Features:**
- Dynamic language switching
- Persistent language preferences
- Cultural-aware date/time formatting
- Right-to-left text support for Thai
- Translation key management

#### **useSmartwatch.ts** - Health Integration Hook
Central hook for managing smartwatch connections, health data processing, and real-time monitoring. Provides a unified interface for multiple device types.

**Core Functionality:**
- Device discovery and pairing
- Real-time heart rate monitoring
- Sleep pattern analysis
- Stress level calculation
- Notification management
- Data privacy compliance

### Feature-Specific Components

#### **StressLevelCard.tsx** - Wellness Monitoring
Real-time stress level display based on heart rate variability from connected smartwatches. Provides immediate wellness recommendations and breathing exercise suggestions.

**Intelligence Features:**
- Heart rate variability analysis
- Stress pattern recognition
- Contextual wellness recommendations
- Emergency stress alert system
- Integration with meditation content

#### **DeviceSettings.tsx** - Device Management
Comprehensive smartwatch connection interface supporting Apple Watch, Galaxy Watch, and Fitbit devices. Manages permissions, sync status, and device health.

**Management Features:**
- Multi-device support
- Permission granularity
- Sync status monitoring
- Battery level tracking
- Privacy compliance interface

#### **SleepSummaryCard.tsx** - Sleep Analytics
Advanced sleep tracking with detailed analysis of sleep stages, quality metrics, and personalized recommendations for better rest.

**Analytics Capabilities:**
- Sleep stage breakdown (Deep, Light, REM)
- Sleep quality scoring
- Historical trend analysis
- Bedtime routine suggestions
- Integration with meditation content

## 🔄 Data Flow

### Health Data Pipeline
1. **Collection:** Smartwatch sensors capture biometric data
2. **Transmission:** Health APIs stream data to the application
3. **Processing:** Real-time analysis and pattern recognition
4. **Storage:** Encrypted data persistence in Supabase
5. **Insights:** AI-powered wellness recommendations
6. **Action:** Contextual notifications and content suggestions

### User Interaction Flow
1. **Authentication:** Secure login via Supabase Auth
2. **Onboarding:** Device setup and preference configuration
3. **Monitoring:** Continuous health data collection
4. **Analysis:** Real-time processing and insight generation
5. **Recommendations:** Personalized wellness suggestions
6. **Engagement:** Meditation, breathing exercises, content consumption

## 🔌 Integration Points

### External Service Integration

#### **Supabase Backend Services**
- **Authentication:** JWT-based user management
- **Database:** PostgreSQL with real-time subscriptions
- **Edge Functions:** Serverless health data processing
- **Storage:** Encrypted health data persistence

#### **Health Platform APIs**
- **Apple HealthKit:** iOS health data integration
- **Samsung Health:** Android health platform
- **Fitbit Web API:** Fitbit device data access
- **Google Fit:** Additional Android health data

#### **AI and Analytics**
- **Real-time Processing:** Stream processing for health metrics
- **Pattern Recognition:** ML-based wellness insights
- **Recommendation Engine:** Personalized content suggestions

## 🔒 Security Architecture

### Data Protection
- **Encryption:** AES-256 encryption for health data at rest
- **Transmission:** TLS 1.3 for all API communications
- **Authentication:** JWT tokens with refresh mechanism
- **Authorization:** Role-based access control (RBAC)

### Privacy Compliance
- **PDPA Compliance:** Thai Personal Data Protection Act
- **GDPR Compliance:** European privacy regulations
- **Data Minimization:** Collect only necessary health metrics
- **User Consent:** Granular permission management
- **Data Retention:** Configurable data lifecycle policies

### Security Measures
- **Input Validation:** Comprehensive sanitization
- **Rate Limiting:** API abuse prevention
- **Audit Logging:** Security event tracking
- **Incident Response:** Automated threat detection

---

**Architecture Version:** 2.1  
**Last Updated:** 2025-01-21  
**Next Review:** 2025-04-21  
**Architecture Owner:** Lead Technical Architect
