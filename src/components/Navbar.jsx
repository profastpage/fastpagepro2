import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ scrolled, mobileMenu, setMobileMenu, language, copy, toggleLanguage, toggleTheme, openAgendaWidget, scrollToSection, navItems }) => {
  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div 
            className="text-white font-bold text-2xl tracking-tighter cursor-pointer flex items-center gap-3" 
            onClick={(e) => scrollToSection(e, 'top')} 
            whileHover={{ scale: 1.05 }}
          >
            {/* Gold Logo Only Here */}
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Zap size={24} className="fill-stone-950" strokeWidth={2.5} />
            </div>
            <span className="hidden sm:block">FastPagePro</span>
          </motion.div>
          
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <motion.a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)} 
                whileHover={{ y: -2 }} 
                className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="w-px h-6 bg-white/20 mx-2" />
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="w-11 h-11 rounded-full border border-white/20 text-xs font-bold text-white/90 hover:bg-white/10 flex items-center justify-center"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </motion.button>
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <WhatsAppButton text={copy.navCta} href="#" onClick={openAgendaWidget} variant="primary" size="small" className="ml-2" />
          </div>
          
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.94 }}
              className="w-11 h-11 rounded-full border border-white/20 text-xs font-bold text-white flex items-center justify-center"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </motion.button>
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <motion.button 
              onClick={() => setMobileMenu(!mobileMenu)} 
              whileTap={{ scale: 0.9 }} 
              className="text-white w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            transition={{ type: "spring", damping: 25 }} 
            className="fixed inset-0 z-40 bg-stone-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={(e) => scrollToSection(e, item.id)} 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: index * 0.1 }} 
                  className="text-3xl font-bold text-white py-4 border-b border-white/10"
                >
                  {item.label}
                </motion.a>
              ))}
              <WhatsAppButton 
                text={copy.navCta} 
                href="#" 
                onClick={openAgendaWidget} 
                variant="primary" 
                className="w-full mt-8" 
                size="large" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;