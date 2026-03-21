import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useInView } from 'framer-motion';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="border-b border-stone-200 last:border-0 dark:border-stone-800"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex flex-col items-center text-center focus:outline-none group"
      >
        <div className="flex items-center justify-between w-full max-w-3xl px-4">
          <span className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${isOpen ? 'text-stone-950' : 'text-stone-600 group-hover:text-stone-900'} dark:text-stone-300 dark:group-hover:text-white`}>
            {question}
          </span>
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-stone-950 text-white' : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'} dark:bg-stone-800 dark:text-stone-400`}
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.p 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="pb-8 pt-6 text-stone-500 leading-relaxed max-w-2xl mx-auto text-center px-4 text-lg dark:text-stone-400"
            >
              {answer}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default FAQItem;