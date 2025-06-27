
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const MetaTags = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}: MetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = `https://mindspace-thailand.lovable.app${location.pathname}`;
    const fullTitle = title ? `${title} - MindSpace Thailand` : 'MindSpace Thailand - AI Mental Health & Meditation App';
    const metaDescription = description || 'AI-powered mental health app for young adults in Thailand. Get personalized meditation, mood tracking, stress monitoring, and connect with licensed therapists.';
    const metaImage = image || 'https://mindspace-thailand.lovable.app/og-image.jpg';
    const pageUrl = url || currentUrl;

    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', metaDescription);
    if (keywords) updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:image', metaImage, true);
    updateMetaTag('og:url', pageUrl, true);
    updateMetaTag('og:type', type, true);

    // Twitter tags
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', metaDescription, true);
    updateMetaTag('twitter:image', metaImage, true);
    updateMetaTag('twitter:url', pageUrl, true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

  }, [location.pathname, title, description, keywords, image, url, type]);

  return null;
};

export default MetaTags;
