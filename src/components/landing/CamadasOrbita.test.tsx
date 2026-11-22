import { act, render, screen, fireEvent, within } from "@testing-library/react";
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

function secaoNaTela(visivel: boolean) {
  const secao = document.querySelector("section#funcionalidades")!;
  act(() => {
    for (const o of observadores) {
      if (o.alvos.includes(secao)) o.cb([{ isIntersecting: visivel, target: secao }]);
    }
  });
}

const ativa = () => within(screen.getByTestId("camada-card")).getByRole("heading").textContent;
const passar = (ms: number) => act(() => void vi.advanceTimersByTime(ms));

describe("CamadasOrbita: tour", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("só começa quando a seção entra na tela e avança a cada 4 s", () => {
    render(<CamadasOrbita />);
    passar(8000);
    expect(ativa()).toBe("Fechamento");

    secaoNaTela(true);
    expect(screen.getByTestId("camada-progresso")).toBeInTheDocument();
    passar(3999);
    expect(ativa()).toBe("Fechamento");
    passar(1);
    expect(ativa()).toBe("Conferência");
    passar(4000);
    expect(ativa()).toBe("Recebimento");
  });

  it("volta para a primeira depois da oitava", () => {
    render(<CamadasOrbita />);
    secaoNaTela(true);
    for (let i = 0; i < 7; i++) passar(4000);
    expect(ativa()).toBe("Freguês");
    passar(4000);
    expect(ativa()).toBe("Fechamento");
  });

  it("pausa quando a seção sai da tela e retoma quando volta", () => {
    render(<CamadasOrbita />);
    secaoNaTela(true);
    passar(2000);
    secaoNaTela(false);
    passar(10000);
    expect(ativa()).toBe("Fechamento");
    expect(screen.queryByTestId("camada-progresso")).toBeNull();

    secaoNaTela(true);
    passar(4000);
    expect(ativa()).toBe("Conferência");
  });

  it("mostra a onda e o convite enquanto ninguém clicou", () => {
    render(<CamadasOrbita />);
    expect(screen.getByText("Toque em uma camada")).toBeInTheDocument();
    expect(screen.getByTestId("camadas-orbita")).toHaveAttribute("data-idle", "true");
  });

  it("o clique para o tour de vez, some a onda e o convite e mostra a camada tocada", () => {
    render(<CamadasOrbita />);
    secaoNaTela(true);
    passar(4000);
    fireEvent.click(screen.getByRole("button", { name: /Ver camada Quebra/ }));
    expect(ativa()).toBe("Quebra");
    expect(screen.queryByText("Toque em uma camada")).toBeNull();
    expect(screen.getByTestId("camadas-orbita")).toHaveAttribute("data-idle", "false");
    expect(screen.queryByTestId("camada-progresso")).toBeNull();

    passar(12000);
    expect(ativa()).toBe("Quebra");
    secaoNaTela(false);
    secaoNaTela(true);
    passar(12000);
    expect(ativa()).toBe("Quebra");
  });

  it("com prefers-reduced-motion não faz tour nem onda, mas o clique funciona", () => {
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({ ...original(q), matches: q.includes("reduce") })) as typeof window.matchMedia;
    try {
      render(<CamadasOrbita />);
      secaoNaTela(true);
      passar(8000);
      expect(ativa()).toBe("Fechamento");
      expect(screen.queryByTestId("camada-progresso")).toBeNull();
      expect(screen.getByTestId("camadas-orbita")).toHaveAttribute("data-idle", "false");

      fireEvent.click(screen.getByRole("button", { name: /Ver camada Freguês/ }));
      expect(ativa()).toBe("Freguês");
    } finally {
      window.matchMedia = original;
    }
  });
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
