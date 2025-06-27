
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { TestTube, BarChart3, Users, Target } from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: {
    control: string;
    variant: string;
  };
  isActive: boolean;
  currentVariant: 'control' | 'variant';
}

const ABTestingPanel = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Initialize A/B tests based on your requirements
    const abTests: ABTest[] = [
      {
        id: 'cta-button-text',
        name: 'CTA Button Text',
        description: 'Test different call-to-action button texts',
        variants: {
          control: 'Start Now',
          variant: 'Try Meditation'
        },
        isActive: false,
        currentVariant: 'control'
      },
      {
        id: 'color-scheme',
        name: 'Color Scheme',
        description: 'Test blue vs green color palette',
        variants: {
          control: 'Blue Palette (#E6F0FA)',
          variant: 'Green Palette (#D4F4E2)'
        },
        isActive: false,
        currentVariant: 'control'
      },
      {
        id: 'home-layout',
        name: 'Home Screen Layout',
        description: 'Test different home screen arrangements',
        variants: {
          control: 'Mood Summary First',
          variant: 'Quick Actions First'
        },
        isActive: false,
        currentVariant: 'control'
      },
      {
        id: 'onboarding-flow',
        name: 'Onboarding Flow',
        description: 'Test different onboarding approaches',
        variants: {
          control: '3-Step Onboarding',
          variant: '5-Step Detailed Onboarding'
        },
        isActive: false,
        currentVariant: 'control'
      }
    ];

    setTests(abTests);

    // Toggle with Ctrl+Shift+A
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const toggleTest = (testId: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, isActive: !test.isActive }
        : test
    ));
  };

  const switchVariant = (testId: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { 
            ...test, 
            currentVariant: test.currentVariant === 'control' ? 'variant' : 'control'
          }
        : test
    ));

    // Apply changes to DOM based on test
    applyTestVariant(testId);
  };

  const applyTestVariant = (testId: string) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    switch (testId) {
      case 'cta-button-text':
        const ctaButtons = document.querySelectorAll('[data-testid="primary-cta"]');
        ctaButtons.forEach(button => {
          if (button.textContent) {
            button.textContent = test.currentVariant === 'control' 
              ? test.variants.control 
              : test.variants.variant;
          }
        });
        break;
        
      case 'color-scheme':
        document.documentElement.setAttribute(
          'data-theme', 
          test.currentVariant === 'control' ? 'blue' : 'green'
        );
        break;
        
      // Add more test implementations as needed
    }
  };

  const generateTestReport = () => {
    const activeTests = tests.filter(t => t.isActive);
    const report = {
      totalTests: tests.length,
      activeTests: activeTests.length,
      testResults: activeTests.map(test => ({
        name: test.name,
        variant: test.currentVariant,
        // In real implementation, you'd track actual metrics
        conversions: Math.floor(Math.random() * 100),
        engagement: Math.floor(Math.random() * 100)
      }))
    };
    
    console.log('A/B Test Report:', report);
    alert('Test report logged to console');
  };

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const activeTests = tests.filter(t => t.isActive).length;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <Card className="p-4 bg-white shadow-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TestTube className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">A/B Testing</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-mind-neutral-400 hover:text-mind-neutral-600"
          >
            ×
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <Badge className="bg-purple-500 text-white">
              <Users className="w-3 h-3 mr-1" />
              {activeTests} Active
            </Badge>
            <Badge className="bg-mind-neutral-300 text-mind-neutral-700">
              {tests.length} Total
            </Badge>
          </div>
          <Button
            onClick={generateTestReport}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Report
          </Button>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {tests.map((test) => (
            <div key={test.id} className="p-3 rounded-lg bg-mind-neutral-50 border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-mind-neutral-800">
                  {test.name}
                </h4>
                <Switch
                  checked={test.isActive}
                  onCheckedChange={() => toggleTest(test.id)}
                />
              </div>
              
              <p className="text-xs text-mind-neutral-600 mb-3">
                {test.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-mind-neutral-600">Current Variant:</span>
                  <Badge 
                    className={`${
                      test.currentVariant === 'control' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {test.currentVariant}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border">
                    <div className="font-medium text-blue-600">Control</div>
                    <div className="text-mind-neutral-600">{test.variants.control}</div>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <div className="font-medium text-green-600">Variant</div>
                    <div className="text-mind-neutral-600">{test.variants.variant}</div>
                  </div>
                </div>
                
                {test.isActive && (
                  <Button
                    onClick={() => switchVariant(test.id)}
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                  >
                    <Target className="w-3 h-3 mr-1" />
                    Switch to {test.currentVariant === 'control' ? 'Variant' : 'Control'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t text-xs text-mind-neutral-500">
          Press Ctrl+Shift+A to toggle
        </div>
      </Card>
    </div>
  );
};

export default ABTestingPanel;
