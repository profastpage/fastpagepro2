const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/data/portfolioData.js'), 'utf8');

// Parse projects from PORTFOLIO_BY_LANG.es
const projects = [];
const blocks = content.split('// --- ');

for (const b of blocks) {
  const titleM = b.match(/title:\s*"([^"]+)"/);
  const slugM = b.match(/slug:\s*"([^"]+)"/);
  const imgM = b.match(/image:\s*"([^"]+)"/);
  const modalM = b.match(/modalImage:\s*"([^"]+)"/);
  const mobM = b.match(/modalMobileImage:\s*"([^"]+)"/);
  if (titleM && slugM && imgM) {
    projects.push({
      title: titleM[1],
      slug: slugM[1],
      image: imgM[1],
      modalImage: modalM ? modalM[1] : null,
      modalMobileImage: mobM ? mobM[1] : null
    });
  }
}

console.log(`Found ${projects.length} projects:`);
projects.forEach((p, i) => {
  const imgOk = fs.existsSync(path.join(__dirname, '../public', p.image));
  const modalOk = p.modalImage ? fs.existsSync(path.join(__dirname, '../public', p.modalImage)) : false;
  const mobOk = p.modalMobileImage ? fs.existsSync(path.join(__dirname, '../public', p.modalMobileImage)) : false;
  console.log(`${i + 1}. [${p.slug}] ${p.title} -> card: ${imgOk} (${p.image}), modal: ${modalOk}, mob: ${mobOk}`);
});
