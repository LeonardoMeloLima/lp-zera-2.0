import { motion } from "framer-motion";

export const PremiumScoreCard = ({
  title = "Impact Score",
  value = 8.4,
  mention = "Excellent",
  percentage = "92%"
}: {
  title?: string;
  value?: number;
  mention?: string;
  percentage?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-premium relative w-full max-w-sm overflow-hidden p-8 rounded-[32px] group"
    >
      {/* Dynamic Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
          <span className="mono-label text-[10px] tracking-[0.2em] font-bold text-[hsl(var(--zera-emerald))] uppercase">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Top</span>
            <span className="text-sm font-bold text-white/90">{percentage}</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-6">
          {/* Circular Gauge SVG from Genesis */}
          <svg className="w-56 h-56 rotate-[-10deg]" viewBox="0 0 256 256">
            {/* Background Track */}
            <path
              d="M20 128 a 108 108 0 1 1 216 0"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Active Gauge */}
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.85 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              d="M20 128 a 108 108 0 1 1 216 0"
              fill="none"
              stroke="url(#genesis-grad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="genesis-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2ECC71" />
                <stop offset="100%" stopColor="#00E699" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl font-sans font-light tracking-tighter text-white"
            >
              {value}
            </motion.span>
            <span className="text-[10px] font-bold tracking-[0.1em] text-[#BCF6C1] uppercase mt-1">
              {mention}
            </span>
          </div>

          {/* Ticks (simplified but high-tech) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-[1px]"
                style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
              >
                <div className="absolute right-2 w-2 h-[2px] bg-white/40 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <span>Benchmark 2026</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
            <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
