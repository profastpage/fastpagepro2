import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const StatCard = ({ icon: Icon, value, label, suffix, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const IconComp = Icon;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="relative group"
    >
      {/* Silver/White Glow instead of Gold */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-stone-950 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors duration-500"
        >
          <IconComp className="w-10 h-10 text-white/70 group-hover:text-white transition-colors duration-500 relative z-10" />
        </motion.div>
        
        <div className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight relative">
          <AnimatedCounter end={value} suffix={suffix} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        <div className="text-sm text-stone-400 uppercase tracking-widest font-medium">{label}</div>
        
        {/* Silver accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

export default StatCard;