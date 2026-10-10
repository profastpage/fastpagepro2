const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/portfolioData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace image: "/images/03-portafolio/..." with framed image
// We can parse project by project or use regex
const regex = /(slug:\s*"([^"]+)"[\s\S]*?image:\s*)"([^"]+)"/g;

content = content.replace(regex, (match, prefix, slug, oldImg) => {
  const framedPath = `/images/03-portafolio/framed/${slug}.webp`;
  const framedFile = path.join(__dirname, '../public', framedPath);
  if (fs.existsSync(framedFile)) {
    return `${prefix}"${framedPath}"`;
  }
  return match;
});

// Specific modal overrides for best quality
const overrides = [
  { slug: 'maia-store', modalImage: '/images/03-portafolio/MaiaStore-desktop.png', modalMobileImage: '/images/03-portafolio/MaiaStore-mobile-real.png' },
  { slug: 'medina-almonte-firma-legal', modalImage: '/images/03-portafolio/MedinaAlmonte-desktop.webp' },
  { slug: 'creditos-yadiel', modalImage: '/images/03-portafolio/CreditosYadiel-prestamos.png' },
  { slug: 'breicorp', modalImage: '/images/03-portafolio/Breicorp-hero.png' },
  { slug: 'editorial-horizonte', modalImage: '/images/03-portafolio/EditorialHorizonte-hero.png' },
  { slug: 'amc-soluciones-peru', modalImage: '/images/03-portafolio/AMCSoluciones-hero.png' },
  { slug: 'union-el-progreso', modalImage: '/images/03-portafolio/UnionProgreso-hero.webp' }
];

overrides.forEach(ov => {
  const rSlug = new RegExp(`(slug:\\s*"${ov.slug}"[\\s\\S]*?modalImage:\\s*)"([^"]+)"`, 'g');
  content = content.replace(rSlug, `$1"${ov.modalImage}"`);
  if (ov.modalMobileImage) {
    const rMob = new RegExp(`(slug:\\s*"${ov.slug}"[\\s\\S]*?modalMobileImage:\\s*)"([^"]+)"`, 'g');
    content = content.replace(rMob, `$1"${ov.modalMobileImage}"`);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('portfolioData.js updated with framed assets and modal overrides!');
