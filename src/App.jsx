import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { 
  Check, 
  MessageCircle, 
  Menu, 
  X, 
  Smartphone, 
  Zap, 
  Globe, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  BarChart3,
  Moon,
  Sun,
  Play,
  ArrowUpRight,
  Sparkles,
  Clock,
  Award,
  Video,
  Phone,
  ChevronLeft,
  Server,
  Layout,
  CreditCard,
  Rocket,
  Settings,
  Image as ImageIcon,
  Layers
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "51906431630";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
];

// Updated Testimonials (Realistic feedback, no ROI specifics)
const TESTIMONIALS = [
  { name: "Carlos Mendoza", hotel: "Hotel Vista Boutique", location: "Cusco", text: "La plataforma es increÃ­blemente rÃ¡pida. Nuestros clientes prefieren reservar por WhatsApp ahora." },
  { name: "Ana Patricia Vega", hotel: "CabaÃ±as del Valle", location: "Chachapoyas", text: "El diseÃ±o es elegante y profesional. Se adapta perfectamente a lo que buscÃ¡bamos." },
  { name: "Roberto SÃ¡nchez", hotel: "Boutique Lima", location: "Lima", text: "La automatizaciÃ³n nos ha ahorrado horas de trabajo administrativo. Muy recomendado." },
  { name: "MarÃ­a Fernanda Torres", hotel: "Residencial El Golf", location: "Arequipa", text: "El soporte tÃ©cnico es excelente. Siempre estÃ¡n disponibles para ayudarnos." },
  { name: "Jorge Luis Paredes", hotel: "Casa Andina Select", location: "Valle Sagrado", text: "Implementar los pagos con Yape y Plin fue muy sencillo. Las reservas aumentaron." },
  { name: "Sofia Ramirez", hotel: "Selva Verde Lodge", location: "Iquitos", text: "La velocidad de la pÃ¡gina es impresionante. Nuestros huÃ©spedes lo notan." },
  { name: "Miguel Ãngel Castro", hotel: "Hacienda San JosÃ©", location: "Chincha", text: "El panel de administraciÃ³n es muy intuitivo. Podemos gestionar todo fÃ¡cilmente." },
  { name: "Lucia FernÃ¡ndez", hotel: "Inkaterra", location: "Machu Picchu", text: "Una soluciÃ³n completa. Desde el SEO hasta la pasarela de pagos, todo funciona." },
  { name: "Pedro Castillo", hotel: "Libertador", location: "Arequipa", text: "La personalizaciÃ³n del diseÃ±o superÃ³ nuestras expectativas. Se ve muy premium." },
  { name: "Carmen Ortiz", hotel: "Belmond", location: "Cusco", text: "La integraciÃ³n con Google Maps y Calendar nos facilita la logÃ­stica diaria." },
  { name: "Fernando Diaz", hotel: "JW Marriott", location: "Lima", text: "La optimizaciÃ³n SEO ha mejorado mucho nuestra visibilidad en bÃºsquedas locales." },
  { name: "Gabriela Mendez", hotel: "Hilton", location: "Lima", text: "El sistema de reservas directas es robusto y seguro. Confiamos plenamente en la plataforma." },
  { name: "Ricardo Flores", hotel: "Costa del Sol", location: "Wyndham", text: "La aplicaciÃ³n PWA es un plus increÃ­ble para nuestros clientes recurrentes." },
  { name: "Elena Gomez", hotel: "Swissotel", location: "Lima", text: "Profesionalismo puro. La web carga instantÃ¡neamente incluso en zonas con mala seÃ±al." }
];

const PLANS = [
  { 
    name: "START", 
    price: "700", 
    period: "pago Ãºnico",
    features: [
      "Hosting RÃ¡pido Incluido",
      "BotÃ³n Flotante de WhatsApp",
      "Sistema de Reservas Directo",
      "PersonalizaciÃ³n BÃ¡sica de Marca",
      "DiseÃ±o Responsivo (MÃ³vil/PC)",
      "Certificado SSL Seguro"
    ],
    highlight: false
  },
  { 
    name: "PRO", 
    price: "1200", 
    period: "pago Ãºnico",
    features: [
      "Todo lo del Plan START",
      "SEO Intermedio Optimizado",
      "DiseÃ±o Premium Personalizado",
      "Soporte Prioritario",
      "IntegraciÃ³n Google Maps",
      "ConfiguraciÃ³n de Cuentas",
      "AdaptaciÃ³n Tablet y PC",
      "GalerÃ­a de ImÃ¡genes Avanzada"
    ],
    highlight: true
  },
  { 
    name: "BUSINESS", 
    price: "1700", 
    period: "pago Ãºnico",
    features: [
      "Todo lo del Plan PRO",
      "App PWA (Instalable)",
      "Panel Super AdministraciÃ³n",
      "Hosting Ultra RÃ¡pido",
      "Soporte Inmediato 24/7",
      "ImÃ¡genes en Alta Calidad",
      "SEO Profesional MÃ¡ximo",
      "OptimizaciÃ³n 95%+ PageSpeed",
      "Pagos: Yape, Plin, Izipay",
      "Trabajo Prioritario"
    ],
    highlight: false
  }
];

// --- Helper Components ---

const WhatsAppButton = ({ text, message, variant = "primary", className = "", onClick, size = "normal" }) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || "Hola, quiero informaciÃ³n")}`;
  
  const sizeClasses = {
    small: "px-6 py-3 text-xs",
    normal: "px-8 py-4 md:px-10 md:py-5 text-sm md:text-base",
    large: "px-12 py-6 text-lg"
  };
  
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-500 rounded-full tracking-wide relative overflow-hidden group";
  
  // Updated variants: Removed gold, kept Silver/White/Black
  const variants = {
    primary: "bg-stone-950 text-white hover:bg-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200",
    outline: "bg-transparent border border-stone-200 text-stone-900 hover:bg-stone-50 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800",
    dark: "bg-stone-950 text-white hover:bg-stone-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:bg-white dark:text-stone-950"
  };

  return (
    <motion.a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizeClasses[size]} ${className}`}
    >
      <span className="flex items-center gap-2 relative z-10">
        {text}
        {variant === 'primary' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
      </span>
    </motion.a>
  );
};

// Enhanced Animated Counter
const AnimatedCounter = ({ end, suffix = "", duration = 2.5, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = end * easeOut;
        setCount(current);
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref} className="tabular-nums">{count.toFixed(decimals)}{suffix}</span>;
};

const StatCard = ({ icon: Icon, value, label, suffix, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <Icon className="w-10 h-10 text-white/70 group-hover:text-white transition-colors duration-500 relative z-10" />
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

// Updated Testimonial Card (No Quote Icon)
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-stone-900 dark:text-white fill-stone-900 dark:fill-white" />
          ))}
        </div>
        <p className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed mb-6">
          "{testimonial.text}"
        </p>
      </div>
      
      <div className="flex items-center gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
        <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center font-bold text-stone-600 dark:text-stone-400">
          {testimonial.name[0]}
        </div>
        <div>
          <div className="font-bold text-stone-950 dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">{testimonial.hotel} â€¢ {testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
};

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

const ROICalculator = () => {
  const [reservas, setReservas] = useState(50);
  const [ticket, setTicket] = useState(300);
  const ahorro = Math.round(reservas * ticket * 0.18);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-stone-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center relative z-10">Calcula tu Ahorro</h3>
      <div className="grid md:grid-cols-2 gap-8 mb-8 relative z-10">
        <div>
          <label className="block text-sm text-stone-400 mb-3 font-medium">Reservas mensuales</label>
          <input type="range" min="10" max="200" value={reservas} onChange={(e) => setReservas(Number(e.target.value))} className="w-full accent-white h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer" />
          <div className="text-3xl font-bold mt-4 text-white">{reservas} <span className="text-lg text-stone-400">reservas</span></div>
        </div>
        <div>
          <label className="block text-sm text-stone-400 mb-3 font-medium">Ticket promedio (S/)</label>
          <input type="range" min="100" max="1000" value={ticket} onChange={(e) => setTicket(Number(e.target.value))} className="w-full accent-white h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer" />
          <div className="text-3xl font-bold mt-4 text-white">S/ {ticket}</div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center relative z-10 border border-white/10">
        <div className="text-sm text-stone-400 mb-3 font-medium uppercase tracking-wider">Ahorro mensual estimado</div>
        <motion.div 
          className="text-5xl md:text-6xl font-bold text-green-400"
          key={ahorro}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          S/ {ahorro.toLocaleString()}
        </motion.div>
        <div className="text-sm text-stone-400 mt-4">S/ {(ahorro * 12).toLocaleString()} al aÃ±o</div>
      </div>
    </motion.div>
  );
};

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

// --- Advanced Widget Component (Updated Logic) ---
const AdvancedWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('main'); // main, meet-form, call-form
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const toggleWidget = () => setIsOpen(!isOpen);
  
  // Reset function
  const resetWidget = () => {
    setStep('main');
    setSelectedDate('');
    setSelectedTime('');
    setUserEmail('');
    setUserName('');
  };

  // Handle close button specifically
  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent triggering other clicks
    setIsOpen(false); // THIS IS THE KEY FIX
  };

  const handleBooking = (type) => {
    let message = "";
    const now = new Date();
    
    // Format DateTime properly for display
    const formattedDateTime = selectedDate && selectedTime 
      ? new Date(`${selectedDate}T${selectedTime}`).toLocaleString('es-PE', { dateStyle: 'full', timeStyle: 'short' })
      : "Por definir";

    const userInfo = userName ? `${userName}` : "Usuario desconocido";
    const contactInfo = userEmail ? `\nðŸ“§ Email: ${userEmail}` : "";

    if (type === 'direct') {
      message = "Hola FastPagePro âš¡, quiero informaciÃ³n directa.";
    } else if (type === 'meet') {
      if (!formattedDateTime || formattedDateTime.includes("Invalid")) {
        alert("Por favor selecciona una fecha y hora vÃ¡lidas");
        return;
      }
      message = `Hola FastPagePro âš¡\nQuiero agendar Google Meet.\n\nðŸ‘¤ Usuario: ${userInfo}${contactInfo}\nðŸ“… Fecha y Hora: ${formattedDateTime}\n\nEspero su confirmaciÃ³n.`;
    } else if (type === 'call') {
      if (!formattedDateTime || formattedDateTime.includes("Invalid")) {
        alert("Por favor selecciona una fecha y hora vÃ¡lidas");
        return;
      }
      message = `Hola FastPagePro âš¡\nQuiero agendar llamada telefÃ³nica.\n\nðŸ‘¤ Usuario: ${userInfo}${contactInfo}\nðŸ“… Fecha y Hora Preferente: ${formattedDateTime}\n\nEspero su llamada.`;
    }
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    // Optional: Keep widget open so they see "Message sent"
    resetWidget();
    // Optionally: setIsOpen(true); // If you want it to stay open, remove this line to close
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[340px] bg-stone-950 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-stone-700 overflow-hidden"
          >
            {/* Header - With Functional Close Button */}
            <div className="bg-stone-900 p-4 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                {/* Gold Logo Only in Widget */}
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Zap size={18} className="fill-stone-950 text-stone-950" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">FastPagePro</h3>
                  <p className="text-stone-400 text-xs">Asistente Virtual</p>
                </div>
              </div>
              <motion.button 
                onClick={handleCloseClick} 
                className="text-stone-500 hover:text-white transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              {step === 'main' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <p className="text-stone-300 text-sm mb-4 text-center">Â¿CÃ³mo deseas contactarnos hoy?</p>
                  
                  <button onClick={() => setStep('meet')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <Video size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Google Meet</div>
                      <div className="text-xs text-stone-400">Agendar videollamada</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button onClick={() => setStep('call')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                      <Phone size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Llamada TelefÃ³nica</div>
                      <div className="text-xs text-stone-400">Agendar llamada</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button 
                    onClick={() => handleBooking('direct')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-colors group text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                      <MessageCircle size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Chat Directo</div>
                      <div className="text-xs text-stone-400">Hablar con un asesor ahora</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              )}

              {(step === 'meet' || step === 'call') && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <button onClick={() => setStep('main')} className="flex items-center gap-2 text-stone-400 hover:text-white text-sm">
                      <ChevronLeft size={16} /> Volver
                    </button>
                    <span className="text-white font-bold text-sm">
                      {step === 'meet' ? 'Google Meet' : 'Llamada TelefÃ³nica'}
                    </span>
                  </div>
                  
                  {/* Inputs */}
                  <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Tu Nombre</label>
                      <input 
                        type="text" 
                        placeholder="Ingresa tu nombre"
                        className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white placeholder-stone-500 focus:border-stone-500 focus:outline-none"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    
                    {step === 'meet' && (
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Tu Gmail</label>
                        <input 
                          type="email" 
                          placeholder="ejemplo@gmail.com"
                          className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white placeholder-stone-500 focus:border-stone-500 focus:outline-none"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Fecha</label>
                        <input 
                          type="date" 
                          className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white focus:border-stone-500 focus:outline-none [color-scheme:dark]"
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Hora</label>
                        <input 
                          type="time" 
                          className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white focus:border-stone-500 focus:outline-none [color-scheme:dark]"
                          onChange={(e) => setSelectedTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBooking(step)}
                    className="w-full bg-stone-950 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Confirmar {step === 'meet' ? 'ReuniÃ³n' : 'Llamada'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Main Trigger */}
      <motion.button 
        onClick={toggleWidget}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)] flex items-center justify-center text-stone-900 z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={32} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={32} strokeWidth={2.5} className="fill-stone-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkTheme = () => {
      try {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return saved === 'dark' || (!saved && prefersDark);
      } catch { return false; }
    };
    const shouldStartDark = checkTheme();
    setIsDarkMode(shouldStartDark);
    if (shouldStartDark && typeof document !== 'undefined') document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      if (typeof document !== 'undefined') {
        if (newMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
        else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
      }
    } catch {}
  };

  useEffect(() => {
    const handleScroll = () => {
      try {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = totalScroll / windowHeight;
        setScrollProgress(scroll);
        setScrolled(totalScroll > 50);
      } catch {}
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setShowNotification(true); setTimeout(() => setShowNotification(false), 5000); }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenu(false);
    try {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  };

  return (
    <div ref={containerRef} className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'dark bg-stone-950' : 'bg-stone-50'}`}>
      
      {/* Progress Bar - Silver/White */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-stone-800 z-[60]" style={{ scaleX }}>
        <motion.div className="h-full bg-gradient-to-r from-stone-400 via-white to-stone-400" style={{ backgroundSize: '200% 100%' }} animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 3, repeat: Infinity }} />
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div className="text-white font-bold text-2xl tracking-tighter cursor-pointer flex items-center gap-3" onClick={(e) => scrollToSection(e, 'top')} whileHover={{ scale: 1.05 }}>
            {/* Gold Logo Only Here */}
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Zap size={24} className="fill-stone-950" strokeWidth={2.5} />
            </div>
            <span className="hidden sm:block">FastPagePro</span>
          </motion.div>
          
          <div className="hidden md:flex gap-2 items-center">
            {['Demo', 'Beneficios', 'Testimonios', 'Planes', 'FAQ'].map((item) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => scrollToSection(e, item.toLowerCase())} whileHover={{ y: -2 }} className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10">{item}</motion.a>
            ))}
            <div className="w-px h-6 bg-white/20 mx-2" />
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <WhatsAppButton text="Agendar Demo" variant="primary" size="small" className="ml-2" />
          </div>
          
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <motion.button onClick={() => setMobileMenu(!mobileMenu)} whileTap={{ scale: 0.9 }} className="text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: "spring", damping: 25 }} className="fixed inset-0 z-40 bg-stone-950 pt-24 px-6 md:hidden">
            <div className="flex flex-col gap-4">
              {['Demo', 'Beneficios', 'Testimonios', 'Planes', 'FAQ'].map((item, index) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => scrollToSection(e, item.toLowerCase())} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="text-3xl font-bold text-white py-4 border-b border-white/10">{item}</motion.a>
              ))}
              <WhatsAppButton text="Agendar Demo" variant="primary" className="w-full mt-8" size="large" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }} transition={{ type: "spring", stiffness: 500 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-stone-900 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-5 flex items-center gap-4 border border-stone-100 dark:border-stone-800 min-w-[320px]">
            <motion.div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
              <Check className="text-white" size={24} />
            </motion.div>
            <div>
              <div className="font-semibold text-stone-950 text-sm dark:text-white">Â¡Nueva reserva recibida!</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">Hotel Vista - hace 2 minutos</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="top" className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode='wait'>
            <motion.div key={currentHeroImage} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.8 }, scale: { duration: 6 } }} className="absolute inset-0">
              <img src={HERO_IMAGES[currentHeroImage]} alt="Hotel" className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <motion.div className="relative z-20 w-full px-4 text-center text-white flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="max-w-5xl mx-auto">
            <motion.div className="inline-block mb-8 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" whileHover={{ scale: 1.05 }}>
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                +500 hoteles confÃ­an
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-8 leading-[1.05]">
              Reservas Directas. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30">Sin Comisiones.</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              La plataforma premium que convierte visitantes en huÃ©spedes vÃ­a WhatsApp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center flex-wrap">
              <WhatsAppButton text="Ver Demo Interactiva" message="Quiero ver la demo" variant="primary" className="min-w-[220px]" size="large" />
              <WhatsAppButton text="Hablar con Asesor" variant="outline" className="min-w-[220px] !text-white !border-white hover:!bg-white/10" size="large" />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-16 flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-stone-400"><Shield size={16} className="text-green-400" /> SSL Seguro</div>
              <div className="flex items-center gap-2 text-sm text-stone-400"><Clock size={16} className="text-white" /> Soporte 24/7</div>
              <div className="flex items-center gap-2 text-sm text-stone-400"><Award size={16} className="text-blue-400" /> GarantÃ­a 30 dÃ­as</div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hidden sm:block cursor-pointer z-20" onClick={(e) => scrollToSection(e, 'trust-badges')}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </motion.div>
      </section>

      {/* Trust Badges - Silver Highlight */}
      <section id="trust-badges" className="py-16 bg-stone-950 border-b border-white/5 dark:bg-stone-900 dark:border-stone-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-stone-500 text-xs mb-10 uppercase tracking-[0.2em] font-semibold">Hoteles Asociados</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-60">
            {["Vuelo78", "Casa Andina", "Belmond", "Libertador", "JW Marriott", "Hilton"].map((logo, i) => (
              <motion.div key={i} className="text-stone-400 text-xl md:text-2xl font-bold cursor-default transition-all duration-500 ease-out hover:text-white hover:scale-110 hover:opacity-100 dark:text-stone-500 dark:hover:text-white" whileHover={{ textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(200,200,255,0.6), 0 0 30px rgba(255,200,255,0.4)" }}>{logo}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 md:py-32 bg-stone-950 dark:bg-stone-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StatCard icon={Zap} value={40} suffix="%" label="MÃ¡s Reservas" delay={0} />
            <StatCard icon={Users} value={500} suffix="+" label="Hoteles Activos" delay={0.2} />
            <StatCard icon={BarChart3} value={18} suffix="%" label="ComisiÃ³n Ahorrada" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section id="editorial" className="py-32 md:py-40 bg-stone-950 text-white dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative aspect-video rounded-[2rem] overflow-hidden w-full max-w-5xl mb-16 border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] group">
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070" alt="Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div className="absolute bottom-8 left-8 right-8 flex items-center gap-4" whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <Play size={28} className="text-white ml-1" />
                </div>
                <span className="text-white font-medium text-lg">Ver cÃ³mo funciona</span>
                <ArrowRight size={20} className="text-white" />
              </motion.div>
            </motion.div>
            
            <div className="max-w-3xl">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Recupera el control <span className="text-stone-500">de tus mÃ¡rgenes.</span></h3>
              <p className="text-xl text-stone-400 mb-8 leading-relaxed">Las agencias de viajes online se quedan con tu ganancia. Nosotros te devolvemos el 100%.</p>
              <div className="flex justify-center gap-16 pt-8 border-t border-white/10">
                <div><div className="text-6xl font-bold">0%</div><div className="text-xs text-stone-500 uppercase tracking-wider mt-2">Comisiones</div></div>
                <div><div className="text-6xl font-bold">24/7</div><div className="text-xs text-stone-500 uppercase tracking-wider mt-2">AutomatizaciÃ³n</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-32 md:py-40 bg-stone-100 dark:bg-stone-800">
        <div className="container mx-auto px-4">
          <SectionTitle title="Â¿CuÃ¡nto estÃ¡s perdiendo?" subtitle="Descubre tu ahorro con reservas directas" badge="Calculadora ROI" />
          <div className="max-w-3xl mx-auto"><ROICalculator /></div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-32 md:py-40 bg-white dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <SectionTitle title="Experiencia Fluida" subtitle="DiseÃ±ado para mÃ¡xima conversiÃ³n" />
          <div className="max-w-4xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, y: 80, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-[2rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] overflow-hidden border dark:border-stone-800" style={{ perspective: 1000 }}>
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" alt="Demo" className="w-full aspect-video object-cover" />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[{ icon: Globe, title: "AtracciÃ³n", desc: "DiseÃ±o visual de alto impacto que retiene al usuario" }, { icon: Smartphone, title: "InteracciÃ³n", desc: "Interfaz intuitiva que guÃ­a hacia la acciÃ³n" }, { icon: MessageCircle, title: "ConversiÃ³n", desc: "Cierre de venta inmediato en tu WhatsApp" }].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-10 border border-stone-100 dark:border-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] text-center hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500" whileHover={{ y: -10 }}>
                <div className="w-20 h-20 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-6"><step.icon size={36} className="text-stone-700 dark:text-white" /></div>
                <h4 className="text-2xl font-bold mb-4 dark:text-white">{step.title}</h4>
                <p className="text-stone-500 dark:text-stone-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800", "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800"].map((src, i) => (
          <motion.div key={i} className="aspect-square overflow-hidden group relative" whileHover={{ scale: 1.02 }}>
            <img src={src} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIALS - Horizontal Scroll Carousel */}
      <section id="testimonios" className="py-32 md:py-40 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle title="Lo que dicen nuestros clientes" subtitle="Experiencias reales de hoteles reales" badge="Testimonios" />
          
          {/* Horizontal Scroll Container */}
          <div className="relative w-full overflow-hidden pb-8">
            <motion.div 
              className="flex gap-6"
              drag="x"
              dragConstraints={{ left: -((TESTIMONIALS.length * 380) - window.innerWidth), right: 0 }}
              dragElastic={0.1}
              dragTransition={{ power: 0.5, timeConstant: 300 }}
            >
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} index={i} />
              ))}
            </motion.div>
            
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stone-50 to-transparent dark:from-stone-950 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stone-50 to-transparent dark:from-stone-950 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* PRICING - Updated */}
      <section id="planes" className="py-32 md:py-40 bg-stone-950 text-white dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <SectionTitle title="Planes Profesionales" subtitle="InversiÃ³n Ãºnica para tu negocio" />
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12 md:mt-20">
            {PLANS.map((plan, i) => (
              <motion.div 
                key={i} 
                className={`relative p-8 md:p-10 rounded-[2.5rem] border text-center flex flex-col ${plan.highlight ? 'bg-white text-stone-950 scale-105 shadow-[0_50px_100px_-30px_rgba(255,255,255,0.15)] z-10' : 'bg-stone-900/50 border-stone-800'}`}
                whileHover={{ y: -10, scale: plan.highlight ? 1.07 : 1.03 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-stone-950 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    MÃ¡s Popular
                  </div>
                )}
                <h3 className="text-lg opacity-60 mb-2 uppercase tracking-widest">{plan.name}</h3>
                <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">S/ {plan.price}</div>
                <div className="text-sm opacity-40 mb-8">{plan.period}</div>
                
                <ul className="space-y-4 mb-10 flex-1 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm md:text-base">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-stone-950 text-white' : 'bg-white/10 text-white'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className={plan.highlight ? 'text-stone-600' : 'text-stone-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <WhatsAppButton text="Seleccionar Plan" variant={plan.highlight ? "dark" : "outline"} className="w-full" message={`Plan ${plan.name}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 md:py-40 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionTitle title="Preguntas Frecuentes" subtitle="Transparencia total antes de empezar" />
          <div className="mt-12">
            <FAQItem question="Â¿Necesito conocimientos tÃ©cnicos?" answer="Absolutamente no. Nos encargamos de toda la infraestructura tÃ©cnica, diseÃ±o y configuraciÃ³n." index={0} />
            <FAQItem question="Â¿Puedo actualizar el contenido?" answer="SÃ­. TendrÃ¡s acceso a un panel intuitivo para gestionar tus fotos y textos." index={1} />
            <FAQItem question="Â¿Existe permanencia mÃ­nima?" answer="No. Creemos en la calidad de nuestro servicio, por lo que no atamos a nuestros clientes con contratos forzosos." index={2} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40 bg-white text-center dark:bg-stone-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200/50 dark:bg-stone-800/50 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] dark:text-white">Â¿Listo para escalar?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto font-light dark:text-stone-400">Ãšnete a los hoteles que ya estÃ¡n recibiendo reservas directas hoy mismo.</motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <WhatsAppButton text="Comenzar Ahora" className="px-12 md:px-16 py-6 text-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]" size="large" />
          </motion.div>
          <div className="flex justify-center gap-8 mt-10 text-sm text-stone-400 flex-wrap">
            <span className="flex items-center gap-2"><Shield size={16} /> SSL Seguro</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> Sin contrato</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Soporte 24/7</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-white/5 py-16 dark:bg-stone-900 dark:border-stone-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap size={24} className="fill-stone-950" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-2xl dark:text-stone-400">FastPagePro</span>
            </div>
            <div className="flex gap-6 text-stone-500">
              <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="hover:text-white transition-colors"><Globe size={24} /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="hover:text-white transition-colors"><MessageCircle size={24} /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="hover:text-white transition-colors"><Star size={24} /></motion.a>
            </div>
            <div className="text-stone-500 text-sm dark:text-stone-400">Â© 2024 FastPagePro. Todos los derechos reservados.</div>
          </div>
        </div>
      </footer>

      {/* Advanced Widget */}
      <AdvancedWidget />
    </div>
  );
}
