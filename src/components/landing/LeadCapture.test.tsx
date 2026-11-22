import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LeadCapture from "./LeadCapture";

beforeAll(() => {
  // framer-motion (whileInView) precisa do IntersectionObserver, ausente no jsdom
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });
});

// Normaliza o espaço não separável que o Intl usa entre "R$" e o número
const texto = (el: HTMLElement) => (el.textContent ?? "").replace(/\s/g, " ");

describe("LeadCapture (calculadora)", () => {
  it("com 150.000 e 60% mostra R$ 43.020, R$ 19.440 e R$ 62.460", () => {
    const { container } = render(<LeadCapture />);
    const conteudo = texto(container);

    expect(conteudo).toContain("R$ 43.020");
    expect(conteudo).toContain("R$ 19.440");
    expect(conteudo).toContain("R$ 62.460");
    expect(container.querySelector("section#calculadora")).not.toBeNull();
  });

  it("recalcula quando a régua de cartão muda", () => {
    const { container } = render(<LeadCapture />);

    fireEvent.change(screen.getByRole("slider"), { target: { value: "0" } });

    const conteudo = texto(container);
    expect(conteudo).toContain("R$ 0");
    expect(conteudo).toContain("R$ 43.020");
    expect(screen.getByText("0%", { selector: "span.rounded-full" })).toBeInTheDocument();
  });
});
