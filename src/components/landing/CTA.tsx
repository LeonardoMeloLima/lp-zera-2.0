import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { useCalendly } from "@/hooks/use-calendly";

export default function CTA() {
  const openCalendly = useCalendly();
  return (
    <section id="demo" className="section-padding px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
          style={{
            background: "var(--gradient-cta)",
            boxShadow: "var(--shadow-xl), 0 0 80px -20px hsl(var(--green) / 0.5)",
          }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(0 0% 100% / 0.07) 1px, transparent 1px),
                linear-gradient(90deg, hsl(0 0% 100% / 0.07) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "hsl(145 90% 80%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "hsl(0 0% 100% / 0.15)" }}
            >
              <Leaf size={28} className="text-white" />
            </div>

            <h2
              className="text-3xl font-bold text-white leading-tight md:text-5xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              Preparado para zerar suas perdas e entrar na{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(60 100% 80%), hsl(90 80% 75%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                economia verde?
              </span>
            </h2>

            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: "hsl(145 30% 85%)" }}
            >
              Junte-se a empresas que estão transformando um problema logístico em uma nova linha de
              receita.
            </p>

            <a
              href="#"
              onClick={openCalendly}
              className="inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-200 group"
              style={{
                background: "hsl(0 0% 100%)",
                color: "hsl(var(--green))",
                boxShadow: "0 8px 24px hsl(222 47% 5% / 0.25)",
              }}
            >
              Falar com um Especialista
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <p className="text-sm" style={{ color: "hsl(145 30% 80%)" }}>
              Sem compromisso · Demonstração gratuita · Resposta em 24h
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
