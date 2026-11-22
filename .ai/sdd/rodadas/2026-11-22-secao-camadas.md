# Rodada: seção "As camadas" (2026-11-22)

> Nível: N1 (só interface, sem banco)
> Branch: `feat/secao-camadas`, a partir do `main` atualizado | PR em rascunho
> Leia `AGENTS.md` e `.ai/steering/*.md` antes de começar. Testes conforme a skill `pratica-de-testes`.

## Contexto

Hoje a seção de camadas é `src/components/landing/Features.tsx` (4 cards + card largo do Fechamento), usada em `src/pages/Index.tsx`. O Leonardo aprovou uma seção nova que SUBSTITUI essa: o caixa da loja no centro, as 8 camadas em volta e um card com o detalhe da camada escolhida. O mockup aprovado está em `.ai/sdd/rodadas/assets/camadas-mockup.html`. Abra no navegador: ele é a referência visual e de comportamento. O resto da LP não muda.

## Exceção à regra de design

O `AGENTS.md` proíbe mudar o design. Esta rodada é a exceção autorizada, SÓ para a seção nova, que deve seguir o mockup. Nenhuma outra seção, classe global, cor ou token muda.

## Fora do escopo

- Qualquer outra seção, o `index.css` e o `tailwind.config.ts`.
- Apagar `Features.tsx` (fica no repositório sem uso).
- Textos do FAQ e da navbar (o link "Camadas" continua levando a `#funcionalidades`).

## Decisões já tomadas

- D-001: A seção nova fica exatamente onde está a `Features` hoje: entre "Como funciona" e "Fechamento por dentro".
- D-002: A section nova mantém `id="funcionalidades"` (a navbar e o hero apontam para ela).
- D-003: Sem selos de "disponível", "próxima" ou "em breve". A LP vende a ideia; prazo só no FAQ.
- D-004: Texto simples, de dono de loja. Copie os textos abaixo ao pé da letra.
- D-005: Use os tokens da LP no lugar dos hex do mockup: `hsl(var(--zera-emerald))` para o verde (#00e699 no mockup) e as cores de fundo e texto que as outras seções já usam. Rótulos em mono maiúsculo como os das outras seções.

## Tasks (uma por commit)

### T1: Dados das camadas
Crie `src/components/landing/camadas.ts` exportando a lista das 8 camadas (ordem do quadro abaixo), com os campos `nome`, `oQueE`, `zera`, `frase`, `passos` (3 itens), `destaque` e `legenda`. Teste: 8 itens, cada um com 3 passos e todos os campos preenchidos.

| # | nome | oQueE | zera | frase |
|---|---|---|---|---|
| 1 | Fechamento | Resumo do dia | o que você não vê | Todo dia de manhã, chega no seu WhatsApp como foi o dia anterior. |
| 2 | Conferência | Olho no caixa | a diferença no caixa | Você sabe qual caixa está fora do normal. |
| 3 | Recebimento | Nota do fornecedor | o custo errado | A nota que chega vira preço certo no sistema. |
| 4 | Quebra | Perda de perecível | o desperdício | Menos fruta, verdura e carne indo para o lixo. |
| 5 | Acerto | Taxa do cartão | a taxa errada | Confere se a maquininha pagou o que devia. |
| 6 | Classificação | Imposto certo | o imposto a mais | Você não paga imposto a mais por cadastro errado. |
| 7 | Encomenda | Pedido pelo WhatsApp | a venda perdida | O cliente pede pelo WhatsApp e nada se perde. |
| 8 | Freguês | Cliente fiel | o cliente que some | Seu cliente volta mais vezes. |

| # | passos | destaque | legenda |
|---|---|---|---|
| 1 | Quanto vendeu e quanto sobrou de lucro / Se foi melhor ou pior que a semana passada e o ano passado / Só o que precisa da sua atenção | 30 segundos | para saber como foi o dia |
| 2 | Cancelamentos, descontos e sangrias de cada funcionário / Avisa só quando alguém sai do padrão da loja / Chega junto com o resumo da manhã | No dia seguinte | e não no fim do mês |
| 3 | Lê a nota do fornecedor sozinho / Atualiza o custo de cada produto / Sugere o preço de venda | 35% → 18% | Exemplo: foi quanto caiu o lucro do tomate quando o custo subiu e o preço ficou igual |
| 4 | Anota o que estragou em segundos / Sugere baixar o preço antes de estragar / Ajuda a comprar só o que vai vender | 5,64% | do que o hortifrúti vende vira perda nas lojas de bairro (ABRAS, 2025) |
| 5 | Compara cada venda no cartão e no Pix com o que caiu na conta / Avisa quando a taxa veio maior que a combinada / Mostra quanto ainda vai cair e quando | R$ 2.110 por mês | é a taxa média para cada R$ 100 mil vendidos no crédito (Banco Central) |
| 6 | Confere o imposto de cada produto / Na hora de vender e na hora de comprar / Deixa a loja pronta para a reforma tributária | R$ 104 mil | pagos a mais por empresa, em média, por erros assim (e-Auditoria) |
| 7 | O pedido chega organizado / A equipe separa e entrega / Tudo entra no caixa | Nenhum pedido | esquecido no meio das mensagens |
| 8 | Cashback pelo CPF na nota / Avisa quem parou de comprar / Chama de volta pelo WhatsApp | Antes de perder | o cliente, você fica sabendo |

### T2: Componente `CamadasOrbita.tsx`
Reproduza o mockup:
- Cabeçalho: rótulo "As camadas"; título "Tudo o que vaza da sua loja." + segunda linha "Num lugar só." no verde; parágrafo "O Zera trabalha junto com o sistema do seu caixa. Cada camada cuida de um jeito diferente que o dinheiro escapa."
- Órbita: centro com ícone de caixa registradora (lucide `Store` ou equivalente) e "Seu caixa", anéis, halo pulsando, anel tracejado girando, as 8 camadas como pílulas no anel, linha de luz do centro até a camada ativa.
- Card ao lado: "Zera {zera}" (rótulo), nome, oQueE (verde), frase, os 3 passos numerados 01 a 03, e o bloco "O que muda" com destaque e legenda.
- Desktop: órbita à esquerda, card à direita, como no mockup. Mobile (menos de 768px): órbita em cima, card embaixo, órbita escalando para a largura da tela sem cortar nenhuma pílula.

### T3: Comportamento
| Situação | Resultado |
|---|---|
| A seção entra na tela | começa o tour: avança uma camada a cada 4 s, com a barra de progresso no topo do card |
| Seção fora da tela | o tour pausa |
| Nenhum clique ainda | onda de brilho passando pelas pílulas e o convite "Toque em uma camada" abaixo do caixa |
| O visitante toca numa camada | o tour para de vez, a onda e o convite somem, mostra a camada tocada |
| `prefers-reduced-motion` | sem tour, sem giro, sem pulso e sem onda; clique funciona |
| Teclado | as pílulas são botões focáveis com `aria-label` "Ver camada {nome}: {oQueE}" |

Teste com timers falsos: avança após 4 s; o clique para o avanço e mostra a camada certa.

### T4: Troca na página
Em `Index.tsx`, troque `<Features />` por `<CamadasOrbita />` no mesmo lugar. Verificação: `npm run build`, `npm test`, `npm run lint` (só as falhas conhecidas).

## Critérios de aceite
- [ ] A seção nova está entre "Como funciona" e "Fechamento por dentro", com `id="funcionalidades"`
- [ ] Os 8 textos batem com os quadros acima, sem travessão
- [ ] Tour, pausa fora da tela, onda, convite e parada no clique funcionam
- [ ] Sem nenhum corte de pílula em 390px e 1440px
- [ ] Nenhuma outra seção mudou
- [ ] Preview do zera-lp no ar

## Ritmo de execução
- Reformule os requisitos em 5 linhas e pergunte o que estiver ambíguo antes de codar.
- Branch nova, PR em rascunho, um commit por task, push ao fim de cada task.
- Nunca toque em produção. Não faça merge.
- Pare só se: decisão de produto não escrita aqui; algo exigir produção; CI vermelho fora do conhecido; ambiguidade não coberta.

## Relatório final
Por task: Alegação / Comando / Exit code / Resumo / Veredito. Depois: URL do preview do zera-lp e roteiro de aceite.
