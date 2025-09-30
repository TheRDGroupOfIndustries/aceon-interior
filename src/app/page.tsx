import Hero from "@/components/Hero/Hero";
import BestOfOurCreations from "@/components/BestOfOurCreations";
import HomeOwnersFeels from "@/components/HomeOwnersFeels";
import InspirationToElevateLiving from "@/components/InspirationToElevateLiving";
import TrustedPartners from "@/components/TrustedPartners";
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Hero />
      <InspirationToElevateLiving />
      <BestOfOurCreations/>
      <HomeOwnersFeels/>
      <TrustedPartners />
      
    </div>
  );
}
