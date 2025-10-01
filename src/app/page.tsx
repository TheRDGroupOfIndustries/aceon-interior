import Creations from "@/components/Creations";
import Hero from "@/components/Hero"; 
import TestimonialSection from "@/components/HomeOwner";
import InspirationGallery from "@/components/Inspiration";
import PartnersSection from "@/components/Partners";
import Philosophy from "@/components/Philosophy"; 
import Services from "@/components/Services"; 


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
      
      
    </div>
  );
}