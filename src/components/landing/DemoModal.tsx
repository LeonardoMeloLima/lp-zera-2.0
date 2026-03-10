import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Layout, BarChart, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCalendly } from "@/hooks/use-calendly";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const volumeOptions = [
  "1 a 5 lojas",
  "6 a 20 lojas",
  "21 a 50 lojas",
  "Mais de 50 lojas",
];

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const openCalendly = useCalendly();
  const [form, setForm] = useState({
    nome_completo: "",
    email_corporativo: "",
    cargo: "",
    nome_empresa: "",
    volume_lojas: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("b2b_leads" as any).insert({
        nome_completo: form.nome_completo.trim(),
        email_corporativo: form.email_corporativo.trim(),
        cargo: form.cargo.trim(),
        nome_empresa: form.nome_empresa.trim(),
        volume_lojas: form.volume_lojas,
        mensagem: form.mensagem.trim() || null,
      });
      if (error) throw error;
      setLoading(false);
      handleClose();
      toast.success("Protocolo validado. Abrindo agenda de briefing...");
      try {
        await openCalendly();
      } catch {
        window.open("https://calendly.com/zeraapp", "_blank");
      }
    } catch (err) {
      console.error("Insert error:", err);
      setLoading(false);
      toast.error("Erro no protocolo. Tente novamente.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ nome_completo: "", email_corporativo: "", cargo: "", nome_empresa: "", volume_lojas: "", mensagem: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg glass-premium rounded-[32px] p-10 max-h-[90vh] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E699]/20 to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            <div>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <Layout size={12} className="text-emerald-500" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
                    Technical Briefing
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                  Agende sua <span className="text-gradient-genesis italic">Demonstração</span>
                </h3>
                <p className="text-sm font-sans text-white/40 leading-relaxed">
                  Analise como o ecossistema Zera integra-se à sua arquitetura logística para neutralizar desperdício e maximizar margem.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block mb-2">
                      Informações Profissionais
                    </label>
                    <input name="nome_completo" value={form.nome_completo} onChange={handleChange} placeholder="Nome Completo" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    <input name="email_corporativo" type="email" value={form.email_corporativo} onChange={handleChange} placeholder="E-mail Corporativo" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                      <input name="nome_empresa" value={form.nome_empresa} onChange={handleChange} placeholder="Empresa" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block">
                      Escopo da Operação
                    </label>
                    <div className="relative">
                      <select name="volume_lojas" value={form.volume_lojas} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer pr-12">
                        <option value="" disabled className="bg-black text-white/20">Volume de Lojas</option>
                        {volumeOptions.map((v) => (
                          <option key={v} value={v} className="bg-[#0A0A0A] text-white">{v}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Descreva seus principais desafios logísticos (Opcional)" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20 resize-none" />
                </div>

                <button type="submit" className="btn-zera-emerald w-full mt-4 flex items-center justify-center gap-3 group" disabled={loading}>
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sincronizando...</>
                  ) : (
                    <>
                      Confirmar Agendamento
                      <Calendar size={18} className="group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex flex-col gap-2 items-center justify-center py-4 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-2">
                    <BarChart size={12} className="text-white/20" />
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Data Analysis Layer Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings size={12} className="text-white/20" />
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Zero-Waste Protocol v4.2.0</span>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
