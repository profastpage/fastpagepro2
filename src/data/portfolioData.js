// Fast Page Pro — Complete Client & Enterprise Portfolio Database
// 100% of all 29 clients from C:\dev\CLIENTES + SaaS architectures & enterprise tools.

export const PORTFOLIO_CATEGORIES = {
  es: ["Todos", "Web Profesional", "Tienda Online", "App Móvil", "Proyecto Personalizado"],
  en: ["All", "Professional Web", "Online Store", "Mobile App", "Custom Project"]
};

export const PORTFOLIO_BY_LANG = {
  es: [
    // --- 1. VUELO 78 HOTEL TARAPOTO ---
    {
      title: "Vuelo 78 Hotel Tarapoto",
      slug: "vuelo-78-hotel",
      location: "Tarapoto, San Martín, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Hotelería Selva Amazónica",
      architectureLevel: "Nivel 2: Motor de Reservas Directas",
      techStack: ["React / Vite", "WhatsApp Engine Automatizado", "Galería Inmersiva", "Vercel Edge"],
      highlights: "Aumento de 15 a 42 reservas mensuales directas gracias al sistema automatizado de WhatsApp.",
      challenge: "Atender consultas de huéspedes internacionales 24/7 sin contratar personal nocturno de recepción.",
      solution: "Flujo conversacional automatizado que verifica disponibilidad de habitaciones y guía al huésped hasta el pago de la seña.",
      description: "Sistema de reservas directas por WhatsApp con disponibilidad por fechas y respuesta automatizada del hotel en Tarapoto.",
      image: "/images/03-portafolio/framed/vuelo-78-hotel.webp",
      modalImage: "/images/03-portafolio/vuelo78hotel-modal.webp",
      modalMobileImage: "/images/03-portafolio/vuelo78hotel-mobile.webp",
      link: "https://www.vuelo78hotel.com"
    },

    // --- 2. CMC LATAM ---
    {
      title: "CMC LATAM Arquitectura",
      slug: "cmc-latam",
      location: "Lima / Litoral, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "corporativo",
      industryLabel: "Arquitectura Costera & Construcción",
      architectureLevel: "Nivel 2: Plataforma Corporativa Bilingüe",
      techStack: ["React / Vite", "Dark/Light Mode", "Galería Arquitectónica HD", "WhatsApp Multicanal"],
      highlights: "Plataforma bilingüe de arquitectura con modo oscuro/claro y catálogo de residencias de playa.",
      challenge: "Proyectar elegancia minimalista a clientes corporativos e inversionistas de casas de playa en el litoral peruano.",
      solution: "Arquitectura visual fluida, alternador de tema claro/oscuro, renderizado de planos en alta resolución y CTAs dinámicos.",
      description: "Plataforma web bilingüe para empresa de arquitectura y construcción costera. Incluye modo claro/oscuro, WhatsApp dinámico con CTAs personalizados y galería de proyectos residenciales.",
      image: "/images/03-portafolio/framed/cmc-latam.webp",
      modalImage: "/images/03-portafolio/CMCLATAM.webp",
      modalMobileImage: "/images/03-portafolio/CMCLATAM.webp",
      link: "https://cmc-latam-2.vercel.app/"
    },

    // --- 3. MODA DIGITAL PRO ---
    {
      title: "Moda Digital Pro",
      slug: "moda-digital-pro",
      location: "Gamarra, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "ecommerce",
      industryLabel: "Plotters & Maquinaria Textil",
      architectureLevel: "Nivel 2: Catálogo Industrial App-Style",
      techStack: ["React / Vite", "Video Hero 4K", "Catálogo Maquinaria Industrial", "WhatsApp Industrial"],
      highlights: "Plataforma con Video Hero 4K y navegación estilo app móvil para venta de maquinaria textil de gran formato.",
      challenge: "Mostrar la capacidad técnica de plotters y estampadoras industriales de alta precisión a confeccionistas de Gamarra y Lima.",
      solution: "Experiencia audiovisual inmersiva con fichas técnicas descargables y contacto directo con ingenieros de soporte.",
      description: "Plataforma web para empresa de plotters textiles y equipos de confección. Video Hero profesional, modo claro/oscuro, catálogo de equipos y servicios de sublimación digital.",
      image: "/images/03-portafolio/framed/moda-digital-pro.webp",
      modalImage: "/images/03-portafolio/ModaDigitalPro-modal.webp",
      modalMobileImage: "/images/03-portafolio/ModaDigitalPro-mobile.webp",
      link: "https://www.modadigitalpro.com/"
    },

    // --- 4. SEMALTEMED ---
    {
      title: "Semaltemed Dispositivos Médicos",
      slug: "semaltemed",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "salud",
      industryLabel: "Salud & Equipamiento Clínico",
      architectureLevel: "Nivel 2: Catálogo Institucional Médico",
      techStack: ["Next.js 15", "Catálogo Dispositivos Médicos", "Tailwind CSS", "Cotizador Clínico WhatsApp"],
      highlights: "Catálogo integral de instrumental y equipamiento médico con especificaciones técnicas para clínicas y hospitales.",
      challenge: "Facilitar la cotización institucional de insumos médicos de alta precisión para centros de salud del sector público y privado.",
      solution: "Navegación por especialidades médicas, descarga de fichas técnicas y botón de cotización directa por WhatsApp con ejecutivos clínicos.",
      description: "Portal corporativo y catálogo de equipamiento médico y suministros clínicos para hospitales, consultorios y laboratorios.",
      image: "/images/03-portafolio/framed/semaltemed.webp",
      modalImage: "/images/03-portafolio/Semaltemed.webp",
      modalMobileImage: "/images/03-portafolio/Semaltemed.webp",
      link: "https://semaltemed.com"
    },

    // --- 5. GINCANA CLUB CAMPESTRE ---
    {
      title: "Gincana Club Campestre",
      slug: "gincana-club-campestre",
      location: "Chosica / Cieneguilla, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "corporativo",
      industryLabel: "Eventos Corporativos & Clubes",
      architectureLevel: "Nivel 2: Plataforma de Eventos & Reservas",
      techStack: ["React / Vite", "Galería Sedes Campestres", "Cotizador Dinámico de Eventos", "WhatsApp API"],
      highlights: "Gestión de gincanas y paseos campestres para colegios de abogados, empresas corporativas y familias.",
      challenge: "Digitalizar la oferta de clubes campestres afiliados (Club Ceande, Club Cecal Abogados, Club Certse) para reservas corporativas masivas.",
      solution: "Catálogo interactivo de sedes campestres con áreas verdes, piscinas y paquetes todo incluido de integración laboral.",
      description: "Plataforma especializada en organización de eventos corporativos, gincanas campestres y días de integración laboral en clubes de Lima.",
      image: "/images/03-portafolio/framed/gincana-club-campestre.webp",
      modalImage: "/images/03-portafolio/GincanaClub.webp",
      modalMobileImage: "/images/03-portafolio/GincanaClub.webp",
      link: "https://gincanaclubcampestre.com"
    },

    // --- 6. JHON & ASOCIADOS ---
    {
      title: "Jhon & Asociados Estudio Contable",
      slug: "jhon-asociados",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Estudio Contable & Tributario SUNAT",
      architectureLevel: "Nivel 2: Web Corporativa Multi-servicio",
      techStack: ["React / Vite", "Preloader Temático", "Sistema Consultorías SUNAT", "WhatsApp Dinámico"],
      highlights: "Sitio web institucional de 5 subpáginas con enrutamiento de consultorías tributarias.",
      challenge: "Segmentar adecuadamente a personas naturales y empresas que requerían asesoría contable o defensa ante SUNAT.",
      solution: "Navegación por especialidad con preloader corporativo y canalización directa a los contadores especialistas.",
      description: "Sitio web completo de 5 subpáginas para estudio contable especializado en tributaria y defensa ante SUNAT con preloader temático y WhatsApp dinámico.",
      image: "/images/03-portafolio/framed/jhon-asociados.webp",
      modalImage: "/images/03-portafolio/JhonAsociados.webp",
      modalMobileImage: "/images/03-portafolio/JhonAsociados.webp",
      link: "https://www.jhonasociados.com/"
    },

    // --- 7. UNIÓN EL PROGRESO ---
    {
      title: "Cooperativa Unión el Progreso",
      slug: "union-el-progreso",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Cooperativa de Ahorro y Crédito",
      architectureLevel: "Nivel 2: Simulador Financiero & Créditos",
      techStack: ["Next.js 15", "Simulador Crédito Vehicular", "Calculadora Préstamos", "WhatsApp Lead Routing"],
      highlights: "Simuladores en vivo para préstamos personales, vehiculares y fondos de ahorro mutuo con captación de socios.",
      challenge: "Inspirar seguridad financiera cooperativa y simplificar la solicitud de préstamos vehiculares y de libre disponibilidad.",
      solution: "Portal institucional con calculadora financiera de cuotas, libro de reclamaciones digital y canal prioritario de afiliación.",
      description: "Portal institucional para cooperativa de ahorro y crédito con simulador de préstamos personales, créditos vehiculares y afiliación de nuevos socios.",
      image: "/images/03-portafolio/framed/union-el-progreso.webp",
      modalImage: "/images/03-portafolio/UnionProgreso-hero.webp",
      modalMobileImage: "/images/03-portafolio/UnionProgreso.webp",
      link: "https://unionelprogreso.pe"
    },

    // --- 8. INTIQUILLA ADVENTURES ---
    {
      title: "Intiquilla Adventures Cusco",
      slug: "intiquilla-adventures",
      location: "Cusco, Machu Picchu, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Turismo & Trekking Cusco",
      architectureLevel: "Nivel 2: Plataforma Turística Bilingüe",
      techStack: ["React / Vite", "Booking Engine WhatsApp", "Galería Inmersiva", "SEO Turístico Internacional"],
      highlights: "Plataforma de expediciones y trekking en Cusco con itinerarios detallados y reservas directas.",
      challenge: "Comercializar tours de alta montaña y visitas a Machu Picchu a turistas internacionales sin intermediarios.",
      solution: "Itinerarios visuales día por día, mapa de rutas y atención personalizada mediante chat multilingüe en WhatsApp.",
      description: "Operador de turismo de aventura y expediciones en Cusco y Machu Picchu. Catálogo de paquetes turísticos, reservas directas a WhatsApp y diseño bilingüe.",
      image: "/images/03-portafolio/framed/intiquilla-adventures.webp",
      modalImage: "/images/03-portafolio/IntiquillaAdventures.webp",
      modalMobileImage: "/images/03-portafolio/IntiquillaAdventures.webp",
      link: "https://intiquilla-adventures.vercel.app"
    },

    // --- 9. EL HOMBRE HOTEL ---
    {
      title: "El Hombre Hotel Huanchaco",
      slug: "el-hombre-hotel",
      location: "Huanchaco, La Libertad, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Hotelería & Surf Beachfront",
      architectureLevel: "Nivel 2: Sistema de Reservas Frente al Mar",
      techStack: ["React / Vite", "Motor Reservas Directas", "Galería Habitaciones Marítimas", "WhatsApp Bot"],
      highlights: "Hotel boutique y surf camp frente al mar en Huanchaco con reserva directa de habitaciones.",
      challenge: "Promocionar habitaciones con vista directa a la rompiente de olas para la comunidad surfista nacional e internacional.",
      solution: "Galería fotográfica de suites frente al mar y canal directo de reservas con confirmación instantánea.",
      description: "Hotel boutique frente al mar en Huanchaco. Incluye vista a las olas, restaurante de comida marina, reservas directas por WhatsApp y suites familiares.",
      image: "/images/03-portafolio/framed/el-hombre-hotel.webp",
      modalImage: "/images/03-portafolio/ElHombreHotel.webp",
      modalMobileImage: "/images/03-portafolio/ElHombreHotel.webp",
      link: "https://elhombrehotel.com"
    },

    // --- 10. RAINFOREST WILD ---
    {
      title: "Rainforest Wild Expeditions",
      slug: "rainforest-wild",
      location: "Iquitos / Tambopata, Amazonía, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Ecoturismo & Expediciones Amazónicas",
      architectureLevel: "Nivel 2: Plataforma Ecoturística Directa",
      techStack: ["Next.js 15", "Reserva Expediciones Selva", "Galería Flora & Fauna HD", "WhatsApp Bilingüe"],
      highlights: "Promoción de paquetes vivenciales ecológicos y safaris fotográficos en la selva virgen del Perú.",
      challenge: "Conectar con viajeros europeos y norteamericanos interesados en conservación de fauna amazónica y turismo de naturaleza.",
      solution: "Diseño inmersivo con guías de biodiversidad, itinerarios de navegación fluvial y cotización personalizada por WhatsApp.",
      description: "Plataforma de expediciones ecológicas y lodges en la selva amazónica. Incluye avistamiento de fauna, tours guiados y reserva de paquetes de aventura.",
      image: "/images/03-portafolio/framed/rainforest-wild.webp",
      modalImage: "/images/03-portafolio/RainforestWild.webp",
      modalMobileImage: "/images/03-portafolio/RainforestWild.webp",
      link: "https://rainforestwild.com"
    },

    // --- 11. SERTRADE ---
    {
      title: "Sertrade Soluciones Industriales",
      slug: "sertrade",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "logistica",
      industryLabel: "Construcción, Electricidad & Suministros",
      architectureLevel: "Nivel 2: Portal Técnico Corporativo",
      techStack: ["Next.js 15", "Catálogo Suministros Industriales", "Video Hero Industrial", "Tailwind CSS"],
      highlights: "Proveedor integral de servicios de construcción, instalaciones eléctricas industriales y comercio comercial.",
      challenge: "Proyectar capacidad técnica para licitaciones con empresas mineras, constructoras y plantas industriales.",
      solution: "Fichas técnicas de proyectos ejecutados, catálogo de divisiones electromecánicas y canal de cotizaciones B2B.",
      description: "Portal corporativo para empresa de servicios de construcción, montajes eléctricos y suministros industriales para obras civiles y mineras.",
      image: "/images/03-portafolio/framed/sertrade.webp",
      modalImage: "/images/03-portafolio/Sertrade.webp",
      modalMobileImage: "/images/03-portafolio/Sertrade.webp",
      link: "https://sertrade.com"
    },

    // --- 12. MAIA STORE ---
    {
      title: "Maia Store",
      slug: "maia-store",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "Moda & Retail Femenino",
      architectureLevel: "Nivel 2: Tienda Online con Sanity CMS",
      techStack: ["Next.js 15", "Sanity CMS Headless", "PWA Móvil", "Carrito Flotante", "Checkout WhatsApp"],
      highlights: "Boutique de moda con catálogo autoadministrable semanal en Sanity CMS y checkout ultra veloz.",
      challenge: "Facilitar lanzamientos semanales de ropa femenina sin requerir intervención de soporte técnico o programación.",
      solution: "Panel visual intuitivo para carga de prendas por tallas y colores, carrito interactivo y confirmación de pedidos vía WhatsApp.",
      description: "Boutique de moda femenina con catálogo autoadministrable en Sanity CMS, carrito flotante interactivo, filtros por talla y color, y finalización de compra optimizada vía WhatsApp.",
      image: "/images/03-portafolio/framed/maia-store.webp",
      modalImage: "/images/03-portafolio/MaiaStore-desktop.png",
      modalMobileImage: "/images/03-portafolio/MaiaStore-mobile-real.png",
      link: "https://maia-store.vercel.app"
    },

    // --- 13. GUDSTOR PACK ---
    {
      title: "Gudstor Pack Embalajes",
      slug: "gudstor-pack",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "Empaques Industriales & Embalaje B2B",
      architectureLevel: "Nivel 2: Catálogo B2B Mayorista",
      techStack: ["Next.js 15", "Catálogo Cajas & Cintas", "Cotizador por Volumen", "WhatsApp Pedidos"],
      highlights: "Venta mayorista y minorista de cajas de cartón corrugado, film stretch, cintas de embalaje y bolsas industriales.",
      challenge: "Permitir a empresas de logística y e-commerce cotizar rápidamente grandes volúmenes de cajas y suministros de embalaje.",
      solution: "Catálogo estructurado por categorías de empaque con calculadora de medidas y solicitud de presupuesto por millar.",
      description: "E-commerce y catálogo corporativo de empaques industriales, cajas corrugadas, películas stretch y cintas de embalaje para logística y comercio electrónico.",
      image: "/images/03-portafolio/framed/gudstor-pack.webp",
      modalImage: "/images/03-portafolio/GudstorPack.webp",
      modalMobileImage: "/images/03-portafolio/GudstorPack.webp",
      link: "https://gudstorpack.com"
    },

    // --- 14. PERU TRAVEL ---
    {
      title: "Peru Travel Receptivo",
      slug: "peru-travel",
      location: "Lima / Cusco, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Turismo Receptivo Internacional",
      architectureLevel: "Nivel 2: Plataforma Multidestino",
      techStack: ["Next.js 15", "Tours Amazonía & Costa", "Reserva WhatsApp", "Tailwind CSS"],
      highlights: "Paquetes turísticos completos por costa, sierra y selva con tours culturales y homestays vivenciales.",
      challenge: "Ofrecer una visión completa de los circuitos turísticos del Perú con información clara de días, altura y vestimenta recomendada.",
      solution: "Plataforma de alta velocidad con itinerarios detallados de la selva y reservas directas atendidas por asesores turísticos.",
      description: "Agencia de viajes receptiva con circuitos turísticos completos en Cusco, Puno, Arequipa y la selva amazónica.",
      image: "/images/03-portafolio/framed/peru-travel.webp",
      modalImage: "/images/03-portafolio/PeruTravel.webp",
      modalMobileImage: "/images/03-portafolio/PeruTravel.webp",
      link: "https://perutravel.pe"
    },

    // --- 15. CAMISAS EN TALLAS GRANDES ---
    {
      title: "Camisas en Tallas Grandes (CTG)",
      slug: "camisas-tallas-grandes",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "Moda Masculina Plus Size",
      architectureLevel: "Nivel 2: E-Commerce Especializado",
      techStack: ["React / Vite", "Guía Interactiva de Tallas", "Carrito Flotante", "Checkout WhatsApp"],
      highlights: "Marca especializada en camisas formales y casuales desde talla XL hasta 6XL con horma anatómica.",
      challenge: "Resolver la desconfianza del cliente de tallas grandes al comprar ropa por internet sin poder medírsela previamente.",
      solution: "Guía interactiva de medidas (cuello, pecho, cintura) y asistencia directa por WhatsApp para confirmar la talla exacta.",
      description: "Tienda online de moda masculina de tallas grandes (XL a 6XL). Incluye catálogo con fotos en modelos reales, guía de medidas y compra por WhatsApp.",
      image: "/images/03-portafolio/framed/camisas-tallas-grandes.webp",
      modalImage: "/images/03-portafolio/UrbanStyle.webp",
      modalMobileImage: "/images/03-portafolio/UrbanStyle.webp",
      link: "https://camisasentallasgrandes.com"
    },

    // --- 16. NUEVA VIDA CENTRO MÉDICO ---
    {
      title: "Nueva Vida Centro Médico",
      slug: "nueva-vida-centro-medico",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "salud",
      industryLabel: "Salud Integral & Especialidades Médicas",
      architectureLevel: "Nivel 2: Portal Médico & Agendamiento",
      techStack: ["Next.js 15", "Agendador Citas Médicas", "Staff Médico Especialista", "WhatsApp Clínico"],
      highlights: "Centro de salud integral con más de 12 especialidades médicas liderado por el Dr. Ochoa.",
      challenge: "Optimizar el agendamiento de pacientes y reducir las inasistencias a consultas médicas especializadas.",
      solution: "Directorio interactivo de médicos y especialidades con reserva de citas en línea y recordatorio automático vía WhatsApp.",
      description: "Portal médico para centro de salud integral con catálogo de especialidades, perfiles médicos y sistema de agendamiento de citas presenciales y virtuales.",
      image: "/images/03-portafolio/framed/nueva-vida-centro-medico.webp",
      modalImage: "/images/03-portafolio/NuevaVida.webp",
      modalMobileImage: "/images/03-portafolio/NuevaVida.webp",
      link: "https://nuevavidamed.pe"
    },

    // --- 17. ACADEMIA EL PROFE ---
    {
      title: "Academia Online El Profe",
      slug: "academia-el-profe",
      location: "Lima / Nacional, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "educacion",
      industryLabel: "Educación Digital & Preuniversitaria",
      architectureLevel: "Nivel 2: Plataforma Educativa Online",
      techStack: ["Next.js 15", "Aulas Virtuales", "Catálogo Cursos Matemáticas & Ciencias", "WhatsApp Matrículas"],
      highlights: "Plataforma de cursos preuniversitarios y reforzamiento académico con matrícula instantánea.",
      challenge: "Captar postulantes y escolares que necesitan clases personalizadas de álgebra, física y química con docentes universitarios.",
      solution: "Horarios interactivos de clases en vivo, descarga de material educativo gratuito y canal directo de matrículas por WhatsApp.",
      description: "Plataforma web de educación preuniversitaria y reforzamiento escolar con catálogo de cursos, horarios de clases en vivo y matrícula online.",
      image: "/images/03-portafolio/framed/academia-el-profe.webp",
      modalImage: "/images/03-portafolio/AcademiaElProfe.webp",
      modalMobileImage: "/images/03-portafolio/AcademiaElProfe.webp",
      link: "https://academiaelprofe.com"
    },

    // --- 18. BREICORP ---
    {
      title: "Breicorp Soluciones Empresariales",
      slug: "breicorp",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "corporativo",
      industryLabel: "Consultoría Corporativa & Suministros",
      architectureLevel: "Nivel 2: Portal Corporativo B2B",
      techStack: ["React / Vite", "Portafolio Clientes B2B", "Licitaciones Privadas", "WhatsApp Corporativo"],
      highlights: "Consultoría integral en abastecimiento y proyectos corporativos para empresas líderes del Perú.",
      challenge: "Proyectar solidez ante gerentes de compras y comités de adquisiciones corporativas de grandes empresas.",
      solution: "Casos de éxito documentados con marcas reconocidas, acreditaciones de calidad y cotizaciones prioritarias.",
      description: "Sitio corporativo de consultoría empresarial, logística y servicios de suministros para el sector privado y corporativo.",
      image: "/images/03-portafolio/framed/breicorp.webp",
      modalImage: "/images/03-portafolio/Breicorp-hero.png",
      modalMobileImage: "/images/03-portafolio/Breicorp.webp",
      link: "https://breicorp.pe"
    },

    // --- 19. MANDICORP ---
    {
      title: "Mandi Corp",
      slug: "mandi-corp",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Finanzas & Préstamos Personales",
      architectureLevel: "Nivel 2: Calculadora Financiera Inteligente",
      techStack: ["React / Vite", "Simulador Cuotas Financieras", "Efecto Partículas", "WhatsApp Lead Engine"],
      highlights: "Simulador interactivo de préstamos con cálculo de intereses en tiempo real y carga en 0.5 segundos.",
      challenge: "Eliminar la fricción en la solicitud de créditos personales y precalificar clientes antes de la llamada comercial.",
      solution: "Calculadora interactiva de cuotas con diseño dorado premium y envío automático de la solicitud precalificada a asesores.",
      description: "Plataforma de préstamos en línea con calculadora inteligente de cuotas, doble menú de navegación, efecto de partículas de animación, integración con WhatsApp para solicitudes instantáneas y diseño premium dorado. Web optimizada para carga en 0.5 segundos con tecnología moderna, SEO avanzado y posicionamiento en Google.",
      image: "/images/03-portafolio/framed/mandi-corp.webp",
      modalImage: "/images/03-portafolio/MandiCorp-modal.webp",
      modalMobileImage: "/images/03-portafolio/MandiCorp-mobile.webp",
      link: "https://www.mandicorp.com/#inicio"
    },

    // --- 20. EDITORIAL HORIZONTE ---
    {
      title: "Editorial Horizonte",
      slug: "editorial-horizonte",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "Editorial & Cultura Peruana",
      architectureLevel: "Nivel 2: E-commerce de Catálogo Dinámico",
      techStack: ["Next.js 15", "Catálogo Dinámico", "Panel Admin", "Carrito Interactivo", "WhatsApp Checkout"],
      highlights: "Digitalización del fondo editorial de José María Arguedas con catálogo literario interactivo.",
      challenge: "Organizar y vender online más de 50 años de publicaciones literarias y académicas peruanas con navegación rápida.",
      solution: "Buscador predictivo por autores y títulos, carrito de compras integrado y procesamiento de pedidos con comprobante automático.",
      description: "Fondo editorial y tienda literaria oficial fundada en 1970 (con obras de José María Arguedas y ciencias sociales). Catálogo completo con buscador por autores y géneros, panel de control administrativo y pasarela de pedidos directos.",
      image: "/images/03-portafolio/framed/editorial-horizonte.webp",
      modalImage: "/images/03-portafolio/EditorialHorizonte-hero.png",
      modalMobileImage: "/images/03-portafolio/EditorialHorizonte-mobile.webp",
      link: "https://editorial-horizonte.vercel.app"
    },

    // --- 21. AMC SOLUCIONES PERÚ ---
    {
      title: "AMC Soluciones Perú",
      slug: "amc-soluciones-peru",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "corporativo",
      industryLabel: "Ingeniería Electromecánica & Minería",
      architectureLevel: "Nivel 2: Portal Industrial & Minero",
      techStack: ["Next.js 15", "Catálogo Servicios Electromecánicos", "Portafolio Obras Industriales", "Tailwind CSS"],
      highlights: "Empresa de ingeniería especializada en montajes electromecánicos, mantenimiento preventivo y servicios para minería.",
      challenge: "Presentar estándares de seguridad, homologaciones de contratistas y capacidad de planta ante gerencias de proyectos mineros.",
      solution: "Galería de proyectos ejecutados en gran minería, fichas de servicios mecánicos y canal directo con ingenieros residentes.",
      description: "Portal de ingeniería electromecánica, montajes industriales y mantenimiento especializado para plantas de producción y minería en Perú.",
      image: "/images/03-portafolio/framed/amc-soluciones-peru.webp",
      modalImage: "/images/03-portafolio/AMCSoluciones-hero.png",
      modalMobileImage: "/images/03-portafolio/AMCSoluciones.webp",
      link: "https://amcsoluciones.pe"
    },

    // --- 22. ITOOLS PERÚ ---
    {
      title: "iTools Perú Ferretería Industrial",
      slug: "itools-peru",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "E-commerce & Retail Tecnológico",
      architectureLevel: "Nivel 3: Enterprise con Integración Bsale ERP",
      techStack: ["Next.js 15", "Bsale ERP API", "Supabase PostgreSQL", "Sanity CMS", "Prisma ORM", "NextAuth"],
      highlights: "Sincronización en tiempo real de miles de herramientas y facturación electrónica SUNAT automática.",
      challenge: "Sincronizar stock, precios y facturación en tiempo real entre múltiples sucursales físicas y la tienda virtual sin desfases de inventario.",
      solution: "Integración bidireccional mediante Webhooks y API REST oficial de Bsale ERP con catálogo optimizado en Sanity CMS y base de datos PostgreSQL en Supabase.",
      description: "E-commerce industrial y tecnológico de alto rendimiento con sincronización bidireccional en tiempo real de inventario, stock y facturación electrónica mediante Bsale ERP API. Base de datos PostgreSQL en Supabase, panel administrativo con Sanity CMS y autenticación segura con NextAuth.",
      image: "/images/03-portafolio/framed/itools-peru.webp",
      modalImage: "/images/03-portafolio/iTools-modal.webp",
      modalMobileImage: "/images/03-portafolio/iTools-mobile.webp",
      link: "https://i-tools-steel.vercel.app"
    },

    // --- 23. IMPULSO FISCAL ---
    {
      title: "Impulso Fiscal",
      slug: "impulso-fiscal",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Consultoría Tributaria & Fiscal",
      architectureLevel: "Nivel 2: Portal Tributario & Contable",
      techStack: ["Next.js 15", "Blog Semana Fiscal", "Tailwind CSS", "WhatsApp Asesoría SUNAT"],
      highlights: "Portal tributario con boletín 'Semana Fiscal' y canal de defensa ante contingencias tributarias.",
      challenge: "Posicionar al equipo de especialistas como referente en actualización tributaria para medianas y grandes empresas.",
      solution: "Publicación periódica de análisis de resoluciones del Tribunal Fiscal y botón prioritario para auditorías preventivas.",
      description: "Firma especializada en consultoría tributaria, contabilidad estratégica y defensa ante fiscalizaciones de SUNAT. Sección de artículos periódicos y contacto directo con tributaristas.",
      image: "/images/03-portafolio/framed/impulso-fiscal.webp",
      modalImage: "/images/03-portafolio/ImpulsoFiscal.webp",
      modalMobileImage: "/images/03-portafolio/ImpulsoFiscal.webp",
      link: "https://impulsofiscal.com"
    },

    // --- 24. MEDINA ALMONTE FIRMA LEGAL ---
    {
      title: "Medina Almonte - Lawyers Firm",
      slug: "medina-almonte-firma-legal",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Legal & Corporativo",
      architectureLevel: "Nivel 2: Plataforma Corporativa con Headless CMS",
      techStack: ["Next.js 15", "Sanity CMS Headless", "Tailwind CSS", "Schema LegalService", "WhatsApp Cloud Direct"],
      highlights: "Firma legal de élite con blog jurídico en tiempo real y agendamiento de consultorías.",
      challenge: "Proyectar la más alta solvencia institucional para litigios penales y derecho corporativo con autogestión de publicaciones jurídicas.",
      solution: "Diseño corporativo premium en Next.js con preloader temático, blog jurídico autoadministrable en Sanity CMS y enrutamiento inteligente de consultas legales.",
      description: "Plataforma institucional de élite para firma legal especializada en derecho civil, penal y corporativo. Incluye preloader corporativo de alto impacto, blog jurídico dinámico administrable con Sanity CMS, sistema de agendamiento de consultorías legales y SEO jurídico geolocalizado.",
      image: "/images/03-portafolio/framed/medina-almonte-firma-legal.webp",
      modalImage: "/images/03-portafolio/MedinaAlmonte-desktop.webp",
      modalMobileImage: "/images/03-portafolio/MedinaAlmonte-mobile.webp",
      link: "https://medinaalmonte.com"
    },

    // --- 25. FEMAR LOGISTICS SAC ---
    {
      title: "Femar Logistics SAC",
      slug: "femar-logistics",
      location: "Callao, Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "logistica",
      industryLabel: "Logística & Fletes Internacionales",
      architectureLevel: "Nivel 2: Plataforma Logística & Cotizador",
      techStack: ["Next.js 15", "Cotizador Fletes Marítimos", "Tailwind CSS", "WhatsApp Logistics API", "Edge Network"],
      highlights: "Cotizador interactivo de fletes marítimos, aéreos y trámites de aduana en el puerto del Callao.",
      challenge: "Brindar a exportadores e importadores un mecanismo ágil para calcular metros cúbicos y solicitar tarifas de transporte marítimo.",
      solution: "Calculadora de cubicaje y contenedor integrada que envía los requerimientos técnicos directamente al equipo de aduanas.",
      description: "Portal corporativo para operador logístico integral de comercio exterior (transporte marítimo, aéreo y aduanas). Calculadora interactiva de cubicaje de carga y cotizaciones instantáneas vía WhatsApp.",
      image: "/images/03-portafolio/framed/femar-logistics.webp",
      modalImage: "/images/03-portafolio/FemarLogistics-modal.webp",
      modalMobileImage: "/images/03-portafolio/FemarLogistics-mobile.webp",
      link: "https://femar-logistics.vercel.app"
    },

    // --- 26. HOTEL PUNO TERRA ---
    {
      title: "Hotel Puno Terra",
      slug: "hotel-puno-terra",
      location: "Puno, Lago Titicaca, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Hotelería & Lago Titicaca",
      architectureLevel: "Nivel 2: Motor de Reservas Directas",
      techStack: ["Next.js 15", "Widget Reservas WhatsApp", "Galería Inmersiva WebP", "Schema Hotel", "Geolocalización"],
      highlights: "Motor de reservas directas a WhatsApp que ahorra el 18% de comisiones a plataformas intermediarias.",
      challenge: "Captar reservas internacionales directas para habitaciones y tours al Lago Titicaca sin pagar altas comisiones a OTAs como Booking y Expedia.",
      solution: "Widget de cotización y reserva de habitaciones por fechas con confirmación instantánea automatizada vía WhatsApp.",
      description: "Plataforma hotelera boutique con motor de reservas directas por WhatsApp que elimina el 18% de comisiones a OTAs (Booking/Expedia). Incluye selector de fechas, disponibilidad de suites, tours al Lago Titicaca, galería fotográfica inmersiva y geolocalización turística.",
      image: "/images/03-portafolio/framed/hotel-puno-terra.webp",
      modalImage: "/images/03-portafolio/HotelPunoTerra-modal.webp",
      modalMobileImage: "/images/03-portafolio/HotelPunoTerra-mobile.webp",
      link: "https://hotelpunoterra.com"
    },

    // --- 27. PERU TRAVEL EXPERTS ---
    {
      title: "Peru Travel Experts Lujo",
      slug: "peru-travel-experts",
      location: "Cusco / Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "hotel",
      industryLabel: "Turismo de Lujo & Experiencias VIP",
      architectureLevel: "Nivel 2: Plataforma Exclusiva Internacional",
      techStack: ["Next.js 15", "Tours Exclusivos Privados", "Galería Ultra HD", "Cotizador de Lujo"],
      highlights: "Paquetes turísticos de lujo con trenes exclusivos a Machu Picchu, hoteles 5 estrellas y guías privados.",
      challenge: "Transmitir la máxima sofisticación y personalización para viajeros de alto poder adquisitivo de USA, Canadá y Europa.",
      solution: "Experiencia visual envolvente con diseño editorial elegante, concierge 24/7 y cotizaciones de itinerarios a medida.",
      description: "Agencia boutique de turismo de lujo para el mercado receptivo de habla inglesa. Circuitos privados en trenes de lujo, hoteles cinco estrellas y expediciones exclusivas.",
      image: "/images/03-portafolio/framed/peru-travel-experts.webp",
      modalImage: "/images/03-portafolio/PeruTravelExperts.webp",
      modalMobileImage: "/images/03-portafolio/PeruTravelExperts.webp",
      link: "https://perutravelexperts.com"
    },

    // --- 28. CRÉDITOS YADIEL ---
    {
      title: "Créditos Yadiel",
      slug: "creditos-yadiel",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "finanzas",
      industryLabel: "Microcréditos & Préstamos Rápidos",
      architectureLevel: "Nivel 2: Sistema de Solicitudes Digitales",
      techStack: ["React / Vite", "Calculadora Microcréditos", "Evaluación Rápida", "WhatsApp Lead Engine"],
      highlights: "Acceso ágil a financiamiento para pequeños comerciantes y capital de trabajo en menos de 24 horas.",
      challenge: "Brindar una interfaz ágil para que comerciantes independientes puedan solicitar préstamos desde su celular sin trámites engorrosos.",
      solution: "Formulario de precalificación de 3 pasos que envía la solicitud directamente al analista de créditos por WhatsApp.",
      description: "Plataforma de créditos rápidos para emprendedores y capital de trabajo con simulador de cuotas diarias y semanales.",
      image: "/images/03-portafolio/framed/creditos-yadiel.webp",
      modalImage: "/images/03-portafolio/CreditosYadiel-prestamos.png",
      modalMobileImage: "/images/03-portafolio/CreditosYadiel.webp",
      link: "https://creditosyadiel.com"
    },

    // --- 29. ROMA & ABOGADOS ---
    {
      title: "ROMA & ABOGADOS",
      slug: "roma-abogados",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "legal",
      industryLabel: "Legal & Tributario SUNAT",
      architectureLevel: "Nivel 2: Web Corporativa de Alta Conversión",
      techStack: ["Next.js 15", "Edge Runtime", "Vercel Serverless", "Tailwind CSS", "WhatsApp Dynamic Routing"],
      highlights: "Estudio jurídico especializado en defensa ante SUNAT y derecho laboral con carga en 0.5s.",
      challenge: "Generar confianza instantánea en empresarios que enfrentan fiscalizaciones de SUNAT y canalizarlos a asesoría inmediata.",
      solution: "Estructura orientada a conversión comercial con calculadora de servicios tributarios y WhatsApp dinámico segmentado por especialidad.",
      description: "Estudio jurídico y tributario especializado en defensa estratégica ante SUNAT, derecho laboral y outsourcing contable corporativo. Optimizado para conversión con cotizaciones directas por WhatsApp, diseño institucional sobrio y arquitectura de carga en menos de 0.6 segundos.",
      image: "/images/03-portafolio/framed/roma-abogados.webp",
      modalImage: "/images/03-portafolio/RomaAbogados-modal.webp",
      modalMobileImage: "/images/03-portafolio/RomaAbogados-mobile.webp",
      link: "https://romaabogados.pe"
    },

    // --- 30. IMPORTACIONES USA - PERÚ (SISTEMA ENTERPRISE) ---
    {
      title: "Importaciones USA - Perú (eBay API)",
      slug: "importaciones-usa-peru",
      location: "USA / Lima, Perú",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "logistica",
      industryLabel: "SaaS & Comercio Exterior",
      architectureLevel: "Nivel 3: Sistema Enterprise con eBay REST API",
      techStack: ["Next.js 15", "eBay REST API", "Neon PostgreSQL", "Prisma ORM", "Cotizador Aranceles SUNAT", "NextAuth"],
      highlights: "Integración oficial con catálogo de eBay en vivo y cotización arancelaria automatizada.",
      challenge: "Automatizar el cálculo de fletes internacionales, aranceles aduaneros, seguro de carga y comisiones para compras en Estados Unidos.",
      solution: "Plataforma con conexión directa a la API de eBay que rastrea precios en tiempo real, calcula costos aduaneros con precisión y genera órdenes de importación automatizadas.",
      description: "Plataforma inteligente de importación de productos desde Estados Unidos con integración directa a la API oficial de eBay en tiempo real. Incluye cotizador automático de aranceles aduaneros e impuestos SUNAT, pasarela logística, gestión de pedidos y rastreo de envíos internacionales.",
      image: "/images/03-portafolio/framed/importaciones-usa-peru.webp",
      modalImage: "/images/03-portafolio/ImportacionesEbay-modal.webp",
      modalMobileImage: "/images/03-portafolio/ImportacionesEbay-mobile.webp",
      link: "https://importaciones-usa-peru.vercel.app"
    },

    // --- 31. E-COMMERCE BUILDER PRO ---
    {
      title: "E-commerce Builder Pro",
      slug: "ecommerce-builder-pro",
      location: "Remoto, Global",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "saas",
      industryLabel: "SaaS Multi-tenant E-commerce",
      architectureLevel: "Nivel 3: Arquitectura Multi-tenant SaaS",
      techStack: ["React / Vite", "Arquitectura Multi-tenant", "Panel Super Admin", "Paneles Independientes"],
      highlights: "Plataforma multi-inquilino para creación masiva de tiendas online con panel Super Admin centralizado.",
      challenge: "Crear una infraestructura que permita aprovisionar tiendas online independientes para múltiples comerciantes en minutos.",
      solution: "Arquitectura de software desacoplada con paneles administrativos aislados y métricas globales centralizadas.",
      description: "Plataforma Multi-tenant para la creación masiva de tiendas online. Permite a emprendedores lanzar su ecommerce en minutos con paneles de administración independientes y un Super Admin centralizado para el control total del ecosistema.",
      image: "/images/03-portafolio/framed/ecommerce-builder-pro.webp",
      modalImage: "/images/03-portafolio/EcommerceBuilder-modal.webp",
      modalMobileImage: "/images/03-portafolio/EcommerceBuilder-mobile.webp",
      link: "https://tienda-online-oficial.vercel.app/",
      demoLink: "https://tienda-online-oficial.vercel.app/demo"
    },

    // --- 32. ATLAS AI CONSULTOR ---
    {
      title: "Atlas Consultor IA",
      slug: "atlas",
      location: "Lima, Perú",
      category: "App Móvil",
      type: "app",
      industry: "saas",
      industryLabel: "IA & Consultoría Estratégica",
      architectureLevel: "Nivel 3: Agente Conversacional IA",
      techStack: ["React / Vite", "OpenAI / Cloudflare Workers", "PWA Móvil", "Chat Inteligente"],
      highlights: "Consultor de negocios con inteligencia artificial para formulación de estrategias y planes de acción.",
      challenge: "Democratizar el acceso a consultoría de negocios de alto nivel para pymes mediante algoritmos generativos.",
      solution: "Interfaz de chat conversacional optimizada para smartphones con generación de hojas de ruta empresariales.",
      description: "Consultor estratégico de negocios con IA. Asistente inteligente que analiza tu negocio, sugiere estrategias de crecimiento y crea planes de acción semanales personalizados mediante chat conversacional.",
      image: "/images/03-portafolio/framed/atlas.webp",
      modalImage: "/images/03-portafolio/AtlasDesktop.webp",
      modalMobileImage: "/images/03-portafolio/AtlasApp.webp",
      link: "https://atlas-9mv.pages.dev/"
    },

    // --- 33. COTIZADOR PRO SAAS ---
    {
      title: "Cotizador Pro SaaS",
      slug: "cotizador-pro",
      location: "Remoto, Global",
      category: "Proyecto Personalizado",
      type: "custom",
      industry: "saas",
      industryLabel: "SaaS B2B Multi-tenant",
      architectureLevel: "Nivel 3: SaaS con Google Auth & PWA",
      techStack: ["React / Vite", "Google OAuth", "PWA Instalable", "Generador de PDFs Cotizaciones"],
      highlights: "SaaS B2B para generación masiva de presupuestos comerciales con Google Auth y exportación PDF.",
      challenge: "Acelerar la emisión de propuestas comerciales para agencias y contratistas con seguimiento de conversión.",
      solution: "Plataforma con plantillas dinámicas, sistema de créditos y generación automática de documentos PDF para clientes.",
      description: "SaaS multi-tenant con panel Super Admin, Google Auth, PWA instalable, sistema de créditos y automatización de plantillas de cotización.",
      image: "/images/03-portafolio/framed/cotizador-pro.webp",
      modalImage: "/images/03-portafolio/CotizadorPro-modal.webp",
      modalMobileImage: "/images/03-portafolio/CotizadorPro-mobile.webp",
      link: "https://cotizador-pro.pages.dev/"
    },

    // --- 34. LA CASONA GOURMET ---
    {
      title: "La Casona Gourmet",
      slug: "la-casona-gourmet",
      location: "Lima, Perú",
      category: "Web Profesional",
      type: "web",
      industry: "gastronomia",
      industryLabel: "Gastronomía & Restaurante",
      architectureLevel: "Nivel 2: Menú Interactivo & Pedidos",
      techStack: ["React / Vite", "Menú Visual QR", "WhatsApp Pedidos Online", "Vercel Edge"],
      highlights: "Menú visual digital y sistema de pedidos por WhatsApp con incremento del 95% en delivery.",
      challenge: "Digitalizar la carta de restaurante para comensales en salón y pedidos a domicilio sin pagar comisiones a apps de delivery.",
      solution: "Menú interactivo con fotos de alta resolución, cálculo de totales y envío directo de la comanda a la cocina por WhatsApp.",
      description: "Sistema de reservas y pedidos directos por WhatsApp con menú visual optimizado para aumentar ventas.",
      image: "/images/03-portafolio/framed/la-casona-gourmet.webp",
      modalImage: "/images/03-portafolio/LaCasonaGourmet-modal.webp",
      modalMobileImage: "/images/03-portafolio/LaCasonaGourmet-mobile.webp",
      link: "https://la-casa-gourmet.vercel.app/"
    },

    // --- 35. URBAN STYLE ---
    {
      title: "Urban Style",
      slug: "urban-style",
      location: "Lima, Perú",
      category: "Tienda Online",
      type: "tienda",
      industry: "ecommerce",
      industryLabel: "Moda Urbana & Streetwear",
      architectureLevel: "Nivel 2: Tienda Online con Panel Clientes",
      techStack: ["React / Vite", "PWA Notificaciones Push", "Carrito & Favoritos", "Panel Admin"],
      highlights: "Tienda online PWA con gestión de favoritos, inventario en tiempo real y pasarela de pago.",
      challenge: "Brindar a los clientes de moda urbana una experiencia de compra móvil idéntica a una aplicación nativa de iOS/Android.",
      solution: "PWA instalable con notificaciones push para ofertas flash y carrito interactivo con sincronización local.",
      description: "Tienda online completa con carrito de compras, sistema de favoritos, panel de administrador y panel de clientes. Aplicación móvil con notificaciones push, gestión de inventario en tiempo real y pasarela de pagos integrada.",
      image: "/images/03-portafolio/framed/urban-style.webp",
      modalImage: "/images/03-portafolio/UrbanStyle.webp",
      modalMobileImage: "/images/03-portafolio/UrbanStyle.webp",
      link: "https://tienda-online-oficial.vercel.app/demo"
    }
  ],

  en: [] // Populated below dynamically to ensure 100% parity
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
