const fs = require('fs');
const path = require('path');

// Read portfolioData.js to extract all projects
const portfolioDataPath = path.join(__dirname, '..', 'src', 'data', 'portfolioData.js');
const rawContent = fs.readFileSync(portfolioDataPath, 'utf8');

// Parse portfolio projects from portfolioData.js using regex
const projects = [];
const projectBlocks = rawContent.split(/\{\s*title:\s*"/g).slice(1);

for (const block of projectBlocks) {
  const getField = (field) => {
    const match = block.match(new RegExp(`${field}:\\s*"([^"]+)"`));
    return match ? match[1] : '';
  };

  const getArrayField = (field) => {
    const match = block.match(new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`));
    if (!match) return [];
    return match[1].split(',').map(s => s.replace(/["'\s]/g, '')).filter(Boolean);
  };

  const titleMatch = block.match(/^([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  const slug = getField('slug');
  const location = getField('location');
  const category = getField('category');
  const type = getField('type');
  const industry = getField('industry');
  const industryLabel = getField('industryLabel');
  const architectureLevel = getField('architectureLevel');
  const techStack = getArrayField('techStack');
  const highlights = getField('highlights');
  const challenge = getField('challenge');
  const solution = getField('solution');
  const description = getField('description');
  const image = getField('image');
  const link = getField('link');

  if (title && slug) {
    projects.push({
      title,
      slug,
      location,
      category,
      type,
      industry,
      industryLabel,
      architectureLevel,
      techStack,
      highlights,
      challenge,
      solution,
      description,
      image,
      link
    });
  }
}

console.log(`Parsed ${projects.length} projects.`);

// Determine complexity tier and logistics pricing
const catalog = projects.map((p, index) => {
  let tier = 'Nivel 2';
  let tierName = 'Web Corporativa / E-Commerce WhatsApp / Sanity CMS';
  let pricePeru = { min: 1890, max: 3490, currency: 'PEN', formatted: 'S/. 1,890 - S/. 3,490' };
  let priceUSA = { min: 990, max: 1850, currency: 'USD', formatted: '$990 - $1,850 USD' };
  let devTimeDays = '5 - 8 días hábiles';

  const arch = (p.architectureLevel || '').toLowerCase();
  const titleLower = p.title.toLowerCase();

  if (
    arch.includes('nivel 3') ||
    arch.includes('saas') ||
    arch.includes('erp') ||
    arch.includes('ebay') ||
    arch.includes('financier') ||
    titleLower.includes('itools') ||
    titleLower.includes('ebay') ||
    titleLower.includes('yadiel') ||
    titleLower.includes('femar') ||
    titleLower.includes('cotizador') ||
    titleLower.includes('builder') ||
    titleLower.includes('progreso')
  ) {
    tier = 'Nivel 3';
    tierName = 'SaaS / Plataforma a Medida / ERP / API Integrations';
    pricePeru = { min: 4500, max: 9800, currency: 'PEN', formatted: 'S/. 4,500 - S/. 9,800+' };
    priceUSA = { min: 2500, max: 6500, currency: 'USD', formatted: '$2,500 - $6,500+ USD' };
    devTimeDays = '10 - 20 días hábiles';
  } else if (
    arch.includes('nivel 1') ||
    arch.includes('landing') ||
    titleLower.includes('impulso') ||
    titleLower.includes('jhon') ||
    titleLower.includes('semalte') ||
    titleLower.includes('gudstor') ||
    titleLower.includes('camisas') ||
    titleLower.includes('atlas')
  ) {
    tier = 'Nivel 1';
    tierName = 'Landing Page / Conversión Directa Ultra Rápida';
    pricePeru = { min: 890, max: 1490, currency: 'PEN', formatted: 'S/. 890 - S/. 1,490' };
    priceUSA = { min: 490, max: 850, currency: 'USD', formatted: '$490 - $850 USD' };
    devTimeDays = '3 - 5 días hábiles';
  }

  const catalogImage = `${p.slug}.webp`;
  const caseStudyUrl = `https://fastpagepro.com/portafolio/${p.slug}`;

  // WhatsApp copy tailored for conversion
  const whatsappCopy = `🌟 *${p.title.toUpperCase()}* | Solución Web de Alto Rendimiento

📌 *Rubro:* ${p.industryLabel || p.category}
⚡ *Velocidad:* Sub-segundo (< 0.8s) en móviles y PC
🛠️ *Stack Tecnológico:* ${p.techStack.length ? p.techStack.join(' • ') : 'React 19 / Vite / Tailwind CSS'}

💡 *Lo que resuelve para el negocio:*
${p.description}

🎯 *Resultado Clave:*
${p.highlights || 'Diseño de máxima conversión optimizado para captación de clientes.'}

🔗 *Ver Caso de Estudio Completo:*
${caseStudyUrl}

💬 *¿Deseas implementar una arquitectura similar para tu empresa?*
Agenda una videollamada de 15 minutos en Google Meet para evaluar tu proyecto sin compromiso.`;

  return {
    id: index + 1,
    title: p.title,
    slug: p.slug,
    category: p.category,
    industry: p.industry,
    industryLabel: p.industryLabel,
    tier,
    tierName,
    pricingLogistics: {
      peru: pricePeru,
      usa: priceUSA,
      nota: 'Precio de referencia logística interna para reutilización de template base. No exponer como precio fijo al cliente final.'
    },
    developmentTime: devTimeDays,
    techStack: p.techStack,
    highlights: p.highlights,
    description: p.description,
    caseStudyUrl,
    imageFileName: catalogImage,
    imagePath: `PORTAFOLIO_CATALOGO_WHATSAPP/FOTOS_CATALOGO_16x10_WEBP/${catalogImage}`,
    liveUrl: p.link,
    whatsappCatalogCopy: whatsappCopy
  };
});

// Output JSON file
const outputJsonPath = path.join(__dirname, '..', 'PORTAFOLIO_CATALOGO_WHATSAPP', 'CATALOGO_LOGISTICA_PRECIOS.json');
fs.writeFileSync(outputJsonPath, JSON.stringify({
  version: '2026.1',
  empresa: 'Fast Page Pro',
  totalProyectos: catalog.length,
  normasComerciales: {
    politicaPrecios: 'Los precios son personalizados según alcance, integraciones y país del cliente.',
    peru: 'Cotizaciones en Soles (PEN) con medios locales (Yape, Plin, Niubiz) y Facturación SUNAT.',
    usa: 'Cotizaciones en USD con arquitectura bilingüe (EN/ES), SEO local Google Maps, Stripe, Zelle y factura W-9.',
    procedimientoRecomendado: 'Agendar una reunión de 15 min en Google Meet para diagnóstico técnico y entrega de propuesta formal con hitos (50% inicio / 50% entrega).'
  },
  proyectos: catalog
}, null, 2), 'utf8');

console.log(`Saved JSON catalog to: ${outputJsonPath}`);

// Output Markdown Guide
let mdContent = `# FAST PAGE PRO — CATÁLOGO LOGÍSTICO Y MATRIZ DE PRECIOS INTERNOS (2026)

> **CONFIDENCIAL & USO INTERNO EXCLUSIVO**  
> Este documento contiene la matriz logística de costos y reutilización de plantillas base para los 35 proyectos desarrollados por **Fast Page Pro**.  
> **REGLA DE ORO:** Nunca cotizar con precios cerrados rígidos al cliente. Siempre se debe especificar que la propuesta es a medida según país y alcance, agendando una sesión de **15 minutos en Google Meet** para propuesta formal.

---

## 🌎 POLÍTICA DE PRECIOS POR PAÍS & PROCEDIMIENTO COMERCIAL

1. **Clientes en Perú (PEN):**
   - Rango base adaptado a la economía local.
   - Medios de pago: Yape, Plin, Transferencia BCP/BBVA, Niubiz, MercadoPago.
   - Facturación electrónica SUNAT (RUC 20 / RUC 10 con crédito fiscal).
2. **Clientes en Estados Unidos (Habla Hispana y Bilingüe - USD):**
   - Rango base en dólares adaptado al ticket del mercado norteamericano.
   - Incluye arquitectura bilingüe (Inglés / Español) y optimización de SEO Local para Google Maps en su ciudad o estado.
   - Medios de pago: Zelle, Stripe, Wire Transfer, con invoices comerciales deducibles de impuestos (W-9).
3. **Estructura de Cobro:**
   - **50% al iniciar el proyecto** y **50% contra entrega final** tras aprobación total en servidor de prueba.
   - Cero mensualidades ocultas ni comisiones sobre ventas.

---

## 📊 NIVELES DE COMPLEJIDAD Y VALORACIÓN LOGÍSTICA DE REUTILIZACIÓN

| Nivel | Tipo de Proyecto | Perú (PEN) | USA / Global (USD) | Tiempo Entrega |
|---|---|---|---|---|
| **Nivel 1** | **Landing Page / Conversión Ultra Rápida** (1-Page) | S/. 890 - S/. 1,490 | $490 - $850 USD | 3 a 5 días |
| **Nivel 2** | **Web Corporativa / Motor Reservas / E-Commerce WhatsApp / Headless CMS** | S/. 1,890 - S/. 3,490 | $990 - $1,850 USD | 5 a 8 días |
| **Nivel 3** | **SaaS / Plataforma a Medida / ERP Bsale / eBay API / Scoring Financiero** | S/. 4,500 - S/. 9,800+ | $2,500 - $6,500+ USD | 10 a 20 días |

---

## 📁 RECURSOS MULTIMEDIA PARA WHATSAPP BUSINESS

Las 35 imágenes oficiales en relación 16:10 en alta definición optimizadas para WhatsApp Business están ubicadas en:
\`PORTAFOLIO_CATALOGO_WHATSAPP/FOTOS_CATALOGO_16x10_WEBP/\`

Cada imagen coincide exactamente con el slug del proyecto: \`[slug].webp\`.

---

## 📱 ÍNDICE DE LOS 35 PROYECTOS PARA CATÁLOGO DE WHATSAPP BUSINESS

`;

catalog.forEach((item, i) => {
  mdContent += `### ${i + 1}. ${item.title}
- **Slug / URL:** [${item.caseStudyUrl}](${item.caseStudyUrl})
- **Rubro:** ${item.industryLabel || item.category} (${item.location || 'Perú'})
- **Complejidad:** ${item.tier} — ${item.tierName}
- **Valor Logístico Base (Perú):** \`${item.pricingLogistics.peru.formatted}\`
- **Valor Logístico Base (USA):** \`${item.pricingLogistics.usa.formatted}\`
- **Tiempo de Implementación Base:** ${item.developmentTime}
- **Archivo de Imagen para WhatsApp:** \`${item.imageFileName}\` (\`PORTAFOLIO_CATALOGO_WHATSAPP/FOTOS_CATALOGO_16x10_WEBP/${item.imageFileName}\`)
- **Demo Oficial en Vivo:** ${item.liveUrl}

#### 💬 Texto listo para WhatsApp Business:
\`\`\`text
${item.whatsappCatalogCopy}
\`\`\`

---

`;
});

const outputMdPath = path.join(__dirname, '..', 'PORTAFOLIO_CATALOGO_WHATSAPP', 'CATALOGO_LOGISTICA_PRECIOS.md');
fs.writeFileSync(outputMdPath, mdContent, 'utf8');

console.log(`Saved Markdown catalog to: ${outputMdPath}`);
