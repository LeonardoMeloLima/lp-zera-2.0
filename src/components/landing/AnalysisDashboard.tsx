import { motion } from "framer-motion";

const data = [
    { label: "Critical", value: 3, range: "0 to 2", color: "#065F46" },
    { label: "Degraded", value: 9, range: "2 to 4", color: "#047857" },
    { label: "Fair", value: 15, range: "4 to 6", color: "#059669" },
    { label: "Good", value: 51, range: "6 to 8", color: "#10B981" },
    { label: "Optimal", value: 23, range: "8 to 10", color: "#00E699" },
];

export function AnalysisDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-premium p-10 rounded-[40px] w-full relative overflow-hidden group border-white/10"
        >
            <div className="flex flex-col gap-12">
                {/* Title */}
                <h3 className="text-xl font-medium text-white/90 tracking-tight">
                    Share of items in <span className="text-white font-bold">safe cycle</span>
                </h3>

                <div className="flex flex-col xl:flex-row items-end gap-12">
                    {/* Main Stat */}
                    <div className="flex flex-col gap-2 min-w-[160px]">
                        <div className="flex items-baseline gap-1">
                            <span className="text-8xl font-bold text-white tracking-tighter">74</span>
                            <span className="text-4xl font-bold text-white/40">%</span>
                        </div>
                        <p className="text-sm text-white/40 font-sans tracking-wide">
                            in safe cycle
                        </p>
                        <p className="text-[10px] text-white/20 font-mono mt-6 uppercase tracking-[0.2em]">
                            9.5k de 13.4k itens
                        </p>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex-1 flex items-end justify-between gap-3 h-48 w-full">
                        {data.map((item, i) => (
                            <div key={item.label} className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                <div className="relative w-full flex flex-col items-center h-full justify-end">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 + i * 0.1 }}
                                        className="text-[10px] font-mono text-white/40 mb-2"
                                    >
                                        {item.value}
                                    </motion.span>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${(item.value / 60) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full rounded-xl relative group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] transition-shadow"
                                        style={{
                                            backgroundColor: item.color,
                                            boxShadow: `0 4px 20px -5px ${item.color}44`
                                        }}
                                    />
                                </div>
                                <div className="text-center w-full">
                                    <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 truncate">
                                        {item.label}
                                    </p>
                                    <p className="text-[9px] font-mono text-white/20 whitespace-nowrap">
                                        {item.range}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </motion.div>
    );
}
