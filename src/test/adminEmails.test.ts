import { describe, expect, it } from "vitest";
import { emailAutorizado } from "../../supabase/functions/_shared/adminEmails.ts";

const lista = "leonardo@exemplo.com, Admin-Teste@zera.test ,";

describe("emailAutorizado", () => {
  it("aceita e-mail da lista ignorando maiúsculas e espaços", () => {
    expect(emailAutorizado("leonardo@exemplo.com", lista)).toBe(true);
    expect(emailAutorizado("ADMIN-TESTE@zera.test", lista)).toBe(true);
    expect(emailAutorizado("  admin-teste@zera.test ", lista)).toBe(true);
  });

  it("recusa e-mail fora da lista", () => {
    expect(emailAutorizado("fora-da-lista@zera.test", lista)).toBe(false);
  });

  it("recusa e-mail vazio mesmo com vírgula sobrando na lista", () => {
    expect(emailAutorizado("", lista)).toBe(false);
    expect(emailAutorizado(undefined, lista)).toBe(false);
  });

  it("recusa tudo quando a lista não está configurada", () => {
    expect(emailAutorizado("leonardo@exemplo.com", undefined)).toBe(false);
    expect(emailAutorizado("leonardo@exemplo.com", "")).toBe(false);
  });

  it("não aceita correspondência parcial", () => {
    expect(emailAutorizado("teste@zera.test", lista)).toBe(false);
    expect(emailAutorizado("leonardo@exemplo.com.br", lista)).toBe(false);
  });
});
