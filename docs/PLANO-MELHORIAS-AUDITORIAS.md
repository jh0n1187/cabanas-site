# Plano de melhorias a partir das auditorias

Histórico iniciado em 17/11/2026, a partir do commit `3320570`.
As primeiras seções registram o diagnóstico e o plano original. Os resultados mais recentes, publicações e limitações estão nas seções 8 a 10.
Objetivo: facilitar pedidos e tornar inequívoca a identidade da Pizzaria Cabanas de Campo Grande–MS.

## 1. Resultados e limitações

| Fonte | Resultado observado | Interpretação |
|---|---|---|
| [PageSpeed mobile](https://pagespeed.web.dev/analysis/https-pizzariacabanas-com-br/8czji7lykd?form_factor=mobile) | 99 desempenho; 100 acessibilidade, boas práticas e SEO; 2/2 navegação agêntica; LCP 2,1 s; TBT 0; CLS 0 | Relatório das 15h57, anterior aos últimos ajustes. Sem dados de campo disponíveis. |
| [SpeedVitals](https://speedvitals.com/report/pizzariacabanas.com.br/jU5uC2) | 94; LCP 3,0 s; TBT 0; CLS 0 | Teste mobile na Carolina do Sul, EUA, com Lighthouse 12.8.2. Não comparar sua nota diretamente com a do Google, que usa outra configuração. |
| [SEOptimer](https://www.seoptimer.com/pizzariacabanas.com.br) | Auditoria ao vivo: A- geral; A+ SEO, GEO e usabilidade; A desempenho; F links; 9 recomendações | O resumo inicial B/F em usabilidade foi substituído pelo resultado ao vivo. A base da ferramenta não encontrou backlinks; isso não prova ausência de qualquer link na internet. |
| [Organicus](https://organicus.ai/pt-BR/analysis/cmwl2kmwr000908l855zb2fx6) | 55/100 geral; visibilidade 0; compreensão 72; conteúdo 85; técnico 100; estrutura 89; presença externa 4 | Uma rodada de 8 perguntas ao ChatGPT, sem histórico de conta. Não é uma avaliação universal de todas as IAs. Relata confusão com homônimos em outras cidades. Parte dos detalhes é paga e não foi acessada. |
| [Yoast](https://yoast.com/tools/seo-checker/) | Aprova título (59 caracteres), descrição (146), headings, alt, canonical, schema, robots e sitemap | Cinco ocorrências apontadas como links quebrados: quatro do mesmo destino iFood (403) e Instagram (429). Distinguir bloqueio ao robô de destino inexistente. |
| [RD Station](https://www.rdstation.com/ferramentas/analise-de-site/) | 40% geral; SEO 6/6; mobile 1/1; velocidade 3/8 | Alertas de servidor, imagens, CDN, JS/CSS de bloqueio e compactação de JS. Aprova cache, compactação HTML e CSS. O questionário de persuasão ainda aparece pendente; não interpretar 40% como nota Lighthouse ou como prova de que o site é lento. |
| [Seobility](https://www.seobility.net/en/seocheck/check/?url=https%3A%2F%2Fpizzariacabanas.com.br%2F&mode=standard) | Sem resultado legível: “No checks left” | Reavaliar quando houver cota ou incorporar o relatório já gerado pelo usuário. Nenhum achado atribuído a essa ferramenta. |

Verificação adicional da versão atual: uma execução de Lighthouse 12.8.2 contra o site público, em 17/11 às 20h05 (America/Cuiaba), retornou 91/100/96/100, LCP 3,0 s, TBT 190 ms e CLS 0. É uma amostra de laboratório; precisa de uma linha de base repetida antes de atribuir regressão a alguma mudança. O erro de console nessa execução foi falha de DNS do Analytics do Cloudflare. Artefato local: `.wrangler/lighthouse-audit-current.json`.

## 2. Ordem de execução

### Etapa 1 — Confirmar acesso, identidade e links

**Impacto na conversão:** neutro na investigação; potencialmente positivo se algum destino estiver de fato incorreto.

1. Conferir indexação atual no Search Console e Bing, diferenciando sitemap enviado, URL descoberta e URL efetivamente indexada. A documentação registra envio e solicitação de indexação, não sua conclusão atual.
2. Deduplicar os destinos do Yoast e testar iFood e Instagram em navegação normal. Se abrem a empresa correta, classificar 403/429 como limitação do verificador; só trocar URLs se o destino estiver comprovadamente errado ou indisponível para clientes.
3. Revisar no Cloudflare os eventos de segurança e o acesso de rastreadores de busca, sem desativar proteções globalmente. O `robots.txt` publicado já permite rastreamento; isso não comprova que todos os bots passaram pela camada de segurança.
4. Confirmar a mesma identidade no site, Perfil da Empresa, MenuDino, iFood, Facebook e Instagram: nome, cidade/UF, endereço, telefone, operação e domínio oficial. Corrigir divergências comprovadas, com autorização antes de editar perfis externos.

**Aceite:** URLs oficiais corretas; status de indexação documentado; nenhuma regra comprovadamente bloqueando o rastreador desejado; divergências de identidade identificadas com evidência.

### Etapa 2 — Otimizar os arquivos e o trabalho inicial da página

**Impacto na conversão:** potencialmente positivo, desde que a qualidade das fotos e a navegação aprovadas sejam preservadas.

1. Medir três execuções mobile consecutivas da mesma versão, com configuração fixa, e guardar a mediana de LCP/TBT/CLS e as imagens efetivamente baixadas. Usar um ponto de teste no Brasil quando disponível e manter o teste dos EUA como comparação separada.
2. Ajustar compressão e seleção responsiva das fotos existentes. O PageSpeed estima 88 KiB de economia, principalmente nos cards Cabanas Gourmet e chocolate com morango. Avaliar um tamanho intermediário no `srcset`, sem obrigar telas de alta densidade a usar imagens pequenas.
3. Tratar o hero separadamente: é a imagem LCP. Já há preload responsivo AVIF e `fetchpriority="high"`; não acrescentar o preload WebP genérico sugerido pelo SpeedVitals, que pode causar downloads redundantes.
4. Avaliar uma versão menor do logo com alpha preservado, sem redesenhar a marca. Otimização de arquivos existentes não inclui produzir as novas fotos, adiadas pelo usuário.
5. Reduzir medições síncronas de layout no início do cabeçalho e do carrossel. Os relatórios apontam reflow; o código lê `scrollY`/`offsetLeft` durante a inicialização. Separar leituras e escritas e avaliar inicialização do carrossel perto da área visível. Preservar rolagem infinita, arrasto e retomada já aprovados.
6. Se imagens mudarem, usar nomes novos e atualizar HTML, preload e referências estruturadas pertinentes, conforme a regra de cache do projeto.

**Arquivos previstos:** `src/index.html`, `tools/build-imagens.mjs` e, se necessário, `tools/logo-transparente.mjs` e imagens geradas.

**Aceite:** redução mensurada de bytes/trabalho de layout; comparação visual aprovada; LCP mobile abaixo de 2,5 s na configuração de referência; TBT < 200 ms; CLS < 0,1; notas >= 90. Separar metas de laboratório de dados de usuários reais, quando estes existirem. Validar 375×667 e 1440×900, âncoras, botões, FAQ, carrossel e estados de funcionamento.

### Etapa 3 — Melhorar descoberta e identificação por assistentes

**Impacto na conversão:** potencialmente positivo para tráfego qualificado. Preservar o caminho curto até o pedido.

1. Reforçar o bloco Sobre existente com a identidade completa em texto claro e respostas diretas, usando somente fatos confirmados. Avaliar uma âncora `#sobre` para esse conteúdo. Não criar uma página separada só porque um detector não reconheceu a seção atual.
2. Revisar o JSON-LD `Restaurant` e sua correspondência com o texto visível. Já existem `@id`, endereço, coordenadas, horário, cardápio, mapa e `sameAs`; não anunciar sua inclusão como correção nova. Acrescentar apenas relações ou fatos úteis realmente ausentes e verificáveis.
3. Conferir os links de volta para o domínio oficial nos perfis já mantidos pela pizzaria e buscar menções locais legítimas, quando houver oportunidade real. Não comprar links em massa nem abrir canais sociais sem capacidade de mantê-los.
4. Testar um conjunto fixo de perguntas com marca/cidade e intenção local: “Pizzaria Cabanas Campo Grande MS”, retirada no Carandá Bosque, horário, cardápio e delivery. Registrar data, assistente, pergunta, referência citada, identificação correta da empresa e clique ao site. Repetir periodicamente, reconhecendo a variabilidade das respostas.
5. Verificar como medir visitas vindas de assistentes e cliques para cardápio/WhatsApp/telefone com as ferramentas existentes antes de introduzir rastreamento adicional.

**Aceite:** identificação correta em consultas de marca monitoradas, dados coerentes nos perfis oficiais e evolução documentada das citações e visitas. Não prometer inclusão em respostas ou prazo para ela acontecer.

## 3. Recomendações que não viram mudanças automáticas

| Alerta | Decisão proposta e motivo |
|---|---|
| RD: CDN ausente | Não confirmado. As respostas públicas verificadas têm `Server: cloudflare`, `CF-Ray` com sufixo `GRU` e `CF-Cache-Status: HIT`; a imagem também tem cache de um ano. Não alterar CDN para satisfazer o detector. A causa exata da classificação do RD não foi demonstrada. |
| RD: servidor lento, bloqueio de CSS/JS e JS sem compactação | Reproduzir antes de corrigir. O build minifica HTML/CSS/JS; há CSS embutido e JS no fim do HTML. Outros relatórios aprovam minificação e não detectam bloqueio relevante. O TBT recente justifica investigar trabalho de layout, sem concluir que falta minificação. |
| SpeedVitals/SEOptimer: redirecionamentos | `http://www...` e `http://...` deram um 301 direto para o HTTPS sem www, seguido de 200. Preservar a canonicalização; testar desempenho diretamente na URL final. |
| Yoast/SEOptimer: nenhum link interno | As ferramentas não contabilizam as âncoras da one-page como páginas internas. A navegação já tem âncoras. Não criar páginas artificiais por bairro nem retirar os links de pedido externos. |
| Yoast: links externos sem nofollow | São destinos oficiais de pedido, contato e perfis. Não aplicar `nofollow` em massa como correção de SEO; avaliar apenas links pagos ou não confiáveis, caso existam. |
| SEOptimer: consistência de palavras-chave | Revisar intenção local e leitura humana. A amostra inclui frases de depoimentos e cópias do carrossel; não transformar “melhor pizza” em alegação da marca nem repetir palavras artificialmente. |
| Organicus: falta página Sobre | Já há uma seção Sobre no HTML. Melhorar a identificação quando necessário; não assumir que uma URL separada garante recomendações por IA. |
| SEOptimer: `llms.txt` | Experimento opcional de baixa prioridade. Sua ausência não prova bloqueio; não substitui HTML, robots, indexação e identidade. Não é requisito especial para AI Overviews/AI Mode do Google. |
| SEOptimer: X, LinkedIn, YouTube e Pixel | Não necessários apenas para aumentar uma nota. Pixel depende de uma estratégia real de anúncios e da análise de privacidade; novos canais exigem propósito e manutenção. |
| SEOptimer: retirar iframe | O iframe é o mapa de localização, com título e carregamento adiado. Manter enquanto não houver evidência de prejuízo concreto à experiência. |
| PageSpeed: cache e JavaScript legado | Os dois avisos identificados vêm do `static.cloudflareinsights.com`. Não é o cache das fotos do site. Avaliar o custo-benefício do Analytics, sem removê-lo só para elevar nota. |

## 4. Distinção entre navegação agêntica e presença em respostas

O 2/2 do PageSpeed indica aprovação nos testes de navegação agêntica executados; não mede a frequência com que assistentes descobrem ou recomendam a pizzaria. O 0/8 do Organicus é uma amostra de menções, não evidência de site inacessível. O SEOptimer ao vivo também deu A+ em GEO. São critérios diferentes, não notas intercambiáveis.

Para ChatGPT Search, conferir acesso do `OAI-SearchBot`; `GPTBot` tem outra finalidade, ligada a treinamento. Não é necessário liberar treinamento para permitir busca. A regra geral do robots atual já permite acesso; mudanças só se surgir um bloqueio concreto em outra camada.

Referências técnicas:

- [OpenAI: rastreadores e suas finalidades](https://developers.openai.com/api/docs/bots).
- [Google: recursos de IA e práticas de SEO](https://developers.google.com/search/docs/appearance/ai-features).
- [Google: dados estruturados de negócios locais](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- [Google: relevância, distância e destaque nos resultados locais](https://support.google.com/business/answer/7091).
- [web.dev: diagnóstico e otimização de LCP](https://web.dev/articles/optimize-lcp).
- [Cloudflare: significado de cache HIT](https://developers.cloudflare.com/cache/concepts/cache-responses/).

## 5. Entrega e revisão

Executar primeiro as confirmações da etapa 1 e a linha de base da etapa 2. Depois, apresentar um lote pequeno de otimizações na prévia local, com comparação de métricas e aparência. Só publicar e fazer push das melhorias quando houver autorização para o lote. As últimas alterações visuais aprovadas já foram publicadas e enviadas em `3320570`.

## 6. Primeiro lote: acesso e identificação — prévia local

Autorizado em 17/11/2026, com revisão local antes de publicar. Não inclui mudanças em perfis externos, regras de segurança do Cloudflare ou otimização de imagens.

### Acesso observado em 17/11 às 20h19 (America/Cuiaba)

| Identificador simulado | Página inicial | robots.txt | Desafio de segurança na resposta |
|---|---|---|---|
| Googlebot | 200 | 200 | Não observado |
| bingbot | 200 | 200 | Não observado |
| OAI-SearchBot | 200 | 200 | Não observado |
| ChatGPT-User | 200 | 200 | Não observado |
| Claude-SearchBot | 200 | 200 | Não observado |
| PerplexityBot | 200 | 200 | Não observado |

O robots servido corresponde ao arquivo local: `User-agent: *`, `Allow: /` e a URL do sitemap. A página inicial entrega HTML com nome, cidade e endereço, sem `X-Robots-Tag` de bloqueio nas respostas examinadas. O sitemap retorna 200 e aponta para a URL canônica.

**Limite:** são requisições com User-Agent simulado a partir desta máquina. Não demonstram acesso a partir dos IPs oficiais dos provedores nem visitas reais, indexação ou futura citação. Eventos de segurança do painel do Cloudflare e status atual do Search Console/Bing não foram auditados neste lote. Sem evidência de bloqueio, o robots e as regras do Cloudflare foram preservados.

### Ajustes locais para revisão

- Seção Sobre com âncora `#sobre`, título identificando Campo Grande–MS e primeiro parágrafo com endereço, bairro, cidade, produto e operação.
- Link no rodapé para essa seção, sem acrescentar etapas ao pedido.
- JSON-LD `Restaurant`: acrescentados `mainEntityOfPage` e `disambiguatingDescription`, com fatos presentes no texto visível. Nome oficial, `@id`, endereço, mapa, contatos, horários e perfis existentes preservados.
- Sem páginas artificiais por bairro, alegações de reconhecimento por IA ou mudanças no FAQ.

Validação local: build concluído; JSON-LD analisado com `JSON.parse`; dados operacionais e FAQ comparados com a versão publicada; verificação sem JavaScript em 375×667 e 1440×900, com identidade legível, âncora Sobre abaixo do cabeçalho, um único H1, ausência de rolagem horizontal e botões de pedido na primeira tela. Revisão visual das duas larguras concluída. Publicação e push deste lote aguardam aprovação.

Referências das propriedades: [mainEntityOfPage](https://schema.org/mainEntityOfPage) e [disambiguatingDescription](https://schema.org/disambiguatingDescription). A segunda descreve diferenças entre entidades semelhantes; seu uso não garante que assistentes deixem de confundir homônimos.

## 7. Pesquisa oficial: visibilidade, compreensão e presença externa

Pesquisa em 17/11/2026. As recomendações abaixo distinguem documentação dos provedores de inferências para a pizzaria. Nenhuma configuração externa foi alterada durante a pesquisa.

### O que as fontes sustentam

| Tema | Evidência oficial | Aplicação para a Cabanas |
|---|---|---|
| ChatGPT Search | A [OpenAI](https://developers.openai.com/api/docs/bots) distingue `OAI-SearchBot` (busca), `GPTBot` (treinamento) e `ChatGPT-User` (acesso solicitado por usuário). Recomenda permitir o rastreador de busca e seus IPs publicados. | Manter o robots atual e conferir no Cloudflare os acessos oficiais. O teste de User-Agent é uma verificação inicial, não prova de rastreamento real. Não confundir liberação de treinamento com elegibilidade na busca. |
| Claude e Perplexity | [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) documenta funções separadas para busca, uso e treinamento. A [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) recomenda permitir PerplexityBot e seus IPs oficiais. | Conferir acesso por provedor, sem liberar todo tráfego que apenas declara um nome de bot. |
| Bloqueios além do robots | O [Cloudflare](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/) documenta que regras WAF anteriores podem bloquear mesmo um bot configurado como permitido no AI Crawl Control. | Revisar os eventos e as regras efetivas antes de qualquer alteração. Corrigir somente um bloqueio comprovado, preservando a segurança dos demais acessos. |
| Conteúdo para IA do Google | O [guia de otimização do Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) recomenda fundamentos de SEO e informação útil para pessoas. Explica que não exige `llms.txt`, divisão artificial em pequenos textos ou schema especial para IA. | Manter a página estática e as informações operacionais claras. O reforço local da seção Sobre é uma melhoria de identidade, não um mecanismo garantido de classificação ou citação. Não gerar artigos genéricos ou páginas por bairro apenas para robôs. |
| Navegação por agentes | O [web.dev](https://web.dev/articles/ai-agent-site-ux) recomenda HTML semântico, ações identificáveis, acessibilidade e estabilidade visual; trata WebMCP como tecnologia em evolução. | Preservar links reais de pedido/contato, headings, estados do FAQ e botões visíveis. O teste 2/2 já é positivo. Não adicionar WebMCP ou um checkout próprio apenas para elevar pontuação: a conclusão do pedido ocorre no MenuDino/WhatsApp. |
| Presença local externa | O [Google Business Profile](https://support.google.com/business/answer/7091?hl=pt-BR) recomenda informações completas e atualizadas; menciona links de outros sites e avaliações entre sinais de destaque local. | Auditar perfis existentes, endereço, operação, horários e link para o domínio oficial. Buscar avaliações autênticas e referências locais relevantes. Isto é evidência para busca local do Google; aplicar a mesma coerência aos assistentes é uma hipótese razoável de identificação, não uma fórmula publicada de ranking do ChatGPT. |
| Medição de citações | O [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) informa citações, páginas citadas e consultas de recuperação nos produtos compatíveis. Não representa todas as IAs nem uma posição universal. | Verificar se o relatório está disponível na propriedade e se já há dados. Acompanhar citações separadamente de visitas e pedidos. |
| Medição de acesso | O [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) mostra operadores, solicitações e ações; parte dos dados de encaminhamento depende de plano pago. | Usar o que estiver disponível na conta, sem contratar ferramentas antes de comprovar a necessidade. Uma visita de crawler não equivale a citação nem a cliente. |

### Ordem revisada para os três indicadores

1. **Acesso e indexação real:** conferir Search Console, Bing e Cloudflare em modo de leitura. Entregar uma matriz com URL indexada ou não, rastreador, acesso/bloqueio observado e regra responsável, quando existir. Logs ainda não disponíveis são uma limitação explícita, não um diagnóstico de bloqueio.
2. **Compreensão da identidade:** revisar a prévia já pronta, com Campo Grande–MS, endereço e operação. Os dados estruturados complementam os fatos visíveis; não criam autoridade sozinhos. Publicar esse lote somente após autorização.
3. **Presença fora do site:** conferir Google Business Profile, Instagram, Facebook, iFood e MenuDino. Registrar URL, domínio vinculado, cidade/endereço, telefone, horários e operação; preparar correções concretas apenas para divergências confirmadas. Priorizar canais existentes, avaliações reais e relações locais pertinentes. Não comprar backlinks nem criar perfis inativos em massa.
4. **Evolução medida:** acompanhar semanalmente consultas fixas com marca + Campo Grande/MS e intenções do bairro. Registrar identificação correta, menção, citação, destino citado e tráfego recebido. Usar relatórios oficiais quando disponíveis. Comparar sempre a mesma pergunta/provedor e registrar variação, sem interpretar o 0/8 inicial como inexistência definitiva da empresa nas IAs.
5. **Desempenho como suporte:** continuar a otimização de imagens e layout em lote separado. Ajuda carregamento e usabilidade; não prometer que isso, isoladamente, aumentará os indicadores de presença externa ou menções por IA.

### O que aplicar e o que não priorizar

- Aplicar: dados locais consistentes, HTML legível sem JavaScript, links de ação claros, rastreamento de busca acessível e conferência dos perfis oficiais.
- Investigar antes: bloqueios no Cloudflare, situação atual de indexação, origem dos links sinalizados como 403/429 e disponibilidade dos relatórios de citações na conta.
- Baixa prioridade/experimental: `llms.txt`, WebMCP e marcações adicionais sem informação nova. Não são substitutos dos itens anteriores.
- Não adotar: avaliações artificiais, menções compradas/disfarçadas, repetição de palavras-chave, alegações de “melhor pizza” pela marca ou promessas de recomendações por assistentes.

A consulta ao antigo link “Publishers and Developers - FAQ” da OpenAI redirecionou para um artigo sem relação com SEO nesta sessão. Por isso, as conclusões sobre acesso se apoiam na documentação oficial de crawlers efetivamente consultada, e não nesse redirecionamento.

### Linha de base anterior às otimizações

Foi preservada uma cópia local da versão anterior às otimizações e executada uma linha de base com três rodadas consecutivas de Lighthouse 12.8.2 em servidor local, sob a mesma configuração. Medianas: desempenho 94, LCP aproximadamente 2,78 s, TBT 146 ms e CLS 0. Esses resultados locais não são intercambiáveis com os relatórios públicos. A conclusão deste lote está registrada abaixo.

## 8. Conferência e melhorias concluídas na prévia — 17/11/2026

### Acesso, indexação e presença externa

| Fonte | Resultado observado | Encaminhamento |
|---|---|---|
| Search Console | Inspeção da página inicial: URL no Google, página indexada e HTTPS válido. Outros relatórios ainda em processamento. | Acompanhar dados após publicação; nenhuma nova solicitação de indexação enviada nesta conferência. |
| Bing | Índice: descoberta, ainda não rastreada. Teste ao vivo: pode ser indexada, sem problemas SEO/GEO detectados e dois tipos de marcação encontrados. | Aguardar processamento. A disponibilidade técnica não equivale à inclusão no índice. |
| Bing AI Performance | Nenhuma citação no período mostrado, encerrado em 16/11, anterior ao lançamento de 17/11. | Não usar esse zero para avaliar o site recém-publicado. |
| Cloudflare AI Crawl Control | 111 solicitações classificadas, 111 permitidas, nenhuma malsucedida; 104 com HTTP 200. Os 33 controles de bloqueio por crawler estavam desligados. | Não foi encontrado bloqueio nesses controles. A classificação inclui possíveis testes próprios de user-agent; não houve validação independente dos IPs nem auditoria completa de todas as regras WAF. |
| Google Maps | Domínio oficial já vinculado; endereço, telefone, delivery e retirada coerentes. | Nenhuma correção necessária no campo de site. |
| Instagram | Identificação de Campo Grande correta; bio ainda diz atendimento exclusivo via delivery e aponta ao Linktree. | Preparar correção da operação e link direto para o domínio, sujeita à aprovação. |
| MenuDino | Cardápio correto; pedido online indisponível. | O proprietário confirmou que a indisponibilidade é intencional. Não tratar como falha nem alterar a operação. |
| iFood | Página real da Pizzaria Cabanas abriu após verificação automática do serviço. | O 403 do auditor não comprova link quebrado. |
| Facebook | Visualização pública informou conteúdo indisponível. | Confirmar o endereço público com o responsável; não remover nem substituir por suposição. |

Nenhuma configuração externa, perfil ou regra de segurança foi alterada. Visitas de robôs não comprovam citações por IA nem pedidos.

Rascunho de bio para o Instagram, para aprovação futura:

> Pizzas artesanais de fermentação longa 🍕  
> Delivery e retirada no Carandá Bosque, Campo Grande–MS  
> Terça a domingo · 18h às 22h45

Campo de site sugerido: `https://pizzariacabanas.com.br/?utm_source=instagram&utm_medium=bio`.

### Imagens e carregamento

- Novas versões AVIF/WebP, preservando as fotografias e os recortes. Comparando AVIF na mesma largura: banner 864 px, 112.458 → 60.160 bytes (47% menor); Cabanas Gourmet 800 px, 107.897 → 48.440 (55%); chocolate com morango 800 px, 81.489 → 37.467 (54%).
- Foram acrescentadas larguras intermediárias e ajustados `srcset`/`sizes` para a seleção conforme tela e densidade. Os 20 arquivos novos foram verificados sem EXIF. Os nomes têm versão para evitar conflito com o cache longo; arquivos antigos permanecem compatíveis com HTML em cache.
- O carrossel só é preparado perto da área visível e suspende a animação fora da tela ou com a aba oculta. O cabeçalho usa observação de interseção para trocar a transparência, mantendo o limite visual aprovado.
- Sem âncora, abrir ou recarregar começa no topo. Com qualquer âncora existente, inclusive nos menus, a seção indicada é respeitada; parâmetros de campanha permanecem na URL.

### Validação local

Três rodadas consecutivas de Lighthouse 12.8.2 antes e depois, sem testes de navegador concorrentes:

| Mediana | Antes | Prévia otimizada |
|---|---:|---:|
| Desempenho | 94 | 98 |
| LCP | 2,78 s | 2,25 s |
| TBT | 146 ms | 0 ms |
| CLS | 0 | 0 |

Acessibilidade, boas práticas e SEO ficaram em 100 nas três rodadas finais. São medições locais de laboratório, sem garantia de pontuação idêntica em produção.

Build e revisão de espaços passaram. Testes funcionais cobriram estados de atendimento, FAQ, retorno suave ao topo, parallax, cabeçalho, carrossel com arraste/retomada/suspensão, todas as âncoras, recarga sem âncora, imagens carregadas e ausência de transbordamento horizontal em telas de 375 a 1440 px com diferentes densidades. As fotos foram comparadas visualmente lado a lado.

Lote aprovado e publicado em 17/11/2026 no Cloudflare Workers, versão `6f70b4b6-1052-4e58-b508-ed7cbbf2e29d`. Na conferência em produção, o HTML corresponde ao build (com a inclusão esperada do Cloudflare Analytics); 31 recursos referenciados carregaram com conteúdo correto; os dois JSON-LD são válidos; robots e sitemap responderam; HTTP/www redirecionaram com 301 e a página inexistente retornou 404. A página respondeu corretamente aos seis identificadores simulados de robôs, o que não valida suas origens por IP. O teste funcional em produção passou para estados de atendimento, FAQ, cabeçalho, retorno suave ao topo e parallax, sem erros de JavaScript.

Próximo passo: repetir os testes públicos comparáveis, registrando data, versão e condições; respeitar cotas dos serviços. Os resultados de presença em IA e backlinks dependem de observação posterior e ações externas, não estão resolvidos apenas pelo código.

## 9. Nova rodada pública após publicar `b83036c` — 17/11/2026

| Teste | Antes | Nova rodada | Observação |
|---|---|---|---|
| [PageSpeed mobile](https://pagespeed.web.dev/analysis/https-pizzariacabanas-com-br/kwrs3c2tqa?form_factor=mobile) | 99 / 100 / 100 / 100; LCP 2,1 s | **100 / 100 / 100 / 100; LCP 0,9 s**, TBT 0 e CLS 0 | Relatório das 21h00, Lighthouse 13.6.0. Sem dados de campo. |
| PageSpeed desktop, mesmo relatório | Quatro categorias em 100 no teste anterior registrado | **100 / 100 / 100 / 100**, LCP 0,5 s, TBT 0, CLS 0,003 | Resultado de laboratório; não equivale a experiência de todos os usuários. |
| Navegação agêntica do PageSpeed | 2/2 | **2/2** em mobile e desktop | Árvore de acessibilidade e estabilidade aprovadas. Não mede frequência de recomendação por IA. |
| [SpeedVitals](https://speedvitals.com/report/pizzariacabanas.com.br/KUpFSc) | 94; LCP 3,0 s; 278,8 KB | **100; LCP 1,1 s; 176,8 KB**, TBT 0 e CLS 0 | Mesmo local, Carolina do Sul/EUA, mobile e Lighthouse 12.8.2. O elemento LCP passou da foto para o texto do hero. Não atribuir toda variação somente à compressão. |
| Yoast | SEO básico aprovado; cinco ocorrências de links externos com 403/429 | Critérios básicos continuam aprovados; reconheceu o novo H2 de Campo Grande–MS; mesmos cinco apontamentos | A URL sem parâmetro reabriu conteúdo antigo; a nova execução usou `?v=auditoria-b83036c`. O canonical apontando para a raiz é esperado nesse teste. Os cinco alertas são quatro repetições do iFood 403 e Instagram 429, não arquivos do nosso site. |
| Organicus | Geral 55; visibilidade 0; compreensão 72; conteúdo 85; técnico 100; estrutura 89; presença externa 4 | **Sem nova nota** | Reenviar o domínio exibiu “JÁ ANALISADO” e reabriu o relatório antigo. Não tratar essas notas como medição do lote publicado. |
| SEOptimer | Geral A-; SEO/GEO/usabilidade A+; desempenho A; links F | **Sem nova nota** | Ao tentar atualizar, informou limite diário gratuito. O relatório visível permaneceu anterior. |
| Seobility | Sem resultado | **Sem resultado** | Continua “No checks left”. |
| RD Station | 40% geral; SEO 6/6; mobile 1/1; velocidade 3/8 | **Relatório aberto de 40%; nova medição não confirmada** | A nova submissão chegou ao formulário de nome/e-mail e comunicação de marketing; não foi preenchido pelo agente. O usuário pediu avaliação com os resultados disponíveis. |

### Robôs e indexação reconferidos

- Search Console: a visão de índice informa página indexada. Novo teste ao vivo, às 21h03: URL disponível para o Google e possibilidade de indexação confirmada. Não foi solicitado novo rastreamento manual nesta rodada.
- Bing: índice ainda em “Discovered but not crawled”. Novo teste ao vivo, às 21h04: **URL can be indexed by Bing**, **No SEO/GEO issues found**, dois tipos de marcação. Não confundir possibilidade técnica com indexação concluída.
- Bing AI Performance: continua sem citações no período encerrado em 16/11, anterior ao lançamento; não há medição posterior suficiente para atribuir evolução às mudanças.
- Cloudflare: os 33 bloqueios individuais continuam desligados. As políticas gerais **Search**, **Training** e **Agents**, e os agentes pessoais configuráveis, estavam em **Allow (do not block)**. Bot Fight Mode e AI Labyrinth estavam desligados. Somente leitura; nenhuma proteção foi alterada.
- O painel registrava 126 solicitações classificadas e nenhuma malsucedida; inclui possíveis simulações nossas. Não comprova visitas verificadas por IP nem citações.
- Às 21h06, simulação de Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot e PerplexityBot: página e robots HTTP 200, sem `X-Robots-Tag` bloqueador nem `cf-mitigated`; identidade presente no HTML e sitemap 200.

### Interpretação dos 40% da RD

O relatório aprova todos os seis critérios de SEO e o de mobile. Em velocidade, aprova cache e compactação de HTML/CSS; reprova resposta do servidor, imagens, CDN, JS/CSS de bloqueio e compactação de JS. O questionário de persuasão continua sem respostas; a nota global não é uma nota isolada de SEO nem uma medida Lighthouse.

Os headers públicos reconferidos mostraram `Server: cloudflare`, `CF-Ray` em GRU, `CF-Cache-Status: HIT`, HTML com `Content-Encoding: br` e imagens com cache de um ano. O build aplica `--minify-css true` e `--minify-js true`. A RD não identifica o recurso exato responsável pela reprovação de JS; portanto, não há causa demonstrada para atribuir o alerta ao nosso código ou ao Analytics. Não substituir CDN nem alterar o conteúdo para satisfazer esse detector.

### Insights concretos que ainda justificaram um lote adicional

- Mobile: economia de imagens estimada caiu de 88 para 36 KiB. Restavam seleção dos cards em telas densas e compressão/seleção do logo. Não forçar imagens pequenas em telas retina somente para zerar a estimativa.
- Desktop: 81 KiB estimados, principalmente brie 1080 px servido num espaço próximo de 573 px e o logo 2x em tela 1x.
- Animação não composta: transição de `box-shadow` no cabeçalho. Substituir por opacidade de uma camada com sombra estática, preservando o efeito.
- Rede e CLS: a fonte DM Sans é descoberta após o HTML; o CLS desktop de 0,003 foi associado à fonte. Antecipar a fonte usada no primeiro texto, sem trocar tipografia.
- Cache de 4 KiB e JavaScript legado de 10 KiB pertencem ao Analytics do Cloudflare. O mesmo script consumiu cerca de 9 ms no teste mobile. Preservado; não remover a medição de tráfego apenas para eliminar alertas.
- Reflow desktop: 31 ms sem atribuição. Precisa de rastreamento antes de responsabilizar um trecho; não foi tratado como bug comprovado.

## 10. Boas práticas garantidas no deploy e lote final publicado

Publicação autorizada pelo proprietário e concluída em 17/11/2026. Versão Cloudflare Workers: `57e9582a-668a-4cbc-8887-8799c5a526c2`.

### Implementação

- Wrangler executa o build automaticamente antes de publicar. O build passa por lint HTML, ESLint e Stylelint com versões fixas e zero avisos; minifica HTML/CSS/JS; depois valida o artefato. Ferramentas de desenvolvimento via npx não entram em produção.
- A validação bloqueia assets ausentes, imagens sem dimensões/alt, fotos secundárias sem lazy/async, iframe sem lazy/título, banner com lazy ou sem prioridade alta, preload divergente, script externo bloqueante, JS/JSON-LD inválido e cache de assets ausente. Cinco casos negativos foram exercitados e bloqueados: arquivo ausente, banner adiado, foto sem lazy, imagem sem dimensões e preload divergente.
- Foto de brie com AVIF/WebP e larguras intermediárias: no desktop de referência, passa de AVIF 1080 px/101.043 bytes para 640 px/29.630 bytes, aproximadamente 71% menos bytes nesse cenário. Telas densas continuam podendo selecionar arquivos maiores.
- Logo transparente com versões 1x/2x em WebP sem perdas: 4.242 bytes na versão 124 px. Os pixels decodificados da versão 248 px são idênticos aos da marca aprovada. Sem redesenho por IA nem troca de cores.
- Cabeçalho mantém a transição aprovada usando opacidade sobre fundo/sombra estáticos. A fonte DM Sans recebe preload. O hero continua prioritário, sem lazy e sem download duplicado.
- Lint também apontou ajustes sem mudança de conteúdo: DOCTYPE, seção nativa do carrossel e agrupamento válido de figure/figcaption na retirada. O telefone mantém os mesmos dígitos e destino `tel:`, com espaços/hífen que evitam quebra de linha.
- Execução do npx no Windows passou a usar o CLI oficial sem shell, resolvendo o aviso do Node e preservando caminhos com espaços.

### Preservação de SEO e experiência

Comparação automatizada com `b83036c`, sem JavaScript: título, metadados, canonical, headings, conteúdo visível, links, alt e JSON-LD preservados; robots e sitemap idênticos. Somente espaços/hífen do telefone foram normalizados na comparação tipográfica. Textos continuam presentes no HTML, sem depender do lazy-load ou de renderização por JS.

Testes em 375 px (densidades 1x/2x), 834 px e 1440 px passaram: CTAs visíveis, ausência de transbordamento, seleção correta do logo e da foto de brie, banner solicitado uma vez e mapa adiado no celular. Comparação visual concluída. Carrossel, arraste/retomada, estados de atendimento, FAQ, rolagem suave e parallax passaram. O lint e a validação foram executados novamente pelo próprio deploy, antes do envio dos assets.

### Conferência após publicar

- HTML publicado igual ao build, exceto inclusão esperada do Analytics pelo Cloudflare.
- 36 assets referenciados conferidos por conteúdo, HTTP 200 e cache de um ano. HTML com Brotli negociado, servidor Cloudflare e cache HIT.
- Página e robots HTTP 200 nos seis User-Agents simulados; sitemap HTTP 200. Mantida a ressalva de que simulação não comprova origem oficial do rastreador nem futuras citações.
- Teste funcional contra produção passou sem erros de JavaScript.
- [PageSpeed final, 21h24](https://pagespeed.web.dev/analysis/https-pizzariacabanas-com-br/ze4503jtp9?form_factor=mobile): **100/100/100/100 e 2/2 agêntico**, tanto no celular quanto no desktop. Mobile: LCP 1,0 s, TBT 0, CLS 0. Desktop: LCP 0,5 s, TBT 0, CLS 0,001. Sem dados de campo disponíveis.
- No desktop, os avisos de entrega de imagens, reflow e animação não composta deixaram de aparecer nessa rodada. No celular, permanece estimativa de 35 KiB de imagens; cache/JS legado continuam associados ao Analytics. O DOM foi listado com 372 elementos, profundidade 10 e máximo de 13 filhos: não justifica remover conteúdo útil de SEO para reduzir uma estatística.

As lições duráveis foram incorporadas ao `AGENTS.md` e ao roteiro `docs/VALIDACAO.md`: validar o artefato realmente enviado, negociar compressão sem forjar headers, distinguir relatório novo de cache e não confundir acesso de robôs com presença em respostas de IA. Nenhuma regra de segurança, perfil externo ou política de robôs foi alterada para aumentar notas.
