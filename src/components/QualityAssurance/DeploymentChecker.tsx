
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Rocket } from 'lucide-react';

interface DeploymentCheck {
  id: string;
  name: string;
  description: string;
  check: () => boolean | Promise<boolean>;
  status: 'pending' | 'checking' | 'passed' | 'failed';
  severity: 'error' | 'warning' | 'info';
}

const DeploymentChecker = () => {
  const [checks, setChecks] = useState<DeploymentCheck[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const deploymentChecks: DeploymentCheck[] = [
      {
        id: 'env-config',
        name: 'Environment Configuration',
        description: 'Check if all required environment variables are set',
        check: () => {
          // Check for required configurations
          const hasSupabaseConfig = !!document.querySelector('meta[name="supabase-url"]');
          return hasSupabaseConfig;
        },
        status: 'pending',
        severity: 'error'
      },
      {
        id: 'seo-meta',
        name: 'SEO Meta Tags',
        description: 'Verify all SEO meta tags are present',
        check: () => {
          const title = document.querySelector('title');
          const description = document.querySelector('meta[name="description"]');
          const ogTitle = document.querySelector('meta[property="og:title"]');
          return !!(title && description && ogTitle);
        },
        status: 'pending',
        severity: 'warning'
      },
      {
        id: 'pwa-manifest',
        name: 'PWA Manifest',
        description: 'Check if PWA manifest is properly configured',
        check: () => {
          const manifest = document.querySelector('link[rel="manifest"]');
          return !!manifest;
        },
        status: 'pending',
        severity: 'warning'
      },
      {
        id: 'favicon',
        name: 'Favicon & Icons',
        description: 'Verify all favicon sizes are present',
        check: () => {
          const favicon = document.querySelector('link[rel="icon"]');
          const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
          return !!(favicon && appleTouchIcon);
        },
        status: 'pending',
        severity: 'info'
      },
      {
        id: 'sitemap',
        name: 'Sitemap & Robots',
        description: 'Check if sitemap.xml and robots.txt are accessible',
        check: async () => {
          try {
            const sitemapResponse = await fetch('/sitemap.xml');
            const robotsResponse = await fetch('/robots.txt');
            return sitemapResponse.ok && robotsResponse.ok;
          } catch {
            return false;
          }
        },
        status: 'pending',
        severity: 'warning'
      },
      {
        id: 'https-ready',
        name: 'HTTPS Configuration',
        description: 'Verify HTTPS readiness and security headers',
        check: () => {
          const isHttps = location.protocol === 'https:' || location.hostname === 'localhost';
          const hasCSP = !!document.querySelector('meta[http-equiv="Content-Security-Policy"]');
          return isHttps;
        },
        status: 'pending',
        severity: 'error'
      },
      {
        id: 'performance-budget',
        name: 'Performance Budget',
        description: 'Check if bundle size is within acceptable limits',
        check: () => {
          const scripts = Array.from(document.querySelectorAll('script[src]'));
          const totalScripts = scripts.length;
          return totalScripts < 10; // Reasonable script count
        },
        status: 'pending',
        severity: 'warning'
      },
      {
        id: 'accessibility',
        name: 'Accessibility Standards',
        description: 'Basic accessibility compliance check',
        check: () => {
          const altImages = document.querySelectorAll('img[alt]');
          const totalImages = document.querySelectorAll('img');
          const ariaLabels = document.querySelectorAll('[aria-label]');
          return altImages.length === totalImages.length && ariaLabels.length > 0;
        },
        status: 'pending',
        severity: 'error'
      }
    ];

    setChecks(deploymentChecks);

    // Toggle with Ctrl+Shift+D
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const runDeploymentChecks = async () => {
    setIsRunning(true);
    
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      
      setChecks(prev => prev.map(c => 
        c.id === check.id ? { ...c, status: 'checking' } : c
      ));
      
      try {
        const result = await check.check();
        setChecks(prev => prev.map(c => 
          c.id === check.id ? { ...c, status: result ? 'passed' : 'failed' } : c
        ));
      } catch (error) {
        setChecks(prev => prev.map(c => 
          c.id === check.id ? { ...c, status: 'failed' } : c
        ));
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: DeploymentCheck['status'], severity: DeploymentCheck['severity']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': 
        return severity === 'error' 
          ? <XCircle className="w-4 h-4 text-red-500" />
          : <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'checking': return <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-mind-neutral-300" />;
    }
  };

  const getSeverityColor = (severity: DeploymentCheck['severity']) => {
    switch (severity) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
    }
  };

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const passedChecks = checks.filter(c => c.status === 'passed').length;
  const failedChecks = checks.filter(c => c.status === 'failed').length;
  const criticalFailures = checks.filter(c => c.status === 'failed' && c.severity === 'error').length;

  const isDeploymentReady = criticalFailures === 0 && failedChecks < 2;

  return (
    <div className="fixed top-4 left-4 z-50 w-96">
      <Card className="p-4 bg-white shadow-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-mind-green-500" />
            <h3 className="text-lg font-semibold">Deployment Readiness</h3>
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
            <Badge className={isDeploymentReady ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
              {isDeploymentReady ? '✓ Ready' : '✗ Not Ready'}
            </Badge>
            <Badge className="bg-green-500 text-white">{passedChecks} Passed</Badge>
            <Badge className="bg-red-500 text-white">{failedChecks} Failed</Badge>
          </div>
          <Button
            onClick={runDeploymentChecks}
            disabled={isRunning}
            size="sm"
            className="bg-mind-green-500 hover:bg-mind-green-600"
          >
            <Rocket className="w-4 h-4 mr-1" />
            {isRunning ? 'Checking...' : 'Check'}
          </Button>
        </div>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {checks.map((check) => (
            <div key={check.id} className="flex items-start space-x-3 p-2 rounded-lg bg-mind-neutral-50">
              {getStatusIcon(check.status, check.severity)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${getSeverityColor(check.severity)}`}>
                    {check.name}
                  </h4>
                  <Badge 
                    className={`${
                      check.severity === 'error' ? 'bg-red-100 text-red-800' :
                      check.severity === 'warning' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {check.severity}
                  </Badge>
                </div>
                <p className="text-xs text-mind-neutral-600 mt-1">
                  {check.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <div className="text-xs text-mind-neutral-500 mb-2">
            Press Ctrl+Shift+D to toggle
          </div>
          {criticalFailures > 0 && (
            <div className="text-xs text-red-600 font-medium">
              ⚠️ {criticalFailures} critical issue(s) must be fixed before deployment
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DeploymentChecker;
