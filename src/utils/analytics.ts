
// Google Analytics and Search Console integration utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title,
    });
  }
};

// Track user interactions
export const trackUserAction = (action: 'meditation_start' | 'mood_update' | 'chat_message' | 'device_connect' | 'therapist_book', details?: Record<string, any>) => {
  trackEvent(action, 'user_interaction', JSON.stringify(details));
};

// Track conversion events
export const trackConversion = (type: 'signup' | 'premium_upgrade' | 'booking_complete', value?: number) => {
  trackEvent('conversion', type, undefined, value);
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
    });
  }
};

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        trackPerformance('LCP', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        trackPerformance('FID', (entry as any).processingStart - entry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      trackPerformance('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Search Console API integration (requires authentication)
export const submitUrlToIndex = async (url: string) => {
  try {
    // This would require proper Google Search Console API setup
    console.log(`Submitting URL to Google Search Console: ${url}`);
    // Implementation would go here with proper API credentials
  } catch (error) {
    console.error('Failed to submit URL to Search Console:', error);
  }
};
