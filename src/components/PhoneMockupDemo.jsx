import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Video,
  Phone,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Send,
  Calendar,
  Check,
  Hotel,
  Signal,
  Wifi,
  Battery
} from 'lucide-react';

const PhoneMockupDemo = ({ language }) => {
  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const checkInRef = useRef(null);
  const nightsRef = useRef(null);
  const guestsRef = useRef(null);

  // Get minimum date (today) in YYYY-MM-DD format for date input
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedCheckIn = checkIn
    ? new Date(`${checkIn}T00:00:00`).toLocaleDateString(language === "es" ? "es-PE" : "en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : "";

  useEffect(() => {
    if (guestName && checkIn && nights > 0 && guests > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        const timer2 = setTimeout(() => {
          setIsTyping(false);
          setShowMessage(true);
        }, 1500);
        return () => clearTimeout(timer2);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
      setIsTyping(false);
    }
  }, [guestName, checkIn, nights, guests]);

  const messageEs = `Hola 👋
Soy *${guestName || "___"}* y quiero reservar.

📅 *Check-in:* ${formattedCheckIn || "__/__/____"}
🌙 *Noches:* ${nights}
👥 *Huéspedes:* ${guests}

¿Podrían confirmarme disponibilidad?`;

  const messageEn = `Hi 👋
I'm *${guestName || "___"}* and I want to book.

📅 *Check-in:* ${formattedCheckIn || "__/__/____"}
🌙 *Nights:* ${nights}
👥 *Guests:* ${guests}

Could you confirm availability?`;

  const demoMessage = language === "es" ? messageEs : messageEn;
  const currentTime = new Date().toLocaleTimeString(language === "es" ? "es-PE" : "en-US", { hour: "2-digit", minute: "2-digit" });

  const handleDateClick = () => {
    if (checkInRef.current) {
      checkInRef.current.showPicker();
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Phone Mockup */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Phone Frame */}
          <div className="relative w-[320px] h-[650px] bg-stone-950 rounded-[3rem] border-4 border-stone-800 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-stone-950 rounded-b-2xl z-20" />

            {/* Status Bar */}
            <div className="absolute top-2 left-6 right-6 flex justify-between items-center z-10">
              <span className="text-white text-xs font-medium">{currentTime}</span>
              <div className="flex items-center gap-1">
                <Signal size={14} className="text-white" />
                <Wifi size={12} className="text-white" />
                <Battery size={14} className="text-white" />
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="absolute top-10 left-0 right-0 h-20 bg-gradient-to-b from-stone-800 to-stone-900 z-10">
              <div className="flex items-center gap-3 px-4 pt-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Hotel size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Fast Page Pro Hotel</div>
                  <div className="text-green-400 text-xs">
                    {language === "es" ? "En línea" : "Online"}
                  </div>
                </div>
                <Video size={20} className="text-white" />
                <Phone size={20} className="text-white ml-2" />
              </div>
            </div>

            {/* Chat Area */}
            <div className="absolute top-28 left-0 right-0 bottom-0 bg-[#0b141a] overflow-y-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />

              {/* Date Divider */}
              <div className="relative flex justify-center py-4">
                <div className="bg-stone-800/80 backdrop-blur px-4 py-1.5 rounded-lg">
                  <span className="text-stone-400 text-xs">{language === "es" ? "Hoy" : "Today"}</span>
                </div>
              </div>

              {/* Message Bubbles */}
              <div className="relative px-3 space-y-3 pb-4">
                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-stone-800 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%]">
                    <p className="text-white text-sm leading-relaxed">
                      {language === "es"
                        ? "¡Bienvenido! 🏨 Completa el formulario para reservar."
                        : "Welcome! 🏨 Fill the form to make a reservation."}
                    </p>
                    <span className="text-stone-500 text-[10px] block mt-1 text-right">{currentTime}</span>
                  </div>
                </motion.div>

                {/* User Message (appears when form is filled) */}
                <AnimatePresence>
                  {showMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex justify-end"
                    >
                      <div className="bg-green-700 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%]">
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{demoMessage}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-green-300 text-[10px]">{currentTime}</span>
                          <Check size={10} className="text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Typing Indicator with "Escribiendo..." / "Typing..." text */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start items-end gap-2"
                    >
                      <div className="bg-stone-800 rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-stone-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-stone-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-stone-500 rounded-full"
                          />
                        </div>
                      </div>
                      <span className="text-green-400 text-xs font-medium mb-1 animate-pulse">
                        {language === "es" ? "Escribiendo..." : "Typing..."}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Phone Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-emerald-500/20 blur-3xl -z-10" />
        </motion.div>
      </div>

      {/* Form Controls */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-stone-100 dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-stone-800 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Smartphone size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-950 dark:text-white">
                {language === "es" ? "Demo en Vivo" : "Live Demo"}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {language === "es"
                  ? "Completa el formulario y mira el mensaje en tiempo real"
                  : "Fill the form and see the message in real-time"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                {language === "es" ? "👤 Nombre del huésped" : "👤 Guest name"}
              </label>
              <input
                ref={guestsRef}
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={language === "es" ? "Ej. Juan Pérez" : "Ex. John Doe"}
                className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Check-in Date - Clickable with proper language support */}
              <div>
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                  {language === "es" ? "📅 Fecha check-in" : "📅 Check-in date"}
                </label>
                <div className="relative">
                  <input
                    ref={checkInRef}
                    type="date"
                    value={checkIn}
                    min={getMinDate()}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all [color-scheme:light] dark:[color-scheme:dark]"
                    lang={language === "es" ? "es-PE" : "en-US"}
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Nights - Full block clickable with +/- buttons */}
              <div>
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                  {language === "es" ? "🌙 Noches" : "🌙 Nights"}
                </label>
                <div className="relative flex">
                  <input
                    ref={nightsRef}
                    type="number"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => setNights(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setNights(Math.max(1, nights - 1)); }}
                      className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setNights(Math.min(30, nights + 1)); }}
                      className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronUp size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guests - With +/- buttons */}
            <div>
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                {language === "es" ? "👥 Número de huéspedes" : "👥 Number of guests"}
              </label>
              <div className="relative flex">
                <input
                  ref={guestsRef}
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}
                    className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setGuests(Math.min(10, guests + 1)); }}
                    className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronUp size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
              showMessage
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-stone-200/50 dark:bg-stone-800/50 border border-stone-300 dark:border-stone-700"
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                showMessage ? "bg-green-500 animate-pulse" : "bg-stone-400"
              }`} />
              <span className={`text-sm font-medium ${
                showMessage ? "text-green-600 dark:text-green-400" : "text-stone-500 dark:text-stone-400"
              }`}>
                {showMessage
                  ? (language === "es" ? "✅ Mensaje listo para enviar" : "✅ Message ready to send")
                  : (language === "es" ? "⏳ Completa todos los campos" : "⏳ Fill all fields")}
              </span>
            </div>

            <motion.a
              href={showMessage ? `https://wa.me/51919662011?text=${encodeURIComponent(demoMessage).replace(/%20/g, ' ')}` : "#"}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={showMessage ? { scale: 1.02 } : {}}
              whileTap={showMessage ? { scale: 0.98 } : {}}
              className={`flex items-center justify-center gap-2 w-full h-[56px] rounded-full font-semibold transition-all ${
                showMessage
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/30"
                  : "bg-stone-300 text-stone-500 cursor-not-allowed"
              }`}
            >
              <Send size={18} />
              {language === "es" ? "Enviar por WhatsApp" : "Send via WhatsApp"}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhoneMockupDemo;
