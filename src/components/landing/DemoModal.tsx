import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar, Layout, BarChart, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

const sistemaCaixaOptions = ["VR System", "Hiper", "Outro", "Não sei"];

const ERRO_GENERICO = "Não deu para enviar. Tente de novo.";

const formVazio = {
  nome: "",
  whatsapp: "",
  cidade: "",
  nome_comercio: "",
  sistema_caixa: "",
  mensagem: "",
};

// Erro 400 da função traz a mensagem em português em { error }.
async function mensagemDoServidor(error: unknown): Promise<string> {
  const contexto = (error as { context?: unknown })?.context;
  if (contexto instanceof Response && contexto.status === 400) {
    const corpo = await contexto.json().catch(() => null);
    if (typeof corpo?.error === "string") return corpo.error;
  }
  return ERRO_GENERICO;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [form, setForm] = useState(formVazio);
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
      const { error } = await supabase.functions.invoke("capture-lead-loja", { body: form });
      if (error) {
        setLoading(false);
        toast.error(await mensagemDoServidor(error));
        return;
      }
      setLoading(false);
      handleClose();
      toast.success("Recebido! Vamos te chamar no WhatsApp.");
    } catch (err) {
      console.error("Erro ao enviar lead:", err);
      setLoading(false);
      toast.error(ERRO_GENERICO);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(formVazio);
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
                    Fale com a gente
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                  Quero testar o <span className="text-gradient-genesis italic">Zera</span>
                </h3>
                <p className="text-sm font-sans text-white/40 leading-relaxed">
                  Conte um pouco da sua loja. A gente responde pelo WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block mb-2">
                      Sobre você
                    </label>
                    <input name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    <input name="whatsapp" type="tel" inputMode="tel" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp (com DDD)" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                      <input name="nome_comercio" value={form.nome_comercio} onChange={handleChange} placeholder="Nome do comércio" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block">
                      Sobre a loja
                    </label>
                    <div className="relative">
                      <select name="sistema_caixa" value={form.sistema_caixa} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer pr-12">
                        <option value="" disabled className="bg-black text-white/20">Sistema de caixa</option>
                        {sistemaCaixaOptions.map((v) => (
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

                  <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="O que mais te incomoda na gestão da loja? (Opcional)" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20 resize-none" />
                </div>

                <button type="submit" className="btn-zera-emerald w-full mt-4 flex items-center justify-center gap-3 group" disabled={loading}>
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                  ) : (
                    <>
                      Enviar
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
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Sem compromisso.</span>
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
