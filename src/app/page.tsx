import NavBar from "@/components/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import WorkSection from "@/components/sections/WorkSection";
import OutcomesSection from "@/components/sections/OutcomesSection";
import ApproachSection from "@/components/sections/ApproachSection";
import FounderSection from "@/components/sections/FounderSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <TrustSection />
        <WorkSection />
        <OutcomesSection />
        <ApproachSection />
        <FounderSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
