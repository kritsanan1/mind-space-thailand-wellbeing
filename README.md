
# 🧘 MindfulThai - Mental Health & Wellness App

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://lovable.dev/projects/099e7962-e126-4101-a8cb-ecf40c557808)
[![Version](https://img.shields.io/badge/version-2.1.0-blue)](https://github.com/mindful-thai/app)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PDPA Compliant](https://img.shields.io/badge/PDPA-compliant-success)](docs/privacy.md)
[![Smartwatch Ready](https://img.shields.io/badge/smartwatch-integrated-purple)](docs/devices.md)

> A comprehensive mental health and wellness application with smartwatch integration, designed specifically for Thai users with full bilingual support (Thai/English).

## 📋 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

## ✨ Features

### 🏠 **Core Wellness Features**
- **AI-Powered Chat Support** - 24/7 mental health assistance with Thai cultural context
- **Guided Meditation Library** - Curated meditation sessions for stress, sleep, and mindfulness
- **Mood Tracking** - Daily emotional wellness monitoring with insights
- **Professional Therapist Directory** - Connect with licensed Thai mental health professionals
- **Progress Analytics** - Comprehensive wellness journey tracking

### ⌚ **Smartwatch Integration**
- **Real-Time Stress Monitoring** - Heart rate variability analysis with instant alerts
- **Sleep Quality Tracking** - Comprehensive sleep stage analysis and recommendations
- **Smart Notifications** - Contextual wellness reminders on your wrist
- **Multi-Device Support** - Apple Watch, Galaxy Watch, and Fitbit compatibility
- **Privacy-First Health Data** - PDPA/GDPR compliant data handling

### 🌏 **Localization & Accessibility**
- **Bilingual Support** - Full Thai and English interface
- **Cultural Sensitivity** - Thai cultural context in wellness recommendations
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Offline Capability** - Progressive Web App with offline meditation content

## 🛠️ Technology Stack

### **Frontend Architecture**
```
React 18.3.1          # Modern UI framework with hooks
TypeScript 5.0+       # Type-safe development
Vite 5.0+            # Fast build tool and dev server
Tailwind CSS 3.4+    # Utility-first CSS framework
Shadcn/UI            # High-quality component library
```

### **State Management & Routing**
```
React Context API     # Global state management
TanStack Query 5.0+  # Server state and caching
React Router DOM 6.0+ # Client-side routing
Zustand (planned)    # Complex state management
```

### **Backend & Database**
```
Supabase             # Backend-as-a-Service platform
PostgreSQL           # Primary database
Supabase Auth        # Authentication & authorization
Edge Functions       # Serverless API endpoints
```

### **Health Integrations**
```
Apple HealthKit      # iOS health data integration
Samsung Health API   # Android health platform
Fitbit Web API      # Fitbit device connectivity
Google Fit API      # Additional health data sources
```

### **Development Tools**
```
ESLint + Prettier   # Code formatting and linting
Husky + lint-staged # Git hooks for code quality
Vitest              # Unit and integration testing
Playwright          # End-to-end testing
```

## 🚀 Quick Start

### Prerequisites Checklist
- [ ] Node.js 18.0+ installed ([Download](https://nodejs.org/))
- [ ] npm 9.0+ or yarn 3.0+ package manager
- [ ] Git for version control
- [ ] Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)

### ⚡ One-Command Setup
```bash
# Clone and setup the project
git clone https://github.com/mindful-thai/app.git
cd mindful-thai-app
npm install && npm run dev
```

🎉 **That's it!** Open [http://localhost:5173](http://localhost:5173) in your browser.

## 💻 System Requirements

### **Development Environment**
| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.0.0 | 20.0.0+ |
| npm | 9.0.0 | 10.0.0+ |
| RAM | 4GB | 8GB+ |
| Storage | 2GB | 5GB+ |
| OS | macOS 11, Windows 10, Ubuntu 20.04 | Latest versions |

### **Browser Support**
- **Chrome:** 90+ ✅
- **Firefox:** 88+ ✅  
- **Safari:** 14+ ✅
- **Edge:** 90+ ✅
- **Mobile Safari:** iOS 14+ ✅
- **Chrome Mobile:** Android 8+ ✅

## 📦 Installation

### **Detailed Setup Process**

#### 1. Clone the Repository
```bash
git clone https://github.com/mindful-thai/app.git
cd mindful-thai-app

# Verify you're in the right directory
ls -la  # Should show package.json and other project files
```

#### 2. Install Dependencies
```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

#### 3. Environment Configuration
```bash
# Copy environment template
cp .env.template .env.local

# Edit environment variables
nano .env.local  # or use your preferred editor
```

#### 4. Verify Installation
```bash
# Run health check
npm run health-check

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### **Troubleshooting Common Issues**

#### **Node Version Issues**
```bash
# Install correct Node version using nvm
nvm install 20
nvm use 20
```

#### **Dependency Conflicts**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### **Port Already in Use**
```bash
# Use different port
npm run dev -- --port 3001
```

## ⚙️ Configuration

### **Environment Variables**
Create `.env.local` with the following configuration:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Health API Configuration
VITE_APPLE_HEALTH_ENABLED=true
VITE_SAMSUNG_HEALTH_ENABLED=true
VITE_FITBIT_ENABLED=true

# Feature Flags
VITE_AI_CHAT_ENABLED=true
VITE_PREMIUM_FEATURES_ENABLED=true
VITE_ANALYTICS_ENABLED=false

# App Configuration
VITE_APP_TITLE="MindfulThai"
VITE_DEFAULT_LANGUAGE=th
VITE_SUPPORT_EMAIL=support@mindful-thai.com
```

### **Smartwatch Setup**
Refer to [Device Integration Guide](docs/devices.md) for platform-specific setup:
- [Apple HealthKit Setup](docs/devices.md#apple-healthkit)
- [Samsung Health Setup](docs/devices.md#samsung-health)
- [Fitbit Integration](docs/devices.md#fitbit)

### **Database Setup**
```bash
# Run Supabase migrations
npx supabase db reset

# Seed development data
npm run db:seed
```

## 👩‍💻 Development

### **Development Workflow**

#### **Branch Strategy**
```
main           # Production-ready code
develop        # Integration branch
feature/*      # New features
bugfix/*       # Bug fixes
hotfix/*       # Critical fixes
```

#### **Code Standards**
```bash
# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run type-check

# Run all checks
npm run pre-commit
```

#### **Testing Strategy**
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### **Development Scripts**
| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server | Daily development |
| `npm run build` | Build for production | Before deployment |
| `npm run preview` | Preview production build | Pre-deployment testing |
| `npm run test` | Run all tests | Before commits |
| `npm run lint` | Check code quality | Code review |
| `npm run format` | Format code | Code cleanup |

### **Component Development**
```bash
# Create new component
npm run generate:component ComponentName

# Create new page
npm run generate:page PageName

# Create new hook
npm run generate:hook useSomething
```

### **Database Development**
```bash
# Create migration
npx supabase migration new migration_name

# Reset database
npx supabase db reset

# Generate types
npm run db:types
```

## 🚀 Deployment

### **Production Deployment**

#### **Build Process**
```bash
# Production build
npm run build

# Build verification
npm run build:analyze
```

#### **Deployment Checklist**
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Health checks passing
- [ ] Performance tests passed
- [ ] Security scan completed
- [ ] Backup procedures verified

#### **Deployment Platforms**

##### **Lovable Platform (Recommended)**
```bash
# Deploy to Lovable
npm run deploy:lovable
```

##### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

##### **Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### **Monitoring & Operations**

#### **Health Monitoring**
```bash
# Health check endpoint
curl https://your-app.com/api/health

# Performance monitoring
npm run monitor:performance
```

#### **Backup Procedures**
- **Database:** Automated daily backups via Supabase
- **Assets:** CDN-backed with versioning
- **Code:** Git-based with tagged releases

## 🤝 Contributing

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Write tests for new functionality
5. Submit a pull request

### **Pull Request Process**
1. **Pre-submission Checklist:**
   - [ ] Code formatted (`npm run format`)
   - [ ] Tests passing (`npm run test`)
   - [ ] No TypeScript errors (`npm run type-check`)
   - [ ] Documentation updated

2. **Review Process:**
   - Code review by 2+ team members
   - Automated testing pipeline
   - Performance impact assessment
   - Security review for health data changes

### **Code of Conduct**
We follow the [Contributor Covenant](CODE_OF_CONDUCT.md). Please read it before contributing.

## 📞 Support

### **Getting Help**
- 📧 **Email:** support@mindful-thai.com
- 💬 **Discord:** [MindfulThai Community](https://discord.gg/mindful-thai)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/mindful-thai/app/issues)
- 📖 **Documentation:** [docs.mindful-thai.com](https://docs.mindful-thai.com)

### **Emergency Contacts**
- **Technical Issues:** tech-support@mindful-thai.com
- **Security Concerns:** security@mindful-thai.com
- **Health Data Issues:** privacy@mindful-thai.com

### **Business Hours**
- **Support:** Monday-Friday, 9:00-18:00 ICT
- **Emergency:** 24/7 for critical health data issues

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to:
- Thai mental health professionals for cultural guidance
- Open source community for amazing tools and libraries
- Beta testers for valuable feedback and bug reports
- Smartwatch API teams for integration support

---

**Version:** 2.1.0  
**Last Updated:** 2025-01-21  
**Maintainers:** MindfulThai Development Team  
**Status:** ✅ Active Development

*Made with ❤️ for mental wellness in Thailand*
