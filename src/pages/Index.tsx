import Navbar from "@/components/landing/Navbar";
import GenesisHero from "@/components/landing/GenesisHero";
import SocialProof from "@/components/landing/SocialProof";
import Problem from "@/components/landing/Problem";
import ESGPillars from "@/components/landing/ESGPillars";
import Features from "@/components/landing/Features";
import TwoWorlds from "@/components/landing/TwoWorlds";
import LeadCapture from "@/components/landing/LeadCapture";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import ONGModal from "@/components/landing/ONGModal";
import InvestorModal from "@/components/landing/InvestorModal";
import DemoModal from "@/components/landing/DemoModal";
import { ONGModalProvider, useONGModal } from "@/hooks/use-ong-modal";
import { InvestorModalProvider, useInvestorModal } from "@/hooks/use-investor-modal";
import { DemoModalProvider, useDemoModal } from "@/hooks/use-demo-modal";

function IndexContent() {
  const { open, setOpen } = useONGModal();
  const { open: investorOpen, setOpen: setInvestorOpen } = useInvestorModal();
  const { open: demoOpen, setOpen: setDemoOpen } = useDemoModal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <GenesisHero />
        <SocialProof />
        <Problem />
        <ESGPillars />
        <Features />
        <TwoWorlds />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
      <ONGModal open={open} onClose={() => setOpen(false)} />
      <InvestorModal open={investorOpen} onClose={() => setInvestorOpen(false)} />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

const Index = () => (
  <ONGModalProvider>
    <InvestorModalProvider>
      <DemoModalProvider>
        <IndexContent />
      </DemoModalProvider>
    </InvestorModalProvider>
  </ONGModalProvider>
);

export default Index;
