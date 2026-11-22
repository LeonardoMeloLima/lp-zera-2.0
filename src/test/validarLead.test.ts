import { describe, expect, it } from "vitest";
import { validarLead } from "../../supabase/functions/_shared/validarLead.ts";

const valido = {
  nome: "Maria Souza",
  whatsapp: "(19) 99876-5432",
  cidade: "Campinas",
  nome_comercio: "Mercado da Maria",
  sistema_caixa: "VR System",
  mensagem: "Fechamento do caixa demora muito.",
};

const com = (campos: Record<string, unknown>) => validarLead({ ...valido, ...campos });

const erroDe = (resultado: ReturnType<typeof validarLead>) =>
  "erro" in resultado ? resultado.erro : null;

describe("validarLead: WhatsApp", () => {
  it.each([
    ["(19) 99876-5432", "5519998765432"],
    ["+55 19 99876-5432", "5519998765432"],
    ["19 3875-1234", "551938751234"],
  ])("grava %s como %s", (digitado, esperado) => {
    const r = com({ whatsapp: digitado });
    expect(r.ok && r.lead.whatsapp).toBe(esperado);
  });

  it.each([["999"], [""]])("recusa %j", (digitado) => {
    expect(erroDe(com({ whatsapp: digitado }))).toBe("Informe o WhatsApp com DDD.");
  });

  it("recusa WhatsApp ausente", () => {
    const { whatsapp: _, ...semWhatsapp } = valido;
    expect(erroDe(validarLead(semWhatsapp))).toBe("Informe o WhatsApp com DDD.");
  });

  it("recusa DDD começando com 0", () => {
    expect(erroDe(com({ whatsapp: "019 3875-1234" }))).toBe("Informe o WhatsApp com DDD.");
  });
});

describe("validarLead: limites de tamanho", () => {
  it.each([
    ["nome", 2, 120, "Informe seu nome.", "O nome pode ter até 120 caracteres."],
    ["cidade", 2, 80, "Informe a cidade.", "A cidade pode ter até 80 caracteres."],
    [
      "nome_comercio",
      2,
      120,
      "Informe o nome do comércio.",
      "O nome do comércio pode ter até 120 caracteres.",
    ],
  ])("%s aceita de %i a %i caracteres", (campo, min, max, erroCurto, erroLongo) => {
    expect(com({ [campo]: "a".repeat(min) }).ok).toBe(true);
    expect(com({ [campo]: "a".repeat(max) }).ok).toBe(true);
    expect(erroDe(com({ [campo]: "a".repeat(min - 1) }))).toBe(erroCurto);
    expect(erroDe(com({ [campo]: "a".repeat(max + 1) }))).toBe(erroLongo);
    expect(erroDe(com({ [campo]: undefined }))).toBe(erroCurto);
  });

  it("conta o tamanho depois de tirar os espaços das pontas", () => {
    expect(erroDe(com({ nome: "  a  " }))).toBe("Informe seu nome.");
    const r = com({ nome: "  Maria  " });
    expect(r.ok && r.lead.nome).toBe("Maria");
  });

  it("mensagem é opcional e aceita até 1000 caracteres", () => {
    expect(com({ mensagem: "a".repeat(1000) }).ok).toBe(true);
    expect(erroDe(com({ mensagem: "a".repeat(1001) }))).toBe(
      "A mensagem pode ter até 1000 caracteres.",
    );
    const vazia = com({ mensagem: "   " });
    expect(vazia.ok && vazia.lead.mensagem).toBe(null);
    const ausente = com({ mensagem: undefined });
    expect(ausente.ok && ausente.lead.mensagem).toBe(null);
  });
});

describe("validarLead: sistema de caixa", () => {
  it.each([["VR System"], ["Hiper"], ["Outro"], ["Não sei"]])("aceita %s", (sistema) => {
    expect(com({ sistema_caixa: sistema }).ok).toBe(true);
  });

  it.each([["SAP"], [""], [undefined]])("recusa %j", (sistema) => {
    expect(erroDe(com({ sistema_caixa: sistema }))).toBe("Escolha o sistema de caixa.");
  });
});

describe("validarLead: corpo", () => {
  it.each([[null], ["texto"], [[]], [42]])("recusa corpo %j", (corpo) => {
    expect(erroDe(validarLead(corpo))).toBe("Dados inválidos.");
  });

  it("devolve só os campos da tabela", () => {
    const r = com({ id: "x", created_at: "2020-01-01", extra: 1 });
    expect(r.ok && Object.keys(r.lead).sort()).toEqual(
      ["cidade", "mensagem", "nome", "nome_comercio", "sistema_caixa", "whatsapp"],
    );
  });
});
