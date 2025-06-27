
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Clock, Eye } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkRequests: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as any).memory;
      
      setMetrics({
        loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        renderTime: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0,
        networkRequests: performance.getEntriesByType('resource').length
      });
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('load', measurePerformance);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible]);

  if (!metrics || !isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getPerformanceBadge = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'bg-green-500';
    if (value <= thresholds[1]) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Card className="p-4 bg-white shadow-lg border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Performance Monitor</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-mind-neutral-400 hover:text-mind-neutral-600"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3" />
              <span>Load Time</span>
            </div>
            <Badge className={`${getPerformanceBadge(metrics.loadTime, [2000, 4000])} text-white`}>
              {metrics.loadTime}ms
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3" />
              <span>Render Time</span>
            </div>
            <Badge className={`${getPerformanceBadge(metrics.renderTime, [100, 300])} text-white`}>
              {metrics.renderTime}ms
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-3 h-3" />
              <span>Memory</span>
            </div>
            <Badge className={`${getPerformanceBadge(metrics.memoryUsage, [50, 100])} text-white`}>
              {metrics.memoryUsage}MB
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-3 h-3" />
              <span>Requests</span>
            </div>
            <Badge className="bg-mind-blue-500 text-white">
              {metrics.networkRequests}
            </Badge>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t text-xs text-mind-neutral-500">
          Press Ctrl+Shift+P to toggle
        </div>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
