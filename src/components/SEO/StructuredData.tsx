
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'WebPage' | 'MobileApplication' | 'Article' | 'Organization';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const StructuredData = ({ 
  type = 'WebPage', 
  title, 
  description, 
  url, 
  image 
}: StructuredDataProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = `https://mindspace-thailand.lovable.app${location.pathname}`;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      "name": title || "MindSpace Thailand",
      "description": description || "AI-powered mental health app for young adults in Thailand",
      "url": url || currentUrl,
      "image": image || "https://mindspace-thailand.lovable.app/og-image.jpg",
      "publisher": {
        "@type": "Organization",
        "name": "MindSpace Thailand",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mindspace-thailand.lovable.app/logo.png"
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "inLanguage": ["en", "th"],
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": currentUrl
        }
      }
    };

    // Remove existing structured data script if it exists
    const existingScript = document.querySelector('script[data-structured-data]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-structured-data', 'true');
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname, type, title, description, url, image]);

  return null;
};

export default StructuredData;
