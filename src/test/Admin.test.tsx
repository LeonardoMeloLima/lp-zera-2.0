import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

type Sessao = { access_token: string; user: { email: string } } | null;

type Ouvinte = (evento: string, sessao: Sessao) => void;

let sessaoAtual: Sessao = null;
let ouvinte: Ouvinte | null = null;
const getSession = vi.fn(async () => ({ data: { session: sessaoAtual }, error: null }));
const signInWithPassword = vi.fn();
const signOut = vi.fn(async () => ({ error: null }));
const onAuthStateChange = vi.fn((cb: Ouvinte) => {
  ouvinte = cb;
  return { data: { subscription: { unsubscribe: vi.fn() } } };
});
const invoke = vi.fn();

// Como o Supabase real: login bem-sucedido avisa os ouvintes com SIGNED_IN.
async function entrar(credenciais: unknown) {
  const resultado = await signInWithPassword(credenciais);
  if (!resultado.error) ouvinte?.("SIGNED_IN", resultado.data.session);
  return resultado;
}

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: () => getSession(),
      signInWithPassword: (credenciais: unknown) => entrar(credenciais),
      signOut: () => signOut(),
      onAuthStateChange: (cb: Ouvinte) => onAuthStateChange(cb),
    },
    functions: { invoke: (...a: unknown[]) => invoke(...a) },
  },
}));

import Admin from "@/pages/Admin";

const lead = {
  id: "1",
  created_at: "2026-11-22T15:00:00Z",
  nome: "Maria",
  whatsapp: "5519998765432",
  cidade: "Campinas",
  nome_comercio: "Mercado da Maria",
  sistema_caixa: "Hiper",
  mensagem: "Fechamento demora.",
};

const sessaoAdmin: Sessao = { access_token: "jwt", user: { email: "admin@zera.test" } };

describe("Admin", () => {
  beforeEach(() => {
    sessaoAtual = null;
    localStorage.clear();
    [getSession, signInWithPassword, signOut, onAuthStateChange, invoke].forEach((f) => f.mockClear());
    invoke.mockReset();
    signInWithPassword.mockReset();
  });

  it("sem sessão mostra login por e-mail e senha, sem PIN, e não busca leads", async () => {
    render(<Admin />);
    expect(await screen.findByLabelText("E-mail")).toBeTruthy();
    expect(screen.getByLabelText("Senha").getAttribute("type")).toBe("password");
    expect(screen.queryByText(/PIN/i)).toBeNull();
    expect(invoke).not.toHaveBeenCalled();
  });

  it("entra com signInWithPassword", async () => {
    signInWithPassword.mockResolvedValue({ data: { session: sessaoAdmin }, error: null });
    invoke.mockResolvedValue({ data: [lead], error: null });
    render(<Admin />);
    fireEvent.change(await screen.findByLabelText("E-mail"), { target: { value: "admin@zera.test" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "segredo" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() =>
      expect(signInWithPassword).toHaveBeenCalledWith({ email: "admin@zera.test", password: "segredo" }),
    );
    expect(await screen.findByText("Mercado da Maria")).toBeTruthy();
  });

  it("mostra erro quando e-mail ou senha estão errados", async () => {
    signInWithPassword.mockResolvedValue({ data: { session: null }, error: { message: "Invalid login" } });
    render(<Admin />);
    fireEvent.change(await screen.findByLabelText("E-mail"), { target: { value: "x@zera.test" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "errada" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText("E-mail ou senha incorretos.")).toBeTruthy();
  });

  it("com sessão de admin mostra a aba Leads Zera com as colunas da spec", async () => {
    sessaoAtual = sessaoAdmin;
    invoke.mockResolvedValue({ data: [lead], error: null });
    render(<Admin />);

    expect(await screen.findByRole("tab", { name: "Leads Zera" })).toBeTruthy();
    expect(screen.getAllByRole("tab")).toHaveLength(1);
    const colunas = screen.getAllByRole("columnheader").map((c) => c.textContent);
    expect(colunas).toEqual(["Data", "Nome", "Comércio", "Cidade", "WhatsApp", "Sistema de caixa", "Mensagem"]);
    expect(screen.getByText("5519998765432")).toBeTruthy();
    expect(invoke).toHaveBeenCalledWith("admin-leads");
  });

  it("e-mail fora da lista (403) vê o aviso de acesso", async () => {
    sessaoAtual = { access_token: "jwt", user: { email: "fora@zera.test" } };
    invoke.mockResolvedValue({ data: null, error: { context: new Response("{}", { status: 403 }) } });
    render(<Admin />);
    expect(await screen.findByText("Este e-mail não tem acesso.")).toBeTruthy();
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("Sair chama signOut e volta para o login", async () => {
    sessaoAtual = sessaoAdmin;
    invoke.mockResolvedValue({ data: [lead], error: null });
    render(<Admin />);
    fireEvent.click(await screen.findByRole("button", { name: /Sair/ }));
    await waitFor(() => expect(signOut).toHaveBeenCalled());
    expect(await screen.findByLabelText("E-mail")).toBeTruthy();
  });
});
