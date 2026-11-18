// Verifica o artefato que o Wrangler vai publicar, depois da minificação.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { Script } from 'node:vm';

function atributo(tag, nome) {
  const valor = tag.match(new RegExp(`\\s${nome}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return (valor?.[1] ?? valor?.[2] ?? valor?.[3])?.replaceAll('&amp;', '&');
}

export function validarPublicacao(diretorio) {
  const html = readFileSync(resolve(diretorio, 'index.html'), 'utf8');
  const exigir = (condicao, mensagem) => {
    if (!condicao) throw new Error(`Publicação bloqueada: ${mensagem}`);
  };
  const arquivos = new Set(html.match(/\/assets\/[a-zA-Z0-9_./-]+\.(?:avif|webp|woff2|png|jpg|svg|ico)/g) || []);
  for (const tag of html.match(/<(?:img|source|link|script)\b[^>]*>/gi) || []) {
    for (const nome of ['src', 'href']) {
      const url = atributo(tag, nome);
      if (url?.startsWith('/') && !url.startsWith('//')) arquivos.add(url.split(/[?#]/)[0]);
    }
  }
  for (const url of arquivos) {
    const arquivo = resolve(diretorio, '.' + url);
    exigir(!relative(resolve(diretorio), arquivo).startsWith('..') && existsSync(arquivo) && statSync(arquivo).isFile(), `arquivo local ausente ou inválido: ${url}`);
  }

  const cabecalho = html.match(/<header\b[^>]*>[\s\S]*?<\/header>/i)?.[0] || '';
  const banner = (html.match(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi) || [])
    .find(tag => atributo(tag, 'class')?.split(/\s+/).includes('hero__foto'));
  exigir(banner, 'banner principal não encontrado');
  const imagemBanner = banner.match(/<img\b[^>]*>/i)?.[0];
  exigir(imagemBanner && atributo(imagemBanner, 'fetchpriority') === 'high' && atributo(imagemBanner, 'loading') !== 'lazy', 'o banner deve ter prioridade alta e carregar sem lazy-load');
  const imagens = html.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imagens) {
    exigir(Number(atributo(tag, 'width')) > 0 && Number(atributo(tag, 'height')) > 0, `imagem sem dimensões: ${atributo(tag, 'src')}`);
    exigir(atributo(tag, 'alt') !== undefined, `imagem sem alt: ${atributo(tag, 'src')}`);
    if (tag !== imagemBanner && !cabecalho.includes(tag)) {
      exigir(atributo(tag, 'loading') === 'lazy' && atributo(tag, 'decoding') === 'async', `imagem secundária sem lazy/async: ${atributo(tag, 'src')}`);
    }
  }
  const mapas = html.match(/<iframe\b[^>]*>/gi) || [];
  for (const tag of mapas) exigir(atributo(tag, 'loading') === 'lazy' && atributo(tag, 'title'), 'iframe sem lazy-load ou título');

  const avif = (banner.match(/<source\b[^>]*>/gi) || []).find(tag => atributo(tag, 'type') === 'image/avif');
  const preload = (html.match(/<link\b[^>]*>/gi) || []).find(tag => atributo(tag, 'as') === 'image' && atributo(tag, 'type') === 'image/avif');
  exigir(avif && preload && atributo(preload, 'imagesrcset') === atributo(avif, 'srcset') && atributo(preload, 'imagesizes') === atributo(avif, 'sizes'), 'preload e imagem AVIF do banner devem usar os mesmos tamanhos');

  const dados = [];
  for (const script of html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)) {
    const tipo = atributo(script[1], 'type');
    if (tipo === 'application/ld+json') dados.push(JSON.parse(script[2]));
    else if (atributo(script[1], 'src')) {
      exigir(/\s(?:async|defer)(?:\s|=|>)/i.test(script[1]) || tipo === 'module', 'script externo bloqueando a renderização');
    } else if (!tipo || tipo === 'text/javascript') new Script(script[2]);
  }
  exigir(dados.some(dado => dado['@type'] === 'Restaurant') && dados.some(dado => dado['@type'] === 'FAQPage'), 'dados estruturados Restaurant/FAQPage ausentes');
  exigir(/\/assets\/\*[\s\S]*Cache-Control:\s*public,\s*max-age=31536000,\s*immutable/i.test(readFileSync(resolve(diretorio, '_headers'), 'utf8')), 'cache de um ano ausente nos assets');
  return { arquivos: arquivos.size, imagens: imagens.length, iframes: mapas.length };
}
