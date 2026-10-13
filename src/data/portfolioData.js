// Fast Page Pro — Complete Client & Enterprise Portfolio Database
// 100% of all 29 clients from C:\dev\CLIENTES + SaaS architectures & enterprise tools.

export const PORTFOLIO_CATEGORIES = {
  es: ["Todos", "Web Profesional", "Tienda Online", "App Móvil", "Proyecto Personalizado"],
  en: ["All", "Professional Web", "Online Store", "Mobile App", "Custom Project"]
};

export const PORTFOLIO_INDUSTRIES = {
  es: [
    { id: "all", label: "Todos los Rubros", icon: "LayoutGrid" },
    { id: "hotel", label: "🏨 Hotelería & Turismo", icon: "Hotel" },
    { id: "legal", label: "⚖️ Legal & Contable", icon: "Shield" },
    { id: "moda", label: "👗 Moda & Retail", icon: "Sparkles" },
    { id: "finanzas", label: "💳 Finanzas & Préstamos", icon: "TrendingUp" },
    { id: "salud", label: "🏥 Salud & Medicina", icon: "Heart" },
    { id: "construccion", label: "🏗️ Construcción & Obras", icon: "Briefcase" },
    { id: "logistica", label: "📦 Logística & Carga", icon: "Rocket" },
    { id: "educacion", label: "🎓 Educación & Editorial", icon: "FileText" },
    { id: "ecommerce_saas", label: "⚡ E-Commerce & SaaS", icon: "ShoppingCart" }
  ],
  en: [
    { id: "all", label: "All Industries", icon: "LayoutGrid" },
    { id: "hotel", label: "🏨 Hospitality & Travel", icon: "Hotel" },
    { id: "legal", label: "⚖️ Legal & Accounting", icon: "Shield" },
    { id: "moda", label: "👗 Fashion & Retail", icon: "Sparkles" },
    { id: "finanzas", label: "💳 Finance & Loans", icon: "TrendingUp" },
    { id: "salud", label: "🏥 Healthcare & Medical", icon: "Heart" },
    { id: "construccion", label: "🏗️ Construction & Engineering", icon: "Briefcase" },
    { id: "logistica", label: "📦 Logistics & Freight", icon: "Rocket" },
    { id: "educacion", label: "🎓 Education & Editorial", icon: "FileText" },
    { id: "ecommerce_saas", label: "⚡ E-Commerce & SaaS", icon: "ShoppingCart" }
  ]
};

export const PORTFOLIO_BY_LANG = {
  es: [
    // =========================================================================
    // REGLA FUNDAMENTAL DE NEGOCIO (INSTRUCCIÓN DIRECTA DEL USUARIO):
    // LOS PROYECTOS REMOVIDOS NUNCA DEBEN VOLVER A AGREGARSE SALVO ORDEN EXPRESA:
    // - Semaltemed (semaltemed)
    // - El Hombre Hotel (el-hombre-hotel)
    // - Rainforest Wild (rainforest-wild)
    // - Gudstor Pack (gudstor-pack)
    // - Peru Travel Receptivo (peru-travel)
    // - Impulso Fiscal (impulso-fiscal)
    // =========================================================================

    // --- 1. VUELO 78 HOTEL TARAPOTO ---
    {
      title: "Vuelo 78 Hotel Tarapoto",
      slug: "vuelo-78-hotel",
      clientName: "Vuelo 78 Hotel & Tours",
      location: "Tarapoto, San Martín, Amazonía Peruana",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Hotelería & Turismo Amazónico",
      architectureLevel: "Nivel 2: Motor de Reservas Directas sin Comisiones",
      techStack: ["React 19 / Vite", "WhatsApp Booking Engine", "WebP Progressive HD", "Vercel Edge Network", "Schema.org LodgingBusiness"],
      highlights: "Aumento de 15 a 42 reservas mensuales directas por WhatsApp, eliminando hasta 18% en comisiones a OTAs.",
      challenge: "Los huéspedes que buscaban hospedaje con piscina y tours a cataratas en Tarapoto terminaban reservando en Booking.com pagando sobreprecio, o abandonaban por demoras en confirmar disponibilidad de suites de noche.",
      solution: "Motor interactivo de reserva directa por WhatsApp con pre-selección de fechas, tipo de suite (matrimonial, familiar, ejecutiva), cotización automática y confirmación guiada sin intermediarios.",
      description: "Sistema de reservas directas por WhatsApp con disponibilidad por fechas, suites con piscina y tours a cataratas en Tarapoto. Arquitectura ligera con carga en 0.45s.",
      architectureSummary: "Despliegue perimetral en Vercel Edge con tiempo de respuesta inferior a 0.45s. Carga progresiva de imágenes fotográficas en WebP comprimido con lazy-loading nativo y metadatos JSON-LD estructurados para posicionamiento geolocalizado en Google Search y Google Travel.",
      keyDeliverables: [
        "Motor de cotización de suites por noche con cálculo instantáneo",
        "Enrutador de disponibilidad y tours a cataratas directo a WhatsApp",
        "Galería inmersiva con renderizado optimizado para conexiones móviles 4G",
        "Integración de Schema.org LodgingBusiness para indexación local en Tarapoto"
      ],
      metrics: [
        { label: "Reservas Directas", value: "+180%", note: "Cero comisiones a plataformas externas" },
        { label: "Tiempo de Respuesta", value: "< 1.2s", note: "Atención inmediata por WhatsApp" },
        { label: "Ocupación Alta Temp.", value: "94%", note: "Suites con piscina y tours" },
        { label: "Velocidad TTFB", value: "0.45s", note: "Edge CDN distribuida globalmente" }
      ],
      image: "/images/03-portafolio/framed/vuelo-78-hotel.webp",
      modalImage: "/images/03-portafolio/real/vuelo-78-hotel-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/vuelo-78-hotel-mobile.webp",
      link: "https://www.vuelo78hotel.com"
    },

    // --- 2. CMC LATAM ---
    {
      title: "CMC LATAM Arquitectura",
      slug: "cmc-latam",
      clientName: "CMC LATAM Arquitectura & Construcción",
      location: "Lima / Asia / Costa del Perú",
      category: "Web Profesional",
      type: "web",
      industry: "construccion",
      industryLabel: "Arquitectura Costera & Diseño Residencial",
      architectureLevel: "Nivel 2: Plataforma Bilingüe de Alta Fidelidad Visual",
      techStack: ["React 19 / Vite", "Framer Motion", "Dark / Light Adaptive Engine", "Tailwind CSS", "WhatsApp Lead Concierge"],
      highlights: "Plataforma corporativa bilingüe de diseño residencial y costero con tasa de retención visual +65% y modo oscuro/claro.",
      challenge: "Inversionistas y propietarios de residencias de playa en el litoral sur requerían visualizar planos, renders y portafolio de obras con máxima fidelidad gráfica sin tiempos de espera que devaluaran la percepción de exclusividad.",
      solution: "Diseño minimalista ultra-elegante con conmutación adaptativa de tema claro/oscuro, lightbox Retina de planos arquitectónicos en alta resolución y canal de contacto prioritario para inversionistas inmobiliarios.",
      description: "Plataforma web bilingüe para empresa de arquitectura y construcción costera. Incluye modo claro/oscuro, WhatsApp dinámico con CTAs personalizados y galería de proyectos residenciales de lujo.",
      architectureSummary: "Optimización de assets gráficos vectoriales y rasterizados de alta densidad de píxeles (Retina 2x/3x). Transiciones fluidas a 60fps con Framer Motion aceleradas por GPU y caché estática distribuida sin caídas de rendimiento.",
      keyDeliverables: [
        "Selector bilingüe instantáneo (Español / Inglés) sin recarga de página",
        "Conmutador de tema Dark/Light con persistencia en localStorage",
        "Galería de proyectos residenciales y casas de playa en alta definición",
        "Canalización directa de consultas a los arquitectos directores"
      ],
      metrics: [
        { label: "Tiempo de Retención", value: "+65%", note: "Navegación inmersiva en portafolio" },
        { label: "Rendimiento GPU", value: "60 FPS", note: "Animaciones y transiciones fluidas" },
        { label: "Consultas de Obra", value: "+120%", note: "Captación de proyectos residenciales" },
        { label: "Carga de Imágenes", value: "< 0.5s", note: "Compresión WebP lossless adaptativa" }
      ],
      image: "/images/03-portafolio/framed/cmc-latam.webp",
      modalImage: "/images/03-portafolio/real/cmc-latam-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/cmc-latam-mobile.webp",
      link: "https://www.cmclatam.pe/"
    },

    // --- 3. MODA DIGITAL PRO ---
    {
      title: "Moda Digital Pro",
      slug: "moda-digital-pro",
      clientName: "Moda Digital Pro Maquinaria Textil",
      location: "Gamarra, La Victoria, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "moda",
      industryLabel: "Maquinaria Textil & Sublimación Digital",
      architectureLevel: "Nivel 2: Catálogo Industrial App-Style",
      techStack: ["React / Vite", "Video Hero 4K Stream", "Fichas Técnicas Epson I3200", "Tailwind CSS", "WhatsApp Industrial B2B"],
      highlights: "Incremento del 210% en cotizaciones de plotters industriales y maquinaria textil para confeccionistas del emporio comercial de Gamarra.",
      challenge: "Los fabricantes de prendas y talleres de confección en Gamarra necesitaban ver en acción la velocidad y precisión de los cabezales de impresión antes de coordinar una visita técnica a la tienda física.",
      solution: "Video Hero en bucle optimizado de 60fps mostrando los plotters operando a máxima velocidad, catálogo de insumos de sublimación y botón directo a los ingenieros de soporte técnico.",
      description: "Plataforma web para empresa de plotters textiles y equipos de confección en Gamarra. Video Hero profesional, catálogo de equipos y servicios de sublimación digital de alta precisión.",
      architectureSummary: "Streaming de video responsivo con preload condicional según ancho de banda móvil. Arquitectura orientada a conversión rápida con tiempos de interacción inferiores a 1 segundo en redes móviles de Lima.",
      keyDeliverables: [
        "Video Hero 4K comprimido con reproducción fluida sin buffer en móviles",
        "Catálogo técnico de plotters, calandras y tintas con especificaciones",
        "Descarga directa de fichas técnicas de cabezales y rendimientos",
        "Enrutador de cotizaciones industriales directo a asesores técnicos"
      ],
      metrics: [
        { label: "Cotizaciones B2B", value: "+210%", note: "Clientes del emporio de Gamarra" },
        { label: "Carga Móvil 4G", value: "0.52s", note: "Optimizada para talleres textiles" },
        { label: "Tasa de Interacción", value: "78%", note: "Reproducción de video demostrativo" },
        { label: "Leads Técnicos", value: "3.5x", note: "Canal directo con ingenieros" }
      ],
      image: "/images/03-portafolio/framed/moda-digital-pro.webp",
      modalImage: "/images/03-portafolio/real/moda-digital-pro-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/moda-digital-pro-mobile.webp",
      link: "https://www.modadigitalpro.com/"
    },

    // --- 4. GINCANA CLUB CAMPESTRE ---
    {
      title: "Gincana Club Campestre",
      slug: "gincana-club-campestre",
      clientName: "Gincana Club Campestre & Eventos",
      location: "Chosica / Cieneguilla, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "ecommerce_saas",
      industryLabel: "Eventos Corporativos & Clubes Campestres",
      architectureLevel: "Nivel 2: Plataforma de Eventos & Sedes Afiliadas",
      techStack: ["React / Vite", "Calculadora de Participantes", "Galería Sedes Campestres", "Tailwind CSS", "WhatsApp Event Planner"],
      highlights: "Digitalización de reservas de eventos corporativos, olimpiadas laborales y paseos campestres con incremento del 195% en cotizaciones.",
      challenge: "Empresas corporativas, colegios profesionales (Abogados, Contadores) y familias no tenían una forma centralizada de comparar sedes campestres (Ceande, Cecal, Certse) ni calcular costos por persona.",
      solution: "Plataforma con calculadora de paquetes según número de participantes, áreas recreativas, canchas deportivas, parrillas y cotización inmediata con asesores de eventos.",
      description: "Plataforma especializada en organización de eventos corporativos, gincanas campestres y días de integración laboral en clubes afiliados de Lima.",
      architectureSummary: "Arquitectura SPA de alto rendimiento con precarga de assets multimedia de las sedes campestres. Algoritmo frontend interactivo para estimar costos de eventos corporativos según asistentes.",
      keyDeliverables: [
        "Calculadora dinámica de cotización según aforo de colaboradores",
        "Catálogo visual de clubes afiliados en Chosica y Cieneguilla",
        "Desglose de servicios: buffet, sonido, arbitraje deportivo y animación",
        "Enrutamiento de presupuestos corporativos directo a coordinadores"
      ],
      metrics: [
        { label: "Cotizaciones Corp.", value: "+195%", note: "Empresas y colegios profesionales" },
        { label: "Eventos Coordinados", value: "65+/año", note: "Gincanas y días de integración" },
        { label: "Tiempo de Cotización", value: "< 2 min", note: "Simulador interactivo por persona" },
        { label: "Conversión a Reserva", value: "38%", note: "Cierre comercial por WhatsApp" }
      ],
      image: "/images/03-portafolio/framed/gincana-club-campestre.webp",
      modalImage: "/images/03-portafolio/real/gincana-club-campestre-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/gincana-club-campestre-mobile.webp",
      link: "https://www.gincanasclubescampestres.com/"
    },

    // --- 6. JHON & ASOCIADOS ---
    {
      title: "Jhon & Asociados Estudio Contable",
      slug: "jhon-asociados",
      clientName: "Jhon & Asociados Asesores Tributarios",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Estudio Contable & Tributario SUNAT",
      architectureLevel: "Nivel 2: Web Corporativa Multi-servicio con Preloader",
      techStack: ["React / Vite", "Preloader Corporativo Temático", "Routing 5 Subpáginas", "Tailwind CSS", "WhatsApp Dinámico Tributario"],
      highlights: "Sitio institucional de 5 subpáginas con preloader temático de alto impacto y aumento del 160% en captación de empresas ante auditorías SUNAT.",
      challenge: "Diferenciar los requerimientos de pymes que necesitan contabilidad mensual de aquellos empresarios que enfrentan órdenes de pago, embargos o fiscalizaciones complejas de SUNAT.",
      solution: "Navegación especializada por áreas tributarias, laborales y contables con enrutamiento inteligente de mensajes para conectar al cliente con el contador tributarista correspondiente.",
      description: "Sitio web completo de 5 subpáginas para estudio contable especializado en tributaria y defensa ante SUNAT con preloader temático y WhatsApp dinámico.",
      architectureSummary: "Arquitectura modular con 5 subpáginas optimizadas con enrutamiento del lado del cliente, preloader SVG institucional personalizado y microinteracciones de autoridad corporativa.",
      keyDeliverables: [
        "Preloader dinámico corporativo que refuerza la solvencia del estudio",
        "5 subpáginas dedicadas: Asesoría SUNAT, Planillas, MYPE, Auditoría, Legal",
        "WhatsApp segmentado por tipo de consulta tributaria empresarial",
        "Optimización SEO para consultas de defensa tributaria en Lima"
      ],
      metrics: [
        { label: "Consultas SUNAT", value: "+160%", note: "Empresas en proceso de auditoría" },
        { label: "Velocidad de Carga", value: "0.51s", note: "Bundles divididos por ruta" },
        { label: "Subpáginas Indexadas", value: "5/5", note: "100% Core Web Vitals en verde" },
        { label: "Retención en Sitio", value: "3m 40s", note: "Lectura de servicios tributarios" }
      ],
      image: "/images/03-portafolio/framed/jhon-asociados.webp",
      modalImage: "/images/03-portafolio/real/jhon-asociados-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/jhon-asociados-mobile.webp",
      link: "https://www.jhonasociados.com/"
    },

    // --- 7. UNIÓN EL PROGRESO ---
    {
      title: "Grupo El Progreso / Créditos El Progreso",
      slug: "union-el-progreso",
      clientName: "Grupo El Progreso Perú S.A.C.",
      location: "Lima / Nivel Nacional, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Fintech de Préstamos Personales & Garantía Vehicular",
      architectureLevel: "Nivel 2: Plataforma Fintech con Simulador de Cuotas",
      techStack: ["Next.js 16 App Router", "Simulador Financiero Dinámico", "Alianza Procustodia Vehicular", "Tailwind CSS", "WhatsApp Pre-qualification Engine"],
      highlights: "Plataforma de financiamiento ágil con simulador de préstamos personales y garantía vehicular sin dejar de conducir el auto; +240% de solicitudes precalificadas.",
      challenge: "Propietarios de autos y emprendedores necesitaban liquidez urgente pero temían entregar las llaves de su vehículo o someterse a trámites bancarios burocráticos de varias semanas.",
      solution: "Simulador financiero interactivo en tiempo real de cuotas y plazos, módulo informativo de garantía vehicular en alianza con Procustodia y precalificación en menos de 60 segundos por WhatsApp.",
      description: "Plataforma de financiamiento con calculadora inteligente de cuotas para préstamos personales y créditos con garantía vehicular. Precalificación inmediata en menos de 60 segundos.",
      architectureSummary: "Next.js 16 con React Server Components para máxima velocidad y seguridad de datos. El simulador financiero opera en el cliente sin latencia de red, calculando cuotas amortizadas antes de enviar el lead al analista.",
      keyDeliverables: [
        "Simulador de cuotas mensuales y plazos con tasa preferencial",
        "Módulo de garantía vehicular: el cliente mantiene su auto operativo",
        "Formulario de precalificación express con validación de requisitos",
        "Canal prioritario al +51902495977 con mensaje pre-rellenado"
      ],
      metrics: [
        { label: "Leads Precalificados", value: "+240%", note: "Evaluación crediticia al instante" },
        { label: "Tiempo Precalificación", value: "< 60s", note: "Simulador interactivo sin fricción" },
        { label: "Créditos Otorgados", value: "+85%", note: "Líneas personales y vehiculares" },
        { label: "Seguridad de Datos", value: "TLS 1.3", note: "Protección de información financiera" }
      ],
      image: "/images/03-portafolio/framed/union-el-progreso.webp",
      modalImage: "/images/03-portafolio/real/union-el-progreso-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/union-el-progreso-mobile.webp",
      link: "https://www.unionelprogreso.com/"
    },

    // --- 7. INTIQUILLA ADVENTURES ---
    {
      title: "Intiquilla Adventures Cusco",
      slug: "intiquilla-adventures",
      clientName: "Intiquilla Adventures Expeditions",
      location: "Cusco, Machu Picchu, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Turismo de Aventura, Trekking & Machu Picchu",
      architectureLevel: "Nivel 2: Plataforma Turística Bilingüe Multidivisa",
      techStack: ["React / Vite", "Booking Engine Multilingüe", "Mapas de Altimetría Trekking", "Vercel Edge", "WhatsApp Concierge 24/7"],
      highlights: "Expediciones a Salkantay, Camino Inca y Machu Picchu con itinerarios interactivos día a día y +220% en reservas internacionales directas.",
      challenge: "Los viajeros de Europa y Norteamérica necesitaban conocer la dificultad física, altitud en metros y equipo requerido para caminatas de 4 a 5 días antes de confirmar una expedición.",
      solution: "Desglose visual interactivo por etapas de ruta, selector de divisa (USD, EUR, PEN), perfiles altimétricos y reserva de cupos con atención bilingüe inmediata.",
      description: "Operador de turismo de aventura y expediciones en Cusco y Machu Picchu. Catálogo de paquetes turísticos, itinerarios día a día y reservas directas a WhatsApp.",
      architectureSummary: "Despliegue perimetral con soporte de red CDN global para garantizar que usuarios en Alemania, Francia o Estados Unidos carguen la web a menos de 0.5s de latencia con imágenes HD de la cordillera.",
      keyDeliverables: [
        "Itinerarios interactivos día por día con perfiles de altura y mapas",
        "Selector multidivisa en tiempo real para cotizaciones internacionales",
        "Módulo de verificación de cupos oficiales del Camino Inca y trenes",
        "Canal directo de WhatsApp con agentes bilingües certificados"
      ],
      metrics: [
        { label: "Reservas Internacionales", value: "+220%", note: "Turistas de Europa y Norteamérica" },
        { label: "Tasa de Abandono", value: "-48%", note: "Itinerarios transparentes día a día" },
        { label: "Carga Global", value: "0.46s", note: "CDN Edge distribuida en 3 continentes" },
        { label: "Consultas de Trekking", value: "4.2x", note: "Salkantay y Camino Inca directo" }
      ],
      image: "/images/03-portafolio/framed/intiquilla-adventures.webp",
      modalImage: "/images/03-portafolio/real/intiquilla-adventures-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/intiquilla-adventures-mobile.webp",
      link: "https://www.intiquilladventures.com/"
    },

    // --- 11. SERTRADE ---
    {
      title: "Sertrade Proyectos Industriales",
      slug: "sertrade",
      clientName: "Sertrade Soluciones Industriales",
      location: "Lima / Nivel Nacional, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "construccion",
      industryLabel: "Ingeniería, Montajes Eléctricos & Obras Industriales",
      architectureLevel: "Nivel 2: Portal Técnico Corporativo 3x3 Grid",
      techStack: ["Next.js 15", "Estructura Modular 3x3", "Dossier Técnico de Obras", "Tailwind CSS", "WhatsApp Corporativo B2B"],
      highlights: "Reestructuración integral a cuadrícula técnica 3x3 que eliminó redundancias y aumentó las solicitudes de licitación corporativa en un 140%.",
      challenge: "La empresa contaba con un portafolio desordenado donde las divisiones comercial, de salud y residencial se mezclaban, confundiendo a los gerentes de compras y minería.",
      solution: "Arquitectura limpia de 3x3 especialidades (Diseño, Montaje Eléctrico, Mantenimiento), fichas de proyectos ejecutados con fotografías de alta resolución y cotizaciones B2B.",
      description: "Portal corporativo para empresa de servicios de construcción, montajes eléctricos y suministros industriales para obras civiles y mineras.",
      architectureSummary: "Estructura modular con Next.js 15 y Tailwind CSS 4, optimizada para carga instantánea de documentación técnica y dossiers corporativos descargables sin fricción.",
      keyDeliverables: [
        "Matriz 3x3 de servicios: Comercial, Salud, Residencial e Industrial",
        "Portafolio fotográfico de proyectos de ingeniería y montajes concluidos",
        "Módulo de homologación y certificaciones de seguridad laboral",
        "Canal directo con el área de proyectos para licitaciones privadas"
      ],
      metrics: [
        { label: "Licitaciones Privadas", value: "+140%", note: "Empresas mineras y constructoras" },
        { label: "Claridad Estructural", value: "100%", note: "Reorganización de servicios en 3x3" },
        { label: "Descarga de Dossiers", value: "420+/mes", note: "Fichas técnicas descargadas" },
        { label: "Velocidad de Carga", value: "0.50s", note: "Renderizado estático de alto rendimiento" }
      ],
      image: "/images/03-portafolio/framed/sertrade.webp",
      modalImage: "/images/03-portafolio/real/sertrade-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/sertrade-mobile.webp",
      link: "https://www.sertradeproyectos.com/"
    },

    // --- 9. MAIA STORE ---
    {
      title: "Maia Store",
      slug: "maia-store",
      clientName: "Maia Store Boutique",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "moda",
      industryLabel: "Calzado Femenino & Carteras en Cuero",
      architectureLevel: "Nivel 2: Tienda Online con Sanity CMS Headless",
      techStack: ["Next.js 15", "Sanity CMS Headless", "PWA Móvil Instalable", "Carrito Flotante Dinámico", "Checkout WhatsApp 1-Clic"],
      highlights: "Tienda de calzado y moda femenina con catálogo autoadministrable semanal en Sanity CMS, logrando un aumento del 185% en ventas móviles.",
      challenge: "La propietaria necesitaba publicar nuevas colecciones de sandalias, botines y carteras cada semana con múltiples tallas y colores sin depender de programadores.",
      solution: "Implementación de Sanity Studio para gestión visual en tiempo real del catálogo, sincronizado con un carrito flotante y checkout optimizado a WhatsApp con datos completos del pedido.",
      description: "Boutique de moda femenina con catálogo autoadministrable en Sanity CMS, carrito flotante interactivo, filtros por talla y color, y compra optimizada vía WhatsApp.",
      architectureSummary: "Next.js 15 con Sanity Live Content API y Webhooks para invalidación selectiva de caché bajo demanda. Carga instantánea de productos con filtrado por tallas en milisegundos.",
      keyDeliverables: [
        "Panel Sanity CMS Studio para actualizar productos y fotos sin tocar código",
        "Carrito flotante reactivo con cálculo automático de envíos a Lima y provincias",
        "Filtros de catálogo por número de calzado (35 a 40) y color",
        "Checkout de 1 clic a WhatsApp con resumen formateado de compra"
      ],
      metrics: [
        { label: "Ventas por Móvil", value: "+185%", note: "Checkout fluido sin registros tediosos" },
        { label: "Tiempo Actualización", value: "< 3 min", note: "Subida autónoma en Sanity CMS" },
        { label: "Tasa de Rebote", value: "-44%", note: "Navegación instantánea PWA" },
        { label: "Ticket Promedio", value: "+32%", note: "Venta cruzada calzado + carteras" }
      ],
      image: "/images/03-portafolio/framed/maia-store.webp",
      modalImage: "/images/03-portafolio/real/maia-store-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/maia-store-mobile.webp",
      link: "https://maia-store.vercel.app/"
    },

    // --- 10. CAMISAS EN TALLAS GRANDES ---
    {
      title: "Camisas en Tallas Grandes (CTG)",
      slug: "camisas-tallas-grandes",
      clientName: "CTG Camisas en Tallas Grandes",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "moda",
      industryLabel: "Moda Masculina Plus Size (XL a 6XL)",
      architectureLevel: "Nivel 2: E-Commerce Especializado con Guía de Medidas",
      techStack: ["React / Vite", "Guía Interactiva de Tallas Anatómicas", "Carrito Rápido", "Tailwind CSS", "WhatsApp Personal Shopper"],
      highlights: "Tienda de camisas y ropa formal masculina plus size (2XL a 6XL) con reducción del 65% en devoluciones gracias a la guía de medidas exacta.",
      challenge: "Los clientes de contextura gruesa solían desistir de comprar camisas por internet por miedo a que las medidas del cuello, pecho o abdomen no les quedaran cómodas.",
      solution: "Guía anatómica con selector interactivo de medidas corporales, fotografías en modelos reales y confirmación guiada de talla por WhatsApp antes de enviar el pedido.",
      description: "Tienda online de moda masculina de tallas grandes (XL a 6XL). Catálogo con fotos en modelos reales, guía interactiva de medidas anatómicas y compra por WhatsApp.",
      architectureSummary: "SPA de ultracarga con renderizado ligero en React y Vite. Algoritmo frontend de recomendación de tallas según centímetros de pecho y cuello que garantiza ajuste perfecto.",
      keyDeliverables: [
        "Guía interactiva de medidas anatómicas (cuello, pecho, contorno y largo)",
        "Catálogo con modelos reales en tallas 2XL, 3XL, 4XL, 5XL y 6XL",
        "Carrito de compras flotante con stock en tiempo real",
        "Asistencia de un Personal Shopper por WhatsApp antes del despacho"
      ],
      metrics: [
        { label: "Menos Devoluciones", value: "-65%", note: "Ajuste anatómico preciso verificado" },
        { label: "Ventas Plus Size", value: "+210%", note: "Confianza del comprador online" },
        { label: "Tasa de Conversión", value: "4.8%", note: "Muy superior a la media de retail" },
        { label: "Carga Smartphones", value: "0.49s", note: "Optimización total para móviles" }
      ],
      image: "/images/03-portafolio/framed/camisas-tallas-grandes.webp",
      modalImage: "/images/03-portafolio/real/camisas-tallas-grandes-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/camisas-tallas-grandes-mobile.webp",
      link: "https://camisasentallasgrandes.vercel.app/#inicio"
    },

    // --- 11. NUEVA VIDA CENTRO MÉDICO ---
    {
      title: "Nueva Vida Centro Médico",
      slug: "nueva-vida-centro-medico",
      clientName: "Centro Médico Policlínico Nueva Vida",
      location: "San Juan de Lurigancho / Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "salud",
      industryLabel: "Policlínico Integral & Especialidades Médicas",
      architectureLevel: "Nivel 2: Portal Médico & Agendamiento de Citas",
      techStack: ["Next.js 15", "Agendador de Citas Online", "Directorio Médico por Horarios", "Tailwind CSS", "WhatsApp Citas Recordatorio"],
      highlights: "Centro de salud integral con más de 12 especialidades médicas y laboratorio clínico, con aumento del 190% en citas médicas confirmadas.",
      challenge: "Pacientes de la zona enfrentaban largas filas en recepción para consultar disponibilidad de médicos especialistas (pediatría, ginecología, traumatología, medicina interna).",
      solution: "Directorio interactivo con horarios de atención médica en vivo, reserva de turnos en 3 clics y recordatorios automáticos por WhatsApp para reducir ausentismo.",
      description: "Portal médico para centro de salud integral con catálogo de especialidades, perfiles médicos y sistema de agendamiento de citas presenciales y virtuales.",
      architectureSummary: "Next.js 15 con renderizado optimizado para bajo consumo de datos móviles en smartphones de gama media y baja. Encriptación de datos de pacientes y tiempos de carga récord.",
      keyDeliverables: [
        "Buscador de médicos especialistas con perfil profesional y horarios",
        "Sistema de agendamiento rápido de consultas presenciales y virtuales",
        "Desglose de servicios de laboratorio clínico, ecografías y chequeos",
        "Envío de confirmación y recordatorio de turno médico por WhatsApp"
      ],
      metrics: [
        { label: "Citas Agendadas", value: "+190%", note: "Reserva digital sin hacer colas" },
        { label: "Menos Inasistencias", value: "-52%", note: "Recordatorios automatizados" },
        { label: "Tiempo Agendamiento", value: "< 45s", note: "Flujo simplificado de 3 clics" },
        { label: "Carga Móvil", value: "0.51s", note: "Bajo consumo de datos para pacientes" }
      ],
      image: "/images/03-portafolio/framed/nueva-vida-centro-medico.webp",
      modalImage: "/images/03-portafolio/real/nueva-vida-centro-medico-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/nueva-vida-centro-medico-mobile.webp",
      link: "https://nueva-vida-consultorio.vercel.app/#inicio"
    },

    // --- 17. ACADEMIA EL PROFE ---
    {
      title: "Academia Online El Profe",
      slug: "academia-el-profe",
      clientName: "Academia Preuniversitaria El Profe",
      location: "Lima / Nivel Nacional, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "educacion",
      industryLabel: "EdTech Preuniversitaria & Ingeniería UNI/UNMSM",
      architectureLevel: "Nivel 2: Plataforma Educativa Online & Matrícula",
      techStack: ["Next.js 15 App Router", "Catálogo de Ciclos Académicos", "Descarga de Material Didáctico", "Tailwind CSS", "WhatsApp Matrículas"],
      highlights: "Plataforma de preparación preuniversitaria de alto rigor en ciencias e ingeniería liderada por el Prof. Kike, con incremento del 240% en matrículas digitales.",
      challenge: "Postulantes a la UNI y San Marcos en Lima y provincias necesitaban acceso transparente a los temarios de física, cálculo y química, cronogramas y facilidades de pago digital.",
      solution: "Catálogo de ciclos (Semestral, Intensivo, Repaso y Reforzamiento), aulas virtuales con horarios sincrónicos y matrícula directa por WhatsApp con validación de comprobante.",
      description: "Plataforma web de educación preuniversitaria y reforzamiento escolar con catálogo de cursos, horarios de clases en vivo y matrícula online directa.",
      architectureSummary: "Next.js 15 con Server Components para el catálogo de asignaturas y módulos. CDN global para descarga instantánea de guías en PDF y resolución de exámenes pasados.",
      keyDeliverables: [
        "Catálogo estructurado de ciclos intensivos para la UNI y San Marcos",
        "Módulo de descarga de exámenes de admisión resueltos y guías en PDF",
        "Cronograma de clases en vivo, simulacros semanales y asesorías",
        "Automatización de matrículas y asignación de vacante por WhatsApp"
      ],
      metrics: [
        { label: "Matrículas Digitales", value: "+240%", note: "Postulantes de Lima y provincias" },
        { label: "Descargas Material", value: "3,500+/mes", note: "Guías y exámenes de admisión en PDF" },
        { label: "Velocidad Web", value: "0.47s", note: "Next.js 15 con edge caching" },
        { label: "Tasa Ingreso UNI", value: "Alta Tasa", note: "Efectividad del método Prof. Kike" }
      ],
      image: "/images/03-portafolio/framed/academia-el-profe.webp",
      modalImage: "/images/03-portafolio/real/academia-el-profe-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/academia-el-profe-mobile.webp",
      link: "https://www.academiaelprofeoficial.com/"
    },

    // --- 18. BREICORP ---
    {
      title: "Breicorp Soluciones Empresariales",
      slug: "breicorp",
      clientName: "Breicorp Ingeniería & Construcción",
      location: "Surco / Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "construccion",
      industryLabel: "Obras Civiles, Estructuras & Consultoría B2B",
      architectureLevel: "Nivel 2: Portal Corporativo B2B con Dossier de Obras",
      techStack: ["React / Vite", "Portafolio de Obras Civiles HD", "Dossier de Homologaciones", "Tailwind CSS", "WhatsApp Corporativo"],
      highlights: "Dossier corporativo de obras civiles, plantas industriales y proyectos de ingeniería estructural con incremento del 120% en cotizaciones para licitaciones.",
      challenge: "Comités de compras de empresas privadas y contratistas generales requerían comprobar experiencia previa en obras de gran escala y acreditaciones de seguridad antes de invitar a licitación.",
      solution: "Presentación sobria de proyectos ejecutados con galería técnica, certificaciones ISO y canal prioritario de comunicación con la gerencia de operaciones.",
      description: "Sitio corporativo de consultoría empresarial, logística y servicios de suministros para el sector privado y corporativo.",
      architectureSummary: "Diseño de autoridad corporativa sin plantillas genéricas. Carga ultrarrápida en laptops y tablets de ingenieros residentes en obra mediante compresión WebP y código optimizado.",
      keyDeliverables: [
        "Dossier interactivo de proyectos de construcción y obras concluidas",
        "Presentación de homologaciones y estándares de seguridad industrial",
        "Módulo de solicitud de bases para licitaciones de obras civiles",
        "Canal directo con la dirección de operaciones e ingeniería"
      ],
      metrics: [
        { label: "Cotizaciones Obra", value: "+120%", note: "Licitaciones privadas corporativas" },
        { label: "Grandes Proyectos", value: "25+ Obras", note: "Infraestructura civil e industrial" },
        { label: "Carga en Terreno", value: "0.52s", note: "Acceso rápido desde tablets en obra" },
        { label: "Acreditación", value: "Homologado", note: "Cumplimiento normativo para empresas" }
      ],
      image: "/images/03-portafolio/framed/breicorp.webp",
      modalImage: "/images/03-portafolio/real/breicorp-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/breicorp-mobile.webp",
      link: "https://breicorp.com.pe/"
    },

    // --- 19. MANDICORP ---
    {
      title: "Mandi Corp",
      slug: "mandi-corp",
      clientName: "Mandi Corp Préstamos",
      location: "San Isidro, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Financiamiento Corporativo & Préstamos Pyme",
      architectureLevel: "Nivel 2: Calculadora Financiera Inteligente con Partículas",
      techStack: ["React / Vite", "Simulador Cuotas Financieras", "Efecto Partículas Canvas", "Tailwind CSS", "WhatsApp Lead Engine"],
      highlights: "Plataforma de créditos en línea con calculadora inteligente de cuotas y diseño dorado premium, logrando un aumento del 150% en solicitudes de financiamiento comercial.",
      challenge: "Los microempresarios encontraban los simuladores de los bancos tradicionales lentos, confusos y llenos de requisitos excluyentes, perdiendo oportunidades de capital de trabajo.",
      solution: "Simulador financiero interactivo con cálculo inmediato de cuotas mensuales, animación elegante de partículas doradas y pre-evaluación en menos de 24 horas por WhatsApp.",
      description: "Plataforma de préstamos en línea con calculadora inteligente de cuotas, doble menú de navegación, efecto de partículas de animación y WhatsApp para solicitudes instantáneas.",
      architectureSummary: "Desarrollo en React y Vite con renderizado a 60fps de partículas mediante Canvas optimizado. Carga del sitio en 0.50 segundos con bundle de JavaScript minificado.",
      keyDeliverables: [
        "Calculadora dinámica de amortización de préstamos según monto y plazo",
        "Efecto de partículas interactivas de alta fidelidad sin sobrecargar la CPU",
        "Doble menú de navegación corporativa y libro de reclamaciones digital",
        "Enrutamiento de leads evaluados directo a ejecutivos de crédito"
      ],
      metrics: [
        { label: "Solicitudes Crédito", value: "+150%", note: "Pymes y capital de trabajo" },
        { label: "Tiempo de Carga", value: "0.50s", note: "Bundle ultra-optimizado con Vite" },
        { label: "Tasa Finalización", value: "82%", note: "Usuarios que completan el simulador" },
        { label: "Evaluación Rápida", value: "< 24h", note: "Pre-aprobación crediticia express" }
      ],
      image: "/images/03-portafolio/framed/mandi-corp.webp",
      modalImage: "/images/03-portafolio/real/mandi-corp-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/mandi-corp-mobile.webp",
      link: "https://www.mandicorp.com/#inicio"
    },

    // --- 20. EDITORIAL HORIZONTE ---
    {
      title: "Editorial Horizonte",
      slug: "editorial-horizonte",
      clientName: "Editorial Horizonte Fondo Editorial",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "educacion",
      industryLabel: "Fondo Editorial, Literatura & Ciencias Sociales",
      architectureLevel: "Nivel 2: E-commerce de Catálogo Dinámico con Sanity CMS",
      techStack: ["Next.js 15", "Sanity CMS Headless", "Buscador Predictivo de Libros", "Tailwind CSS", "WhatsApp Checkout"],
      highlights: "Digitalización y venta online de más de 50 años de historia editorial peruana (incluyendo obras de José María Arguedas), con incremento del 175% en ventas a lectores.",
      challenge: "Miles de títulos literarios, ensayos históricos y textos académicos estaban dispersos en catálogos impresos sin una tienda online ágil para lectores y librerías del Perú y el mundo.",
      solution: "Tienda digital con panel de Sanity CMS para indexar libros por autor, género y año de edición, buscador predictivo y checkout directo con delivery nacional.",
      description: "Fondo editorial y tienda literaria oficial fundada en 1970 (con obras de José María Arguedas y ciencias sociales). Catálogo con buscador por autores y pasarela de pedidos directos.",
      architectureSummary: "Next.js 15 con Sanity Studio headless y base de datos de documentos JSON. Caching perimetral con invalidación instantánea al crear o actualizar libros en el catálogo.",
      keyDeliverables: [
        "Panel Sanity CMS para catalogación masiva de obras, autores y portadas",
        "Buscador predictivo por título, autor (Arguedas, etc.) y tema histórico",
        "Ficha editorial completa con sinopsis, índice y especificaciones de edición",
        "Carrito de compras y procesamiento de despachos vía WhatsApp"
      ],
      metrics: [
        { label: "Ventas a Lectores", value: "+175%", note: "Pedidos directos a todo el Perú" },
        { label: "Títulos Indexados", value: "500+ Obras", note: "Fondo editorial completo en Sanity" },
        { label: "Búsqueda Rápida", value: "< 100ms", note: "Filtro predictivo por autores" },
        { label: "Velocidad TTFB", value: "0.47s", note: "Edge rendering con Next.js 15" }
      ],
      image: "/images/03-portafolio/framed/editorial-horizonte.webp",
      modalImage: "/images/03-portafolio/real/editorial-horizonte-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/editorial-horizonte-mobile.webp",
      link: "https://editorial-horizonte-five.vercel.app/"
    },

    // --- 21. AMC SOLUCIONES PERÚ ---
    {
      title: "AMC Soluciones Perú",
      slug: "amc-soluciones-peru",
      clientName: "AMC Soluciones Perú Electromecánica",
      location: "Ate / Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "construccion",
      industryLabel: "Mantenimiento Electromecánico, HVAC & Minería",
      architectureLevel: "Nivel 2: Portal Industrial con Solicitud de Emergencia",
      techStack: ["Next.js 15", "Catálogo Servicios Electromecánicos", "Atención de Emergencias 24/7", "Tailwind CSS", "WhatsApp Técnico"],
      highlights: "Empresa de mantenimiento de bombas de agua, tableros eléctricos y sistemas de climatización HVAC con aumento del 130% en contratos preventivos con edificios e industrias.",
      challenge: "Plantas de producción y administradores de edificios corporativos necesitaban soporte técnico de urgencia ante fallas electromecánicas con capacidad de respuesta en menos de 2 horas.",
      solution: "Portal técnico con botón de guardia para emergencias 24/7, catálogo de planes de mantenimiento preventivo y dossier de homologación para empresas del sector minero e industrial.",
      description: "Portal de ingeniería electromecánica, montajes industriales y mantenimiento especializado para plantas de producción y minería en Perú.",
      architectureSummary: "Next.js 15 con carga ultra-rápida en conexiones móviles de plantas industriales. Estructura optimizada para captación de leads B2B en horarios de mantenimiento crítico.",
      keyDeliverables: [
        "Línea de emergencia electromecánica 24/7 con enlace directo a guardia técnica",
        "Catálogo de servicios: Tableros eléctricos, Bombas, Chiller, HVAC y Generadores",
        "Planes de mantenimiento preventivo y predictivo para edificios e industrias",
        "Formulario express para solicitud de visita técnica y diagnóstico en planta"
      ],
      metrics: [
        { label: "Contratos Prev.", value: "+130%", note: "Edificios corporativos y fábricas" },
        { label: "Tiempo Respuesta", value: "< 15 min", note: "Atención de emergencias técnicas" },
        { label: "Uptime de Red", value: "99.99%", note: "Infraestructura Cloud ininterrumpida" },
        { label: "Carga en Móviles", value: "0.50s", note: "Optimizado para ingenieros en campo" }
      ],
      image: "/images/03-portafolio/framed/amc-soluciones-peru.webp",
      modalImage: "/images/03-portafolio/real/amc-soluciones-peru-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/amc-soluciones-peru-mobile.webp",
      link: "https://www.amcsolucionesperu.com/"
    },

    // --- 22. ITOOLS PERÚ ---
    {
      title: "iTools Perú Ferretería Industrial",
      slug: "itools-peru",
      clientName: "iTools Perú S.A.C.",
      location: "Lima / Nivel Nacional, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce_saas",
      industryLabel: "Ferretería Industrial con Integración Bsale ERP",
      architectureLevel: "Nivel 3: Enterprise con Sincronización Bsale ERP en Vivo",
      techStack: ["Next.js 15", "Bsale ERP REST API", "Supabase PostgreSQL", "Sanity CMS", "Prisma ORM", "NextAuth"],
      highlights: "Sincronización bidireccional en tiempo real de más de 1,200 herramientas DeWalt, Bosch y Makita con el ERP Bsale y facturación electrónica SUNAT automática.",
      challenge: "La ferretería industrial manejaba ventas físicas en simultáneo con el canal digital, generando constantes quiebres de stock y discrepancias de precios al no tener el ERP sincronizado.",
      solution: "Integración de arquitectura de Webhooks y cron jobs con la API oficial de Bsale ERP: actualización de stock y precios al segundo, catálogo en Sanity CMS y panel de cotización rápida mayorista.",
      description: "E-commerce industrial y tecnológico de alto rendimiento con sincronización bidireccional en tiempo real de inventario, stock y facturación electrónica mediante Bsale ERP API.",
      architectureSummary: "Pipeline de sincronización desacoplado mediante Supabase PostgreSQL y Edge Functions. Cuando se genera una venta en Bsale en cualquier tienda física, el inventario del e-commerce se actualiza en menos de 2 segundos sin recargar.",
      keyDeliverables: [
        "Conexión bidireccional en vivo con Bsale ERP para inventario y precios",
        "Catálogo de más de 1,200 herramientas eléctricas con filtros por marca y potencia",
        "Panel de cotización express para empresas constructoras y talleres mecánicos",
        "Autenticación segura con NextAuth y emisión de boletas/facturas SUNAT"
      ],
      metrics: [
        { label: "Sincronización ERP", value: "< 2.0s", note: "Stock en vivo con Bsale en tiempo real" },
        { label: "Catálogo Indexado", value: "1,200+ SKUs", note: "DeWalt, Bosch, Stanley y Makita" },
        { label: "Cotización B2B", value: "< 30s", note: "Presupuesto mayorista instantáneo" },
        { label: "Lighthouse Móvil", value: "99/100", note: "Next.js 15 con Server Components" }
      ],
      image: "/images/03-portafolio/framed/itools-peru.webp",
      modalImage: "/images/03-portafolio/real/itools-peru-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/itools-peru-mobile.webp",
      link: "https://i-tools-steel.vercel.app/"
    },

    // --- 23. MEDINA ALMONTE FIRMA LEGAL ---
    {
      title: "Medina Almonte - Lawyers Firm",
      slug: "medina-almonte-firma-legal",
      clientName: "Medina Almonte Abogados",
      location: "Miraflores / San Isidro, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Litigio Penal, Derecho Corporativo & Arbitraje",
      architectureLevel: "Nivel 2: Plataforma Corporativa de Élite con Headless CMS",
      techStack: ["Next.js 15", "Sanity CMS Headless", "Preloader Institucional", "Tailwind CSS", "WhatsApp Cloud Direct"],
      highlights: "Firma jurídica de alta complejidad procesal con blog doctrinario autoadministrable en Sanity CMS y agendamiento confidencial de consultorías legales.",
      challenge: "Proyectar la más sólida reputación en defensa penal económica y litigios corporativos de alto patrimonio, permitiendo a los socios publicar artículos jurídicos sin soporte técnico.",
      solution: "Diseño de sobriedad clásica y acabados modernos, preloader corporativo de alto impacto, gestión de doctrina mediante Sanity CMS y canal de contacto de estricta confidencialidad.",
      description: "Plataforma institucional de élite para firma legal especializada en derecho civil, penal y corporativo. Incluye preloader corporativo, blog jurídico en Sanity CMS y agendamiento de consultorías.",
      architectureSummary: "Next.js 15 con Sanity CMS Headless para artículos de derecho penal y corporativo. Esquema JSON-LD LegalService estructurado para posicionamiento de abogados de prestigio en Lima.",
      keyDeliverables: [
        "Preloader corporativo sobrio que transmite autoridad y solvencia jurídica",
        "Sanity CMS para publicación de artículos de doctrina y sentencias clave",
        "Secciones especializadas: Defensa Penal, Corporativo, Civil y Arbitraje",
        "Sistema de agendamiento de reuniones legales de alta confidencialidad"
      ],
      metrics: [
        { label: "Consultas B2B", value: "+175%", note: "Casos penales y arbitrajes corporativos" },
        { label: "Gestión Autónoma", value: "100%", note: "Gestión interna sin programadores" },
        { label: "Tiempo de Carga", value: "0.48s", note: "Optimización sin plugins de WordPress" },
        { label: "Autoridad Legal", value: "Élite", note: "Percepción de alta firma en Lima" }
      ],
      image: "/images/03-portafolio/framed/medina-almonte-firma-legal.webp",
      modalImage: "/images/03-portafolio/real/medina-almonte-firma-legal-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/medina-almonte-firma-legal-mobile.webp",
      link: "https://www.medinaalmontelawyers.com/"
    },

    // --- 24. FEMAR LOGISTICS SAC ---
    {
      title: "Femar Logistics SAC",
      slug: "femar-logistics",
      clientName: "Femar Logistics S.A.C.",
      location: "Callao, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "logistica",
      industryLabel: "Agencia de Carga Internacional & Operador Logístico",
      architectureLevel: "Nivel 2: Plataforma Logística con Calculadora CBM",
      techStack: ["Next.js 15 App Router", "Calculadora de Cubicaje CBM", "Cotizador Fletes Marítimos FCL/LCL", "Tailwind CSS", "WhatsApp Logistics"],
      highlights: "Operador de carga internacional y agenciamiento de aduanas en el Callao con calculadora interactiva de CBM e incremento del 190% en captación de empresas importadoras.",
      challenge: "Los importadores y exportadores demoraban días en recibir tarifas de fletes marítimos o aéreos por no saber calcular los metros cúbicos y el peso volumétrico de su mercancía.",
      solution: "Herramienta digital de cálculo de volumen CBM según dimensiones y cantidad de bultos, enviando la proforma automáticamente a los ejecutivos de cuenta en el puerto del Callao.",
      description: "Portal corporativo para operador logístico integral de comercio exterior (transporte marítimo, aéreo y aduanas). Calculadora interactiva de cubicaje de carga y cotizaciones instantáneas vía WhatsApp.",
      architectureSummary: "Next.js 15 con Edge Network para cálculo matemático frontend instantáneo del cubicaje. Integración con WhatsApp Logistics API para canalizar requerimientos técnicos con documentación adjunta.",
      keyDeliverables: [
        "Calculadora interactiva de cubicaje (CBM) para contenedores de 20' y 40'",
        "Cotizador en línea de transporte marítimo (FCL/LCL), aéreo y agenciamiento",
        "Módulo informativo de trámites aduaneros, DAM y desaduanaje en el Callao",
        "Canal de comunicación directa con coordinadores de tráfico logístico"
      ],
      metrics: [
        { label: "Leads Importadores", value: "+190%", note: "Empresas importando por el Callao" },
        { label: "Cálculos CBM", value: "950+/mes", note: "Cubicaje exacto en línea por clientes" },
        { label: "Tiempo Cotización", value: "< 15 min", note: "Respuesta rápida de ejecutivos" },
        { label: "Velocidad Carga", value: "0.47s", note: "Next.js 15 con caché perimetral" }
      ],
      image: "/images/03-portafolio/framed/femar-logistics.webp",
      modalImage: "/images/03-portafolio/real/femar-logistics-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/femar-logistics-mobile.webp",
      link: "https://femar-logistics.vercel.app"
    },

    // --- 26. HOTEL PUNO TERRA ---
    {
      title: "Hotel Puno Terra",
      slug: "hotel-puno-terra",
      clientName: "Hotel Puno Terra & Tours",
      location: "Puno, Lago Titicaca, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Hotelería Boutique & Lago Titicaca",
      architectureLevel: "Nivel 2: Motor de Reservas Directas sin Intermediarios",
      techStack: ["Next.js 15", "Motor de Reservas WhatsApp", "Galería Panorámica WebP", "Schema.org Hotel", "Geolocalización Turística"],
      highlights: "Hotel de primer nivel a minutos del Lago Titicaca con habitaciones calefaccionadas y motor de reservas directas que ahorra 18% en comisiones a OTAs.",
      challenge: "Huéspedes que visitan Puno y las islas flotantes de los Uros reservaban mediante intermediarios que se quedaban con altos márgenes y no informaban sobre servicios clave como calefacción y oxígeno.",
      solution: "Plataforma directa con selector de fechas, presentación de habitaciones con calefacción integral, oxigenoterapia para la altura y reserva instantánea con confirmación por WhatsApp.",
      description: "Plataforma hotelera boutique con motor de reservas directas por WhatsApp que elimina el 18% de comisiones a OTAs (Booking/Expedia). Incluye selector de fechas, disponibilidad de suites y tours al Lago Titicaca.",
      architectureSummary: "Next.js 15 con renderizado estático en el borde de la red. Metadatos Schema.org Hotel integrados con coordenadas GPS de Puno para indexación preferente en Google Maps y Google Travel.",
      keyDeliverables: [
        "Motor interactivo de reserva de suites con selector de entrada y salida",
        "Detalle de servicios de altura: Calefacción, oxigenoterapia y mate de coca",
        "Catálogo de excursiones al Lago Titicaca (Uros, Taquile, Amantaní)",
        "Confirmación de estadía inmediata por WhatsApp sin comisiones extra"
      ],
      metrics: [
        { label: "Reservas Directas", value: "+155%", note: "Ahorro total de comisiones OTAs" },
        { label: "Ocupación Temporada", value: "91%", note: "Turistas nacionales y extranjeros" },
        { label: "Tiempo de Respuesta", value: "< 1 min", note: "Bot de confirmación por WhatsApp" },
        { label: "Puntaje en Móvil", value: "99/100", note: "Optimización total en smartphones" }
      ],
      image: "/images/03-portafolio/framed/hotel-puno-terra.webp",
      modalImage: "/images/03-portafolio/real/hotel-puno-terra-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/hotel-puno-terra-mobile.webp",
      link: "https://www.punoterra.com/"
    },

    // --- 27. PERU TRAVEL EXPERTS ---
    {
      title: "Peru Travel Experts Lujo",
      slug: "peru-travel-experts",
      clientName: "Peru Travel Experts Luxury Tours",
      location: "Cusco / Lima / Valle Sagrado, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Turismo Receptivo de Lujo & Expediciones Privadas",
      architectureLevel: "Nivel 2: Plataforma Exclusiva Internacional para Viajeros VIP",
      techStack: ["Next.js 15", "Diseño Editorial Ultra HD", "Itinerarios Privados Exclusivos", "Tailwind CSS", "WhatsApp Concierge VIP"],
      highlights: "Agencia receptiva de viajes de ultra lujo (tren Hiram Bingham, hoteles 5 estrellas y guías privados exclusivos) con aumento del 180% en reservas de alto ticket.",
      challenge: "Viajeros de alto poder adquisitivo de Estados Unidos, Canadá y Reino Unido exigían una propuesta estética digna de marcas de lujo, con itinerarios 100% personalizados y asistencia 24/7.",
      solution: "Diseño de estilo editorial con fotografía panorámica de altísima fidelidad, presentación de experiencias privadas y contacto directo con un Travel Designer especializado.",
      description: "Agencia boutique de turismo de lujo para el mercado receptivo de habla inglesa. Circuitos privados en trenes de lujo, hoteles cinco estrellas y expediciones exclusivas.",
      architectureSummary: "Arquitectura Next.js 15 con tipografías serif elegantes y streaming asíncrono de componentes visuales. Optimización extrema de imágenes WebP para una experiencia fluida sin saltos de contenido.",
      keyDeliverables: [
        "Catálogo de expediciones privadas: Machu Picchu VIP, Valle Sagrado y Amazonía",
        "Diseño editorial sofisticado adaptado al mercado anglosajón y europeo",
        "Módulo de diseño de itinerario a medida con concierge privado 24/7",
        "Canal exclusivo de atención prioritaria para cotizaciones de alto ticket"
      ],
      metrics: [
        { label: "Clientes Alto Ticket", value: "+180%", note: "Viajeros de EE.UU., Canadá y Europa" },
        { label: "Ticket Promedio", value: "$4,500+", note: "Paquetes privados exclusivos" },
        { label: "Tiempo de Carga", value: "0.46s", note: "Imágenes Retina con compresión WebP" },
        { label: "Satisfacción VIP", value: "5.0/5", note: "Calificación perfecta de viajeros" }
      ],
      image: "/images/03-portafolio/framed/peru-travel-experts.webp",
      modalImage: "/images/03-portafolio/real/peru-travel-experts-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/peru-travel-experts-mobile.webp",
      link: "https://www.perutravelexpertsb.com/"
    },

    // --- 28. CRÉDITOS YADIEL ---
    {
      title: "Créditos Yadiel",
      slug: "creditos-yadiel",
      clientName: "Créditos Yadiel Financiamiento",
      location: "Lima Norte / Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Microcréditos, Préstamos Rápidos & Capital de Trabajo",
      architectureLevel: "Nivel 2: Simulador de Microcréditos & Precalificación",
      techStack: ["React / Vite", "Calculadora de Cuotas Diarias/Semanales", "Precalificación Rápida", "Tailwind CSS", "WhatsApp Lead Engine"],
      highlights: "Sistema de préstamos rápidos para pequeños comerciantes y capital de trabajo en mercados de Lima, con incremento del 140% en solicitudes recibidas.",
      challenge: "Comerciantes independientes y bodegueros necesitaban conocer montos de cuotas diarias o semanales desde su celular sin trámites bancarios complejos ni pérdidas de tiempo.",
      solution: "Simulador financiero interactivo con cálculo automático de cuotas, requisitos mínimos y envío directo de la solicitud pre-evaluada a los analistas de crédito.",
      description: "Plataforma de créditos rápidos para emprendedores y capital de trabajo con simulador de cuotas diarias y semanales en tiempo real.",
      architectureSummary: "Aplicación frontend desarrollada en React con Vite, enfocada en cero consumo innecesario de megas móviles. Cálculos financieros inmediatos y botón directo a WhatsApp.",
      keyDeliverables: [
        "Simulador interactivo con selector de cuotas diarias, semanales o mensuales",
        "Formulario de precalificación express en 3 pasos simples",
        "Desglose de requisitos para emprendedores y comerciantes independientes",
        "Envío automático del expediente preliminar al asesor de créditos"
      ],
      metrics: [
        { label: "Solicitudes Diarias", value: "+140%", note: "Comerciantes y capital de trabajo" },
        { label: "Tiempo Evaluación", value: "< 2h", note: "Precalificación express en WhatsApp" },
        { label: "Carga en Red Móvil", value: "0.49s", note: "Sin consumo excesivo de datos" },
        { label: "Tasa Desembolso", value: "74%", note: "Leads prefiltrados con el simulador" }
      ],
      image: "/images/03-portafolio/framed/creditos-yadiel.webp",
      modalImage: "/images/03-portafolio/real/creditos-yadiel-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/creditos-yadiel-mobile.webp",
      link: "https://creditosyadiel.vercel.app/#inicio"
    },

    // --- 29. ROMA & ABOGADOS ---
    {
      title: "ROMA & ABOGADOS",
      slug: "roma-abogados",
      clientName: "Roma & Abogados Estudio Jurídico",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Defensa Tributaria SUNAT & Penal Económico",
      architectureLevel: "Nivel 2: Web Corporativa de Alta Conversión Jurídica",
      techStack: ["Next.js 15 App Router", "Edge Runtime", "Vercel Serverless", "Tailwind CSS", "WhatsApp Dynamic Routing"],
      highlights: "Firma jurídica especializada en defensa estratégica ante fiscalizaciones de SUNAT, embargo de cuentas y derecho laboral, con carga récord en 0.5 segundos.",
      challenge: "Empresarios que recibían notificaciones tributarias urgentes de cobranza coactiva necesitaban asesoría legal de emergencia sin perder tiempo en webs lentas o confusas.",
      solution: "Estructura institucional orientada a la resolución de contingencias tributarias, con calculador de servicios legales y canal de atención confidencial inmediata por WhatsApp.",
      description: "Estudio jurídico y tributario especializado en defensa estratégica ante SUNAT, derecho laboral y outsourcing contable corporativo. Optimizado para conversión en menos de 0.6s.",
      architectureSummary: "Despliegue perimetral en Next.js 15 y Vercel Edge con 100% de los Core Web Vitals en verde. Enrutamiento dinámico que asigna la consulta legal según la urgencia del caso.",
      keyDeliverables: [
        "Estructura orientada a conversión comercial ante contingencias de SUNAT",
        "Calculador de servicios tributarios, laborales y contables corporativos",
        "Canal de atención confidencial de máxima discreción para directores",
        "Optimización de carga en 0.5s para consultas urgentes desde celulares"
      ],
      metrics: [
        { label: "Casos SUNAT", value: "+160%", note: "Defensa contra cobranzas coactivas" },
        { label: "Tiempo Respuesta", value: "< 5 min", note: "Atención legal de emergencia" },
        { label: "Velocidad TTFB", value: "0.48s", note: "Vercel Edge sin esperas" },
        { label: "Tasa Retención", value: "88%", note: "Estructura sobria de alta credibilidad" }
      ],
      image: "/images/03-portafolio/framed/roma-abogados.webp",
      modalImage: "/images/03-portafolio/real/roma-abogados-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/roma-abogados-mobile.webp",
      link: "https://romaabogados.pe"
    },

    // --- 30. IMPORTACIONES USA - PERÚ ---
    {
      title: "Importaciones USA - Perú (eBay API)",
      slug: "importaciones-usa-peru",
      clientName: "Importaciones USA Perú Enterprise",
      location: "Miami, USA / Lima, Perú",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "logistica",
      industryLabel: "Cross-Border E-Commerce & eBay REST API",
      architectureLevel: "Nivel 3: Sistema Enterprise con Conexión a eBay REST API",
      techStack: ["Next.js 15 App Router", "eBay REST API Oficial", "Neon PostgreSQL", "Prisma ORM", "Cotizador Aranceles SUNAT", "NextAuth"],
      highlights: "Búsqueda y cotización en tiempo real de millones de productos en eBay con cálculo automático de aranceles SUNAT, flete aéreo y entrega puerta a puerta en Perú.",
      challenge: "Compradores peruanos no sabían cuánto pagarían por impuestos aduaneros, seguro de carga y flete internacional al comprar artículos de tecnología y repuestos en eBay.",
      solution: "Conexión en vivo con la API oficial de eBay, cálculo arancelario automático según partida aduanera y generación de orden de importación con cotización total en Soles.",
      description: "Plataforma inteligente de importación de productos desde Estados Unidos con integración directa a la API oficial de eBay en tiempo real. Cotizador automático de aranceles aduaneros e impuestos SUNAT.",
      architectureSummary: "Arquitectura fullstack con Next.js 15, Neon Serverless PostgreSQL y Prisma ORM. Tokenización OAuth 2.0 para llamadas a la API de eBay y cotizador arancelario con reglas tributarias de SUNAT.",
      keyDeliverables: [
        "Integración bidireccional en tiempo real con el catálogo global de eBay",
        "Motor de cálculo de fletes internacionales y aranceles SUNAT por partida",
        "Conversión de moneda USD a PEN en tiempo real con tipo de cambio interbancario",
        "Panel de seguimiento de importaciones y generación de guías logísticas"
      ],
      metrics: [
        { label: "eBay API en Vivo", value: "100%", note: "Millones de artículos sincronizados" },
        { label: "Cálculo Arancelario", value: "Exacto", note: "Impuestos SUNAT y flete al segundo" },
        { label: "Tiempo Cotización", value: "< 2.5s", note: "Respuesta de API internacional" },
        { label: "Órdenes Procesadas", value: "+230%", note: "Importaciones seguras puerta a puerta" }
      ],
      image: "/images/03-portafolio/framed/importaciones-usa-peru.webp",
      modalImage: "/images/03-portafolio/real/importaciones-usa-peru-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/importaciones-usa-peru-mobile.webp",
      link: "https://importaciones-pro-business.vercel.app/login"
    },

    // --- 31. E-COMMERCE BUILDER PRO ---
    {
      title: "E-commerce Builder Pro",
      slug: "ecommerce-builder-pro",
      clientName: "E-Commerce Builder Pro SaaS",
      location: "Remoto, Global",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "ecommerce_saas",
      industryLabel: "Plataforma Multi-tenant SaaS E-Commerce",
      architectureLevel: "Nivel 3: Arquitectura Multi-tenant con Super Admin",
      techStack: ["React / Vite", "Multi-tenant Architecture", "Super Admin Dashboard", "Subdomain Routing", "PostgreSQL Cloud"],
      highlights: "Plataforma multi-inquilino para aprovisionamiento masivo de tiendas virtuales con catálogos independientes, pasarela de pago y panel Super Admin centralizado.",
      challenge: "Permitir a emprendedores y agencias crear y desplegar tiendas e-commerce completas en menos de 5 minutos sin configurar servidores ni bases de datos manuales.",
      solution: "Infraestructura multi-tenant desacoplada con esquemas de base de datos aislados por tienda, analítica de ventas y control de suscripciones desde un Super Admin global.",
      description: "Plataforma Multi-tenant para la creación masiva de tiendas online. Permite a emprendedores lanzar su ecommerce en minutos con paneles de administración independientes y un Super Admin centralizado.",
      architectureSummary: "Aislamiento de inquilinos a nivel de aplicación con enrutamiento dinámico de subdominios. Microservicios ligeros para procesamiento de carritos de compra y transacciones.",
      keyDeliverables: [
        "Aprovisionamiento automático de nuevas tiendas online en menos de 3 minutos",
        "Panel Super Admin para supervisar ventas globales, usuarios y suscripciones",
        "Panel de administración independiente para cada comerciante o dueño de tienda",
        "Plantillas de diseño adaptables con checkout optimizado para móviles"
      ],
      metrics: [
        { label: "Tiempo Creación", value: "< 3 min", note: "Tienda online lista para vender" },
        { label: "Tiendas Activas", value: "80+ Stores", note: "Ecosistema comercial operando" },
        { label: "Uptime SaaS", value: "99.98%", note: "Infraestructura multi-inquilino" },
        { label: "Velocidad Carga", value: "0.45s", note: "Edge rendering global" }
      ],
      image: "/images/03-portafolio/framed/ecommerce-builder-pro.webp",
      modalImage: "/images/03-portafolio/real/ecommerce-builder-pro-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/ecommerce-builder-pro-mobile.webp",
      link: "https://tienda-online-oficial.vercel.app/",
      demoLink: "https://tienda-online-oficial.vercel.app/demo"
    },

    // --- 32. ATLAS CONSULTOR IA ---
    {
      title: "Atlas Consultor IA",
      slug: "atlas",
      clientName: "Atlas AI Business Engine",
      location: "Lima, Perú / Remoto",
      category: "App Móvil",
      type: "app",
      industry: "ecommerce_saas",
      industryLabel: "Inteligencia Artificial & Estrategia Empresarial",
      architectureLevel: "Nivel 3: Agente Conversacional IA para Pymes",
      techStack: ["React / Vite", "OpenAI LLM Engine", "Cloudflare Workers", "PWA Móvil Instalable", "Streaming SSE"],
      highlights: "Consultor de negocios con inteligencia artificial que diagnostica empresas en tiempo real y genera planes de acción estratégicos con 94% de recomendaciones adoptadas.",
      challenge: "Las pequeñas y medianas empresas no pueden costear consultorías estratégicas de miles de dólares para optimizar sus ventas, costos y modelos operativos.",
      solution: "Agente conversacional especializado en gestión empresarial con streaming de respuestas en tiempo real, guardado de diagnósticos y planes de acción descargables.",
      description: "Consultor estratégico de negocios con IA. Asistente inteligente que analiza tu negocio, sugiere estrategias de crecimiento y crea planes de acción semanales personalizados mediante chat conversacional.",
      architectureSummary: "Cloudflare Workers como gateway serverless de baja latencia comunicándose con modelos LLM mediante Server-Sent Events (SSE). Interfaz móvil PWA instalable con almacenamiento en IndexedDB.",
      keyDeliverables: [
        "Agente conversacional de IA entrenado en finanzas, marketing y operaciones",
        "Streaming de respuestas en tiempo real con latencia inferior a 500ms",
        "Generador de hojas de ruta empresariales y tareas semanales de crecimiento",
        "PWA instalable con funcionamiento fluido en cualquier dispositivo"
      ],
      metrics: [
        { label: "Latencia Streaming", value: "< 500ms", note: "Tokens en tiempo real sin pausas" },
        { label: "Planes Creados", value: "1,500+", note: "Estrategias personalizadas para pymes" },
        { label: "Satisfacción IA", value: "96%", note: "Recomendaciones de alto impacto" },
        { label: "Adopción Tareas", value: "94%", note: "Ejecución de planes por usuarios" }
      ],
      image: "/images/03-portafolio/framed/atlas.webp",
      modalImage: "/images/03-portafolio/real/atlas-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/atlas-mobile.webp",
      link: "https://atlas-9mv.pages.dev/"
    },

    // --- 33. COTIZADOR PRO SAAS ---
    {
      title: "Cotizador Pro SaaS",
      slug: "cotizador-pro",
      clientName: "Cotizador Pro Cloud",
      location: "Remoto, Global",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "ecommerce_saas",
      industryLabel: "SaaS B2B de Cotizaciones & Presupuestos PDF",
      architectureLevel: "Nivel 3: SaaS Multi-tenant con Google Auth & PDF Engine",
      techStack: ["React / Vite", "Google OAuth 2.0", "Motor de Generación PDF en 10s", "Sistema de Créditos", "PWA Instalable"],
      highlights: "SaaS para equipos comerciales que genera proformas en PDF con enlace de aceptación digital en menos de 10 segundos, elevando el cierre comercial en 35%.",
      challenge: "Vendedores y agencias perdían horas formateando proformas manuales en Word o Excel, enviando archivos desactualizados y perdiendo el seguimiento de clientes.",
      solution: "Plataforma multi-usuario con plantillas dinámicas, inicio de sesión con Google, cálculo automático de impuestos y generación instantánea de PDFs con enlace para firma en línea.",
      description: "SaaS multi-tenant con panel Super Admin, Google Auth, PWA instalable, sistema de créditos y automatización de plantillas de cotización.",
      architectureSummary: "Generación de documentos PDF en el navegador del cliente mediante motores vectoriales livianos sin consumir recursos de servidor. Sistema de créditos y autenticación federada con Google OAuth.",
      keyDeliverables: [
        "Generador de presupuestos comerciales en PDF de alta calidad en 10 segundos",
        "Autenticación segura con Google OAuth y perfiles multi-usuario por empresa",
        "Sistema de créditos y planes de suscripción para agencias y contratistas",
        "Enlace de visualización web interactivo para aceptación directa por el cliente"
      ],
      metrics: [
        { label: "Emisión de PDFs", value: "< 10s", note: "Generación de proformas al instante" },
        { label: "Incremento Cierre", value: "+35%", note: "Rapidez en la propuesta comercial" },
        { label: "Cotizaciones Creadas", value: "12,000+", note: "Documentos procesados por usuarios" },
        { label: "Tiempo Ahorrado", value: "8h/sem", note: "Por cada ejecutivo de ventas" }
      ],
      image: "/images/03-portafolio/framed/cotizador-pro.webp",
      modalImage: "/images/03-portafolio/real/cotizador-pro-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/cotizador-pro-mobile.webp",
      link: "https://cotizador-pro.pages.dev/"
    },

    // --- 34. LA CASONA GOURMET ---
    {
      title: "La Casona Gourmet",
      slug: "la-casona-gourmet",
      clientName: "La Casona Gourmet Restaurante",
      location: "Miraflores, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "ecommerce_saas",
      industryLabel: "Gastronomía, Menú Digital QR & Pedidos Directos",
      architectureLevel: "Nivel 2: Menú Visual Interactivo & Pedidos Directos",
      techStack: ["React / Vite", "Menú Digital QR Retina", "Comandas por WhatsApp Directo", "Vercel Edge", "Diseño Gastronómico HD"],
      highlights: "Digitalización de la carta gastronómica con código QR para mesas y pedidos a domicilio sin comisiones de apps de delivery, aumentando el ticket promedio en 28%.",
      challenge: "Restaurantes de alta cocina pagaban comisiones del 20% al 30% a apps de delivery (Rappi, PedidosYa) y sus comensales en salón esperaban demasiado por la carta física.",
      solution: "Menú digital accesible por QR con fotografías de alta resolución de cada plato, sugerencias de maridaje de vinos y despacho de comandas directo a la cocina por WhatsApp.",
      description: "Sistema de reservas y pedidos directos por WhatsApp con menú visual optimizado para aumentar ventas y rotación de comensales.",
      architectureSummary: "Aplicación web ligera con precarga de imágenes de platos. Despliegue en red Edge para carga instantánea al escanear el QR en las mesas del restaurante.",
      keyDeliverables: [
        "Menú digital interactivo optimizado para lectura instantánea vía código QR",
        "Fotografías en alta definición con detalle de ingredientes y alérgenos",
        "Módulo de sugerencia de maridaje de vinos y guarniciones recomendadas",
        "Envío de comanda organizada directamente al WhatsApp del restaurante"
      ],
      metrics: [
        { label: "Ahorro Comisiones", value: "100%", note: "Cero pagos a aplicaciones de delivery" },
        { label: "Ticket Promedio", value: "+28%", note: "Sugerencias de maridaje y postres" },
        { label: "Escaneo Carta QR", value: "< 0.4s", note: "Carga inmediata en las mesas" },
        { label: "Rotación Mesas", value: "+22%", note: "Atención ágil sin esperas por la carta" }
      ],
      image: "/images/03-portafolio/framed/la-casona-gourmet.webp",
      modalImage: "/images/03-portafolio/real/la-casona-gourmet-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/la-casona-gourmet-mobile.webp",
      link: "https://la-casa-gourmet.vercel.app/"
    },

    // --- 35. URBAN STYLE ---
    {
      title: "Urban Style Streetwear",
      slug: "urban-style",
      clientName: "Urban Style Fashion Retail",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "moda",
      industryLabel: "Moda Urbana, Streetwear & Retail PWA",
      architectureLevel: "Nivel 2: Tienda Online PWA con Lookbook Interactivo",
      techStack: ["React / Vite", "PWA Instalable con Push", "Sistema de Favoritos", "Panel Admin de Inventario", "Checkout WhatsApp Express"],
      highlights: "Tienda online de streetwear y cultura urbana con experiencia tipo app nativa móvil, logrando un incremento del 220% en pedidos recurrentes de jóvenes.",
      challenge: "El público de moda urbana compra casi exclusivamente desde smartphones y abandona tiendas online lentas con formularios de registro extensos.",
      solution: "Experiencia PWA fluida que se instala en la pantalla de inicio del teléfono, con lookbook visual de colecciones, lista de favoritos y compra en 2 toques por WhatsApp.",
      description: "Tienda online completa con carrito de compras, sistema de favoritos, panel de administrador y panel de clientes. PWA con notificaciones push y checkout express.",
      architectureSummary: "Desarrollo en React con Service Workers para capacidades offline y almacenamiento en caché. Integración con WhatsApp para un checkout sin fricción que no requiere contraseña.",
      keyDeliverables: [
        "Lookbook interactivo con micro-videos y fotos de moda urbana en alta definición",
        "PWA instalable en iOS y Android con icono personalizado en el celular",
        "Lista de favoritos en memoria local para guardar prendas y outfits deseados",
        "Panel administrativo para control de stock por talla (S, M, L, XL) y color"
      ],
      metrics: [
        { label: "Pedidos Recurrentes", value: "+220%", note: "Comunidad fidelizada de moda urbana" },
        { label: "Instalaciones PWA", value: "1,800+", note: "App en pantallas de inicio de clientes" },
        { label: "Velocidad Carga", value: "0.46s", note: "Optimización extrema para smartphones" },
        { label: "Tasa Conversión", value: "5.2%", note: "Checkout rápido sin contraseñas" }
      ],
      image: "/images/03-portafolio/framed/urban-style.webp",
      modalImage: "/images/03-portafolio/real/urban-style-desktop.webp",
      modalMobileImage: "/images/03-portafolio/real/urban-style-mobile.webp",
      link: "https://tienda-online-oficial.vercel.app/demo"
    }
  ],

  en: [] // Populated dynamically below
};

// Mirror the EN array from ES with translated labels
PORTFOLIO_BY_LANG.en = PORTFOLIO_BY_LANG.es.map(p => ({
  ...p,
  category: p.category === "Tienda Online" ? "Online Store" :
            p.category === "App Móvil" ? "Mobile App" :
            p.category === "Proyecto Personalizado" ? "Custom Project" : "Professional Web"
}));

// Map each title to slug
export const PORTFOLIO_SLUGS = {};
PORTFOLIO_BY_LANG.es.forEach(p => {
  PORTFOLIO_SLUGS[p.title] = p.slug;
});

// Map slugs back to title
export const slugToTitle = {};
Object.entries(PORTFOLIO_SLUGS).forEach(([title, slug]) => {
  slugToTitle[slug] = title;
});

// Modal Desktop images map
export const PORTFOLIO_MODAL_IMAGES = {};
PORTFOLIO_BY_LANG.es.forEach(p => {
  PORTFOLIO_MODAL_IMAGES[p.title] = p.modalImage || p.image;
});

// Modal Mobile images map
export const PORTFOLIO_MODAL_MOBILE_IMAGES = {};
PORTFOLIO_BY_LANG.es.forEach(p => {
  PORTFOLIO_MODAL_MOBILE_IMAGES[p.title] = p.modalMobileImage || p.modalImage || p.image;
});
