import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCalendly } from "@/hooks/use-calendly";

const badges = ["CEAGESP", "CEASA", "CONAB", "INMET"];

export default function TrustROI() {
  const openCalendly = useCalendly();
  return (
    <section
      className="section-padding px-6"
      style={{ background: "hsl(var(--dark-bg))" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight md:text-5xl"
          style={{ color: "hsl(0 0% 100%)", letterSpacing: "-0.025em" }}
        >
          O Zera se paga na primeira compra mal feita que você{" "}
          <span className="text-gradient-green">evitar.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg leading-relaxed max-w-3xl mx-auto"
          style={{ color: "hsl(215 20% 70%)" }}
        >
          Ao cruzar suas notas fiscais com a média do CEASA/CEAGESP e antecipar
          quebras de safra com o INMET, nosso ecossistema protege a sua margem de
          lucro antes mesmo do produto chegar na prateleira.
        </motion.p>

        {/* Authority Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wider"
              style={{
                background: "hsl(0 0% 100% / 0.07)",
                border: "1px solid hsl(0 0% 100% / 0.15)",
                color: "hsl(0 0% 100% / 0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#"
            onClick={openCalendly}
            className="btn-green-lg inline-flex items-center gap-3 group text-base"
          >
            Quero proteger minha margem agora
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
