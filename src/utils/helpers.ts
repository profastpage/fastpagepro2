/**
 * Utility helper functions for Fast Page Pro
 */

/**
 * Formats a phone number for WhatsApp URL
 */
export const formatWhatsAppNumber = (phone: string): string => {
  return phone.replace(/[^\d]/g, '');
};

/**
 * Creates a WhatsApp message URL
 */
export const createWhatsAppUrl = (
  phone: string,
  message: string
): string => {
  const cleanPhone = formatWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message).replace(/%20/g, ' ');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (Peruvian format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+\d][\d\s-]{7,}$/;
  return phoneRegex.test(phone);
};

/**
 * Formats a date to locale string
 */
export const formatDate = (
  date: Date | string,
  locale: 'es-PE' | 'en-US' = 'es-PE'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Formats a time to locale string
 */
export const formatTime = (
  date: Date | string,
  locale: 'es-PE' | 'en-US' = 'es-PE'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Creates a Google Calendar URL for an event
 */
export const createGoogleCalendarUrl = (params: {
  title: string;
  description: string;
  location?: string;
  startDate: Date;
  endDate: Date;
}): string => {
  const { title, description, location, startDate, endDate } = params;

  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  };

  const urlParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
  });

  if (location) {
    urlParams.set('location', location);
  }

  return `https://calendar.google.com/calendar/render?${urlParams.toString()}`;
};

/**
 * Debounces a function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttles a function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Checks if an element is in viewport
 */
export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Generates a random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Sanitizes HTML to prevent XSS
 */
export const sanitizeHTML = (html: string): string => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};
