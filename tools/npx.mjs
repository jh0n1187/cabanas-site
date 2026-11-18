import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

// Usa o CLI oficial do npm no Windows, sem shell nem interpolação de argumentos.
export function executarNpx(argumentos, opcoes = {}) {
  if (process.platform !== 'win32') return execFileSync('npx', argumentos, opcoes);
  const caminhos = [join(dirname(process.execPath), 'node_modules/npm/bin/npx-cli.js')];
  if (!existsSync(caminhos[0])) {
    const comandos = execFileSync('where.exe', ['npx.cmd'], { encoding: 'utf8' }).trim().split(/\r?\n/);
    caminhos.push(...comandos.map(comando => join(dirname(comando), 'node_modules/npm/bin/npx-cli.js')));
  }
  const cli = caminhos.find(caminho => existsSync(caminho));
  if (!cli) throw new Error('CLI do npx não encontrado. Confira a instalação oficial do Node.js/npm.');
  return execFileSync(process.execPath, [cli, ...argumentos], opcoes);
}
