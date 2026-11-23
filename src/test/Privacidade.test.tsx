import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeAll, describe, expect, it, vi } from "vitest";
import App from "@/App";
import Privacidade from "@/pages/Privacidade";
import { politicaPrivacidade, blocosDaPolitica } from "@/content/politicaPrivacidade";

const rodada = readFileSync(
  path.resolve(__dirname, "../../.ai/sdd/rodadas/2026-11-22-politica-privacidade.md"),
  "utf8",
);
const textoDaRodada = rodada.split("## Texto da política")[1].trim();

beforeAll(() => {
  // O Footer usa framer-motion (whileInView), que precisa do IntersectionObserver, ausente no jsdom.
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

const renderPagina = () =>
  render(
    <MemoryRouter initialEntries={["/privacidade"]}>
      <Routes>
        <Route path="/privacidade" element={<Privacidade />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Política de Privacidade", () => {
  it("o conteúdo é exatamente o texto aprovado na rodada", () => {
    expect(politicaPrivacidade.trim()).toBe(textoDaRodada);
  });

  it("não tem travessão", () => {
    expect(politicaPrivacidade).not.toMatch(/[—–]/);
  });

  it("a rota /privacidade do App renderiza o título", () => {
    window.history.pushState({}, "", "/privacidade");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Política de Privacidade" })).toBeInTheDocument();
    window.history.pushState({}, "", "/");
  });

  it("vira um h1 e um h2 por seção, com listas e parágrafos", () => {
    renderPagina();
    const h2 = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    const esperados = textoDaRodada.split("\n").filter((l) => l.startsWith("## ")).map((l) => l.slice(3));
    expect(h2).toEqual(esperados);
    expect(screen.getByText("seu WhatsApp;")).toBeInTheDocument();
    expect(screen.getByText(/Última atualização: 22 de novembro de 2026\./)).toBeInTheDocument();
    expect(blocosDaPolitica.filter((b) => b.tipo === "lista").length).toBe(4);
  });

  it("tem o link Voltar para o início e o título da aba", () => {
    renderPagina();
    expect(screen.getByRole("link", { name: "Voltar para o início" })).toHaveAttribute("href", "/");
    expect(document.title).toBe("Política de Privacidade | Zera");
  });
});
