import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, DollarSign, Leaf, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqData = [
    {
        category: "Como funciona",
        icon: <Settings className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "1. A Zera precisa trocar o ERP ou o sistema de caixa do meu supermercado?",
                a: "De forma alguma. A Zera funciona como uma camada de inteligência (plug-and-play) que se conecta ao seu ERP atual (SAP, TOTVS, Linx, etc.) via integração segura. Nós extraímos os dados de validade e estoque em tempo real, sem interferir na operação do seu caixa ou exigir a troca do seu sistema principal."
            },
            {
                q: "2. Isso vai dar mais trabalho para o meu time no chão de loja?",
                a: "Pelo contrário, vai automatizar o trabalho deles. Hoje, sua equipe perde horas com planilhas manuais ou no feeling visual. Nosso AI Copilot diz exatamente quais produtos precisam de atenção diária, se devem receber desconto imediato (markdown) ou se devem ser direcionados para doação, economizando tempo operacional e evitando o descarte."
            },
            {
                q: "3. Minha empresa precisa entender de criptomoedas ou blockchain para usar a Zera?",
                a: "Zero. A Zera abstrai toda a complexidade tecnológica. Sua equipe só precisa focar em operar o supermercado usando nosso sistema intuitivo. A criação, certificação e tokenização do ativo rodam em background, entregando a você apenas os relatórios e os ativos financeiros prontos."
            }
        ]
    },
    {
        category: "Financeiro e ROI",
        icon: <DollarSign className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "4. Em quanto tempo eu começo a ver o retorno financeiro (ROI) da ferramenta?",
                a: "O retorno ocorre em duas frentes. A primeira é imediata (dentro de semanas): nosso sistema reduz diretamente a perda de perecíveis por vencimento, preservando a sua margem de lucro na prateleira. A segunda frente, que é a geração e tokenização de ativos sustentáveis, segue o ciclo de auditoria do protocolo MRV, transformando o que antes era custo com descarte em novos ativos financeiros no seu balanço."
            },
            {
                q: "5. Qual é o modelo de cobrança da Zera?",
                a: "Trabalhamos com um modelo SaaS (Software as a Service) alinhado ao seu volume de operação, para que a ferramenta se pague rapidamente apenas com o dinheiro que você deixa de perder no lixo."
            },
            {
                q: "6. Como exatamente eu ganho dinheiro com esses Tokens gerados?",
                a: "O desperdício evitado pela sua operação gera ativos digitais auditados. Você pode vendê-los no Mercado Voluntário para grandes corporações que precisam compensar suas emissões (gerando nova receita extraordinária), ou usar o lastro desses ativos para acessar linhas de crédito bancário com taxas de juros mais baratas (Linhas de Crédito ESG)."
            }
        ]
    },
    {
        category: "MRV, Tokens e Valor Financeiro",
        icon: <Leaf className="text-[hsl(var(--zera-emerald))]" size={20} />,
        items: [
            {
                q: "7. O que significa MRV na prática?",
                a: "Significa Medição, Relato e Verificação. É o selo de auditoria contínua que garante ao mercado financeiro que a sua redução de desperdício é real, rastreável e não foi inventada. Sem MRV, sustentabilidade é apenas marketing; com o nosso MRV, ela se torna um ativo financeiro comprovado."
            },
            {
                q: "8. Como um simples dado de estoque se transforma em um Token que vale dinheiro na prática?",
                a: "Quando um sistema tradicional relata que você evitou perdas, isso é apenas uma planilha interna sem valor de mercado. O nosso MRV entra para auditar esse processo de forma independente e automática. Ao atestar que o alimento foi salvo, nós tokenizamos esse evento. Isso significa envelopar a sua eficiência em um certificado digital único (o Token). Bancos, fundos e grandes corporações injetam dinheiro ou dão benefícios financeiros em troca desses Tokens porque precisam adquirir ativos validados de impacto ambiental e social."
            },
            {
                q: "9. Quem garante que os ativos digitais gerados pelo desperdício evitado têm valor financeiro real no mercado?",
                a: "É exatamente para isso que serve o nosso protocolo MRV. O sistema capta o dado na fonte da sua operação, audita de acordo com metodologias globais e registra essa prova de forma imutável em blockchain. Esse processo garante que o Token que você tem em mãos não é apenas um número, mas um ativo financeiro real, rastreável e à prova de fraudes, pronto para negociação ou compliance."
            },
            {
                q: "10. O que acontece com os produtos que não consigo vender nem com desconto?",
                a: "Eles entram no nosso Hub de Doação Inteligente. A Zera rastreia os produtos próximos ao vencimento e conecta sua loja a ONGs homologadas e seguras. Além de resolver o problema logístico do descarte e gerar impacto social na sua comunidade, essa ação também entra no cálculo da sua eficiência, turbinando a geração de ativos sustentáveis e garantindo benefícios fiscais."
            },
            {
                q: "11. Minha empresa não tem um departamento focado em sustentabilidade. A Zera é para mim?",
                a: "Sim! A Zera foi desenhada justamente para transformar operações de varejo tradicionais em operações avançadas e limpas, sem exigir esforço extra da sua equipe. Nós entregamos a inteligência de dados, a redução de perdas logísticas e os relatórios financeiros prontos. Você foca em gerenciar a loja e vender, nós cuidamos de transformar sua eficiência em ativos auditados."
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
                        Clique em uma categoria para explorar as soluções e garantias que a Zera oferece.
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
