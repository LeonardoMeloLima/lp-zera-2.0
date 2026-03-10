import { motion } from "framer-motion";
import { FileCode2, Barcode, ShieldCheck, Leaf, Database, Zap, Cpu, FileCheck } from "lucide-react";

const tags = [
  { icon: FileCode2, label: "Sefaz Integration" },
  { icon: Barcode, label: "GS1 Global Standards" },
  { icon: ShieldCheck, label: "ISO 27001 Security" },
  { icon: Leaf, label: "MRV - Tokens Certified Protocol" },
  { icon: Database, label: "Encrypted Data Lake" },
  { icon: Zap, label: "NCM Automation" },
  { icon: Cpu, label: "Market Intelligence" },
  { icon: FileCheck, label: "ESG Audit Ready" },
];

const doubleTags = [...tags, ...tags];

export default function SocialProof() {
  return (
    <section className="py-20 bg-background border-y border-white/5 relative overflow-hidden">
      {/* Background Micro-mesh (Genesis style) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-12 text-[hsl(var(--zera-emerald))]"
        >
          Infraestrutura & Conformidade Global
        </motion.p>

        <div className="marquee-wrap relative">
          {/* Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

          <div className="marquee-track flex gap-8 items-center">
            {doubleTags.map((tag, i) => {
              const Icon = tag.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors group cursor-default"
                >
                  <Icon size={14} className="text-white/40 group-hover:text-[hsl(var(--zera-emerald))] transition-colors" />
                  <span className="text-[11px] font-mono font-bold tracking-tight text-white/60 whitespace-nowrap uppercase">
                    {tag.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
