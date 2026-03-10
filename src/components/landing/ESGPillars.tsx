import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Heart, ShieldCheck, Zap, BarChart3, Fingerprint } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Ambiental",
    label: "Inventory Scope 1-3",
    highlight: "(E)",
    color: "#00E699",
    text: "Redução real da pegada de carbono. Transformamos o alimento que seria descartado em ativos ambientais certificados, valorizando a sustentabilidade da sua marca.",
  },
  {
    icon: Heart,
    title: "Social",
    label: "Impact Verification",
    highlight: "(S)",
    color: "#10B981",
    text: "Combate à fome com segurança. Conectamos o seu excedente de estoque a instituições sérias, gerando impacto positivo na sua comunidade sem riscos jurídicos.",
  },
  {
    icon: ShieldCheck,
    title: "Governança",
    label: "Audit Trail Protocol",
    highlight: "(G)",
    color: "#34D399",
    text: "Controle absoluto e compliance. Garantimos a rastreabilidade total da sua operação, protegendo suas margens e auditando cada decisão de ponta a ponta.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function ESGPillars() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section id="ecossistema-esg" className="relative py-32 overflow-hidden bg-background scroll-mt-20">
      {/* Genesis Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[hsl(var(--zera-emerald))]">
              Audit & Compliance (V 3.4)
            </span>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Três Pilares. <span className="text-[hsl(var(--zera-emerald))]">Uma Plataforma.</span>
          </h2>
          <p className="mt-4 text-white/40 font-sans max-w-2xl mx-auto">
            A Zera não é apenas software; é um protocolo de ecossistema para transformar resíduos operacionais em valor estratégico de longo prazo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...fadeUp(0.1 + i * 0.1)}
              onClick={() => setActivePillar(activePillar === i ? null : i)}
              className={`glass-premium relative group p-8 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300 ${activePillar === i ? "border-[hsl(var(--zera-emerald))]/50 bg-white/[0.05] ring-1 ring-[hsl(var(--zera-emerald))]/20 shadow-[0_0_30px_rgba(0,230,153,0.1)]" : ""
                }`}
            >
              {/* Pillar Accent Line */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] transition-opacity duration-300 ${activePillar === i ? "opacity-100" : "opacity-20 group-hover:opacity-100"
                  }`}
                style={{ background: pillar.color }}
              />

              <div className="flex justify-between items-start mb-8">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"
                >
                  <pillar.icon className="w-5 h-5 text-[hsl(var(--zera-emerald))]" />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/20 uppercase mt-1">
                  {pillar.label}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
                {pillar.title}
                <span className="text-[10px] font-mono text-[hsl(var(--zera-emerald))] font-black">{pillar.highlight}</span>
              </h3>

              <p className="text-sm leading-relaxed text-white/50 mb-8 font-sans">
                {pillar.text}
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                </div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                  Protocol Active
                </span>
              </div>

              {/* Hover/Active Glow */}
              <div
                className={`absolute -bottom-24 -right-24 w-48 h-48 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 ${activePillar === i ? "opacity-20" : "opacity-0 group-hover:opacity-10"
                  }`}
                style={{ background: pillar.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
