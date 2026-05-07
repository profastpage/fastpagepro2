import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button 
    onClick={toggleTheme} 
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-700 shadow-lg"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, opacity: 0, scale: 0 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        {isDark ? <Sun size={22} /> : <Moon size={22} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

export default ThemeToggle;