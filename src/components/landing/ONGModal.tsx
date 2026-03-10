import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ShieldCheck, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ONGModalProps {
  open: boolean;
  onClose: () => void;
}

const initialForm = {
  nome_ong: "",
  cnpj: "",
  nome_responsavel: "",
  email: "",
  telefone: "",
  mensagem: "",
};

export default function ONGModal({ open, onClose }: ONGModalProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("ong_leads").insert({
        nome_ong: form.nome_ong,
        cnpj: form.cnpj,
        nome_responsavel: form.nome_responsavel,
        email: form.email,
        telefone: form.telefone || null,
        mensagem: form.mensagem || null,
      });
      if (error) throw error;
      toast.success("Protocolo de cadastro iniciado. Nossa equipe jurídica entrará em contato.");
      setForm(initialForm);
      onClose();
    } catch (err: any) {
      console.error("ONG insert error:", err);
      const msg = err?.message || "Erro de conexão";
      toast.error(`Falha no Protocolo: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg glass-premium rounded-[32px] p-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
                  Social Impact Protocol
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                Conectar <span className="text-[#00E699]">ONG / Instituição</span>
              </h3>
              <p className="text-sm font-sans text-white/40 leading-relaxed">
                Nossa rede de impacto exige validação jurídica rigorosa para garantir a transparência total do ecossistema Zera.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1">
                    Identificação Institucional
                  </label>
                  <input
                    name="nome_ong"
                    value={form.nome_ong}
                    onChange={handleChange}
                    placeholder="Nome da ONG / Instituição"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                  />
                  <input
                    name="cnpj"
                    value={form.cnpj}
                    onChange={handleChange}
                    placeholder="CNPJ"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase ml-1">
                    Ponto de Contato
                  </label>
                  <input
                    name="nome_responsavel"
                    value={form.nome_responsavel}
                    onChange={handleChange}
                    placeholder="Nome do Responsável"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                    />
                    <input
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      placeholder="Telefone"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva brevemente sua atuação (Impacto principal, região, etc)"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20 resize-none"
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
                    Iniciar Protocolo de Ativação
                    <Heart size={18} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[9px] font-mono text-center text-white/20 uppercase tracking-[0.2em]">
                Auditoria de conformidade ativa v3.4.12
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
