# Roteiro de validação do site (SEO, performance e conteúdo)

Use a cada deploy. As metas valem para o **celular**, que é onde está o público.

## 1. Antes do deploy (local)

| # | O que | Como | Meta |
|---|---|---|---|
| 1 | Build limpo | `node tools/build.mjs` | Sem erro. O build já bloqueia `[CONFIRMAR]`, `FOTO REAL` e `support.js` |
| 2 | Arquivos referenciados existem | Conferir que toda imagem, fonte e ícone citado no HTML existe em `dist/` | Nenhum faltando |
| 3 | Primeira tela no celular | Preview `site-dist` a 375×667 | H1, status, texto e os 2 botões visíveis sem rolar |
| 4 | Desktop | Preview a 1440×900 | Layout do protótipo v3 |
| 5 | Status de funcionamento | `?status=aberto`, `antes`, `segunda`, `depois`, `domingo`, `feriado` | Texto e cor corretos em cada caso |
| 6 | Lighthouse no celular | `npx lighthouse@12.8.2 http://127.0.0.1:8091/ --chrome-flags="--headless=new"` | ≥ 90 nas 4 categorias. LCP < 2,5 s, CLS < 0,1, TBT < 200 ms |
| 7 | Dados estruturados | Fazer `JSON.parse` dos 2 blocos `ld+json` | Restaurant e FAQPage válidos. FAQ visível = FAQ do JSON-LD |
| 8 | SEO da página | Um único H1, um H2 por seção, `alt` em todas as imagens, title de até 60 caracteres, description de até 155 | Sem pendências |
| 9 | Links de ação | Cardápio (com UTM), wa.me, tel:, Maps, avaliar, iFood | Todos abrem o destino certo |
| 10 | Metadados das fotos | `grep -ri "caralho" dist/` | Vazio |

Medido localmente em 17/11/2026: Performance 97, Acessibilidade 100, Boas práticas 100, SEO 100, LCP 2,6 s, CLS 0, TBT 0 ms.
Os avisos de cache e compressão vêm do servidor de teste local. No Cloudflare, o `_headers` e o Brotli resolvem.

## 2. Logo depois do deploy (no ar)

| Ferramenta | O que conferir |
|---|---|
| **PageSpeed Insights** (pagespeed.web.dev) | Nota oficial do Google, no celular e no desktop. Meta ≥ 90 e LCP < 2,5 s |
| **SpeedVitals** (speedvitals.com) | Teste a partir de São Paulo/Brasil, mais perto do público real |
| **GTmetrix** (gtmetrix.com) | Segunda opinião sobre o peso e a cascata de carregamento. No plano grátis o teste sai do Canadá, então o tempo fica pior que o real |
| **Teste de pesquisa aprimorada** (search.google.com/test/rich-results) | Restaurant e FAQPage reconhecidos, sem erros |
| **Schema Markup Validator** (validator.schema.org) | JSON-LD sem avisos |
| **Depurador do Facebook** + envio do link no WhatsApp | Imagem 1200×630, título e descrição aparecem corretamente |
| **WAVE** (wave.webaim.org) | Sem erros de acessibilidade |
| **Redirecionamentos** | `www` → domínio sem www (301), `http` → `https`, e `/pagina-que-nao-existe` → 404 personalizado |
| **Plugin claude-seo** | `/seo-audit https://pizzariacabanas.com.br`, `/seo-local`, `/seo-geo` |

**Primeiro deploy (17/11/2026), Lighthouse rodado contra o site no ar:**
- **Celular:** 97 / 100 / 96 / 100. LCP 2,5 s, FCP 1,8 s, TBT 0 ms, CLS 0.
- **Desktop:** 100 / 100 / 96 / 100. LCP 0,6 s.
- **Boas práticas 96:** vem só do script do Cloudflare Web Analytics (`static.cloudflareinsights.com`), que não carregou na máquina de teste por bloqueio de DNS ou de anúncios. Não é problema do site.
- **Respostas do servidor:** HTTPS, `http` e `www` com 301, 404 personalizado, Brotli e cache de 1 ano em `/assets/*`. JSON-LD Restaurant + FAQPage válidos, com o FAQ igual ao texto visível.
- **API do PageSpeed sem chave:** estoura a cota diária. Use o site pagespeed.web.dev ou o Lighthouse local contra a URL.

## 3. Indexação (uma vez, depois que o domínio estiver ativo)

**Situação em 17/11/2026:**
- ✅ **Search Console:** propriedade de domínio `pizzariacabanas.com.br` verificada pelo registro TXT `google-site-verification=…` criado no DNS do Cloudflare. **Não apagar esse registro**, senão a verificação cai.
- ✅ **Sitemap:** enviado. Logo após o envio aparece "Não foi possível buscar", o que é normal para domínio novo, e o Google tenta de novo sozinho.
- ✅ **Página inicial:** indexação solicitada.
- ✅ **Bing Webmaster Tools:** login com a conta Google da pizzaria e site importado do Search Console, que dá acesso só de leitura e dispensa nova verificação. O sitemap foi enviado à parte, porque a importação veio com 0 sitemaps, e está em processamento.
- ✅ **Perfil da Empresa no Google:** o campo "Site" passou de `cabanaspizzas.menudino.com` para `https://pizzariacabanas.com.br/?utm_source=gbp`, em revisão pelo Google (cerca de 10 min). O "Link do cardápio" continua no MenuDino, de propósito.
- ✅ **Descrição do Perfil da Empresa:** trocada para mencionar "delivery e retirada no balcão", mais de 5 anos, horário e bairro. Está em revisão pelo Google.
  - As regras do perfil **não permitem URL na descrição**, então o texto termina com "Peça pelo nosso cardápio online ou pelo WhatsApp".
- ✅ **Atributos (Opções de serviço):**
  - O Google tinha trocado sozinho para "Serve refeição no local". Reafirmamos o valor do dono e salvamos: entrega **Sim**, comida para viagem **Sim**, refeição no local **Não**, drive-through **Não**.
  - **Revisar de tempos em tempos:** o Google altera atributos com base em sugestões de usuários.
- **Categoria "Restaurante":** mantida por decisão do dono.
- ⏳ **Pendente:** conferir o Web Analytics no painel do Cloudflare.

A verificação automática do Search Console via Cloudflare abre um pop-up de autorização. Se ele não abrir, use "Qualquer provedor de DNS" e crie o TXT manualmente no painel (DNS → Registros → Adicionar registro → TXT, nome `@`).

1. **Google Search Console:** adicionar a propriedade de **domínio**, verificar pelo registro TXT no DNS do Cloudflare e enviar o `https://pizzariacabanas.com.br/sitemap.xml`. Pedir a indexação da página inicial.
2. **Bing Webmaster Tools:** importar os dados do Search Console. O Bing alimenta o ChatGPT e o Copilot.
3. **Perfil da Empresa no Google:** trocar o site para `https://pizzariacabanas.com.br/?utm_source=gbp`.
4. **Cloudflare Web Analytics:** ligar. Não usa cookies, então não precisa de aviso de privacidade.

## 4. Acompanhamento
- **Semanal no 1º mês, depois mensal:**
  - **Search Console:** páginas indexadas, consultas, cliques e posição.
  - **Core Web Vitals de campo:** aparecem depois de algumas semanas de tráfego.
  - **Perfil da Empresa no Google:** ligações, rotas e cliques no site.
  - **Cliques por origem:** o `utm_medium` mostra de qual botão saiu cada clique para o cardápio.
- **Trimestral:** atualizar a nota e a quantidade de avaliações e trocar os depoimentos. Rodar `/seo-audit` de novo.
- **Opcional:** Local Falcon, para ver a posição no mapa quadra a quadra no Carandá Bosque.

## 5. Táticas de SEO local que valem para todo ajuste
- O site **reforça** o Perfil da Empresa no Google. O ranking no mapa vem de relevância, distância, avaliações e horário correto.
- Nome, endereço e telefone sempre iguais no site, no Google, no iFood, no MenuDino, no Instagram e no Facebook.
- Bairros e pontos de referência (hotéis e hospitais) **em texto HTML**, numa única página. Nunca criar uma página por bairro ou por hotel (doorway pages).
- Não usar `aggregateRating` no JSON-LD: autoavaliação de negócio local não gera estrelas e pode ser vista como spam. A nota aparece só como texto, com link para o Google.
- O FAQ do JSON-LD não gera mais o destaque nos resultados para restaurantes, mas ajuda o Google e as IAs a entenderem a página.
- Pedir avaliações novas que citem **pizza, sabor e bairro**, para diluir no Perfil da Empresa no Google os temas antigos da churrascaria.
