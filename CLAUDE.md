# Site Pizzaria Cabanas (pizzariacabanas.com.br)

Site one-page estático (HTML + CSS + JS puro, sem framework) para SEO local de uma pizzaria delivery no Carandá Bosque, Campo Grande–MS. Hospedagem: **Cloudflare Workers com arquivos estáticos** (o Pages foi incorporado aos Workers). O domínio foi registrado no registro.br, e o DNS foi apontado para o Cloudflare (nameservers `cory`/`paityn.ns.cloudflare.com`).

## Estrutura
- `src/` — **versão de desenvolvimento**. Edite aqui. `src/index.html` é a página inteira, com CSS e JS embutidos e comentados.
- `dist/` — **versão de publicação**, gerada por `node tools/build.mjs`. Nunca edite à mão. Fica fora do Git.
- `tools/build.mjs` — copia `src` para `dist`, compacta o HTML (html-minifier-terser via npx) e **falha** se encontrar `[CONFIRMAR]`, `FOTO REAL` ou `support.js`.
- `tools/build-imagens.mjs` — gera AVIF/WebP de `fotos-originais/` para `src/assets/img/`, mais os ícones e o `favicon.ico`. Precisa do sharp numa pasta temporária (`SHARP_DIR`), sem entrar como dependência do projeto.
- `wrangler.jsonc` + `worker/index.js` — deploy no Cloudflare. O worker redireciona `www` para o domínio sem www (301) e serve o `dist/`.
- `fotos-originais/` — fotos brutas. **Não publicar**: os JPGs têm um palavrão no campo copyright do EXIF. O sharp remove os metadados.
- `design/prototipo-claude-design/` — protótipos v1–v3 e guia (tokens, componentes) do Claude Design. Só referência visual, não publicar.
- `docs/` — briefing, plano de SEO/publicação, dados coletados (avaliações, cardápio, bairros, decisões do dono) e **`VALIDACAO.md`** (roteiro de validação antes e depois de cada deploy).

## Fluxo
1. Editar `src/`. Para ver no navegador, use a configuração `site-dev` de `.claude/launch.json` (porta 8090). Para testar o status de funcionamento, use `?status=aberto|antes|segunda|depois|domingo|feriado`.
2. Trocar foto: colocar o arquivo em `fotos-originais/`, ajustar o recorte em `build-imagens.mjs` e rodar o script. Se uma imagem mudar, troque o nome dela (o cache de `/assets/*` é de 1 ano).
3. `node tools/build.mjs`, conferir o `dist/` (configuração `site-dist`, porta 8091) e seguir `docs/VALIDACAO.md`.
4. Deploy: `npx wrangler@4 deploy`. O login é por `npx wrangler@4 login` (OAuth no navegador); nunca peça token no chat.

## Regras de conteúdo (detalhes em docs/prompt-site-pizzaria-cabanas.md)
- **Nome e endereço:** sempre "Pizzaria Cabanas", Av. Antônio Teodorowich, 119 – Carandá Bosque, iguais ao Google Maps.
- **Operação:** só delivery e retirada no balcão. Sem salão, mesas ou churrascaria. Nunca usar o endereço antigo.
- **Nada inventado:** preços, prêmios, prazos ou "melhor pizza" na voz da marca (essa frase só aparece em depoimentos reais).
- **Horário:** terça a domingo, das 18h às 22h45. Quando mudar, atualizar em 3 lugares: o texto do HTML, a constante `ABRE`/`FECHA` no script e o JSON-LD `openingHoursSpecification`.
- **Feriado ou folga:** preencher `AVISO_FECHADO` no início do script.
- **FAQ:** o texto visível e o JSON-LD FAQPage precisam ser idênticos.
- **No ar não pode haver rótulo de dúvida** ([CONFIRMAR], placeholders). Pendência se resolve perguntando ao dono antes do deploy.

## Armadilhas já encontradas
- **Protótipo do Claude Design muda depois de lido**
  - Sintoma: o site ficou sem os ajustes finais da v3.
  - Causa: o arquivo foi atualizado depois da primeira leitura.
  - Prevenção: antes de converter, confira data e tamanho do `.dc.html` e releia se mudaram.
- **Cloudflare Pages não cria projeto novo**
  - Sintoma: `wrangler pages project create` e `pages deploy` falham ("delegating to Workers").
  - Solução: use `wrangler deploy` com `assets` em `wrangler.jsonc`.
  - Link de teste: exige um subdomínio `workers.dev` registrado no painel (o automático "site" já estava ocupado).
- **Mapa do Google embutido**
  - Sintoma: buscando pelo nome/endereço (`maps?q=Pizzaria+Cabanas...`), o mapa mostra o mundo inteiro.
  - Solução: use as coordenadas `q=-20.4473307,-54.5762186&z=16&output=embed`.
- **`npx` via `execFileSync` no Windows**
  - Sintoma: falha com o caminho do projeto, que tem espaços.
  - Solução: passe caminhos relativos e `cwd`, como já está em `build.mjs`.
- **Preview local mostra versão antiga**
  - Causa: cache do navegador.
  - Solução: acrescente `?v=N` à URL.
- **Overpass API (OSM) trava ou dá 502**
  - Solução: para listar bairros, use o reverse geocoding do Nominatim numa grade de pontos, com 1 requisição por segundo.
