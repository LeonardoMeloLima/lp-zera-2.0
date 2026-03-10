import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { useONGModal } from "@/hooks/use-ong-modal";
import { useInvestorModal } from "@/hooks/use-investor-modal";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Nosso Ecossistema", href: "#ecossistema-esg" },
  { label: "Quer Investir na Zera?", href: "#", investorModal: true },
  { label: "Cadastre sua ONG", href: "#", highlight: true, modal: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setOpen: openDemoModal } = useDemoModal();
  const { setOpen: openONGModal } = useONGModal();
  const { setOpen: openInvestorModal } = useInvestorModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "border-b"
        : "bg-transparent"
        }`}
      style={scrolled ? {
        background: "rgba(0,0,0,0.97)",
        borderColor: "rgba(255,255,255,0.08)"
      } : undefined}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 group text-4xl font-black italic tracking-tighter uppercase transition-colors">
            <Leaf className="w-10 h-10 text-[hsl(var(--zera-emerald))]" strokeWidth={2.5} />
            <span className="text-gradient-genesis">ZERA</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className={link.highlight
                  ? "text-xs font-mono font-bold tracking-[0.2em] transition-colors duration-200 cursor-pointer uppercase text-[hsl(var(--zera-emerald))]"
                  : "text-xs font-mono font-bold tracking-[0.2em] transition-colors duration-200 cursor-pointer uppercase text-white/40 hover:text-white"}
                onClick={
                  link.modal ? (e: React.MouseEvent) => { e.preventDefault(); openONGModal(true); }
                    : (link as any).investorModal ? (e: React.MouseEvent) => { e.preventDefault(); openInvestorModal(true); }
                      : undefined
                }
              >
                {link.label}
              </a>
            ))}

          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white" onClick={(e) => { e.preventDefault(); toast.info("Área exclusiva para assinantes", { description: "Em breve você poderá acessar a plataforma Zera." }); }}>Login</a>
            <button
              onClick={() => openDemoModal(true)}
              className="relative px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-[hsl(var(--zera-emerald))] text-white hover:scale-105 transition-all shadow-lg shadow-[hsl(var(--zera-emerald))/0.2] cursor-pointer"
            >
              Agendar Demo
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              background: "rgba(0,0,0,0.98)",
              borderColor: "rgba(255,255,255,0.08)"
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={link.highlight ? "text-base py-1 font-medium cursor-pointer" : "nav-link-hero text-base py-1"}
                  style={link.highlight ? { color: "hsl(var(--green-bright))" } : undefined}
                  onClick={(e) => {
                    if (link.modal) { e.preventDefault(); openONGModal(true); }
                    if ((link as any).investorModal) { e.preventDefault(); openInvestorModal(true); }
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
                <a href="#" className="btn-ghost-white w-full text-center" onClick={(e) => { e.preventDefault(); toast.info("Área exclusiva para assinantes", { description: "Em breve você poderá acessar a plataforma Zera." }); setMobileOpen(false); }}>Entrar</a>
                <button
                  onClick={() => { openDemoModal(true); setMobileOpen(false); }}
                  className="w-full py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase bg-[hsl(var(--zera-emerald))] text-white shadow-lg shadow-[hsl(var(--zera-emerald))/0.2] cursor-pointer"
                >
                  Agendar Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
