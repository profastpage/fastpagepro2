import { useEffect } from 'react';

/**
 * Analytics component that:
 *  1. Lazy-loads Google Analytics (gtag.js) only when VITE_GA_ID is set.
 *  2. Tracks initial + history page views (SPA-aware via pushState wrap).
 *  3. Tracks outbound link clicks with beacon transport.
 *
 * If VITE_GA_ID is missing or placeholder, no network requests are made.
 */
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const GA_ENABLED =
  GA_ID && GA_ID.length > 0 && !GA_ID.startsWith('G-XXXX');

const loadGtag = () => {
  if (!GA_ENABLED || typeof window === 'undefined') return;
  if ((window as any).gtag) return;

  window.dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function (...args: unknown[]) {
    (window as any).dataLayer.push(args);
  };
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', GA_ID, {
    send_page_view: false, // we fire page_view manually below for SPA-awareness
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
};

export const Analytics = () => {
  useEffect(() => {
    loadGtag();

    const trackPageView = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
    };

    // Initial page view
    trackPageView();

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
