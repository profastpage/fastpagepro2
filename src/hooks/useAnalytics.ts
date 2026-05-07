import { useEffect } from 'react';

/**
 * Custom hook for Google Analytics event tracking
 */
export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  return { trackEvent, trackPageView };
};

/**
 * Hook for tracking component visibility (impressions)
 */
export const useTrackImpression = (
  eventName: string,
  ref: React.RefObject<HTMLElement>,
  trackEvent: (name: string, params?: Record<string, any>) => void
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent(eventName, { section: eventName });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [eventName, ref, trackEvent]);
};
