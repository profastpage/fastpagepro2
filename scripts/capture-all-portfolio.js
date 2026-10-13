import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/images/03-portafolio/real');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// All 29 active projects directly mapped from src/data/portfolioData.js
const PROJECTS = [
  { slug: "vuelo-78-hotel", title: "Vuelo 78 Hotel Tarapoto", link: "https://www.vuelo78hotel.com" },
  { slug: "cmc-latam", title: "CMC LATAM Arquitectura", link: "https://www.cmclatam.pe/" },
  { slug: "moda-digital-pro", title: "Moda Digital Pro", link: "https://www.modadigitalpro.com/" },
  { slug: "gincana-club-campestre", title: "Gincana Club Campestre", link: "https://www.gincanasclubescampestres.com/" },
  { slug: "jhon-asociados", title: "Jhon & Asociados Estudio Contable", link: "https://www.jhonasociados.com/" },
  { slug: "union-el-progreso", title: "Grupo El Progreso / Créditos El Progreso", link: "https://www.unionelprogreso.com/" },
  { slug: "intiquilla-adventures", title: "Intiquilla Adventures Cusco", link: "https://www.intiquilladventures.com/" },
  { slug: "sertrade", title: "Sertrade Proyectos Industriales", link: "https://www.sertradeproyectos.com/" },
  { slug: "maia-store", title: "Maia Store", link: "https://maia-store.vercel.app/" },
  { slug: "camisas-tallas-grandes", title: "Camisas en Tallas Grandes (CTG)", link: "https://camisasentallasgrandes.vercel.app/#inicio" },
  { slug: "nueva-vida-centro-medico", title: "Nueva Vida Centro Médico", link: "https://nueva-vida-consultorio.vercel.app/#inicio" },
  { slug: "academia-el-profe", title: "Academia Online El Profe", link: "https://www.academiaelprofeoficial.com/" },
  { slug: "breicorp", title: "Breicorp Soluciones Empresariales", link: "https://breicorp.com.pe/" },
  { slug: "mandi-corp", title: "Mandi Corp", link: "https://www.mandicorp.com/#inicio" },
  { slug: "editorial-horizonte", title: "Editorial Horizonte", link: "https://editorial-horizonte-five.vercel.app/" },
  { slug: "amc-soluciones-peru", title: "AMC Soluciones Perú", link: "https://www.amcsolucionesperu.com/" },
  { slug: "itools-peru", title: "iTools Perú Ferretería Industrial", link: "https://i-tools-steel.vercel.app/" },
  { slug: "medina-almonte-firma-legal", title: "Medina Almonte - Lawyers Firm", link: "https://www.medinaalmontelawyers.com/" },
  { slug: "femar-logistics", title: "Femar Logistics SAC", link: "https://femar-logistics.vercel.app" },
  { slug: "hotel-puno-terra", title: "Hotel Puno Terra", link: "https://www.punoterra.com/" },
  { slug: "peru-travel-experts", title: "Peru Travel Experts Lujo", link: "https://www.perutravelexpertsb.com/" },
  { slug: "creditos-yadiel", title: "Créditos Yadiel", link: "https://creditosyadiel.vercel.app/#inicio" },
  { slug: "roma-abogados", title: "ROMA & ABOGADOS", link: "https://romaabogados.pe" },
  { slug: "importaciones-usa-peru", title: "Importaciones USA - Perú (eBay API)", link: "https://importaciones-pro-business.vercel.app/login" },
  { slug: "ecommerce-builder-pro", title: "E-commerce Builder Pro", link: "https://tienda-online-oficial.vercel.app/" },
  { slug: "atlas", title: "Atlas Consultor IA", link: "https://atlas-9mv.pages.dev/" },
  { slug: "cotizador-pro", title: "Cotizador Pro SaaS", link: "https://cotizador-pro.pages.dev/" },
  { slug: "la-casona-gourmet", title: "La Casona Gourmet", link: "https://la-casa-gourmet.vercel.app/" },
  { slug: "urban-style", title: "Urban Style Streetwear", link: "https://tienda-online-oficial.vercel.app/demo" }
];

async function run() {
  console.log(`Starting real portfolio capture for all ${PROJECTS.length} projects...`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors'
    ]
  });

  const results = [];

  for (let i = 0; i < PROJECTS.length; i++) {
    const { slug, title, link } = PROJECTS[i];
    console.log(`[${i + 1}/${PROJECTS.length}] Processing: ${title} (${slug})`);
    console.log(`     URL: ${link}`);

    let desktopOk = false;
    let mobileOk = false;

    // 1. DESKTOP CAPTURE (1440x900 @2x, 16:10 Ratio)
    try {
      const desktopContext = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        isMobile: false,
        ignoreHTTPSErrors: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      });
      const page = await desktopContext.newPage();
      try {
        await page.goto(link, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
      }
      await page.waitForTimeout(2000);

      const png = await page.screenshot({
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      await desktopContext.close();

      const outPath = path.join(OUTPUT_DIR, `${slug}-desktop.webp`);
      await sharp(png)
        .webp({ quality: 86, effort: 4 })
        .toFile(outPath);
      const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
      console.log(`     ✓ Desktop saved: ${slug}-desktop.webp (${sizeKb} KB)`);
      desktopOk = true;
    } catch (err) {
      console.error(`     ✗ Desktop error for ${slug}:`, err.message);
    }

    // 2. MOBILE CAPTURE (393x830 @2x, 9:19 Ratio)
    try {
      const mobileContext = await browser.newContext({
        viewport: { width: 393, height: 830 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        ignoreHTTPSErrors: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
      });
      const page = await mobileContext.newPage();
      try {
        await page.goto(link, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
      }
      await page.waitForTimeout(2000);

      const png = await page.screenshot({
        clip: { x: 0, y: 0, width: 393, height: 830 }
      });
      await mobileContext.close();

      const outPath = path.join(OUTPUT_DIR, `${slug}-mobile.webp`);
      await sharp(png)
        .webp({ quality: 86, effort: 4 })
        .toFile(outPath);
      const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
      console.log(`     ✓ Mobile saved: ${slug}-mobile.webp (${sizeKb} KB)`);
      mobileOk = true;
    } catch (err) {
      console.error(`     ✗ Mobile error for ${slug}:`, err.message);
    }

    results.push({ slug, title, desktopOk, mobileOk });
  }

  await browser.close();

  console.log('\n========================================');
  console.log('Capture summary:');
  const succeeded = results.filter(r => r.desktopOk && r.mobileOk).length;
  console.log(`Fully succeeded: ${succeeded} / ${PROJECTS.length}`);
  results.forEach(r => {
    console.log(`- ${r.slug}: Desktop=${r.desktopOk ? 'OK' : 'FAIL'} | Mobile=${r.mobileOk ? 'OK' : 'FAIL'}`);
  });
}

run().catch(console.error);
