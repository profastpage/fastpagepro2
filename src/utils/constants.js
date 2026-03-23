// --- Constants ---
export const WHATSAPP_NUMBER = "51919662011";
export const PROFASTPAGE_EMAIL = "profastpage@gmail.com";
export const LEADS_WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL || "";

export const WA_EMOJI = {
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

export const IMAGE_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%230b0b0f'/><stop offset='1' stop-color='%23181a24'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%23f8fafc' font-family='Arial, sans-serif' font-size='56' font-weight='700'>Fast Page Pro</text><text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='Arial, sans-serif' font-size='26'>Webs y reservas por WhatsApp</text></svg>";

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
];

export const NAV_ITEMS = [
  { id: "demo", es: "Demo", en: "Demo" },
  { id: "portafolio", es: "Portafolio", en: "Portfolio" },
  { id: "beneficios", es: "Beneficios", en: "Benefits" },
  { id: "testimonios", es: "Testimonios", en: "Testimonials" },
  { id: "planes", es: "Planes", en: "Plans" },
  { id: "faq", es: "FAQ", en: "FAQ" }
];

export const LATIN_AVATARS = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=160",
  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=160"
];

export const PORTFOLIO_BY_LANG = {
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

export const TESTIMONIALS_BY_LANG = {
  es: [
    { name: "Carlos Mendoza", hotel: "Vuelo 78 Hotel", location: "Lima", text: "La plataforma es increíblemente rápida. Nuestros clientes prefieren reservar por WhatsApp ahora." },
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
    { name: "Carlos Mendoza", hotel: "Vuelo 78 Hotel", location: "Lima", text: "The platform is incredibly fast. Our guests now prefer booking through WhatsApp." },
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

export const PLANS_BY_LANG = {
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

export const COPY = {
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