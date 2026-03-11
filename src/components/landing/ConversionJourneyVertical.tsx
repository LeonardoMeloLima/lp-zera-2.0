import { motion } from "framer-motion";
import { Database, Cpu, ShieldCheck, TrendingUp } from "lucide-react";

const steps = [
    {
        icon: Database,
        title: "1. Coleta e Protocolo MRV",
        desc: "Dados de perdas da loja/CD são medidos, relatados e auditados em tempo real pelo Protocolo MRV.",
        color: "#00E699"
    },
    {
        icon: Cpu,
        title: "2. Tokenização do Ativo Digital",
        desc: "A saída dos dados validados é convertida em tokens, criando um ativo financeiro digital.",
        color: "#10B981"
    },
    {
        icon: ShieldCheck,
        title: "3. Compliance e Valorização ESG",
        desc: "Atendimento a normas de sustentabilidade que elevam o valor de mercado da operação.",
        color: "#34D399"
    },
    {
        icon: TrendingUp,
        title: "4. Monetização e Crédito Verde",
        desc: "O ativo permite a venda em mercados voluntários ou acesso a juros e taxas menores.",
        color: "#00E699"
    }
];

export default function ConversionJourneyVertical() {
    return (
        <div className="relative mt-8 py-6 px-4 md:px-6 bg-white/[0.02] rounded-[32px] border border-white/5 overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[hsl(var(--zera-emerald))]/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Central Vertical Line */}
            <div className="absolute left-9 md:left-11 top-14 bottom-14 w-[2px] bg-gradient-to-b from-[hsl(var(--zera-emerald))]/50 via-[hsl(var(--zera-emerald))]/10 to-transparent hidden sm:block" />

            <div className="space-y-10 relative z-10">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        className="flex gap-4 md:gap-6 group"
                    >
                        {/* Icon Node */}
                        <div className="flex-shrink-0 relative">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,230,153,0.05)] group-hover:border-[hsl(var(--zera-emerald))]/40 transition-all duration-500 group-hover:scale-110">
                                <step.icon size={20} className="text-[hsl(var(--zera-emerald))]" />
                            </div>

                            {/* Step Number Badge */}
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[hsl(var(--zera-emerald))] text-black text-[8px] font-bold flex items-center justify-center border border-black">
                                {i + 1}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                            <h4 className="text-white font-bold text-sm md:text-base mb-1 tracking-tight group-hover:text-[hsl(var(--zera-emerald))] transition-colors duration-300">
                                {step.title}
                            </h4>
                            <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-sm font-sans">
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom status indicator */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-1">
                    {[1, 2, 3].map(dot => (
                        <div key={dot} className="w-1 h-1 rounded-full bg-[hsl(var(--zera-emerald))]/20" />
                    ))}
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    Ciclo de Monetização Ativo
                </span>
            </div>
        </div>
    );
}
