import { render, screen, fireEvent, within } from "@testing-library/react";
import CamadasOrbita from "./CamadasOrbita";
import { camadas } from "./camadas";

// framer-motion (whileInView) e o tour usam IntersectionObserver, ausente no jsdom.
// Guardamos as instâncias para o teste poder dizer "a seção entrou/saiu da tela".
type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
const observadores: { cb: IOCallback; alvos: Element[] }[] = [];
class FakeIO {
  private registro: { cb: IOCallback; alvos: Element[] };
  constructor(cb: IOCallback) {
    this.registro = { cb, alvos: [] };
    observadores.push(this.registro);
  }
  observe(el: Element) {
    this.registro.alvos.push(el);
  }
  unobserve() {}
  disconnect() {
    this.registro.alvos = [];
  }
  takeRecords() {
    return [];
  }
}

beforeEach(() => {
  observadores.length = 0;
  Object.defineProperty(window, "IntersectionObserver", { writable: true, value: FakeIO });
});

describe("CamadasOrbita", () => {
  it("renderiza a seção com o id da navbar e o cabeçalho", () => {
    const { container } = render(<CamadasOrbita />);
    expect(container.querySelector("section#funcionalidades")).not.toBeNull();
    expect(screen.getByText("As camadas")).toBeInTheDocument();
    expect(screen.getByText("Tudo o que vaza da sua loja.")).toBeInTheDocument();
    expect(screen.getByText("Num lugar só.")).toBeInTheDocument();
    expect(screen.getByText("Seu caixa")).toBeInTheDocument();
  });

  it("tem um botão por camada com aria-label", () => {
    render(<CamadasOrbita />);
    for (const c of camadas) {
      expect(screen.getByRole("button", { name: `Ver camada ${c.nome}: ${c.oQueE}` })).toBeInTheDocument();
    }
  });

  it("mostra a primeira camada no card e troca ao clicar", () => {
    render(<CamadasOrbita />);
    const card = screen.getByTestId("camada-card");
    expect(within(card).getByText("Fechamento")).toBeInTheDocument();
    expect(within(card).getByText("Zera o que você não vê")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Ver camada Acerto/ }));
    expect(within(card).getByText("Acerto")).toBeInTheDocument();
    expect(within(card).getByText("Taxa do cartão")).toBeInTheDocument();
    expect(within(card).getByText("Zera a taxa errada")).toBeInTheDocument();
    expect(within(card).getByText("R$ 2.110 por mês")).toBeInTheDocument();
    expect(within(card).getByText("01")).toBeInTheDocument();
    expect(within(card).getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ver camada Acerto/ })).toHaveAttribute("aria-pressed", "true");
  });
});
