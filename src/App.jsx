import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform, useMotionValue } from 'framer-motion';
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
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Shield,
  BarChart3,
  Briefcase,
  LayoutGrid,
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
  Heart,
  Download,
  Maximize2,
  Tag,
  Wrench,
  Bot,
  Copy,
  Share2
} from 'lucide-react';

// 21st.dev: Spotlight (Spline 3D Scene removed — was 4.5 MB of JS for a decorative robot)
import { Spotlight } from './components/Spotlight';

// WebGL Shader Background (Mobile Only — Ultra Pro Aurora/Rays)
import AetherHero from './components/AetherHero';

// --- Constants ---
const WHATSAPP_NUMBER = "51933667414";
const PROFASTPAGE_EMAIL = "cotizaciones@fastpagepro.com";
const LEADS_WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL || "";
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/profastpage/15min";

const openCalendly = () => {
  trackCtaClick('calendly_open', 'google_meet');
  if (typeof window !== 'undefined' && window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    window.Calendly.initPopupWidget({
      url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0c0a09&text_color=ffffff&primary_color=eab308`
    });
  } else if (typeof window !== 'undefined') {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  }
};

// --- CTA Analytics (GA4) ---
// Lightweight helpers that no-op when gtag is not loaded (no VITE_GA_ID configured),
// so the site never breaks if analytics is disabled.
const getDeviceType = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Fire-and-forget event. Uses beacon-style transport when available so the
// event survives the page unload that happens when window.open() steals focus
// or when the user is redirected to wa.me / Google Calendar.
const trackCtaClick = (ctaId, target, extra = {}) => {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', 'cta_click', {
      cta_id: ctaId,
      cta_target: target,            // 'whatsapp' | 'google_meet' | 'phone_call' | 'portfolio' | 'contact_form' | 'calendar'
      device: getDeviceType(),
      language: typeof document !== 'undefined' && document.documentElement.lang || 'es',
      ...extra,
    });
  } catch {
    /* no-op — analytics should never break UX */
  }
};

// Higher-level event for the booking widget — fires when a lead is actually
// submitted (not just clicked). Useful for funnel analysis:
// cta_click (widget_open) → cta_click (widget_meet_select) → lead_submit (meet)
const trackLeadSubmit = (leadType, extra = {}) => {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', 'lead_submit', {
      lead_type: leadType,           // 'direct' | 'meet' | 'call' | 'contact_form'
      device: getDeviceType(),
      language: typeof document !== 'undefined' && document.documentElement.lang || 'es',
      ...extra,
    });
  } catch {
    /* no-op */
  }
};
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

// --- Official WhatsApp SVG Icon Component (Crisp Brand Vector) ---
const WhatsAppOfficialIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

// --- Context-Aware WhatsApp Messages (100% Universal UTF-8 URI Encoded) ---
const getWhatsAppLink = (contexto, extra = {}) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

  if (contexto === "demo") {
    return base + encodeURIComponent(extra.mensaje || "");
  }

  const mensajes = {
    servicios: `*¡Hola, Fast Page Pro!* 👋\n\nQuiero *cotizar mi proyecto web* 🚀\n\n- *Tipo de proyecto:* Por definir\n- *Necesito:* Web profesional / Tienda online / App\n- *Objetivo:* Impulsar mi negocio online\n\nQuedo atento a su respuesta.`,

    portafolio: `*¡Hola! Vi su proyecto ${extra.nombre || ""}* ⚡\n\nMe gustaría implementar un sistema similar para mi negocio.\n\n- *Interés:* Reservas por WhatsApp / Diseño de alto impacto\n- *Sector:* ${extra.sector || "Por definir"}\n\n¿Podrían brindarme más información?`,

    precios: `*¡Hola! Estoy listo para empezar* 🚀\n\nQuiero contratar el *Plan ${extra.plan || "Pro"}*.\n\n- *Servicio:* Diseño Web Pro\n- *Tiempo estimado:* Según alcance del proyecto\n\n¿Cuáles son los siguientes pasos? ✅`,

    proceso: `*¡Hola! Quiero comenzar mi proyecto* 🚀\n\nHe visto su proceso de trabajo y me gustaría agendar una reunión de *Descubrimiento*.\n\n- *Nombre:* ${extra.nombre || "Por completar"}\n- *Negocio:* ${extra.negocio || "Por definir"}\n\n¿Tienen disponibilidad esta semana? 📅`,

    contacto: `*¡Hola, Fast Page Pro!* 👋\n\nQuiero información sobre sus servicios.\n\n- *Consulta general*\n\nQuedo atento a su respuesta.`,

    default: `*¡Hola, Fast Page Pro!* 👋\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n✅ *Objetivo:* Agendar una demo\n- *Tipo de negocio:* Por definir\n\nQuedo atento.`
  };

  const texto = mensajes[contexto] || mensajes.default;
  return base + encodeURIComponent(texto);
};

const IMAGE_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%230b0b0f'/><stop offset='1' stop-color='%23181a24'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%23f8fafc' font-family='Arial, sans-serif' font-size='56' font-weight='700'>Fast Page Pro</text><text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='Arial, sans-serif' font-size='26'>Webs y reservas por WhatsApp</text></svg>";
const handleImageFallback = (event) => {
  if (event.currentTarget.src !== IMAGE_FALLBACK) {
    event.currentTarget.src = IMAGE_FALLBACK;
  }
};

// Hero image + video constants removed (dead code — 3D hero active)

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

import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_BY_LANG,
  PORTFOLIO_SLUGS,
  slugToTitle,
  PORTFOLIO_MODAL_IMAGES,
  PORTFOLIO_MODAL_MOBILE_IMAGES
} from './data/portfolioData';


const TESTIMONIALS_BY_LANG = {
  es: [
    { name: "Carlos Mendoza", hotel: "Vuelo 78 Hotel", location: "Tarapoto, Perú", stars: 5, text: "Desde que implementaron el sistema de reservas por WhatsApp, nuestras reservas mensuales pasaron de 15 a 42. La respuesta automatizada del hotel nos permite atender consultas a cualquier hora sin personal adicional. El mejor impacto que hemos tenido." },
    { name: "Andrea Castillo", hotel: "CMC LATAM", location: "Perú", stars: 5, text: "Necesitábamos una web que reflejara la calidad de nuestros proyectos de arquitectura costera. El resultado fue una plataforma bilingüe con modo claro/oscuro, galería de proyectos y WhatsApp integrado. Nuestros clientes internacionales quedan impresionados desde el primer contacto." },
    { name: "Jhon Quispe", hotel: "Jhon & Asociados", location: "Lima, Perú", stars: 5, text: "Como estudio contable necesitábamos una web profesional que transmitiera confianza. El resultado fue una plataforma de 5 subpáginas con preloader temático, WhatsApp dinámico que dirige las consultas al servicio correcto automáticamente, y un diseño corporativo que nuestros clientes valoran mucho." },
    { name: "María Torres", hotel: "E-commerce Builder Pro", location: "Remoto, Global", stars: 5, text: "Como emprendedora, necesitaba lanzar mi tienda online sin complicaciones. La plataforma multi-tenant me permitió tener mi catálogo virtual funcionando en menos de una semana. El panel de administración es intuitivo y el soporte técnico excelente." },
    { name: "Roberto Sánchez", hotel: "Atlas", location: "Lima, Perú", stars: 5, text: "El asistente de IA que desarrollaron analiza mi negocio en tiempo real y me sugiere estrategias de crecimiento semanales. Ha sido como tener un consultor estratégico disponible 24/7. Las recomendaciones son precisas y accionables." },
    { name: "Ana García", hotel: "Cotizador Pro", location: "Remoto, Global", stars: 5, text: "El SaaS multi-tenant que construyeron nos ahorró decenas de horas semanales en la generación de cotizaciones. La automatización de plantillas, el sistema de créditos y la autenticación Google funcionan de manera impecable." },
    { name: "Jorge Luis", hotel: "La Casona Gourmet", location: "Lima, Perú", stars: 5, text: "La integración del menú visual interactivo y el sistema de pedidos por WhatsApp transformó nuestro restaurante. Los clientes ahora hacen pedidos en menos de 2 minutos sin llamar por teléfono. Nuestro volumen de pedidos aumentó un 95%." },
    { name: "Lucía Ramírez", hotel: "Moda Digital Pro", location: "Lima, Perú", stars: 5, text: "Necesitábamos una web premium para nuestro catálogo de plotters textiles. El video Hero profesional y el modo claro/oscuro le dieron un nivel de presentación que no esperábamos. Nuestros clientes corporativos quedan impresionados desde el primer clic." },
    { name: "Diego Fernández", hotel: "Urban Style", location: "Lima, Perú", stars: 5, text: "La tienda online que desarrollaron tiene todo lo que necesitábamos: carrito de compras, favoritos, panel de admin y panel de clientes con notificaciones push en tiempo real. La gestión de inventario es automática y las ventas crecen mes a mes." }
  ],
  en: [
    { name: "Carlos Mendoza", hotel: "Vuelo 78 Hotel", location: "Tarapoto, Peru", stars: 5, text: "Since they implemented the WhatsApp booking system, our monthly reservations went from 15 to 42. The hotel's automated response lets us handle inquiries 24/7 without extra staff. The best impact we've ever had." },
    { name: "Andrea Castillo", hotel: "CMC LATAM", location: "Peru", stars: 5, text: "We needed a website that reflected the quality of our coastal architecture projects. The result was a bilingual platform with dark/light mode, project gallery and integrated WhatsApp. Our international clients are impressed from the very first contact." },
    { name: "Jhon Quispe", hotel: "Jhon & Asociados", location: "Lima, Peru", stars: 5, text: "As an accounting firm we needed a professional website that conveyed trust. The result was a 5-page platform with a themed preloader, dynamic WhatsApp that automatically routes consultations to the right service, and a corporate design our clients truly value." },
    { name: "Maria Torres", hotel: "E-commerce Builder Pro", location: "Remote, Global", stars: 5, text: "As an entrepreneur, I needed to launch my online store without complications. The multi-tenant platform let me have my virtual catalog running in less than a week. The admin panel is intuitive and the tech support is excellent." },
    { name: "Roberto Sanchez", hotel: "Atlas", location: "Lima, Peru", stars: 5, text: "The AI assistant they developed analyzes my business in real time and suggests weekly growth strategies. It's been like having a strategic consultant available 24/7. The recommendations are precise and actionable." },
    { name: "Ana Garcia", hotel: "Cotizador Pro", location: "Remote, Global", stars: 5, text: "The multi-tenant SaaS they built saves us dozens of hours every week on quote generation. Template automation, the credit system and Google authentication work flawlessly." },
    { name: "Jorge Luis", hotel: "La Casona Gourmet", location: "Lima, Peru", stars: 5, text: "The integration of the interactive visual menu and WhatsApp ordering system transformed our restaurant. Customers now place orders in under 2 minutes without calling. Our order volume increased by 95%." },
    { name: "Lucia Ramirez", hotel: "Moda Digital Pro", location: "Lima, Peru", stars: 5, text: "We needed a premium website for our textile plotter catalog. The professional Hero video and dark/light mode gave us a level of presentation we didn't expect. Our corporate clients are impressed from the very first click." },
    { name: "Diego Fernandez", hotel: "Urban Style", location: "Lima, Peru", stars: 5, text: "The online store they developed has everything we needed: shopping cart, favorites, admin panel and customer dashboard with real-time push notifications. Inventory management became seamless and sales grow month after month." }
  ]
};

const PLANS_BY_LANG = {
  es: [
    {
      name: "START",
      price: "900",
      period: "pago único",
      features: [
        "Web completa de hasta 5 subpáginas",
        "5 correos corporativos incluidos",
        "Certificado SSL seguro",
        "Hosting ultra rápido Edge",
        "Dominio incluido",
        "Sistema de Reservas o Pedidos por WhatsApp",
        "Diseño Responsivo (Móvil, PC, Tablet)"
      ],
      highlight: false
    },
    {
      name: "PRO",
      price: "1300",
      period: "pago único",
      features: [
        "Todo lo del Plan START",
        "Panel CMS autoadministrable incluido",
        "100 GB almacenamiento alta velocidad",
        "Edición visual intuitiva",
        "Capacitaciones incluidas",
        "SEO Intermedio Optimizado",
        "Diseño Premium Personalizado",
        "Funciones avanzadas",
        "Tienda online con pagos integrados (Yape, Plin, tarjetas)"
      ],
      highlight: true
    },
    {
      name: "BUSINESS",
      price: "1800",
      period: "pago único",
      features: [
        "Todo lo del Plan PRO",
        "App PWA instalable en todos los dispositivos",
        "Modo claro y oscuro",
        "Panel Super Administración",
        "Soporte Inmediato 24/7",
        "SEO Profesional Máximo",
        "Optimización 95%+ PageSpeed",
        "Pagos: Yape, Plin, tarjetas crédito/débito",
        "Tienda online completa con pasarela de pagos"
      ],
      highlight: false
    },
    {
      name: "PERSONALIZADO",
      price: "",
      period: "Cotizar",
      features: [
        "Sistemas personalizados a medida",
        "Aplicaciones web y móviles",
        "CRMs y ERPs custom",
        "Agentes de Inteligencia Artificial",
        "Plataformas SaaS multi-tenant",
        "Integraciones y APIs",
        "Automatización inteligente",
        "Escalabilidad total"
      ],
      highlight: false,
      custom: true
    }
  ],
  en: [
    {
      name: "START",
      price: "900",
      period: "one-time payment",
      features: [
        "Complete website up to 5 subpages",
        "5 corporate emails included",
        "Secure SSL Certificate",
        "Ultra-fast Edge Hosting",
        "Domain included",
        "Direct Booking or Orders via WhatsApp",
        "Responsive Design (Mobile, PC, Tablet)"
      ],
      highlight: false
    },
    {
      name: "PRO",
      price: "1300",
      period: "one-time payment",
      features: [
        "Everything in START",
        "Self-managed CMS panel included",
        "100 GB high-speed storage",
        "Intuitive visual editing",
        "Training sessions included",
        "Optimized Intermediate SEO",
        "Premium Custom Design",
        "Advanced features",
        "Online store with integrated payments (Yape, Plin, cards)"
      ],
      highlight: true
    },
    {
      name: "BUSINESS",
      price: "1800",
      period: "one-time payment",
      features: [
        "Everything in PRO",
        "Installable PWA app on all devices",
        "Light and dark mode",
        "Super Admin Panel",
        "Immediate 24/7 Support",
        "Maximum Professional SEO",
        "95%+ PageSpeed Optimization",
        "Payments: Yape, Plin, credit/debit cards",
        "Full online store with payment gateway"
      ],
      highlight: false
    },
    {
      name: "CUSTOM",
      price: "",
      period: "Get Quote",
      features: [
        "Custom-built systems",
        "Web and mobile applications",
        "Custom CRMs and ERPs",
        "AI Agents",
        "Multi-tenant SaaS platforms",
        "Integrations and APIs",
        "Intelligent automation",
        "Total scalability"
      ],
      highlight: false,
      custom: true
    }
  ]
};

const COPY = {
  es: {
    navCta: "Empezar Mi Proyecto",
    notificationTitle: "Nuevo proyecto entregado!",
    notificationSubtitle: "Cotizador Pro SaaS - hace 2 minutos",
    heroBadge: "Código Limpio & Personalizado",
    heroTitleTop: "Paginas web profesionales",
    heroTitleBottom: "con código limpio y a medida.",
    heroSubtitle: "Diseñamos y desarrollamos webs de alto impacto, tiendas online, apps moviles y proyectos a medida. Calidad premium, rendimiento extremo, entrega en tiempo record.",
    heroPrimaryCta: "Ver Portafolio",
    heroPrimaryMsg: "Quiero ver el portafolio",
    heroSecondaryCta: "Cotizar Mi Proyecto",
    heroSecondaryMsg: `Hola Fast Page Pro \ud83d\udc4b\n\nQuiero *cotizar mi proyecto web* \ud83d\ude80\n\n\ud83d\udcbc *Tipo de proyecto:* Por definir\n\ud83c\udf10 *Necesito:* Web profesional / Tienda online / App\n\n\ud83d\udcc8 *Objetivo:* Impulsar mi negocio online\n\nQuedo atento a su respuesta. \u2728`,
    trustTitle: "Negocios Asociados",
    stats: ["Proyectos entregados", "Años de experiencia", "Satisfacción garantizada"],
    portfolioTitle: "Nuestro Portafolio",
    portfolioSubtitle: "Creamos páginas webs profesionales, tiendas online, aplicaciones móviles y proyectos personalizados",
    portfolioBadge: "Portafolio",
    portfolioCta: "Ver sistema en vivo ↗",
    portfolioFilterAll: "Todos",
    servicesTitle: "Ingeniería de Software y Sistemas Inteligentes",
    servicesSubtitle: "Transformamos la presencia digital en activos tecnológicos rentables que piensan, automatizan y escalan",
    servicesBadge: "Lo que hacemos",
    servicesWebTitle: "Desarrollo de Sistemas y Software a Medida",
    servicesWebPoints: ["Aplicaciones web y plataformas empresariales de alto rendimiento", "Arquitecturas escalables con código limpio y seguridad integrada", "Sistemas de reservas, gestión y automatización a medida"],
    servicesTiendaTitle: "Ecosistemas con Inteligencia Artificial",
    servicesTiendaPoints: ["Agentes de IA propios para atención al cliente y toma de decisiones", "Automatización inteligente de flujos de trabajo y procesos", "Integración de IA en sistemas existentes para optimizar resultados"],
    servicesAppTitle: "Arquitecturas Multi-tenant y SaaS",
    servicesAppPoints: ["Plataformas escalables con gestión centralizada y paneles independientes", "Sistemas de suscripción, créditos y control total del ecosistema", "Infraestructura robusta para crecer sin límites"],
    servicesCustomTitle: "Automatización de Procesos",
    servicesCustomPoints: ["Dashboards empresariales con métricas en tiempo real", "APIs, webhooks y conectores entre plataformas", "Flujos automatizados que eliminan tareas manuales repetitivas"],
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
      meetingNote: "Al confirmar abriremos Google Calendar con tus datos. Pulsa 'Guardar' para crear el evento y generar tu enlace de Meet automáticamente.",
      saveLeadError: "No se pudo registrar el lead automático. Igual abriremos WhatsApp.",
      waDirect: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n${WA_EMOJI.check} *Objetivo:* Agendar una demo.`,
      waMeet: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero agendar una *reunión por Google Meet*.\n\n${WA_EMOJI.user} *Usuario:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Fecha y hora:* {{dateTime}}\n\nQuedo atento a su confirmación.`,
      waCall: `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero agendar una *llamada telefónica*.\n\n${WA_EMOJI.user} *Usuario:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Fecha y hora preferente:* {{dateTime}}\n\nQuedo atento a su llamada.`
    }
  },
  en: {
    navCta: "Start My Project",
    notificationTitle: "New project delivered!",
    notificationSubtitle: "Cotizador Pro SaaS - 2 minutes ago",
    heroBadge: "Clean Code & Custom-Built",
    heroTitleTop: "Professional Websites",
    heroTitleBottom: "with clean, custom code.",
    heroSubtitle: "We design and build high-impact websites, online stores, mobile apps and custom projects. Premium quality, extreme performance, record-breaking delivery.",
    heroPrimaryCta: "See Portfolio",
    heroPrimaryMsg: "I want to see the portfolio",
    heroSecondaryCta: "Get a Quote",
    heroSecondaryMsg: `Hi Fast Page Pro \ud83d\udc4b\n\nI want to *get a quote for my web project* \ud83d\ude80\n\n\ud83d\udcbc *Project type:* To be defined\n\ud83c\udf10 *I need:* Professional website / Online store / App\n\n\ud83d\udcc8 *Goal:* Boost my business online\n\nLooking forward to your response. \u2728`,
    trustTitle: "Partner Businesses",
    stats: ["Projects delivered", "Years of experience", "Satisfaction guaranteed"],
    portfolioTitle: "Our Portfolio",
    portfolioSubtitle: "We create professional websites, online stores, mobile apps and custom projects",
    portfolioBadge: "Portfolio",
    portfolioCta: "See live system ↗",
    portfolioFilterAll: "All",
    servicesTitle: "Software Engineering & Intelligent Systems",
    servicesSubtitle: "We transform digital presence into profitable tech assets that think, automate and scale",
    servicesBadge: "What we do",
    servicesWebTitle: "Custom Systems & Software Development",
    servicesWebPoints: ["High-performance web applications and enterprise platforms", "Scalable architectures with clean code and integrated security", "Custom booking, management and automation systems"],
    servicesTiendaTitle: "Artificial Intelligence Ecosystems",
    servicesTiendaPoints: ["Proprietary AI agents for customer service and decision-making", "Intelligent automation of workflows and business processes", "AI integration into existing systems to optimize results"],
    servicesAppTitle: "Multi-tenant Architectures & SaaS",
    servicesAppPoints: ["Scalable platforms with centralized management and independent panels", "Subscription, credits and full ecosystem control systems", "Robust infrastructure for unlimited growth"],
    servicesCustomTitle: "Process Automation",
    servicesCustomPoints: ["Enterprise dashboards with real-time metrics", "APIs, webhooks and platform connectors", "Automated workflows that eliminate repetitive manual tasks"],
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
      meetingNote: "On confirm we'll open Google Calendar with your details pre-filled. Click 'Save' to create the event and auto-generate your Meet link.",
      saveLeadError: "Lead auto-save failed. We will still open WhatsApp.",
      waDirect: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want information about *websites and WhatsApp booking systems*.\n\n${WA_EMOJI.check} *Goal:* Book a demo.`,
      waMeet: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want to schedule a *Google Meet call*.\n\n${WA_EMOJI.user} *User:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Date and time:* {{dateTime}}\n\nWaiting for your confirmation.`,
      waCall: `Hi Fast Page Pro ${WA_EMOJI.wave}\n\nI want to schedule a *phone call*.\n\n${WA_EMOJI.user} *User:* {{user}}{{contact}}\n${WA_EMOJI.calendar} *Preferred date and time:* {{dateTime}}\n\nWaiting for your call.`
    }
  }
};

// --- Electric Bolt Logo Component ---
const ElectricBolt = ({ size = 35 }) => {
  const flickerDelay = typeof window !== 'undefined' ? Math.random() * 3 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, -10, 10, 0],
        filter: "drop-shadow(0px 0px 12px #FFD700)" 
      }}
      transition={{ duration: 0.5 }}
      style={{ cursor: 'pointer' }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="1"
          strokeLinejoin="round"
          animate={{ 
            opacity: [1, 0.8, 1, 0.9, 1],
            filter: [
              "drop-shadow(0px 0px 2px #FFD700)",
              "drop-shadow(0px 0px 10px #FFD700)",
              "drop-shadow(0px 0px 2px #FFD700)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.2, 
            repeatDelay: flickerDelay
          }}
        />
      </svg>
    </motion.div>
  );
};

// --- Helper Components ---

const WhatsAppButton = ({ text, message, href, variant = "primary", className = "", onClick, size = "normal", waContext, waExtra, ctaId }) => {
  const defaultMessage = `Hola Fast Page Pro ${WA_EMOJI.wave}\n\nQuiero información sobre *webs y sistemas de reservas por WhatsApp*.\n\n${WA_EMOJI.check} *Objetivo:* Agendar una demo\n${WA_EMOJI.hotel} *Tipo de negocio:* Por definir\n\nQuedo atento.`;
  // Use context-aware link if waContext is provided, otherwise fall back to message/href/default
  const url = waContext
    ? getWhatsAppLink(waContext, waExtra)
    : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage)}`;
  const finalHref = href || url;
  const isExternalLink = /^https?:\/\//.test(finalHref);
  
  const sizeClasses = {
    small: "px-6 py-3 text-xs",
    normal: "px-8 py-4 md:px-10 md:py-5 text-sm md:text-base",
    large: "px-12 py-6 text-lg"
  };
  
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group cta-glow-border";
  
  // Updated variants: Removed gold, kept Silver/White/Black
  const variants = {
    primary: "bg-stone-950 text-white hover:bg-stone-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200",
    outline: "bg-transparent border border-stone-200 text-stone-900 hover:bg-stone-50 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800",
    dark: "bg-stone-950 text-white hover:bg-stone-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:bg-white dark:text-stone-950"
  };

  // Wrap the user-supplied onClick so we can fire analytics first, then chain.
  // Tracking fires before navigation so GA4 receives the event even when the
  // browser is about to open wa.me in a new tab.
  const handleAnalyticsClick = (e) => {
    if (ctaId) {
      trackCtaClick(ctaId, 'whatsapp', { wa_context: waContext || 'default' });
    }
    if (typeof onClick === 'function') onClick(e);
  };

  return (
    <motion.a 
      href={finalHref}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      onClick={handleAnalyticsClick}
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

// Enhanced Animated Counter (Apple-style spring physics)
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

// Apple Design System StatCard
const StatCard = ({ icon: Icon, value, label, suffix, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const IconComp = Icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 14 }}
      whileHover={{ y: -10, scale: 1.04 }}
      className="relative group cursor-default"
    >
      {/* Glow backdrop on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main card — Apple glassmorphism */}
      <div
        className="relative rounded-[30px] p-8 md:p-10 text-center overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(250, 204, 21, 0.08)',
            border: '1px solid rgba(250, 204, 21, 0.15)',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.05)'
          }}
          whileHover={{ boxShadow: '0 0 30px rgba(250, 204, 21, 0.15)' }}
        >
          <IconComp className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
        </motion.div>

        {/* Number — Big, bold, gradient */}
        <div
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 md:mb-3"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <AnimatedCounter end={value} suffix={suffix} duration={2.5} />
        </div>

        {/* Label */}
        <div className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-medium"
          style={{ color: 'rgba(255, 255, 255, 0.45)' }}
        >
          {label}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500 group-hover:w-3/4 w-1/4"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.4), transparent)'
          }}
        />
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
            <span className="text-white/50 hover:text-white text-lg md:text-xl font-medium tracking-wide transition-all duration-300">
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
              <p className="text-sm text-stone-500 dark:text-stone-300">
                {language === "es"
                  ? "Completa el formulario y mira el mensaje en tiempo real"
                  : "Fill the form and see the message in real-time"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2">
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
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2">
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
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2">
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
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2">
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
                showMessage ? "text-green-600 dark:text-green-400" : "text-stone-500 dark:text-stone-300"
              }`}>
                {showMessage
                  ? (language === "es" ? "✅ Mensaje listo para enviar" : "✅ Message ready to send")
                  : (language === "es" ? "⏳ Completa todos los campos" : "⏳ Fill all fields")}
              </span>
            </div>

            <motion.a
              href={showMessage ? getWhatsAppLink("demo", { mensaje: demoMessage }) : "#"}
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
    <div className="w-[320px] md:w-[360px] flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
      style={{
        backgroundColor: 'transparent',
        border: '1px solid rgba(0,0,0,0.05)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.03)'
      }}>
      <div>
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.stars || 5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        {/* Quote */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>
      {/* Author */}
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <img src={testimonial.avatar || LATIN_AVATARS[index % LATIN_AVATARS.length]} alt={testimonial.name} onError={handleImageFallback} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div>
          <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</h4>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{testimonial.hotel} &bull; {testimonial.location}</p>
        </div>
      </div>
    </div>
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
                    loading="lazy" decoding="async"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-stone-950 dark:text-white text-sm truncate">{t.name}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-300 truncate">{t.hotel} • {t.location}</div>
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

const SectionTitle = ({ title, subtitle, badge, darkBg = false, compact = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`section-shine ${compact ? 'mb-6 md:mb-10' : 'mb-12 md:mb-16'} text-center max-w-4xl mx-auto px-4`}>
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)', borderColor: 'var(--line-color)', background: 'transparent', border: '1px solid var(--line-color)' }}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
        style={{ color: 'var(--text-main)' }}
      >
        <span className="text-gradient-gold">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg font-normal leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
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
      className="faq-clean-item"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 sm:py-8 flex flex-col items-center text-center focus:outline-none group"
      >
        <div className="flex items-center justify-between w-full max-w-3xl px-2 sm:px-4">
          <span className="faq-item-question text-sm sm:text-base md:text-xl lg:text-2xl transition-colors duration-300" style={{ color: 'var(--text-main)' }}>
            {question}
          </span>
          <motion.div 
            className="faq-item-toggle"
            animate={{ rotate: isOpen ? 180 : 0 }}
            style={{ color: isOpen ? 'var(--accent)' : 'var(--text-muted)' }}
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
              className="faq-item-answer pb-8 pt-6 max-w-2xl mx-auto text-center px-4 text-lg"
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
      <label className="text-xs text-stone-500 dark:text-stone-300">{label}</label>
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
        <p className="text-stone-500 dark:text-stone-300 mb-8 text-center lg:text-left">{copy.liveDemoSubtitle}</p>

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
              <label className="text-xs text-stone-500 dark:text-stone-300">{language === "es" ? "Fecha de ingreso" : "Check-in date"}</label>
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
          href={canGenerate ? `https://wa.me/${businessPhoneDigits}?text=${encodeURIComponent(demoMessage)}` : "#"}
          target="_blank"
          rel="noreferrer noopener"
          className={`mt-6 inline-flex w-full h-[60px] justify-center items-center rounded-full px-6 text-base font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] ${canGenerate ? "bg-stone-950 text-white hover:bg-stone-800" : "bg-stone-300 text-stone-500 cursor-not-allowed pointer-events-none"}`}
        >
          {copy.liveDemoCta}
        </a>
      </div>

      <div className="bg-stone-950 rounded-[2rem] border border-stone-800 p-6 md:p-8 text-white">
        <div className="text-xs uppercase tracking-widest text-stone-400 mb-3">{language === "es" ? "Vista previa del flujo" : "Flow preview"}</div>
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
            <div className="text-xs uppercase tracking-widest text-stone-400 mb-2">{previewTitle}</div>
            <pre className="whitespace-pre-wrap text-sm text-stone-300 leading-relaxed font-sans">{demoMessage}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Work Process Timeline (Redesigned Zigzag with animations) ---
// --- Rocket Fire Animation CSS-in-JS ---
const RocketFireEffect = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* Main flame */}
      <div className="relative">
        <motion.div
          className="w-3 h-5 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #FFC107, #FF6B00, transparent)',
            boxShadow: '0 4px 12px rgba(255,107,0,0.6), 0 2px 6px rgba(255,193,7,0.4)'
          }}
          animate={{
            scaleY: [1, 1.4, 0.8, 1.2, 1],
            scaleX: [1, 0.8, 1.1, 0.9, 1],
            opacity: [1, 0.7, 1, 0.8, 1]
          }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner bright core */}
        <motion.div
          className="absolute inset-x-0 top-0 h-2 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #FFF7CC, #FFC107)',
            boxShadow: '0 0 8px rgba(255,247,204,0.8)'
          }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
      </div>
      {/* Glow */}
      <motion.div
        className="w-6 h-2 rounded-full -mt-1"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,193,7,0.5), transparent)',
          boxShadow: '0 6px 20px rgba(255,107,0,0.3)'
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
    </div>
  );
};

const ProcessTimeline = ({ copy, language }) => {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketBoost, setRocketBoost] = useState(false);
  const stepRefs = useRef([]);
  const icons = [Search, Palette, Code, FlaskConical, Rocket];
  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-violet-400",
    "from-emerald-500 to-green-400",
    "from-orange-500 to-amber-400",
    "from-yellow-400 to-amber-500"
  ];
  const solidColors = [
    "#3B82F6", "#A855F7", "#10B981", "#F97316", "#FBBF24"
  ];
  const glowColors = [
    "rgba(59,130,246,0.5)",
    "rgba(168,85,247,0.5)",
    "rgba(16,185,129,0.5)",
    "rgba(249,115,22,0.5)",
    "rgba(250,204,21,0.5)"
  ];
  const stepLabel = language === "es" ? "PASO" : "STEP";

  // Scroll-based line painting progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate progress: 0% when section enters viewport, 100% when section leaves
      const start = windowHeight * 0.8;
      const end = -sectionHeight * 0.3;
      const progress = Math.max(0, Math.min(1, (start - sectionTop) / (start - end)));
      setScrollProgress(progress);

      // Rocket boost when reaching last step
      if (progress > 0.9 && !rocketBoost) {
        setRocketBoost(true);
        setTimeout(() => setRocketBoost(false), 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [rocketBoost]);

  return (
    <section id="proceso" className="py-20 md:py-32 relative overflow-visible lg:overflow-hidden" style={{ backgroundColor: 'var(--bg-global)' }}>
      <div ref={timelineRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.processTitle} subtitle={copy.processSubtitle} badge={copy.processBadge} />

        {/* Desktop: Zigzag Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto" style={{ minHeight: '600px' }}>
          {/* Animated center line - thick, paints yellow on scroll */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] process-line-bg" style={{ borderRadius: '2px' }}>
            <div
              className="w-full transition-all duration-100 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                background: 'linear-gradient(to bottom, #FBBF24, #F59E0B, #FFC107)',
                borderRadius: '2px',
                boxShadow: scrollProgress > 0 ? '0 0 12px rgba(255,193,7,0.4)' : 'none'
              }}
            />
          </div>

          {copy.processSteps.map((step, index) => {
            const Icon = icons[index];
            const isLeft = index % 2 === 0;
            const isLast = index === copy.processSteps.length - 1;
            // Calculate if this node is "active" based on scroll progress
            const nodeThreshold = (index + 0.5) / copy.processSteps.length;
            const isActive = scrollProgress >= nodeThreshold;

            return (
              <div
                key={step.num}
                ref={(el) => { stepRefs.current[index] = el; }}
                className={`relative flex items-center mb-12 md:mb-16 last:mb-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card with slide-in from side */}
                <motion.div
                  className={`w-[calc(50%-40px)] ${isLeft ? 'pr-0' : 'pl-0'}`}
                  initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="rounded-[24px] p-6 md:p-8 transition-all duration-500 group relative"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg flex-shrink-0`}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        style={{ color: solidColors[index] }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <div className="process-step-number mb-1">
                          {stepLabel} {step.num}
                        </div>
                        <h3 className="process-step-title text-lg md:text-xl group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                      </div>
                    </div>
                    <p className="process-step-desc text-sm md:text-base">{step.desc}</p>
                  </div>
                </motion.div>

                {/* Center node - changes color when active */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isActive ? 'bg-yellow-400 border-yellow-300 border-4' : 'bg-[var(--bg-secondary)] border-4 border-[var(--glass-border)]'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    style={isActive ? { boxShadow: `0 0 20px ${glowColors[index]}, 0 0 40px ${glowColors[index]}` } : {}}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full"
                      style={{ background: isActive ? '#FFC107' : solidColors[index] }}
                      animate={isActive ? {
                        boxShadow: [`0 0 4px ${glowColors[index]}`, `0 0 16px ${glowColors[index]}`, `0 0 4px ${glowColors[index]}`]
                      } : {
                        boxShadow: [`0 0 0px ${glowColors[index]}`, `0 0 10px ${glowColors[index]}`, `0 0 0px ${glowColors[index]}`]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for the other side */}
                <div className="w-[calc(50%-40px)]" />
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden max-w-3xl mx-auto relative">
          {/* Animated vertical line - paints yellow on scroll (2px, shifted left) */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] process-line-bg" style={{ borderRadius: '1px' }}>
            <div
              className="w-full transition-all duration-100 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                background: 'linear-gradient(to bottom, #FBBF24, #F59E0B, #FFC107)',
                borderRadius: '1px'
              }}
            />
          </div>

          {copy.processSteps.map((step, index) => {
            const Icon = icons[index];
            const isLast = index === copy.processSteps.length - 1;
            const nodeThreshold = (index + 0.5) / copy.processSteps.length;
            const isActive = scrollProgress >= nodeThreshold;

            return (
              <React.Fragment key={step.num}>
                <motion.div
                  className="relative flex items-start gap-4 pl-1"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${isActive ? 'bg-yellow-400 border-yellow-300 border-2' : 'bg-[var(--bg-secondary)] border-2 border-[var(--glass-border)]'}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.12 + 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full"
                        style={{ background: isActive ? '#FFC107' : solidColors[index] }}
                        animate={{
                          boxShadow: [`0 0 0px ${glowColors[index]}`, `0 0 12px ${glowColors[index]}`, `0 0 0px ${glowColors[index]}`]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Card — transparent (mobile) */}
                  <div
                    className="flex-1 rounded-2xl p-3.5 sm:p-4 transition-all duration-500 group mb-0"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <motion.div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center flex-shrink-0`}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.12 + 0.15, type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <div className="process-step-number mb-0.5">
                          {stepLabel} {step.num}
                        </div>
                        <h3 className="process-step-title text-sm sm:text-base group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                      </div>
                    </div>
                    <p className="process-step-desc text-[11px] sm:text-sm">{step.desc}</p>
                  </div>
                </motion.div>

                {!isLast && (
                  <motion.div
                    className="flex justify-center py-0.5"
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.12 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "center center" }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center ml-4">
                      <ChevronDown size={12} className="text-stone-400 dark:text-stone-400" />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Rocket Launch Finale - Desktop + Mobile */}
        <motion.div
          className="flex justify-center mt-6 lg:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="relative z-20"
            animate={rocketBoost ? { y: [0, -20, -8, 0] } : { y: [0, -5, 0, -3, 0] }}
            transition={rocketBoost ? { duration: 0.5, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Rocket icon */}
            <motion.div
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center"
              style={{ boxShadow: '0 10px 30px rgba(250,204,21,0.3), 0 5px 15px rgba(250,204,21,0.2)' }}
              animate={rocketBoost ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Rocket className="w-6 h-6 lg:w-8 lg:h-8 text-stone-950" style={{ transform: 'rotate(-45deg)' }} />
            </motion.div>
            {/* Fire effect below rocket */}
            <RocketFireEffect isVisible={true} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Contact Form Section ---
const ContactSection = ({ copy, language }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    const msg = `Hola Fast Page Pro!\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\n${formData.message}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Fire tracking before opening WhatsApp so the event survives navigation.
    trackCtaClick('contact_form_submit', 'whatsapp', { form_name: formData.name || 'anon' });
    trackLeadSubmit('contact_form', { has_email: !!formData.email, has_phone: !!formData.phone });

    setTimeout(() => {
      window.open(waUrl, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)' }}>


      <div ref={formRef} className="container mx-auto px-4 relative z-10 max-w-3xl">
        <SectionTitle title={copy.contactTitle} subtitle={copy.contactSubtitle} badge={copy.contactBadge} />

        <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-stone-200 dark:border-stone-800">
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0 }}>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactName}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
                placeholder="Juan Pérez"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactEmail}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
                placeholder="juan@email.com"
              />
            </motion.div>
          </div>
          <motion.div className="mb-5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactPhone}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm"
              placeholder="+51 999 999 999"
            />
          </motion.div>
          <motion.div className="mb-6" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{copy.contactMessage}</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm resize-none"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
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
          </motion.div>
        </form>
      </div>
    </section>
  );
};

// --- Testimonial Carousel (Hybrid: CSS Auto-Scroll + Native Manual Scroll/Swipe) ---
const TestimonialCarousel = ({ testimonials, copy }) => {
  const scrollRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);
  const lastScrollLeft = useRef(0);
  const velocityRef = useRef(0.6); // px per frame
  const resumeTimerRef = useRef(null);

  // Triple the array for seamless infinite loop
  const tripled = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll via JS (requestAnimationFrame)
  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    const singleSetWidth = () => {
      // Calculate width of one full set of testimonials
      const cards = track.children;
      if (cards.length === 0) return 0;
      const oneCardWidth = cards[0].offsetWidth + 20; // card width + gap
      return oneCardWidth * testimonials.length;
    };

    const step = () => {
      if (!isUserInteracting && track) {
        track.scrollLeft += velocityRef.current;
        const maxScroll = singleSetWidth();
        // Reset position when we've scrolled past one full set
        if (track.scrollLeft >= maxScroll) {
          track.scrollLeft -= maxScroll;
        }
        // Also handle negative scroll (user scrolled left past start)
        if (track.scrollLeft <= 0) {
          track.scrollLeft += maxScroll;
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isUserInteracting, testimonials.length]);

  // Pause on interaction
  const pauseAutoScroll = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  // Resume with delay after interaction ends
  const scheduleResume = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      // Smoothly re-sync: snap to nearest set boundary
      const track = scrollRef.current;
      if (!track) { setIsUserInteracting(false); return; }
      
      const cards = track.children;
      if (cards.length === 0) { setIsUserInteracting(false); return; }
      const oneCardWidth = cards[0].offsetWidth + 20;
      const maxScroll = oneCardWidth * testimonials.length;
      
      // Find the closest valid position within the first set range
      const normalized = track.scrollLeft % maxScroll;
      track.scrollTo({ left: normalized, behavior: 'smooth' });
      
      // Resume after smooth scroll completes
      resumeTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false);
        lastScrollLeft.current = track.scrollLeft;
      }, 500);
    }, 1500);
  };

  // Mouse events
  const handleMouseDown = () => pauseAutoScroll();
  const handleMouseUp = () => scheduleResume();

  // Touch events
  const handleTouchStart = () => pauseAutoScroll();
  const handleTouchEnd = () => scheduleResume();

  // Scroll detection (mouse wheel / trackpad)
  const handleWheel = () => {
    pauseAutoScroll();
    scheduleResume();
  };

  // Hover pause/resume
  const handleMouseEnter = () => pauseAutoScroll();
  const handleMouseLeave = () => scheduleResume();

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <section id="testimonios" className="py-16 md:py-28 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.testimonialsTitle} subtitle={copy.testimonialsSubtitle} badge={copy.testimonialsBadge} />
      </div>

      {/* Hybrid Carousel Track */}
      <div
        className="relative w-full mt-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 py-4 scrollbar-hide cursor-grab active:cursor-grabbing overflow-x-auto scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {tripled.map((t, i) => (
            <TestimonialCard key={`t-${i}`} testimonial={t} index={i % testimonials.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Success Cases Section ---
const CasesSection = ({ copy, language }) => {
  const sectionRef = useRef(null);

  const cases = [
    {
      category: language === "es" ? "WEB PROFESIONAL" : "PROFESSIONAL WEB",
      title: "Vuelo 78 Hotel",
      location: language === "es" ? "Tarapoto, Perú" : "Tarapoto, Peru",
      metric: language === "es" ? "+180% reservas" : "+180% bookings",
      desc: language === "es"
        ? "Sistema de reservas directas por WhatsApp con disponibilidad por fechas y respuesta automatizada del hotel. Tras implementar el sistema, las reservas mensuales pasaron de 15 a 42, eliminando el 90% del trabajo manual en recepción."
        : "Direct booking system via WhatsApp with date-based availability and automated hotel response. After implementation, monthly bookings went from 15 to 42, eliminating 90% of manual reception work.",
      image: "/images/03-portafolio/vuelo78hotel.webp",
      color: "from-blue-500 to-cyan-400"
    },
    {
      category: language === "es" ? "TIENDA ONLINE" : "ONLINE STORE",
      title: "La Casona Gourmet",
      location: language === "es" ? "Lima, Perú" : "Lima, Peru",
      metric: language === "es" ? "+95% pedidos" : "+95% orders",
      desc: language === "es"
        ? "Menú visual interactivo y sistema de reservas y pedidos directos por WhatsApp optimizado para aumentar ventas. Los clientes ahora hacen pedidos en menos de 2 minutos sin necesidad de llamar por teléfono."
        : "Interactive visual menu and direct reservation/ordering system via WhatsApp optimized to increase sales. Customers now order in under 2 minutes without needing to call.",
      image: "/images/03-portafolio/LaCasonaGourmet.webp",
      color: "from-emerald-500 to-green-400"
    },
    {
      category: language === "es" ? "PROYECTO PERSONALIZADO" : "CUSTOM PROJECT",
      title: "E-commerce Builder Pro",
      location: language === "es" ? "Remoto, Global" : "Remote, Global",
      metric: language === "es" ? "SaaS Multi-tenant" : "Multi-tenant SaaS",
      desc: language === "es"
        ? "Plataforma Multi-tenant para la creación masiva de tiendas online rápida y eficiente. Permite a emprendedores lanzar su propio catálogo virtual de manera automatizada con paneles independientes y Super Admin centralizado."
        : "Multi-tenant platform for fast and efficient mass creation of online stores. Allows entrepreneurs to launch their own virtual catalog automatically with independent panels and centralized Super Admin.",
      image: "/images/03-portafolio/EcommerceBuilder.webp",
      color: "from-orange-500 to-amber-400"
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.casesTitle} subtitle={copy.casesSubtitle} badge={copy.casesBadge} />

        <div ref={sectionRef} className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="group relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
              }}
              whileHover={{
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                borderColor: 'rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image — left side on desktop */}
                <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    onError={handleImageFallback}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy" decoding="async"
                  />
                  {/* Dark gradient fade into text area */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-global)]" />
                  <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-transparent to-transparent" />
                </div>

                {/* Content — right side on desktop */}
                <div className="md:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  {/* Category + Metric badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-500">{c.category}</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-[11px] font-semibold border border-blue-500/20">
                      {c.metric}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight">{c.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">{c.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TechItem (Standalone — prevents nested-component re-render flicker) ---
const TechItem = React.memo(({ tech, globalIdx, rowIdx, isRow1, stableParams }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-30px" });
  const [isHovered, setIsHovered] = useState(false);
  const params = stableParams[globalIdx];

  return (
    <motion.div
      ref={itemRef}
      variants={{
        hidden: { opacity: 0, x: isRow1 ? -40 : 40, y: 15, scale: 0.8 },
        visible: {
          opacity: 1,
          x: [0, params.xRange, 0],
          y: [0, -params.yRange, 0],
          scale: 1,
          rotate: 0
        }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={
        isInView
          ? {
              opacity: { duration: 0.4, delay: rowIdx * 0.06 },
              x: { duration: params.duration, repeat: Infinity, ease: "easeInOut", delay: params.delay },
              y: { duration: params.duration, repeat: Infinity, ease: "easeInOut", delay: params.delay },
              scale: { duration: 0.5, delay: rowIdx * 0.06, type: "spring", stiffness: 200, damping: 15 }
            }
          : {}
      }
      whileHover={{ scale: 1.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="tech-item group flex items-center gap-2.5 px-3 py-2 md:px-4 md:py-2.5 rounded-xl cursor-default select-none flex-shrink-0"
    >
      {/* Icon — subtle initial letter */}
      <div
        className="tech-item-icon w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-black"
        style={{ color: isHovered ? tech.color : undefined }}
      >
        {tech.name.charAt(0)}
      </div>
      {/* Name */}
      <span
        className="tech-item-name text-sm font-semibold whitespace-nowrap"
        style={{ color: isHovered ? tech.color : undefined }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
});
TechItem.displayName = 'TechItem';

// --- Tech Stack Section (Stabilized: useMemo + Container Variants + No Flicker) ---
const TechStackSection = ({ copy }) => {
  const sectionRef = useRef(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const row1Y = useTransform(scrollY, [0, 1000], [0, -30]);
  const row2Y = useTransform(scrollY, [0, 1000], [0, 30]);

  // useMemo: stable tech data — computed ONCE, never regenerates on re-render
  const techData = useMemo(() => {
    const row1 = [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Node.js", color: "#339933" },
      { name: "Vite", color: "#646CFF" },
      { name: "GSAP", color: "#88CE02" },
      { name: "Framer Motion", color: "#0055FF" }
    ];
    const row2 = [
      { name: "Vercel", color: "#FFFFFF" },
      { name: "Prisma", color: "#2D3748" },
      { name: "MongoDB", color: "#47A248" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Stripe", color: "#635BFF" },
      { name: "Figma", color: "#F24E1E" }
    ];

    // Pre-compute stable random animation params — never change after mount
    const params = [...row1, ...row2].map(() => ({
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      xRange: 3 + Math.random() * 5,
      yRange: 6 + Math.random() * 5
    }));

    return { row1, row2, params };
  }, []); // Empty deps = computed once on mount

  // Container variants for orchestrated stagger entry
  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 }
    }
  }), []);

  // Triple arrays for seamless infinite mobile carousel (lazy: double instead of triple)
  const row1Double = useMemo(() => [...techData.row1, ...techData.row1], [techData.row1]);
  const row2Double = useMemo(() => [...techData.row2, ...techData.row2], [techData.row2]);

  return (
    <section className="py-16 md:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)', transition: 'background-color 0.5s ease' }}>
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.techTitle} subtitle={copy.techSubtitle} badge={copy.techBadge} />

        {/* ===== DESKTOP: Static grid with orchestrated floating items ===== */}
        <motion.div
          className="max-w-5xl mx-auto space-y-4 hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            style={{ y: row1Y }}
            className="flex flex-wrap justify-center gap-2 md:gap-4">
            {techData.row1.map((tech, idx) => (
              <TechItem
                key={tech.name}
                tech={tech}
                globalIdx={idx}
                rowIdx={idx}
                isRow1
                stableParams={techData.params}
              />
            ))}
          </motion.div>
          <motion.div
            style={{ y: row2Y }}
            className="flex flex-wrap justify-center gap-2 md:gap-4">
            {techData.row2.map((tech, idx) => (
              <TechItem
                key={tech.name}
                tech={tech}
                globalIdx={techData.row1.length + idx}
                rowIdx={idx}
                isRow1={false}
                stableParams={techData.params}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ===== MOBILE: Infinite carousel (2 rows, opposite directions) ===== */}
        <div className="md:hidden space-y-3 mt-6">
          {/* Row 1 - scrolls LEFT */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-global)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-global)] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-3 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" } }}
            >
              {row1Double.map((tech, idx) => (
                <TechItem
                  key={`r1-${tech.name}-${idx}`}
                  tech={tech}
                  globalIdx={idx % techData.row1.length}
                  rowIdx={idx % techData.row1.length}
                  isRow1
                  stableParams={techData.params}
                />
              ))}
            </motion.div>
          </div>

          {/* Row 2 - scrolls RIGHT */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-global)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-global)] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-3 w-max"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
            >
              {row2Double.map((tech, idx) => (
                <TechItem
                  key={`r2-${tech.name}-${idx}`}
                  tech={tech}
                  globalIdx={techData.row1.length + (idx % techData.row2.length)}
                  rowIdx={idx % techData.row2.length}
                  isRow1={false}
                  stableParams={techData.params}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Preloader Component (framer-motion, no GSAP) ---
// --- 21st.dev Inspired: Mouse Spotlight Effect ---
const MouseSpotlight = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--spotlight-x', `${x}px`);
      el.style.setProperty('--spotlight-y', `${y}px`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,215,0,0.06), transparent 40%)',
          mixBlendMode: 'screen'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      />
      {/* Make the parent trigger spotlight visibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,215,0,0.06), transparent 40%)',
          mixBlendMode: 'screen'
        }}
      />
      {children}
    </div>
  );
};

// --- 21st.dev Inspired: Animated Text Reveal (word-by-word) ---
const AnimatedTextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// --- 21st.dev Inspired: Aurora Gradient Background ---
const AuroraGradient = () => {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden">
      {/* Animated aurora mesh - multiple gradient blobs */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,215,0,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 60% at 50% 20%, rgba(168,85,247,0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(255,215,0,0.08) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 30% 70%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 60% at 60% 50%, rgba(168,85,247,0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 60% at 40% 60%, rgba(255,215,0,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 60% 30%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 20% 50%, rgba(168,85,247,0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,215,0,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 60% at 50% 20%, rgba(168,85,247,0.05) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)', top: '10%', left: '-5%' }}
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', bottom: '10%', right: '-5%' }}
        animate={{ x: [0, -40, 30, 0], y: [0, 25, -15, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// --- 21st.dev Inspired: Animated CTA Button Glow ---
const AnimatedGlowButton = ({ children, className = '', ...props }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative group overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {/* Animated glow border */}
      <motion.div
        className="absolute -inset-[2px] rounded-full"
        style={{ background: 'conic-gradient(from 0deg, #FFD700, #FF8C00, #FFD700, #FF6B00, #FFD700)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      {/* Inner button */}
      <div className="relative bg-yellow-400 hover:bg-yellow-500 rounded-full transition-all duration-300 m-[2px]">
        {/* Shine sweep on hover */}
        <span className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="relative flex items-center justify-center gap-2">
          {children}
        </span>
      </div>
    </motion.a>
  );
};

// --- 21st.dev Inspired: Floating Particles ---
const FloatingParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    })), []);

  return (
    <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(255,215,0,0.6)',
            boxShadow: `0 0 ${p.size * 3}px rgba(255,215,0,0.3)`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// --- Glowing Particle Trail (Mobile + Desktop) — Ultra Pro Optimized ---
const GlowingMouseTrail = () => {
  const [particles, setParticles] = useState([]);
  const animFrameRef = useRef(null);
  const lastPosRef = useRef(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    let isMounted = true;
    const isMob = isMobileRef.current;
    const maxParticles = isMob ? 8 : 14;
    // Throttle on mobile to prevent jank during scroll — desktop no throttle needed
    const throttleMs = isMob ? 32 : 0;
    let lastTime = 0;
    const minDist = isMob ? 18 : 8;

    const addParticle = (x, y) => {
      if (!isMounted) return;
      const id = Date.now() + Math.random();
      const isGold = Math.random() > 0.3;
      const size = isMob
        ? Math.random() * 3.5 + 1.5
        : Math.random() * 4 + 2;
      const hue = isGold
        ? (Math.random() > 0.5 ? '250, 204, 21' : '255, 215, 0')
        : '180, 220, 255';
      const glow = Math.random();
      setParticles(prev => {
        const next = [...prev, {
          id, x, y, size, hue, glow,
          life: 1,
          vx: (Math.random() - 0.5) * (isMob ? 1 : 1.5),
          vy: (Math.random() - 0.5) * (isMob ? 1 : 1.5) - 0.3,
        }];
        return next.length > maxParticles ? next.slice(-maxParticles) : next;
      });
    };

    const handleMove = (clientX, clientY) => {
      if (!isMounted) return;
      // Throttle check (mobile only)
      const now = performance.now();
      if (throttleMs > 0 && now - lastTime < throttleMs) return;
      lastTime = now;

      const last = lastPosRef.current;
      if (last) {
        const dx = clientX - last.x;
        const dy = clientY - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > minDist) {
          addParticle(clientX, clientY);
          // On mobile, add a secondary smaller particle for trail density
          if (isMob && dist > 30) {
            addParticle(clientX - dx * 0.3, clientY - dy * 0.3);
          }
          lastPosRef.current = { x: clientX, y: clientY };
        }
      } else {
        addParticle(clientX, clientY);
        lastPosRef.current = { x: clientX, y: clientY };
      }
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      // passive: true — NEVER blocks scrolling or touch events
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animate particles — batch updates, faster decay on mobile
    const decayRate = isMob ? 0.035 : 0.025;
    const animate = () => {
      if (!isMounted) return;
      setParticles(prev => {
        let changed = false;
        const next = [];
        for (const p of prev) {
          const newLife = p.life - decayRate;
          if (newLife > 0) {
            changed = true;
            next.push({
              ...p,
              life: newLife,
              x: p.x + p.vx,
              y: p.y + p.vy,
              size: p.size * newLife,
            });
          }
        }
        return changed ? next : [];
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.glow > 0.7
              ? `radial-gradient(circle, rgba(255,255,255,${p.life * 0.9}) 0%, rgba(${p.hue}, ${p.life}) 30%, transparent 70%)`
              : `radial-gradient(circle, rgba(${p.hue}, ${p.life}) 0%, rgba(${p.hue}, ${p.life * 0.3}) 50%, transparent 100%)`,
            boxShadow: p.glow > 0.5
              ? `0 0 ${p.size}px rgba(${p.hue}, ${p.life * 0.7}), 0 0 ${p.size * 2.5}px rgba(${p.hue}, ${p.life * 0.3})`
              : `0 0 ${p.size * 1.5}px rgba(${p.hue}, ${p.life * 0.5})`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

const GSAPPreloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [slideOut, setSlideOut] = useState(false);
  const completedRef = useRef(false);

  // Animate counter from 0 to 100 in ~400ms
  useEffect(() => {
    const duration = 400; // ms — fast count for snappy feel
    const startTime = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-out for smooth ramp
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Counter done, short pause then fade out
        setTimeout(() => {
          setSlideOut(true);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Safety fallback: never block more than 1.5s
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setSlideOut(true);
      }
    }, 1500);
    return () => clearTimeout(safetyTimer);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!slideOut ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap size={28} className="fill-stone-950" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-3xl tracking-tighter">FastPagePro</span>
            </div>
          </div>
          <div className="text-7xl md:text-8xl font-black text-white mb-6 tabular-nums">
            <span>{count}</span>
            <span className="text-yellow-400">%</span>
          </div>
          <div className="w-64 md:w-80 h-[2px] bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <p className="text-stone-400 text-sm mt-4 tracking-widest uppercase">Cargando experiencia</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

// --- Scroll Animation Hook (IntersectionObserver, no GSAP) ---
const useGSAPScrollReveal = (ref, options = {}) => {
  const { y = 60, stagger = 0.15, delay = 0 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const elements = container.querySelectorAll('.gsap-reveal');
    if (elements.length === 0) return;

    // Set initial hidden state via inline styles
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = `translateY(${y}px)`;
      el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal all elements
            elements.forEach((el) => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [ref, y, stagger, delay]);
};

// --- Master Portfolio Showcase Card (Universal 16:10 Framing) ---
const PortfolioCard = ({ project, language, onClick, index = 0 }) => {
  const isEs = language === "es";

  const getTypeBg = (type) => {
    const bgs = {
      web: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      tienda: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      app: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      custom: "bg-amber-500/15 text-amber-300 border-amber-500/30"
    };
    return bgs[type] || "bg-stone-500/15 text-stone-300 border-stone-500/30";
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.96 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer flex flex-col bg-stone-900/80 border border-white/10 hover:border-yellow-400/50 shadow-xl hover:shadow-[0_20px_50px_rgba(250,204,21,0.15)] transition-all duration-300"
    >
      {/* Top Visual Showcase Stage (Natural 16:10 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-950">
        <motion.img
          src={project.image}
          alt={project.title}
          onError={handleImageFallback}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Ambient Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md border ${getTypeBg(project.type)}`}>
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-stone-950/80 text-emerald-400 backdrop-blur-md border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-yellow-400 text-stone-950 shadow-lg shadow-yellow-500/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>{isEs ? "Ver Proyecto Pro" : "View Pro Project"}</span>
            <span className="text-base">⚡</span>
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      {/* Bottom Editorial Metadata Panel (Dedicated space — never covers the image!) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-stone-900/60 border-t border-white/5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-1.5 font-medium">
            <MapPin size={12} className="text-yellow-400 shrink-0" />
            <span className="truncate">{project.location}</span>
            {project.industryLabel && (
              <>
                <span>•</span>
                <span className="text-stone-300 truncate">{project.industryLabel}</span>
              </>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-tight mb-2">
            {project.title}
          </h3>

          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
            {project.description}
          </p>
        </div>

        <div>
          {/* Micro Tech Tags */}
          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-stone-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Footer Link */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-semibold text-yellow-400">
            <span>{isEs ? "Explorar caso de estudio" : "Explore case study"}</span>
            <span className="group-hover:translate-x-1 transition-transform">⚡ ↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Featured Portfolio Section (Landing — 3 Projects + CTA) ---
const FeaturedPortfolioSection = ({ copy, projects, language, onViewAll, onProjectClick }) => {
  const sectionRef = useRef(null);
  const featured = projects.slice(0, 3);

  return (
    <section id="portafolio" className="pt-6 pb-16 md:pt-10 md:pb-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)', transition: 'background-color 0.5s ease' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--accent-glow)' }} />

      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.portfolioTitle} subtitle={copy.portfolioSubtitle} badge={copy.portfolioBadge} compact />

        {/* 3 Featured Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-14 max-w-6xl mx-auto">
          {featured.map((project, index) => (
            <PortfolioCard
              key={project.title}
              project={project}
              language={language}
              index={index}
              onClick={() => { if (onProjectClick) onProjectClick(project); }}
            />
          ))}
        </div>

        {/* CTA — View All Portfolio */}
        <div className="text-center">
          <motion.button
            onClick={() => { if (onViewAll) onViewAll(); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#0A0A0A',
              boxShadow: '0 4px 25px rgba(255, 215, 0, 0.25)'
            }}
          >
            <LayoutGrid size={18} />
            {language === 'es' ? 'Ver Portafolio Completo' : 'View Full Portfolio'}
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// --- Full Portfolio Page (Dedicated /portafolio route) ---
const FullPortfolioPage = ({ copy, projects, language, onBack, onProjectClick }) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeFilterEn, setActiveFilterEn] = useState("All");
  const sectionRef = useRef(null);
  const portfolioTouchStart = useRef(null);

  const categories = PORTFOLIO_CATEGORIES[language] || PORTFOLIO_CATEGORIES.es;
  const currentFilter = language === "en" ? activeFilterEn : activeFilter;
  const setCurrentFilter = language === "en" ? setActiveFilterEn : setActiveFilter;

  const filteredProjects = projects.filter(p => {
    if (currentFilter === "Todos" || currentFilter === "All") return true;
    return p.category === currentFilter;
  });

  const getCategoryIcon = (category) => {
    if (category.includes("Web")) return Monitor;
    if (category.includes("Tienda") || category.includes("Store")) return ShoppingCart;
    if (category.includes("App") || category.includes("Mobile")) return Smartphone;
    return Code;
  };

  const getTypeColor = (type) => {
    const colors = { web: "from-blue-500 to-cyan-400", tienda: "from-emerald-500 to-green-400", app: "from-purple-500 to-violet-400", custom: "from-orange-500 to-amber-400" };
    return colors[type] || "from-stone-500 to-stone-400";
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-global)', transition: 'background-color 0.5s ease' }}>
      {/* Section Title + Filters — No Hero */}
      <div className="pt-28 pb-4 md:pt-32 md:pb-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
            <div>
              <SectionTitle title={copy.portfolioTitle} subtitle={copy.portfolioSubtitle} compact />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))', color: 'var(--accent)' }}
            >
              <Briefcase size={15} />
              {projects.length} {language === 'es' ? 'proyectos' : 'projects'}
            </motion.div>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center">
            <div className="portfolio-filter-glass inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setCurrentFilter(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`portfolio-filter-btn ${currentFilter === cat ? 'active' : ''} px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold tracking-wide`}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    {cat !== "Todos" && cat !== "All" && (() => { const Icon = getCategoryIcon(cat); return <Icon size={13} />; })()}
                    {cat}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Portfolio Grid — swipeable on mobile */}
      <div className="px-4 mb-16 md:mb-24">
        <div className="container mx-auto">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            onTouchStart={(e) => { portfolioTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (portfolioTouchStart.current === null || window.innerWidth >= 640) return;
              const diff = portfolioTouchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                const cats = categories;
                const currentIdx = cats.indexOf(currentFilter);
                const nextIdx = diff > 0 ? Math.min(cats.length - 1, currentIdx + 1) : Math.max(0, currentIdx - 1);
                setCurrentFilter(cats[nextIdx]);
              }
              portfolioTouchStart.current = null;
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <PortfolioCard
                  key={`${project.title}-${currentFilter}`}
                  project={project}
                  language={language}
                  index={index}
                  onClick={() => { if (onProjectClick) onProjectClick(project); }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Bar — Immersive */}
      <div className="px-4 pb-20 md:pb-32">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: 45, suffix: "+", label: language === "es" ? "proyectos creados" : "projects created", icon: Rocket },
              { value: 300, suffix: "%", label: language === "es" ? "aumento en ventas" : "sales increase", prefix: "+", icon: TrendingUp },
              { value: 4, suffix: "", label: language === "es" ? "países" : "countries", icon: Globe },
              { value: 100, suffix: "%", label: language === "es" ? "satisfacción" : "satisfaction", icon: Zap }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -4 }} className="text-center group">
                  <motion.div whileHover={{ scale: 1.15, rotate: -5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="inline-flex items-center justify-center mb-3">
                    <Icon size={20} className="text-yellow-400/60 group-hover:text-yellow-400 transition-colors duration-300" strokeWidth={1.5} />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {stat.prefix || ""}<AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-[11px] md:text-xs uppercase tracking-widest mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ copy, projects, language, onProjectClick }) => {
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
    <section id="portafolio" className="pt-6 pb-16 md:pt-10 md:pb-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)', transition: 'background-color 0.5s ease' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--accent-glow)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.portfolioTitle} subtitle={copy.portfolioSubtitle} badge={copy.portfolioBadge} compact />
        
        {/* Category Filter — Glassmorphism floating pill */}
        <div className="flex justify-center mb-8 md:mb-12 gsap-reveal">
          <div className="portfolio-filter-glass inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setCurrentFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`portfolio-filter-btn ${currentFilter === cat ? 'active' : ''} px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold tracking-wide`}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  {cat !== "Todos" && cat !== "All" && (() => {
                    const Icon = getCategoryIcon(cat);
                    return <Icon size={13} />;
                  })()}
                  {cat}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      
        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const Icon = getCategoryIcon(project.category);
              const gradientColor = getTypeColor(project.type);

              return (
                <motion.div
                  key={`${project.title}-${activeFilter}`}
                  onClick={() => {
                    if (onProjectClick) onProjectClick(project);
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group relative portfolio-card rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer block no-underline"
                  style={{ aspectRatio: '4/5' }}
                >
                  {/* Image with zoom-in on hover */}
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    onError={handleImageFallback}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                    loading="lazy" decoding="async"
                  />
                  
                  {/* Bottom gradient overlay — always dark for text legibility */}
                  <div className="absolute inset-0 portfolio-card-overlay pointer-events-none" />

                  {/* Top gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

                  {/* Content overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: '28px 22px 36px 22px' }}>
                    <p className="text-[11px] sm:text-xs font-bold tracking-wide uppercase mb-1.5" style={{ color: '#FFD700' }}>{project.category}</p>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
                    <p className="text-[11px] sm:text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{project.location}</p>
                    <p className="text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300 hover:gap-3" style={{ color: '#FFD700' }}>
                      {language === 'es' ? 'Ver Proyecto Pro ↗' : 'View Pro Project ↗'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Stats Social Proof — Immersive floating style, no card background */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { value: 45, suffix: "+", label: language === "es" ? "proyectos creados" : "projects created", icon: Rocket },
            { value: 300, suffix: "%", label: language === "es" ? "aumento en ventas" : "sales increase", prefix: "+", icon: TrendingUp },
            { value: 4, suffix: "", label: language === "es" ? "países" : "countries", icon: Globe },
            { value: 100, suffix: "%", label: language === "es" ? "satisfacción" : "satisfaction", icon: Zap }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="inline-flex items-center justify-center mb-3"
                >
                  <Icon
                    size={20}
                    className="text-yellow-400/60 group-hover:text-yellow-400 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <div
                  className="text-3xl md:text-4xl font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {stat.prefix || ""}<AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-[11px] md:text-xs uppercase tracking-widest mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Services Section (Premium Glassmorphism + Floating Icons) ---
const ServicesSection = ({ copy, language }) => {
  const sectionRef = useRef(null);

  const services = [
    {
      icon: Monitor,
      title: copy.servicesWebTitle,
      points: copy.servicesWebPoints,
      color: "#3B82F6",
      colorRgb: "59, 130, 246"
    },
    {
      icon: ShoppingCart,
      title: copy.servicesTiendaTitle,
      points: copy.servicesTiendaPoints,
      color: "#10B981",
      colorRgb: "16, 185, 129"
    },
    {
      icon: Smartphone,
      title: copy.servicesAppTitle,
      points: copy.servicesAppPoints,
      color: "#8B5CF6",
      colorRgb: "139, 92, 246"
    },
    {
      icon: Code,
      title: copy.servicesCustomTitle,
      points: copy.servicesCustomPoints,
      color: "#F59E0B",
      colorRgb: "245, 158, 11"
    }
  ];

  return (
    <section id="servicios" className="py-20 md:py-28 theme-bg relative overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 relative z-10">
        <SectionTitle title={copy.servicesTitle} subtitle={copy.servicesSubtitle} badge={copy.servicesBadge} />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.12
                }}
                whileHover={{ scale: 1.02 }}
                className="group relative cursor-default"
                style={{
                  background: 'transparent',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid var(--line-color)',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Horizontal layout: Icon left, content right */}
                <div className="flex items-start gap-5">
                  {/* Floating icon with glow */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="flex-shrink-0"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0px 0px 20px rgba(${service.colorRgb}, 0.5)`,
                      transition: 'box-shadow 0.5s ease'
                    }}
                  >
                    <Icon className="w-6 h-6 text-white drop-shadow-md" />
                  </motion.div>

                  {/* Content - forced white text */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {service.title}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2.5">
                      {service.points && service.points.map((point, pi) => (
                        <motion.li
                          key={pi}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.12 + pi * 0.08, duration: 0.5 }}
                          className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="mt-0.5 flex-shrink-0 font-black text-sm"
                            style={{ color: service.color }}
                          >
                            ✓
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
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
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

// --- Super Intelligent FastPage AI Knowledge & Intent Reasoning Engine ---
const queryFastPageAI = (rawQuery, language = 'es') => {
  const isEs = language === 'es';
  const q = rawQuery
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents: é -> e, á -> a, etc.
    .trim();

  // Helper matcher
  const has = (...words) => words.some(w => q.includes(w));
  const allProjects = PORTFOLIO_BY_LANG[language] || PORTFOLIO_BY_LANG.es || [];

  // Helper to format case study markdown link
  const linkTo = (title, slug) => `[${title}](https://fastpagepro.com/portafolio/${slug})`;

  // 1. GREETINGS & CASUAL CONVERSATION
  if (
    has('hola', 'que tal', 'buenas', 'buen dia', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'hello', 'hi', 'como estas', 'que haces', 'quien eres', 'saludos', 'alo', 'oye', 'como va', 'wsp', 'wassap') &&
    q.length < 40
  ) {
    return {
      text: isEs
        ? "¡Hola! 👋 Qué gusto saludarte. Soy **FastPage AI**, el asesor de proyectos de **FastPagePro**.\n\nAyudamos a empresas y marcas en **EE.UU., Perú y Latinoamérica** a vender más con ingeniería web de alta velocidad:\n\n• **Páginas Web & Landings de Alto Impacto:** Carga ultrarrápida (< 0.8s en React nativo).\n• **Sistemas de Reservas Directas por WhatsApp:** Hoteles, eco-lodges y clínicas sin comisiones.\n• **Tiendas Online E-Commerce & ERP:** Pasarelas seguras (Stripe, PayPal, Niubiz) y sincronización con Bsale.\n• **Agentes de IA Autónomos:** Atención y captura de clientes calificados 24/7.\n\nCada proyecto se cotiza a medida según tu país y necesidades. ¿De qué rubro es tu empresa o qué proyecto buscas desarrollar?"
        : "Hello! 👋 Great to meet you. I'm **FastPage AI**, project advisor at **FastPagePro**.\n\nWe engineer custom high-speed web platforms for companies in the **US, Peru, and across the Americas**:\n\n• **High-Conversion Websites:** Sub-second load times engineered with React 19.\n• **Direct WhatsApp Booking Engines:** 0% commission fees for hotels and lodges.\n• **E-Commerce & ERP Sinks:** Stripe, PayPal, and real-time inventory management.\n• **Autonomous AI Agents:** 24/7 client qualification and scheduling.\n\nEvery project is tailored by country and scope. What kind of project do you have in mind?",
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'WhatsApp Directo' : 'WhatsApp Direct', action: 'whatsapp' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan los proyectos?",
        "🏨 Ver proyectos para hoteles",
        "⚖️ Ver casos de firmas de abogados",
        "🇺🇸 ¿Cómo trabajan con clientes en USA?"
      ] : [
        "💰 How do you price projects?",
        "🏨 View hotel case studies",
        "⚖️ View legal web cases",
        "🇺🇸 How do you work with US clients?"
      ]
    };
  }

  // 2. PRICING, COSTS & CUSTOM PROPOSAL POLICY BY COUNTRY (PERU VS USA)
  if (
    has('precio', 'precios', 'costo', 'costos', 'cuanto cobra', 'cuanto cobran', 'cuanto cuesta', 'tarifa', 'tarifas', 'plan', 'planes', 'presupuesto', 'cotizar', 'cotizacion', 'caro', 'barato', 'pago', 'pagos', 'cuotas', 'cuanto sale', 'valor', 'cobran')
  ) {
    return {
      text: isEs
        ? "💼 **Propuesta y Precios Personalizados según País y Negocio**\n\nEn **FastPagePro** no cobramos precios genéricos cerrados al azar, ya que cada proyecto tiene requerimientos técnicos, objetivos y mercados completamente diferentes:\n\n🌎 **Estructura adaptada a cada mercado:**\n• 🇵🇪 **Para Clientes en Perú (PEN):** Cotización adaptada en Soles o USD, pasarelas de pago peruanas (**Yape, Plin, Niubiz, MercadoPago, BCP/BBVA**) y emisión de factura electrónica SUNAT con crédito fiscal (RUC 20 / RUC 10).\n• 🇺🇸 **Para Clientes en Estados Unidos (Habla Hispana y Bilingüe - USD):** Propuestas en USD con arquitectura bilingüe (Inglés/Español), optimización de SEO local en Google Maps para tu ciudad o estado, métodos de pago norteamericanos (**Zelle, Stripe, transferencias bancarias**) y facturas formales deducibles de impuestos (**W-9**).\n• 🌎 **Para otros países de LATAM (México, Colombia, Chile, etc.):** Cotizaciones en USD con métodos internacionales seguros.\n\n🛡️ **Modalidad de Trabajo Seria y Segura:**\nTrabajamos por hitos: **50% al iniciar y 50% contra entrega final** tras tu completa satisfacción. Cero mensualidades forzadas ni comisiones por ventas.\n\n📌 **¿Por qué es recomendable agendar una videollamada de 15 minutos?**\n**¡Es el estándar más profesional!** No te damos un precio a ciegas porque una landing de conversión rápida requiere una arquitectura distinta a una plataforma con reservas o conexión a ERP. En una **breve llamada de 15 min en Google Meet** evaluamos tus requerimientos y te entregamos una propuesta seria, transparente y con plazos garantizados."
        : "💼 **Custom Tailored Pricing by Country and Business Scope**\n\nAt **FastPagePro**, we do not provide rigid generic price tags because every project requires distinct engineering tailored to your market:\n\n• 🇵🇪 **Peru & LATAM:** Scoped in Soles (PEN) or USD with local payment gateways (Yape, Plin, Niubiz) and full SUNAT tax compliance.\n• 🇺🇸 **US Clients:** USD scoping with bilingual English/Spanish copywriting, local Google Maps SEO, and compliant payment methods (Zelle, Stripe, Wire) with W-9 invoices.\n• 🛡️ **Milestone Guarantee:** 50% upfront, 50% upon final delivery & complete satisfaction.\n\n📌 **Why schedule a 15-minute call?**\nGiving a blind quote is unprofessional. In a quick **15-minute Google Meet call**, our lead architect evaluates your exact needs and delivers a formal, transparent proposal with guaranteed timelines.",
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'Cotizar por WhatsApp' : 'Quote via WhatsApp', action: 'whatsapp' }
      ],
      followUps: isEs ? [
        "⚡ ¿Cuáles son los tiempos de entrega?",
        "🇺🇸 ¿Cómo trabajan con clientes en USA?",
        "💼 Ver proyectos realizados",
        "🤖 ¿Cómo funcionan los Agentes de IA?"
      ] : [
        "⚡ What are delivery times?",
        "🇺🇸 How do you work with US clients?",
        "💼 View completed case studies",
        "🤖 How do AI Agents work?"
      ]
    };
  }

  // 3. TARGETING HISPANIC ENTREPRENEURS & CONTRACTORS IN THE USA
  if (has('usa', 'estados unidos', 'eeuu', 'ee.uu', 'florida', 'texas', 'california', 'miami', 'dolar', 'dolares', 'zelle', 'w9', 'bilingue', 'english', 'us market', 'houston', 'orlando', 'dallas', 'new york', 'contratista')) {
    return {
      text: isEs
        ? "🇺🇸 **Especialistas en Negocios Hispanos en Estados Unidos**\n\nTrabajamos intensamente con dueños de empresas en **Texas, Florida, California, Nueva York, Georgia y más** (contratistas, remodelación, roofing, pintura, limpieza comercial, landscaping, clínicas y servicios profesionales).\n\n✅ **Lo que resolvemos para tu negocio en EE.UU.:**\n• **Sitios Web 100% Bilingües (Inglés / Español):** Captura tanto clientes anglosajones de alto ticket como a la creciente comunidad hispana.\n• **SEO Local en Google Maps:** Optimizamos tu ficha de Google Business para que aparezcas primero cuando busquen tus servicios en tu ciudad o código postal.\n• **Facilidad de Pago en USD:** Aceptamos Zelle, transferencias bancarias de EE.UU., tarjetas de crédito con Stripe e invoices formales deducibles (W-9).\n• **Precios y Propuestas para EE.UU.:** Adaptadas a la rentabilidad del mercado estadounidense con atención directa en español en tu misma zona horaria.\n\n¿En qué estado o ciudad de EE.UU. opera tu empresa?"
        : "🇺🇸 **Specialized Web Engineering for US Hispanic & Cross-Border Businesses**\n\nWe partner with contractors, restaurants, clinics, and professional firms across Florida, Texas, California, and nationwide.\n\n• **Bilingual English/Spanish Copywriting & UI**\n• **Local Google Maps SEO** for your target city\n• **Direct USD Payments** via Zelle, Stripe & Wire with W-9 invoices\n• Aligned business hours for seamless communication.",
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'WhatsApp Directo' : 'Chat on WhatsApp', action: 'whatsapp' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan proyectos para USA?",
        "⚡ ¿Tiempos de entrega para USA?",
        "📅 Agendar reunión de 15 min"
      ] : [
        "💰 Pricing for US projects?",
        "⚡ Delivery turnaround?",
        "📅 Book 15 min call"
      ]
    };
  }

  // 4. LEGAL, LAW FIRMS & TAX ADVISORY
  if (has('abogado', 'abogados', 'firma legal', 'estudio juridico', 'leyes', 'penal', 'civil', 'litigio', 'notaria', 'derecho', 'roma abogados', 'medina almonte', 'bufete', 'juridico')) {
    return {
      text: isEs
        ? "⚖️ **Plataformas Digitales de Élite para Estudios Jurídicos y Firmas Legales**\n\nDesarrollamos sitios web institucionales con diseño sobrio que proyectan autoridad y convierten visitantes en consultas formales:\n\n• 🏛️ " + linkTo("Medina Almonte - Lawyers Firm", "medina-almonte-firma-legal") + ": Plataforma corporativa para litigio penal y corporativo con blog jurídico dinámico en Sanity CMS y formulario de agendamiento.\n• ⚖️ " + linkTo("ROMA & ABOGADOS", "roma-abogados") + ": Web de alto impacto orientada a defensa tributaria y penal ante SUNAT con enrutamiento de consultas directo a WhatsApp.\n• 📊 " + linkTo("Jhon & Asociados", "jhon-asociados") + " e " + linkTo("Impulso Fiscal", "impulso-fiscal") + ": Consultoría contable y fiscal con boletín 'Semana Fiscal'.\n\n🛡️ **Incluye:** Perfiles de socios, áreas de práctica, agendamiento de citas y SEO jurídico para Google."
        : "⚖️ **Elite Digital Platforms for Law Firms & Legal Advisory**\n\n• 🏛️ " + linkTo("Medina Almonte - Lawyers Firm", "medina-almonte-firma-legal") + ": Corporate litigation platform with headless legal blog and appointment scheduler.\n• ⚖️ " + linkTo("ROMA & ABOGADOS", "roma-abogados") + ": Tax defense and litigation portal with direct WhatsApp routing.\n• 📊 " + linkTo("Jhon & Asociados", "jhon-asociados") + " & " + linkTo("Impulso Fiscal", "impulso-fiscal") + ": Corporate tax advisory websites.",
      buttons: [
        { text: isEs ? 'Ver Medina Almonte' : 'View Medina Almonte', action: 'case-study', slug: 'medina-almonte-firma-legal' },
        { text: isEs ? 'Ver ROMA Abogados' : 'View ROMA Abogados', action: 'case-study', slug: 'roma-abogados' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan una web para abogados?",
        "⚡ ¿En cuánto tiempo está lista la web?",
        "💬 Hablar con un asesor"
      ] : [
        "💰 Pricing for law firm web?",
        "⚡ Delivery turnaround?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 5. HOTELS, TOURISM, LODGES & AMAZON ECO-STAYS
  if (has('hotel', 'hoteles', 'reserva', 'reservas', 'booking', 'habitacion', 'habitaciones', 'huesped', 'huespedes', 'turismo', 'viajes', 'tours', 'selva', 'tarapoto', 'puno', 'huanchaco', 'cusco', 'machu picchu', 'lodge', 'cabaña', 'cabañas', 'vuelo 78', 'intiquilla', 'rainforest', 'titicaca')) {
    return {
      text: isEs
        ? "🏨 **Sistema de Reservas Directas por WhatsApp (Cero Comisiones para Hoteles y Turismo)**\n\nNuestra solución estrella permite a hoteles y operadores turísticos saltarse el 15% - 20% de comisiones que cobran plataformas como Booking.com o Airbnb:\n\n• 🌴 " + linkTo("Vuelo 78 Hotel Tarapoto", "vuelo-78-hotel") + ": Pasó de 15 a 42 reservas directas mensuales con flujo automatizado de disponibilidad y confirmación.\n• 🌊 " + linkTo("Hotel Puno Terra", "hotel-puno-terra") + ": Catálogo de habitaciones en Lago Titicaca con selector de fechas y cálculo automático de noches.\n• 🏄‍♂️ " + linkTo("El Hombre Hotel Huanchaco", "el-hombre-hotel") + ": Hotel boutique de surf frente al mar con reservas directas y galería inmersiva.\n• 🏔️ " + linkTo("Intiquilla Adventures", "intiquilla-adventures") + ": Operador de trekking en Cusco y Machu Picchu con itinerarios interactivos.\n• 🦜 " + linkTo("Rainforest Wild", "rainforest-wild") + ": Eco-lodge en la selva de Tambopata con expediciones guiadas.\n• ✈️ " + linkTo("Peru Travel Experts", "peru-travel-experts") + " y " + linkTo("Peru Travel", "peru-travel") + ": Agencias de turismo receptivo con cotización de paquetes a medida.\n\n💡 **0% de comisiones:** El 100% del pago entra directo a la cuenta bancaria de tu negocio."
        : "🏨 **Direct WhatsApp Booking Engine (0% Commission Fees)**\n\n• 🌴 " + linkTo("Vuelo 78 Hotel Tarapoto", "vuelo-78-hotel") + ": Jumped from 15 to 42 direct monthly bookings via automated availability funnels.\n• 🌊 " + linkTo("Hotel Puno Terra", "hotel-puno-terra") + ": Room selector on Lake Titicaca.\n• 🏄‍♂️ " + linkTo("El Hombre Hotel", "el-hombre-hotel") + ": Beachfront surf hotel.\n• 🏔️ " + linkTo("Intiquilla Adventures", "intiquilla-adventures") + ": Cusco trekking and adventure portal.",
      buttons: [
        { text: isEs ? 'Ver Vuelo 78 Hotel' : 'View Vuelo 78 Hotel', action: 'case-study', slug: 'vuelo-78-hotel' },
        { text: isEs ? 'Ver Hotel Puno Terra' : 'View Hotel Puno Terra', action: 'case-study', slug: 'hotel-puno-terra' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan el sistema de reservas?",
        "⚡ ¿Cuánto tardan en implementarlo?",
        "💬 Hablar por WhatsApp"
      ] : [
        "💰 How is this system quoted?",
        "⚡ Turnaround time?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 6. FASHION, SHOES, CLOTHING, GAMARRA & RETAIL
  if (has('moda', 'ropa', 'calzado', 'zapatos', 'botas', 'carteras', 'zapatillas', 'textil', 'gamarra', 'camisas', 'tallas grandes', 'urban', 'streetwear', 'boutique', 'vestidos', 'maia store')) {
    return {
      text: isEs
        ? "👠 **Tiendas Online y Catálogos de Alta Conversión para Moda & Calzado**\n\nCreamos experiencias de compra visualmente atractivas optimizadas para celulares (donde ocurre más del 85% de las compras):\n\n• 👡 " + linkTo("Maia Store", "maia-store") + ": Tienda de calzado femenino y carteras con **Sanity CMS** para autogestión de fotos, tallas y promociones sin tocar código.\n• 🧵 " + linkTo("Moda Digital Pro", "moda-digital-pro") + ": Plataforma para fabricantes textiles en Gamarra con catálogo digital y ventas por mayor y menor.\n• 👔 " + linkTo("Camisas en Tallas Grandes", "camisas-tallas-grandes") + ": E-commerce especializado en moda masculina oversize con selector de medidas y checkout ágil.\n• 👟 " + linkTo("Urban Style", "urban-style") + ": Marca de moda urbana con pasarela de pago instantánea y filtros dinámicos.\n\n🛍️ **Incluye:** Checkout a WhatsApp o pasarela segura (Stripe / Niubiz), catálogo visual en WebP y panel administrativo intuitivo."
        : "👠 **High-Conversion E-Commerce & Catalogs for Fashion & Footwear**\n\n• 👡 " + linkTo("Maia Store", "maia-store") + ": Footwear & handbags store with Sanity headless CMS.\n• 🧵 " + linkTo("Moda Digital Pro", "moda-digital-pro") + ": Gamarra textile fashion e-commerce.\n• 👔 " + linkTo("Camisas en Tallas Grandes", "camisas-tallas-grandes") + ": Big & tall clothing e-commerce.\n• 👟 " + linkTo("Urban Style", "urban-style") + ": Streetwear brand with instant checkout.",
      buttons: [
        { text: isEs ? 'Ver Maia Store' : 'View Maia Store', action: 'case-study', slug: 'maia-store' },
        { text: isEs ? 'Ver Moda Digital Pro' : 'View Moda Digital Pro', action: 'case-study', slug: 'moda-digital-pro' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan una tienda de moda?",
        "📱 ¿Cómo se autoadministra el catálogo?",
        "💬 Consultar por WhatsApp"
      ] : [
        "💰 Pricing for fashion e-commerce?",
        "📱 How does self-management work?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 7. FINANCE, LOANS, CREDITS & MORTGAGE GUARANTEES
  if (has('credito', 'creditos', 'prestamo', 'prestamos', 'garantia', 'hipotecario', 'financiera', 'financiero', 'cuotas', 'simulador', 'interes', 'tasa', 'yadiel', 'mandi')) {
    return {
      text: isEs
        ? "💳 **Plataformas Financieras y Simuladores Inteligentes de Préstamos**\n\nDesarrollamos soluciones digitales para el sector financiero que generan máxima confianza y capturan solicitudes pre-calificadas:\n\n• 🏦 " + linkTo("Créditos Yadiel", "creditos-yadiel") + ": Plataforma de préstamos con garantía hipotecaria con **simulador interactivo de cuotas**, cálculo de plazos y recepción formal de solicitudes.\n• 📊 " + linkTo("Mandi Corp", "mandi-corp") + ": Firma de servicios financieros corporativos en Lima con cotizador en tiempo real y diseño sobrio de alta credibilidad.\n\n💡 **Características clave:** Simulador dinámico sin recargar página, validación de datos del solicitante y enrutamiento directo a ejecutivos de crédito."
        : "💳 **Financial Platforms & Interactive Loan Calculators**\n\n• 🏦 " + linkTo("Créditos Yadiel", "creditos-yadiel") + ": Mortgage-backed lending portal with interactive live payment simulator.\n• 📊 " + linkTo("Mandi Corp", "mandi-corp") + ": Corporate financial services portal with lead scoring.",
      buttons: [
        { text: isEs ? 'Ver Créditos Yadiel' : 'View Créditos Yadiel', action: 'case-study', slug: 'creditos-yadiel' },
        { text: isEs ? 'Ver Mandi Corp' : 'View Mandi Corp', action: 'case-study', slug: 'mandi-corp' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan una web financiera?",
        "⚡ ¿Cómo funciona el simulador de cuotas?",
        "💬 Hablar con un asesor"
      ] : [
        "💰 Pricing for financial portal?",
        "⚡ How does the loan calculator work?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 8. BSALE ERP & INDUSTRIAL HARDWARE INTEGRATION
  if (has('bsale', 'ferreteria', 'herramientas', 'inventario', 'sincronizar', 'erp', 'itools', 'dewalt', 'bosch', 'milwaukee', 'stock')) {
    return {
      text: isEs
        ? "⚡ **Integración E-Commerce con ERP Bsale en Tiempo Real**\n\nConectamos tu tienda virtual directamente a tu sistema de facturación e inventario físico:\n\n• 🔧 " + linkTo("iTools Perú", "itools-peru") + ": Tienda online de herramientas y maquinaria industrial (DeWalt, Bosch, Milwaukee, Stanley) sincronizada con **Bsale ERP** mediante webhooks. Mantiene el stock unificado entre tiendas físicas y web, actualiza precios al instante y genera comprobantes electrónicos SUNAT automáticamente.\n• 🚀 Stack de máxima potencia: Next.js 15, base de datos PostgreSQL en Supabase y panel visual en Sanity CMS.\n\n¿Manejas Bsale u otro sistema de inventario en tu negocio?"
        : "⚡ **Real-Time E-Commerce Integration with Bsale ERP**\n\n• 🔧 " + linkTo("iTools Perú", "itools-peru") + ": Industrial hardware e-commerce synchronized with Bsale ERP webhooks, automated electronic invoicing, Supabase PostgreSQL, and Next.js 15.",
      buttons: [
        { text: isEs ? 'Ver Caso iTools Perú' : 'View iTools Case', action: 'case-study', slug: 'itools-peru' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan la integración con Bsale?",
        "⚡ ¿Cuánto tiempo toma conectarlo?",
        "💬 Consultar por WhatsApp"
      ] : [
        "💰 Pricing for Bsale integration?",
        "⚡ Integration timeline?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 9. CROSS-BORDER IMPORTATION, EBAY API & LOGISTICS
  if (has('importar', 'importacion', 'importaciones', 'ebay', 'aduanas', 'arancel', 'aranceles', 'traer de usa', 'flete', 'carga', 'femar', 'sertrade', 'cubicaje', 'cbm', 'casillero')) {
    return {
      text: isEs
        ? "🚢 **Sistemas Enterprise de Importación y Conexión con eBay API**\n\nContamos con arquitectura de comercio exterior para empresas de envíos e importaciones desde Estados Unidos:\n\n• 📦 " + linkTo("Importaciones USA - Perú", "importaciones-usa-peru") + ": Integración directa con la **API oficial de eBay**, sincronización de catálogo de subastas y compras directas, calculadora automática de aranceles SUNAT y tracking logístico de paquetes.\n• ⚓ " + linkTo("Femar Logistics SAC", "femar-logistics") + ": Operador de transporte internacional con cotizador interactivo de cubicaje (CBM) para fletes marítimos y aéreos.\n• 🌐 " + linkTo("Sertrade SAC", "sertrade") + ": Plataforma corporativa de comercio exterior y gestión aduanera.\n\n¿Deseas implementar un cotizador aduanero o una plataforma de compras en USA?"
        : "🚢 **Cross-Border Importation Systems & eBay API Integration**\n\n• 📦 " + linkTo("Importaciones USA - Perú", "importaciones-usa-peru") + ": Real-time official eBay REST API sync, live customs tax estimator, and package tracker.\n• ⚓ " + linkTo("Femar Logistics SAC", "femar-logistics") + ": Global freight forwarder with interactive CBM cargo calculator.\n• 🌐 " + linkTo("Sertrade SAC", "sertrade") + ": International trade and customs platform.",
      buttons: [
        { text: isEs ? 'Ver Importaciones USA' : 'View US Imports', action: 'case-study', slug: 'importaciones-usa-peru' },
        { text: isEs ? 'Ver Femar Logistics' : 'View Femar Logistics', action: 'case-study', slug: 'femar-logistics' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan un sistema con APIs?",
        "🛠️ ¿Qué tecnologías utilizan?",
        "💬 Hablar con un ingeniero"
      ] : [
        "💰 Pricing for API integrations?",
        "🛠️ Tech stack details?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 10. PUBLISHING, BOOKS & EDUCATION ACADEMIES
  if (has('libro', 'libros', 'editorial', 'libreria', 'horizonte', 'academia', 'cursos', 'el profe', 'preuniversitario', 'colegio', 'profesor', 'educacion', 'clases')) {
    return {
      text: isEs
        ? "📚 **Plataformas para Editoriales, Librerías y Academias Educativas**\n\nDesarrollamos soluciones para venta de contenidos, literatura y formación académica:\n\n• 📖 " + linkTo("Editorial Horizonte", "editorial-horizonte") + ": Tienda online literaria con catálogo editorial autogestionable en **Sanity CMS**, buscador de títulos por autor/género y checkout ágil.\n• 🎓 " + linkTo("Academia El Profe", "academia-el-profe") + ": Plataforma educativa orientada a preparación preuniversitaria con catálogo de ciclos académicos, horarios e inscripción directa.\n\n¿Tu proyecto está enfocado en venta de libros o en cursos online?"
        : "📚 **Platforms for Book Publishers & Educational Academies**\n\n• 📖 " + linkTo("Editorial Horizonte", "editorial-horizonte") + ": Literary e-commerce with Sanity CMS catalog management.\n• 🎓 " + linkTo("Academia El Profe", "academia-el-profe") + ": Higher-ed preparation academy platform with course intake funnels.",
      buttons: [
        { text: isEs ? 'Ver Editorial Horizonte' : 'View Editorial Horizonte', action: 'case-study', slug: 'editorial-horizonte' },
        { text: isEs ? 'Ver Academia El Profe' : 'View Academia El Profe', action: 'case-study', slug: 'academia-el-profe' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 11. HEALTHCARE, CLINICS & MEDICAL SPECIALTIES
  if (has('clinica', 'medico', 'medica', 'doctor', 'salud', 'paciente', 'pacientes', 'citas', 'nueva vida', 'semaltemed', 'ocupacional', 'dental', 'estetica', 'psicologo', 'odontologo')) {
    return {
      text: isEs
        ? "🩺 **Plataformas de Confianza Médica y Agendamiento de Pacientes**\n\nTransmitimos autoridad clínica y reducimos a cero las ausencias a consultas médicas:\n\n• 🏥 " + linkTo("Centro Médico Nueva Vida", "nueva-vida-centro-medico") + ": Portal de salud integral con directorio de especialidades (ginecología, pediatría, odontología) y agendamiento de turnos en línea.\n• 🩺 " + linkTo("Semaltemed", "semaltemed") + ": Soluciones en medicina preventiva y salud ocupacional corporativa para cumplimiento normativo de empresas.\n\n💡 **Incluye:** Flujo de reservas médicas, confirmación automática por WhatsApp y diseño sobrio que transmite paz y rigor sanitario."
        : "🩺 **Healthcare & Clinical Web Solutions**\n\n• 🏥 " + linkTo("Centro Médico Nueva Vida", "nueva-vida-centro-medico") + ": Medical directory with appointment booking.\n• 🩺 " + linkTo("Semaltemed", "semaltemed") + ": Occupational medicine & preventative corporate healthcare.",
      buttons: [
        { text: isEs ? 'Ver Centro Médico' : 'View Medical Center', action: 'case-study', slug: 'nueva-vida-centro-medico' },
        { text: isEs ? 'Ver Semaltemed' : 'View Semaltemed', action: 'case-study', slug: 'semaltemed' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 12. ARCHITECTURE, CONSTRUCTION & RESIDENCES
  if (has('arquitectura', 'arquitecto', 'construccion', 'constructora', 'edificacion', 'obras', 'cmc', 'breicorp', 'planos', 'playa', 'residencias', 'ingenieria civil')) {
    return {
      text: isEs
        ? "🏗️ **Plataformas de Prestigio para Arquitectura y Construcción**\n\nProyectamos la envergadura y calidad constructiva de tus proyectos ante clientes e inversionistas:\n\n• 🏛️ " + linkTo("CMC LATAM Arquitectura", "cmc-latam") + ": Web bilingüe para firma de diseño y construcción costera con modo claro/oscuro, galería inmersiva de residencias y renderizado HD.\n• 🏗️ " + linkTo("Breicorp Constructora", "breicorp") + ": Empresa de ingeniería civil, obras de infraestructura y proyectos corporativos a gran escala.\n\n¿Buscas una web para mostrar tu portafolio arquitectónico o captar licitaciones?"
        : "🏗️ **Prestige Platforms for Architecture & Construction**\n\n• 🏛️ " + linkTo("CMC LATAM", "cmc-latam") + ": Bilingual coastal architecture platform with Dark/Light mode and project gallery.\n• 🏗️ " + linkTo("Breicorp", "breicorp") + ": Heavy civil engineering and structural construction firm.",
      buttons: [
        { text: isEs ? 'Ver CMC LATAM' : 'View CMC LATAM', action: 'case-study', slug: 'cmc-latam' },
        { text: isEs ? 'Ver Breicorp' : 'View Breicorp', action: 'case-study', slug: 'breicorp' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 13. COUNTRY CLUBS, EVENTS & RECREATION
  if (has('club', 'campestre', 'cienequilla', 'gincana', 'eventos', 'piscinas', 'cabañas familiares', 'recreacion', 'bungalows')) {
    return {
      text: isEs
        ? "🎪 **Plataformas para Clubes Campestres y Espacios de Eventos**\n\n• 🌳 " + linkTo("Gincana Club Campestre Cieneguilla", "gincana-club-campestre") + ": Web para centro recreacional y eventos corporativos con reserva de áreas verdes, bungalows, piscinas y cotizador para bodas y aniversarios.\n\n¿Deseas gestionar reservas de eventos o membresías familiares para tu local campestre?"
        : "🎪 **Platforms for Country Clubs & Event Venues**\n\n• 🌳 " + linkTo("Gincana Club Campestre", "gincana-club-campestre") + ": Country club in Cieneguilla with bungalow bookings and corporate event planning.",
      buttons: [
        { text: isEs ? 'Ver Gincana Club' : 'View Gincana Club', action: 'case-study', slug: 'gincana-club-campestre' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 14. PACKAGING, INDUSTRIAL BOXES & AGRIBUSINESS
  if (has('packaging', 'cajas', 'carton', 'corrugado', 'empaques', 'embalaje', 'gudstor', 'agro', 'agroindustria', 'cooperativa', 'cafe', 'cacao', 'union el progreso')) {
    return {
      text: isEs
        ? "📦 **Soluciones Digitales para Industrias, Packaging y Agroexportación**\n\n• 📦 " + linkTo("Gudstor Pack", "gudstor-pack") + ": Empresa fabricante de empaques industriales y cajas de cartón corrugado a medida con cotizador por volumen.\n• ☕ " + linkTo("Unión el Progreso", "union-el-progreso") + ": Cooperativa agraria cafetalera y cacaotera con trazabilidad de origen y catálogo de exportación para compradores internacionales.\n\n¿Requieres una plataforma con catálogo B2B para pedidos al por mayor?"
        : "📦 **Digital Solutions for Industrial Packaging & Agribusiness**\n\n• 📦 " + linkTo("Gudstor Pack", "gudstor-pack") + ": Industrial packaging and custom corrugated box solutions.\n• ☕ " + linkTo("Unión el Progreso", "union-el-progreso") + ": Agrarian coffee & cocoa cooperative export portal.",
      buttons: [
        { text: isEs ? 'Ver Gudstor Pack' : 'View Gudstor Pack', action: 'case-study', slug: 'gudstor-pack' },
        { text: isEs ? 'Ver Unión el Progreso' : 'View Unión el Progreso', action: 'case-study', slug: 'union-el-progreso' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 15. GASTRONOMY, RESTAURANTS & QR DIGITAL MENUS
  if (has('restaurante', 'comida', 'menu', 'carta', 'platos', 'cafeteria', 'bar', 'delivery', 'gastronomia', 'casona gourmet')) {
    return {
      text: isEs
        ? "🍽️ **Solución Integral para Restaurantes y Negocios Gastronómicos**\n\nEliminamos los incómodos PDFs pesados que nadie quiere descargar en su celular:\n\n• 🍲 " + linkTo("La Casona Gourmet", "la-casona-gourmet") + ": Carta digital QR ultrarrápida con fotos apetitosas, alérgenos y envío directo del pedido a WhatsApp de cocina sin comisiones de apps externas.\n• **Gestión de Reservas:** Formulario interactivo con fecha, hora y número de personas sin intermediarios."
        : "🍽️ **Gastronomy & Restaurant Solutions**\n\n• 🍲 " + linkTo("La Casona Gourmet", "la-casona-gourmet") + ": Ultra-fast QR digital menu and direct WhatsApp kitchen ordering funnel without 3rd-party commissions.",
      buttons: [
        { text: isEs ? 'Ver La Casona Gourmet' : 'View La Casona Gourmet', action: 'case-study', slug: 'la-casona-gourmet' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 16. SAAS, SMART QUOTING TOOLS & MULTI-TENANT PLATFORMS
  if (has('saas', 'cotizador', 'software', 'plataforma', 'dashboard', 'crm', 'cotizador pro', 'ecommerce builder', 'atlas', 'multitienda')) {
    return {
      text: isEs
        ? "💻 **Desarrollo de Software SaaS y Herramientas Web a Medida**\n\nIngeniería full-stack para digitalizar procesos operativos complejos:\n\n• 📋 " + linkTo("Cotizador Pro", "cotizador-pro") + ": Plataforma SaaS interactiva para cálculo y generación instantánea de cotizaciones comerciales con exportación a PDF profesional.\n• 🏪 " + linkTo("E-Commerce Builder Pro", "ecommerce-builder-pro") + ": Ecosistema SaaS multi-tienda con paneles administrativos independientes y gestión centralizada.\n• 📈 " + linkTo("Atlas App", "atlas") + ": Dashboard corporativo de control financiero y métricas de crecimiento empresarial."
        : "💻 **Custom SaaS Platforms & Enterprise Web Software**\n\n• 📋 " + linkTo("Cotizador Pro", "cotizador-pro") + ": Interactive quote generator SaaS with automated PDF downloads.\n• 🏪 " + linkTo("E-Commerce Builder Pro", "ecommerce-builder-pro") + ": Multi-tenant e-commerce platform.\n• 📈 " + linkTo("Atlas App", "atlas") + ": Enterprise growth metrics and analytics dashboard.",
      buttons: [
        { text: isEs ? 'Ver Cotizador Pro' : 'View Cotizador Pro', action: 'case-study', slug: 'cotizador-pro' },
        { text: isEs ? 'Ver E-Commerce Builder' : 'View E-Commerce Builder', action: 'case-study', slug: 'ecommerce-builder-pro' },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 17. AI AGENTS & AUTOMATIONS (CAPABILITIES & FEATURES)
  if (has('ia', 'agente', 'agentes', 'inteligencia', 'ai', 'bot', 'chatbot', 'automatizar', 'automatizacion', 'gpt', '24/7', 'asistente')) {
    return {
      text: isEs
        ? "🤖 **Agentes de Inteligencia Artificial Autónomos para tu Negocio**\n\nDesarrollamos asistentes de IA avanzados programados con la documentación, catálogo, tarifas y políticas de tu empresa.\n\n🔥 **Lo que logran nuestros Agentes de IA:**\n• **Atención Inmediata 24/7 en Web y WhatsApp:** Responden consultas complejas al instante en tono humano, cordial y profesional.\n• **Calificación Automática de Prospectos:** Filtran curiosos y capturan nombre, teléfono, presupuesto y necesidad exacta.\n• **Agendamiento Autónomo de Citas:** Conectados en tiempo real a tu Google Calendar o CRM para agendar reuniones.\n• **Ahorro Masivo de Costos:** Trabajan día y noche sin sueldos fijos, feriados ni bajas de personal.\n\n¿Te gustaría ver una demo de cómo funcionaría para tu rubro?"
        : "🤖 **Custom Enterprise AI Agents**\n\nWe build autonomous AI agents trained on your business data, catalogs, and workflows.\n\n• 24/7 Instant Responses on Website & WhatsApp\n• Lead Intake & Qualification\n• Direct Google Calendar Scheduling\n• Massive reduction in routine support costs.",
      buttons: [
        { text: isEs ? 'Agendar Demo de IA (15 min)' : 'Book AI Demo Call', action: 'calendly' },
        { text: isEs ? 'Consultar por WhatsApp' : 'Inquire on WhatsApp', action: 'whatsapp' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan la implementación de IA?",
        "📱 ¿Cómo se conecta con mi WhatsApp?",
        "📅 Agendar videollamada para demo"
      ] : [
        "💰 How do you price AI Agents?",
        "📱 How does WhatsApp integration work?",
        "📅 Schedule demo call"
      ]
    };
  }

  // 18. TIME, DEADLINES & AGILE METHODOLOGY
  if (has('tiempo', 'tiempos', 'tarda', 'tardan', 'demora', 'demoran', 'plazo', 'plazos', 'cuanto tiempo', 'dias', 'urgente', 'proceso', 'pasos', 'metodologia')) {
    return {
      text: isEs
        ? "⚡ **Tiempos Récord y Metodología de Entrega Ágil**\n\nNo tardamos meses como las agencias lentas tradicionales. Al programar con código limpio en React nativo y arquitectura moderna, entregamos con rapidez absoluta:\n\n⏱️ **Tiempos de entrega promedio:**\n• **Landing Page de Conversión:** 3 a 5 días hábiles.\n• **Web Corporativa o Reservas:** 5 a 8 días hábiles.\n• **Tienda Online E-Commerce:** 7 a 12 días hábiles.\n• **Agentes de IA Personalizados:** 5 a 10 días hábiles según integraciones.\n\n📋 **Nuestro Proceso en 4 Pasos:**\n1. **Descubrimiento (15 min):** Videollamada por Google Meet para definir alcance, objetivos y país.\n2. **Diseño y Prototipo:** Revisamos la maqueta interactiva antes de programar.\n3. **Desarrollo & Conexiones:** Programación en React, integración de WhatsApp, pasarelas y SEO.\n4. **Pruebas y Lanzamiento:** Publicación en dominio propio con capacitación incluida."
        : "⚡ **Record Turnaround & Agile Methodology**\n\n• **Landing Page:** 3 - 5 business days\n• **Corporate / Booking Web:** 5 - 8 business days\n• **E-Commerce Store:** 7 - 12 business days\n• **Custom AI Agents:** 5 - 10 business days\n\n📋 4-Step Process: Discovery (15 min) ➔ Prototype ➔ Code & Integrations ➔ Launch.",
      buttons: [
        { text: isEs ? 'Agendar 15 min de Inicio' : 'Book Kickoff Call', action: 'calendly' },
        { text: isEs ? 'Consultar por WhatsApp' : 'Inquire on WhatsApp', action: 'whatsapp' }
      ]
    };
  }

  // 19. TECH STACK, SPEED & GOOGLE SEO
  if (has('tecnologia', 'tecnologias', 'stack', 'react', 'wordpress', 'wix', 'shopify', 'velocidad', 'rapido', 'pagespeed', 'google', 'seo', 'hosting', 'codigo')) {
    return {
      text: isEs
        ? "🛠️ **Ingeniería y Tecnología: Por qué superamos a WordPress y Wix**\n\nLa mayoría de sitios en WordPress usan decenas de plugins pesados, tardan 4 a 7 segundos en cargar y sufren constantes hackeos. Más del **50% de usuarios abandona una web** que tarda más de 3 segundos.\n\n⚡ **La ventaja técnica de FastPagePro:**\n• **Stack Moderno:** React 19 + Vite + Tailwind CSS (código nativo, ultraligero y escalable).\n• **Carga Instantánea (< 0.8s):** Puntuación 95-100 en Google PageSpeed tanto en móvil como en escritorio.\n• **SEO Técnico para Google:** Estructura semántica, metadatos enriquecidos, OpenGraph y WebP para liderar búsquedas orgánicas.\n• **Hosting Global Edge CDN:** Servidores de alta disponibilidad con certificado SSL y copias de seguridad automáticas.\n• **100% Propiedad del Código:** Cero ataduras de plataforma; el código y dominio son tuyos."
        : "🛠️ **Next-Gen Architecture vs WordPress & Wix**\n\n• React 19 + Vite + Tailwind CSS native engine\n• Sub-second load time & 95-100 PageSpeed scores\n• Technical SEO & Schema markup included\n• Global Edge CDN hosting with SSL\n• 100% code ownership.",
      buttons: [
        { text: isEs ? 'Ver Portafolio' : 'View Portfolio', action: 'portfolio' },
        { text: isEs ? 'Agendar 15 min' : 'Book 15 min Call', action: 'calendly' }
      ]
    };
  }

  // 20. SELF-MANAGEMENT & SANITY CMS ("¿Puedo editarlo yo mismo?")
  if (has('editar', 'cambiar', 'actualizar', 'autoadministrable', 'panel', 'yo mismo', 'administrar', 'subir fotos', 'cambiar precios', 'cms', 'sanity')) {
    return {
      text: isEs
        ? "✏️ **Panel Autoadministrable Sencillo con Sanity CMS**\n\n¡Totalmente! Diseñamos nuestras plataformas para que tengas **independencia total**:\n\n• **Panel Visual Intuitivo:** Puedes cambiar textos, fotos, precios, promociones o agregar nuevos productos en segundos.\n• **Cero necesidad de programar:** No requieres conocimientos técnicos ni pagarle a un programador por cada cambio menor.\n• **Capacitación en Video Incluida:** Al entregar tu web, te entregamos una guía rápida en video para que tú o tu equipo administren el sitio con soltura.\n\n¿Te gustaría ver una demo de cómo funciona el panel de administración?"
        : "✏️ **Intuitive Self-Management Control Panel**\n\nYes! You get complete independence to update texts, images, pricing, and products without touching code.\n\n• User-friendly admin dashboard\n• Video walkthrough included at launch\n• Zero monthly maintenance fees just to change basic text.",
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'Consultar por WhatsApp' : 'Inquire on WhatsApp', action: 'whatsapp' }
      ]
    };
  }

  // 21. WARRANTY, CONTRACTS & CODE OWNERSHIP
  if (has('garantia', 'soporte', 'mantenimiento', 'propiedad', 'dueno', 'contrato', 'confianza', 'hitos')) {
    return {
      text: isEs
        ? "🛡️ **Garantía Técnica, Contratos y Propiedad Total**\n\n• **Garantía Post-Lanzamiento:** Tu proyecto incluye garantía técnica contra cualquier error o bug sin costo adicional.\n• **100% Propiedad del Cliente:** Todo el código fuente, dominio y accesos te pertenecen exclusivamente a ti.\n• **Contrato Formal & Facturación:** Emitimos contrato con entregables detallados y facturas formales (SUNAT en Perú / Invoices en EE.UU.).\n• **Soporte Directo:** Hablas directamente con los ingenieros que programaron tu web, sin intermediarios ni burocracia."
        : "🛡️ **Warranty, Contracts & 100% Code Ownership**\n\n• Post-launch technical bug warranty included\n• 100% client code ownership (no lock-in)\n• Legally binding contracts & formal invoices (SUNAT in Peru / W-9 compliant in USA)\n• Direct communication with core engineers.",
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'WhatsApp Directo' : 'WhatsApp Direct', action: 'whatsapp' }
      ]
    };
  }

  // 22. MEETINGS & DISCOVERY CALL
  if (has('reunion', 'agendar', 'meet', 'calendly', 'llamada', 'cita', 'contacto', 'telefono', 'hablar', 'conversar', 'book', 'call', 'agendamos')) {
    return {
      text: isEs
        ? "📅 **¡Excelente! Agendemos una videollamada de 15 minutos por Google Meet**\n\nEs 100% gratuita y sin compromiso. En esta breve sesión:\n\n1. Revisaremos tu caso, requerimientos y objetivos de venta.\n2. Te mostraremos opciones visuales y casos de éxito de tu mismo rubro.\n3. Te entregaremos una propuesta clara con cotización formal adaptada a tu país y plazos garantizados.\n\nElige el horario que más te convenga en nuestro calendario oficial:"
        : "📅 **Let's schedule a 15-minute Google Meet discovery call!**\n\n100% free with no commitment. We will evaluate your project, review relevant case studies, and give you an exact quote and delivery timeline.",
      buttons: [
        { text: isEs ? 'Elegir Horario en Calendly' : 'Choose Time on Calendly', action: 'calendly' },
        { text: isEs ? 'O escribir por WhatsApp' : 'Or chat on WhatsApp', action: 'whatsapp' }
      ]
    };
  }

  // 23. DYNAMIC SEARCH ACROSS ALL 35 PORTFOLIO PROJECTS
  const matchingProjects = allProjects.filter((p) => {
    const textToSearch = `${p.title} ${p.description || ''} ${p.industryLabel || ''} ${p.industry || ''} ${(p.techStack || []).join(' ')}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const tokens = q.split(/\s+/).filter(t => t.length > 3);
    return tokens.some(tok => textToSearch.includes(tok));
  });

  if (matchingProjects.length > 0) {
    const topMatches = matchingProjects.slice(0, 3);
    const projectBullets = topMatches
      .map(
        (p) =>
          `• 🚀 ${linkTo(p.title, p.slug)}: ${p.highlights || p.description}`
      )
      .join('\n');

    return {
      text: isEs
        ? `💼 **Casos de Éxito Relacionados con tu Búsqueda:**\n\nEncontramos proyectos activos en nuestro portafolio que se alinean con lo que necesitas:\n\n${projectBullets}\n\n📌 **Cotización a Medida:**\nCada desarrollo se adapta a la escala de tu negocio en **EE.UU., Perú o LATAM**. Para evaluar tu alcance técnico y entregarte una propuesta formal, te recomendamos agendar una **breve reunión de 15 min en Google Meet**.`
        : `💼 **Relevant Case Studies from our Portfolio:**\n\nWe found matching active projects in our database:\n\n${projectBullets}\n\nEvery solution is custom-tailored to your market. We recommend booking a **15-minute Google Meet call** to review your goals and receive a formal proposal.`,
      buttons: [
        { text: isEs ? `Ver ${topMatches[0].title}` : `View ${topMatches[0].title}`, action: 'case-study', slug: topMatches[0].slug },
        { text: isEs ? 'Agendar 15 min en Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'Consultar por WhatsApp' : 'Chat on WhatsApp', action: 'whatsapp' }
      ],
      followUps: isEs ? [
        "💰 ¿Cómo cotizan un proyecto similar?",
        "⚡ ¿Cuáles son los tiempos de entrega?",
        "💬 Hablar con un asesor"
      ] : [
        "💰 How do you quote a similar project?",
        "⚡ Delivery timelines?",
        "💬 Chat on WhatsApp"
      ]
    };
  }

  // 24. INTELLIGENT CONTEXTUAL FALLBACK
  return {
    text: isEs
      ? `Comprendo perfectamente lo que necesitas respecto a **"${rawQuery}"**.\n\nEn **FastPagePro** no vendemos plantillas genéricas al azar; construimos cada proyecto con ingeniería web a medida (código nativo en React 19, velocidad récord < 0.8s y funnels enfocados en ventas).\n\nCada solución se cotiza de forma personalizada según el país donde operas (**EE.UU., Perú o LATAM**) y la complejidad técnica de tu negocio.\n\n📌 **Propuesta Seria y Formal:**\nPara entregarte una cotización seria, transparente y adaptada a tus objetivos, lo más recomendable es tener una **breve videollamada de 15 minutos por Google Meet** con nuestro equipo técnico, o si prefieres, escríbenos directamente por WhatsApp.`
      : `I understand your goal regarding **"${rawQuery}"**.\n\nAt **FastPagePro**, every digital asset is custom-engineered with modern web standards (sub-second load time, conversion-focused layout, and automated customer funnels).\n\nEvery project is custom-scoped based on your country and business scale.\n\nWould you like to review your project in a quick 15-minute Google Meet call, or do you prefer to chat directly via WhatsApp?`,
    buttons: [
      { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
      { text: isEs ? 'WhatsApp Directo' : 'WhatsApp Direct', action: 'whatsapp' }
    ],
    followUps: isEs ? [
      "💰 ¿Cómo cotizan los proyectos?",
      "🏨 Ver proyectos para hoteles",
      "🇺🇸 ¿Cómo trabajan con clientes en USA?",
      "⚡ ¿Cuáles son los tiempos de entrega?"
    ] : [
      "💰 How do you price projects?",
      "🏨 View hotel case studies",
      "🇺🇸 How do you work with US clients?",
      "⚡ What are delivery times?"
    ]
  };
};

// --- Formatted AI Message with Markdown Highlights, Links & Custom Bullets ---
const FormattedAIMessage = ({ text, isStreaming, onClose }) => {
  const paragraphs = text.split('\n\n');

  const renderInlineContent = (str) => {
    // Regex splits by markdown links [label](url) and bold **text**
    const parts = str.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
    return parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={partIdx} className="text-yellow-400 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const url = linkMatch[2];
        const isCaseStudy = url.includes('/portafolio/');
        return (
          <a
            key={partIdx}
            href={url}
            onClick={(e) => {
              if (isCaseStudy) {
                e.preventDefault();
                const slugMatch = url.match(/\/portafolio\/([a-zA-Z0-9_-]+)/);
                const slug = slugMatch ? slugMatch[1] : '';
                if (slug && typeof window !== 'undefined') {
                  if (onClose) onClose();
                  try {
                    window.history.pushState(null, '', `/portafolio/${slug}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  } catch {}
                }
              }
            }}
            target={isCaseStudy ? undefined : "_blank"}
            rel={isCaseStudy ? undefined : "noopener noreferrer"}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-yellow-400 hover:text-stone-950 hover:bg-yellow-400 font-bold underline decoration-yellow-400/50 transition-all mx-0.5 text-xs shadow-sm cursor-pointer"
          >
            <span>{label}</span>
            <ArrowUpRight size={11} className="shrink-0 inline" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2 leading-relaxed text-stone-200 text-xs sm:text-sm">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n');
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const isBullet = line.startsWith('• ') || line.startsWith('- ');
              const cleanLine = isBullet ? line.replace(/^[•\-]\s*/, '') : line;
              const content = renderInlineContent(cleanLine);

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 ml-1 text-stone-300">
                    <span className="text-yellow-400 font-black text-xs mt-0.5 select-none">▸</span>
                    <span className="flex-1">{content}</span>
                  </div>
                );
              }

              return <p key={lIdx}>{content}</p>;
            })}
          </div>
        );
      })}
      {isStreaming && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-yellow-400 animate-pulse align-middle" />
      )}
    </div>
  );
};

// --- FastPage AI Assistant Component (Super Intelligent with High-Speed Streaming) ---
const FastPageAIAssistant = ({ language, isOpen, onClose, openCalendly }) => {
  const isEs = language === 'es';
  const initialMsg = isEs
    ? "¡Hola! 👋 Soy **FastPage AI**, el asesor de proyectos de **FastPagePro**.\n\nDiseñamos **webs de alta velocidad**, tiendas online y **agentes de IA autónomos** para empresas en EE.UU., Perú y Latinoamérica.\n\n¿Tienes alguna idea o proyecto en mente para tu negocio?"
    : "Hello! 👋 I'm **FastPage AI**, project advisor at **FastPagePro**.\n\nWe build **high-speed websites**, e-commerce platforms, and **autonomous AI agents** for businesses across the US and Latin America.\n\nWhat kind of project are you thinking about?";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: initialMsg,
      isStreaming: false,
      buttons: [
        { text: isEs ? 'Agendar 15 min en Google Meet' : 'Book 15 min Call', action: 'calendly' },
        { text: isEs ? 'WhatsApp Directo' : 'WhatsApp Direct', action: 'whatsapp' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickQuestions, setQuickQuestions] = useState(
    isEs ? [
      "🇺🇸 ¿Cómo trabajan con clientes en USA?",
      "💰 ¿Precios y paquetes disponibles?",
      "🤖 ¿Qué pueden hacer sus Agentes de IA?",
      "⚡ ¿Cuáles son los tiempos de entrega?",
      "📅 Quiero agendar una reunión"
    ] : [
      "🇺🇸 How do you work with US clients?",
      "💰 What are your prices & plans?",
      "🤖 What can your AI Agents do?",
      "⚡ What are your delivery times?",
      "📅 I'd like to book a 15-min call"
    ]
  );

  const messagesEndRef = useRef(null);
  const streamingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Clear any previous ongoing stream
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Snappy intelligent inference (instant start)
    setTimeout(() => {
      const aiResult = queryFastPageAI(text, language);
      setIsTyping(false);

      const aiMsgId = Date.now() + 1;
      const fullText = aiResult.text;
      const tokens = fullText.split(' ');
      let currentTokenIndex = 0;

      // Initial empty AI message in streaming state
      setMessages(prev => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          text: '',
          isStreaming: true,
          buttons: []
        }
      ]);

      // Ultra-rapid, natural streaming (16ms per token)
      streamingIntervalRef.current = setInterval(() => {
        currentTokenIndex += 2; // Stream 2 words per tick for high-speed fluidity
        if (currentTokenIndex >= tokens.length) {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
          setMessages(prev =>
            prev.map(m =>
              m.id === aiMsgId
                ? { ...m, text: fullText, isStreaming: false, buttons: aiResult.buttons }
                : m
            )
          );
          if (aiResult.followUps && aiResult.followUps.length > 0) {
            setQuickQuestions(aiResult.followUps);
          }
        } else {
          const partialText = tokens.slice(0, currentTokenIndex).join(' ');
          setMessages(prev =>
            prev.map(m =>
              m.id === aiMsgId
                ? { ...m, text: partialText }
                : m
            )
          );
        }
      }, 20);
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-[395px] h-[550px] bg-stone-950/95 backdrop-blur-2xl border border-yellow-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-white"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-stone-950 shadow-lg shadow-yellow-500/20">
              <Bot size={22} className="stroke-[2.2]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">FastPage AI</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">PRO</span>
            </div>
            <p className="text-[11px] text-stone-400">{isEs ? 'Asesor de Proyectos • USA & LATAM' : 'Project Advisor • US & LATAM'}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Cerrar asistente"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-sm">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 font-medium rounded-br-none shadow-md'
                  : 'bg-stone-900/90 border border-stone-800 text-stone-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.sender === 'ai' ? (
                <FormattedAIMessage text={msg.text} isStreaming={msg.isStreaming} onClose={onClose} />
              ) : (
                msg.text
              )}
            </div>
            {msg.buttons && msg.buttons.length > 0 && !msg.isStreaming && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (btn.action === 'calendly') openCalendly();
                      if (btn.action === 'whatsapp') window.open(getWhatsAppLink('contacto'), '_blank', 'noopener,noreferrer');
                      if (btn.action === 'portfolio') {
                        onClose();
                        const el = document.getElementById('portafolio');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                      if (btn.action === 'case-study' && btn.slug) {
                        onClose();
                        try {
                          window.history.pushState(null, '', `/portafolio/${btn.slug}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } catch {}
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                      btn.action === 'case-study'
                        ? 'bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black shadow-yellow-500/20'
                        : btn.action === 'whatsapp'
                        ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white border border-white/20'
                        : btn.action === 'calendly'
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 hover:brightness-110 shadow-yellow-500/20'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                    }`}
                  >
                    {btn.action === 'case-study' && <ExternalLink size={13} className="text-stone-950 shrink-0" />}
                    {btn.action === 'whatsapp' && <WhatsAppOfficialIcon size={13} className="fill-white shrink-0" />}
                    {btn.action === 'calendly' && <Video size={13} className="text-stone-950 shrink-0" />}
                    {btn.action === 'portfolio' && <Briefcase size={13} className="text-yellow-400 shrink-0" />}
                    <span>{btn.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-3 rounded-2xl rounded-bl-none w-fit">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 border-t border-stone-800/80 bg-stone-900/40 overflow-x-auto flex gap-2 no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-medium bg-stone-800/90 hover:bg-stone-700 text-stone-300 border border-stone-700/60 hover:border-yellow-400/40 hover:text-yellow-400 transition-colors shrink-0 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isEs ? 'Escribe tu pregunta sobre tu proyecto...' : 'Ask about your project...'}
          className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-yellow-400"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 flex items-center justify-center font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all shrink-0 cursor-pointer"
          aria-label="Enviar mensaje"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// --- Modern Desktop Floating Action Hub ---
const AdvancedWidget = ({ language, widgetCopy, isOpen, setIsOpen }) => {
  const isEs = language === 'es';
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('fp_tooltip_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowTooltip(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    sessionStorage.setItem('fp_tooltip_dismissed', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {isAiOpen && (
          <FastPageAIAssistant
            language={language}
            isOpen={isAiOpen}
            onClose={() => setIsAiOpen(false)}
            openCalendly={openCalendly}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Proactive Tooltip */}
        <AnimatePresence>
          {showTooltip && !isAiOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mb-1 cursor-pointer"
              onClick={() => { dismissTooltip(); openCalendly(); }}
            >
              <div className="relative px-3.5 py-2 text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 bg-white text-stone-950 border border-stone-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span>{isEs ? '📅 ¿Hablamos 15 min en Google Meet?' : '📅 15-min Google Meet call?'}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); dismissTooltip(); }}
                  className="ml-1 text-stone-400 hover:text-stone-700"
                  aria-label="Cerrar tooltip"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dual Floating Buttons Hub */}
        <div className="flex items-center gap-3">
          {/* AI Assistant Button */}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              dismissTooltip();
              setIsAiOpen(prev => !prev);
              trackCtaClick('widget_ai_toggle', 'ai_assistant');
            }}
            className="group flex items-center gap-2 px-4 py-3.5 rounded-full bg-stone-900/90 hover:bg-stone-850 text-white border border-purple-500/40 hover:border-purple-400/80 shadow-[0_8px_25px_rgba(168,85,247,0.25)] backdrop-blur-xl transition-all duration-300"
            aria-label="Abrir Asistente de IA"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/50">
              <Sparkles size={14} className="animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-tight">FastPage AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.button>

          {/* Primary Calendly Direct CTA Button */}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              dismissTooltip();
              openCalendly();
            }}
            className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs uppercase tracking-tight shadow-[0_10px_35px_-5px_rgba(234,179,8,0.6)] hover:shadow-[0_15px_45px_-5px_rgba(234,179,8,0.8)] transition-all duration-300 border border-yellow-300/60"
            aria-label="Agendar reunión de 15 minutos en Google Meet"
          >
            <div className="w-6 h-6 rounded-full bg-stone-950 flex items-center justify-center text-yellow-400 shadow-inner">
              <Video size={13} className="fill-yellow-400" />
            </div>
            <span>{isEs ? 'Agendar 15 min' : 'Book 15 min'}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </>
  );
};

// --- Main Application ---

// MacBook CSS Mockup — Thin modern bezels
const MacBookMockup = ({ imageSrc, alt }) => (
  <div className="relative mx-auto w-full" style={{ maxWidth: '640px' }}>
    {/* Screen — thin 4px bezels, rounded corners */}
    <div className="relative rounded-2xl overflow-hidden border-[4px] border-stone-800 bg-stone-950 shadow-2xl" style={{ aspectRatio: '16/10' }}>
      {/* Camera notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-stone-900 rounded-b-lg z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
      </div>
      <img src={imageSrc} alt={alt} onError={handleImageFallback} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
    </div>
    {/* Base — slim and modern */}
    <div className="relative h-4 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 rounded-b-xl mx-3 -mt-px shadow-md">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-stone-600 rounded-full" />
    </div>
    {/* Bottom hinge — thin */}
    <div className="mx-auto w-[65%] h-[5px] bg-gradient-to-b from-stone-600 to-stone-800 rounded-b-2xl -mt-px" />
  </div>
);

// iPhone CSS Mockup — Modern dynamic island frame
const IPhoneMockup = ({ imageSrc, alt, compact = false }) => (
  <div className="relative mx-auto w-full" style={{ maxWidth: compact ? '200px' : '260px' }}>
    {/* Frame — thin bezels */}
    <div className="relative rounded-[2.5rem] overflow-hidden border-[5px] border-stone-800 bg-stone-950 shadow-2xl ring-1 ring-white/10" style={{ aspectRatio: '9/19' }}>
      {/* Dynamic Island */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-stone-950 rounded-full z-10 flex items-center justify-between px-2 border border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-blue-500/30" />
        <div className="w-2 h-2 rounded-full bg-stone-900" />
      </div>
      {/* Screen */}
      <img src={imageSrc} alt={alt} onError={handleImageFallback} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-stone-400/60 rounded-full" />
    </div>
    {/* Side buttons */}
    <div className="absolute -left-[3px] top-24 w-[2px] h-7 bg-stone-700 rounded-l" />
    <div className="absolute -left-[3px] top-34 w-[2px] h-7 bg-stone-700 rounded-l" />
    <div className="absolute -right-[3px] top-28 w-[2px] h-10 bg-stone-700 rounded-r" />
  </div>
);

// --- Dedicated Full-Page Case Study Experience (Apple / Vercel Pro Style) ---
const FullProjectCaseStudyPage = ({ project, language, onClose, onSelectProject }) => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const modalImage = PORTFOLIO_MODAL_IMAGES[project.title] || project.modalImage || project.image;
  const modalMobileImage = PORTFOLIO_MODAL_MOBILE_IMAGES[project.title] || project.modalMobileImage || modalImage;

  const isEs = language === "es";
  const liveLabel = isEs
    ? ({ tienda: "Ver Tienda Oficial", web: "Ver Web Oficial", app: "Ver App en Vivo", custom: "Ver Proyecto en Vivo" })[project.type] || "Ver Proyecto en Vivo"
    : ({ tienda: "View Live Store", web: "View Live Website", app: "View Live App", custom: "View Live Project" })[project.type] || "View Live Project";

  const tapLabel = isEs ? "Toca cualquier captura para ampliar en alta definición" : "Tap any mockup to enlarge in HD";

  // All projects list for smooth sequential navigation
  const allProjects = PORTFOLIO_BY_LANG[language] || [];
  const currentIndex = allProjects.findIndex(p => (p.slug && p.slug === project.slug) || p.title === project.title);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : (allProjects.length > 0 ? allProjects[allProjects.length - 1] : null);
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : (allProjects.length > 0 ? allProjects[0] : null);

  // Related projects from same industry or type
  const relatedProjects = useMemo(() => {
    const all = PORTFOLIO_BY_LANG[language] || [];
    const sameIndustry = all.filter(p => p.industry && p.industry === project.industry && p.title !== project.title);
    if (sameIndustry.length >= 3) return sameIndustry.slice(0, 3);
    const sameType = all.filter(p => p.type === project.type && p.title !== project.title && !sameIndustry.some(s => s.title === p.title));
    return [...sameIndustry, ...sameType].slice(0, 3);
  }, [project, language]);

  const getTypeBg = (type) => {
    const bgs = {
      web: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      tienda: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      app: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      custom: "bg-amber-500/15 text-amber-300 border-amber-500/30"
    };
    return bgs[type] || "bg-stone-500/15 text-stone-300 border-stone-500/30";
  };

  const copyCaseStudyLink = () => {
    const url = `https://fastpagepro.com/portafolio/${project.slug || ''}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  const shareViaWhatsApp = () => {
    const url = `https://fastpagepro.com/portafolio/${project.slug || ''}`;
    const text = encodeURIComponent(`Hola, te comparto el caso de éxito de *${project.title}* en Fast Page Pro: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (expandedImage) {
        if (e.key === 'Escape') setExpandedImage(null);
        return;
      }
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (prevProject && onSelectProject) {
          onSelectProject(prevProject);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (e.key === 'ArrowRight') {
        if (nextProject && onSelectProject) {
          onSelectProject(nextProject);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, expandedImage, prevProject, nextProject, onSelectProject]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-stone-950 text-white selection:bg-yellow-400 selection:text-stone-950 [scrollbar-width:thin] [scrollbar-color:rgba(250,204,21,0.3)_rgba(15,15,15,0.9)]"
    >
      {/* Lightbox HD Overlay */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <motion.img
              src={expandedImage}
              alt={project.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 max-w-[96vw] max-h-[92vh] object-contain rounded-2xl shadow-2xl cursor-pointer border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Cerrar imagen"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/15 text-stone-200 border border-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{isEs ? "Volver al Portafolio" : "Back to Portfolio"}</span>
              <span className="sm:hidden">{isEs ? "Volver" : "Back"}</span>
            </button>

            {/* Previous / Next Case study quick jump */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
              <button
                onClick={() => {
                  if (prevProject && onSelectProject) {
                    onSelectProject(prevProject);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                disabled={!prevProject}
                title={isEs ? `Caso anterior (tecla ←): ${prevProject?.title || ''}` : `Previous case (← key)`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/15 transition-all disabled:opacity-30 cursor-pointer"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] text-stone-400 font-mono px-1 select-none hidden md:inline">
                {currentIndex + 1}/{allProjects.length}
              </span>
              <button
                onClick={() => {
                  if (nextProject && onSelectProject) {
                    onSelectProject(nextProject);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                disabled={!nextProject}
                title={isEs ? `Caso siguiente (tecla →): ${nextProject?.title || ''}` : `Next case (→ key)`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/15 transition-all disabled:opacity-30 cursor-pointer"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 truncate max-w-xs xl:max-w-md">
              <span className="text-stone-500 shrink-0">Fast Page Pro</span>
              <span>/</span>
              <span className="text-stone-400 shrink-0">{isEs ? "Portafolio" : "Portfolio"}</span>
              <span>/</span>
              <span className="text-yellow-400 font-semibold truncate">{project.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Copiar Enlace Button */}
            <button
              onClick={copyCaseStudyLink}
              title={isEs ? "Copiar enlace permanente del caso de estudio" : "Copy permanent link"}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300 hover:text-white"
              }`}
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className="hidden md:inline">{copied ? (isEs ? "¡Enlace Copiado!" : "Copied!") : (isEs ? "Copiar Enlace" : "Copy Link")}</span>
            </button>

            {/* Compartir WhatsApp Button */}
            <button
              onClick={shareViaWhatsApp}
              title={isEs ? "Compartir este caso por WhatsApp" : "Share via WhatsApp"}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition-all cursor-pointer"
            >
              <WhatsAppOfficialIcon size={14} className="fill-[#25D366]" />
              <span className="hidden md:inline">{isEs ? "Compartir" : "Share"}</span>
            </button>

            <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isEs ? "En Producción 2026" : "Live in Production"}
            </span>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-stone-950 transition-all shadow-[0_4px_20px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95 shrink-0"
              style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
            >
              <span>{isEs ? "Ver Proyecto Pro" : "View Pro Project"}</span>
              <span className="text-sm">⚡</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16">
        {/* Hero Section */}
        <div className="mb-12">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border ${getTypeBg(project.type)}`}>
              {project.category}
            </span>
            {project.architectureLevel && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-300 border border-yellow-400/25">
                <Sparkles size={13} className="text-yellow-400" />
                {project.architectureLevel}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs text-stone-400 bg-white/5 border border-white/10">
              <MapPin size={13} className="text-yellow-400" />
              {project.location}
            </span>
            {project.industryLabel && (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs text-stone-300 bg-white/5 border border-white/10">
                {project.industryLabel}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-stone-950 text-sm tracking-wide transition-all duration-300 shadow-[0_10px_35px_rgba(250,204,21,0.35)] hover:shadow-[0_15px_45px_rgba(250,204,21,0.55)] hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
              >
                <span>{liveLabel}</span>
                <span className="text-base">⚡</span>
                <ExternalLink size={16} />
              </a>

              <button
                onClick={() => {
                  const msg = encodeURIComponent(`¡Hola Fast Page Pro! Vi el proyecto de *${project.title}* en su portafolio y me gustaría cotizar una solución similar para mi negocio.`);
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white text-sm bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <WhatsAppOfficialIcon size={18} />
                <span>{isEs ? "Cotizar Sistema Similar" : "Quote Similar System"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dual Responsive Mockup Showcase (Full Width Cinema Canvas) */}
        <div className="relative mb-16 bg-gradient-to-b from-stone-900/90 to-stone-950 p-6 sm:p-12 md:p-16 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Ambient Lighting Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
              <Maximize2 size={13} className="text-yellow-400" />
              {tapLabel}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
            {/* Desktop Mockup */}
            <div
              className="w-full md:w-3/5 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setExpandedImage(modalImage)}
            >
              <div className="text-center text-[11px] text-stone-400 mb-2 font-mono uppercase tracking-widest">
                {isEs ? "— Vista Desktop / Laptop Retina —" : "— Desktop Retina View —"}
              </div>
              <MacBookMockup imageSrc={modalImage} alt={project.title} />
            </div>

            {/* Mobile Mockup */}
            <div
              className="w-full md:w-2/5 flex flex-col items-center cursor-pointer transform hover:scale-[1.03] transition-transform duration-300"
              onClick={() => setExpandedImage(modalMobileImage)}
            >
              <div className="text-center text-[11px] text-stone-400 mb-2 font-mono uppercase tracking-widest">
                {isEs ? "— Vista Smartphone PWA —" : "— Smartphone PWA View —"}
              </div>
              <IPhoneMockup imageSrc={modalMobileImage} alt={project.title} />
            </div>
          </div>
        </div>

        {/* Technical Architecture & Specs */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stack Tecnológico */}
          <div className="p-8 rounded-3xl bg-stone-900/70 border border-white/10">
            <div className="flex items-center gap-2.5 mb-4">
              <Code size={20} className="text-yellow-400" />
              <h2 className="text-base font-bold uppercase tracking-wider text-white">
                {isEs ? "Arquitectura Edge & Stack Tecnológico" : "Edge Architecture & Tech Stack"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {(project.techStack || ["Next.js 15", "Edge Runtime", "Vercel Enterprise", "Sanity CMS", "Tailwind CSS"]).map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {isEs
                ? "Arquitectura de última generación con renderizado híbrido en servidores Edge distribuidos globalmente, cero dependencias lentas de WordPress y tiempos de respuesta ultra-rápidos en cualquier dispositivo."
                : "Next-generation hybrid Edge rendering across globally distributed servers with zero legacy CMS bloat and lightning TTFB on all devices."}
            </p>
          </div>

          {/* Métricas de Calidad */}
          <div className="p-8 rounded-3xl bg-stone-900/70 border border-white/10">
            <div className="flex items-center gap-2.5 mb-4">
              <Zap size={20} className="text-yellow-400" />
              <h2 className="text-base font-bold uppercase tracking-wider text-white">
                {isEs ? "Métricas de Rendimiento & Auditoría" : "Performance & Quality Metrics"}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-5">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-stone-400">{isEs ? "Tiempo de Carga" : "Load Time"}</div>
                <div className="text-lg font-bold text-emerald-400">⚡ &lt; 0.6s TTFB</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-stone-400">{isEs ? "Mobile First" : "Mobile Score"}</div>
                <div className="text-lg font-bold text-yellow-400">📱 100% PWA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-stone-400">{isEs ? "SEO Local Google" : "SEO Ranking"}</div>
                <div className="text-lg font-bold text-blue-400">🔍 Indexado IA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs text-stone-400">{isEs ? "Seguridad" : "Security"}</div>
                <div className="text-lg font-bold text-purple-400">🔒 Edge SSL A+</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {isEs
                ? "Optimizado para máxima conversión publicitaria en Meta Ads y Google Ads, con Schema.org estructurado para IA y Google Search."
                : "Optimized for maximum conversion on Google Ads and Meta Ads with rich Schema.org metadata for search engines and AI."}
            </p>
          </div>
        </div>

        {/* Reto & Solución */}
        {(project.challenge || project.solution) && (
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.challenge && (
              <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/25">
                <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
                  {isEs ? "⚠️ El Desafío del Cliente" : "⚠️ The Client Challenge"}
                </div>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/25">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                  {isEs ? "💡 Solución de Ingeniería Entregada" : "💡 Engineering Solution Delivered"}
                </div>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Secondary Conversion Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-yellow-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(250,204,21,0.12)]">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-2 block">
              {isEs ? "¿Buscas una solución similar?" : "Looking for a similar solution?"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {isEs
                ? "¿Deseas implementar esta arquitectura en tu negocio?"
                : "Want to deploy this architecture for your company?"}
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {isEs
                ? "Evaluamos los requerimientos de tu empresa y te entregamos una propuesta personalizada con cotización formal en menos de 24 horas."
                : "We evaluate your company's scope and provide a formal customized proposal within 24 hours."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => { onClose(); openCalendly(); }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-yellow-400 hover:bg-yellow-300 text-stone-950 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-yellow-500/25"
            >
              <Video size={16} />
              <span>{isEs ? "Agendar 15 min en Meet" : "Book 15 min Call"}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                const msg = encodeURIComponent(`¡Hola Fast Page Pro! Me interesa implementar un sistema similar al de *${project.title}*. ¿Podríamos coordinar una propuesta?`);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all hover:scale-105 cursor-pointer"
            >
              <WhatsAppOfficialIcon size={18} />
              <span>WhatsApp Directo</span>
            </button>
          </div>
        </div>

        {/* Sequential Case Study Navigator (Previous / Next) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {prevProject && (
            <button
              onClick={() => {
                if (onSelectProject) onSelectProject(prevProject);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-white/10 hover:border-yellow-400/40 text-left transition-all cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-yellow-400/10 text-stone-400 group-hover:text-yellow-400 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-yellow-400/30 transition-all">
                <ChevronLeft size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-0.5 font-semibold">
                  {isEs ? "← Caso Anterior" : "← Previous Case"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-400 truncate transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-xs text-stone-400 truncate">{prevProject.category}</p>
              </div>
            </button>
          )}
          {nextProject && (
            <button
              onClick={() => {
                if (onSelectProject) onSelectProject(nextProject);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-white/10 hover:border-yellow-400/40 text-right transition-all cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-0.5 font-semibold">
                  {isEs ? "Caso Siguiente →" : "Next Case →"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-400 truncate transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-stone-400 truncate">{nextProject.category}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-yellow-400/10 text-stone-400 group-hover:text-yellow-400 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-yellow-400/30 transition-all">
                <ChevronRight size={20} />
              </div>
            </button>
          )}
        </div>

        {/* Proyectos Recomendados del Mismo Rubro */}
        {relatedProjects.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 block mb-1">
                {isEs ? "Casos de Éxito Relacionados" : "Related Case Studies"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {isEs ? "Proyectos Recomendados del Mismo Rubro" : "Recommended Projects in this Industry"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rel, idx) => (
                <PortfolioCard
                  key={rel.title}
                  project={rel}
                  language={language}
                  index={idx}
                  onClick={() => {
                    if (onSelectProject) onSelectProject(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Case Study Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-8 bg-stone-950 text-center text-xs text-stone-500">
        <p className="mb-2">© 2026 Fast Page Pro. Todos los derechos reservados.</p>
        <p className="text-stone-600">Desarrollo Web de Alto Rendimiento • Sanity CMS Headless • Edge Runtime • Next.js 15</p>
      </footer>
    </motion.div>
  );
};

// Backwards-compatible alias for any external caller
const PortfolioModal = FullProjectCaseStudyPage;


// --- Pull-to-refresh visual indicator (mobile PWA) ---
const PullToRefreshIndicator = () => {
  const [pullDist, setPullDist] = useState(0);
  const startY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(display-mode: standalone)').matches) return;
    const onTouchStart = (e) => {
      if (window.scrollY <= 0) { startY.current = e.touches[0].clientY; isPulling.current = true; }
    };
    const onTouchMove = (e) => {
      if (!isPulling.current) return;
      const diff = e.touches[0].clientY - startY.current;
      if (diff > 0 && diff < 120) setPullDist(Math.min(diff * 0.5, 50));
      else if (diff >= 120) setPullDist(50);
      else setPullDist(0);
    };
    const onTouchEnd = () => {
      if (pullDist > 40) window.location.reload();
      isPulling.current = false;
      setTimeout(() => setPullDist(0), 200);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => { window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchmove', onTouchMove); window.removeEventListener('touchend', onTouchEnd); };
  }, [pullDist]);

  if (pullDist <= 0) return null;
  return (
    <div className="md:hidden fixed top-[3px] left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center" style={{ transform: `translate(-50%, ${pullDist * 0.4}px)`, opacity: Math.min(1, pullDist / 20) }}>
      <motion.div animate={{ rotate: pullDist > 40 ? 360 : 0 }} transition={{ duration: 0.3 }} className="w-8 h-8 rounded-full border-2 border-yellow-400/60 flex items-center justify-center mb-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(250,204,21,0.8)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" /></svg>
      </motion.div>
      <span className="text-[10px] text-yellow-400/70 font-medium">{pullDist > 40 ? 'Soltar' : 'Desliza'}</span>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [waNotifIndex, setWaNotifIndex] = useState(-1);
  const [liveVisitorCount, setLiveVisitorCount] = useState(0);

  // Live visitor counter — simulated realistic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const base = 11 + Math.floor(Math.random() * 8);
    setLiveVisitorCount(base);
    const interval = setInterval(() => {
      setLiveVisitorCount(prev => {
        const delta = Math.random() > 0.4 ? 1 : -1;
        const next = Math.max(6, Math.min(28, prev + delta));
        return next;
      });
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotative WhatsApp notifications — show every 5-10s, visible for 3s
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let idx = 0;
    const totalMessages = 5;
    let cancelled = false;
    const timers = [];

    const scheduleNext = () => {
      if (cancelled) return;
      const gap = 5000 + Math.random() * 5000;
      const t1 = setTimeout(() => {
        if (cancelled) return;
        setWaNotifIndex(idx);
        idx = (idx + 1) % totalMessages;
        const t2 = setTimeout(() => {
          if (cancelled) return;
          setWaNotifIndex(-1);
          scheduleNext();
        }, 3000);
        timers.push(t2);
      }, gap);
      timers.push(t1);
    };

    // First notification after 4s
    const first = setTimeout(() => {
      if (cancelled) return;
      setWaNotifIndex(0);
      idx = 1;
      const firstHide = setTimeout(() => {
        if (cancelled) return;
        setWaNotifIndex(-1);
        scheduleNext();
      }, 3000);
      timers.push(firstHide);
    }, 4000);
    timers.push(first);

    return () => {
      cancelled = true;
      timers.forEach(t => clearTimeout(t));
    };
  }, []);
  // Hero image rotation state removed (unused — 3D hero is active)
  const [showNotification, setShowNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  // Track whether the hero section is in the viewport. When the user scrolls
  // away from the hero (e.g. to #beneficios), we pause the AetherHero RAF
  // loop — frees the GPU and eliminates continuous main-thread jank.
  const [heroInView, setHeroInView] = useState(true);
  const heroSectionRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/portafolio' || path.startsWith('/portafolio/')) return 'portfolio';
    }
    return 'landing';
  });

  // --- Hero: Golden Particles (no more Spline robot parallax) ---
  const heroParticles = useMemo(() =>
    Array.from({ length: isMobile ? 12 : 25 }, (_, i) => {
      const type = Math.random();
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type < 0.3 ? Math.random() * 1.5 + 0.5 : type < 0.7 ? Math.random() * 2.5 + 1 : Math.random() * 3.5 + 2,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 10,
        opacity: type < 0.3 ? Math.random() * 0.2 + 0.1 : Math.random() * 0.4 + 0.2,
        type: type < 0.3 ? 'tiny' : type < 0.7 ? 'medium' : 'large',
        pulse: Math.random() > 0.6,
      };
    }), []);

  // Spline 3D was removed from the hero — no more deferral needed.
  // Hero visibility observer — pauses AetherHero RAF when the hero section
  // is scrolled out of view. Frees the GPU when the user is reading
  // #beneficios or other below-the-fold sections.
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const section = heroSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      // Trigger when the hero is at least 5% visible; small threshold avoids
      // flapping during scroll bounce.
      { threshold: 0.05 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [currentView]);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const preloaderComplete = useCallback(() => setShowPreloader(false), []);

  // Navigation: Landing ↔ Portfolio (History API — clean URLs)
  const navigateToPortfolio = useCallback(() => {
    setCurrentView('portfolio');
    try { history.pushState(null, '', '/portafolio'); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToLanding = useCallback(() => {
    setCurrentView('landing');
    try { history.pushState(null, '', '/'); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      // Always dark by default. Only light if user explicitly chose 'light' (persisted)
      return saved !== 'light';
    } catch {
      return true; // Dark fallback
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

  // Listen for popstate to handle browser back/forward (History API)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname;
        if (path === '/portafolio') {
          setCurrentView('portfolio');
          setSelectedProject(null);
        } else if (path.startsWith('/portafolio/')) {
          setCurrentView('portfolio');
          const slug = path.replace('/portafolio/', '');
          const title = slugToTitle[slug];
          if (title) {
            const project = portfolioProjects.find((p) => p.title === title);
            if (project) setSelectedProject(project);
          }
        } else {
          setCurrentView('landing');
          setSelectedProject(null);
        }
      } catch {}
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      handlePopState();
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [portfolioProjects]);

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

  // PWA Install Prompt — opens app if already installed
  const handleInstallApp = useCallback(async () => {
    // If app is already installed as PWA, try to open in standalone mode
    if (isAppInstalled) {
      try {
        // Read manifest start_url and navigate — the OS will intercept
        // and open the installed PWA if available
        const manifest = await fetch('/manifest.json').then(r => r.json()).catch(() => ({}));
        const startUrl = manifest.start_url || window.location.origin + '/';
        // Navigate to start_url — on mobile, if the PWA is installed,
        // the system will offer to "Open in FastPagePro" instead of navigating in-browser
        window.location.href = startUrl;
      } catch {
        // Fallback: reload in standalone context
        window.location.href = window.location.origin + '/';
      }
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt, isAppInstalled]);

  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if (isStandalone) {
        setIsAppInstalled(true);
        return; // No need for further checks if already in standalone
      }

      let beforeFired = false;
      const handleBeforeInstall = (e) => {
        e.preventDefault();
        beforeFired = true;
        setDeferredPrompt(e);
      };

      const handleAppInstalled = () => {
        setIsAppInstalled(true);
        setDeferredPrompt(null);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      window.addEventListener('appinstalled', handleAppInstalled);

      // Heuristic: if beforeinstallprompt never fires after 4s,
      // the PWA is likely already installed (Chrome only fires it when
      // the user hasn't installed it yet). Also try getInstalledRelatedApps.
      // Note: only apply fallback on mobile-like devices to avoid false
      // positives on desktop browsers that don't support PWA install.
      const checkTimer = setTimeout(async () => {
        if (beforeFired) return; // Can still be installed, not installed yet
        // Check getInstalledRelatedApps API (supported in Chrome 96+)
        try {
          if (navigator.getInstalledRelatedApps) {
            const apps = await navigator.getInstalledRelatedApps();
            if (apps && apps.length > 0) {
              setIsAppInstalled(true);
              return;
            }
          }
        } catch {}
        // Fallback heuristic: only on mobile/touch devices
        // Desktop browsers that don't fire beforeinstallprompt aren't necessarily installed
        const isMobileOrTablet = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
          || ('ontouchstart' in window && window.innerWidth < 1280);
        if (isMobileOrTablet) {
          setIsAppInstalled(true);
        }
      }, 4000);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        window.removeEventListener('appinstalled', handleAppInstalled);
        clearTimeout(checkTimer);
      };
    }
  }, []);

  // Responsive + accessibility listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', onResize, { passive: true });
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onMotion = (e) => setPrefersReducedMotion(e.matches);
      mql.addEventListener('change', onMotion);
      return () => {
        window.removeEventListener('resize', onResize);
        mql.removeEventListener('change', onMotion);
      };
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const openAgendaWidget = (event) => {
    if (event) event.preventDefault();
    setMobileMenu(false);
    setIsWidgetOpen(true);
  };

  // Portfolio modal: close and restore URL
  const closePortfolioModal = useCallback(() => {
    setSelectedProject(null);
    try { history.pushState(null, '', '/portafolio'); } catch {}
  }, []);

  // Open project from slug
  const openProjectBySlug = useCallback((slug) => {
    const title = slugToTitle[slug];
    if (!title) return;
    const project = portfolioProjects.find((p) => p.title === title);
    if (project) {
      setSelectedProject(project);
      setCurrentView('portfolio');
    }
  }, [portfolioProjects]);

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

  // === Scroll Spy + Deep Linking ===
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SECTION_IDS = ['top', 'portafolio', 'servicios', 'beneficios', 'testimonios', 'planes', 'faq', 'contacto'];
    let spyPaused = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (spyPaused) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && id !== 'top') {
              try {
                const url = window.location.pathname + window.location.search + '#' + id;
                if (window.location.hash !== '#' + id) {
                  history.replaceState(null, '', url);
                }
              } catch (e) { /* ignore */ }
            } else if (id === 'top') {
              try {
                if (window.location.hash) {
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                }
              } catch (e) { /* ignore */ }
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [currentView]);

  // Handle initial hash/anchor on load for deep linking to sections
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash && hash.startsWith('#') && hash.length > 1) {
      const id = hash.replace('#', '');
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Golden cursor dot + trail (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const container = document.getElementById('cursor-trail-container');
    if (!container) return;

    // Main golden dot
    const mainDot = document.createElement('div');
    Object.assign(mainDot.style, {
      position: 'fixed', width: '10px', height: '10px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(250,204,21,0.9) 40%, rgba(250,204,21,0.3) 70%, transparent 100%)',
      pointerEvents: 'none', transform: 'translate(-50%,-50%)',
      transition: 'left 0.08s ease-out, top 0.08s ease-out, width 0.2s, height 0.2s',
      zIndex: '10000', boxShadow: '0 0 10px 3px rgba(250,204,21,0.6), 0 0 25px rgba(250,204,21,0.2)',
    });
    container.appendChild(mainDot);

    // Hover grow on interactive elements
    const growCursor = () => { mainDot.style.width = '18px'; mainDot.style.height = '18px'; };
    const shrinkCursor = () => { mainDot.style.width = '10px'; mainDot.style.height = '10px'; };
    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, select, textarea, .portfolio-card, .cursor-pointer')) growCursor();
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, select, textarea, .portfolio-card, .cursor-pointer')) shrinkCursor();
    });

    const dots = [];
    const maxDots = 14;
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      const size = Math.max(1.5, 7 - i * 0.5);
      Object.assign(dot.style, {
        position: 'fixed', width: size + 'px', height: size + 'px', borderRadius: '50%',
        background: `rgba(250,204,21,${0.55 - i * 0.035})`, pointerEvents: 'none',
        transform: 'translate(-50%,-50%)', transition: `left ${0.05 + i * 0.018}s ease-out, top ${0.05 + i * 0.018}s ease-out, opacity 0.3s`,
        zIndex: '9999', filter: i < 3 ? 'blur(0px)' : `blur(${i * 0.4}px)`,
        boxShadow: i < 2 ? '0 0 8px rgba(250,204,21,0.5)' : 'none'
      });
      container.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }
    let mx = 0, my = 0, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const animate = () => {
      mainDot.style.left = mx + 'px';
      mainDot.style.top = my + 'px';
      let px = mx, py = my;
      dots.forEach((d, i) => {
        d.x += (px - d.x) * (0.38 - i * 0.02);
        d.y += (py - d.y) * (0.38 - i * 0.02);
        d.el.style.left = d.x + 'px';
        d.el.style.top = d.y + 'px';
        px = d.x; py = d.y;
      });
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    animate();
    return () => {
      window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); container.innerHTML = '';
    };
  }, []);

  // Hero image preloader + rotation removed (3D hero is active — no image carousel)

  useEffect(() => {
    const timer = setTimeout(() => { setShowNotification(true); setTimeout(() => setShowNotification(false), 5000); }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenu(false);
    // Portfolio is a subpage, not a section — navigate to it
    if (id === 'portafolio') {
      navigateToPortfolio();
      return;
    }
    // If on portfolio subpage and clicking a landing section, go back first
    if (currentView === 'portfolio') {
      navigateToLanding();
      setTimeout(() => {
        try {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        } catch {}
      }, 100);
      return;
    }
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

      {/* Pull-to-refresh indicator (mobile) */}
      <PullToRefreshIndicator />
    
    <div ref={containerRef} className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Golden Electric Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60]">
        {/* Track (dark) */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Electric gold fill */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{ scaleX, width: '100%' }}
        >
          {/* Core golden line */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />
          {/* Electric glow layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-400 opacity-80" style={{ filter: 'blur(2px)' }} />
          {/* Outer glow */}
          <div className="absolute inset-0 bg-yellow-400/40" style={{ filter: 'blur(6px)' }} />
          {/* Leading bright point (truelo) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 -mr-3">
            <div className="absolute inset-0 rounded-full bg-yellow-300/60" style={{ filter: 'blur(6px)' }} />
            <div className="absolute inset-1 rounded-full bg-yellow-200/80" style={{ filter: 'blur(3px)' }} />
            <div className="absolute inset-[6px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(250,204,21,0.9)]" />
          </div>
          {/* Sparkle particles along the bar */}
          <div className="absolute inset-0 overflow-visible">
            <motion.div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
            <motion.div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-yellow-200" animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
            <motion.div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-amber-200" animate={{ opacity: [0, 0.6, 0], scale: [0, 1.2, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.6 }} />
          </div>
        </motion.div>
      </div>

      {/* Golden Cursor Trail (desktop only) */}
      <div className="hidden md:block fixed inset-0 z-[9999] pointer-events-none" id="cursor-trail-container" style={{ cursor: 'none' }} />

      {/* Navigation — Universal Dark Glassmorphism */}
      <nav className="fixed w-full z-50 transition-all duration-500 h-[60px] sm:h-[64px]" style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none'
      }}>
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          <motion.div className="text-white font-bold text-xl tracking-tighter cursor-pointer flex items-center gap-2.5" onClick={(e) => scrollToSection(e, 'top')} whileHover={{ scale: 1.05 }}>
            {/* Electric Bolt Animated Logo */}
            <div className="relative">
              <ElectricBolt size={35} />
            </div>
            <span className="hidden sm:block">FastPagePro</span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1 items-center">
            {navItems.map((item) => (
              <motion.a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} whileHover={{ y: -2 }} className="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10">{item.label}</motion.a>
            ))}
            <div className="w-px h-5 bg-white/15 mx-2" />
            {/* Real Official WhatsApp Button — Desktop */}
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppLink('contacto')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('nav_top_whatsapp', 'whatsapp')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all duration-300 shadow-[0_2px_14px_rgba(37,211,102,0.4)] border border-white/20 shrink-0"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppOfficialIcon size={16} className="fill-white shrink-0" />
              <span>WhatsApp</span>
            </motion.a>
            <div className="w-px h-5 bg-white/15 mx-1" />
            {/* Language Toggle — No container */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="nav-icon-btn px-3 py-2 text-xs font-bold text-white/60 hover:text-[#FFD700] transition-colors rounded-lg"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </motion.button>
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            {!isAppInstalled && deferredPrompt && (
              <motion.button
                onClick={handleInstallApp}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/25 text-xs font-bold transition-all duration-300"
                aria-label="Install App"
              >
                <Download size={14} />
                <span>{language === 'es' ? 'Instalar App' : 'Install App'}</span>
              </motion.button>
            )}
            <WhatsAppButton text={copy.navCta} href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')} variant="primary" size="small" className="ml-2" ctaId="nav_top_cta" />
          </div>
          
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Real Official WhatsApp Button — Mobile Header */}
            <motion.a
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              href={getWhatsAppLink('contacto')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('nav_mobile_whatsapp', 'whatsapp')}
              className="w-10 h-10 rounded-full bg-[#25D366] active:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_2px_14px_rgba(37,211,102,0.5)] border-2 border-white/20 transition-transform shrink-0"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppOfficialIcon size={22} className="fill-white shrink-0" />
            </motion.a>
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.94 }}
              className="nav-icon-btn px-2.5 py-2 text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors rounded-lg"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </motion.button>
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <motion.button onClick={() => setMobileMenu(!mobileMenu)} whileTap={{ scale: 0.9 }} className="nav-icon-btn text-white/70 hover:text-white w-9 h-9 flex items-center justify-center rounded-lg transition-colors">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Always dark, bottom padding for bottom nav */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: "spring", damping: 25 }} className="fixed inset-0 z-40 pt-24 px-6 md:hidden overflow-y-auto" style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}>
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="text-3xl font-bold text-white py-4 border-b border-white/10">{item.label}</motion.a>
              ))}
              <button
                onClick={() => { setMobileMenu(false); openCalendly(); }}
                className="w-full mt-6 flex items-center justify-center gap-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 font-bold py-4 px-6 rounded-full text-base shadow-[0_10px_30px_rgba(234,179,8,0.4)] transition-transform active:scale-95"
              >
                <Video size={20} />
                <span>{language === 'es' ? 'Agendar Reunión (15 min)' : 'Book 15 min Call'}</span>
              </button>
              <a
                href={getWhatsAppLink('contacto')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setMobileMenu(false); trackCtaClick('nav_mobile_drawer_whatsapp', 'whatsapp'); }}
                className="w-full mt-2 flex items-center justify-center gap-2.5 bg-[#25D366] active:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-full text-base shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-transform active:scale-95"
              >
                <WhatsAppOfficialIcon size={22} className="fill-white shrink-0" />
                <span>{language === 'es' ? 'Chat Directo en WhatsApp' : 'Chat on WhatsApp'}</span>
              </a>
              <WhatsAppButton text={copy.navCta} href="#contacto" onClick={(e) => { scrollToSection(e, 'contacto'); setMobileMenu(false); }} variant="primary" className="w-full mt-2" size="large" ctaId="nav_mobile_cta" />
              {!isAppInstalled && deferredPrompt && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => { handleInstallApp(); setMobileMenu(false); }}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-stone-950 font-semibold py-3 px-5 rounded-full text-sm transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]"
                  style={{ boxShadow: '0 0 20px rgba(250,204,21,0.2), 0 10px 40px -10px rgba(250,204,21,0.5)' }}
                >
                  <Download size={18} />
                  <span>{language === 'es' ? 'Instalar App' : 'Install App'}</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification - Compact Enhanced */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="hidden md:flex fixed bottom-6 left-6 z-50 bg-white dark:bg-stone-900 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] p-3.5 items-center gap-3 border border-stone-100 dark:border-stone-800"
          >
            <motion.div
              className="relative w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md shrink-0"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.6 }}
            >
              <Check className="text-white" size={18} strokeWidth={3} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-stone-950 text-xs dark:text-white truncate">{copy.notificationTitle}</div>
                <span className="text-[10px] text-green-600 dark:text-green-400 font-medium shrink-0">● {language === 'es' ? 'En vivo' : 'Live'}</span>
              </div>
              <div className="text-[11px] text-stone-400 dark:text-stone-300 mt-0.5 truncate">{copy.notificationSubtitle}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION — Ultra Pro Centered (no Spline, AetherHero only) */}
      {currentView === 'landing' && <section id="top" ref={heroSectionRef} className="relative w-full min-h-screen overflow-hidden bg-black/[0.96] flex items-center justify-center">

        {/* Layer 0: Spotlight Effects — subtle radial glows for depth */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <Spotlight className="top-10 left-full -translate-x-1/2 md:translate-x-0" fill="purple" />

        {/* Layer 1: WebGL Aurora Shader (single background, all devices).
            Replaces Spline 3D robot — was 4.5 MB of JS, now 0 MB extra.
            Pauses RAF when hero scrolled out of view (active={heroInView}). */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <AetherHero dprMax={isMobile ? 1.5 : 2} active={heroInView} />
        </div>

        {/* Layer 1.5: Radial vignette for text readability (centered hero) */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.92) 100%)' }} />
        <div className="absolute inset-0 z-[2] pointer-events-none md:hidden" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Layer 2: Golden Particles — subtle ambient sparkle */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {heroParticles.map((p) => (
            <div
              key={p.id}
              className={`absolute rounded-full golden-particle ${p.pulse ? 'golden-particle-pulse' : ''}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.type === 'large'
                  ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(250,204,21,0.7) 30%, rgba(250,204,21,0.15) 60%, transparent 100%)'
                  : p.type === 'medium'
                  ? 'radial-gradient(circle, rgba(250,204,21,0.9) 0%, rgba(250,204,21,0.25) 50%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(250,204,21,0.6) 0%, transparent 80%)',
                boxShadow: p.type === 'large'
                  ? '0 0 8px 3px rgba(250,204,21,0.6), 0 0 20px rgba(250,204,21,0.25), 0 0 40px rgba(250,204,21,0.1)'
                  : p.type === 'medium'
                  ? '0 0 6px 2px rgba(250,204,21,0.5), 0 0 14px rgba(250,204,21,0.15)'
                  : '0 0 4px 1px rgba(250,204,21,0.3)',
                opacity: p.opacity,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Layer 3: Centered Main Content — Ultra Pro */}
        <motion.div className="relative z-20 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-24 md:py-20">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0.4)", "0 0 0 10px rgba(251,191,36,0)", "0 0 0 0 rgba(251,191,36,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-yellow-400"
              />
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90">{copy.heroBadge}</span>
            </motion.div>

            {/* Main Heading — bigger, centered, with gold glow */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tighter mb-5 sm:mb-6 leading-[1.02]"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400">
                {language === 'es' ? 'Impulsamos tu negocio' : 'We Boost Your Business'}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600" style={{ textShadow: '0 0 40px rgba(250,204,21,0.4), 0 0 80px rgba(250,204,21,0.2)' }}>
                {language === 'es' ? 'con una web de alto impacto' : 'with a High-Impact Website'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="text-sm sm:text-base md:text-lg text-neutral-300 mb-9 sm:mb-10 max-w-2xl leading-relaxed"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}
            >
              {copy.heroSubtitle}
            </motion.p>

            {/* CTA Buttons — centered, glass cyber-premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
            >
              {/* Ver Portafolio — Glass Glow CTA */}
              <motion.a
                href="/portafolio"
                onClick={(e) => { e.preventDefault(); trackCtaClick('hero_portfolio', 'portfolio'); navigateToPortfolio(); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center justify-center gap-2 py-3.5 px-8 rounded-full font-semibold text-sm border border-[#facc15]/50 bg-white/10 backdrop-blur-md text-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:bg-[#facc15] hover:text-black hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:border-[#facc15] transition-all duration-300 overflow-hidden"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative flex items-center gap-2">
                  {copy.heroPrimaryCta}
                  <motion.span className="inline-block" whileHover={{ x: 4 }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </span>
              </motion.a>
              {/* Cotizar Proyecto — WhatsApp */}
              <WhatsAppButton
                text={copy.heroSecondaryCta}
                message={copy.heroSecondaryMsg}
                variant="outline"
                ctaId="hero_quote"
                className="h-[48px] px-8 text-sm font-semibold border !text-white !border-white/20 hover:!bg-white/10 rounded-full transition-all duration-300"
              />
            </motion.div>

            {/* Trust Badges — centered row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-9 sm:mt-10 flex items-center justify-center gap-5 sm:gap-7 flex-wrap"
            >
              <div className="flex items-center gap-1.5 text-xs text-neutral-400"><Shield size={12} className="text-green-400" /> {copy.tags[0]}</div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400"><Clock size={12} className="text-yellow-400" /> {copy.tags[1]}</div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400"><Award size={12} className="text-blue-400" /> {copy.tags[2]}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Asymmetric detail: live projects counter pinned bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-4 sm:left-6 md:bottom-10 md:left-10 z-30 inline-flex items-center gap-2.5 px-4 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: '#00FF88', boxShadow: '0 0 8px #00FF88, 0 0 16px rgba(0,255,136,0.4)' }}
          />
          <span className="text-xs whitespace-nowrap">
            <span className="font-bold" style={{ color: '#00FF88' }}>{todayBookings}</span>{' '}
            <span className="text-neutral-400">{language === 'es' ? 'proyectos activos' : 'active projects'}</span>
          </span>
        </motion.div>

        {/* Asymmetric detail: scroll hint pinned bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 right-4 sm:right-6 md:bottom-10 md:right-10 z-30 hidden sm:flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">{language === 'es' ? 'Scroll' : 'Scroll'}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>}

      {/* Stats — Horizontal Achievement Bar (Minimalist) */}
      {currentView === 'landing' && <section id="beneficios" className="stats-bar-section py-10 md:py-16 relative overflow-hidden">
        {/* Desktop: static horizontal row */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center items-center gap-10 lg:gap-16 xl:gap-20">
              {[
                { icon: Rocket, value: 45, suffix: "+", prefix: "", label: language === "es" ? "proyectos creados" : "projects created" },
                { icon: TrendingUp, value: 300, suffix: "%", prefix: "+", label: language === "es" ? "aumento en ventas" : "sales increase" },
                { icon: Globe, value: 4, suffix: "", prefix: "", label: language === "es" ? "países" : "countries" },
                { icon: Zap, value: 100, suffix: "%", prefix: "", label: language === "es" ? "satisfacción" : "satisfaction" }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="stats-bar-item group flex flex-col items-center cursor-default"
                  >
                    <Icon className="stats-bar-icon w-5 h-5 mb-2" strokeWidth={1.5} />
                    <div className="stats-bar-number text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight leading-none mb-1">
                      {stat.prefix}<AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                    </div>
                    <div className="stats-bar-label">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: infinite horizontal marquee */}
        <div className="md:hidden overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none stats-bar-fade-left" />
          <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none stats-bar-fade-right" />
          <motion.div
            className="flex gap-10 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ x: { duration: 18, repeat: Infinity, ease: "linear" } }}
          >
            {[0, 1].map((loop) => (
              <div key={loop} className="flex gap-10">
                {[
                  { icon: Rocket, value: 45, suffix: "+", prefix: "", label: language === "es" ? "proyectos creados" : "projects created" },
                  { icon: TrendingUp, value: 300, suffix: "%", prefix: "+", label: language === "es" ? "aumento en ventas" : "sales increase" },
                  { icon: Globe, value: 4, suffix: "", prefix: "", label: language === "es" ? "países" : "countries" },
                  { icon: Zap, value: 100, suffix: "%", prefix: "", label: language === "es" ? "satisfacción" : "satisfaction" }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={`${loop}-${i}`} className="stats-bar-item group flex flex-col items-center cursor-default min-w-[90px]">
                      <Icon className="stats-bar-icon w-4 h-4 mb-1.5" strokeWidth={1.5} />
                      <div className="stats-bar-number text-xl font-extrabold tracking-tight leading-none mb-0.5">
                        {stat.prefix}<AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className="stats-bar-label">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>
      </section>}

      {/* Portfolio — Featured (Landing) or Full Page */}
      {currentView === 'landing' ? (
        <FeaturedPortfolioSection
          copy={copy}
          projects={portfolioProjects.filter(p => p.title)}
          language={language}
          onViewAll={navigateToPortfolio}
          onProjectClick={(project) => {
            const slug = PORTFOLIO_SLUGS[project.title];
            if (slug) {
              setSelectedProject(project);
              try { history.pushState(null, '', `/portafolio/${slug}`); } catch {}
            }
          }}
        />
      ) : (
        <FullPortfolioPage
          copy={copy}
          projects={portfolioProjects.filter(p => p.title)}
          language={language}
          onBack={navigateToLanding}
          onProjectClick={(project) => {
            const slug = PORTFOLIO_SLUGS[project.title];
            if (slug) {
              setSelectedProject(project);
              try { history.pushState(null, '', `/portafolio/${slug}`); } catch {}
            }
          }}
        />
      )}

      {/* Services Section — Only on Landing */}
      {currentView === 'landing' && <ServicesSection copy={copy} language={language} />}

      {/* Process Timeline — Only on Landing */}
      {currentView === 'landing' && <ProcessTimeline copy={copy} language={language} />}

      {/* PWA Install Banner - After Process */}
      {!isAppInstalled && deferredPrompt && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10 md:py-14 theme-bg-alt relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 pointer-events-none" />
          <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Smartphone size={20} className="text-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">{language === 'es' ? 'App Oficial' : 'Official App'}</span>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
              {language === 'es' ? 'Lleva tu agencia a todos lados' : 'Take your agency everywhere'}
            </h3>
            <p className="text-[var(--text-muted)] text-xs sm:text-base mb-4 max-w-md mx-auto">
              {language === 'es'
                ? 'Instala nuestra App oficial para una mejor experiencia.'
                : 'Install our official App for a better experience.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleInstallApp}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-stone-950 font-bold py-3 px-5 sm:py-3.5 sm:px-7 rounded-full text-xs sm:text-base transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]"
            >
              <Download size={16} />
              <span>{language === 'es' ? 'Instalar App' : 'Install App'}</span>
            </motion.button>
            <p className="text-[var(--text-muted)] text-[10px] mt-2">
              {language === 'es' ? 'Sin tiendas de apps. Gratuito.' : 'No app stores needed. Free.'}
            </p>
          </div>
        </motion.section>
      )}

      {/* Tech Stack */}
      <TechStackSection copy={copy} />

      {/* Success Cases */}
      <CasesSection copy={copy} language={language} />

      {/* TESTIMONIALS — Hybrid Carousel (Auto + Manual) */}
      <TestimonialCarousel testimonials={testimonials} copy={copy} />

      {/* PRICING - Updated with 4 plans */}
      <section id="planes" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)' }}>
        <div className="container mx-auto px-4">
          <SectionTitle title={copy.pricingTitle} subtitle={copy.pricingSubtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 max-w-7xl mx-auto mt-10 md:mt-16">
            {plans.map((plan, i) => {
              const mpLinks = {
                START: "https://mpago.la/2jScw4A",
                PRO: "https://mpago.la/28BQCLQ",
                BUSINESS: "https://mpago.la/1GY3yPf"
              };
              const cuotas = {
                START: "300",
                PRO: "433.33",
                BUSINESS: "600"
              };
              const isCustom = plan.custom || !plan.price;

              return (
                <motion.div
                  key={i}
                  className={`relative p-6 sm:p-7 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] border text-center flex flex-col ${plan.highlight ? 'bg-stone-900 text-white lg:scale-105 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] dark:bg-white dark:text-stone-950 dark:shadow-[0_50px_100px_-30px_rgba(255,255,255,0.15)] z-10 border-stone-900 dark:border-white' : isCustom ? 'bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 border-stone-700 text-white dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 dark:border-yellow-400/30' : 'bg-white border-stone-200 text-stone-900 dark:bg-stone-900/50 dark:border-stone-800 dark:text-white'}`}
                  whileHover={{ y: -10, scale: plan.highlight ? 1.07 : 1.03 }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-stone-950 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-lg">
                      {copy.popularTag}
                    </div>
                  )}
                  {isCustom && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-lg shadow-yellow-500/30">
                      {language === 'es' ? 'A Medida' : 'Bespoke'}
                    </div>
                  )}
                  <h3 className={`text-sm md:text-base mb-2 uppercase tracking-widest ${plan.highlight ? 'text-white/90 dark:text-stone-950/90' : isCustom ? 'text-yellow-400' : 'opacity-60'}`}>{plan.name}</h3>
                  {isCustom ? (
                    <div className="mb-2">
                      <Sparkles className="inline-block text-yellow-400 mb-2" size={28} />
                      <div className={`text-xl md:text-2xl font-bold tracking-tight text-yellow-400`}>{language === 'es' ? 'Cotización' : 'Custom Quote'}</div>
                    </div>
                  ) : (
                    <>
                      <div className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight ${plan.highlight ? 'text-white dark:text-stone-950' : ''}`}>S/ {plan.price}</div>
                    </>
                  )}
                  <div className={`text-xs md:text-sm mb-7 md:mb-8 ${plan.highlight ? 'text-white/70 dark:text-stone-950/70' : isCustom ? 'text-yellow-400/60' : 'opacity-50 sm:opacity-40'}`}>{plan.period}</div>

                  <ul className="space-y-2.5 md:space-y-3 mb-8 md:mb-10 flex-1 text-left">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs md:text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-yellow-400 text-stone-950' : isCustom ? 'bg-yellow-400/20 text-yellow-400' : 'bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white'}`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className={plan.highlight ? 'text-white/90 dark:text-stone-950/90' : isCustom ? 'text-white/80' : 'text-stone-600 dark:text-stone-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {isCustom ? (
                    <a
                      href={getWhatsAppLink('precios', { plan: 'Personalizado' })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out rounded-full tracking-wide relative overflow-hidden group px-7 py-3.5 md:px-10 md:py-5 text-sm md:text-base bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 hover:from-yellow-500 hover:to-amber-600 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]"
                    >
                      <span className="flex items-center gap-2 relative z-10">
                        <MessageCircle size={18} />
                        {language === 'es' ? 'Solicitar Cotización' : 'Request Quote'}
                      </span>
                    </a>
                  ) : (
                    <>
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
                        <p className={`text-xs ${plan.highlight ? 'text-white/60 dark:text-stone-950/60' : 'text-stone-500 dark:text-stone-300'}`}>{language === 'es' ? '3 cuotas sin interés:' : '3 interest-free installments:'} <span className={`font-semibold ${plan.highlight ? 'text-white/80 dark:text-stone-950/80' : 'text-stone-700 dark:text-stone-200'}`}>S/ {cuotas[plan.name]}/{language === 'es' ? 'mes' : 'mo'}</span></p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 relative" style={{ backgroundColor: 'var(--bg-global)' }}>
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
      <section className="py-24 md:py-32 text-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-global)' }}>

        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.9]" style={{ color: 'var(--text-main)' }}>{copy.finalTitle}</motion.h2>
          <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base sm:text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-normal" style={{ color: 'var(--text-muted)' }}>{copy.finalSubtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <WhatsAppButton text={copy.finalCta} className="px-12 md:px-16 py-6 text-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]" size="large" ctaId="final_cta" />
          </motion.div>
          <div className="flex justify-center gap-6 md:gap-8 mt-8 md:mt-10 text-xs md:text-sm flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2"><Shield size={16} className="text-green-500" /> {copy.tags[0]}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> {copy.tags[1]}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-yellow-500" /> {copy.tags[2]}</span>
          </div>
        </div>
      </section>

      {/* PWA Install CTA - Bottom of page */}
      {!isAppInstalled && deferredPrompt && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 md:py-16 theme-bg-alt border-t border-[var(--border-subtle)]"
        >
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap size={22} className="fill-stone-950" strokeWidth={2.5} />
              </div>
              <span className="text-[var(--text-primary)] font-bold text-xl tracking-tight">FastPagePro</span>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
              {language === 'es' ? 'Lleva FastPagePro en tu bolsillo' : 'Take FastPagePro with you'}
            </h3>
            <p className="text-[var(--text-muted)] text-xs sm:text-base mb-5 max-w-md mx-auto">
              {language === 'es'
                ? 'Instala nuestra app y accede desde cualquier lugar en un toque.'
                : 'Install our app and access it from anywhere in one tap.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleInstallApp}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-stone-950 font-bold py-3 px-5 sm:py-4 sm:px-8 rounded-full text-xs sm:text-lg transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]"
            >
              <Download size={18} />
              <span>{language === 'es' ? 'Instalar App' : 'Install App'}</span>
            </motion.button>
            <p className="text-[var(--text-muted)] text-[10px] mt-3">
              {language === 'es' ? '100% gratuito. Sin registros.' : '100% free. No sign-ups.'}
            </p>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="bg-[var(--bg-footer)] border-t border-[var(--border-subtle)] pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Zap size={24} className="fill-stone-950" strokeWidth={2.5} />
                </div>
                <span className="text-[var(--text-primary)] font-bold text-xl tracking-tight">FastPagePro</span>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                {language === "es"
                  ? "Creamos páginas webs profesionales, tiendas online, aplicaciones móviles y proyectos personalizados que impulsan tu negocio."
                  : "We create professional websites, online stores, mobile apps and custom projects that drive your business forward."}
              </p>
              <div className="flex gap-3">
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"><Globe size={18} /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"><MessageCircle size={18} /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"><Star size={18} /></motion.a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Servicios" : "Services"}</h4>
              <ul className="space-y-3">
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Páginas Web" : "Websites"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Tiendas Online" : "Online Stores"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Apps Móviles" : "Mobile Apps"}</a></li>
                <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Proyectos Custom" : "Custom Projects"}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Empresa" : "Company"}</h4>
              <ul className="space-y-3">
                <li><a href="/portafolio" onClick={(e) => { e.preventDefault(); navigateToPortfolio(); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] hover:border-[var(--glass-border)] text-sm transition-all">{language === "es" ? "Portafolio" : "Portfolio"} <ArrowUpRight size={14} /></a></li>
                <li><a href="#proceso" onClick={(e) => scrollToSection(e, 'proceso')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Proceso" : "Process"}</a></li>
                <li><a href="#testimonios" onClick={(e) => scrollToSection(e, 'testimonios')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Testimonios" : "Testimonials"}</a></li>
                <li><a href="#planes" onClick={(e) => scrollToSection(e, 'planes')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm transition-colors">{language === "es" ? "Planes" : "Plans"}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-4">{language === "es" ? "Contacto" : "Contact"}</h4>
              <ul className="space-y-3">
                <a href="tel:+51933667414" className="flex items-center gap-2 text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors rounded-lg px-2 py-1 hover:bg-[var(--glass-bg)]"><Phone size={14} /> +51 933 667 414</a>
                <a href="mailto:cotizaciones@fastpagepro.com" className="flex items-center gap-2 text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors rounded-lg px-2 py-1 hover:bg-[var(--glass-bg)]"><Send size={14} /> cotizaciones@fastpagepro.com</a>
                <li className="flex items-center gap-2 text-[var(--text-muted)] text-sm"><MapPin size={14} /> {language === "es" ? "Lima, Perú" : "Lima, Peru"}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[var(--text-muted)] text-xs">© 2026 FastPagePro - Fabio Herrera, Fundador. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}</div>
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
              <span>{language === "es" ? "Hecho con" : "Made with"}</span>
              <Heart size={12} className="text-red-500" />
              <span>{language === "es" ? "y tecnología de vanguardia" : "and cutting-edge technology"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Advanced Widget — desktop only */}
      <div className="hidden md:block">
        <AdvancedWidget language={language} widgetCopy={copy.widget} isOpen={isWidgetOpen} setIsOpen={setIsWidgetOpen} />
      </div>

      {/* Professional Bottom Nav — mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="relative bg-black/[0.92] backdrop-blur-[20px] border-t border-white/[0.08]">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

          {/* Live visitors counter — top center */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute -top-6 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.06]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-[9px] text-white/50 font-medium"><span className="text-white/80" id="live-visitor-count">{liveVisitorCount}</span> {language === 'es' ? 'online' : 'online'}</span>
            </div>
          </motion.div>

          {/* Compact Notification Tooltip — focused on scheduling & projects */}
          <div className="absolute bottom-full left-0 right-0 flex justify-center pb-1 pointer-events-none">
            <AnimatePresence>
              {waNotifIndex >= 0 && (() => {
                const waNotifs = language === 'es' ? [
                  '📅 Agendar 15 min (Google Meet)',
                  '🚀 ¿Cotizar mi web o tienda?',
                  '🤖 ¿Crear mi Agente de IA?',
                  '💬 Consulta por WhatsApp',
                  '🇺🇸 Proyectos para USA y LATAM'
                ] : [
                  '📅 Book 15 min Google Meet',
                  '🚀 Get web / store quote',
                  '🤖 Build my AI Agent',
                  '💬 Chat via WhatsApp',
                  '🇺🇸 US & LATAM Projects'
                ];
                return (
                  <motion.div
                    key={waNotifIndex}
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-3 py-1.5 flex items-center gap-2 max-w-[220px]"
                  >
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-stone-950">
                      <Video size={11} className="fill-stone-950" />
                    </div>
                    <p className="text-stone-800 text-[11px] font-semibold">{waNotifs[waNotifIndex % waNotifs.length]}</p>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-around px-1 py-2">
            {/* Portafolio */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (currentView === 'portfolio') {
                  setCurrentView('landing');
                  try { history.pushState(null, '', '/'); } catch(e){}
                  window.scrollTo({ top: 0, behavior: 'instant' });
                } else {
                  setCurrentView('portfolio');
                  try { history.pushState(null, '', '/portafolio'); } catch(e){}
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }
              }}
              className={`bottom-nav-item ${currentView === 'portfolio' ? 'active' : ''} flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors ${currentView === 'portfolio' ? 'text-yellow-400' : 'text-white/50 hover:text-white/80'}`}
            >
              <Briefcase size={20} strokeWidth={currentView === 'portfolio' ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{language === 'es' ? 'Portafolio' : 'Portfolio'}</span>
            </motion.button>

            {/* Servicios */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (currentView === 'portfolio') {
                  setCurrentView('landing');
                  try { history.pushState(null, '', '/'); } catch(e){}
                }
                setTimeout(() => {
                  const el = document.getElementById('servicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, currentView === 'portfolio' ? 150 : 0);
              }}
              className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-white/50 hover:text-white/80 transition-colors"
            >
              <Wrench size={20} strokeWidth={1.8} />
              <span className="text-[10px] font-medium">{language === 'es' ? 'Servicios' : 'Services'}</span>
            </motion.button>

            {/* Calendly 15 min — Central Hero CTA for Google Meet */}
            <div className="relative flex flex-col items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
                onClick={openCalendly}
                animate={{
                  boxShadow: [
                    '0 6px 24px -4px rgba(250,204,21,0.7)',
                    '0 4px 20px -4px rgba(250,204,21,0.5)',
                    '0 8px 28px -4px rgba(250,204,21,0.85)',
                    '0 6px 24px -4px rgba(250,204,21,0.7)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative z-10 flex flex-col items-center justify-center w-[58px] h-[58px] -mt-5 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-stone-950 shadow-[0_6px_24px_-4px_rgba(250,204,21,0.7)] transition-all duration-300 border-2 border-stone-900"
                aria-label="Agendar reunión de 15 minutos en Google Meet"
              >
                {/* Inner glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />
                <Video size={22} className="text-stone-950 stroke-[2.3]" />
                <span className="text-[9px] font-black uppercase tracking-tight leading-none mt-0.5">15 min</span>
                {/* Live Meet Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.8)] border-2 border-stone-950">
                  <Calendar size={10} className="text-white" />
                </div>
              </motion.button>
            </div>

            {/* Precios */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (currentView === 'portfolio') {
                  setCurrentView('landing');
                  try { history.pushState(null, '', '/'); } catch(e){}
                }
                setTimeout(() => {
                  const el = document.getElementById('planes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, currentView === 'portfolio' ? 150 : 0);
              }}
              className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-white/50 hover:text-white/80 transition-colors"
            >
              <Tag size={20} strokeWidth={1.8} />
              <span className="text-[10px] font-medium">{language === 'es' ? 'Precios' : 'Pricing'}</span>
            </motion.button>

            {/* App / Theme button — if PWA installed show theme toggle, else install button */}
            {isAppInstalled ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-yellow-400/70 hover:text-yellow-400 transition-colors"
              >
                {isDarkMode ? <Sun size={20} strokeWidth={1.8} /> : <Moon size={20} strokeWidth={1.8} />}
                <span className="text-[10px] font-medium">{language === 'es' ? 'Tema' : 'Theme'}</span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleInstallApp}
                className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-white/50 hover:text-white/80 transition-colors"
              >
                <Download size={20} strokeWidth={1.8} />
                <span className="text-[10px] font-medium">{language === 'es' ? 'App' : 'App'}</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Glowing Mouse Particle Trail — desktop-only + respects reduced-motion.
          Was running on mobile too, attaching touchmove listeners that
          created DOM nodes on every frame and janked scrolling. */}
      {!isMobile && !prefersReducedMotion && <GlowingMouseTrail />}

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            language={language}
            onClose={closePortfolioModal}
            onSelectProject={(nextProject) => {
              setSelectedProject(nextProject);
              const slug = PORTFOLIO_SLUGS[nextProject.title];
              if (slug) {
                try { history.pushState(null, '', `/portafolio/${slug}`); } catch {}
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* ===== Dynamic SEO Head (react-helmet-async) ===== */}
      {currentView === 'portfolio' && !selectedProject && (
        <Helmet>
          <title>Portafolio | Fast Page Pro — Proyectos de Desarrollo Web e IA</title>
          <meta name="description" content="Explora nuestros proyectos: sistemas web, agentes de IA, SaaS multi-tenant, e-commerce y más. Resultados reales para negocios en LATAM." />
          <link rel="canonical" href="https://fastpagepro.com/portafolio" />
          <meta property="og:url" content="https://fastpagepro.com/portafolio" />
          <meta property="og:title" content="Portafolio | Fast Page Pro" />
          <meta property="og:description" content="Explora nuestros proyectos: sistemas web, agentes de IA, SaaS multi-tenant, e-commerce y más." />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="Portafolio | Fast Page Pro" />
          <meta name="twitter:description" content="Explora nuestros proyectos de desarrollo web e IA con resultados reales." />
        </Helmet>
      )}

      {selectedProject && (() => {
        const slug = PORTFOLIO_SLUGS[selectedProject.title] || '';
        const projUrl = `https://fastpagepro.com/portafolio/${slug}`;
        const projDesc = selectedProject.description || `Proyecto de desarrollo web profesional por Fast Page Pro — ${selectedProject.title}`;
        const projImg = selectedProject.image || 'https://fastpagepro.com/og-image.jpg';
        return (
          <Helmet>
            <title>{selectedProject.title} | Fast Page Pro — Proyecto de Desarrollo Web</title>
            <meta name="description" content={projDesc} />
            <link rel="canonical" href={projUrl} />
            <meta property="og:url" content={projUrl} />
            <meta property="og:title" content={`${selectedProject.title} | Fast Page Pro`} />
            <meta property="og:description" content={projDesc} />
            <meta property="og:image" content={projImg} />
            <meta property="og:type" content="article" />
            <meta name="twitter:title" content={`${selectedProject.title} | Fast Page Pro`} />
            <meta name="twitter:description" content={projDesc} />
            <meta name="twitter:image" content={projImg} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "name": selectedProject.title,
                "description": projDesc,
                "url": projUrl,
                "image": projImg,
                "creator": {
                  "@type": "Organization",
                  "name": "Fast Page Pro",
                  "url": "https://fastpagepro.com"
                },
                "genre": selectedProject.category || "Desarrollo Web",
                "locationCreated": {
                  "@type": "Place",
                  "name": "Lima, Peru"
                }
              })}
            </script>
          </Helmet>
        );
      })()}

      {currentView === 'landing' && !selectedProject && (
        <Helmet>
          <title>Fast Page Pro | Agencia de Desarrollo Web y Sistemas IA</title>
          <meta name="description" content="Especialistas en desarrollo de sistemas personalizados, agentes de IA, SaaS multi-tenant y plataformas escalables de alto rendimiento." />
          <link rel="canonical" href="https://fastpagepro.com" />
          <meta property="og:url" content="https://fastpagepro.com" />
          <meta property="og:title" content="Fast Page Pro | Agencia de Desarrollo Web y Sistemas IA" />
          <meta property="og:description" content="Especialistas en desarrollo de sistemas personalizados, agentes de IA, SaaS multi-tenant y plataformas escalables de alto rendimiento." />
          <meta property="og:type" content="website" />
        </Helmet>
      )}

      </div>
    </>
  );
}


