import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const LATIN_AVATARS = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=160"
];

const MALE_AVATARS = [
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=160"
];

const IMAGE_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%230b0b0f'/><stop offset='1' stop-color='%23181a24'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%23f8fafc' font-family='Arial, sans-serif' font-size='56' font-weight='700'>Fast Page Pro</text><text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='Arial, sans-serif' font-size='26'>Webs y reservas por WhatsApp</text></svg>";

const handleImageFallback = (event) => {
  if (event.currentTarget.src !== IMAGE_FALLBACK) {
    event.currentTarget.src = IMAGE_FALLBACK;
  }
};

const TestimonialCard = ({ testimonial, index }) => {
  const isCesar = testimonial.name === "Cesar";
  const avatar = isCesar 
    ? MALE_AVATARS[0] 
    : (testimonial.avatar || LATIN_AVATARS[index % LATIN_AVATARS.length]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="min-w-[280px] md:min-w-[380px] bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col h-[300px]"
    >
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-stone-900 dark:text-white fill-stone-900 dark:fill-white" />
          ))}
        </div>
        <p className="text-stone-700 dark:text-stone-300 text-base md:text-lg leading-relaxed mb-4 line-clamp-4 overflow-hidden text-ellipsis">
          "{testimonial.text}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex-shrink-0">
        <img
          src={avatar}
          alt={testimonial.name}
          onError={handleImageFallback}
          className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="font-bold text-stone-950 dark:text-white truncate">{testimonial.name}</div>
          <div className="text-xs md:text-sm text-stone-500 dark:text-stone-400 truncate">{testimonial.hotel} • {testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;