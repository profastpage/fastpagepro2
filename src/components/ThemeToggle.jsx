import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button 
    onClick={toggleTheme} 
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    className="nav-icon-btn p-2 text-white/60 hover:text-[#FFD700] transition-colors"
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