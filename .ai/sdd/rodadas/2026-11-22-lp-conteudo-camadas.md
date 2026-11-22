# Rodada: LP com a tese e as camadas (2026-11-22)

> Nível: N1 (só conteúdo, sem banco)
> Branch: `feat/lp-conteudo-camadas` | PR em rascunho
> Leia `AGENTS.md` e `.ai/steering/*.md` antes de começar. Testes conforme a skill `pratica-de-testes`.

## Contexto

A LP atual fala do conceito antigo do Zera (desperdício, ONGs, ESG, tokens). O Zera agora é o ecossistema de camadas em volta do PDV (ver `.ai/steering/product.md`). Esta rodada troca o CONTEÚDO da página. O design atual foi aprovado e fica exatamente como está. Backup da versão atual fora do repo: `lp-zera/BACKUP-LP-zera-eco-2026-11-22`.

## Regra principal

Mude só texto, números, links/âncoras, o vídeo e a lógica da calculadora. Nenhuma classe, cor, espaçamento, animação, layout, ícone (salvo os dois citados), ordem ou quantidade de elementos muda. Se um texto não couber, pare e pergunte; não ajuste o layout.

## Fora do escopo desta rodada

- `DemoModal.tsx` (campos e textos do formulário): mudam na próxima rodada, junto com banco e /admin.
- `src/pages/Admin.tsx` e tudo em `supabase/`: próxima rodada.
- `src/index.css`, `tailwind.config.ts`, qualquer estilo.
- Componentes que não estão em `Index.tsx` (Hero.tsx, CTA.tsx, Security.tsx etc.): não mexer.
- Renomear componentes ou arquivos.

## Decisões já tomadas

- D-001: Saem o modal de ONG e o de investidor, com links e providers. Apague `ONGModal.tsx`, `InvestorModal.tsx`, `use-ong-modal.tsx`, `use-investor-modal.tsx` depois de remover todos os usos.
- D-002: Todo botão de CTA passa a se chamar "Quero testar" e abre o modal de contato atual (`useDemoModal`).
- D-003: Números da página só com fonte e ano visíveis, como escritos abaixo.
- D-004: A calculadora não promete recuperação. Mostra quanto está em jogo.
- D-005: Os ids de seção existentes ficam. Só a calculadora ganha `id="calculadora"` (com `scroll-mt-20`, igual às outras âncoras).

## Tasks (uma por commit, nesta ordem)

### T1: Remover ONG e investidor
- `Navbar.tsx`, `Features.tsx`, `Index.tsx`: sem nenhuma referência a ONG ou investidor.
- Apagar os 4 arquivos da D-001.
Verificação: `grep -rniE "ong|investor|investidor" src/components/landing src/pages/Index.tsx src/hooks` sem resultado (ignore palavras como "longo" se aparecerem; nenhuma referência ao conceito), `npm run build`.

### T2: Navbar, Hero e vídeo
Navbar (`Navbar.tsx`, desktop e menu mobile):

| Item | Texto | Destino |
|---|---|---|
| Link 1 | Camadas | `#funcionalidades` |
| Link 2 | Como funciona | `#ecossistema-esg` |
| Link 3 | Dúvidas | `#faq` |
| Link 4 (o destacado em verde, mesmo estilo) | Calculadora | `#calculadora` |
| Login | mantém como está | |
| Botão | Quero testar | abre `useDemoModal` |

Hero (`GenesisHero.tsx`):
- Rótulo: Gestão para o pequeno comércio
- Título linha 1: Zera o que vaza
- Título linha 2 (no span com gradiente): da sua loja.
- Parágrafo: Toda manhã, no seu WhatsApp, o resumo de ontem: vendas, margem e caixa, comparados com o mesmo dia da semana passada, do mês passado e do ano passado. Funciona com o sistema de caixa que você já usa.
- Botão: Quero testar
- Link ao lado: Ver as camadas (destino `#funcionalidades`)
- Número: R$ 1 a cada R$ 61 / legenda: Perdido em vendas pelo varejo em 2025 (Abrappe)
- Vídeo: copie `.ai/sdd/rodadas/assets/zera-fechamento.mp4` para `public/video-fechamento.mp4` e troque o `src` do vídeo no GenesisHero. NÃO apague nem sobrescreva `public/video.mp4`.

`index.html`: title "Zera | Zera o que vaza da sua loja"; description, og:title, og:description e twitter:description com "Resumo diário de vendas, margem e caixa no seu WhatsApp. Funciona com o sistema de caixa que você já usa." Remova o comentário TODO do og:title.

Verificação: `npm run build`, `ls public/video.mp4 public/video-fechamento.mp4`.

### T3: Faixa rolante e Problema
`SocialProof.tsx`: título "Feito para o balcão". As 8 tags, na ordem, mantendo os ícones atuais na mesma ordem: Sem trocar o seu PDV; Primeiro conector: VR System; Só leitura dos dados; Resumo às 6h no WhatsApp; Comparativo por dia da semana; Alertas de caixa por operador; Margem por produto; Mensalidade fixa.

`Problem.tsx`:
- Rótulo: O problema
- Título linha 1: O dinheiro da loja não some de uma vez.
- Título linha 2 (span branco 40%): Ele vaza todo dia.
- Parágrafo: O caixa fecha e o sistema registra tudo, mas ninguém tem tempo de olhar. Enquanto isso, a fruta passa do ponto, a taxa do cartão vem diferente do combinado e o custo do produto fica velho no cadastro.
- Itens com bolinha: Os números estão no PDV, mas ninguém olha todo dia / Quebra, taxa errada e imposto a mais não aparecem no extrato / O dono só descobre o problema no fim do mês

| Card | Valor | Legenda |
|---|---|---|
| 1 | R$ 42,1 bi | Perdidos pelo varejo brasileiro em 2025 (Abrappe) |
| 2 | 5,64% | Do faturamento de hortifrúti vira perda na loja de vizinhança (ABRAS, 2025) |
| 3 | R$ 104 mil | Pagos a mais em impostos por empresa, em média, de 2018 a 2023 (e-Auditoria) |

Verificação: `npm run build`.

### T4: Como funciona e Camadas
`ESGPillars.tsx` (mantenha ícones, cores e o id):
- Rótulo: Como funciona
- Título: "Três passos." + span verde "Nenhuma troca de sistema."
- Parágrafo: O Zera se conecta ao PDV que a loja já usa, só para ler. A rotina do caixa não muda.

| Card | title | highlight | label | text |
|---|---|---|---|---|
| 1 | Conecta | 01 | Só leitura | O conector é instalado no computador da loja e lê vendas, custos e eventos de caixa. Nada é alterado no seu sistema. |
| 2 | Organiza | 02 | Toda noite | Depois que a loja fecha, o Zera organiza o dia: vendas, margem por produto, cancelamentos, descontos e sangrias por operador. |
| 3 | Avisa | 03 | Às 6h | Você acorda com o resumo no WhatsApp e só o que precisa da sua atenção. Quer o detalhe? Abre o painel. |

Rodapé dos cards ("Protocol Active"): Incluso no Fechamento.

`Features.tsx` (4 cards + card largo, mesma estrutura, mantenha ícones e cores):
- Rótulo: As camadas
- Título linha 1: Uma camada para cada
- Título linha 2 (span gradiente itálico): vazamento.

| Card | label | title | copy |
|---|---|---|---|
| 1 | Zera o desperdício | Quebra | Registra a perda do perecível, sugere o preço do dia e ajusta a compra para você não comprar o que vai estragar. Em breve. |
| 2 | Zera a taxa errada | Acerto | Confere cada venda no cartão e no Pix contra o que caiu na conta. Taxa diferente do contrato vira alerta. Em breve. |
| 3 | Zera o imposto a mais | Classificação | Revisa o cadastro fiscal de cada produto, na venda e na compra, e prepara a loja para a reforma tributária (CBS e IBS). Em breve. |
| 4 | Zera o custo velho | Recebimento | O XML da nota vira produto e custo atualizado no cadastro, com o preço sugerido pelo seu markup. Próxima camada. |

Card largo:
- Rótulo: Disponível primeiro
- Título: "Fechamento." + span branco 40% itálico "O copiloto do dono."
- Parágrafo: Vendas, margem e caixa do dia anterior no seu WhatsApp, comparados com o mesmo dia da semana. Zera o ponto cego e a diferença de caixa: cancelamentos, descontos e sangrias fora do padrão aparecem por operador.
- Botão: Quero testar (abre `useDemoModal`)
- Pílula: Resumo às 6h no WhatsApp

Verificação: `npm run build`.

### T5: Fechamento por dentro
`TwoWorlds.tsx` (fundo, cards e animações iguais):
- Pílula: Fechamento por dentro
- Título linha 1: Como foi ontem,
- Título linha 2 (span branco 40% itálico): em 30 segundos.
- Parágrafo: Um exemplo do resumo que chega às 6h. Dados fictícios do Mercado Exemplo.
- Stats (o componente mostra só as 2 primeiras palavras do label; use labels de 2 palavras): valor "3" / label "comparativos diários"; valor "6h" / label "no WhatsApp".

| Card | title | value | progress | subtitle |
|---|---|---|---|---|
| 1 | Vendas de sábado | R$ 18.420 | 75 | +11% contra o mesmo sábado de 2025 |
| 2 | Margem bruta | 27,4% | 45 | Hortifrúti puxou a margem para baixo |
| 3 | Caixa | 2 alertas | 90 | Cancelamentos acima do padrão no caixa 3 |

- "Protocol v4.2": Exemplo
- Texto vertical decorativo: VENDAS . MARGEM . CAIXA

Verificação: `npm run build`.

### T6: FAQ
`FAQ.tsx`: remova o uso e a importação de `ConversionJourneyVertical` (não apague o arquivo). Subtítulo: Clique em uma categoria para ver as respostas.

Categoria "Como funciona" (ícone Settings):
1. Preciso trocar meu sistema de caixa? / Não. O Zera se conecta ao PDV que você já usa e só lê os dados. A rotina do caixa continua igual.
2. Quais sistemas funcionam? / Começamos pelo VR System. O Hiper vem em seguida. Se a sua loja usa outro sistema, fale com a gente.
3. Vou ter que aprender um sistema novo? / Não. O principal chega no WhatsApp, todo dia às 6h. O painel existe para quando você quiser ver o detalhe.
4. Serve para padaria, açougue e hortifrúti? / Sim. O Zera foi feito para o pequeno comércio: mercadinho, padaria, açougue, hortifrúti e lojas parecidas.

Categoria "Seus dados" (ícone ShieldCheck):
1. O Zera mexe nos dados da minha loja? / Não. O acesso é só de leitura. Ele não altera preço, estoque nem venda.
2. Quem vê os números da minha loja? / Só você e quem você autorizar.
3. De onde vêm os números desta página? / De pesquisas públicas da Abrappe, da ABRAS, do Banco Central e da e-Auditoria. A fonte de cada um aparece junto do número.

Categoria "Preço e começo" (ícone DollarSign):
1. Quanto custa? / Mensalidade fixa, sem porcentagem sobre as vendas. O valor depende das camadas que você contratar.
2. Como eu começo? / Clique em Quero testar, conte um pouco da sua loja e a gente chama você no WhatsApp.
3. As outras camadas já existem? / Ainda não. O Fechamento vem primeiro e as outras chegam em sequência, começando pelo Recebimento. Depois vêm Quebra, Acerto, Classificação, Encomenda (pedido por WhatsApp e delivery) e Freguês (fidelidade e cashback pelo CPF na nota).
4. E se eu tiver mais de uma loja? / Cada loja tem o seu resumo, e você vê todas no mesmo painel.

Perguntas sem o número na frente (o texto atual tem "1.", "2."...; o novo não tem). Verificação: `npm run build`.

### T7: Calculadora
Crie `src/lib/calculadora.ts` com uma função pura e teste antes (TDD):

```ts
calcularVazamento(faturamentoMensal: number, percentualCartao: number)
// retorna { perdaAnual, taxasAnuais, totalAnual }
// perdaAnual  = faturamentoMensal * 0.0239 * 12
// taxasAnuais = faturamentoMensal * (percentualCartao / 100) * 0.018 * 12
// totalAnual  = perdaAnual + taxasAnuais
```

| Entrada (faturamento, % cartão) | perdaAnual | taxasAnuais | totalAnual |
|---|---|---|---|
| 150000, 60 | 43020 | 19440 | 62460 |
| 0, 60 | 0 | 0 | 0 |
| 100000, 0 | 28680 | 0 | 28680 |
| 100000, 100 | 28680 | 21600 | 50280 |

`LeadCapture.tsx` (mesma estrutura visual), com `id="calculadora"` e `scroll-mt-20` na section:
- Rótulo: Calculadora
- Título linha 1: Quanto está vazando
- Título linha 2 (span gradiente): da sua loja?
- Parágrafo: Dois números que você sabe de cabeça. A conta usa índices públicos de mercado.
- Entrada 1: label "Faturamento mensal", valor inicial 150000.
- Entrada 2 (a régua): label "Vendas no cartão", min 0, max 100, passo 5, inicial 60; a pílula mostra "{n}%"; legendas embaixo "0%" e "100%".
- Resultado 1: cabeçalho "Perda estimada", valor `perdaAnual` em BRL, legenda "Por ano. Varejo alimentar: 2,39% (Abrappe)".
- Resultado 2 (troque o ícone Leaf por CreditCard do lucide, mesmo tamanho e classes): cabeçalho "Taxas de cartão", valor `taxasAnuais` em BRL, legenda "Por ano. Taxa média: 1,80% (Banco Central)".
- Destaque largo: cabeçalho "Em jogo por ano", valor `totalAnual` em BRL, texto "Dinheiro que o Zera ajuda a enxergar e conferir.", botão "Quero testar".

Verificação: `npm test` (com o teste novo), `npm run build`.

### T8: Footer
`Footer.tsx`:
- Contato 1: atendimento@zera.eco.br (mantém)
- Contato 2: São Paulo, Brasil
- Contato 3: Só leitura dos dados da sua loja
- Assinatura: © 2026 Zera
- Remova o selo "Operational" (o bloco com a bolinha pulsando). É a única remoção de elemento visual desta rodada.

Verificação: `npm run build`.

## FAQ de Implementação

**Q-001: Um texto novo quebra linha diferente do antigo. Ajusto o layout?**
R: Não. Quebra de linha natural é aceita. Se algo transbordar ou sobrepor, pare e relate.

**Q-002: Os ícones dos cards combinam pouco com o texto novo. Troco?**
R: Não. Só os dois ícones citados mudam (CreditCard na calculadora; ShieldCheck e DollarSign nas categorias do FAQ).

**Q-003: Posso apagar componentes não usados (Hero.tsx, CTA.tsx...)?**
R: Não nesta rodada.

**Q-004: O texto tem travessão em algum lugar?**
R: Não pode ter. Confira com `grep -rn "—\|–" src/components/landing src/pages/Index.tsx index.html`.

**Q-005: O modal de contato ainda pede "E-mail corporativo" e "Volume de lojas". Mudo?**
R: Não. Fica para a próxima rodada (tem banco envolvido).

## Critérios de aceite da rodada

- [ ] Nenhuma menção a ONG, investidor, ESG, token, MRV, blockchain, ISO, carbono ou doação nas seções da LP e no index.html
- [ ] Todos os CTAs dizem "Quero testar" e abrem o modal de contato
- [ ] Navbar leva às 4 seções corretas, no desktop e no mobile
- [ ] Hero toca `video-fechamento.mp4`; `public/video.mp4` continua existindo
- [ ] Calculadora com 150.000 e 60% mostra R$ 43.020, R$ 19.440 e R$ 62.460
- [ ] Diff visual: só texto, o vídeo, o ícone da calculadora e o selo do footer mudaram
- [ ] Nenhum travessão no texto (Q-004)
- [ ] `npm run lint`, `npm test`, `npm run build` verdes
- [ ] Preview da Vercel no ar

## Ritmo de execução

- Primeiro passo: reformule os requisitos nas suas palavras, em 5 linhas no máximo. Se algo estiver ambíguo, pergunte AGORA.
- Branch nova, PR em rascunho, tudo nele. Push ao fim de cada task.
- Não pare entre tasks. Um commit por task. TDD na T7. Typecheck antes de cada commit.
- Nunca escreva em produção. Nunca sobrescreva arquivo existente sem `.bak`.
- Pare SOMENTE se: (1) decisão de produto não escrita aqui; (2) algo exigir escrever em produção; (3) CI vermelho fora do esperado; (4) ambiguidade não coberta aqui nem no steering. Ao parar, diga em 3 linhas o que travou, a sua premissa e as opções.

## Relatório final (único, curto)

Por task, o bloco:

```text
Alegação:  [o que a task exigia]
Comando:   [comando exato ou "manual: ..."]
Exit code: [0 / não-zero / N/A]
Resumo:    [o que passou/falhou]
Veredito:  PASS / FAIL
```

Depois: URL do preview e roteiro de aceite, uma linha por seção (seção + gesto + resultado esperado).

## Confirme antes de construir

Não escreva código até reformular os requisitos acima nas suas palavras.
