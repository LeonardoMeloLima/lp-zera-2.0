import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Rocket } from "lucide-react";
import { useDemoModal } from "@/hooks/use-demo-modal";
import appPreview from "@/assets/app-preview.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" } as const
});

export default function Hero() {
  const { setOpen: openDemoModal } = useDemoModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    // Force muted attributes for iOS
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "");

    const attemptPlay = (retries = [0, 300, 1200]) => {
      if (!isVisibleRef.current) return;
      const tryPlay = (i: number) => {
        if (i >= retries.length || !isVisibleRef.current) return;
        setTimeout(() => {
          video.play().catch(() => tryPlay(i + 1));
        }, retries[i]);
      };
      tryPlay(0);
    };

    // IntersectionObserver — play/pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );
    observer.observe(el);

    // Media event triggers
    const onReady = () => attemptPlay();
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);

    // Tab visibility / pageshow
    const onVisibility = () => {
      if (document.visibilityState === "visible") attemptPlay();
    };
    const onPageShow = () => attemptPlay();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    // Silent gesture unlock (one-shot)
    const unlockPlay = () => {
      attemptPlay();
      document.removeEventListener("touchstart", unlockPlay);
      document.removeEventListener("scroll", unlockPlay);
    };
    document.addEventListener("touchstart", unlockPlay, { once: true, passive: true });
    document.addEventListener("scroll", unlockPlay, { once: true, passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("touchstart", unlockPlay);
      document.removeEventListener("scroll", unlockPlay);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }} />

      {/* Volumetric emerald glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--zera-emerald) / 0.15) 0%, transparent 70%)" }} />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--mint-accent) / 0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)}>
            <span className="badge-hero">
              <Rocket size={14} />
              Meio Ambiente, Social e Governança
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="max-w-4xl text-4xl font-bold text-white leading-tight md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.03em" }}>
            Transforme o Desperdício em{" "}
            <span className="text-gradient-green">
              Lucro, Carbono e Impacto Social.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.3)}
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "#D1D5DB" }}>A única plataforma que une gestão preditiva de validades, diminuiu o desperdício gerando ativos elegíveis a créditos de carbono e conecta suas perdas evitadas a quem mais precisa através do nosso Radar de ONGs.

          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openDemoModal(true)}
              className="relative inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold tracking-wide rounded-xl cursor-pointer transition-all duration-300 group"
              style={{
                background: "linear-gradient(135deg, hsl(var(--green)), hsl(var(--green-light)))",
                color: "hsl(var(--green-foreground))",
                boxShadow: "0 0 24px hsl(var(--green) / 0.4), 0 0 60px hsl(var(--green) / 0.15), 0 4px 16px hsl(0 0% 0% / 0.4)"
              }}>
              <span className="absolute inset-0 rounded-xl animate-[pulse_2.5s_ease-in-out_infinite] opacity-40"
                style={{ boxShadow: "0 0 28px hsl(var(--green-bright) / 0.5)" }} />
              <CalendarCheck size={18} className="relative z-10" />
              <span className="relative z-10">Agendar Demonstração</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#ecossistema-esg"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium rounded-xl border transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: "hsl(0 0% 100% / 0.1)",
                color: "hsl(0 0% 85%)",
                background: "hsl(0 0% 100% / 0.04)",
                backdropFilter: "blur(12px)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(0 0% 100% / 0.08)";
                e.currentTarget.style.borderColor = "hsl(var(--green) / 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsl(0 0% 100% / 0.04)";
                e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.1)";
              }}>
              <Rocket size={15} />
              Nosso Ecossistema
            </a>
          </motion.div>

          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative mt-12 w-full max-w-[320px] mx-auto"
            ref={containerRef}>

            {/* Glow under video */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl opacity-30 rounded-full"
              style={{ background: "hsl(var(--green))" }} />

            <div
              className="relative rounded-3xl overflow-hidden border"
              style={{
                borderColor: "hsl(var(--green) / 0.25)",
                boxShadow: "0 0 40px -10px hsl(var(--green) / 0.3), 0 32px 80px hsl(0 0% 0% / 0.4)"
              }}>
              <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                muted
                // @ts-ignore defaultMuted needed for iOS
                defaultMuted
                playsInline
                loop
                preload="metadata"
                controls={false}
                poster={appPreview}
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
    </section>);
}
