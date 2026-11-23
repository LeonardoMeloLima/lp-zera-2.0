import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";
import Footer from "@/components/landing/Footer";
import { blocosDaPolitica } from "@/content/politicaPrivacidade";

const TITULO_DA_ABA = "Política de Privacidade | Zera";

export default function Privacidade() {
  useEffect(() => {
    const anterior = document.title;
    document.title = TITULO_DA_ABA;
    window.scrollTo(0, 0);
    return () => {
      document.title = anterior;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto max-w-7xl px-6">
        <nav className="flex h-16 items-center">
          {/* Mesmo logo da Navbar, levando para o início */}
          <Link to="/" className="flex items-center gap-1.5 group text-4xl font-black italic tracking-tighter uppercase transition-colors">
            <Leaf className="w-10 h-10 text-[hsl(var(--zera-emerald))]" strokeWidth={2.5} />
            <span className="text-gradient-genesis">ZERA</span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[hsl(var(--zera-emerald))] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Voltar para o início
        </Link>

        <article className="mt-10">
          {blocosDaPolitica.map((bloco, i) => {
            switch (bloco.tipo) {
              case "h1":
                return (
                  <h1 key={i} className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
                    {bloco.texto}
                  </h1>
                );
              case "h2":
                return (
                  <h2 key={i} className="text-2xl font-bold text-white tracking-tight mt-12 mb-4">
                    {bloco.texto}
                  </h2>
                );
              case "lista":
                return (
                  <ul key={i} className="list-disc pl-6 mb-4 space-y-1.5 text-base text-white/70 leading-relaxed marker:text-[hsl(var(--zera-emerald))]">
                    {bloco.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={i} className="mb-4 text-base text-white/70 leading-relaxed">
                    {bloco.texto}
                  </p>
                );
            }
          })}
        </article>
      </main>

      <Footer />
    </div>
  );
}
