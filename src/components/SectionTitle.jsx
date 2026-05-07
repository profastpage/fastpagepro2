import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const SectionTitle = ({ title, subtitle, badge }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-16 md:mb-24 text-center max-w-4xl mx-auto px-4">
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-stone-200 bg-stone-50 text-stone-600 text-xs font-semibold tracking-widest uppercase shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-950 tracking-tight leading-[1.1] mb-6 dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-stone-500 font-light leading-relaxed dark:text-stone-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;