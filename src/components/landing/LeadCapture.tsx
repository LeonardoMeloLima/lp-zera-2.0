import { motion } from "framer-motion";
import { ArrowRight, CreditCard, TrendingDown, TrendingUp, CalendarCheck, Info } from "lucide-react";
import { useState, useMemo } from "react";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { calcularVazamento } from "@/lib/calculadora";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const
});

export default function LeadCapture() {
  const { setOpen } = useDemoModal();
  const [faturamento, setFaturamento] = useState(150_000);
  const [cartao, setCartao] = useState(60);

  const results = useMemo(() => calcularVazamento(faturamento, cartao), [faturamento, cartao]);

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setFaturamento(Number(raw) || 0);
  };

  return (
    <section id="calculadora" className="py-32 relative overflow-hidden bg-black scroll-mt-20">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--zera-emerald))]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[hsl(var(--zera-emerald))]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[hsl(var(--zera-emerald))]">
              Calculadora
            </span>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Quanto está vazando <br />
            <span className="text-gradient-genesis italic px-2">da sua loja?</span>
          </h2>
          <p className="text-white/40 font-sans max-w-2xl mx-auto">
            Dois números que você sabe de cabeça. A conta usa índices públicos de mercado.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.2)}
          className="glass-premium rounded-[40px] overflow-hidden border border-white/5"
        >
          <div className="grid lg:grid-cols-5">
            {/* LEFT — Inputs (2/5) */}
            <div className="lg:col-span-2 p-10 lg:p-12 flex flex-col gap-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">
                    Faturamento mensal
                  </label>
                  <Info size={14} className="text-white/20" />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-mono text-sm group-focus-within:text-[hsl(var(--zera-emerald))] transition-colors">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xl font-bold text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 focus:ring-1 focus:ring-[hsl(var(--zera-emerald))]/20 transition-all"
                    value={faturamento === 0 ? "" : faturamento.toLocaleString("pt-BR")}
                    onChange={handleCurrencyInput}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">
                    Vendas no cartão
                  </label>
                  <span className="text-sm font-mono font-bold text-[hsl(var(--zera-emerald))] bg-[hsl(var(--zera-emerald))]/10 px-3 py-1 rounded-full">
                    {cartao}%
                  </span>
                </div>
                <div className="relative pt-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={cartao}
                    onChange={(e) => setCartao(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[hsl(var(--zera-emerald))]"
                  />
                  <div className="flex justify-between mt-4 text-[9px] font-mono font-bold text-white/20 uppercase tracking-widest">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Results (3/5) */}
            <div className="lg:col-span-3 p-10 lg:p-12 flex flex-col gap-10">
              <div className="grid sm:grid-cols-2 gap-10">
                {/* Perda */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--zera-emerald))]/10 flex items-center justify-center">
                      <TrendingDown size={16} className="text-[hsl(var(--zera-emerald))]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">Perda estimada</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-white">
                      {formatBRL(results.perdaAnual)}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Por ano. Varejo alimentar: 2,39% (Abrappe)</span>
                  </div>
                </div>

                {/* Taxas */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--zera-emerald))]/10 flex items-center justify-center">
                      <CreditCard size={16} className="text-[hsl(var(--zera-emerald))]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">Taxas de cartão</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-[hsl(var(--zera-emerald))]">
                      {formatBRL(results.taxasAnuais)}
                    </span>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Por ano. Taxa média: 1,80% (Banco Central)</span>
                  </div>
                </div>
              </div>

              {/* Main Potential (Wide) */}
              <div className="mt-4 p-8 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--zera-emerald))] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[hsl(var(--zera-emerald))] uppercase">Em jogo por ano</span>
                  </div>
                  <span className="text-4xl md:text-5xl font-bold text-white leading-none">
                    {formatBRL(results.totalAnual)}
                  </span>
                  <span className="text-xs text-white/30 font-sans">Dinheiro que o Zera ajuda a enxergar e conferir.</span>
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="btn-zera-emerald whitespace-nowrap"
                >
                  Quero testar <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
