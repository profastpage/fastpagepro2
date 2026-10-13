import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/images/03-portafolio/real');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureProject(slug, url, title) {
  console.log(`\n========================================`);
  console.log(`Capturing: ${title} (${slug})`);
  console.log(`URL: ${url}`);

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    // 1. DESKTOP CAPTURE (16:10 Ratio, 1440x900, Retina 2x)
    console.log('  -> Taking Desktop capture (1440x900 @2x)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      isMobile: false,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    });
    const desktopPage = await desktopContext.newPage();
    try {
      await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch {
      console.log('     Networkidle timed out, proceeding with domcontentloaded...');
      await desktopPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    }
    await desktopPage.waitForTimeout(2000);

    const desktopPng = await desktopPage.screenshot({
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    await desktopContext.close();

    const desktopWebpPath = path.join(OUTPUT_DIR, `${slug}-desktop.webp`);
    await sharp(desktopPng)
      .webp({ quality: 88, effort: 4 })
      .toFile(desktopWebpPath);
    console.log(`  ✓ Desktop saved: ${desktopWebpPath} (${(fs.statSync(desktopWebpPath).size / 1024).toFixed(1)} KB)`);

    // 2. MOBILE CAPTURE (9:19 Ratio, 393x830, iPhone Retina 2x)
    console.log('  -> Taking Mobile capture (393x830 @2x)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 830 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
    });
    const mobilePage = await mobileContext.newPage();
    try {
      await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch {
      console.log('     Networkidle timed out, proceeding with domcontentloaded...');
      await mobilePage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    }
    await mobilePage.waitForTimeout(2000);

    const mobilePng = await mobilePage.screenshot({
      clip: { x: 0, y: 0, width: 393, height: 830 }
    });
    await mobileContext.close();

    const mobileWebpPath = path.join(OUTPUT_DIR, `${slug}-mobile.webp`);
    await sharp(mobilePng)
      .webp({ quality: 88, effort: 4 })
      .toFile(mobileWebpPath);
    console.log(`  ✓ Mobile saved: ${mobileWebpPath} (${(fs.statSync(mobileWebpPath).size / 1024).toFixed(1)} KB)`);

    return true;
  } catch (err) {
    console.error(`  ✗ Error capturing ${slug}:`, err.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Test on Vuelo 78 Hotel
captureProject('vuelo-78-hotel', 'https://www.vuelo78hotel.com', 'Vuelo 78 Hotel Tarapoto');
