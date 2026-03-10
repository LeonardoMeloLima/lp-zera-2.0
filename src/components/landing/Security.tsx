import { motion } from "framer-motion";
import { ShieldCheck, Lock, Cpu } from "lucide-react";
import securityPanel from "@/assets/security-panel.png";

const bullets = [
  {
    icon: Lock,
    title: "Isolamento de Dados (RLS)",
    description: "Dados criptografados e isolados. Ninguém além de você acessa seu estoque."
  },
  {
    icon: Cpu,
    title: "Regras no Backend",
    description: "Lógica de negócio e cálculos de carbono blindados em nível de banco de dados, imunes a fraudes."
  },
  {
    icon: ShieldCheck,
    title: "API Ready",
    description: "Estrutura RESTful pronta para integrar com seu sistema de retaguarda atual."
  }
];

export default function Security() {
  return (
    <section
      id="seguranca"
      className="section-padding"
      style={{ background: "hsl(var(--background))" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-feature mb-4 inline-block">Segurança Enterprise</span>
            <h2 className="section-heading mb-6">
              Arquitetura Enterprise.{" "}
              <span className="text-gradient-blue">
                Pronto para o seu ERP, na palma de sua mão.
              </span>
            </h2>

            <div className="flex flex-col gap-6">
              {bullets.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-4 items-start"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                      style={{ background: "hsl(var(--primary-glow) / 0.15)" }}
                    >
                      <Icon size={18} style={{ color: "hsl(var(--primary-glow))" }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{b.title}</h4>
                      <p className="text-base" style={{ color: "hsl(215 20% 65%)" }}>
                        {b.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <img
              src={securityPanel}
              alt="Zera Security Layer — Enterprise Grade Protection"
              className="h-auto rounded-3xl max-w-[280px] lg:max-w-[320px]"
              style={{
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5), var(--shadow-glow-blue)"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
