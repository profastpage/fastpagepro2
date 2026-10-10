const fs = require('fs');
const path = require('path');

const copies = [
  {
    src: 'C:\\dev\\CLIENTES\\12 CLIENTE - Maia Store\\download\\audit-screenshots\\01-desktop-home.png',
    dest: 'public/images/03-portafolio/MaiaStore-desktop.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\12 CLIENTE - Maia Store\\download\\audit-screenshots\\12-mobile-home.png',
    dest: 'public/images/03-portafolio/MaiaStore-mobile-real.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\24 CLIENTE - MEDINA ALMONTE FIRMA LEGAL\\public\\medina-almonte-hero-desktop.webp',
    dest: 'public/images/03-portafolio/MedinaAlmonte-desktop.webp'
  },
  {
    src: 'C:\\dev\\CLIENTES\\28 CLIENTE - CREDITOS YADIEL\\CONTENIDO EXTRA\\prestamos al instante.png',
    dest: 'public/images/03-portafolio/CreditosYadiel-prestamos.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\28 CLIENTE - CREDITOS YADIEL\\CONTENIDO EXTRA\\logo yadiel.png',
    dest: 'public/images/03-portafolio/CreditosYadiel-logo.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\18 CLIENTE - BREICORP\\HERO.png',
    dest: 'public/images/03-portafolio/Breicorp-hero.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\20 CLIENTE - EDITORIAL HORIZONTE\\ADICIONALES\\HERO INICIO.png',
    dest: 'public/images/03-portafolio/EditorialHorizonte-hero.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\21 CLIENTE - AMC SOLUCIONES PERU\\CONTENIDO EXTRA\\hero\\portada amc nosotros horizontal.png',
    dest: 'public/images/03-portafolio/AMCSoluciones-hero.png'
  },
  {
    src: 'C:\\dev\\CLIENTES\\7 CLIENTE - Unión el Progreso\\hero-prestamos.webp',
    dest: 'public/images/03-portafolio/UnionProgreso-hero.webp'
  }
];

for (const c of copies) {
  try {
    if (fs.existsSync(c.src)) {
      fs.copyFileSync(c.src, path.join(__dirname, '..', c.dest));
      console.log('Copied:', c.dest, '(' + Math.round(fs.statSync(c.src).size/1024) + ' KB)');
    } else {
      console.log('Source not found:', c.src);
    }
  } catch(e) {
    console.error('Error copying', c.src, e.message);
  }
}
