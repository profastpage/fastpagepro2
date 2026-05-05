import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
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
  ChevronLeft,
  ChevronRight,
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
  Hotel,
  Wifi,
  Battery,
  Signal,
  Send,
  Percent,
  ExternalLink,
  Monitor,
  ShoppingCart,
  Layers,
  Code,
  Palette,
  Filter,
  Search,
  Rocket,
  FlaskConical,
  FileText,
  MapPin,
  Heart
} from 'lucide-react';

const _MOTION = motion;

// --- Constants ---
const WHATSAPP_NUMBER = "51933667414";
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
  { id: "portafolio", es: "Portafolio", en: "Portfolio" },
  { id: "servicios", es: "Servicios", en: "Services" },
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

const PORTFOLIO_CATEGORIES = {
  es: ["Todos", "Web Profesional", "Tienda Online", "App Móvil", "Proyecto Personalizado"],
  en: ["All", "Professional Web", "Online Store", "Mobile App", "Custom Project"]
};

const PORTFOLIO_BY_LANG = {
  es: [
    {
      title: "Vuelo 78 Hotel",
      location: "Tarapoto, Perú",
      category: "Web Profesional",
      type: "web",
      description: "Sistema de reservas directas por WhatsApp con disponibilidad por fechas y respuesta automatizada del hotel.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "Amazonia Eco Stay",
      location: "Iquitos, Perú",
      category: "Web Profesional",
      type: "web",
      description: "Landing de alta conversión con experiencia visual inmersiva y sistema de reservas rápidas por WhatsApp.",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://amazonia-eco-stay.vercel.app/"
    },
    {
      title: "La Casona Gourmet",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      description: "Sistema de reservas y pedidos directos por WhatsApp con menú visual optimizado para aumentar ventas.",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://la-casa-gourmet.vercel.app/"
    },
    {
      title: "Growth Consulting Perú",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      description: "Sistema de captación de clientes y agendamiento automático por WhatsApp enfocado en generar leads calificados.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://growth-consulting-peru.vercel.app/"
    },
    {
      title: "Andina Shop",
      location: "Cusco, Perú",
      category: "Tienda Online",
      type: "tienda",
      description: "E-commerce completo con catálogo de productos artesanales, carrito de compras y pasarela de pagos integrada.",
      image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "FitLife App",
      location: "Lima, Perú",
      category: "App Móvil",
      type: "app",
      description: "Aplicación móvil de seguimiento de entrenamiento con planes personalizados, progreso en tiempo real y notificaciones push.",
      image: "https://images.pexels.com/photos/4668548/pexels-photo-4668548.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "TechFlow Dashboard",
      location: "Remoto, Latam",
      category: "Proyecto Personalizado",
      type: "custom",
      description: "Panel de control empresarial con métricas en tiempo real, reportes automatizados y gestión de equipos integrada.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "GastroMarket",
      location: "Arequipa, Perú",
      category: "Tienda Online",
      type: "tienda",
      description: "Plataforma de delivery gastronómico con menús interactivos, tracking de pedidos y pasarela Yape/Plin integrada.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    }
  ],
  en: [
    {
      title: "Vuelo 78 Hotel",
      location: "Tarapoto, Peru",
      category: "Professional Web",
      type: "web",
      description: "Direct booking system via WhatsApp with date-based availability and automated hotel response.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "Amazonia Eco Stay",
      location: "Iquitos, Peru",
      category: "Professional Web",
      type: "web",
      description: "High-conversion landing page with immersive visual experience and fast WhatsApp booking system.",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://amazonia-eco-stay.vercel.app/"
    },
    {
      title: "La Casona Gourmet",
      location: "Lima, Peru",
      category: "Online Store",
      type: "tienda",
      description: "Reservation and direct order system via WhatsApp with visual menu optimized to increase sales.",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://la-casa-gourmet.vercel.app/"
    },
    {
      title: "Growth Consulting Peru",
      location: "Lima, Peru",
      category: "Professional Web",
      type: "web",
      description: "Client acquisition and automatic scheduling system via WhatsApp focused on generating qualified leads.",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://growth-consulting-peru.vercel.app/"
    },
    {
      title: "Andina Shop",
      location: "Cusco, Peru",
      category: "Online Store",
      type: "tienda",
      description: "Complete e-commerce with artisan product catalog, shopping cart and integrated payment gateway.",
      image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "FitLife App",
      location: "Lima, Peru",
      category: "Mobile App",
      type: "app",
      description: "Mobile fitness tracking app with personalized plans, real-time progress and push notifications.",
      image: "https://images.pexels.com/photos/4668548/pexels-photo-4668548.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "TechFlow Dashboard",
      location: "Remote, Latam",
      category: "Custom Project",
      type: "custom",
      description: "Business control panel with real-time metrics, automated reports and integrated team management.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    },
    {
      title: "GastroMarket",
      location: "Arequipa, Peru",
      category: "Online Store",
      type: "tienda",
      description: "Gastronomic delivery platform with interactive menus, order tracking and Yape/Plin payment integration.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      link: "https://vuelo78hotel-demo.netlify.app/"
    }
  ]
};

const TESTIMONIALS_BY_LANG = {
  es: [
    { name: "Carlos Mendoza", hotel: "E-commerce Andina Shop", location: "Cusco", text: "La tienda online que nos crearon es increíble. Las ventas aumentaron 200% en el primer mes. Totalmente recomendados." },
    { name: "María Torres", hotel: "Landing Page Growth Consulting", location: "Lima", text: "Profesionales de verdad. La landing page la tuvieron lista en 48 horas y el diseño superó todas nuestras expectativas." },
    { name: "Roberto Sánchez", hotel: "App FitLife", location: "Lima", text: "La app móvil que desarrollaron funciona perfectamente. El equipo entiende de tecnología y de negocio." },
    { name: "Ana García", hotel: "Web Corporativa TechFlow", location: "Remoto", text: "El dashboard empresarial que nos crearon transformó nuestra gestión interna. Código limpio y muy bien documentado." },
    { name: "Jorge Paredes", hotel: "Tienda GastroMarket", location: "Arequipa", text: "La integración con Yape y Plin fue impecable. Nuestros clientes ahora pagan con un solo clic." },
    { name: "Lucía Fernández", hotel: "Web La Casona Gourmet", location: "Lima", text: "El sistema de pedidos por WhatsApp que implementaron nos ahorra horas de trabajo diario. Excelente soporte." }
  ],
  en: [
    { name: "Carlos Mendoza", hotel: "E-commerce Andina Shop", location: "Cusco", text: "The online store they built is incredible. Sales increased 200% in the first month. Highly recommended." },
    { name: "Maria Torres", hotel: "Landing Page Growth Consulting", location: "Lima", text: "True professionals. The landing page was ready in 48 hours and the design exceeded all our expectations." },
    { name: "Roberto Sanchez", hotel: "App FitLife", location: "Lima", text: "The mobile app they developed works perfectly. The team understands both technology and business." },
    { name: "Ana Garcia", hotel: "Corporate Website TechFlow", location: "Remote", text: "The business dashboard they created transformed our internal management. Clean code and well documented." },
    { name: "Jorge Paredes", hotel: "GastroMarket Store", location: "Arequipa", text: "The Yape and Plin integration was flawless. Our customers now pay with a single click." },
    { name: "Lucia Fernandez", hotel: "Web La Casona Gourmet", location: "Lima", text: "The WhatsApp ordering system they implemented saves us hours of work daily. Excellent support." }
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
    notificationTitle: "Nuevo proyecto entregado!",
    notificationSubtitle: "Tienda Online Andina Shop - hace 2 minutos",
    heroBadge: "Listo en 2-3 dias",
    heroTitleTop: "Paginas web profesionales",
    heroTitleBottom: "listas en 2-3 dias.",
    heroSubtitle: "Diseñamos y desarrollamos webs de alto impacto, tiendas online, apps moviles y proyectos a medida. Calidad premium, rendimiento extremo, entrega en tiempo record.",
    heroPrimaryCta: "Ver Portafolio",
    heroPrimaryMsg: "Quiero ver el portafolio",
    heroSecondaryCta: "Cotizar Mi Proyecto",
    trustTitle: "Negocios Asociados",
    stats: ["+45 proyectos entregados", "6+ años de experiencia", "100% satisfacción"],
    portfolioTitle: "Nuestro Portafolio",
    portfolioSubtitle: "Creamos páginas webs profesionales, tiendas online, aplicaciones móviles y proyectos personalizados",
    portfolioBadge: "Portafolio",
    portfolioCta: "Ver sistema en vivo ↗",
    portfolioFilterAll: "Todos",
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Soluciones digitales completas para impulsar tu negocio al siguiente nivel",
    servicesBadge: "Lo que hacemos",
    servicesWebTitle: "Páginas Web Profesionales",
    servicesWebDesc: "Diseñamos y desarrollamos sitios web de alto rendimiento que reflejan la identidad de tu marca. Landing pages, webs corporativas y sistemas de reservas con optimización SEO avanzada para posicionarte en Google desde el primer día.",
    servicesTiendaTitle: "Tiendas Online",
    servicesTiendaDesc: "E-commerce completo con catálogo de productos, carrito de compras, pasarelas de pago (Yape, Plin, Izipay) y gestión de inventario integrada. Tu tienda abierta 24/7 generando ventas automáticas.",
    servicesAppTitle: "Aplicaciones Móviles",
    servicesAppDesc: "Apps nativas y PWA (Progressive Web Apps) con experiencia de usuario fluida, notificaciones push, modo offline y rendimiento optimizado. Transformamos tu idea en una app que tus clientes amarán usar.",
    servicesCustomTitle: "Proyectos Personalizados",
    servicesCustomDesc: "Dashboards empresariales, sistemas de automatización, integraciones con APIs y soluciones a medida. Si lo puedes imaginar, lo podemos construir con tecnología de vanguardia.",
    processTitle: "Nuestro Proceso",
    processSubtitle: "Un flujo de trabajo probado que garantiza resultados profesionales en cada proyecto",
    processBadge: "Como Trabajamos",
    processSteps: [
      { num: "01", title: "Descubrimiento", desc: "Analizamos tu negocio, competencia y objetivos para crear una estrategia digital personalizada que maximice tus resultados." },
      { num: "02", title: "Diseño", desc: "Creamos wireframes y prototipos visuales de alta fidelidad. Cada pixel está pensado para convertir visitantes en clientes." },
      { num: "03", title: "Desarrollo", desc: "Construimos tu proyecto con las mejores tecnologías del mercado. Código limpio, rendimiento extremo y seguridad integrada." },
      { num: "04", title: "Pruebas", desc: "Testeamos en múltiples dispositivos y navegadores. Cada interacción funciona perfectamente antes del lanzamiento." },
      { num: "05", title: "Lanzamiento", desc: "Desplegamos tu proyecto en producción con dominio, hosting ultra rápido y SSL. Tu negocio online desde el día 1." }
    ],
    contactTitle: "Hablemos de tu Proyecto",
    contactSubtitle: "Cuéntanos tu idea y te responderemos en menos de 24 horas con una propuesta personalizada",
    contactBadge: "Contacto",
    contactName: "Tu Nombre",
    contactEmail: "Tu Email",
    contactPhone: "Tu Teléfono",
    contactMessage: "Cuéntanos sobre tu proyecto...",
    contactSend: "Enviar Mensaje",
    contactSending: "Enviando...",
    contactSuccess: "Mensaje enviado correctamente. Te contactaremos pronto.",
    contactError: "Error al enviar. Intenta de nuevo o escríbenos por WhatsApp.",
    casesTitle: "Casos de Éxito",
    casesSubtitle: "Resultados reales de negocios que confiaron en nosotros para transformar su presencia digital",
    casesBadge: "Historias de Éxito",
    casesReadMore: "Leer caso completo",
    techTitle: "Tecnologías que Usamos",
    techSubtitle: "Trabajamos con las herramientas más avanzadas del mercado para garantizar rendimiento, seguridad y escalabilidad",
    techBadge: "Tech Stack",
    testimonialsTitle: "Resultados reales",
    testimonialsSubtitle: "Negocios que ya están generando clientes con este sistema",
    testimonialsBadge: "Testimonios",
    pricingTitle: "Invierte una vez. Vende todos los días.",
    pricingSubtitle: "Un sistema que sigue generando clientes incluso cuando no estás",
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
    finalTitle: "Empieza a recibir clientes hoy",
    finalSubtitle: "Tus clientes ya están buscando. Solo necesitas el sistema correcto para convertirlos.",
    finalCta: "Comenzar ahora →",
    footerRights: "© 2026 Fast Page Pro. Todos los derechos reservados por Fast Page Pro.",
    tags: ["Calidad Premium", "Sin contratos forzosos", "Soporte incluido"],
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
    notificationTitle: "New project delivered!",
    notificationSubtitle: "Online Store Andina Shop - 2 minutes ago",
    heroBadge: "Ready in 2-3 Days",
    heroTitleTop: "Professional Websites",
    heroTitleBottom: "delivered in 2-3 days.",
    heroSubtitle: "We design and build high-impact websites, online stores, mobile apps and custom projects. Premium quality, extreme performance, record-breaking delivery.",
    heroPrimaryCta: "See Portfolio",
    heroPrimaryMsg: "I want to see the portfolio",
    heroSecondaryCta: "Get a Quote",
    trustTitle: "Partner Businesses",
    stats: ["+45 projects delivered", "6+ years experience", "100% satisfaction"],
    portfolioTitle: "Our Portfolio",
    portfolioSubtitle: "We create professional websites, online stores, mobile apps and custom projects",
    portfolioBadge: "Portfolio",
    portfolioCta: "See live system ↗",
    portfolioFilterAll: "All",
    servicesTitle: "Our Services",
    servicesSubtitle: "Complete digital solutions to take your business to the next level",
    servicesBadge: "What we do",
    servicesWebTitle: "Professional Websites",
    servicesWebDesc: "We design and develop high-performance websites that reflect your brand identity. Landing pages, corporate sites and booking systems with advanced SEO optimization to rank on Google from day one.",
    servicesTiendaTitle: "Online Stores",
    servicesTiendaDesc: "Complete e-commerce with product catalog, shopping cart, payment gateways (Yape, Plin, Izipay) and integrated inventory management. Your store open 24/7 generating automatic sales.",
    servicesAppTitle: "Mobile Applications",
    servicesAppDesc: "Native apps and PWAs with fluid user experience, push notifications, offline mode and optimized performance. We transform your idea into an app your customers will love using.",
    servicesCustomTitle: "Custom Projects",
    servicesCustomDesc: "Business dashboards, automation systems, API integrations and tailored solutions. If you can imagine it, we can build it with cutting-edge technology.",
    processTitle: "Our Process",
    processSubtitle: "A proven workflow that guarantees professional results in every project",
    processBadge: "How We Work",
    processSteps: [
      { num: "01", title: "Discovery", desc: "We analyze your business, competition and goals to create a custom digital strategy that maximizes your results." },
      { num: "02", title: "Design", desc: "We create high-fidelity wireframes and visual prototypes. Every pixel is designed to convert visitors into customers." },
      { num: "03", title: "Development", desc: "We build your project with the best technologies on the market. Clean code, extreme performance and built-in security." },
      { num: "04", title: "Testing", desc: "We test across multiple devices and browsers. Every interaction works perfectly before launch." },
      { num: "05", title: "Launch", desc: "We deploy your project with domain, ultra-fast hosting and SSL. Your business online from day one." }
    ],
    contactTitle: "Let's Talk About Your Project",
    contactSubtitle: "Tell us your idea and we will respond within 24 hours with a custom proposal",
    contactBadge: "Contact",
    contactName: "Your Name",
    contactEmail: "Your Email",
    contactPhone: "Your Phone",
    contactMessage: "Tell us about your project...",
    contactSend: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message sent successfully. We will contact you soon.",
    contactError: "Error sending. Try again or write us on WhatsApp.",
    casesTitle: "Success Stories",
    casesSubtitle: "Real results from businesses that trusted us to transform their digital presence",
    casesBadge: "Success Stories",
    casesReadMore: "Read full case",
    techTitle: "Technologies We Use",
    techSubtitle: "We work with the most advanced tools on the market to guarantee performance, security and scalability",
    techBadge: "Tech Stack",
    testimonialsTitle: "Real Results",
    testimonialsSubtitle: "Businesses already generating customers with this system",
    testimonialsBadge: "Testimonials",
    pricingTitle: "Invest once. Sell every day.",
    pricingSubtitle: "A system that keeps generating customers even when you're not around",
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
    finalTitle: "Start getting customers today",
    finalSubtitle: "Your customers are already searching. You just need the right system to convert them.",
    finalCta: "Get started now →",
    footerRights: "© 2026 Fast Page Pro. All rights reserved by Fast Page Pro.",
    tags: ["Premium Quality", "No forced contracts", "Support included"],
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
  const defaultMessage = `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n${WA_EMOJI.check} *Objetivo:* Agendar una demo\n${WA_EMOJI.hotel} *Tipo de negocio:* Por definir\n\nQuedo atento.`;
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
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-stone-200/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white dark:bg-stone-950 backdrop-blur-xl border border-stone-200 dark:border-white/10 rounded-3xl p-8 md:p-10 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-transparent opacity-0 dark:from-white/5 dark:to-transparent group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 md:mb-6 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center relative overflow-hidden border border-stone-200 dark:border-white/5 group-hover:border-yellow-400/30 transition-colors duration-500"
        >
          <IconComp className="w-8 h-8 md:w-10 md:h-10 text-stone-600 group-hover:text-yellow-600 dark:text-white/70 dark:group-hover:text-yellow-400 transition-colors duration-500 relative z-10" />
        </motion.div>

        <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-white mb-2 md:mb-3 tracking-tight relative">
          <AnimatedCounter end={value} suffix={suffix} />
        </div>

        <div className="text-xs md:text-sm text-stone-500 dark:text-stone-400 uppercase tracking-widest font-medium">{label}</div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
              href={showMessage ? `https://wa.me/51933667414?text=${encodeURIComponent(demoMessage).replace(/%20/g, ' ')}` : "#"}
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col h-auto min-h-[280px]"
    >
      <div className="flex-1">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-stone-900 dark:text-white fill-stone-900 dark:fill-white" />
          ))}
        </div>
        <p className="text-stone-700 dark:text-stone-300 text-base md:text-lg leading-relaxed mb-6">
          "{testimonial.text}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
        <img
          src={testimonial.avatar || LATIN_AVATARS[index % LATIN_AVATARS.length]}
          alt={testimonial.name}
          onError={handleImageFallback}
          className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700 flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-stone-950 dark:text-white truncate">{testimonial.name}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400 truncate">{testimonial.hotel} • {testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Testimonial Carousel Component
const MobileTestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrevious();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  return (
    <div className="md:hidden relative">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white dark:bg-stone-900 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white dark:bg-stone-900 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight size={18} />
      </button>

      {/* Carousel Track */}
      <div className="overflow-hidden px-14">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1.5">
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-lg border border-stone-100 dark:border-stone-800 flex flex-col h-[260px]">
                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} size={16} className="text-stone-900 dark:text-white fill-stone-900 dark:fill-white" />
                    ))}
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed line-clamp-4">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <img
                    src={t.avatar || LATIN_AVATARS[i % LATIN_AVATARS.length]}
                    alt={t.name}
                    onError={handleImageFallback}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-stone-950 dark:text-white text-sm truncate">{t.name}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 truncate">{t.hotel} • {t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-stone-900 dark:bg-white w-6"
                : "bg-stone-300 dark:bg-stone-700"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const SectionTitle = ({ title, subtitle, badge }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-12 md:mb-16 text-center max-w-4xl mx-auto px-4">
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-5 px-5 py-2 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-xs font-semibold tracking-widest uppercase shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-5 dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-stone-600 font-normal leading-relaxed dark:text-stone-400"
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

// --- Work Process Timeline (GSAP Animated) ---
const ProcessTimeline = ({ copy }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    const steps = timelineEl.querySelectorAll('.timeline-step');
    const arrows = timelineEl.querySelectorAll('.timeline-arrow');
    const circles = timelineEl.querySelectorAll('.timeline-circle');
    if (!steps.length) return;

    // Immediately hide to prevent flash
    steps.forEach((step, i) => {
      gsap.set(step, { opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.95 });
    });
    gsap.set(arrows, { opacity: 0, scaleY: 0, transformOrigin: "center center" });
    gsap.set(circles, { scale: 0, rotation: -180 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineEl,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true
        }
      });

      steps.forEach((step, i) => {
        tl.to(step, {
          opacity: 1, x: 0, scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)"
        });

        if (circles[i]) {
          tl.to(circles[i], {
            scale: 1, rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          }, `-=${0.4}`);
        }

        if (arrows[i]) {
          tl.to(arrows[i], {
            opacity: 1, scaleY: 1,
            duration: 0.4,
            ease: "power2.out"
          }, `-=${0.2}`);
        }
      });
    }, timelineEl);

    return () => ctx.revert();
  }, []);

  const icons = [Search, Palette, Code, FlaskConical, Rocket];
  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-violet-400",
    "from-emerald-500 to-green-400",
    "from-orange-500 to-amber-400",
    "from-yellow-400 to-amber-500"
  ];

  const ArrowDown = () => (
    <div className="timeline-arrow flex justify-center py-1">
      <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
        <ChevronDown size={16} className="text-stone-400 dark:text-stone-500" />
      </div>
    </div>
  );

  return (
    <section id="proceso" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.processTitle} subtitle={copy.processSubtitle} badge={copy.processBadge} />

        <div ref={timelineRef} className="max-w-3xl mx-auto">
          {copy.processSteps.map((step, index) => {
            const Icon = icons[index];
            const isLast = index === copy.processSteps.length - 1;

            return (
              <div key={step.num}>
                <div className="timeline-step relative flex items-start gap-4 md:gap-6">
                  {/* Icon Circle */}
                  <div className="timeline-circle flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 z-10">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-stone-950" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white dark:bg-stone-900 rounded-2xl md:rounded-3xl p-5 md:p-7 border border-stone-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${gradients[index]} text-[10px] md:text-xs font-bold text-white mb-3 tracking-wider`}>
                      PASO {step.num}
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-stone-900 mb-2 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base dark:text-stone-400">{step.desc}</p>
                  </div>
                </div>

                {/* Arrow between steps */}
                {!isLast && <ArrowDown />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Contact Form Section ---
const ContactSection = ({ copy, language }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;
    const els = formRef.current.querySelectorAll('.contact-reveal');
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: 40 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none none" }
    });
    tl.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });

    return () => { tl.kill(); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    const msg = `Hola Fast Page Pro!\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\n${formData.message}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={formRef} className="container mx-auto px-4 relative z-10 max-w-3xl">
        <SectionTitle title={copy.contactTitle} subtitle={copy.contactSubtitle} badge={copy.contactBadge} />

        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-stone-200 dark:border-stone-800">
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div className="contact-reveal">
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactName}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
                placeholder="Juan Pérez"
              />
            </div>
            <div className="contact-reveal">
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactEmail}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
                placeholder="juan@email.com"
              />
            </div>
          </div>
          <div className="mb-5 contact-reveal">
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactPhone}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
              placeholder="+51 999 999 999"
            />
          </div>
          <div className="mb-6 contact-reveal">
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactMessage}</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm resize-none"
            />
          </div>

          <div className="contact-reveal">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-4 text-center"
                >
                  <p className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-2">
                    <Check size={18} /> {copy.contactSuccess}
                  </p>
                </motion.div>
              ) : (
                <motion.button
                  key="button"
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-stone-950 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-950 font-semibold py-4 rounded-xl transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 text-sm"
                >
                  {status === "sending" ? (
                    <>{copy.contactSending} <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Send size={16} /></motion.div></>
                  ) : (
                    <>{copy.contactSend} <ArrowRight size={16} /></>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
};

// --- Success Cases Section ---
const CasesSection = ({ copy, language }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.case-card');
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" }
    });
    tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" });

    return () => { tl.kill(); };
  }, []);

  const cases = [
    {
      title: language === "es" ? "Vuelo 78 Hotel: +180% reservas en 3 meses" : "Vuelo 78 Hotel: +180% bookings in 3 months",
      metric: language === "es" ? "+180% reservas" : "+180% bookings",
      desc: language === "es" ? "Tras implementar el sistema de reservas directas por WhatsApp, Vuelo 78 Hotel en Tarapoto pasó de 15 a 42 reservas mensuales. La automatización eliminó el 90% del trabajo manual en recepción." : "After implementing direct WhatsApp booking, Vuelo 78 Hotel in Tarapoto went from 15 to 42 monthly bookings. Automation eliminated 90% of manual reception work.",
      image: "/images/03-portafolio/vuelo78hotel.png",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: language === "es" ? "Growth Consulting: 3x más leads calificados" : "Growth Consulting: 3x more qualified leads",
      metric: language === "es" ? "3x leads" : "3x leads",
      desc: language === "es" ? "La plataforma de captación generó un sistema automático que triplicó la cantidad de leads calificados. El tiempo de respuesta se redujo de horas a segundos con el bot de WhatsApp." : "The capture platform generated an automatic system that tripled qualified leads. Response time went from hours to seconds with the WhatsApp bot.",
      image: "/images/03-portafolio/GrowthConsultingPerú.png",
      color: "from-purple-500 to-violet-400"
    },
    {
      title: language === "es" ? "La Casona Gourmet: +95% pedidos online" : "La Casona Gourmet: +95% online orders",
      metric: language === "es" ? "+95% pedidos" : "+95% orders",
      desc: language === "es" ? "El menú visual interactivo por WhatsApp transformó la experiencia de pedido. Los clientes ahora hacen pedidos en menos de 2 minutos sin necesidad de llamar por teléfono." : "The interactive visual menu via WhatsApp transformed the ordering experience. Customers now order in under 2 minutes without needing to call.",
      image: "/images/03-portafolio/LaCasonaGourmet.png",
      color: "from-emerald-500 to-green-400"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-stone-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.casesTitle} subtitle={copy.casesSubtitle} badge={copy.casesBadge} />

        <div ref={sectionRef} className="space-y-8 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <div key={i} className="case-card group relative rounded-[2rem] overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={c.image} alt={c.title} onError={handleImageFallback} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:col-span-3 p-6 md:p-10 flex flex-col justify-center">
                  <div className={`inline-block self-start px-4 py-1.5 rounded-full bg-gradient-to-r ${c.color} text-xs font-bold text-white mb-4 tracking-wider`}>
                    {c.metric}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3">{c.title}</h3>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Tech Stack Section ---
const TechStackSection = ({ copy }) => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const row1El = row1Ref.current;
    const row2El = row2Ref.current;
    const sectionEl = sectionRef.current;
    if (!row1El || !row2El || !sectionEl) return;

    const row1Items = row1El.querySelectorAll('.tech-item-row1');
    const row2Items = row2El.querySelectorAll('.tech-item-row2');
    if (!row1Items.length || !row2Items.length) return;

    // Immediately hide items to prevent flash
    gsap.set(row1Items, { opacity: 0, x: -120, scale: 0.5, rotation: -8 });
    gsap.set(row2Items, { opacity: 0, x: 120, scale: 0.5, rotation: 8 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      });

      // Row 1 - Slide from left + scale bounce + rotation WOW
      tl.to(row1Items, {
        opacity: 1, x: 0, scale: 1, rotation: 0,
        duration: 0.7,
        stagger: { amount: 0.8, from: "start" },
        ease: "back.out(1.4)"
      });

      // Row 2 - Slide from right + scale bounce + rotation WOW
      tl.to(row2Items, {
        opacity: 1, x: 0, scale: 1, rotation: 0,
        duration: 0.7,
        stagger: { amount: 0.8, from: "end" },
        ease: "back.out(1.4)"
      }, "-=0.4");
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  const techsRow1 = [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "Node.js", color: "#339933" },
    { name: "Vite", color: "#646CFF" },
    { name: "GSAP", color: "#88CE02" },
    { name: "Framer Motion", color: "#0055FF" }
  ];

  const techsRow2 = [
    { name: "Vercel", color: "#000000" },
    { name: "Prisma", color: "#2D3748" },
    { name: "MongoDB", color: "#47A248" },
    { name: "PostgreSQL", color: "#4169E1" },
    { name: "Firebase", color: "#FFCA28" },
    { name: "Stripe", color: "#635BFF" },
    { name: "Figma", color: "#F24E1E" }
  ];

  const TechItem = ({ tech, rowClass }) => (
    <motion.div
      whileHover={{ y: -6, scale: 1.08, rotate: [-1, 1, -1, 0] }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${rowClass} group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-default shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] dark:bg-white/5 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/10`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)'
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-md" style={{ backgroundColor: tech.color + "20", color: tech.color === "#000000" ? "#ffffff" : tech.color }}>
        {tech.name.charAt(0)}
      </div>
      <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors dark:text-white/80 dark:group-hover:text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>{tech.name}</span>
    </motion.div>
  );

  return (
    <section className="py-20 md:py-28 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.techTitle} subtitle={copy.techSubtitle} badge={copy.techBadge} />

        <div className="max-w-5xl mx-auto space-y-4">
          {/* Row 1 - Animate from LEFT */}
          <div ref={row1Ref} className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techsRow1.map((tech) => (
              <TechItem key={tech.name} tech={tech} rowClass="tech-item-row1" />
            ))}
          </div>

          {/* Row 2 - Animate from RIGHT */}
          <div ref={row2Ref} className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techsRow2.map((tech) => (
              <TechItem key={tech.name} tech={tech} rowClass="tech-item-row2" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- GSAP Preloader Component ---
const GSAPPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Counter animation
    tl.fromTo(counterRef.current, 
      { textContent: 0 },
      {
        textContent: 100,
        duration: 1.8,
        ease: "power2.inOut",
        snap: { textContent: 1 },
        onUpdate: function() {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(this.targets()[0].textContent);
          }
        }
      },
      0
    );

    // Progress bar fill
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.inOut", transformOrigin: "left" },
      0
    );

    // Fade out preloader
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      delay: 0.2
    }, 2);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Zap size={28} className="fill-stone-950" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-3xl tracking-tighter">FastPagePro</span>
        </div>
      </div>
      <div className="text-7xl md:text-8xl font-black text-white mb-6 tabular-nums">
        <span ref={counterRef}>0</span>
        <span className="text-yellow-400">%</span>
      </div>
      <div className="w-64 md:w-80 h-[2px] bg-stone-800 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
      </div>
      <p className="text-stone-500 text-sm mt-4 tracking-widest uppercase">Cargando experiencia</p>
    </div>
  );
};

// --- GSAP Scroll Animation Hook ---
const useGSAPScrollReveal = (ref, options = {}) => {
  const { y = 60, duration = 0.8, stagger = 0.15, delay = 0, trigger, start = "top 85%" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.gsap-reveal');
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y });

    const tween = gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger || ref.current,
        start,
        toggleActions: "play none none none"
      }
    });

    return () => { tween.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [ref, y, duration, stagger, delay, trigger, start]);
};

const PortfolioSection = ({ copy, projects, language }) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeFilterEn, setActiveFilterEn] = useState("All");
  const sectionRef = useRef(null);

  const categories = PORTFOLIO_CATEGORIES[language] || PORTFOLIO_CATEGORIES.es;
  const currentFilter = language === "en" ? activeFilterEn : activeFilter;
  const setCurrentFilter = language === "en" ? setActiveFilterEn : setActiveFilter;

  const filteredProjects = projects.filter(p => {
    if (currentFilter === "Todos" || currentFilter === "All") return true;
    return p.category === currentFilter;
  });

  useGSAPScrollReveal(sectionRef, { y: 50, stagger: 0.1 });

  // Category icon helper
  const getCategoryIcon = (category) => {
    if (category.includes("Web") || category.includes("Web")) return Monitor;
    if (category.includes("Tienda") || category.includes("Store")) return ShoppingCart;
    if (category.includes("App") || category.includes("Mobile")) return Smartphone;
    return Code;
  };

  // Type color helper
  const getTypeColor = (type) => {
    const colors = {
      web: "from-blue-500 to-cyan-400",
      tienda: "from-emerald-500 to-green-400",
      app: "from-purple-500 to-violet-400",
      custom: "from-orange-500 to-amber-400"
    };
    return colors[type] || "from-stone-500 to-stone-400";
  };

  const getTypeBg = (type) => {
    const bgs = {
      web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      tienda: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      app: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      custom: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    };
    return bgs[type] || "bg-stone-500/10 text-stone-400 border-stone-500/20";
  };

  return (
    <section id="portafolio" className="py-20 md:py-28 bg-white dark:bg-stone-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 dark:bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.portfolioTitle} subtitle={copy.portfolioSubtitle} badge={copy.portfolioBadge} />
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-14 gsap-reveal">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCurrentFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 border ${
                currentFilter === cat
                  ? "bg-stone-900 text-white border-stone-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:bg-white dark:text-stone-950 dark:border-white dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]"
                  : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200 hover:text-stone-900 hover:border-stone-300 dark:bg-white/5 dark:text-stone-400 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/20"
              }`}
            >
              <span className="flex items-center gap-2">
                {cat !== "Todos" && cat !== "All" && (() => {
                  const Icon = getCategoryIcon(cat);
                  return <Icon size={14} />;
                })()}
                {cat}
              </span>
            </motion.button>
          ))}
        </div>
      
        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const imageMap = {
                "Vuelo 78 Hotel": "/images/03-portafolio/vuelo78hotel.png",
                "Amazonia Eco Stay": "/images/03-portafolio/AmazoniaEcoStay.png",
                "La Casona Gourmet": "/images/03-portafolio/LaCasonaGourmet.png",
                "Growth Consulting Perú": "/images/03-portafolio/GrowthConsultingPerú.png",
                "Growth Consulting Peru": "/images/03-portafolio/GrowthConsultingPerú.png"
              };
              const Icon = getCategoryIcon(project.category);
              const gradientColor = getTypeColor(project.type);

              return (
                <motion.a
                  key={`${project.title}-${activeFilter}`}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="group rounded-2xl md:rounded-[1.75rem] overflow-hidden border border-stone-200 bg-white dark:border-white/10 dark:bg-stone-900/80 shadow-lg hover:shadow-xl block no-underline relative"
                  whileHover={{ y: -6, borderColor: undefined }}
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                  
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={imageMap[project.title] || project.image} alt={project.title} onError={handleImageFallback} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {/* Overlay with icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${getTypeBg(project.type)}`}>
                        <Icon size={12} />
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-stone-900 group-hover:text-yellow-600 transition-colors dark:text-white dark:group-hover:text-yellow-400">{project.title}</h3>
                    <p className="text-xs md:text-sm text-stone-500 mb-2 dark:text-stone-500">{project.location}</p>
                    <p className="text-xs md:text-sm text-stone-600 leading-relaxed mb-3 line-clamp-4 dark:text-stone-400">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-stone-500 group-hover:text-yellow-600 hover:gap-3 transition-all dark:text-stone-400 dark:group-hover:text-yellow-400">
                      {copy.portfolioCta}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Stats Social Proof */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-16 gsap-reveal">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">+20</div>
            <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mt-1">{language === "es" ? "proyectos creados" : "projects created"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">+300%</div>
            <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mt-1">{language === "es" ? "aumento en ventas" : "sales increase"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">4</div>
            <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mt-1">{language === "es" ? "países" : "countries"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">100%</div>
            <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mt-1">{language === "es" ? "satisfacción" : "satisfaction"}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services Section ---
const ServicesSection = ({ copy, language }) => {
  const sectionRef = useRef(null);
  useGSAPScrollReveal(sectionRef, { y: 50, stagger: 0.12 });

  const services = [
    {
      icon: Monitor,
      title: copy.servicesWebTitle,
      desc: copy.servicesWebDesc,
      gradient: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400"
    },
    {
      icon: ShoppingCart,
      title: copy.servicesTiendaTitle,
      desc: copy.servicesTiendaDesc,
      gradient: "from-emerald-500 to-green-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      textColor: "text-emerald-400"
    },
    {
      icon: Smartphone,
      title: copy.servicesAppTitle,
      desc: copy.servicesAppDesc,
      gradient: "from-purple-500 to-violet-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-400"
    },
    {
      icon: Code,
      title: copy.servicesCustomTitle,
      desc: copy.servicesCustomDesc,
      gradient: "from-orange-500 to-amber-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-400"
    }
  ];

  return (
    <section id="servicios" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-stone-200/50 dark:bg-stone-800/30 rounded-full blur-[150px] pointer-events-none" />
      
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.servicesTitle} subtitle={copy.servicesSubtitle} badge={copy.servicesBadge} />
        
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className={`gsap-reveal group relative rounded-[2rem] p-8 md:p-10 border ${service.borderColor} ${service.bgColor} backdrop-blur-sm transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-950 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
  const [showPreloader, setShowPreloader] = useState(true);
  const preloaderComplete = useCallback(() => setShowPreloader(false), []);
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
    <>
      {/* GSAP Preloader */}
      {showPreloader && <GSAPPreloader onComplete={preloaderComplete} />}
    
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
              <div className="text-xs text-stone-400 dark:text-stone-500 mt-1">🚀 Entregado en 2 días • Web + WhatsApp</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - Mobile First Responsive */}
      <section id="top" className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
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

        <motion.div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 text-center text-white flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 60 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2 }} 
            className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Badge - Fixed for mobile */}
            <motion.div 
              className="inline-block mb-5 sm:mb-6 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md" 
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <motion.div
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0.4)", "0 0 0 10px rgba(251, 191, 36, 0)", "0 0 0 0 rgba(251, 191, 36, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400"
                />
                <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="hidden xs:inline">🚀</span> {copy.heroBadge}
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-3 sm:mb-4 md:mb-6 leading-[1.1]">
              {copy.heroTitleTop} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30">{copy.heroTitleBottom}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-stone-300 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-2">
              {copy.heroSubtitle}
            </p>

            {/* CTA Buttons - Same size and design */}
            <div className="w-full max-w-sm mx-auto flex flex-col gap-3 sm:gap-4">
              <a
                href="#portafolio"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('portafolio');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-6 rounded-full text-base transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(250,204,21,0.6)] hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2">
                  {copy.heroPrimaryCta}
                  <ArrowRight size={18} />
                </span>
              </a>
              <WhatsAppButton
                text={copy.heroSecondaryCta}
                variant="outline"
                className="w-full h-[52px] px-6 text-base font-semibold border-2 !text-white !border-white hover:!bg-white/10 rounded-full shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              />
            </div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.2 }} 
              className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap px-2"
            >
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400"><Shield size={12} className="text-green-400" /> {copy.tags[0]}</div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400"><Clock size={12} className="text-yellow-400" /> {copy.tags[1]}</div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400"><Award size={12} className="text-blue-400" /> {copy.tags[2]}</div>
            </motion.div>

            {/* Live Booking Counter - Fixed for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 max-w-full"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
              />
              <span className="text-xs sm:text-sm text-stone-300 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-bold text-white">{todayBookings}</span> {language === 'es' ? 'proyectos activos' : 'active projects'}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="beneficios" className="py-20 md:py-28 bg-stone-50 dark:bg-stone-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-stone-200/50 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <StatCard icon={Rocket} value={45} suffix="+" label={copy.stats[0]} delay={0} />
            <StatCard icon={Award} value={6} suffix="+" label={copy.stats[1]} delay={0.2} />
            <StatCard icon={Zap} value={100} suffix="%" label={copy.stats[2]} delay={0.4} />
          </div>
        </div>
      </section>

      <PortfolioSection copy={copy} projects={portfolioProjects} language={language} />

      {/* Services Section */}
      <ServicesSection copy={copy} language={language} />

      {/* Process Timeline */}
      <ProcessTimeline copy={copy} />

      {/* Tech Stack */}
      <TechStackSection copy={copy} />

      {/* Success Cases */}
      <CasesSection copy={copy} language={language} />

      {/* TESTIMONIALS - Carousel on Mobile, Horizontal Scroll on Desktop */}
      <section id="testimonios" className="py-16 md:py-32 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle title={copy.testimonialsTitle} subtitle={copy.testimonialsSubtitle} badge={copy.testimonialsBadge} />

          {/* Mobile: Carousel with arrows */}
          <MobileTestimonialCarousel testimonials={testimonials} />

          {/* Desktop: Horizontal Scroll */}
          <div className="hidden md:block relative w-full overflow-hidden pb-8">
            <motion.div
              className="flex gap-6"
              drag="x"
              dragConstraints={{ left: -((testimonials.length * 420) - window.innerWidth), right: 0 }}
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
      <section id="planes" className="py-24 md:py-32 bg-stone-50 dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <SectionTitle title={copy.pricingTitle} subtitle={copy.pricingSubtitle} />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mt-10 md:mt-16">
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
                  className={`relative p-7 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border text-center flex flex-col ${plan.highlight ? 'bg-stone-900 text-white scale-105 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] dark:bg-white dark:text-stone-950 dark:shadow-[0_50px_100px_-30px_rgba(255,255,255,0.15)] z-10 border-stone-900 dark:border-white' : 'bg-white border-stone-200 text-stone-900 dark:bg-stone-900/50 dark:border-stone-800 dark:text-white'}`}
                  whileHover={{ y: -10, scale: plan.highlight ? 1.07 : 1.03 }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-stone-950 dark:bg-yellow-400 dark:text-stone-950 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-lg">
                      {copy.popularTag}
                    </div>
                  )}
                  <h3 className="text-base md:text-lg opacity-60 mb-2 uppercase tracking-widest">{plan.name}</h3>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight">S/ {plan.price}</div>
                  <div className="text-xs md:text-sm opacity-40 mb-7 md:mb-8">{plan.period}</div>

                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1 text-left">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs md:text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-yellow-400 text-stone-950 dark:bg-stone-950 dark:text-white' : 'bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white'}`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-stone-600 dark:text-stone-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={mpLinks[plan.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group px-7 py-3.5 md:px-10 md:py-5 text-sm md:text-base ${plan.highlight ? 'bg-yellow-400 text-stone-950 hover:bg-yellow-500 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]' : 'bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100'}`}
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      {copy.selectPlan}
                      {!plan.highlight && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                  </a>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-stone-400 dark:text-stone-500">3 cuotas sin interes: <span className="font-semibold text-stone-600 dark:text-stone-400">S/ {cuotas[plan.name]}/mes</span></p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-white dark:bg-stone-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionTitle title={copy.faqTitle} subtitle={copy.faqSubtitle} />
          <div className="mt-10 md:mt-12">
            {copy.faq.map((item, index) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection copy={copy} language={language} />

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-stone-50 text-center dark:bg-stone-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200/50 dark:bg-stone-800/50 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.9] text-stone-900 dark:text-white">{copy.finalTitle}</motion.h2>
          <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-stone-600 mb-10 md:mb-12 max-w-2xl mx-auto font-normal dark:text-stone-400">{copy.finalSubtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <WhatsAppButton text={copy.finalCta} className="px-12 md:px-16 py-6 text-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]" size="large" />
          </motion.div>
          <div className="flex justify-center gap-6 md:gap-8 mt-8 md:mt-10 text-xs md:text-sm text-stone-500 dark:text-stone-400 flex-wrap">
            <span className="flex items-center gap-2"><Shield size={16} className="text-green-500" /> {copy.tags[0]}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> {copy.tags[1]}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-yellow-500" /> {copy.tags[2]}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-white/5 dark:bg-stone-900 dark:border-stone-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Zap size={24} className="fill-stone-950" strokeWidth={2.5} />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">FastPagePro</span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                {language === "es"
                  ? "Creamos páginas webs profesionales, tiendas online, aplicaciones móviles y proyectos personalizados que impulsan tu negocio."
                  : "We create professional websites, online stores, mobile apps and custom projects that drive your business forward."}
              </p>
              <div className="flex gap-3">
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/10 transition-all"><Globe size={18} /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/10 transition-all"><MessageCircle size={18} /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/10 transition-all"><Star size={18} /></motion.a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Servicios" : "Services"}</h4>
              <ul className="space-y-3">
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Páginas Web" : "Websites"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Tiendas Online" : "Online Stores"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Apps Móviles" : "Mobile Apps"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Proyectos Custom" : "Custom Projects"}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Empresa" : "Company"}</h4>
              <ul className="space-y-3">
                <li><a href="#portafolio" onClick={(e) => scrollToSection(e, 'portafolio')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Portafolio" : "Portfolio"}</a></li>
                <li><a href="#proceso" onClick={(e) => scrollToSection(e, 'proceso')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Proceso" : "Process"}</a></li>
                <li><a href="#testimonios" onClick={(e) => scrollToSection(e, 'testimonios')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Testimonios" : "Testimonials"}</a></li>
                <li><a href="#planes" onClick={(e) => scrollToSection(e, 'planes')} className="text-stone-500 hover:text-white text-sm transition-colors">{language === "es" ? "Planes" : "Plans"}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Contacto" : "Contact"}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-stone-500 text-sm"><Phone size={14} /> +51 933 667 414</li>
                <li className="flex items-center gap-2 text-stone-500 text-sm"><Send size={14} /> profastpage@gmail.com</li>
                <li className="flex items-center gap-2 text-stone-500 text-sm"><MapPin size={14} /> {language === "es" ? "Lima, Perú" : "Lima, Peru"}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-stone-600 text-xs">© 2026 FastPagePro - Fabio Herrera, Fundador. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}</div>
            <div className="flex items-center gap-2 text-stone-600 text-xs">
              <span>{language === "es" ? "Hecho con" : "Made with"}</span>
              <Heart size={12} className="text-red-500" />
              <span>y tecnología de vanguardia</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Advanced Widget */}
      <AdvancedWidget language={language} widgetCopy={copy.widget} isOpen={isWidgetOpen} setIsOpen={setIsWidgetOpen} />
    </div>
    </>
  );
}


