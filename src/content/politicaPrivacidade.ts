// Texto aprovado na rodada .ai/sdd/rodadas/2026-11-22-politica-privacidade.md ("Texto da política").
// Não editar à mão: o teste src/test/Privacidade.test.tsx compara este texto com o da rodada.
export const politicaPrivacidade = `# Política de Privacidade

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
`;

export type Bloco =
  | { tipo: "h1"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] };

// Converte o markdown simples da política (# título, ## seção, - item, parágrafos) em blocos.
export function paraBlocos(md: string): Bloco[] {
  const blocos: Bloco[] = [];
  for (const linha of md.split("\n").map((l) => l.trim())) {
    if (!linha) continue;
    if (linha.startsWith("## ")) blocos.push({ tipo: "h2", texto: linha.slice(3) });
    else if (linha.startsWith("# ")) blocos.push({ tipo: "h1", texto: linha.slice(2) });
    else if (linha.startsWith("- ")) {
      const ultimo = blocos[blocos.length - 1];
      if (ultimo?.tipo === "lista") ultimo.itens.push(linha.slice(2));
      else blocos.push({ tipo: "lista", itens: [linha.slice(2)] });
    } else blocos.push({ tipo: "p", texto: linha });
  }
  return blocos;
}

export const blocosDaPolitica = paraBlocos(politicaPrivacidade);
