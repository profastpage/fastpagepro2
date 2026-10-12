import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Inline emoji literals so this component stays self-contained (does not
// import WA_EMOJI from App.jsx, which would create a circular dependency).
const WHATSAPP_NUMBER = '51933667414';

// Lightweight GA4 click tracker — no-op when gtag is not loaded so this
// component is safe to use in isolation (e.g. in unit tests).
const trackCtaClick = (ctaId: string | undefined, target: string, extra: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function' || !ctaId) return;
  try {
    gtag('event', 'cta_click', {
      cta_id: ctaId,
      cta_target: target,
      device: /mobi|iphone|ipod|android.*mobile|windows phone/i.test(navigator.userAgent || '') ? 'mobile'
        : /tablet|ipad|playbook|silk/i.test(navigator.userAgent || '') ? 'tablet'
        : 'desktop',
      language: typeof document !== 'undefined' ? (document.documentElement.lang || 'es') : 'es',
      ...extra,
    });
  } catch {
    /* no-op */
  }
};

export interface WhatsAppButtonProps {
  text: string;
  message?: string;
  href?: string;
  variant?: 'primary' | 'outline' | 'dark';
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'normal' | 'large';
  /** Unique CTA identifier used for GA4 funnel reporting. */
  ctaId?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  text,
  message,
  href,
  variant = 'primary',
  className = '',
  onClick,
  size = 'normal',
  ctaId,
}) => {
  const defaultMessage = `Hola Fast Page Pro 👋\n\nQuiero información sobre *webs profesionales, páginas preconstruidas con descuento y sistemas a medida con bases de datos*.\n\n✅ *Objetivo:* Cotizar mi proyecto\n\nQuedo atento. ✨`;
  const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message || defaultMessage)}`;
  const finalHref = href || url;
  const isExternalLink = /^https?:\/\//.test(finalHref);

  const sizeClasses = {
    small: 'px-6 py-3 text-xs',
    normal: 'px-8 py-4 md:px-10 md:py-5 text-sm md:text-base',
    large: 'px-12 py-6 text-lg',
  };

  const baseStyle =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group';

  const variants = {
    primary:
      'bg-stone-950 text-white hover:bg-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200',
    outline:
      'bg-transparent border border-stone-200 text-stone-900 hover:bg-stone-50 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800',
    dark: 'bg-stone-950 text-white hover:bg-stone-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:bg-white dark:text-stone-950',
  };

  const handleClick = () => {
    if (ctaId) trackCtaClick(ctaId, 'whatsapp');
    if (typeof onClick === 'function') onClick();
  };

  return (
    <motion.a
      href={finalHref}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizeClasses[size]} ${className}`}
    >
      <span className="flex items-center gap-2 relative z-10">
        {text}
        {variant === 'primary' && (
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        )}
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
