import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, DollarSign, ShieldCheck, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqData = [
    {
        category: "Como funciona",
        icon: <Settings className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "Preciso trocar meu sistema de caixa?",
                a: "Não. O Zera se conecta ao PDV que você já usa e só lê os dados. A rotina do caixa continua igual."
            },
            {
                q: "Quais sistemas funcionam?",
                a: "Começamos pelo VR System. O Hiper vem em seguida. Se a sua loja usa outro sistema, fale com a gente."
            },
            {
                q: "Vou ter que aprender um sistema novo?",
                a: "Não. O principal chega no WhatsApp, todo dia às 6h. O painel existe para quando você quiser ver o detalhe."
            },
            {
                q: "Serve para padaria, açougue e hortifrúti?",
                a: "Sim. O Zera foi feito para quem vende no caixa, do mercadinho ao supermercado, passando por padaria, açougue e hortifrúti."
            }
        ]
    },
    {
        category: "Seus dados",
        icon: <ShieldCheck className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "O Zera mexe nos dados da minha loja?",
                a: "Não. O acesso é só de leitura. Ele não altera preço, estoque nem venda."
            },
            {
                q: "Quem vê os números da minha loja?",
                a: "Só você e quem você autorizar."
            },
            {
                q: "De onde vêm os números desta página?",
                a: "De pesquisas públicas da Abrappe, da ABRAS, do Banco Central e da e-Auditoria. A fonte de cada um aparece junto do número."
            }
        ]
    },
    {
        category: "Preço e começo",
        icon: <DollarSign className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "Quanto custa?",
                a: "Mensalidade fixa, sem porcentagem sobre as vendas. O valor depende das camadas que você contratar."
            },
            {
                q: "Como eu começo?",
                a: "Clique em Quero testar, conte um pouco da sua loja e a gente chama você no WhatsApp."
            },
            {
                q: "As outras camadas já existem?",
                a: "Ainda não. O Fechamento vem primeiro e as outras chegam em sequência, começando pelo Recebimento. Depois vêm Quebra, Acerto, Classificação, Encomenda (pedido por WhatsApp e delivery) e Freguês (fidelidade e cashback pelo CPF na nota)."
            },
            {
                q: "E se eu tiver mais de uma loja?",
                a: "Cada loja tem o seu resumo, e você vê todas no mesmo painel."
            }
        ]
    }
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } as const
});

export default function FAQ() {
    const [openCategory, setOpenCategory] = useState<number | null>(null);
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const toggleCategory = (idx: number) => {
        setOpenCategory(openCategory === idx ? null : idx);
        setOpenQuestion(null); // Close inner questions when category changes
    };

    const toggleQuestion = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-black/50" id="faq">
            <div className="relative z-10 mx-auto max-w-4xl px-6">
                <motion.div {...fadeUp(0)} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4">
                        Dúvidas <span className="text-gradient-emerald italic">Frequentes</span>
                    </h2>
                    <p className="text-white/40 font-sans max-w-xl mx-auto text-sm">
                        Clique em uma categoria para ver as respostas.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {faqData.map((category, catIdx) => {
                        const isCatOpen = openCategory === catIdx;

                        return (
                            <motion.div
                                key={catIdx}
                                {...fadeUp(catIdx * 0.1)}
                                className={`group relative rounded-[32px] border transition-all duration-500 overflow-hidden ${isCatOpen
                                    ? "bg-white/[0.04] border-[hsl(var(--zera-emerald))]/30 shadow-[0_0_50px_-10px_rgba(16,185,129,0.1)]"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                                    }`}
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(catIdx)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isCatOpen
                                            ? "bg-[hsl(var(--zera-emerald))]/20 border-[hsl(var(--zera-emerald))]/40 scale-110"
                                            : "bg-white/5 border-white/10"
                                            }`}>
                                            {category.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isCatOpen ? "text-white" : "text-white/70 group-hover:text-white"
                                                }`}>
                                                {category.category}
                                            </h3>
                                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">
                                                {category.items.length} perguntas relacionadas
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isCatOpen ? "bg-[hsl(var(--zera-emerald))] border-[hsl(var(--zera-emerald))] rotate-180" : "bg-white/5"
                                        }`}>
                                        <ChevronDown size={18} className={isCatOpen ? "text-white" : "text-white/30"} />
                                    </div>
                                </button>

                                {/* Questions List (Nested Accordion) */}
                                <AnimatePresence>
                                    {isCatOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 space-y-3">
                                                {category.items.map((item, itemIdx) => {
                                                    const qId = `${catIdx}-${itemIdx}`;
                                                    const isQOpen = openQuestion === qId;

                                                    return (
                                                        <div
                                                            key={qId}
                                                            className={`rounded-2xl border transition-all duration-300 ${isQOpen
                                                                ? "bg-white/[0.05] border-white/10"
                                                                : "bg-white/[0.01] border-white/[0.03] hover:border-white/10"
                                                                }`}
                                                        >
                                                            <button
                                                                onClick={(e) => toggleQuestion(qId, e)}
                                                                className="w-full text-left p-5 flex items-start justify-between gap-4"
                                                            >
                                                                <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${isQOpen ? "text-white" : "text-white/50 hover:text-white/80"
                                                                    }`}>
                                                                    {item.q}
                                                                </span>
                                                                <div className="mt-1 flex-shrink-0 text-white/30">
                                                                    {isQOpen ? <Minus size={16} /> : <Plus size={16} />}
                                                                </div>
                                                            </button>

                                                            <AnimatePresence>
                                                                {isQOpen && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="px-5 pb-6 text-white/40 leading-relaxed font-sans text-sm md:text-base border-t border-white/[0.03] pt-4">
                                                                            {item.a}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(var(--zera-emerald))]/3 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
