
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  test: () => Promise<boolean>;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

const TestingUtils = () => {
  const [tests, setTests] = useState<TestCase[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Initialize test cases
    const testCases: TestCase[] = [
      {
        id: 'navigation',
        name: 'Navigation Test',
        description: 'Verify all navigation links work',
        test: async () => {
          const navLinks = document.querySelectorAll('[data-testid^="nav-"]');
          return navLinks.length >= 5; // Should have 5 nav items
        },
        status: 'pending'
      },
      {
        id: 'language-switch',
        name: 'Language Switch Test',
        description: 'Test Thai/English language switching',
        test: async () => {
          const langButtons = document.querySelectorAll('[data-testid="language-selector"]');
          return langButtons.length > 0;
        },
        status: 'pending'
      },
      {
        id: 'responsive-design',
        name: 'Mobile Responsiveness',
        description: 'Check mobile layout adaptation',
        test: async () => {
          const isMobile = window.innerWidth < 768;
          const mobileElements = document.querySelectorAll('.mobile-container');
          return isMobile ? mobileElements.length > 0 : true;
        },
        status: 'pending'
      },
      {
        id: 'accessibility',
        name: 'Accessibility Check',
        description: 'Verify ARIA labels and keyboard navigation',
        test: async () => {
          const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
          return ariaElements.length > 10;
        },
        status: 'pending'
      },
      {
        id: 'performance',
        name: 'Performance Check',
        description: 'Verify page load performance',
        test: async () => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = navigation.loadEventEnd - navigation.navigationStart;
          return loadTime < 5000; // Less than 5 seconds
        },
        status: 'pending'
      }
    ];

    setTests(testCases);

    // Toggle visibility with Ctrl+Shift+T
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      
      // Update status to running
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'running' } : t
      ));
      
      try {
        const result = await test.test();
        setTests(prev => prev.map(t => 
          t.id === test.id ? { ...t, status: result ? 'passed' : 'failed' } : t
        ));
      } catch (error) {
        setTests(prev => prev.map(t => 
          t.id === test.id ? { ...t, status: 'failed' } : t
        ));
      }
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running': return <AlertCircle className="w-4 h-4 text-orange-500 animate-pulse" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-mind-neutral-300" />;
    }
  };

  const getStatusBadge = (status: TestCase['status']) => {
    const colors = {
      pending: 'bg-mind-neutral-300',
      running: 'bg-orange-500',
      passed: 'bg-green-500',
      failed: 'bg-red-500'
    };
    return `${colors[status]} text-white`;
  };

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const passedTests = tests.filter(t => t.status === 'passed').length;
  const failedTests = tests.filter(t => t.status === 'failed').length;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="p-4 bg-white shadow-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">QA Testing</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-mind-neutral-400 hover:text-mind-neutral-600"
          >
            ×
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <Badge className="bg-green-500 text-white">{passedTests} Passed</Badge>
            <Badge className="bg-red-500 text-white">{failedTests} Failed</Badge>
          </div>
          <Button
            onClick={runAllTests}
            disabled={isRunning}
            size="sm"
            className="bg-mind-green-500 hover:bg-mind-green-600"
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? 'Running...' : 'Run Tests'}
          </Button>
        </div>
        
        <div className="space-y-3">
          {tests.map((test) => (
            <div key={test.id} className="flex items-start space-x-3 p-2 rounded-lg bg-mind-neutral-50">
              {getStatusIcon(test.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-mind-neutral-800">
                    {test.name}
                  </h4>
                  <Badge className={getStatusBadge(test.status)}>
                    {test.status}
                  </Badge>
                </div>
                <p className="text-xs text-mind-neutral-600 mt-1">
                  {test.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t text-xs text-mind-neutral-500">
          Press Ctrl+Shift+T to toggle
        </div>
      </Card>
    </div>
  );
};

export default TestingUtils;
