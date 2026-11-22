export type Camada = {
  nome: string;
  oQueE: string;
  zera: string;
  frase: string;
  passos: [string, string, string];
  destaque: string;
  legenda: string;
};

export const camadas: Camada[] = [
  {
    nome: "Fechamento",
    oQueE: "Resumo do dia",
    zera: "o que você não vê",
    frase: "Todo dia de manhã, chega no seu WhatsApp como foi o dia anterior.",
    passos: [
      "Quanto vendeu e quanto sobrou de lucro",
      "Se foi melhor ou pior que a semana passada e o ano passado",
      "Só o que precisa da sua atenção",
    ],
    destaque: "30 segundos",
    legenda: "para saber como foi o dia",
  },
  {
    nome: "Conferência",
    oQueE: "Olho no caixa",
    zera: "a diferença no caixa",
    frase: "Você sabe qual caixa está fora do normal.",
    passos: [
      "Cancelamentos, descontos e sangrias de cada funcionário",
      "Avisa só quando alguém sai do padrão da loja",
      "Chega junto com o resumo da manhã",
    ],
    destaque: "No dia seguinte",
    legenda: "e não no fim do mês",
  },
  {
    nome: "Recebimento",
    oQueE: "Nota do fornecedor",
    zera: "o custo errado",
    frase: "A nota que chega vira preço certo no sistema.",
    passos: [
      "Lê a nota do fornecedor sozinho",
      "Atualiza o custo de cada produto",
      "Sugere o preço de venda",
    ],
    destaque: "35% → 18%",
    legenda: "Exemplo: foi quanto caiu o lucro do tomate quando o custo subiu e o preço ficou igual",
  },
  {
    nome: "Quebra",
    oQueE: "Perda de perecível",
    zera: "o desperdício",
    frase: "Menos fruta, verdura e carne indo para o lixo.",
    passos: [
      "Anota o que estragou em segundos",
      "Sugere baixar o preço antes de estragar",
      "Ajuda a comprar só o que vai vender",
    ],
    destaque: "5,64%",
    legenda: "do que o hortifrúti vende vira perda nas lojas de bairro (ABRAS, 2025)",
  },
  {
    nome: "Acerto",
    oQueE: "Taxa do cartão",
    zera: "a taxa errada",
    frase: "Confere se a maquininha pagou o que devia.",
    passos: [
      "Compara cada venda no cartão e no Pix com o que caiu na conta",
      "Avisa quando a taxa veio maior que a combinada",
      "Mostra quanto ainda vai cair e quando",
    ],
    destaque: "R$ 2.110 por mês",
    legenda: "é a taxa média para cada R$ 100 mil vendidos no crédito (Banco Central, 2026)",
  },
  {
    nome: "Classificação",
    oQueE: "Imposto certo",
    zera: "o imposto a mais",
    frase: "Você não paga imposto a mais por cadastro errado.",
    passos: [
      "Confere o imposto de cada produto",
      "Na hora de vender e na hora de comprar",
      "Deixa a loja pronta para a reforma tributária",
    ],
    destaque: "R$ 104 mil",
    legenda: "pagos a mais por empresa, em média, por erros assim (e-Auditoria, 2023)",
  },
  {
    nome: "Encomenda",
    oQueE: "Pedido pelo WhatsApp",
    zera: "a venda perdida",
    frase: "O cliente pede pelo WhatsApp e nada se perde.",
    passos: ["O pedido chega organizado", "A equipe separa e entrega", "Tudo entra no caixa"],
    destaque: "Nenhum pedido",
    legenda: "esquecido no meio das mensagens",
  },
  {
    nome: "Freguês",
    oQueE: "Cliente fiel",
    zera: "o cliente que some",
    frase: "Seu cliente volta mais vezes.",
    passos: ["Cashback pelo CPF na nota", "Avisa quem parou de comprar", "Chama de volta pelo WhatsApp"],
    destaque: "Antes de perder",
    legenda: "o cliente, você fica sabendo",
  },
];
