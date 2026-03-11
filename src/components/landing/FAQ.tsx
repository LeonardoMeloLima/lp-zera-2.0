import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, DollarSign, Leaf } from "lucide-react";
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
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-black/50" id="faq">
            <div className="relative z-10 mx-auto max-w-4xl px-6">
                <motion.div {...fadeUp(0)} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4">
                        Dúvidas <span className="text-gradient-emerald italic">Frequentes</span>
                    </h2>
                    <p className="text-white/40 font-sans max-w-xl mx-auto text-sm">
                        Tudo o que você precisa saber sobre como a Zera transforma sua operação e gera ativos reais.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {faqData.map((category, catIdx) => (
                        <div key={catIdx} className="space-y-4">
                            <motion.div
                                {...fadeUp(catIdx * 0.1)}
                                className="flex items-center gap-3 px-2 mb-6"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--zera-emerald))]/10 flex items-center justify-center border border-[hsl(var(--zera-emerald))]/20">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {category.category}
                                </h3>
                            </motion.div>

                            <div className="grid gap-3">
                                {category.items.map((item, itemIdx) => {
                                    const id = `${catIdx}-${itemIdx}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <motion.div
                                            key={id}
                                            {...fadeUp(0.1 + itemIdx * 0.05)}
                                            className={`group relative rounded-2xl border transition-all duration-300 ${isOpen
                                                ? "bg-white/[0.04] border-[hsl(var(--zera-emerald))]/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)]"
                                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggle(id)}
                                                className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
                                            >
                                                <span className={`font-semibold md:text-lg transition-colors duration-300 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                                                    }`}>
                                                    {item.q}
                                                </span>
                                                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[hsl(var(--zera-emerald))] border-[hsl(var(--zera-emerald))] rotate-180" : "bg-white/5"
                                                    }`}>
                                                    <ChevronDown size={14} className={isOpen ? "text-white" : "text-white/30"} />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-6 md:px-6 md:pb-8 text-white/50 leading-relaxed font-sans text-sm md:text-base border-t border-white/5 pt-4">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(var(--zera-emerald))]/3 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
