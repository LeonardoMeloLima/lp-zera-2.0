import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const invoke = vi.fn();
const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } },
}));
vi.mock("sonner", () => ({
  toast: { success: (m: string) => toastSuccess(m), error: (m: string) => toastError(m) },
}));

import DemoModal from "@/components/landing/DemoModal";

function preencherEEnviar() {
  fireEvent.change(screen.getByPlaceholderText("Seu nome"), { target: { value: "Maria" } });
  fireEvent.change(screen.getByPlaceholderText("WhatsApp (com DDD)"), {
    target: { value: "(19) 99876-5432" },
  });
  fireEvent.change(screen.getByPlaceholderText("Cidade"), { target: { value: "Campinas" } });
  fireEvent.change(screen.getByPlaceholderText("Nome do comércio"), {
    target: { value: "Mercado da Maria" },
  });
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Hiper" } });
  fireEvent.click(screen.getByRole("button", { name: /Enviar/ }));
}

describe("DemoModal", () => {
  beforeEach(() => {
    invoke.mockReset();
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it("mostra título, campo de WhatsApp como telefone e as opções de sistema de caixa", () => {
    render(<DemoModal open onClose={() => {}} />);
    expect(screen.getByRole("heading").textContent).toBe("Quero testar o Zera");
    const whatsapp = screen.getByPlaceholderText("WhatsApp (com DDD)");
    expect(whatsapp.getAttribute("type")).toBe("tel");
    expect(whatsapp.getAttribute("inputmode")).toBe("tel");
    const opcoes = screen.getAllByRole("option").map((o) => o.textContent);
    expect(opcoes).toEqual(["Sistema de caixa", "VR System", "Hiper", "Outro", "Não sei"]);
  });

  it("mostra o aviso da Política de Privacidade abaixo do Enviar, com link em nova aba", () => {
    render(<DemoModal open onClose={() => {}} />);
    const aviso = screen.getByText(/Ao enviar, você concorda com a nossa/);
    expect(aviso.textContent).toBe("Ao enviar, você concorda com a nossa Política de Privacidade.");
    const link = screen.getByRole("link", { name: "Política de Privacidade" });
    expect(link).toHaveAttribute("href", "/privacidade");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    const enviar = screen.getByRole("button", { name: /Enviar/ });
    expect(enviar.nextElementSibling).toBe(aviso);
  });

  it("envia os campos para capture-lead-loja e confirma o recebimento", async () => {
    invoke.mockResolvedValue({ data: { success: true }, error: null });
    const onClose = vi.fn();
    render(<DemoModal open onClose={onClose} />);
    preencherEEnviar();

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Recebido! Vamos te chamar no WhatsApp."));
    expect(invoke).toHaveBeenCalledWith("capture-lead-loja", {
      body: {
        nome: "Maria",
        whatsapp: "(19) 99876-5432",
        cidade: "Campinas",
        nome_comercio: "Mercado da Maria",
        sistema_caixa: "Hiper",
        mensagem: "",
      },
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("mostra a mensagem que o servidor devolve no erro 400", async () => {
    const context = new Response(JSON.stringify({ error: "Informe o WhatsApp com DDD." }), { status: 400 });
    invoke.mockResolvedValue({ data: null, error: { context } });
    render(<DemoModal open onClose={() => {}} />);
    preencherEEnviar();

    await waitFor(() => expect(toastError).toHaveBeenCalledWith("Informe o WhatsApp com DDD."));
  });

  it("mostra o erro genérico quando o servidor falha", async () => {
    const context = new Response(JSON.stringify({ error: "Erro interno." }), { status: 500 });
    invoke.mockResolvedValue({ data: null, error: { context } });
    render(<DemoModal open onClose={() => {}} />);
    preencherEEnviar();

    await waitFor(() => expect(toastError).toHaveBeenCalledWith("Não deu para enviar. Tente de novo."));
  });

  it("mostra o erro genérico quando a rede falha", async () => {
    invoke.mockRejectedValue(new Error("offline"));
    render(<DemoModal open onClose={() => {}} />);
    preencherEEnviar();

    await waitFor(() => expect(toastError).toHaveBeenCalledWith("Não deu para enviar. Tente de novo."));
  });
});
