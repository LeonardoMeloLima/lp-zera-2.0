import { camadas } from "./camadas";

describe("camadas", () => {
  it("tem as 8 camadas na ordem do quadro", () => {
    expect(camadas.map((c) => c.nome)).toEqual([
      "Fechamento",
      "Conferência",
      "Recebimento",
      "Quebra",
      "Acerto",
      "Classificação",
      "Encomenda",
      "Freguês",
    ]);
  });

  it("cada camada tem 3 passos e todos os campos preenchidos", () => {
    for (const c of camadas) {
      expect(c.passos).toHaveLength(3);
      for (const valor of [c.nome, c.oQueE, c.zera, c.frase, c.destaque, c.legenda, ...c.passos]) {
        expect(valor.trim()).not.toBe("");
      }
    }
  });

  it("nenhum texto usa travessão", () => {
    const textos = camadas.flatMap((c) => [c.nome, c.oQueE, c.zera, c.frase, c.destaque, c.legenda, ...c.passos]);
    for (const t of textos) expect(t).not.toMatch(/[—–]/);
  });

  it("números de mercado levam fonte e ano", () => {
    const porNome = Object.fromEntries(camadas.map((c) => [c.nome, c.legenda]));
    expect(porNome["Quebra"]).toContain("(ABRAS, 2025)");
    expect(porNome["Acerto"]).toContain("(Banco Central, 2026)");
    expect(porNome["Classificação"]).toContain("(e-Auditoria, 2023)");
  });
});
