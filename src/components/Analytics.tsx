import { useEffect } from 'react';

/**
 * Analytics component that tracks page views and sends to Google Analytics
 */
export const Analytics = () => {
  useEffect(() => {
    // Track initial page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    // Track outbound links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && (window as any).gtag) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
          (window as any).gtag('event', 'click', {
            event_category: 'outbound',
            event_label: href,
            transport_type: 'beacon',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};
