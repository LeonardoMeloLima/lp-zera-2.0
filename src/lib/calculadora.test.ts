import { describe, it, expect } from "vitest";
import { calcularVazamento } from "./calculadora";

describe("calcularVazamento", () => {
  it.each([
    { faturamento: 150000, cartao: 60, perdaAnual: 43020, taxasAnuais: 19440, totalAnual: 62460 },
    { faturamento: 0, cartao: 60, perdaAnual: 0, taxasAnuais: 0, totalAnual: 0 },
    { faturamento: 100000, cartao: 0, perdaAnual: 28680, taxasAnuais: 0, totalAnual: 28680 },
    { faturamento: 100000, cartao: 100, perdaAnual: 28680, taxasAnuais: 21600, totalAnual: 50280 },
  ])(
    "faturamento $faturamento com $cartao% no cartão dá total anual de $totalAnual",
    ({ faturamento, cartao, perdaAnual, taxasAnuais, totalAnual }) => {
      const resultado = calcularVazamento(faturamento, cartao);

      expect(resultado.perdaAnual).toBeCloseTo(perdaAnual, 2);
      expect(resultado.taxasAnuais).toBeCloseTo(taxasAnuais, 2);
      expect(resultado.totalAnual).toBeCloseTo(totalAnual, 2);
    },
  );

  it("total anual é a soma da perda com as taxas", () => {
    const { perdaAnual, taxasAnuais, totalAnual } = calcularVazamento(87350, 35);

    expect(totalAnual).toBeCloseTo(perdaAnual + taxasAnuais, 6);
  });
});
