
# Development Tools & Scripts Guide

## 📋 Table of Contents
- [Script Categories](#script-categories)
- [Development Scripts](#development-scripts)
- [Build Scripts](#build-scripts)
- [Testing Scripts](#testing-scripts)
- [Quality Assurance](#quality-assurance)
- [Deployment Scripts](#deployment-scripts)
- [Utility Scripts](#utility-scripts)
- [Troubleshooting](#troubleshooting)

## 📂 Script Categories

### 🚀 **Development Scripts**
Essential commands for daily development workflow

### 🔨 **Build Scripts**
Production build and optimization commands

### 🧪 **Testing Scripts**
Comprehensive testing suite commands

### ✅ **Quality Assurance**
Code quality and formatting tools

### 🚢 **Deployment Scripts**
Production deployment and release management

### 🛠️ **Utility Scripts**
Helper scripts for project maintenance

---

## 🚀 Development Scripts

### **`npm run dev`**
**Purpose:** Start the development server with hot module replacement

**Command:**
```bash
npm run dev
# or
npm run dev -- --port 3001  # Custom port
npm run dev -- --host        # Expose to network
```

**What it does:**
- Starts Vite development server on `http://localhost:5173`
- Enables hot module replacement (HMR)
- Provides fast refresh for React components
- Serves static assets from `public/` directory

**Environmental Prerequisites:**
- Node.js 18+ installed
- Dependencies installed (`npm install`)
- `.env.local` configured (optional)

**Expected Output:**
```
  VITE v5.0.0  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Performance Considerations:**
- Initial startup: ~300-500ms
- HMR updates: ~50-100ms
- Memory usage: ~200-400MB

**Common Issues & Solutions:**
```bash
# Port already in use
npm run dev -- --port 3001

# Permission denied
sudo chown -R $USER ~/.npm

# Module not found
rm -rf node_modules && npm install
```

### **`npm run dev:debug`**
**Purpose:** Start development server with debugging enabled

**Command:**
```bash
npm run dev:debug
```

**Features:**
- Source map generation
- React DevTools integration
- Console debugging enabled
- Performance profiling

---

## 🔨 Build Scripts

### **`npm run build`**
**Purpose:** Create optimized production build

**Command:**
```bash
npm run build
```

**Build Process:**
1. TypeScript type checking
2. ESLint code quality checks
3. Asset optimization and bundling
4. CSS purging and minification
5. JavaScript minification and tree-shaking
6. Progressive Web App manifest generation

**Output Directory:** `dist/`

**Expected Output:**
```
✓ building for production...
✓ 156 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-a7c2d9e4.css   12.34 kB │ gzip:  3.21 kB
dist/assets/index-f9b8c1a2.js   142.67 kB │ gzip: 45.23 kB
✓ built in 3.42s
```

**Performance Metrics:**
- Build time: ~3-5 seconds
- Bundle size: ~140-180KB (gzipped: ~45-60KB)
- Chunk splitting for optimal loading

**Quality Checks:**
- Bundle size analysis
- Performance budget validation
- Accessibility checks
- SEO optimization

### **`npm run build:analyze`**
**Purpose:** Build with bundle analysis

**Command:**
```bash
npm run build:analyze
```

**Features:**
- Interactive bundle analyzer
- Dependency size visualization
- Optimization recommendations
- Performance metrics

---

## 🧪 Testing Scripts

### **`npm run test`**
**Purpose:** Run all test suites

**Command:**
```bash
npm run test
# or
npm run test -- --watch    # Watch mode
npm run test -- --coverage # With coverage
```

**Test Categories:**
- **Unit Tests:** Individual component testing
- **Integration Tests:** Component interaction testing
- **Hook Tests:** Custom React hooks testing
- **Utility Tests:** Helper function testing

**Expected Output:**
```
 ✓ src/components/Home/StressLevelCard.test.tsx (3)
 ✓ src/hooks/useSmartwatch.test.ts (8)
 ✓ src/lib/utils.test.ts (12)

 Test Files  15 passed (15)
      Tests  67 passed (67)
   Start at  14:32:15
   Duration  2.43s (transform 124ms, setup 0ms, collect 89ms, tests 1.89s)
```

**Coverage Requirements:**
- Statements: >80%
- Branches: >75%
- Functions: >80%
- Lines: >80%

### **`npm run test:e2e`**
**Purpose:** Run end-to-end tests with Playwright

**Command:**
```bash
npm run test:e2e
npm run test:e2e -- --headed    # Run with browser UI
npm run test:e2e -- --debug     # Debug mode
```

**Test Scenarios:**
- User onboarding flow
- Smartwatch connection process
- Meditation session completion
- Profile management
- Payment flow (Premium)

**Browser Coverage:**
- Chromium (Desktop & Mobile)
- Firefox
- WebKit (Safari)

---

## ✅ Quality Assurance

### **`npm run lint`**
**Purpose:** Check code quality and style issues

**Command:**
```bash
npm run lint
npm run lint -- --fix      # Auto-fix issues
npm run lint -- --quiet    # Only show errors
```

**Linting Rules:**
- ESLint with React and TypeScript plugins
- Accessibility (a11y) rules
- Performance best practices
- Security vulnerability detection

**Example Output:**
```
✖ 3 problems (2 errors, 1 warning)
  2 errors and 0 warnings potentially fixable with the --fix option.

src/components/Profile.tsx
  15:12  error    'useState' is not defined  no-undef
  28:5   warning  Missing dependency in useEffect  react-hooks/exhaustive-deps
```

### **`npm run format`**
**Purpose:** Format code according to Prettier configuration

**Command:**
```bash
npm run format
npm run format -- --check   # Check formatting without changes
```

**Formatting Rules:**
- 2-space indentation
- Single quotes for strings
- Trailing commas
- Line width: 80 characters
- Semicolons required

### **`npm run type-check`**
**Purpose:** TypeScript type checking without emitting files

**Command:**
```bash
npm run type-check
npm run type-check -- --watch  # Watch mode
```

**Type Checking:**
- Strict TypeScript configuration
- Interface compliance
- Generic type safety
- Import/export validation

---

## 🚢 Deployment Scripts

### **`npm run build:prod`**
**Purpose:** Production build with optimizations

**Command:**
```bash
npm run build:prod
```

**Production Optimizations:**
- Dead code elimination
- Asset compression
- Service worker generation
- Cache optimization
- Security headers

### **`npm run preview`**
**Purpose:** Preview production build locally

**Command:**
```bash
npm run preview
```

**Features:**
- Serves built files from `dist/`
- Production environment simulation
- HTTPS support (with certificates)
- Performance testing capability

**Expected Output:**
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

---

## 🛠️ Utility Scripts

### **`npm run clean`**
**Purpose:** Clean build artifacts and cache

**Command:**
```bash
npm run clean
```

**Cleanup Process:**
- Remove `dist/` directory
- Clear Vite cache
- Remove `node_modules/.vite/`
- Clear TypeScript build info

### **`npm run health-check`**
**Purpose:** Verify development environment

**Command:**
```bash
npm run health-check
```

**Health Checks:**
- Node.js version compatibility
- Dependency integrity
- Environment variable validation
- Database connection (if configured)
- External API accessibility

**Example Output:**
```
✅ Node.js version: 20.10.0 (supported)
✅ Dependencies: All packages installed
✅ Environment: .env.local configured
⚠️  Database: Connection timeout (check config)
✅ Health APIs: All services accessible
```

### **`npm run db:types`**
**Purpose:** Generate TypeScript types from Supabase schema

**Command:**
```bash
npm run db:types
```

**Generated Files:**
- `src/integrations/supabase/types.ts`
- Database table interfaces
- RPC function signatures
- Enum type definitions

---

## 🔧 Troubleshooting

### **Common Script Issues**

#### **Permission Errors**
```bash
# Fix npm permissions
sudo chown -R $USER ~/.npm
sudo chown -R $USER ~/.config
```

#### **Memory Issues**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### **Port Conflicts**
```bash
# Kill process using port
npx kill-port 5173
# or use different port
npm run dev -- --port 3001
```

#### **Cache Issues**
```bash
# Clear all caches
npm run clean
rm -rf ~/.npm/_cacache
npm cache clean --force
```

#### **Dependency Conflicts**
```bash
# Reset dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Performance Optimization**

#### **Slow Build Times**
```bash
# Parallel builds
npm run build:parallel

# Skip type checking during development
npm run build:fast
```

#### **Large Bundle Size**
```bash
# Analyze bundle
npm run build:analyze

# Check for duplicate dependencies
npx npm-check-duplicates
```

### **Debug Information**

#### **Environment Debug**
```bash
# Print environment info
npm run debug:env

# Check installed versions
npm ls --depth=0
```

#### **Build Debug**
```bash
# Verbose build output
npm run build -- --debug

# Build with source maps
npm run build:debug
```

---

## 📊 Script Performance Metrics

| Script | Average Time | Memory Usage | CPU Usage |
|--------|-------------|--------------|-----------|
| `npm run dev` | 0.3-0.5s | 200-400MB | Low |
| `npm run build` | 3-5s | 800MB-1.2GB | High |
| `npm run test` | 5-10s | 400-600MB | Medium |
| `npm run lint` | 2-4s | 200-300MB | Low |
| `npm run type-check` | 3-6s | 300-500MB | Medium |

---

**Script Guide Version:** 2.1  
**Last Updated:** 2025-01-21  
**Compatibility:** Node.js 18+, npm 9+  
**Support:** development-team@mindful-thai.com
