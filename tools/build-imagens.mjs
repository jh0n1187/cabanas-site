// Gera as imagens do site (AVIF + WebP, sem metadados) de ../fotos-originais para ../src.
// O sharp NÃO é dependência do projeto: instale numa pasta temporária e aponte SHARP_DIR para ela.
//   npm i sharp --prefix <pasta-temp>
//   SHARP_DIR=<pasta-temp> node tools/build-imagens.mjs
// Os arquivos originais têm EXIF indesejado; o sharp descarta metadados por padrão (não usar .withMetadata()).
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(process.env.SHARP_DIR || root, 'package.json'));
const sharp = require('sharp');

const src = (f) => join(root, 'fotos-originais', f);
const out = join(root, 'src', 'assets', 'img');
const pub = join(root, 'src');
mkdirSync(out, { recursive: true });

// crop: região do original { left, top, width, height }; widths: larguras geradas
const fotos = [
  // hero: qualidade menor porque é o LCP (maior elemento da primeira tela)
  { nome: 'hero-cabanas-gourmet', arq: 'pizza 2.jpg', crop: { left: 30, top: 0, width: 864, height: 1080 }, widths: [480, 720, 864], q: { avif: 30, webp: 55 } },
  { nome: 'cabanas-gourmet', arq: 'pizza 2.jpg', crop: { left: 40, top: 200, width: 860, height: 645 }, widths: [400, 800] },
  { nome: 'chocolate-com-morango', arq: 'pizza 3.jpg', crop: { left: 0, top: 34, width: 1350, height: 1012 }, widths: [400, 800] },
  { nome: 'brie-geleia-pimenta', arq: 'pizza 1.jpg', crop: { left: 0, top: 0, width: 1080, height: 720 }, widths: [540, 1080] },
  { nome: 'balcao-recepcao', arq: 'salao.jpg', crop: { left: 0, top: 380, width: 1200, height: 675 }, widths: [600, 1200] },
];

for (const f of fotos) {
  for (const w of f.widths) {
    const base = sharp(src(f.arq)).rotate().extract(f.crop).resize({ width: w });
    const q = f.q || { avif: 40, webp: 66 };
    await base.clone().avif({ quality: q.avif, effort: 6 }).toFile(join(out, `${f.nome}-${w}.avif`));
    await base.clone().webp({ quality: q.webp }).toFile(join(out, `${f.nome}-${w}.webp`));
  }
}

// Logo horizontal para o cabeçalho (fundo bordô igual ao do header) — 2x de 124x56
const logoCrop = { left: 200, top: 455, width: 1100, height: 497 };
await sharp(src('logo.png')).extract(logoCrop).resize({ width: 248, height: 112, fit: 'cover' })
  .webp({ quality: 90 }).toFile(join(out, 'logo-cabanas-248.webp'));

// Ícones (quadrado centrado no logo)
const iconCrop = { left: 175, top: 175, width: 1150, height: 1150 };
await sharp(src('logo.png')).extract(iconCrop).resize(512).png().toFile(join(pub, 'icon-512.png'));
await sharp(src('logo.png')).extract(iconCrop).resize(180).png().toFile(join(pub, 'apple-touch-icon.png'));
await sharp(src('logo.png')).extract(iconCrop).resize(48).png().toFile(join(pub, 'favicon-48.png'));

// favicon.ico (navegadores e alguns robôs pedem /favicon.ico direto): ICO com um PNG 48x48 dentro
{
  const png = await sharp(src('logo.png')).extract(iconCrop).resize(48).png().toBuffer();
  const h = Buffer.alloc(22);
  h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4); // ICONDIR: 1 imagem
  h.writeUInt8(48, 6); h.writeUInt8(48, 7); h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12); // largura, altura, planos, bpp
  h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18); // tamanho e posição do PNG
  writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([h, png]));
}

// Imagem de compartilhamento: reaproveita a do protótipo (já sem EXIF), recomprimida
await sharp(join(root, 'design', 'prototipo-claude-design', 'assets', 'og-image-1200x630.jpg'))
  .jpeg({ quality: 82, mozjpeg: true }).toFile(join(pub, 'og-image.jpg'));

console.log('ok');
