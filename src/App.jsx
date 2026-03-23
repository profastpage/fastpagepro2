import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
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
  Hotel,
  Wifi,
  Battery,
  Signal,
  Send,
  Percent,
  ExternalLink
} from 'lucide-react';

const _MOTION = motion;

// --- Constants ---
const WHATSAPP_NUMBER = "51919662011";
const PROFASTPAGE_EMAIL = "profastpage@gmail.com";
const LEADS_WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL || "";
const WA_EMOJI = {
  wave: "👋",
  check: "✅",
  hotel: "🏨",
  user: "👤",
  email: "📧",
  phone: "📱",
  calendar: "📅",
  moon: "🌙",
  guests: "👥",
  chat: "💬"
};
const IMAGE_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%230b0b0f'/><stop offset='1' stop-color='%23181a24'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%23f8fafc' font-family='Arial, sans-serif' font-size='56' font-weight='700'>Fast Page Pro</text><text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='Arial, sans-serif' font-size='26'>Webs y reservas por WhatsApp</text></svg>";
const handleImageFallback = (event) => {
  if (event.currentTarget.src !== IMAGE_FALLBACK) {
    event.currentTarget.src = IMAGE_FALLBACK;
  }
};

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
];

const NAV_ITEMS = [
  { id: "mockup-celular", es: "Demo", en: "Demo" },
  { id: "portafolio", es: "Portafolio", en: "Portfolio" },
  { id: "beneficios", es: "Beneficios", en: "Benefits" },
  { id: "testimonios", es: "Testimonios", en: "Testimonials" },
  { id: "planes", es: "Planes", en: "Plans" },
  { id: "faq", es: "FAQ", en: "FAQ" }
];

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

const PORTFOLIO_BY_LANG = {
  es: [
    {
      title: "Vuelo 78 Hotel",
      location: "Lima, Perú",
      category: "Hotel Boutique",
      description: "Web de reservas directas por WhatsApp con disponibilidad por fechas y automatización de seguimiento.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel.com/"
    },
    {
      title: "Killa Lodge",
      location: "Cusco, Perú",
      category: "Lodge Turístico",
      description: "Sistema de reservas para tours y habitaciones, integrado con WhatsApp y formularios inteligentes.",
      image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    },
    {
      title: "Amazonia Eco Stay",
      location: "Iquitos, Perú",
      category: "Hospedaje Ecológico",
      description: "Landing de conversión con velocidad optimizada y módulo de cotización rápida para huéspedes.",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    },
    {
      title: "Pariwana Business Hotel",
      location: "Piura, Perú",
      category: "Hotel Corporativo",
      description: "Flujo de reservas para clientes corporativos con confirmación automática y seguimiento comercial.",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    }
  ],
  en: [
    {
      title: "Vuelo 78 Hotel",
      location: "Lima, Peru",
      category: "Boutique Hotel",
      description: "Direct-booking website via WhatsApp with date-based availability and automated follow-up.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel.com/"
    },
    {
      title: "Killa Lodge",
      location: "Cusco, Peru",
      category: "Tourist Lodge",
      description: "Booking system for tours and rooms, integrated with WhatsApp and smart lead forms.",
      image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    },
    {
      title: "Amazonia Eco Stay",
      location: "Iquitos, Peru",
      category: "Eco Lodge",
      description: "Conversion-focused landing page with high speed and quick quote module for guests.",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    },
    {
      title: "Pariwana Business Hotel",
      location: "Piura, Peru",
      category: "Corporate Hotel",
      description: "Corporate booking flow with automatic confirmation and sales follow-up.",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "#"
    }
  ]
};

const TESTIMONIALS_BY_LANG = {
  es: [
    { name: "Cesar", hotel: "Vuelo78Hotel-Perú", location: "Lima", text: "La plataforma es increíblemente rápida. Nuestros clientes prefieren reservar por WhatsApp ahora." },
    { name: "Ana Patricia Vega", hotel: "Cabañas del Valle", location: "Chachapoyas", text: "El diseño es elegante y profesional. Se adapta perfectamente a lo que buscábamos." },
    { name: "Roberto Sánchez", hotel: "Casa Killa Boutique", location: "Lima", text: "La automatización nos ha ahorrado horas de trabajo administrativo. Muy recomendado." },
    { name: "María Fernanda Torres", hotel: "Residencial El Golf", location: "Arequipa", text: "El soporte técnico es excelente. Siempre están disponibles para ayudarnos." },
    { name: "Jorge Luis Paredes", hotel: "Qorikilla Lodge", location: "Valle Sagrado", text: "Implementar los pagos con Yape y Plin fue muy sencillo. Las reservas aumentaron." },
    { name: "Sofia Ramirez", hotel: "Selva Verde Lodge", location: "Iquitos", text: "La velocidad de la página es impresionante. Nuestros huéspedes lo notan." },
    { name: "Miguel Ángel Castro", hotel: "Hacienda San José", location: "Chincha", text: "El panel de administración es muy intuitivo. Podemos gestionar todo fácilmente." },
    { name: "Lucia Fernández", hotel: "Tambopata Research", location: "Madre de Dios", text: "Una solución completa. Desde el SEO hasta la pasarela de pagos, todo funciona." },
    { name: "Pedro Castillo", hotel: "Katari Hotel", location: "Puno", text: "La personalización del diseño superó nuestras expectativas. Se ve muy premium." },
    { name: "Carmen Ortiz", hotel: "Sol y Luna Lodge", location: "Urubamba", text: "La integración con Google Maps y Calendar nos facilita la logística diaria." },
    { name: "Fernando Diaz", hotel: "Tierra Viva", location: "Cusco", text: "La optimización SEO ha mejorado mucho nuestra visibilidad en búsquedas locales." },
    { name: "Gabriela Mendez", hotel: "Aranwa Suites", location: "Lima", text: "El sistema de reservas directas es robusto y seguro. Confiamos plenamente en la plataforma." },
    { name: "Ricardo Flores", hotel: "Terra Andina", location: "Cusco", text: "La aplicación PWA es un plus increíble para nuestros clientes recurrentes." },
    { name: "Elena Gomez", hotel: "Pariwana Hostel", location: "Lima", text: "Profesionalismo puro. La web carga instantáneamente incluso en zonas con mala señal." }
  ],
  en: [
    { name: "Cesar", hotel: "Vuelo78Hotel-Peru", location: "Lima", text: "The platform is incredibly fast. Our guests now prefer booking through WhatsApp." },
    { name: "Ana Patricia Vega", hotel: "Cabañas del Valle", location: "Chachapoyas", text: "The design is elegant and professional. It perfectly matches what we needed." },
    { name: "Roberto Sánchez", hotel: "Casa Killa Boutique", location: "Lima", text: "Automation has saved us hours of administrative work. Highly recommended." },
    { name: "María Fernanda Torres", hotel: "Residencial El Golf", location: "Arequipa", text: "Technical support is excellent. They are always available when we need help." },
    { name: "Jorge Luis Paredes", hotel: "Qorikilla Lodge", location: "Valle Sagrado", text: "Integrating Yape and Plin payments was very easy. Bookings increased." },
    { name: "Sofia Ramirez", hotel: "Selva Verde Lodge", location: "Iquitos", text: "The page speed is impressive. Our guests notice it immediately." },
    { name: "Miguel Ángel Castro", hotel: "Hacienda San José", location: "Chincha", text: "The admin panel is very intuitive. We can manage everything with ease." },
    { name: "Lucia Fernández", hotel: "Tambopata Research", location: "Madre de Dios", text: "A complete solution. From SEO to payments, everything works smoothly." },
    { name: "Pedro Castillo", hotel: "Katari Hotel", location: "Puno", text: "The design customization exceeded our expectations. It looks truly premium." },
    { name: "Carmen Ortiz", hotel: "Sol y Luna Lodge", location: "Urubamba", text: "Google Maps and Calendar integration makes our daily logistics easier." },
    { name: "Fernando Diaz", hotel: "Tierra Viva", location: "Cusco", text: "SEO optimization significantly improved our visibility in local searches." },
    { name: "Gabriela Mendez", hotel: "Aranwa Suites", location: "Lima", text: "The direct booking system is robust and secure. We trust the platform fully." },
    { name: "Ricardo Flores", hotel: "Terra Andina", location: "Cusco", text: "The PWA app is a great advantage for our recurring guests." },
    { name: "Elena Gomez", hotel: "Pariwana Hostel", location: "Lima", text: "Pure professionalism. The website loads instantly, even in poor signal areas." }
  ]
};

const PLANS_BY_LANG = {
  es: [
    {
      name: "START",
      price: "700",
      period: "pago único",
      features: [
        "Hosting Rápido Incluido",
        "Botón Flotante de WhatsApp",
        "Sistema de Reservas Directo",
        "Personalización Básica de Marca",
        "Diseño Responsivo (Móvil/PC)",
        "Certificado SSL Seguro"
      ],
      highlight: false
    },
    {
      name: "PRO",
      price: "1200",
      period: "pago único",
      features: [
        "Todo lo del Plan START",
        "SEO Intermedio Optimizado",
        "Diseño Premium Personalizado",
        "Soporte Prioritario",
        "Integración Google Maps",
        "Configuración de Cuentas",
        "Adaptación Tablet y PC",
        "Galería de Imágenes Avanzada"
      ],
      highlight: true
    },
    {
      name: "BUSINESS",
      price: "1700",
      period: "pago único",
      features: [
        "Todo lo del Plan PRO",
        "App PWA (Instalable)",
        "Panel Super Administración",
        "Hosting Ultra Rápido",
        "Soporte Inmediato 24/7",
        "Imágenes en Alta Calidad",
        "SEO Profesional Máximo",
        "Optimización 95%+ PageSpeed",
        "Pagos: Yape, Plin, Izipay",
        "Trabajo Prioritario"
      ],
      highlight: false
    }
  ],
  en: [
    {
      name: "START",
      price: "700",
      period: "one-time payment",
      features: [
        "Fast Hosting Included",
        "Floating WhatsApp Button",
        "Direct Booking System",
        "Basic Brand Customization",
        "Responsive Design (Mobile/Desktop)",
        "Secure SSL Certificate"
      ],
      highlight: false
    },
    {
      name: "PRO",
      price: "1200",
      period: "one-time payment",
      features: [
        "Everything in START",
        "Optimized Intermediate SEO",
        "Premium Custom Design",
        "Priority Support",
        "Google Maps Integration",
        "Account Setup",
        "Tablet and Desktop Adaptation",
        "Advanced Image Gallery"
      ],
      highlight: true
    },
    {
      name: "BUSINESS",
      price: "1700",
      period: "one-time payment",
      features: [
        "Everything in PRO",
        "Installable PWA App",
        "Super Admin Panel",
        "Ultra Fast Hosting",
        "Immediate 24/7 Support",
        "High-Quality Images",
        "Maximum Professional SEO",
        "95%+ PageSpeed Optimization",
        "Payments: Yape, Plin, Izipay",
        "Priority Delivery"
      ],
      highlight: false
    }
  ]
};

const COPY = {
  es: {
    navCta: "Agendar Demo",
    notificationTitle: "¡Nueva reserva recibida!",
    notificationSubtitle: "Hotel Vista - hace 2 minutos",
    heroBadge: "+500 hoteles confían",
    heroTitleTop: "Reservas Directas.",
    heroTitleBottom: "Sin Comisiones.",
    heroSubtitle: "La plataforma premium que convierte visitantes en huéspedes vía WhatsApp.",
    heroPrimaryCta: "Ver Demo Interactiva",
    heroPrimaryMsg: "Quiero ver la demo",
    heroSecondaryCta: "Hablar con Asesor",
    trustTitle: "Hoteles Asociados",
    stats: ["Más Reservas", "Hoteles Activos", "Comisión Ahorrada"],
    editorialWatch: "Ver cómo funciona",
    editorialTitle: "Recupera el control",
    editorialTitleAccent: "de tus márgenes.",
    editorialSubtitle: "Las agencias de viajes online se quedan con tu ganancia. Nosotros te devolvemos el 100%.",
    editorialCommissions: "Comisiones",
    editorialAutomation: "Automatización",
    roiTitle: "¿Cuánto estás perdiendo?",
    roiSubtitle: "Descubre tu ahorro con reservas directas",
    roiBadge: "Calculadora ROI",
    demoTitle: "Experiencia Fluida",
    demoSubtitle: "Diseñado para máxima conversión",
    liveDemoTitle: "Demo real de reservas por WhatsApp",
    liveDemoSubtitle: "Simula la experiencia de un huésped real y genera la reserva en un clic.",
    liveDemoCta: "Generar Reserva por WhatsApp",
    demoCards: [
      { title: "Atracción", desc: "Diseño visual de alto impacto que retiene al usuario", image: "https://images.pexels.com/photos/193948/pexels-photo-193948.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { title: "Interacción", desc: "Interfaz intuitiva que guía hacia las reservas", image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { title: "Conversión", desc: "Cierre de venta inmediato en tu WhatsApp", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" }
    ],
    portfolioTitle: "Portafolio de Proyectos",
    portfolioSubtitle: "Sitios y sistemas de reservas desarrollados para hoteles y negocios del Perú.",
    portfolioBadge: "Trabajos Reales",
    portfolioCta: "Ver Proyecto",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonialsSubtitle: "Experiencias reales de hoteles reales",
    testimonialsBadge: "Testimonios",
    pricingTitle: "Planes Profesionales",
    pricingSubtitle: "Inversión única para tu negocio",
    popularTag: "Más Popular",
    selectPlan: "Seleccionar Plan",
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Transparencia total antes de empezar",
    faq: [
      { q: "¿Necesito conocimientos técnicos?", a: "Absolutamente no. Nos encargamos de toda la infraestructura técnica, diseño y configuración." },
      { q: "¿Puedo actualizar el contenido?", a: "Sí. Tendrás acceso a un panel intuitivo para gestionar tus fotos y textos." },
      { q: "¿Existe permanencia mínima?", a: "No. Creemos en la calidad de nuestro servicio, por lo que no atamos a nuestros clientes con contratos forzosos." },
      { q: "¿Incluyen dominio y hosting?", a: "Sí. Podemos gestionar dominio, hosting y SSL para que tu web salga lista para vender desde el día 1." },
      { q: "¿En cuánto tiempo estará lista mi web?", a: "Depende del proyecto, pero en promedio entre 7 y 15 días hábiles con revisiones incluidas." }
    ],
    finalTitle: "¿Listo para escalar?",
    finalSubtitle: "Únete a los hoteles que ya están recibiendo reservas directas hoy mismo.",
    finalCta: "Comenzar Ahora",
    footerRights: "© 2026 Fast Page Pro. Todos los derechos reservados por Fast Page Pro.",
    tags: ["SSL Seguro", "Sin contrato", "Soporte 24/7"],
    widget: {
      assistant: "Asistente Virtual",
      howContact: "¿Cómo deseas contactarnos hoy?",
      scheduleMeet: "Agendar videollamada",
      scheduleCall: "Agendar llamada",
      directChat: "Chat Directo",
      talkNow: "Hablar con un asesor ahora",
      phoneCall: "Llamada Telefónica",
      back: "Volver",
      yourName: "Tu Nombre",
      yourGmail: "Tu Gmail",
      yourPhone: "Tu teléfono",
      date: "Fecha",
      time: "Hora",
      enterName: "Ingresa tu nombre",
      enterPhone: "Ej. +51 999 999 999",
      confirmMeeting: "Confirmar Reunión",
      confirmCall: "Confirmar Llamada",
      invalidDateTime: "Por favor selecciona una fecha y hora válidas",
      invalidPhone: "Ingresa un número de teléfono válido",
      userUnknown: "Usuario desconocido",
      defineLater: "Por definir",
      meetingNote: "Si el backend está configurado, la reunión se agenda y abre directo automáticamente.",
      saveLeadError: "No se pudo registrar el lead automático. Igual abriremos WhatsApp.",
      waDirect: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n${WA_EMOJI.check} *Objetivo:* Agendar una demo.`,
      waMeet: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero agendar una *reunión por Google Meet*.\n\n${WA_EMOJI.user} *Usuario:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Fecha y hora:* {{dateTime}}\n\nQuedo atento a su confirmación.`,
      waCall: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero agendar una *llamada telefónica*.\n\n${WA_EMOJI.user} *Usuario:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Fecha y hora preferente:* {{dateTime}}\n\nQuedo atento a su llamada.`
    }
  },
  en: {
    navCta: "Book Demo",
    notificationTitle: "New booking received!",
    notificationSubtitle: "Hotel Vista - 2 minutes ago",
    heroBadge: "+500 hotels trust us",
    heroTitleTop: "Direct Bookings.",
    heroTitleBottom: "No Commissions.",
    heroSubtitle: "The premium platform that turns visitors into guests through WhatsApp.",
    heroPrimaryCta: "See Interactive Demo",
    heroPrimaryMsg: "I want to see the demo",
    heroSecondaryCta: "Talk to an Advisor",
    trustTitle: "Partner Hotels",
    stats: ["More Bookings", "Active Hotels", "Commission Saved"],
    editorialWatch: "See how it works",
    editorialTitle: "Take back control",
    editorialTitleAccent: "of your margins.",
    editorialSubtitle: "Online travel agencies keep your profits. We help you keep 100%.",
    editorialCommissions: "Commissions",
    editorialAutomation: "Automation",
    roiTitle: "How much are you losing?",
    roiSubtitle: "Discover your savings with direct bookings",
    roiBadge: "ROI Calculator",
    demoTitle: "Seamless Experience",
    demoSubtitle: "Designed for maximum conversion",
    liveDemoTitle: "Real WhatsApp booking demo",
    liveDemoSubtitle: "Simulate a real guest flow and generate a reservation in one click.",
    liveDemoCta: "Generate WhatsApp Booking",
    demoCards: [
      { title: "Attraction", desc: "High-impact visual design that keeps users engaged", image: "https://images.pexels.com/photos/193948/pexels-photo-193948.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { title: "Interaction", desc: "Intuitive interface that guides users to bookings", image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { title: "Conversion", desc: "Instant sales closure directly on your WhatsApp", image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" }
    ],
    portfolioTitle: "Project Portfolio",
    portfolioSubtitle: "Websites and booking systems delivered for hotels and businesses in Peru.",
    portfolioBadge: "Real Work",
    portfolioCta: "View Project",
    testimonialsTitle: "What our clients say",
    testimonialsSubtitle: "Real experiences from real hotels",
    testimonialsBadge: "Testimonials",
    pricingTitle: "Professional Plans",
    pricingSubtitle: "One-time investment for your business",
    popularTag: "Most Popular",
    selectPlan: "Select Plan",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Full transparency before we start",
    faq: [
      { q: "Do I need technical knowledge?", a: "Absolutely not. We handle all infrastructure, design, and setup." },
      { q: "Can I update my content?", a: "Yes. You will get access to an intuitive panel to manage photos and text." },
      { q: "Is there a minimum contract?", a: "No. We believe in service quality, so we do not lock clients into forced contracts." },
      { q: "Do you include domain and hosting?", a: "Yes. We can handle domain, hosting and SSL so your site launches ready to sell." },
      { q: "How long does delivery take?", a: "Depending on the scope, most projects are delivered in 7 to 15 business days including revisions." }
    ],
    finalTitle: "Ready to scale?",
    finalSubtitle: "Join the hotels already getting direct bookings today.",
    finalCta: "Get Started Now",
    footerRights: "© 2026 Fast Page Pro. All rights reserved by Fast Page Pro.",
    tags: ["Secure SSL", "No contract", "24/7 support"],
    widget: {
      assistant: "Virtual Assistant",
      howContact: "How would you like to contact us today?",
      scheduleMeet: "Schedule video call",
      scheduleCall: "Schedule call",
      directChat: "Direct Chat",
      talkNow: "Talk to an advisor now",
      phoneCall: "Phone Call",
      back: "Back",
      yourName: "Your Name",
      yourGmail: "Your Gmail",
      yourPhone: "Your phone",
      date: "Date",
      time: "Time",
      enterName: "Enter your name",
      enterPhone: "Ex. +51 999 999 999",
      confirmMeeting: "Confirm Meeting",
      confirmCall: "Confirm Call",
      invalidDateTime: "Please select a valid date and time",
      invalidPhone: "Please enter a valid phone number",
      userUnknown: "Unknown user",
      defineLater: "To be defined",
      meetingNote: "If backend is configured, the meeting is scheduled and opened automatically.",
      saveLeadError: "Lead auto-save failed. We will still open WhatsApp.",
      waDirect: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want information about *websites and WhatsApp booking systems*.\n\n${WA_EMOJI.check} *Goal:* Book a demo.`,
      waMeet: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want to schedule a *Google Meet call*.\n\n${WA_EMOJI.user} *User:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Date and time:* {{dateTime}}\n\nWaiting for your confirmation.`,
      waCall: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want to schedule a *phone call*.\n\n${WA_EMOJI.user} *User:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Preferred date and time:* {{dateTime}}\n\nWaiting for your call.`
    }
  }
};

// --- Helper Components ---

const WhatsAppButton = ({ text, message, href, variant = "primary", className = "", onClick, size = "normal" }) => {
  const defaultMessage = `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n${WA_EMOJI.check} *Objetivo:* Agendar una demo\n${WA_EMOJI.hotel} *Negocio:* Por definir\n\nQuedo atento.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage).replace(/%20/g, ' ')}`;
  const finalHref = href || url;
  const isExternalLink = /^https?:\/\//.test(finalHref);
  
  const sizeClasses = {
    small: "px-6 py-3 text-xs",
    normal: "px-8 py-4 md:px-10 md:py-5 text-sm md:text-base",
    large: "px-12 py-6 text-lg"
  };
  
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group";
  
  // Updated variants: Removed gold, kept Silver/White/Black
  const variants = {
    primary: "bg-stone-950 text-white hover:bg-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200",
    outline: "bg-transparent border border-stone-200 text-stone-900 hover:bg-stone-50 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800",
    dark: "bg-stone-950 text-white hover:bg-stone-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:bg-white dark:text-stone-950"
  };

  return (
    <motion.a 
      href={finalHref}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
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

// --- NEW: Infinite Logo Carousel (Minimalist Deluxe) ---
const InfiniteLogoCarousel = () => {
  const logos = [
    "Vuelo 78 Hotel",
    "Casa Killa",
    "Qorikilla Lodge",
    "Tambopata Research",
    "Sol y Luna",
    "Tierra Viva",
    "Terra Andina",
    "Pariwana",
  ];

  return (
    <div className="relative overflow-hidden bg-stone-950 dark:bg-stone-900 py-16 border-y border-white/5">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none" />

      {/* Carousel Track */}
      <motion.div
        className="flex gap-20 md:gap-32"
        animate={{ x: [0, -960] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <motion.div
            key={`${logo}-${index}`}
            initial={{ opacity: 0.4 }}
            whileInView={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <span className="text-white/60 hover:text-white text-lg md:text-xl font-medium tracking-wide transition-all duration-300">
              {logo}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Animated Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4
            }}
            className="w-1.5 h-1.5 rounded-full bg-white/30"
          />
        ))}
      </div>
    </div>
  );
};

// --- Live Demo with Phone Mockup ---
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
                  <div className="text-green-400 text-xs">En línea</div>
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

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
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
              {/* Check-in Date - Full block clickable */}
              <div
                onClick={() => checkInRef.current?.showPicker()}
                className="cursor-pointer group"
              >
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                  {language === "es" ? "📅 Fecha check-in" : "📅 Check-in date"}
                </label>
                <div className="relative">
                  <input
                    ref={checkInRef}
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all [color-scheme:light] dark:[color-scheme:dark] pointer-events-none"
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 group-hover:text-green-500 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Nights - Full block clickable with +/- buttons */}
              <div
                onClick={() => nightsRef.current?.focus()}
                className="cursor-pointer group"
              >
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
                    className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pointer-events-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-auto">
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

            {/* Guests - Full block clickable with +/- buttons */}
            <div
              onClick={() => guestsRef.current?.focus()}
              className="cursor-pointer group"
            >
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
                  className="w-full px-4 py-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pointer-events-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-auto">
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

// Updated Testimonial Card (No Quote Icon)
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="min-w-[280px] md:min-w-[400px] bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col h-[280px]"
    >
      <div className="flex-1">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-stone-900 dark:text-white fill-stone-900 dark:fill-white" />
          ))}
        </div>
        <p className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed mb-6 line-clamp-4">
          "{testimonial.text}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
        <img
          src={testimonial.avatar || LATIN_AVATARS[index % LATIN_AVATARS.length]}
          alt={testimonial.name}
          onError={handleImageFallback}
          className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700"
          loading="lazy"
        />
        <div>
          <div className="font-bold text-stone-950 dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">{testimonial.hotel} • {testimonial.location}</div>
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

const QuantityField = ({ label, value, min, max, onChange }) => {
  const increment = () => onChange(Math.min(max, value + 1));
  const decrement = () => onChange(Math.max(min, value - 1));

  return (
    <div className="rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-4 py-3">
      <label className="text-xs text-stone-500 dark:text-stone-400">{label}</label>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-semibold text-stone-900 dark:text-white">{value}</span>
        <div className="flex flex-col">
          <button
            type="button"
            aria-label={`Incrementar ${label}`}
            onClick={increment}
            className="w-8 h-6 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            aria-label={`Disminuir ${label}`}
            onClick={decrement}
            className="w-8 h-6 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center mt-1 transition-colors"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ConversionDemo = ({ language, copy }) => {
  const businessName = "Fast Page Pro";
  const businessPhone = "+51 919 662 011";
  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  const businessPhoneDigits = businessPhone.replace(/[^\d]/g, "");
  const canGenerate = businessName.trim() && guestName.trim() && businessPhoneDigits.length >= 8 && checkIn && nights > 0 && guests > 0;
  const formattedCheckIn = checkIn
    ? new Date(`${checkIn}T00:00:00`).toLocaleDateString(language === "es" ? "es-PE" : "en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : language === "es"
      ? "Por definir"
      : "To be defined";

  const messageEs = `Hola ${WA_EMOJI.wave}
Soy *${guestName}* y quiero reservar en *${businessName}*.

${WA_EMOJI.calendar} *Check-in:* ${formattedCheckIn}
${WA_EMOJI.moon} *Noches:* ${nights}
${WA_EMOJI.guests} *Huéspedes:* ${guests}
${WA_EMOJI.chat} *Canal:* Reserva por WhatsApp

¿Podrían confirmarme disponibilidad y tarifa final, por favor?`;

  const messageEn = `Hi ${WA_EMOJI.wave}
I'm *${guestName}* and I want to book at *${businessName}*.

${WA_EMOJI.calendar} *Check-in:* ${formattedCheckIn}
${WA_EMOJI.moon} *Nights:* ${nights}
${WA_EMOJI.guests} *Guests:* ${guests}
${WA_EMOJI.chat} *Channel:* WhatsApp booking

Could you please confirm availability and final rate?`;

  const demoMessage = language === "es" ? messageEs : messageEn;
  const previewTitle = language === "es" ? "Vista previa del mensaje" : "Message preview";
  const businessPhoneLabel = language === "es" ? "Número destino del negocio" : "Business destination number";

  return (
    <div id="demo-interactiva" className="max-w-5xl mx-auto mt-12 md:mt-16 grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
      <div className="bg-stone-100 dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-stone-800 p-6 md:p-8">
        <h3 className="text-3xl md:text-3xl font-bold mb-3 dark:text-white text-center lg:text-left">{copy.liveDemoTitle}</h3>
        <p className="text-stone-500 dark:text-stone-400 mb-8 text-center lg:text-left">{copy.liveDemoSubtitle}</p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={businessName}
              readOnly
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-3 text-stone-900 dark:text-white focus:outline-none"
            />
            <input
              type="tel"
              value={businessPhone}
              readOnly
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-3 text-stone-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder={language === "es" ? "👤 Nombre del cliente" : "👤 Guest name"}
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-4 py-2">
              <label className="text-xs text-stone-500 dark:text-stone-400">{language === "es" ? "Fecha de ingreso" : "Check-in date"}</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-stone-900 dark:text-white focus:outline-none [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <QuantityField
              label={language === "es" ? "Noches" : "Nights"}
              value={nights}
              min={1}
              max={30}
              onChange={setNights}
            />
            <QuantityField
              label={language === "es" ? "Huéspedes" : "Guests"}
              value={guests}
              min={1}
              max={10}
              onChange={setGuests}
            />
          </div>
        </div>

        <a
          href={canGenerate ? `https://wa.me/${businessPhoneDigits}?text=${encodeURIComponent(demoMessage).replace(/%20/g, ' ')}` : "#"}
          target="_blank"
          rel="noreferrer noopener"
          className={`mt-6 inline-flex w-full h-[60px] justify-center items-center rounded-full px-6 text-base font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] ${canGenerate ? "bg-stone-950 text-white hover:bg-stone-800" : "bg-stone-300 text-stone-500 cursor-not-allowed pointer-events-none"}`}
        >
          {copy.liveDemoCta}
        </a>
      </div>

      <div className="bg-stone-950 rounded-[2rem] border border-stone-800 p-6 md:p-8 text-white">
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3">{language === "es" ? "Vista previa del flujo" : "Flow preview"}</div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-semibold">{language === "es" ? "1. Cliente completa formulario" : "1. Guest completes the form"}</div>
            <div className="text-sm text-stone-400">{language === "es" ? "Se capturan check-in, noches y huéspedes en segundos." : "Check-in, nights and guests are captured in seconds."}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-semibold">{language === "es" ? "2. WhatsApp del negocio abre directo" : "2. Business WhatsApp opens directly"}</div>
            <div className="text-sm text-stone-400">{language === "es" ? "El mensaje sale limpio, con emojis y datos listos para responder." : "A clean message opens with emojis and ready-to-reply data."}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-semibold">{language === "es" ? "3. Conversión inmediata" : "3. Immediate conversion"}</div>
            <div className="text-sm text-stone-400">{language === "es" ? "El prospecto pasa de visita a reserva real sin fricción." : "The lead moves from visit to real booking without friction."}</div>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <div className="text-xs uppercase tracking-widest text-emerald-300 mb-2">{businessPhoneLabel}</div>
            <div className="font-semibold text-emerald-200">{businessPhoneDigits || (language === "es" ? "Ingresa un número del negocio" : "Enter a business number")}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2">{previewTitle}</div>
            <pre className="whitespace-pre-wrap text-sm text-stone-300 leading-relaxed font-sans">{demoMessage}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ copy, projects }) => (
  <section id="portafolio" className="py-32 md:py-40 bg-white dark:bg-stone-950">
    <div className="container mx-auto px-4">
      <SectionTitle title={copy.portfolioTitle} subtitle={copy.portfolioSubtitle} badge={copy.portfolioBadge} />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={`${project.title}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="group rounded-[1.75rem] overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={project.image} alt={project.title} onError={handleImageFallback} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">{project.category}</div>
              <h3 className="text-xl font-bold text-stone-950 dark:text-white">{project.title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">{project.location}</p>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-5">{project.description}</p>
              <a href={project.link} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                {copy.portfolioCta} <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const ROICalculator = ({ language, copy }) => {
  const [reservas, setReservas] = useState(50);
  const [ticket, setTicket] = useState(300);
  const ahorro = Math.round(reservas * ticket * 0.18);
  const currency = language === "es" ? "S/" : "$";
  const yearlySuffix = language === "es" ? "al año" : "per year";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-stone-950 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center relative z-10">{copy.roiBadge}</h3>
      <div className="grid md:grid-cols-2 gap-8 mb-8 relative z-10">
        <div>
          <label className="block text-sm text-stone-400 mb-3 font-medium">{language === "es" ? "Reservas mensuales" : "Monthly bookings"}</label>
          <input type="range" min="10" max="200" value={reservas} onChange={(e) => setReservas(Number(e.target.value))} className="w-full accent-white h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer" />
          <div className="text-3xl font-bold mt-4 text-white">{reservas} <span className="text-lg text-stone-400">{language === "es" ? "reservas" : "bookings"}</span></div>
        </div>
        <div>
          <label className="block text-sm text-stone-400 mb-3 font-medium">{language === "es" ? "Ticket promedio" : "Average ticket"} ({currency})</label>
          <input type="range" min="100" max="1000" value={ticket} onChange={(e) => setTicket(Number(e.target.value))} className="w-full accent-white h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer" />
          <div className="text-3xl font-bold mt-4 text-white">{currency} {ticket}</div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center relative z-10 border border-white/10">
        <div className="text-sm text-stone-400 mb-3 font-medium uppercase tracking-wider">{language === "es" ? "Ahorro mensual estimado" : "Estimated monthly savings"}</div>
        <motion.div 
          className="text-5xl md:text-6xl font-bold text-green-400"
          key={ahorro}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {currency} {ahorro.toLocaleString()}
        </motion.div>
        <div className="text-sm text-stone-400 mt-4">{currency} {(ahorro * 12).toLocaleString()} {yearlySuffix}</div>
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
const AdvancedWidget = ({ language, widgetCopy, isOpen, setIsOpen }) => {
  const [step, setStep] = useState('main'); // main, meet-form, call-form
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const toggleWidget = () => setIsOpen((prev) => !prev);
  
  // Reset function
  const resetWidget = () => {
    setStep('main');
    setSelectedDate('');
    setSelectedTime('');
    setUserEmail('');
    setUserName('');
    setUserPhone('');
  };

  // Handle close button specifically
  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent triggering other clicks
    setIsOpen(false); // THIS IS THE KEY FIX
  };

  const handleBooking = (type) => {
    let message = "";
    const locale = language === "es" ? "es-PE" : "en-US";
    const formattedDateTime = selectedDate && selectedTime 
      ? new Date(`${selectedDate}T${selectedTime}`).toLocaleString(locale, { dateStyle: 'full', timeStyle: 'short' })
      : widgetCopy.defineLater;

    const userInfo = userName ? `${userName}` : widgetCopy.userUnknown;
    const cleanPhone = userPhone.trim();
    const validPhone = /^[+\d][\d\s-]{7,}$/.test(cleanPhone);
    const contactInfo = userEmail ? `\n${WA_EMOJI.email} Email: ${userEmail}` : "";
    const phoneInfo = cleanPhone ? `\n${WA_EMOJI.phone} ${language === "es" ? "Teléfono" : "Phone"}: ${cleanPhone}` : "";

    const saveLead = async (payload) => {
      if (!LEADS_WEBHOOK_URL) return { ok: false, skipped: true, data: {} };
      try {
        const res = await fetch(LEADS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        let data = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        return { ok: res.ok, skipped: false, data };
      } catch {
        return { ok: false, skipped: false, data: {} };
      }
    };

    const buildGoogleCalendarLink = (bookingType) => {
      const start = new Date(`${selectedDate}T${selectedTime}`);
      const end = new Date(start.getTime() + 30 * 60000);
      const formatGoogleDate = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

      const title = bookingType === "meet" ? "Fast Page Pro - Google Meet" : "Fast Page Pro - Phone Call";
      const details = [
        `Lead: ${userInfo}`,
        userEmail ? `Email: ${userEmail}` : null,
        cleanPhone ? `Phone: ${cleanPhone}` : null,
        `Requested from web (${language.toUpperCase()})`
      ]
        .filter(Boolean)
        .join("\n");

      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: title,
        dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
        details,
        add: PROFASTPAGE_EMAIL
      });

      if (bookingType === "meet") {
        params.set("location", "Google Meet");
      }

      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    if (type === 'direct') {
      message = widgetCopy.waDirect;
    } else if (type === 'meet') {
      if (!formattedDateTime || formattedDateTime.includes("Invalid")) {
        alert(widgetCopy.invalidDateTime);
        return;
      }
      if (!validPhone) {
        alert(widgetCopy.invalidPhone);
        return;
      }
      message = widgetCopy.waMeet.replace("{{user}}", userInfo).replace("{{contact}}", `${contactInfo}${phoneInfo}`).replace("{{dateTime}}", formattedDateTime);
    } else if (type === 'call') {
      if (!formattedDateTime || formattedDateTime.includes("Invalid")) {
        alert(widgetCopy.invalidDateTime);
        return;
      }
      if (!validPhone) {
        alert(widgetCopy.invalidPhone);
        return;
      }
      message = widgetCopy.waCall.replace("{{user}}", userInfo).replace("{{contact}}", `${contactInfo}${phoneInfo}`).replace("{{dateTime}}", formattedDateTime);
    }

    const submit = async () => {
      const payload = {
        type,
        language,
        name: userName,
        email: userEmail,
        phone: cleanPhone,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        source: "fastpagepro-widget"
      };

      const leadResult = await saveLead(payload);
      if (!leadResult.ok && !leadResult.skipped) {
        alert(widgetCopy.saveLeadError);
      }

      if (type === "meet" || type === "call") {
        const apiMeetingUrl =
          leadResult.data?.meetUrl ||
          leadResult.data?.meetingUrl ||
          leadResult.data?.googleMeetUrl ||
          leadResult.data?.googleMeetLink ||
          "";

        const apiCalendarUrl =
          leadResult.data?.calendarEventUrl ||
          leadResult.data?.eventUrl ||
          "";

        if (type === "meet" && apiMeetingUrl) {
          window.open(apiMeetingUrl, "_blank");
        } else if (apiCalendarUrl) {
          window.open(apiCalendarUrl, "_blank");
        } else {
          const calendarLink = buildGoogleCalendarLink(type);
          window.open(calendarLink, "_blank");
        }
      }

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message).replace(/%20/g, ' ')}`;
      window.open(url, '_blank');
      resetWidget();
    };

    submit();
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3 md:gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[calc(100vw-1.5rem)] max-w-[340px] bg-stone-950 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-stone-700 overflow-hidden"
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
                  <p className="text-stone-400 text-xs">{widgetCopy.assistant}</p>
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
                  <p className="text-stone-300 text-sm mb-4 text-center">{widgetCopy.howContact}</p>
                  
                  <button onClick={() => setStep('meet')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <Video size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Google Meet</div>
                      <div className="text-xs text-stone-400">{widgetCopy.scheduleMeet}</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button onClick={() => setStep('call')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors group text-left">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                      <Phone size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">{widgetCopy.phoneCall}</div>
                      <div className="text-xs text-stone-400">{widgetCopy.scheduleCall}</div>
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
                      <div className="font-bold text-white text-sm">{widgetCopy.directChat}</div>
                      <div className="text-xs text-stone-400">{widgetCopy.talkNow}</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              )}

              {(step === 'meet' || step === 'call') && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <button onClick={() => setStep('main')} className="flex items-center gap-2 text-stone-400 hover:text-white text-sm">
                      <ChevronLeft size={16} /> {widgetCopy.back}
                    </button>
                    <span className="text-white font-bold text-sm">
                      {step === 'meet' ? 'Google Meet' : widgetCopy.phoneCall}
                    </span>
                  </div>
                  
                  {/* Inputs */}
                  <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-1">{widgetCopy.yourName}</label>
                      <input 
                        type="text" 
                        placeholder={widgetCopy.enterName}
                        className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white placeholder-stone-500 focus:border-stone-500 focus:outline-none"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    
                    {step === 'meet' && (
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">{widgetCopy.yourGmail}</label>
                        <input 
                          type="email" 
                          placeholder="ejemplo@gmail.com"
                          className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white placeholder-stone-500 focus:border-stone-500 focus:outline-none"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-stone-400 uppercase mb-1">{widgetCopy.yourPhone}</label>
                      <input
                        type="tel"
                        placeholder={widgetCopy.enterPhone}
                        className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white placeholder-stone-500 focus:border-stone-500 focus:outline-none"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">{widgetCopy.date}</label>
                        <input 
                          type="date" 
                          className="w-full bg-stone-900 border border-stone-600 rounded-lg p-2.5 text-sm text-white focus:border-stone-500 focus:outline-none [color-scheme:dark]"
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase mb-1">{widgetCopy.time}</label>
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
                    {step === 'meet' ? widgetCopy.confirmMeeting : widgetCopy.confirmCall}
                  </button>
                  {step === 'meet' && <p className="text-xs text-stone-400 text-center">{widgetCopy.meetingNote}</p>}
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
        className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)] flex items-center justify-center text-stone-900 z-50"
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
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [loadedHeroImages, setLoadedHeroImages] = useState(() => HERO_IMAGES.map(() => false));
  const [showNotification, setShowNotification] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return saved === 'dark' || (!saved && prefersDark);
    } catch {
      return false;
    }
  });
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  // Variable bookings counter - different each day
  const [todayBookings, setTodayBookings] = useState(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('bookingsDate');
    const lastBookings = localStorage.getItem('todayBookings');
    
    if (lastDate !== today) {
      const newBookings = Math.floor(Math.random() * 14) + 8; // 8-21 bookings
      localStorage.setItem('bookingsDate', today);
      localStorage.setItem('todayBookings', newBookings.toString());
      return newBookings;
    }
    return lastBookings ? parseInt(lastBookings) : Math.floor(Math.random() * 14) + 8;
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const copy = COPY[language];
  const testimonials = TESTIMONIALS_BY_LANG[language];
  const plans = PLANS_BY_LANG[language];
  const portfolioProjects = PORTFOLIO_BY_LANG[language];
  const navItems = NAV_ITEMS.map((item) => ({ id: item.id, label: item[language] }));

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDarkMode);
      }
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore localStorage/theme sync errors
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore localStorage language sync errors
    }
  }, [language]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const openAgendaWidget = (event) => {
    if (event) event.preventDefault();
    setMobileMenu(false);
    setIsWidgetOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      try {
        const totalScroll = document.documentElement.scrollTop;
        setScrolled(totalScroll > 50);
      } catch {
        // ignore scroll calculation errors
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    HERO_IMAGES.forEach((src, index) => {
      const image = new window.Image();
      image.src = src;
      image.onload = () => {
        setLoadedHeroImages((prev) => {
          if (prev[index]) return prev;
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
      image.onerror = () => {
        setLoadedHeroImages((prev) => {
          if (prev[index]) return prev;
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => {
        for (let step = 1; step <= HERO_IMAGES.length; step += 1) {
          const nextIndex = (prev + step) % HERO_IMAGES.length;
          if (loadedHeroImages[nextIndex]) return nextIndex;
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [loadedHeroImages]);

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
    } catch {
      // ignore smooth scroll errors
    }
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
            {navItems.map((item) => (
              <motion.a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} whileHover={{ y: -2 }} className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10">{item.label}</motion.a>
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
            <motion.button onClick={() => setMobileMenu(!mobileMenu)} whileTap={{ scale: 0.9 }} className="text-white w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
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
              {navItems.map((item, index) => (
                <motion.a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="text-3xl font-bold text-white py-4 border-b border-white/10">{item.label}</motion.a>
              ))}
              <WhatsAppButton text={copy.navCta} href="#" onClick={openAgendaWidget} variant="primary" className="w-full mt-8" size="large" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification - Enhanced */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="hidden md:flex fixed bottom-6 left-6 z-50 bg-white dark:bg-stone-900 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-5 items-center gap-4 border border-stone-100 dark:border-stone-800 min-w-[340px]"
          >
            <motion.div
              className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.6 }}
            >
              <Check className="text-white" size={28} strokeWidth={3} />
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-stone-950 text-sm dark:text-white">{copy.notificationTitle}</div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">● En vivo</span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{copy.notificationSubtitle}</div>
              <div className="text-xs text-stone-400 dark:text-stone-500 mt-1">💰 Reserva: S/ 450 • 2 noches</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="top" className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          {HERO_IMAGES.map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt="Mockup de sistema de reservas"
              onError={handleImageFallback}
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{
                opacity: index === currentHeroImage ? 1 : 0,
                scale: index === currentHeroImage ? 1 : 1.04
              }}
              transition={{
                opacity: { duration: 0.9, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" }
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <motion.div className="relative z-20 w-full px-4 md:px-12 lg:px-24 text-center text-white flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto">
            <motion.div className="inline-block mb-12 mt-8 lg:mt-14 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" whileHover={{ scale: 1.05 }}>
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                <motion.div
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0.4)", "0 0 0 10px rgba(251, 191, 36, 0)", "0 0 0 0 rgba(251, 191, 36, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-yellow-400"
                />
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                🚀 Programa Piloto 2026
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-8 leading-[1.05]">
              {copy.heroTitleTop} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30">{copy.heroTitleBottom}</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-stone-300 mb-12 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
              {copy.heroSubtitle}
            </p>
            
            <div className="w-full max-w-xl mx-auto flex flex-col gap-3 sm:gap-4">
              <a
                href="#mockup-celular"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('mockup-celular');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="block w-full max-w-xs mx-auto md:max-w-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg"
              >
                {copy.heroPrimaryCta} →
              </a>
              <WhatsAppButton
                text={copy.heroSecondaryCta}
                variant="outline"
                className="w-full h-[56px] px-6 text-[15px] font-semibold border-[1.5px] !text-white !border-white hover:!bg-white/10"
              />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-16 flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-stone-400"><Shield size={16} className="text-green-400" /> {copy.tags[0]}</div>
              <div className="flex items-center gap-2 text-sm text-stone-400"><Clock size={16} className="text-white" /> {copy.tags[2]}</div>
              <div className="flex items-center gap-2 text-sm text-stone-400"><Award size={16} className="text-blue-400" /> {language === 'es' ? 'Garantía 30 días' : '30-day guarantee'}</div>
            </motion.div>

            {/* Live Booking Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-sm text-stone-300">
                <span className="font-bold text-white">{todayBookings}</span> {language === 'es' ? 'reservas hoy' : 'bookings today'}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Badges - Infinite Carousel (Minimalist Deluxe) */}
      <InfiniteLogoCarousel />

      {/* Stats */}
      <section id="beneficios" className="py-24 md:py-32 bg-stone-950 dark:bg-stone-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StatCard icon={Zap} value={40} suffix="%" label={copy.stats[0]} delay={0} />
            <StatCard icon={Users} value={500} suffix="+" label={copy.stats[1]} delay={0.2} />
            <StatCard icon={BarChart3} value={18} suffix="%" label={copy.stats[2]} delay={0.4} />
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section id="editorial" className="py-32 md:py-40 bg-stone-950 text-white dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative aspect-video rounded-[2rem] overflow-hidden w-full max-w-5xl mb-16 border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] group">
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop" alt="Hotel tech experience" onError={handleImageFallback} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div className="absolute bottom-8 left-8 right-8 flex items-center gap-4" whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <Play size={28} className="text-white ml-1" />
                </div>
                <span className="text-white font-medium text-lg">{copy.editorialWatch}</span>
                <ArrowRight size={20} className="text-white" />
              </motion.div>
            </motion.div>
            
            <div className="max-w-3xl">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{copy.editorialTitle} <span className="text-stone-500">{copy.editorialTitleAccent}</span></h3>
              <p className="text-xl text-stone-400 mb-8 leading-relaxed">{copy.editorialSubtitle}</p>
              <div className="flex justify-center gap-16 pt-8 border-t border-white/10">
                <div><div className="text-6xl font-bold">0%</div><div className="text-xs text-stone-500 uppercase tracking-wider mt-2">{copy.editorialCommissions}</div></div>
                <div><div className="text-6xl font-bold">24/7</div><div className="text-xs text-stone-500 uppercase tracking-wider mt-2">{copy.editorialAutomation}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-32 md:py-40 bg-stone-100 dark:bg-stone-800">
        <div className="container mx-auto px-4">
          <SectionTitle title={copy.roiTitle} subtitle={copy.roiSubtitle} badge={copy.roiBadge} />
          <div className="max-w-3xl mx-auto"><ROICalculator language={language} copy={copy} /></div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo-en-vivo" className="py-32 md:py-40 bg-white dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <SectionTitle title={copy.demoTitle} subtitle={copy.demoSubtitle} />
          <div className="max-w-4xl mx-auto mb-14">
            <motion.div initial={{ opacity: 0, y: 80, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-[2rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] overflow-hidden border dark:border-stone-800" style={{ perspective: 1000 }}>
              <img src="/images/02-demo-en-vivo/Experiencia-Fluida-principal.png" alt="Experiencia Fluida - Demo Fast Page Pro" onError={handleImageFallback} className="w-full aspect-video object-cover" />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {copy.demoCards.map((step, i) => {
              // Map card titles to image filenames
              const imageMap = {
                "Atracción": "/images/02-demo-en-vivo/Experiencia-Fluida-principal.png",
                "Interacción": "/images/02-demo-en-vivo/Experiencia-Fluida-principal.png",
                "Conversión": "/images/02-demo-en-vivo/conversión.png"
              };
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white dark:bg-stone-900 rounded-[2rem] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 group"
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={imageMap[step.title] || step.image}
                      alt={step.title}
                      onError={handleImageFallback}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h4 className="text-xl md:text-2xl font-bold mb-3 dark:text-white">{step.title}</h4>
                    <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm md:text-base">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Live Demo with Phone Mockup */}
          <div id="mockup-celular">
            <PhoneMockupDemo language={language} />
          </div>
        </div>
      </section>

      <PortfolioSection copy={copy} projects={portfolioProjects} />

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop"
        ].map((src, i) => (
          <motion.div key={i} className="aspect-square overflow-hidden group relative" whileHover={{ scale: 1.02 }}>
            <img src={src} alt="Gallery" onError={handleImageFallback} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIALS - Horizontal Scroll Carousel */}
      <section id="testimonios" className="py-32 md:py-40 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle title={copy.testimonialsTitle} subtitle={copy.testimonialsSubtitle} badge={copy.testimonialsBadge} />
          
          {/* Horizontal Scroll Container */}
          <div className="relative w-full overflow-hidden pb-8">
            <motion.div 
              className="flex gap-6"
              drag="x"
              dragConstraints={{ left: -((testimonials.length * 380) - window.innerWidth), right: 0 }}
              dragElastic={0.1}
              dragTransition={{ power: 0.5, timeConstant: 300 }}
            >
              {testimonials.map((t, i) => (
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
          <SectionTitle title={copy.pricingTitle} subtitle={copy.pricingSubtitle} />
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12 md:mt-20">
            {plans.map((plan, i) => {
              const mpLinks = {
                START: "https://mpago.la/2jScw4A",
                PRO: "https://mpago.la/28BQCLQ",
                BUSINESS: "https://mpago.la/1GY3yPf"
              };
              const cuotas = {
                START: "233.33",
                PRO: "400",
                BUSINESS: "566.67"
              };
              
              return (
                <motion.div
                  key={i}
                  className={`relative p-8 md:p-10 rounded-[2.5rem] border text-center flex flex-col ${plan.highlight ? 'bg-white text-stone-950 scale-105 shadow-[0_50px_100px_-30px_rgba(255,255,255,0.15)] z-10' : 'bg-stone-900/50 border-stone-800'}`}
                  whileHover={{ y: -10, scale: plan.highlight ? 1.07 : 1.03 }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-stone-950 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                      {copy.popularTag}
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
                  <a
                    href={mpLinks[plan.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group ${plan.highlight ? 'bg-white text-stone-950 hover:bg-stone-100 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]' : 'bg-transparent border border-white/30 text-white hover:bg-white/10 dark:border-white/30 dark:text-white'} px-8 py-4 md:px-10 md:py-5 text-sm md:text-base`}
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      {copy.selectPlan}
                      {!plan.highlight && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                  </a>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-stone-400">💳 3 cuotas sin interés: <span className="font-semibold">S/ {cuotas[plan.name]}/mes</span></p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 md:py-40 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionTitle title={copy.faqTitle} subtitle={copy.faqSubtitle} />
          <div className="mt-12">
            {copy.faq.map((item, index) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40 bg-white text-center dark:bg-stone-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200/50 dark:bg-stone-800/50 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] dark:text-white">{copy.finalTitle}</motion.h2>
          <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto font-light dark:text-stone-400">{copy.finalSubtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <WhatsAppButton text={copy.finalCta} className="px-12 md:px-16 py-6 text-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]" size="large" />
          </motion.div>
          <div className="flex justify-center gap-8 mt-10 text-sm text-stone-400 flex-wrap">
            <span className="flex items-center gap-2"><Shield size={16} /> {copy.tags[0]}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {copy.tags[1]}</span>
            <span className="flex items-center gap-2"><Clock size={16} /> {copy.tags[2]}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-white/5 py-16 dark:bg-stone-900 dark:border-stone-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 text-center">
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
            <div className="text-stone-500 text-sm dark:text-stone-400">© 2026 FastPagePro - Fabio Herrera, Fundador. Todos los derechos reservados.</div>
          </div>
        </div>
      </footer>

      {/* Advanced Widget */}
      <AdvancedWidget language={language} widgetCopy={copy.widget} isOpen={isWidgetOpen} setIsOpen={setIsWidgetOpen} />
    </div>
  );
}


