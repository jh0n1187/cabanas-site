// Gera a versão de publicação (dist/) a partir da versão de desenvolvimento (src/).
//   node tools/build.mjs
// - Apaga e recria dist/ (nunca edite dist/ à mão).
// - Copia tudo de src/.
// - Compacta os .html com html-minifier-terser via npx (não é dependência do projeto; precisa de internet na 1ª vez).
// - Falha se encontrar marcadores de rascunho ([CONFIRMAR], FOTO REAL, support.js) em dist/.
import { rmSync, cpSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
cpSync(src, dist, { recursive: true });

const arquivos = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? arquivos(p) : [p];
});

const htmls = arquivos(dist).filter((f) => extname(f) === '.html');
for (const f of htmls) {
  // caminho relativo + cwd=dist: o caminho do projeto tem espaços, e no Windows o npx roda via shell
  const rel = relative(dist, f);
  execFileSync('npx', ['--yes', 'html-minifier-terser@7.2.0',
    '--collapse-whitespace', '--conservative-collapse', '--remove-comments',
    '--minify-css', 'true', '--minify-js', 'true', '--use-short-doctype',
    '-o', rel, rel], { cwd: dist, stdio: 'inherit', shell: process.platform === 'win32' });
}

const proibidos = [/\[CONFIRMAR/i, /FOTO REAL/i, /support\.js/i];
const textos = arquivos(dist).filter((f) => ['.html', '.txt', '.xml', '.js', '.css'].includes(extname(f)));
const problemas = textos.flatMap((f) => proibidos.filter((r) => r.test(readFileSync(f, 'utf8'))).map((r) => `${f}: ${r}`));
if (problemas.length) { console.error('Marcadores de rascunho encontrados:\n' + problemas.join('\n')); process.exit(1); }

const kb = (f) => (statSync(f).size / 1024).toFixed(1) + ' KB';
for (const f of htmls) console.log(f.replace(root, '.'), kb(f));
console.log('dist/ pronto para publicar.');
