import fs from 'fs';
import path from 'path';
import { PORTFOLIO_BY_LANG } from '../src/data/portfolioData.js';

const projects = PORTFOLIO_BY_LANG.es;
const CSV_PATH = path.resolve('public/catalogo-whatsapp-fastpagepro.csv');

// Meta Commerce Manager Standard Product Catalog Header
const headers = [
  'id',
  'title',
  'description',
  'availability',
  'condition',
  'price',
  'link',
  'image_link',
  'additional_image_link',
  'brand',
  'category'
];

const rows = [headers.join(',')];

for (const p of projects) {
  const id = p.slug;
  const title = `"${p.title.replace(/"/g, '""')}"`;
  const cleanDesc = `${p.description} • Sector: ${p.industryLabel || p.category} • Beneficio: Tarifa preferencial con descuento para próximo desarrollo.`.replace(/"/g, '""');
  const description = `"${cleanDesc}"`;
  const availability = 'in stock';
  const condition = 'new';
  const price = '900.00 PEN'; // Default baseline price for Meta catalog validation
  const link = p.link || `https://www.fastpagepro.com/portafolio/${p.slug}`;
  const image_link = `https://www.fastpagepro.com/catalogo-whatsapp/${p.slug}-desktop.jpg`;
  const additional_image_link = `https://www.fastpagepro.com/catalogo-whatsapp/${p.slug}-mobile.jpg`;
  const brand = '"Fast Page Pro"';
  const category = `"${p.category}"`;

  rows.push([
    id,
    title,
    description,
    availability,
    condition,
    price,
    link,
    image_link,
    additional_image_link,
    brand,
    category
  ].join(','));
}

fs.writeFileSync(CSV_PATH, rows.join('\n'), 'utf8');
console.log(`Successfully generated Meta/WhatsApp Business Catalog CSV with ${projects.length} products at: ${CSV_PATH}`);
