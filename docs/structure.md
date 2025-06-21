
# Architecture Recommendations & Project Structure

## 📋 Table of Contents
- [Current vs Recommended Structure](#current-vs-recommended-structure)
- [Migration Strategy](#migration-strategy)
- [Best Practices](#best-practices)
- [Scalability Considerations](#scalability-considerations)
- [Performance Optimization](#performance-optimization)
- [Future Architecture Plans](#future-architecture-plans)

## 🏗️ Current vs Recommended Structure

### **Current Structure Analysis**
The MindfulThai app currently follows a good React project structure with some areas for improvement:

#### **✅ Strengths**
- Clear separation of concerns with dedicated directories
- Proper use of TypeScript throughout the codebase
- Well-organized component hierarchy
- Effective use of custom hooks for business logic
- Consistent naming conventions

#### **⚠️ Areas for Improvement**
- Some components are becoming large (DeviceSettings.tsx - 277 lines)
- Limited use of compound components pattern
- State management could be more centralized
- Testing coverage needs improvement
- Documentation could be more comprehensive

### **Recommended Structure**

#### **Current Structure**
```
src/
├── components/
│   ├── Home/              # Page-specific components
│   ├── Profile/           # Page-specific components
│   └── ui/               # Generic UI components
├── contexts/             # React contexts
├── hooks/               # Custom hooks
├── pages/               # Route components
├── lib/                 # Utilities
└── integrations/        # External services
```

#### **Recommended Enhanced Structure**
```
src/
├── app/                          # App configuration & providers
│   ├── providers/                # Context providers
│   ├── router/                   # Route configuration
│   └── store/                    # Global state management
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── forms/                    # Form components
│   ├── charts/                   # Data visualization
│   ├── layout/                   # Layout components
│   └── feedback/                 # Toast, modals, alerts
├── features/                     # Feature-based organization
│   ├── auth/                     # Authentication feature
│   ├── smartwatch/               # Smartwatch integration
│   ├── meditation/               # Meditation features
│   ├── profile/                  # User profile management
│   └── wellness/                 # Wellness tracking
├── shared/                       # Shared utilities
│   ├── api/                      # API clients
│   ├── hooks/                    # Generic hooks
│   ├── utils/                    # Utility functions
│   ├── constants/                # App constants
│   └── types/                    # TypeScript types
├── assets/                       # Static assets
│   ├── images/                   # Image files
│   ├── icons/                    # Icon components
│   └── sounds/                   # Audio assets
└── tests/                        # Test utilities
    ├── __mocks__/                # Mock implementations
    ├── fixtures/                 # Test data
    └── utils/                    # Test helpers
```

## 🔄 Migration Strategy

### **Phase 1: Foundation (Week 1-2)**
#### **Priority: High**

1. **Create Enhanced Directory Structure**
```bash
# Create new directories
mkdir -p src/app/{providers,router,store}
mkdir -p src/features/{auth,smartwatch,meditation,profile,wellness}
mkdir -p src/shared/{api,hooks,utils,constants,types}
mkdir -p src/components/{forms,charts,layout,feedback}
mkdir -p src/assets/{images,icons,sounds}
mkdir -p src/tests/{__mocks__,fixtures,utils}
```

2. **Move Existing Files**
```bash
# Move contexts to app/providers
mv src/contexts/* src/app/providers/

# Move integrations to shared/api
mv src/integrations/* src/shared/api/

# Move lib utilities to shared/utils
mv src/lib/* src/shared/utils/
```

3. **Update Import Paths**
```typescript
// Before
import { useLanguage } from "@/contexts/LanguageContext";
import { utils } from "@/lib/utils";

// After
import { useLanguage } from "@/app/providers/LanguageProvider";
import { utils } from "@/shared/utils/helpers";
```

### **Phase 2: Feature Extraction (Week 3-4)**
#### **Priority: Medium**

1. **Smartwatch Feature Module**
```
src/features/smartwatch/
├── components/
│   ├── DeviceCard/
│   ├── StressMonitor/
│   └── SleepTracker/
├── hooks/
│   ├── useSmartwatch.ts
│   ├── useHeartRate.ts
│   └── useSleepData.ts
├── services/
│   ├── deviceManager.ts
│   ├── healthDataProcessor.ts
│   └── notificationService.ts
├── types/
│   └── smartwatch.types.ts
└── index.ts                      # Public API
```

2. **Profile Feature Module**
```
src/features/profile/
├── components/
│   ├── ProfileHeader/
│   ├── ProfileTabs/
│   ├── ProfileOverview/
│   └── ProfileSettings/
├── hooks/
│   ├── useProfile.ts
│   └── useUserStats.ts
├── services/
│   └── profileService.ts
├── types/
│   └── profile.types.ts
└── index.ts
```

### **Phase 3: Advanced Patterns (Week 5-6)**
#### **Priority: Low**

1. **Compound Components**
```typescript
// Before: Large monolithic component
<DeviceSettings />

// After: Composable compound components
<DeviceManager>
  <DeviceManager.Header />
  <DeviceManager.DeviceList>
    <DeviceManager.Device />
    <DeviceManager.AddDevice />
  </DeviceManager.DeviceList>
  <DeviceManager.Permissions />
</DeviceManager>
```

2. **State Management Enhancement**
```typescript
// Centralized store structure
src/app/store/
├── slices/
│   ├── authSlice.ts
│   ├── smartwatchSlice.ts
│   └── userSlice.ts
├── middleware/
│   ├── persistenceMiddleware.ts
│   └── loggingMiddleware.ts
└── index.ts
```

## 🎯 Best Practices

### **File Naming Conventions**

#### **Components**
```typescript
// PascalCase for components
ProfileHeader.tsx
StressLevelCard.tsx
DeviceSettings.tsx

// Include component type in filename for clarity
ProfileHeader.component.tsx
ProfileHeader.stories.tsx
ProfileHeader.test.tsx
```

#### **Hooks & Utilities**
```typescript
// camelCase with descriptive prefixes
useSmartwatch.ts          // Custom hooks start with 'use'
smartwatchService.ts      // Services end with 'Service'
deviceHelpers.ts          // Utilities end with 'Helpers'
smartwatch.types.ts       // Types end with 'types'
```

#### **Constants & Enums**
```typescript
// SCREAMING_SNAKE_CASE for constants
export const API_ENDPOINTS = {
  HEALTH_DATA: '/api/health',
  DEVICES: '/api/devices'
} as const;

// PascalCase for enums
export enum DeviceType {
  AppleWatch = 'apple_watch',
  GalaxyWatch = 'galaxy_watch',
  Fitbit = 'fitbit'
}
```

### **Module Organization**

#### **Barrel Exports**
```typescript
// src/features/smartwatch/index.ts
export { DeviceSettings } from './components/DeviceSettings';
export { useSmartwatch } from './hooks/useSmartwatch';
export { deviceService } from './services/deviceService';
export type { SmartwatchDevice } from './types/smartwatch.types';
```

#### **Import/Export Patterns**
```typescript
// Prefer named exports over default exports
export const ProfileHeader = () => { /* ... */ };

// Use barrel imports for cleaner code
import { 
  DeviceSettings, 
  useSmartwatch, 
  deviceService 
} from '@/features/smartwatch';

// Avoid deep imports
// ❌ Bad
import { DeviceSettings } from '@/features/smartwatch/components/DeviceSettings/DeviceSettings';

// ✅ Good
import { DeviceSettings } from '@/features/smartwatch';
```

### **Component Architecture**

#### **Component Composition**
```typescript
// Prefer composition over inheritance
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlighted' | 'compact';
}

export const Card = ({ children, variant = 'default' }: CardProps) => (
  <div className={cardVariants[variant]}>
    {children}
  </div>
);

// Usage
<Card variant="highlighted">
  <StressLevelDisplay />
</Card>
```

#### **Props Interface Design**
```typescript
// Clear and specific prop interfaces
interface StressLevelCardProps {
  stressLevel: 'low' | 'medium' | 'high';
  heartRate: number;
  onStartBreathing: () => void;
  isLoading?: boolean;
  className?: string;
}

// Use discriminated unions for conditional props
type ButtonProps = 
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string };
```

### **State Management**

#### **Local vs Global State**
```typescript
// Local state for component-specific data
const [isExpanded, setIsExpanded] = useState(false);

// Global state for shared application data
const { user, updateUser } = useUserStore();

// Server state for API data
const { data: devices, isLoading } = useQuery({
  queryKey: ['devices'],
  queryFn: fetchDevices
});
```

#### **Custom Hooks for Business Logic**
```typescript
// Encapsulate complex state logic in custom hooks
export const useSmartwatch = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const connectDevice = useCallback(async (deviceType: DeviceType) => {
    setIsConnecting(true);
    try {
      const device = await deviceService.connect(deviceType);
      setDevices(prev => [...prev, device]);
      return { success: true, device };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsConnecting(false);
    }
  }, []);
  
  return { devices, isConnecting, connectDevice };
};
```

## 📈 Scalability Considerations

### **Performance Optimization**

#### **Code Splitting**
```typescript
// Route-based code splitting
const ProfilePage = lazy(() => import('./pages/Profile'));
const DeviceSettings = lazy(() => import('./features/smartwatch/components/DeviceSettings'));

// Feature-based code splitting
const SmartwatchFeature = lazy(() => import('./features/smartwatch'));
```

#### **Bundle Optimization**
```typescript
// Selective imports to reduce bundle size
import { debounce } from 'lodash/debounce';  // ✅ Good
import _ from 'lodash';                      // ❌ Bad - imports entire library

// Tree-shaking friendly exports
export { ProfileHeader } from './ProfileHeader';
export { ProfileTabs } from './ProfileTabs';
// Instead of export * from './components';
```

#### **Memoization Strategy**
```typescript
// Memoize expensive calculations
const stressAnalysis = useMemo(() => 
  calculateStressLevel(heartRateData), 
  [heartRateData]
);

// Memoize callback functions
const handleDeviceConnect = useCallback((deviceType: DeviceType) => {
  connectDevice(deviceType);
}, [connectDevice]);

// Memoize components with expensive renders
const DeviceList = memo(({ devices }: { devices: Device[] }) => (
  // Component implementation
));
```

### **Database & API Design**

#### **Data Fetching Patterns**
```typescript
// Implement proper caching strategies
const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Optimistic updates for better UX
const useConnectDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: connectDevice,
    onMutate: async (deviceType) => {
      // Optimistically update the cache
      const previousDevices = queryClient.getQueryData(['devices']);
      queryClient.setQueryData(['devices'], (old: Device[]) => [
        ...old,
        { id: 'temp', type: deviceType, status: 'connecting' }
      ]);
      return { previousDevices };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['devices'], context?.previousDevices);
    },
  });
};
```

## 🚀 Future Architecture Plans

### **Micro-Frontend Architecture** (Q3 2025)
- Split large features into independent applications
- Shared component library
- Independent deployment cycles

### **Advanced State Management** (Q2 2025)
- Implement Zustand or Redux Toolkit
- Persistent state management
- State synchronization across tabs

### **Enhanced Testing Strategy** (Q2 2025)
- Component testing with Testing Library
- Visual regression testing
- Performance testing automation

### **Development Tooling** (Q1 2025)
- Storybook for component documentation
- Automated dependency updates
- Enhanced development analytics

---

## 📊 Impact Assessment

### **Migration Benefits**
| Aspect | Current | After Migration | Improvement |
|--------|---------|-----------------|-------------|
| Maintainability | 6/10 | 9/10 | +50% |
| Scalability | 7/10 | 9/10 | +29% |
| Developer Experience | 7/10 | 9/10 | +29% |
| Performance | 8/10 | 9/10 | +13% |
| Testing | 5/10 | 8/10 | +60% |

### **Risk Assessment**
- **Low Risk:** Directory restructuring, file moves
- **Medium Risk:** Import path updates, state management changes
- **High Risk:** Component API changes, breaking changes

### **Timeline & Resources**
- **Duration:** 6 weeks
- **Developer Hours:** ~120 hours
- **Testing Hours:** ~40 hours
- **Documentation:** ~20 hours

---

**Architecture Guide Version:** 2.1  
**Last Updated:** 2025-01-21  
**Next Review:** 2025-04-21  
**Architecture Team:** Lead Developers & Technical Architects
