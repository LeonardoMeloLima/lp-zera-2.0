import Navbar from "@/components/landing/Navbar";
import GenesisHero from "@/components/landing/GenesisHero";
import SocialProof from "@/components/landing/SocialProof";
import Problem from "@/components/landing/Problem";
import ESGPillars from "@/components/landing/ESGPillars";
import CamadasOrbita from "@/components/landing/CamadasOrbita";
import TwoWorlds from "@/components/landing/TwoWorlds";
import LeadCapture from "@/components/landing/LeadCapture";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import DemoModal from "@/components/landing/DemoModal";
import { DemoModalProvider, useDemoModal } from "@/hooks/use-demo-modal";

function IndexContent() {
  const { open: demoOpen, setOpen: setDemoOpen } = useDemoModal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <GenesisHero />
        <SocialProof />
        <Problem />
        <ESGPillars />
        <CamadasOrbita />
        <TwoWorlds />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

const Index = () => (
  <DemoModalProvider>
    <IndexContent />
  </DemoModalProvider>
);

export default Index;
