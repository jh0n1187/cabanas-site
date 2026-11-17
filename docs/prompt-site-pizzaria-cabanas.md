Crie o layout completo do site da **Pizzaria Cabanas**, em Campo Grande–MS. Atue ao mesmo tempo como designer de interfaces, especialista em conversão e redator de SEO local.

Quero uma página visualmente marcante, que dê vontade de pedir pizza e deixe o pedido pelo celular rápido, em poucos toques. Entregue uma proposta visual navegável, com textos reais em português do Brasil, pronta para revisão.

Regra geral: as informações deste documento estão confirmadas pela pizzaria. O que estiver marcado **[CONFIRMAR]** deve aparecer no layout destacado como pendente de revisão. Não invente nada além do que está aqui.

---

## 1. Dados da empresa (use exatamente assim, idênticos ao Google Maps)

A Cabanas trabalha **com delivery e retirada no balcão**. Não há salão nem consumo no local.

- Nome: **Pizzaria Cabanas** (use sempre esta grafia, em todo o site e no código)
- Endereço de referência da operação: Av. Antônio Teodorowich, 119 – Carandá Bosque, Campo Grande–MS, CEP 79032-570
- Coordenadas (Google Maps): -20.4473307, -54.5762186
- Atendimento: terça a domingo, das 18h às 22h45. Segunda: fechado.
- WhatsApp: (67) 99690-9538
- Telefone fixo: (67) 3213-0291
- Cardápio e pedidos (principal): https://cabanaspizzas.menudino.com/
- iFood (opcional, link secundário): https://www.ifood.com.br/delivery/campo-grande-ms/cabanas-pizzaria-caranda-bosque/bbf4cc48-bc25-472c-88c7-6c3fb110c2bf
- Instagram: https://www.instagram.com/pizzariacabanascg/
- Facebook: https://www.facebook.com/pizzariacabanascg/
- Perfil no Google Maps: https://maps.google.com/?cid=16426026712480275371
- Link para avaliar no Google: https://g.page/r/CavbdiRE-PTjEAI/review
- Avaliação no Google: 4,4 com mais de 360 avaliações (atualizar periodicamente)
- Diferencial confirmado: pizzas artesanais de fermentação longa, massa leve e ingredientes selecionados
- Tempo de mercado confirmado: **mais de 5 anos atendendo o Carandá Bosque e região** (use "há mais de 5 anos"; não cite ano de fundação [CONFIRMAR: ano exato, se quiser usar])
- Retirada no balcão: sim, além do delivery
- Pizza meio a meio: sim
- Raio de entrega: até 10 km a partir da pizzaria
- Bairros atendidos (exemplos): Carandá Bosque, Chácara Cachoeira, Vivendas do Bosque e Mata do Jacinto (a taxa para cada endereço aparece no cardápio)

**Proibido:** qualquer referência à antiga churrascaria, buffet, rodízio, salão, reservas, garçons ou atendimento em mesas. Não use o endereço antigo da Rua Vitório Zeola, 747. Não use "venha nos visitar" nem "venha conhecer"; o endereço aparece como referência da operação e local de retirada.

---

## 2. Objetivo e prioridades

- **Ação principal:** "Ver cardápio e pedir", levando ao cardápio oficial (MenuDino).
- **Ação secundária:** "Falar no WhatsApp", usando:
  https://wa.me/5567996909538?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20quero%20pedir%20uma%20pizza.
- O pedido nunca pode estar a mais de um toque de distância: botão no cabeçalho fixo, botões na primeira tela e barra inferior fixa no celular.
- Nada de formulário de contato como etapa obrigatória.
- Quem chega pelo Google está com fome e decide em segundos. A primeira tela precisa responder, sem rolagem: o que é, se é bom, se está aberto e como pedir.

---

## 3. Direção visual

- Paleta: bordô/vermelho profundo, creme e detalhes dourados, em harmonia com a identidade da Cabanas. Entregue os códigos HEX e teste o contraste (WCAG AA).
- As fotos das pizzas são as protagonistas: grandes, apetitosas, com luz quente.
- Títulos com personalidade (serifada ou display) e texto de leitura fácil (sans-serif).
- Contraste forte, espaçamento confortável, botões grandes (mínimo de 48px de altura no celular).
- Mobile-first, adaptado depois para desktop.
- Evite aparência de template genérico, excesso de elementos, carrossel automático e animações que atrasem a navegação.
- Use o logotipo e as fotos reais quando eu fornecer. Enquanto não houver, marque claramente os espaços ("FOTO REAL: pizza de [sabor]"). Não apresente imagens geradas ou de banco como se fossem fotos reais da Cabanas.

---

## 4. Estrutura da página (one-page)

### 4.1 Cabeçalho fixo
Logotipo, navegação curta (Cardápio · Como pedir · Entrega · Dúvidas) e um botão "Pedir" sempre visível. No celular: logo + botão "Pedir", sem menu hambúrguer escondendo o pedido.

### 4.2 Primeira tela (hero)
- Foto principal de uma pizza (placeholder sinalizado).
- **H1:** "Pizzaria delivery no Carandá Bosque, Campo Grande"
- Apoio: "Pizza artesanal de fermentação longa, massa leve e ingredientes selecionados. Escolha no cardápio e peça em poucos toques."
- Selo de prova social: "4,4 no Google · 360+ avaliações", com link para o perfil no Google.
- **Status de funcionamento dinâmico** ("Aberto agora · até 22h45" / "Abre hoje às 18h" / "Fechado hoje · abre terça às 18h"), calculado em JavaScript com o fuso America/Campo_Grande. A informação também precisa existir em texto estático para o Google.
- Dois botões: "Ver cardápio e pedir" (principal) e "Falar no WhatsApp" (secundário).

### 4.3 Diferenciais (faixa curta com ícones)
De 3 a 4 itens lidos em 2 segundos, por exemplo: "Há mais de 5 anos no Carandá Bosque", "Fermentação longa" (massa leve, fácil de digerir), "Meio a meio" e "Delivery ou retirada".
Não invente prêmios, forno a lenha (não usamos mais), tamanhos ou outros processos de produção. O único tempo de mercado permitido é "mais de 5 anos".

### 4.4 Explore o cardápio
- Cards com foto e nome das categorias/sabores que estiverem confirmados no cardápio oficial. Se não conseguir consultá-lo, use cards sinalizados "[CONFIRMAR: sabor + foto]".
- Sabores que aparecem no cardápio e podem servir de referência inicial [CONFIRMAR]: Lombo ao Creme, Bacon, Mozzarela, Portuguesa, Calabresa, pizzas doces.
- Não invente preços, promoções ou "mais pedidos".
- Os botões levam ao cardápio oficial. Não simule carrinho.
- Nome dos sabores em texto HTML (não em imagem) e alt descritivo nas fotos.

### 4.5 Avaliações
- Espaço para 3 depoimentos reais do Google, que eu mesmo vou colar (nome do autor, trecho, link para a avaliação) [CONFIRMAR].
- Botões "Ver todas as avaliações no Google" e "Avaliar a Cabanas".
- Não invente avaliações, nomes, estrelas ou número de clientes.

### 4.6 Sobre a Cabanas
Texto breve (60 a 90 palavras) sobre a pizzaria e o atendimento por delivery e retirada no balcão em Campo Grande, com referência natural ao Carandá Bosque. Use o diferencial da massa de fermentação longa e "há mais de 5 anos atendendo o Carandá Bosque e região". Nada de prêmios, ano de fundação ou dados não confirmados.

### 4.7 Como pedir (3 passos)
1. Acesse o cardápio.
2. Escolha sua pizza e informe o endereço.
3. Confira taxa e prazo e finalize o pedido.
Não prometa prazo de entrega nem frete grátis.

### 4.8 Entrega e atendimento
- Destaque que a operação fica no Carandá Bosque.
- Bloco "Regiões atendidas" com os bairros em texto HTML (é importante para o SEO local): Carandá Bosque, Chácara Cachoeira, Vivendas do Bosque e Mata do Jacinto, mais "e região: consulte seu endereço".
- Oriente o cliente a consultar disponibilidade, taxa e prazo para o seu endereço no cardápio ou no WhatsApp.
- Não diga "entregamos em toda Campo Grande".
- Mapa do Google incorporado com o endereço de referência (carregamento sob demanda, para não pesar a página).
- Retirada no balcão: disponível. Mostre como opção no endereço de referência ("Retire no balcão: Av. Antônio Teodorowich, 119").

### 4.8.1 Hospedado ou acompanhando alguém na região? (confirmado: dentro do raio de 10 km, entrega na recepção)
Bloco curto dentro de "Entrega e atendimento", em texto HTML, para quem está em hotel ou no hospital perto da pizzaria e busca "pizza perto de mim":
- Título sugerido: "Está em um hotel ou no hospital aqui perto? A gente entrega."
- Lista de referências próximas, todas na Av. Mato Grosso, Carandá Bosque: Hospital Unimed Campo Grande, Deville Prime, Novotel Campo Grande, ibis Campo Grande, ibis budget Campo Grande e Carandá Hplus Express.
- Orientação: "Informe o nome do hotel e o número do quarto (ou o nome do paciente e a recepção do hospital) no pedido. A entrega é feita na recepção/portaria."
- Não use logos, não sugira parceria ou convênio, não diga "pizzaria oficial" de nenhum hotel/hospital. Os nomes aparecem só como referência de localização.

### 4.9 Perguntas frequentes (com schema FAQPage)
- A Cabanas atende no salão? Não. Trabalhamos com delivery e retirada no balcão.
- Qual é o horário? Terça a domingo, das 18h às 22h45; segunda fechado.
- Como faço um pedido? Pelo cardápio oficial ou pelo WhatsApp.
- Vocês entregam no meu bairro? Atendemos o Carandá Bosque e os bairros vizinhos, e também entregamos em até 10 km da pizzaria. Confira a disponibilidade e a taxa para o seu endereço no cardápio ou no WhatsApp.
- Qual é a taxa e o prazo de entrega? Aparecem durante o pedido ou podem ser confirmados no WhatsApp.
- Posso pedir pizza meio a meio? Sim, é só escolher os dois sabores no cardápio.
- Posso retirar o pedido? Sim, no balcão da Av. Antônio Teodorowich, 119, Carandá Bosque.
- A Cabanas está no iFood? Sim, mas o cardápio oficial é o canal direto da pizzaria.
- Vocês entregam em hotel ou no Hospital Unimed? Sim, na recepção. Informe o nome do hotel e o quarto, ou o nome do paciente, no pedido.
- Há quanto tempo a Cabanas atende a região? Há mais de 5 anos, no Carandá Bosque e bairros vizinhos.

### 4.10 Rodapé
Nome, endereço de referência, WhatsApp, telefone, horários, Instagram, Facebook, "Avalie a gente no Google" e um novo acesso ao cardápio. Nome, endereço e telefone idênticos aos do topo e aos do Google Maps.

### 4.11 Barra inferior fixa (somente celular)
"Ver cardápio e pedir" + ícone do WhatsApp, sem cobrir o conteúdo (adicione um respiro no fim da página com a altura da barra).

---

## 5. SEO e implementação

- Um único H1. H2 por seção, com termos naturais: "pizzaria em Campo Grande", "pizza delivery", "pizzaria no Carandá Bosque". Sem repetição artificial.
- **Título SEO:** "Pizzaria Cabanas | Delivery no Carandá Bosque, Campo Grande"
- **Meta description** (até 155 caracteres), por exemplo: "Pizza artesanal de fermentação longa com delivery e retirada no Carandá Bosque, Campo Grande–MS. Peça online ou pelo WhatsApp, de terça a domingo."
- Informações essenciais (horário, contato, bairros, sabores) sempre em texto HTML, com o mesmo conteúdo no mobile e no desktop.
- `lang="pt-BR"`, HTML semântico (header, main, section, footer, nav) e links funcionais.
- Imagens em WebP/AVIF com width/height definidos, lazy loading (exceto a do hero) e alt descritivo ("pizza de calabresa da Pizzaria Cabanas, Campo Grande").
- Performance: sem frameworks pesados, fontes com `font-display: swap`, mapa carregado sob demanda. Meta: LCP abaixo de 2,5s no 4G.
- Open Graph e Twitter Card (título, descrição e imagem 1200×630), para o link ficar bonito no WhatsApp.
- Favicon e ícone para celular (espaço para o logo).
- **JSON-LD** `Restaurant` somente com dados confirmados e coerentes com o conteúdo visível: name, address (PostalAddress), geo (as coordenadas da seção 1), telephone, servesCuisine "Pizza", openingHoursSpecification (Tu–Su 18:00–22:45), menu (link do MenuDino), hasMap (https://maps.google.com/?cid=16426026712480275371), sameAs (Instagram, Facebook, iFood) e acceptsReservations false. Não inclua priceRange nem aggregateRating; a avaliação fica só visível na página, com link para o Google.
- No `Restaurant`, inclua também `areaServed` como `GeoCircle` (centro nas coordenadas da pizzaria, `geoRadius` 10000 m) e `potentialAction` (OrderAction) apontando para o MenuDino.
- JSON-LD `FAQPage` para a seção de dúvidas. (Obs.: desde 2023 o Google só mostra FAQ em destaque para sites de governo/saúde; o schema fica porque ajuda o Google e as buscas por IA a entender a página, mas não espere o acordeão nos resultados.)
- Links de pedido com parâmetro de origem para medir o que vem do site: MenuDino com `?utm_source=site&utm_medium=botao` [CONFIRMAR se o MenuDino aceita], WhatsApp com o texto "Vim pelo site".
- URL canônica, sitemap.xml e robots.txt: deixe preparados com placeholder [CONFIRMAR: domínio, sugestão pizzariacabanas.com.br].
- Não crie páginas repetidas por bairro nem prometa primeira posição no Google.

---

## 6. Entrega esperada

1. Layout completo para celular e desktop.
2. Textos finais de cada seção.
3. Botões conectados aos destinos informados.
4. Paleta (HEX), tipografia e orientação de fotografia (ângulos, luz, o que fotografar: pizza inteira, fatia puxando o queijo, caixa de entrega, ingredientes).
5. Breve explicação de como o layout facilita os pedidos.
6. Lista curta do que ainda falta para publicar (fotos reais, logo, depoimentos e domínio).

Comece pela proposta visual. Marque as informações pendentes para revisão e não publique sem a minha aprovação.
