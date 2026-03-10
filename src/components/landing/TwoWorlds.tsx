import { motion } from "framer-motion";
import { Zap, Droplets, Leaf, Cloud, ArrowRight, TrendingDown, Target } from "lucide-react";
import soilBg from "../../assets/genesis_soil_texture_bg.png";

const stats = [
  {
    value: "+33%",
    label: "da produção global de alimentos é desperdiçada anualmente.",
    icon: TrendingDown,
  },
  {
    value: "R$ 4B",
    label: "é o prejuízo anual do varejo alimentar brasileiro.",
    icon: Target,
  },
];

const cards = [
  {
    icon: Droplets,
    title: "Recursos Hídricos",
    value: "154m³ /ton",
    progress: 75,
    subtitle: "de água recuperada em processos",
  },
  {
    icon: Leaf,
    title: "Biodiversidade",
    value: "12kg /ha",
    progress: 45,
    subtitle: "de microorganismos em solos recuperados",
  },
  {
    icon: Cloud,
    title: "Estoque de Carbono",
    value: "210t /ha",
    progress: 90,
    subtitle: "de CO2 equivalente neutralizado",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const
});

export default function TwoWorlds() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="fluxo">
      {/* Background Texture Overlay - Max Visibility */}
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: `url(${soilBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9) contrast(1.2)'
        }}
      />

      {/* Dark Vibe Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-background/10 pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[hsl(var(--zera-emerald))]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[hsl(var(--zera-emerald))]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column: headlines in Glass Card */}
          <motion.div
            {...fadeUp(0)}
            className="glass-premium p-10 md:p-14 rounded-[40px] flex flex-col justify-between border-white/10 bg-black/40 backdrop-blur-2xl"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--zera-emerald))]/10 border border-[hsl(var(--zera-emerald))]/20 mb-8 font-mono">
                <Zap size={12} className="text-[hsl(var(--zera-emerald))]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--zera-emerald))]">
                  Simbiose Digital
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-[0.95]">
                Negócio em risco.<br />
                <span className="text-white/40 italic font-sans">É hora de agir.</span>
              </h2>

              <p className="text-xl text-white/60 max-w-lg leading-relaxed font-sans mb-12">
                Estabelecemos como meta reverter a tendência global promovendo a inteligência circular na cadeia de alimentos.
              </p>
            </div>

            <div className="flex flex-wrap gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <stat.icon size={20} className="text-[hsl(var(--zera-emerald))]" />
                    </div>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="188"
                        strokeDashoffset="60"
                        className="text-[hsl(var(--zera-emerald))]/40"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-white block">{stat.value}</span>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono font-bold">
                      {stat.label.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: metrics in Stacked Glass Cards */}
          <div className="flex flex-col justify-center space-y-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(0.2 + i * 0.1)}
                className="glass-premium p-8 rounded-[32px] flex items-center gap-8 relative group border-white/10 bg-black/40 backdrop-blur-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[hsl(var(--zera-emerald))]/30 transition-all duration-500">
                  <card.icon size={28} className="text-[hsl(var(--zera-emerald))]" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-white/40 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">
                        {card.title}
                      </h3>
                      <div className="text-2xl font-bold text-white tracking-tight">
                        {card.value}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                      Protocol v4.2
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[hsl(var(--zera-emerald))]/40 to-[hsl(var(--zera-emerald))]"
                    />
                  </div>

                  <p className="text-[10px] text-white/20 font-sans uppercase tracking-widest">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Side Label Decor */}
            <div className="absolute -right-12 top-1/2 -rotate-90 translate-y-[-50%] pointer-events-none hidden xl:block">
              <span className="text-[10px] font-mono text-white/5 uppercase tracking-[1em] whitespace-nowrap">
                SIMBIOSE . DIGITAL . ECOSYSTEM
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
