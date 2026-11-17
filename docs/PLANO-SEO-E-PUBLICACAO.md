# Pizzaria Cabanas: plano de SEO e publicação do site

Atualizado em 17/11/2026. Base: `docs/prompt-site-pizzaria-cabanas.md` (prompt para o Claude Design) + skill `claude-seo` (seo-plan, template "local-service").

---

## 1. Diagnóstico

- **Tipo:** negócio local, delivery + retirada no balcão, sem salão. Decisão em segundos, quase tudo pelo celular. Conversão = clique em "Ver cardápio" (MenuDino), WhatsApp ou ligação.
- **Hoje:** não há site. A presença orgânica vem do **Perfil da Empresa no Google (GBP)**, 4,4 com 360+ avaliações, além do iFood e do Instagram.
- **Ponto central:** para "pizzaria perto de mim" e "pizza delivery Carandá Bosque", quem decide o ranking é o **mapa (local pack)**, não o site. Os fatores são relevância, distância, avaliações e horário de funcionamento. Segundo o Whitespark 2026, "estar aberto na hora da busca" passou a ser um dos 5 principais fatores. O site serve para **reforçar o GBP**: dá mais relevância, confirma os dados (nome, endereço e telefone) com schema e converte quem clica em "Site".
- **Concorrência no bairro:** a busca encontrou a Faiete Pizzaria (Av. Hiroshima, 711, Carandá Bosque, aberta em 2022). As outras pizzarias que apareceram são de outros bairros ou são redes. Sem acesso a dados pagos (DataForSEO), a concorrência real do mapa deve ser medida com geo-grid (ver seção 5).

## 2. Informações novas que entram no site

| Informação | Onde entra | Status |
|---|---|---|
| **Há mais de 5 anos atendendo o Carandá Bosque e região** | Diferenciais, Sobre, FAQ, descrição do GBP | Já incluída no prompt |
| **Polo de hotéis + hospital na Av. Mato Grosso** (lista abaixo) | Bloco 4.8.1 "Hospedado ou acompanhando alguém na região?" + FAQ | Incluída no prompt, falta confirmar a operação |

### Pontos de venda próximos (todos na Av. Mato Grosso, Carandá Bosque)

| Local | Endereço | Por que importa |
|---|---|---|
| Hospital Unimed Campo Grande (+ maternidade e laboratório no mesmo terreno) | Av. Mato Grosso, 4566 | Acompanhantes e plantonistas à noite, ponto com ampliação em andamento |
| Deville Prime Campo Grande | Av. Mato Grosso, 4250 | Hóspede corporativo, jantar no quarto |
| Clínica Orthos | Av. Mato Grosso, 4324 | Equipe de plantão/clínica (menor potencial) |
| Carandá Hplus Express (antigo Transamérica Fit, 102 aptos) | Av. Mato Grosso, 4903 | **Não estava na sua lista**, hotel econômico sem restaurante forte |
| ibis Campo Grande | Av. Mato Grosso, 5513 | Hotel econômico, sem jantar completo |
| Novotel Campo Grande | Av. Mato Grosso, 5555 | Corporativo |
| ibis budget Campo Grande | Av. Mato Grosso, 5617 | **Não estava na sua lista**, hóspede econômico, perfil delivery |
| Grand Park Hotel | Av. Afonso Pena, 5282 (perto do Shopping Campo Grande) | Um pouco mais longe, confirmar se fica na área de entrega |

Endereços tirados de sites de reserva e de guias. Confirme no Google Maps antes de publicar.

**Como usar no SEO (sem cair em spam):**
1. **No site:** um bloco curto em texto HTML que cita os locais como referência de localização (já está no prompt). Isso ajuda em buscas como "pizza perto do hospital unimed campo grande" e "delivery perto do ibis campo grande". **Não** crie uma página por hotel: seriam páginas com pouco conteúdo, e o Google trata isso como "doorway page".
2. **No GBP:** publicar posts como "Entregamos no seu hotel na Av. Mato Grosso" e pôr uma frase na descrição.
3. **Fora do digital (a parte que mais dá retorno):** deixar cartão/QR code com a recepção e o concierge dos hotéis e com a recepção/lanchonete do hospital. O QR aponta para `site/?utm_source=hotel-ibis` etc., para medir a origem dos pedidos. Converse antes com cada hotel, porque alguns têm restaurante próprio e não divulgam concorrentes.
4. **Operação [CONFIRMAR com a pizzaria]:** entregam nesses locais? Só na recepção? O hospital libera a entrada do entregador depois das 22h? Sem isso, o bloco não vai ao ar.

## 3. Revisão do prompt: o que ajustei e o que falta

**Ajustado em `docs/prompt-site-pizzaria-cabanas.md`:**
- "Mais de 5 anos" agora é dado confirmado. Antes o prompt proibia citar tempo de mercado.
- Novo bloco 4.8.1 (hotéis e hospital), com regras para não sugerir parceria nem usar logos.
- 2 perguntas novas no FAQ (hotel/hospital, tempo de mercado).
- Schema: `areaServed` com os bairros e `potentialAction` (OrderAction) apontando para o MenuDino.
- Aviso: desde 2023 o Google não mostra FAQ em destaque para restaurantes. O schema continua porque ajuda o Google e as buscas por IA a entender a página.
- UTM nos links de pedido, para medir os pedidos que vêm do site.

**Pendências antes de publicar:**
- [x] Mesa no local: **não há** (confirmado em 17/11/2026). A loja tem só recepção e retirada no balcão, além do delivery. O "balcão/mesa" do painel Raio-X é apenas o tipo de venda no sistema.
- [ ] Fotos reais (hero, 4–6 sabores, caixa) e logo em alta (SVG ou PNG transparente).
- [ ] 3 depoimentos reais do Google.
- [x] Entrega em hotéis/hospital: **sim**, raio de entrega de até 10 km a partir da pizzaria, com entrega na recepção (confirmado em 17/11/2026). No site e no GBP, o foco fica no entorno próximo (Carandá Bosque, bairros vizinhos e o polo da Av. Mato Grosso). Os 10 km aparecem só como apoio. Na área de serviço do GBP, listar os bairros mais próximos. O Grand Park Hotel (Av. Afonso Pena) fica de fora do site.
- [ ] Sabores confirmados do MenuDino.
- [ ] Domínio (seção 4).

## 4. Publicação: infraestrutura

| Item | Recomendação | Custo |
|---|---|---|
| Domínio | **pizzariacabanas.com.br** (registro.br). A consulta RDAP de hoje indicou que está livre, assim como cabanaspizzas.com.br. Registre também o segundo e redirecione para o primeiro | ~R$ 40/ano cada |
| Formato | HTML/CSS/JS estático, uma página só, sem framework. É o mais rápido possível (LCP < 2,5 s) | — |
| Hospedagem | **Cloudflare Pages** (grátis, CDN com presença no Brasil, HTTPS automático). Alternativas: Netlify ou Vercel | R$ 0 |
| E-mail (opcional) | contato@ redirecionando para o Gmail (Cloudflare Email Routing, grátis) | R$ 0 |
| Analytics | Google Analytics 4 com eventos de clique em Cardápio/WhatsApp/Telefone, **ou** Cloudflare Web Analytics (sem cookies e sem banner de consentimento). Para um site tão simples, Cloudflare + Search Console bastam | R$ 0 |

**Fluxo:** Claude Design gera o layout → aprovação → código estático aqui na pasta `site/` → auditoria local com a skill claude-seo → publicação no Cloudflare Pages com URL de teste → aprovação → apontar o domínio.

## 5. Ferramentas para pontuar e criticar o SEO

### Já disponíveis aqui (plugin claude-seo, o mesmo do claudeseoskill.com)
| Skill | Uso | Quando |
|---|---|---|
| `/seo-audit <url>` | Auditoria completa com nota geral (técnico, conteúdo, schema, performance, local, GEO) | Na URL de teste e depois de publicar |
| `/seo-local` | Perfil no Google, consistência de nome/endereço/telefone, citações, avaliações, schema local | Antes e depois da publicação |
| `/seo-schema` | Valida o JSON-LD Restaurant + FAQPage | Depois do código |
| `/seo-technical`, `/seo-page` | Rastreamento, metatags, Core Web Vitals | Depois do código |
| `/seo-geo` | Prontidão para ChatGPT, Perplexity e AI Overviews | Depois do código |
| `/seo-maps` | Ranking no mapa por geo-grid | Exige DataForSEO (pago), opcional |
| `/seo-drift` | Linha de base e alertas de regressão a cada alteração | Depois de publicar |

### Externas, gratuitas (obrigatórias)
- **Google Search Console:** indexação, termos buscados, envio do sitemap. É a principal ferramenta.
- **Perfil da Empresa no Google (GBP):** colocar o link do site, conectar o WhatsApp e acompanhar o relatório de Desempenho (ligações, rotas, cliques no site).
- **PageSpeed Insights / Lighthouse:** nota de performance, acessibilidade e SEO (meta ≥ 90 no celular).
- **Teste de pesquisa aprimorada do Google + Schema.org Validator:** valida o JSON-LD.
- **Bing Webmaster Tools:** importa do Search Console. O Bing alimenta o ChatGPT e o Copilot.
- **Ahrefs Webmaster Tools (grátis):** auditoria e backlinks do próprio site.
- **WAVE:** acessibilidade.
- **Google Trends / Planejador de palavras-chave:** volume de "pizzaria campo grande", "pizza delivery".

### Externas, pagas (opcionais, para medir o mapa)
- **Local Falcon** ou **BrightLocal:** mapa de calor mostrando em que posição a Cabanas aparece em cada quadra do Carandá Bosque, Chácara Cachoeira etc. É a métrica que reflete a venda. Alguns US$/mês, dá para fazer uma medição antes e outra 90 dias depois.

## 6. Cronograma

### Fase 1, Fundação (semanas 1–3)
- Resolver as pendências da seção 3 (fotos, depoimentos, confirmações).
- Rodar o Claude Design com o prompt revisado e aprovar o layout.
- Codificar a página estática, com schema, sitemap, robots, Open Graph e favicon.
- Auditoria local (`/seo-audit`, `/seo-schema`, PageSpeed) e correções.
- Registrar o domínio e publicar no Cloudflare Pages.
- Search Console + Bing + analytics; enviar o sitemap.

### Fase 2, Perfil e citações (semanas 3–8)
- **GBP:** link do site com UTM (`?utm_source=gbp`), categoria principal "Pizzaria" + secundárias "Serviço de entrega de pizza" e "Pizza para viagem". No GBP, marque "Entrega" e "Retirada" e desmarque "Consumo no local", descrição com "há mais de 5 anos" e Carandá Bosque, horários e feriados sempre atualizados, 10+ fotos reais, WhatsApp conectado, 1 post por semana.
- **Consistência do nome/endereço/telefone:** grafia idêntica no iFood, MenuDino, Instagram, Facebook, Apple Maps (Apple Business Connect), Bing Places, Waze e TripAdvisor. **Conferir se o endereço antigo (R. Vitório Zeola, 747) ainda aparece** em algum desses lugares e corrigir.
- Cartões com QR nos hotéis e no hospital (seção 2).

### Fase 3, Avaliações e conteúdo (meses 2–6)
- Pedir avaliação no Google com cartão na caixa e mensagem pós-pedido no WhatsApp (pedir que citem o bairro e o sabor, de forma natural). Responder todas as avaliações.
- Trocar os depoimentos do site a cada trimestre.
- Tentar entrar em listas "melhores pizzarias de Campo Grande" (Campo Grande News/Lado B, guias). Segundo o Whitespark 2026, presença nessas listas é o principal fator de visibilidade nas IAs.

### Fase 4, Manutenção (meses 6–12)
- Revisão mensal: Search Console, desempenho do GBP, `/seo-drift`.
- Atualizar a nota/quantidade de avaliações no site a cada trimestre.

## 7. Metas

| Métrica | Hoje | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Site indexado (Search Console) | — | 100% | 100% | 100% |
| PageSpeed celular | — | ≥ 90 | ≥ 90 | ≥ 90 |
| Cliques no site via GBP/mês | ver GBP | linha de base | +30% | +60% |
| Cliques em "Cardápio"/WhatsApp vindos do site | 0 | linha de base | +25% | +50% |
| Avaliações no Google | 360+ | +30 | +70 | +150 |
| Top 3 no mapa para "pizzaria" no Carandá Bosque (geo-grid) | medir | medir | melhorar | manter |

As metas de crescimento são referências, não promessas. Acompanhe junto os pedidos com UTM e o código "Vim pelo site" no WhatsApp, para cruzar com o painel Raio-X.

## 8. Riscos

- **Dados divergentes** (horário, endereço antigo) entre GBP, site e iFood derrubam a confiança do Google. Por isso a revisão de consistência entra na Fase 2.
- **Páginas por bairro ou por hotel:** não criar (são doorway pages).
- **Avaliações falsas ou compradas:** nunca. O Google remove e pode suspender o perfil.
- **Hospital:** regras de entrada podem impedir a entrega. Não anunciar antes de confirmar.
