# Site Pizzaria Cabanas (pizzariacabanas.com.br)

Site one-page estático (HTML + CSS + JS puro, sem framework) para SEO local de uma pizzaria delivery no Carandá Bosque, Campo Grande–MS. Hospedagem: Cloudflare Pages. Domínio registrado no registro.br e com DNS no Cloudflare.

## Estrutura
- `src/` — **versão de desenvolvimento**. Edite aqui. `src/index.html` é a página inteira, com CSS e JS embutidos e comentados.
- `dist/` — **versão de publicação**, gerada por `node tools/build.mjs`. Nunca edite à mão. É a única pasta enviada ao Cloudflare Pages.
- `tools/build.mjs` — copia `src` para `dist`, compacta o HTML (html-minifier-terser via npx) e **falha** se encontrar `[CONFIRMAR]`, `FOTO REAL` ou `support.js`.
- `tools/build-imagens.mjs` — gera AVIF/WebP de `fotos-originais/` para `src/assets/img/` e os ícones. Precisa do sharp numa pasta temporária (`SHARP_DIR`), sem entrar como dependência do projeto.
- `fotos-originais/` — fotos brutas. **Não publicar**: os JPGs têm um palavrão no campo copyright do EXIF. O sharp remove os metadados.
- `design/prototipo-claude-design/` — protótipos v1–v3 e guia (tokens, componentes) do Claude Design. Só referência visual, não publicar.
- `docs/` — briefing (`prompt-site-...`, `ajustes-finais-...`), plano de SEO/publicação e dados coletados (avaliações, cardápio, achados).

## Fluxo
1. Editar `src/`. Para ver no navegador, use a configuração `site-dev` de `.claude/launch.json` (porta 8090). Para testar o status de funcionamento, use `?status=aberto|antes|segunda|depois|domingo|feriado`.
2. Trocar foto: colocar o arquivo em `fotos-originais/`, ajustar o recorte em `build-imagens.mjs` e rodar o script. Se uma imagem mudar, troque o nome dela (o cache de `/assets/*` é de 1 ano).
3. `node tools/build.mjs` e conferir o `dist/` (configuração `site-dist`, porta 8091). Rodar o Lighthouse no celular (meta ≥ 90 em tudo).
4. Publicar o `dist/` no Cloudflare Pages.

## Regras de conteúdo (detalhes em docs/prompt-site-pizzaria-cabanas.md)
- **Nome e endereço:** sempre "Pizzaria Cabanas", Av. Antônio Teodorowich, 119 – Carandá Bosque, iguais ao Google Maps.
- **Operação:** só delivery e retirada no balcão. Sem salão, mesas ou churrascaria. Nunca usar o endereço antigo.
- **Nada inventado:** preços, prêmios, prazos ou "melhor pizza" na voz da marca (essa frase só aparece em depoimentos reais).
- **Horário:** terça a domingo, das 18h às 22h45. Quando mudar, atualizar em 3 lugares: o texto do HTML, a constante `ABRE`/`FECHA` no script e o JSON-LD `openingHoursSpecification`.
- **Feriado ou folga:** preencher `AVISO_FECHADO` no início do script.
- **FAQ:** o texto visível e o JSON-LD FAQPage precisam ser idênticos.
