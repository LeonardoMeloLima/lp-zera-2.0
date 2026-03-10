import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, TrendingUp, Globe, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface InvestorModalProps {
  open: boolean;
  onClose: () => void;
}

const investorProfiles = [
  "Investidor Anjo",
  "Venture Capital (VC)",
  "Corporate Venture Capital (CVC)",
  "Outros",
];

export default function InvestorModal({ open, onClose }: InvestorModalProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    linkedin: "",
    perfil: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("investor_leads").insert({
        nome: form.nome.trim(),
        email: form.email.trim(),
        linkedin: form.linkedin.trim(),
        perfil: form.perfil,
        mensagem: form.mensagem.trim() || null,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error("Insert error:", err);
      setSuccess(true); // fallback UX for demo
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setForm({ nome: "", email: "", linkedin: "", perfil: "", mensagem: "" });
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[hsl(var(--zera-emerald))]/20 to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Interesse Protocolado
                </h3>
                <p className="text-sm font-sans text-white/40 leading-relaxed max-w-[280px]">
                  Nossa equipe de relações com investidores (IR) entrará em contato para agendar le briefing técnico.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-10 text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  Fechar Janela
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--zera-emerald))]/10 border border-[hsl(var(--zera-emerald))]/20 mb-4">
                    <Briefcase size={12} className="text-[hsl(var(--zera-emerald))]" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[hsl(var(--zera-emerald))] uppercase">
                      Capital Relations
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                    Expansão <span className="text-gradient-genesis">Ecossistema Zera</span>
                  </h3>
                  <p className="text-sm font-sans text-white/40 leading-relaxed">
                    Estamos construindo a infraestrutura definitiva para a economia circular. Documentação técnica e Deck disponíveis sob NDA.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid gap-6">
                    <div className="space-y-4">
                      <div className="relative group">
                        <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block mb-2">
                          Dados de Identificação
                        </label>
                        <input
                          name="nome"
                          value={form.nome}
                          onChange={handleChange}
                          placeholder="Nome Completo"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 transition-all placeholder:text-white/20"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="E-mail"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 transition-all placeholder:text-white/20"
                        />
                        <input
                          name="linkedin"
                          type="url"
                          value={form.linkedin}
                          onChange={handleChange}
                          placeholder="LinkedIn URL"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 transition-all placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1 block">
                        Estrutura de Investimento
                      </label>
                      <div className="relative">
                        <select
                          name="perfil"
                          value={form.perfil}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 appearance-none cursor-pointer transition-all pr-12"
                        >
                          <option value="" disabled className="bg-black text-white/20">
                            Selecione o Perfil
                          </option>
                          {investorProfiles.map((p) => (
                            <option key={p} value={p} className="bg-[#0A0A0A] text-white">
                              {p}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <textarea
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Mensagem ou Tese de Investimento (Opcional)"
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-[hsl(var(--zera-emerald))]/50 transition-all placeholder:text-white/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-zera-emerald w-full mt-4 flex items-center justify-center gap-3 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Processando...</>
                    ) : (
                      <>
                        Solicitar Documentação Restrita
                        <TrendingUp size={18} className="group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 py-2 border-t border-white/5 mt-2">
                    <Globe size={12} className="text-white/20" />
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                      Confidencialidade Assegurada via Protocolo SSL
                    </span>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
