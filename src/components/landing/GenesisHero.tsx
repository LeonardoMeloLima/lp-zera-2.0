import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield } from "lucide-react";
import { useDemoModal } from "@/hooks/use-demo-modal";
import genesisHeroBg from "@/assets/genesis_hero_bg.png";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const
});

export default function GenesisHero() {
    const { setOpen: openDemoModal } = useDemoModal();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Soft Obsidian Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[hsl(var(--zera-emerald))]/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-[hsl(var(--mint-accent))]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Premium Genesis Background (Sky Layer) */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <img
                    src={genesisHeroBg}
                    alt="Genesis Background"
                    className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
                {/* Technical Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,153,0.1)_0%,transparent_70%)]" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-24 items-center justify-center">
                {/* Text Content */}
                <div className="flex flex-col gap-8 flex-1 max-w-3xl">
                    <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-white/20" />
                        <span className="mono-label text-[10px] tracking-[0.4em] text-[hsl(var(--zera-emerald))] font-bold uppercase">
                            Meio Ambiente, Social e Governança
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp(0.2)}
                        className="text-6xl md:text-7xl lg:text-8xl font-sans font-bold leading-[0.9] tracking-tighter text-white"
                    >
                        Rentabilize seu <br />
                        <span className="text-gradient-genesis">Desperdício.</span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.3)}
                        className="max-w-xl text-lg text-white/60 leading-relaxed font-sans"
                    >
                        A única plataforma que une gestão preditiva de validades, diminuiu o desperdício gerando ativos e tokens que valem dinheiro, e conecta suas perdas evitadas a quem mais precisa através do nosso Radar de ONGs.
                    </motion.p>

                    <motion.div {...fadeUp(0.4)} className="flex items-center gap-6 mt-4">
                        <button
                            onClick={() => openDemoModal(true)}
                            className="btn-zera-emerald group"
                        >
                            Agendar Demo
                            <div className="absolute -inset-1 bg-white/10 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <a href="#fluxo" className="flex items-center gap-2 text-white/50 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors cursor-pointer">
                            Ver Ecossistema ESG <ArrowRight size={14} />
                        </a>
                    </motion.div>

                    <motion.div {...fadeUp(0.5)} className="flex items-center gap-8 mt-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-white leading-none">15%</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Redução Média de Perdas</span>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Content: Video Player replacing Dashboard */}
                <div className="relative flex-none flex justify-center w-full max-w-[320px]">
                    <div className="relative w-full">
                        {/* Background floating elements - Repositioned for smaller container */}


                        {/* Video Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="glass-premium rounded-[40px] p-2 overflow-hidden border-white/10 relative z-10"
                        >
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-auto rounded-[32px] object-contain shadow-2xl"
                            >
                                <source src="/video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Inner Glow/Overlay for premium look */}
                            <div className="absolute inset-0 pointer-events-none rounded-[40px] ring-1 ring-inset ring-white/20 shadow-[inset_0_0_80px_rgba(2,6,5,0.4)]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Technical Floor Layer */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
