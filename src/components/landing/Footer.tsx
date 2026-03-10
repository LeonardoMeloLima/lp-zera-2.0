import { Mail, Copy, Globe, Shield, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import soilTexture from "@/assets/zera-footer-soil.png";


const EMAIL = "atendimento@zera.eco.br";

export default function Footer() {
  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      toast.success("E-mail copiado com sucesso!", {
        style: { background: "#000", color: "#fff", borderColor: "rgba(255,255,255,0.1)" }
      });
    });
  };

  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Simplified Brand Header - No glass, just logo, positioned lower */}
        <div className="flex flex-col items-center justify-center pt-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-none"
          >
            <Leaf className="w-14 h-14 md:w-16 md:h-16 text-[hsl(var(--zera-emerald))]" strokeWidth={2.5} />
            <span className="text-gradient-genesis">ZERA</span>
          </motion.div>
        </div>

        {/* Contact info grid */}
        <div className="grid md:grid-cols-3 gap-12 py-12 border-b border-white/5 relative z-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
              <Mail size={18} className="text-[hsl(var(--zera-emerald))]" />
            </div>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={handleCopy}>
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{EMAIL}</span>
              <Copy size={12} className="text-white/20 group-hover:text-white/60" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
              <Globe size={18} className="text-[#2ECC71]" />
            </div>
            <span className="text-sm font-medium text-white/60">São Paulo, BR • Global Compliance</span>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
              <Shield size={18} className="text-[hsl(var(--zera-emerald))]" />
            </div>
            <span className="text-sm font-medium text-white/60">MRV - Tokens Certified Protocol</span>
          </div>
        </div>

        {/* Legal & Status */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-8 relative z-10">
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase hover:text-white transition-colors">Termos de Uso</a>
          </div>

          <p className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase">
            © 2026 ZERA AI Copilot • v4.2.0
          </p>

          <div className="flex items-center gap-3 glass-premium px-4 py-2 rounded-full border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-500/80 uppercase">Operational</span>
          </div>
        </div>
      </div>

      {/* Soil Texture Background Layer */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none -z-0 opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-black z-10" />
        <img
          src={soilTexture}
          alt=""
          className="w-full h-full object-cover object-bottom transition-opacity duration-1000 brightness-[1.1]"
        />
      </div>
    </footer>
  );
}
