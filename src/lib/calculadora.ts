/** Perda média do varejo alimentar sobre o faturamento (Abrappe). */
const TAXA_PERDA = 0.0239;
/** Taxa média de cartão (Banco Central). */
const TAXA_CARTAO = 0.018;
const MESES = 12;

export interface Vazamento {
  perdaAnual: number;
  taxasAnuais: number;
  totalAnual: number;
}

/**
 * Quanto está em jogo por ano na loja. Não promete recuperação:
 * mostra o valor que o Zera ajuda a enxergar e conferir.
 */
export function calcularVazamento(faturamentoMensal: number, percentualCartao: number): Vazamento {
  const perdaAnual = faturamentoMensal * TAXA_PERDA * MESES;
  const taxasAnuais = faturamentoMensal * (percentualCartao / 100) * TAXA_CARTAO * MESES;
  return { perdaAnual, taxasAnuais, totalAnual: perdaAnual + taxasAnuais };
}
