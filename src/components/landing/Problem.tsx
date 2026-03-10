import { motion } from "framer-motion";
import { TrendingDown, Clock, AlertTriangle, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: TrendingDown,
    value: "R$ 61 bi",
    label: "Desperdício alimentar anual no Brasil",
    color: "#00E699"
  },
  {
    icon: Clock,
    value: "160h/mês",
    label: "Gastas em processos manuais de estoque",
    color: "#00E699"
  },
  {
    icon: AlertTriangle,
    value: "1/3",
    label: "De toda a produção expira antes do consumo",
    color: "#00E699"
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const
});

export default function Problem() {
  return (
    <section id="como-funciona" className="py-32 bg-black relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[hsl(var(--zera-emerald))]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[hsl(var(--zera-emerald))]">
                Cenário Crítico (Logística 4.0)
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
              O Desperdício é uma <br />
              <span className="text-white/40">Incompetência de Dados.</span>
            </h2>

            <p className="text-lg text-white/50 leading-relaxed font-sans max-w-xl mb-10">
              A gestão de perecíveis no varejo ainda opera no "feeling". Processos manuais e falta de visibilidade geram prejuízos silenciosos que corroem as margens e o potencial social das empresas.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--zera-emerald))]" />
                <span className="text-sm font-sans text-white/80 group-hover:text-white transition-colors">Fragmentação de informações entre ERP e Loja</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--zera-emerald))]" />
                <span className="text-sm font-sans text-white/80 group-hover:text-white transition-colors">Incapacidade de prever picos de quebra</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--zera-emerald))]" />
                <span className="text-sm font-sans text-white/80 group-hover:text-white transition-colors">Desconexão com o ecossistema de doação (ESG)</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp(0.2 + i * 0.1)}
                className="glass-premium p-8 rounded-[32px] flex items-center gap-8 group hover:border-white/10 transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/5 group-hover:scale-110 transition-transform duration-500"
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                  <span className="text-xs text-white/40 font-sans tracking-wide">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
