import Creations from "@/components/Creations";
import Hero from "@/components/Hero"; // Keeping Hero
import TestimonialSection from "@/components/HomeOwner";
import InspirationGallery from "@/components/Inspiration";
import PartnersSection from "@/components/Partners";
import Philosophy from "@/components/Philosophy"; // From remote
import Services from "@/components/Services"; // From remote

// Components you added locally (ensure these paths are correct, using the full name or the convention that matches the remote's Hero import)
// import BestOfOurCreations from "@/components/BestOfOurCreations";
// import HomeOwnersFeels from "@/components/HomeOwnersFeels";
// import InspirationToElevateLiving from "@/components/InspirationToElevateLiving";
// import TrustedPartners from "@/components/TrustedPartners";

export default function Home() {
  return (
    <div className="min-h-screen bg-white px-1 sm:px-4">
      <Hero />
      <Philosophy />
      <Services />
      <InspirationGallery/>
      <Creations/>
      <TestimonialSection/>
      <PartnersSection/>
      {/* <InspirationToElevateLiving />
      <BestOfOurCreations/>

      <HomeOwnersFeels/>
      <TrustedPartners /> */}
      
    </div>
  );
}