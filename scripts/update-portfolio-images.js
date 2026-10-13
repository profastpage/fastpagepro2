import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/portfolioData.js');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let currentSlug = null;
let replacedModal = 0;
let replacedMobile = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const slugMatch = line.match(/^\s*slug:\s*"([a-z0-9-]+)"/);
  if (slugMatch) {
    currentSlug = slugMatch[1];
  }
  if (currentSlug && /^\s*modalImage:\s*"[^"]*"/.test(line)) {
    lines[i] = `      modalImage: "/images/03-portafolio/real/${currentSlug}-desktop.webp",`;
    replacedModal++;
  }
  if (currentSlug && /^\s*modalMobileImage:\s*"[^"]*"/.test(line)) {
    lines[i] = `      modalMobileImage: "/images/03-portafolio/real/${currentSlug}-mobile.webp",`;
    replacedMobile++;
  }
}

console.log(`Replaced modalImage: ${replacedModal}`);
console.log(`Replaced modalMobileImage: ${replacedMobile}`);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('src/data/portfolioData.js successfully updated line-by-line!');
