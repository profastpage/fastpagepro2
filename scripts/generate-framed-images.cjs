const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/images/03-portafolio/framed');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const projects = [
  { slug: 'vuelo-78-hotel', domain: 'vuelo78hotel.com', src: 'public/images/03-portafolio/vuelo78hotel-modal.webp', accent: '#eab308', isUI: true },
  { slug: 'cmc-latam', domain: 'cmc-latam-2.vercel.app', src: 'public/images/03-portafolio/CMCLATAM.webp', accent: '#38bdf8', isUI: true },
  { slug: 'moda-digital-pro', domain: 'modadigitalpro.com', src: 'public/images/03-portafolio/ModaDigitalPro.webp', accent: '#f97316', isUI: true },
  { slug: 'semaltemed', domain: 'semaltemed.com', src: 'public/images/03-portafolio/Semaltemed.webp', accent: '#10b981', isUI: false },
  { slug: 'gincana-club-campestre', domain: 'gincanaclubcampestre.com', src: 'public/images/03-portafolio/GincanaClub.webp', accent: '#22c55e', isUI: true },
  { slug: 'jhon-asociados', domain: 'jhonasociados.com', src: 'public/images/03-portafolio/JhonAsociados.webp', accent: '#eab308', isUI: false },
  { slug: 'union-el-progreso', domain: 'unionelprogreso.pe', src: 'public/images/03-portafolio/UnionProgreso-hero.webp', accent: '#3b82f6', isUI: true },
  { slug: 'intiquilla-adventures', domain: 'intiquilla-adventures.vercel.app', src: 'public/images/03-portafolio/IntiquillaAdventures.webp', accent: '#f59e0b', isUI: true },
  { slug: 'el-hombre-hotel', domain: 'elhombrehotel.com', src: 'public/images/03-portafolio/ElHombreHotel.webp', accent: '#06b6d4', isUI: true },
  { slug: 'rainforest-wild', domain: 'rainforestwild.com', src: 'public/images/03-portafolio/RainforestWild.webp', accent: '#10b981', isUI: false },
  { slug: 'sertrade', domain: 'sertrade.com', src: 'public/images/03-portafolio/Sertrade.webp', accent: '#6366f1', isUI: true },
  { slug: 'maia-store', domain: 'maia-store.vercel.app', src: 'public/images/03-portafolio/MaiaStore-desktop.png', accent: '#ec4899', isUI: true },
  { slug: 'gudstor-pack', domain: 'gudstorpack.com', src: 'public/images/03-portafolio/GudstorPack.webp', accent: '#d97706', isUI: true },
  { slug: 'peru-travel', domain: 'perutravel.pe', src: 'public/images/03-portafolio/PeruTravel.webp', accent: '#ef4444', isUI: true },
  { slug: 'camisas-tallas-grandes', domain: 'camisasentallasgrandes.com', src: 'public/images/03-portafolio/UrbanStyle.webp', accent: '#8b5cf6', isUI: false },
  { slug: 'nueva-vida-centro-medico', domain: 'nuevavidamedical.pe', src: 'public/images/03-portafolio/NuevaVida.webp', accent: '#14b8a6', isUI: false },
  { slug: 'academia-el-profe', domain: 'academiaelprofe.com', src: 'public/images/03-portafolio/AcademiaElProfe.webp', accent: '#3b82f6', isUI: true },
  { slug: 'breicorp', domain: 'breicorp.com', src: 'public/images/03-portafolio/Breicorp-hero.png', accent: '#f59e0b', isUI: true },
  { slug: 'mandi-corp', domain: 'mandicorp.pe', src: 'public/images/03-portafolio/MandiCorp-modal.webp', accent: '#0ea5e9', isUI: true },
  { slug: 'editorial-horizonte', domain: 'editorialhorizonte.com', src: 'public/images/03-portafolio/EditorialHorizonte-hero.png', accent: '#eab308', isUI: true },
  { slug: 'amc-soluciones-peru', domain: 'amcsoluciones.pe', src: 'public/images/03-portafolio/AMCSoluciones-hero.png', accent: '#2563eb', isUI: true },
  { slug: 'itools-peru', domain: 'itoolsperu.com', src: 'public/images/03-portafolio/iTools-modal.webp', accent: '#eab308', isUI: true },
  { slug: 'impulso-fiscal', domain: 'impulsofiscal.pe', src: 'public/images/03-portafolio/ImpulsoFiscal.webp', accent: '#3b82f6', isUI: false },
  { slug: 'medina-almonte-firma-legal', domain: 'medinaalmonte.com', src: 'public/images/03-portafolio/MedinaAlmonte-desktop.webp', accent: '#d97706', isUI: true },
  { slug: 'femar-logistics', domain: 'femarlogistics.com', src: 'public/images/03-portafolio/FemarLogistics.webp', accent: '#06b6d4', isUI: true },
  { slug: 'hotel-puno-terra', domain: 'hotelpunoterra.com', src: 'public/images/03-portafolio/HotelPunoTerra-modal.webp', accent: '#f59e0b', isUI: true },
  { slug: 'peru-travel-experts', domain: 'perutravelexperts.com', src: 'public/images/03-portafolio/PeruTravelExperts.webp', accent: '#10b981', isUI: true },
  { slug: 'creditos-yadiel', domain: 'creditosyadiel.pe', src: 'public/images/03-portafolio/CreditosYadiel-prestamos.png', accent: '#2563eb', isUI: true },
  { slug: 'roma-abogados', domain: 'romaabogados.com.pe', src: 'public/images/03-portafolio/RomaAbogados-real.webp', accent: '#eab308', isUI: true },
  { slug: 'importaciones-usa-peru', domain: 'importacionesusaperu.com', src: 'public/images/03-portafolio/ImportacionesEbay.webp', accent: '#3b82f6', isUI: true },
  { slug: 'ecommerce-builder-pro', domain: 'builder.fastpagepro.com', src: 'public/images/03-portafolio/EcommerceBuilder.webp', accent: '#8b5cf6', isUI: true },
  { slug: 'atlas', domain: 'atlas.fastpagepro.com', src: 'public/images/03-portafolio/AtlasHero.webp', accent: '#a855f7', isUI: true },
  { slug: 'cotizador-pro', domain: 'cotizador.fastpagepro.com', src: 'public/images/03-portafolio/CotizadorPro.webp', accent: '#eab308', isUI: true },
  { slug: 'la-casona-gourmet', domain: 'lacasonagourmet.pe', src: 'public/images/03-portafolio/LaCasonaGourmet.webp', accent: '#f97316', isUI: true },
  { slug: 'urban-style', domain: 'urbanstyle.pe', src: 'public/images/03-portafolio/UrbanStyle.webp', accent: '#ec4899', isUI: false }
];

const CANVAS_W = 1200;
const CANVAS_H = 750;

async function processProject(p) {
  const srcPath = path.join(__dirname, '..', p.src);
  const outPath = path.join(outputDir, `${p.slug}.webp`);

  if (!fs.existsSync(srcPath)) {
    console.warn(`Source not found: ${srcPath}`);
    return;
  }

  const meta = await sharp(srcPath).metadata();
  const isLandscape = meta.width / meta.height >= 1.2;

  if (p.isUI && isLandscape) {
    // ---- BROWSER MOCKUP FRAMING ----
    const winW = 1120;
    const winH = 680;
    const barH = 44;
    const viewW = winW;
    const viewH = winH - barH;
    const winX = (CANVAS_W - winW) / 2; // 40
    const winY = (CANVAS_H - winH) / 2; // 35

    // Resize viewport image with top priority
    const viewBuf = await sharp(srcPath)
      .resize(viewW, viewH, {
        fit: 'cover',
        position: 'top'
      })
      .toBuffer();

    // Create SVG browser frame container
    const browserFrameSvg = `
    <svg width="${CANVAS_W}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="#0c0d14" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#07080b" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#242632"/>
          <stop offset="100%" stop-color="#181922"/>
        </linearGradient>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.75"/>
        </filter>
        <clipPath id="screenClip">
          <rect x="${winX}" y="${winY + barH}" width="${viewW}" height="${viewH}" rx="0" ry="0"/>
        </clipPath>
      </defs>

      <!-- Background Canvas -->
      <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#bgGlow)"/>

      <!-- Window Card Shadow & Body -->
      <g filter="url(#shadow)">
        <!-- Window Outer Border/Backdrop -->
        <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" rx="14" ry="14" fill="#12131a" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
      </g>

      <!-- Browser Header Bar -->
      <path d="M ${winX} ${winY + 14} A 14 14 0 0 1 ${winX + 14} ${winY} L ${winX + winW - 14} ${winY} A 14 14 0 0 1 ${winX + winW} ${winY + 14} L ${winX + winW} ${winY + barH} L ${winX} ${winY + barH} Z" fill="url(#barGrad)"/>
      <line x1="${winX}" y1="${winY + barH}" x2="${winX + winW}" y2="${winY + barH}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Traffic Light Window Controls -->
      <circle cx="${winX + 24}" cy="${winY + 22}" r="5.5" fill="#ff5f56"/>
      <circle cx="${winX + 42}" cy="${winY + 22}" r="5.5" fill="#ffbd2e"/>
      <circle cx="${winX + 60}" cy="${winY + 22}" r="5.5" fill="#27c93f"/>

      <!-- URL Address Pill -->
      <rect x="${winX + (winW - 360)/2}" y="${winY + 10}" width="360" height="24" rx="12" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <!-- Lock Icon -->
      <circle cx="${winX + (winW - 360)/2 + 20}" cy="${winY + 22}" r="3.5" fill="${p.accent}" opacity="0.9"/>
      <text x="${winX + (winW - 360)/2 + 34}" y="${winY + 26}" fill="#cbd5e1" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="500">${p.domain}</text>

      <!-- Fast Page Pro Verified Badge (Right) -->
      <rect x="${winX + winW - 170}" y="${winY + 11}" width="150" height="22" rx="11" fill="rgba(255,215,0,0.12)" stroke="rgba(255,215,0,0.3)" stroke-width="1"/>
      <text x="${winX + winW - 95}" y="${winY + 25}" text-anchor="middle" fill="#fde047" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9.5" font-weight="700" letter-spacing="0.5">FAST PAGE PRO ⚡</text>
    </svg>
    `;

    // Composite background + image inside browser viewport
    await sharp(Buffer.from(browserFrameSvg))
      .composite([
        {
          input: viewBuf,
          top: winY + barH,
          left: winX
        }
      ])
      .webp({ quality: 90, effort: 4 })
      .toFile(outPath);

  } else {
    // ---- LUXURY GLASS BRAND / LOGO / VERTICAL FRAMING ----
    const innerW = 860;
    const innerH = 520;
    const innerX = (CANVAS_W - innerW) / 2;
    const innerY = (CANVAS_H - innerH) / 2;

    // Contain the logo / vertical asset cleanly with breathing space
    const assetBuf = await sharp(srcPath)
      .resize(innerW - 80, innerH - 80, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    const assetMeta = await sharp(assetBuf).metadata();
    const assetX = Math.round(innerX + (innerW - assetMeta.width) / 2);
    const assetY = Math.round(innerY + (innerH - assetMeta.height) / 2);

    const logoFrameSvg = `
    <svg width="${CANVAS_W}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="stageGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.25"/>
          <stop offset="50%" stop-color="#11131c" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#07080b" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.01)"/>
        </linearGradient>
        <filter id="shadowBox" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#000000" flood-opacity="0.8"/>
        </filter>
      </defs>

      <!-- Background Canvas -->
      <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#stageGlow)"/>

      <!-- Ambient Light Spot Behind Content -->
      <circle cx="600" cy="375" r="280" fill="${p.accent}" opacity="0.12" filter="blur(60px)"/>

      <!-- Central Stage Glass Card -->
      <g filter="url(#shadowBox)">
        <rect x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" rx="20" ry="20" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      </g>

      <!-- Top Center Domain Badge -->
      <rect x="450" y="${innerY + 20}" width="300" height="28" rx="14" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="468" cy="${innerY + 34}" r="4" fill="${p.accent}"/>
      <text x="600" y="${innerY + 39}" text-anchor="middle" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="0.5">${p.domain}</text>

      <!-- Bottom Verified Pill -->
      <rect x="490" y="${innerY + innerH - 42}" width="220" height="24" rx="12" fill="rgba(255,215,0,0.12)" stroke="rgba(255,215,0,0.25)" stroke-width="1"/>
      <text x="600" y="${innerY + innerH - 26}" text-anchor="middle" fill="#fde047" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="10" font-weight="700" letter-spacing="1">FAST PAGE PRO • PRODUCCIÓN</text>
    </svg>
    `;

    await sharp(Buffer.from(logoFrameSvg))
      .composite([
        {
          input: assetBuf,
          top: assetY,
          left: assetX
        }
      ])
      .webp({ quality: 90, effort: 4 })
      .toFile(outPath);
  }

  console.log(`Framed: [${p.slug}] -> ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
}

async function run() {
  console.log(`Starting framing for ${projects.length} projects...`);
  for (const p of projects) {
    try {
      await processProject(p);
    } catch (e) {
      console.error(`Error processing ${p.slug}:`, e.message);
    }
  }
  console.log('All 35 projects framed successfully!');
}

run();
