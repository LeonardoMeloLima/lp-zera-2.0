import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { camadas } from "./camadas";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } as const,
});

// Geometria do mockup: a órbita é desenhada em 330x300 e escalada inteira para a largura disponível.
const W = 330;
const H = 300;
const CX = 165;
const CY = 150;
const R = 112;
const EMERALD = "hsl(var(--zera-emerald))";

const posicoes = camadas.map((_, k) => {
  const a = -Math.PI / 2 + (k * 2 * Math.PI) / camadas.length;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
});

const estilos = `
.co-nd{transition:all .3s}
.co-nd:hover{border-color:hsl(var(--zera-emerald) / .6);color:#fff;transform:translate(-50%,-50%) scale(1.07)}
.co-spin{transform-origin:${CX}px ${CY}px;animation:co-sp 40s linear infinite}
.co-pulse{transform-origin:${CX}px ${CY}px;animation:co-pu 3.2s ease-in-out infinite}
.co-fade{animation:co-fd .35s ease-out}
@keyframes co-sp{to{transform:rotate(360deg)}}
@keyframes co-pu{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.75;transform:scale(1.06)}}
@keyframes co-fd{from{opacity:0;transform:translateY(6px)}}
@media (prefers-reduced-motion: reduce){
  .co-spin,.co-pulse,.co-fade{animation:none}
  .co-nd,.co-nd:hover{transition:none;transform:translate(-50%,-50%)}
}
`;

export default function CamadasOrbita() {
  const [ativa, setAtiva] = useState(0);
  const caixaRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);

  useLayoutEffect(() => {
    const el = caixaRef.current;
    if (!el) return;
    const medir = () => {
      const largura = el.getBoundingClientRect().width;
      if (largura > 0) setEscala(largura / W);
    };
    medir();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const camada = camadas[ativa];
  const p = posicoes[ativa];
  const fim = { x: CX + (p.x - CX) * 0.78, y: CY + (p.y - CY) * 0.78 };

  return (
    <section id="funcionalidades" className="py-32 relative overflow-hidden bg-background">
      <style>{estilos}</style>
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp(0)}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[hsl(var(--zera-emerald))]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[hsl(var(--zera-emerald))]">
              As camadas
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.05]">
            Tudo o que vaza da sua loja.
            <br />
            <span className="text-[hsl(var(--zera-emerald))]">Num lugar só.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed font-sans max-w-xl mt-6">
            O Zera trabalha junto com o sistema do seu caixa. Cada camada cuida de um jeito diferente que o dinheiro escapa.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:grid-cols-[460px_minmax(0,1fr)] items-center">
          {/* Órbita */}
          <div
            ref={caixaRef}
            className="relative w-full max-w-[460px] mx-auto"
            style={{ aspectRatio: `${W} / ${H}` }}
          >
            <div
              className="absolute left-0 top-0"
              style={{ width: W, height: H, transform: `scale(${escala})`, transformOrigin: "0 0" }}
            >
              <svg width={W} height={H} className="absolute inset-0" aria-hidden="true">
                <defs>
                  <radialGradient id="co-halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor={EMERALD} stopOpacity=".28" />
                    <stop offset="1" stopColor={EMERALD} stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="co-core" cx="35%" cy="30%" r="80%">
                    <stop offset="0" stopColor={EMERALD} stopOpacity=".22" />
                    <stop offset=".6" stopColor={EMERALD} stopOpacity=".1" />
                    <stop offset="1" stopColor={EMERALD} stopOpacity=".04" />
                  </radialGradient>
                  <linearGradient id="co-beam" gradientUnits="userSpaceOnUse" x1={CX} y1={CY} x2={fim.x} y2={fim.y}>
                    <stop offset="0" stopColor={EMERALD} stopOpacity=".9" />
                    <stop offset="1" stopColor={EMERALD} stopOpacity=".15" />
                  </linearGradient>
                </defs>
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="#ffffff" strokeOpacity=".07" />
                <g className="co-spin">
                  <circle cx={CX} cy={CY} r={84} fill="none" stroke={EMERALD} strokeOpacity=".35" strokeDasharray="2 9" strokeLinecap="round" />
                </g>
                <circle cx={CX} cy={CY} r={62} fill="none" stroke="#ffffff" strokeOpacity=".06" />
                <line x1={CX} y1={CY} x2={fim.x} y2={fim.y} stroke="url(#co-beam)" strokeWidth="1.5" />
                <circle cx={fim.x} cy={fim.y} r={3} fill={EMERALD} />
                <circle className="co-pulse" cx={CX} cy={CY} r={70} fill="url(#co-halo)" />
                <circle cx={CX} cy={CY} r={46} fill="hsl(var(--background))" />
                <circle cx={CX} cy={CY} r={46} fill="url(#co-core)" stroke={EMERALD} strokeOpacity=".7" />
                <circle cx={CX} cy={CY} r={52} fill="none" stroke={EMERALD} strokeOpacity=".15" />
              </svg>

              <div
                className="absolute z-[2] pointer-events-none flex flex-col items-center gap-[3px]"
                style={{ left: CX, top: CY, transform: "translate(-50%,-50%)" }}
              >
                <Store size={22} className="text-[hsl(var(--zera-emerald))]" />
                <span className="text-[12.5px] font-semibold text-white">Seu caixa</span>
              </div>

              {camadas.map((c, k) => {
                const on = k === ativa;
                return (
                  <button
                    key={c.nome}
                    type="button"
                    aria-label={`Ver camada ${c.nome}: ${c.oQueE}`}
                    aria-pressed={on}
                    onClick={() => setAtiva(k)}
                    className={`co-nd absolute z-[3] flex items-center gap-[7px] whitespace-nowrap rounded-full border px-[13px] py-[7px] text-[12px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--zera-emerald))] ${
                      on
                        ? "border-[hsl(var(--zera-emerald))] bg-[hsl(var(--card))] text-white shadow-[0_0_0_4px_hsl(var(--zera-emerald)/0.08),0_8px_24px_-8px_hsl(var(--zera-emerald)/0.4)]"
                        : "border-white/10 bg-background text-white/65"
                    }`}
                    style={{ left: posicoes[k].x, top: posicoes[k].y, transform: "translate(-50%,-50%)" }}
                  >
                    <i
                      aria-hidden="true"
                      className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        on ? "bg-[hsl(var(--zera-emerald))] shadow-[0_0_8px_hsl(var(--zera-emerald))]" : "bg-white/20"
                      }`}
                    />
                    {c.nome}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card da camada ativa */}
          <div
            data-testid="camada-card"
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] px-[22px] py-5"
            aria-live="polite"
          >
            <div key={ativa} className="co-fade">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[hsl(var(--zera-emerald))]">
                Zera {camada.zera}
              </span>
              <h3 className="mt-2.5 text-[26px] font-bold tracking-tight text-white">{camada.nome}</h3>
              <p className="mt-0.5 text-sm text-[hsl(var(--zera-emerald))]">{camada.oQueE}</p>
              <p className="mt-2.5 mb-3 text-[15px] leading-normal text-white">{camada.frase}</p>
              <ol>
                {camada.passos.map((passo, i) => (
                  <li key={passo} className="my-1.5 grid grid-cols-[22px_1fr] gap-1.5 text-sm leading-normal text-white/80">
                    <span className="pt-[3px] font-mono text-[11px] text-[hsl(var(--zera-emerald))]">{`0${i + 1}`}</span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-3.5 border-t border-white/[0.08] pt-3">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-white/40">O que muda</span>
                <div className="mt-1.5 text-[22px] font-bold text-white">{camada.destaque}</div>
                <p className="text-[13px] leading-normal text-white/65">{camada.legenda}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
