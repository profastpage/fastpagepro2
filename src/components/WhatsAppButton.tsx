import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface WhatsAppButtonProps {
  text: string;
  message?: string;
  href?: string;
  variant?: 'primary' | 'outline' | 'dark';
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'normal' | 'large';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  text,
  message,
  href,
  variant = 'primary',
  className = '',
  onClick,
  size = 'normal',
}) => {
  const defaultMessage = `Hola Fast Page Pro 👋\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n✅ *Objetivo:* Agendar una demo\n🏨 *Negocio:* Por definir\n\nQuedo atento.`;
  const url = `https://wa.me/51933667414?text=${encodeURIComponent(message || defaultMessage).replace(/%20/g, ' ')}`;
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

  return (
    <motion.a
      href={finalHref}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      onClick={onClick}
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
