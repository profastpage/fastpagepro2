import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('public/images/03-portafolio/real');
const TARGET_DIR = path.resolve('public/catalogo-whatsapp');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function exportCatalog() {
  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.webp'));
  console.log(`Exporting ${files.length} images to WhatsApp Catalog format (JPG 92% quality)...`);

  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const jpgFileName = file.replace('.webp', '.jpg');
    const destPath = path.join(TARGET_DIR, jpgFileName);

    await sharp(srcPath)
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(destPath);
  }

  console.log(`Successfully exported all ${files.length} JPG images to: ${TARGET_DIR}`);
}

exportCatalog().catch(console.error);
