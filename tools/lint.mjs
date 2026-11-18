// Ferramentas com versões fixas via npx; não entram nos arquivos publicados.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { executarNpx } from './npx.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const temporarios = join(root, '.wrangler', 'lint');
mkdirSync(temporarios, { recursive: true });
const htmls = readdirSync(join(root, 'src')).filter(nome => nome.endsWith('.html'));
const scripts = [], estilos = [];
for (const nome of htmls) {
  const html = readFileSync(join(root, 'src', nome), 'utf8');
  for (const [tag, extensao, destino] of [['script', 'js', scripts], ['style', 'css', estilos]]) {
    let numero = 0;
    for (const trecho of html.matchAll(new RegExp(`(<${tag}\\b[^>]*>)([\\s\\S]*?)<\\/${tag}>`, 'gi'))) {
      if (tag === 'script' && /\b(?:src=|type=["']application\/ld\+json)/i.test(trecho[1])) continue;
      const arquivo = join(temporarios, `browser-${nome}-${++numero}.${extensao}`);
      const linhas = html.slice(0, trecho.index + trecho[1].length).split('\n').length - 1;
      writeFileSync(arquivo, '\n'.repeat(linhas) + trecho[2]);
      destino.push(relative(root, arquivo));
    }
  }
}
const opcoes = { cwd: root, stdio: 'inherit' };
executarNpx(['--yes', 'html-validate@11.21.1', ...htmls.map(nome => join('src', nome)), '--max-warnings', '0'], opcoes);
executarNpx(['--yes', 'eslint@10.15.0', '--config', 'eslint.config.mjs', '--max-warnings', '0', 'tools/', 'worker/', 'eslint.config.mjs', 'stylelint.config.mjs', ...scripts], opcoes);
executarNpx(['--yes', 'stylelint@18.0.0', '--config', 'stylelint.config.mjs', '--max-warnings', '0', ...estilos], opcoes);
console.log('Lint HTML, JavaScript e CSS: sem erros ou avisos.');
