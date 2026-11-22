import { useState } from "react";
import { motion } from "framer-motion";
import { CloudLightning, Zap, Heart, ArrowRight, Database, ShieldCheck } from "lucide-react";
import { useDemoModal } from "@/hooks/use-demo-modal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const
});

const features = [
  {
    title: "Quebra",
    label: "Zera o desperdício",
    copy: "Registra a perda do perecível, sugere o preço do dia e ajusta a compra para você não comprar o que vai estragar. Em breve.",
    icon: Database,
    color: "#00E699"
  },
  {
    title: "Acerto",
    label: "Zera a taxa errada",
    copy: "Confere cada venda no cartão e no Pix contra o que caiu na conta. Taxa diferente do contrato vira alerta. Em breve.",
    icon: CloudLightning,
    color: "#10B981"
  },
  {
    title: "Classificação",
    label: "Zera o imposto a mais",
    copy: "Revisa o cadastro fiscal de cada produto, na venda e na compra, e prepara a loja para a reforma tributária (CBS e IBS). Em breve.",
    icon: Zap,
    color: "#2ECC71"
  },
  {
    title: "Recebimento",
    label: "Zera o custo velho",
    copy: "O XML da nota vira produto e custo atualizado no cadastro, com o preço sugerido pelo seu markup. Próxima camada.",
    icon: ShieldCheck,
    color: "#059669"
  },
];

export default function Features() {
  const { setOpen: openDemoModal } = useDemoModal();
  const [activeFeature, setActiveFeature] = useState<number | string | null>(null);

  return (
    <section id="funcionalidades" className="py-32 relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Animated Background Deco Blobs for Glass Depth */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[hsl(var(--zera-emerald))]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div
          {...fadeUp(0)}
          className="text-center mb-24"
        >
          <span className="mono-label text-[10px] tracking-[0.4em] font-bold text-[hsl(var(--zera-emerald))] uppercase mb-4 inline-block">
            As camadas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
            Uma camada para cada <br />
            <span className="text-gradient-genesis italic">vazamento.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(0.1 + i * 0.1)}
              whileInView={{
                opacity: 1,
                y: 0,
                borderColor: "rgba(0, 230, 153, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.04)"
              }}
              viewport={{ once: false, amount: 0.3 }}
              onClick={() => setActiveFeature(activeFeature === i ? null : i)}
              className={`glass-premium relative group flex flex-col gap-6 rounded-[32px] p-8 cursor-pointer transition-all duration-500 overflow-hidden border border-white/5 h-full ${activeFeature === i
                ? "border-[hsl(var(--zera-emerald))]/50 bg-white/[0.05] ring-1 ring-[hsl(var(--zera-emerald))]/20 shadow-[0_0_30px_rgba(0,230,153,0.15)]"
                : "hover:border-white/20"
                }`}
            >
              {/* Inner Gloss Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

              {/* Feature Accent Line */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] transition-opacity duration-500 ${activeFeature === i ? "opacity-100" : "opacity-20 group-hover:opacity-60"
                  }`}
                style={{ background: f.color }}
              />

              <div className="flex justify-between items-start mb-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                  style={{ borderColor: `${f.color}33` }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[8px] font-mono font-bold tracking-[0.2em] text-white/30 uppercase">
                  {f.label}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {f.title}
                </h3>
              </div>

              <p className="text-[13px] leading-relaxed text-white/50 font-sans">
                {f.copy}
              </p>

              {/* Selection Glow */}
              <motion.div
                className="absolute -bottom-24 -right-24 w-48 h-48 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700"
                style={{ background: f.color }}
                animate={{
                  opacity: activeFeature === i ? 0.2 : 0,
                }}
                whileInView={{
                  opacity: activeFeature === i ? 0.2 : 0.12
                }}
                viewport={{ once: false, amount: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Impact Social Section (Wide Card - Now centered/cleaner without image) */}
        <motion.div
          {...fadeUp(0.5)}
          whileInView={{
            opacity: 1,
            y: 0,
            borderColor: "rgba(0, 230, 153, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.04)"
          }}
          viewport={{ once: false, amount: 0.3 }}
          onClick={() => setActiveFeature(activeFeature === 'hub' ? null : 'hub')}
          className={`glass-premium relative mt-6 rounded-[40px] p-10 md:p-14 overflow-hidden group cursor-pointer transition-all duration-500 border border-white/5 ${activeFeature === 'hub'
            ? "border-[hsl(var(--zera-emerald))]/50 bg-white/[0.05] ring-1 ring-[hsl(var(--zera-emerald))]/20 shadow-[0_0_50px_rgba(0,230,153,0.15)]"
            : "hover:border-white/20"
            }`}
        >
          {/* Inner Gloss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

          {/* Feature Accent Line */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] transition-opacity duration-500 ${activeFeature === 'hub' ? "opacity-100" : "opacity-20 group-hover:opacity-60"
              }`}
            style={{ background: 'hsl(var(--zera-emerald))' }}
          />

          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-[hsl(var(--zera-emerald))] uppercase">
                Disponível primeiro
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                Fechamento. <span className="text-white/40 italic">O copiloto do dono.</span>
              </h3>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-white/50 font-sans">
              Vendas, margem e caixa do dia anterior no seu WhatsApp, comparados com o mesmo dia da semana. Zera o ponto cego e a diferença de caixa: cancelamentos, descontos e sangrias fora do padrão aparecem por operador.
            </p>

            <div className="flex flex-wrap gap-6 items-center justify-center">
              <button
                onClick={() => openDemoModal(true)}
                className="btn-zera-emerald group h-14 px-8"
              >
                Quero testar
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 bg-white/5">
                <Heart size={16} className="text-[hsl(var(--zera-emerald))]" />
                <span className="text-xs font-mono font-bold tracking-widest text-white/60 uppercase">Resumo às 6h no WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Selection Glow */}
          <motion.div
            className="absolute -bottom-32 -right-32 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700"
            style={{ background: 'hsl(var(--zera-emerald))' }}
            animate={{
              opacity: activeFeature === 'hub' ? 0.2 : 0,
            }}
            whileInView={{
              opacity: activeFeature === 'hub' ? 0.2 : 0.12
            }}
            viewport={{ once: false, amount: 0.3 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
