# Rodada N1: página de Política de Privacidade

Data: 22/11/2026. Nível: N1. Executor: Antigravity. Branch: `feat/politica-privacidade`, um PR em rascunho.

## Objetivo

O formulário "Quero testar" coleta nome e WhatsApp. A LP precisa de uma página de Política de Privacidade (LGPD), com link no rodapé e no formulário.

## Requisitos (EARS)

- R1. O sistema DEVE ter a rota `/privacidade`, que mostra o texto da seção "Texto da política" abaixo, exatamente como está.
- R2. QUANDO o visitante clicar em "Política de Privacidade" no rodapé, o sistema DEVE abrir `/privacidade`. Hoje o link aponta para `#`.
- R3. O formulário do DemoModal DEVE mostrar, logo abaixo do botão Enviar, a linha: "Ao enviar, você concorda com a nossa Política de Privacidade.", em que "Política de Privacidade" é um link para `/privacidade` que abre em nova aba.
- R4. A página `/privacidade` DEVE ter um link "Voltar para o início" que leva a `/`.
- R5. QUANDO alguém abrir `/privacidade` direto pela URL, o sistema DEVE mostrar a página, e não o 404. Conferir se o `vercel.json` já reescreve as rotas para o SPA, como faz com `/admin`.

## Escopo negativo

- Não mudar o layout, as cores ou os componentes de nenhuma seção existente da LP. A única mudança visual permitida fora da página nova é a linha do R3 no formulário e o `href` do rodapé.
- Não adicionar banner de cookies: o site não usa cookies de rastreamento.
- Não mexer no backend, nas edge functions nem no banco.

## FAQ de implementação

- **Visual da página:** usar o fundo, as fontes e as cores que a LP já usa (`bg-background`, texto claro, títulos no estilo dos títulos das seções). Texto corrido, com largura máxima legível (`max-w-3xl`), centralizado. Incluir Navbar e Footer, se forem fáceis de reaproveitar sem quebrar; se não forem, basta o logo no topo, com link para `/`.
- **Estilo da linha do R3:** texto pequeno (`text-xs`), na cor secundária que o modal já usa, com o link sublinhado.
- **Os títulos do texto:** cada `##` vira um `h2` e o `#` vira o `h1` da página.
- **SEO:** `document.title` = "Política de Privacidade | Zera".
- **Onde guardar o texto:** num componente ou num arquivo de conteúdo. Não buscar de fora.

## Critérios de aceite

- [ ] Abrir `/privacidade` direto mostra o texto completo.
- [ ] O link do rodapé leva para `/privacidade`.
- [ ] O modal mostra a linha do R3, e o link abre a política em nova aba.
- [ ] O teste do DemoModal continua verde, e há um teste novo que confirma a linha e o link.
- [ ] Um teste confirma que a rota `/privacidade` renderiza o título "Política de Privacidade".
- [ ] `npm run build`, typecheck e `npm test` verdes.
- [ ] Sem travessões no texto.

## Paradas

Parar somente se: algo exigir mudar outra seção; algo exigir escrever em produção; o CI quebrar fora da lista conhecida (12 avisos antigos de lint); ou houver ambiguidade não coberta aqui.

## Entrega

Relatório curto com evidência por item (Alegação / Comando / Exit code / Veredito), o link do preview do zera-lp e o roteiro de aceite. Não fazer merge.

---

## Texto da política

# Política de Privacidade

Última atualização: 22 de novembro de 2026.

Esta política explica como o Zera trata os dados pessoais de quem visita este site e preenche o formulário "Quero testar". Ela segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).

## Quem é o responsável pelos seus dados

O Zera é um produto da LEONARDO MELO DE LIMA RODRIGUES CONSULTORIA EM TECNOLOGIA DA INFORMACAO LTDA, CNPJ 61.408.127/0001-39 (Connect Ideia), que é a controladora dos dados pessoais tratados neste site.

Para qualquer assunto sobre seus dados, fale com a gente pelo e-mail leonardo.informatica@gmail.com.

## Quais dados coletamos

Quando você preenche o formulário "Quero testar", coletamos:

- seu nome;
- seu WhatsApp;
- a cidade;
- o nome do seu comércio;
- o sistema de caixa que você usa;
- a mensagem, se você escrever uma.

Também registramos a data e a hora do envio.

Ao navegar pelo site, o nosso provedor de hospedagem registra dados técnicos de acesso, como endereço IP, data e hora e o tipo de navegador, para manter o site funcionando e seguro.

O site não usa cookies de publicidade nem ferramentas de rastreamento de terceiros.

## Para que usamos

Usamos seus dados para:

- entrar em contato com você pelo WhatsApp sobre o teste do Zera;
- entender se o Zera combina com a sua loja e com o seu sistema de caixa;
- manter o site seguro e funcionando.

Não vendemos seus dados e não usamos esses dados para outra finalidade sem avisar você antes.

## Base legal

Tratamos os dados do formulário para atender o seu pedido de contato (procedimentos preliminares a um contrato, art. 7º, V, da LGPD) e, quando for o caso, pelo nosso legítimo interesse em apresentar o Zera (art. 7º, IX). Os dados técnicos de acesso são tratados para cumprir a lei e por legítimo interesse na segurança do site.

## Com quem compartilhamos

Usamos fornecedores que nos ajudam a operar o site, e eles só tratam os dados para isso:

- Supabase: banco de dados onde ficam os cadastros, com servidores em São Paulo.
- Vercel: hospedagem do site.
- Resend: envio do aviso interno de que um novo cadastro chegou.

Alguns desses fornecedores podem tratar dados fora do Brasil, como nos Estados Unidos. Nesses casos, a transferência segue o que a LGPD permite e é feita com fornecedores que adotam medidas de proteção adequadas.

Também podemos compartilhar dados se uma lei ou uma autoridade exigir.

## Por quanto tempo guardamos

Guardamos os dados do formulário por até 12 meses depois do último contato com você, ou até você pedir a exclusão, o que vier primeiro. Depois disso, eles são apagados. Se você virar cliente, os dados passam a seguir o contrato.

## Seus direitos

Pela LGPD, você pode, a qualquer momento:

- confirmar se tratamos seus dados e pedir acesso a eles;
- corrigir dados incompletos ou errados;
- pedir a exclusão dos seus dados;
- pedir informações sobre com quem compartilhamos;
- se opor a um tratamento ou revogar seu consentimento, quando ele for a base usada.

Para isso, mande um e-mail para leonardo.informatica@gmail.com. Respondemos em até 15 dias. Você também pode falar com a Autoridade Nacional de Proteção de Dados (ANPD).

## Segurança

Os dados ficam protegidos com acesso restrito, conexão criptografada (HTTPS) e regras no banco de dados que impedem a leitura por quem não tem permissão. Só pessoas autorizadas da equipe acessam os cadastros.

## Crianças e adolescentes

Este site é voltado para donos e gestores de comércio. Não coletamos, de propósito, dados de menores de 18 anos.

## Mudanças nesta política

Podemos atualizar esta política. Quando isso acontecer, a data no topo da página muda.
