import Creations from "@/components/Creations";
import Hero from "@/components/Hero"; 
import TestimonialSection from "@/components/HomeOwner";
import InspirationGallery from "@/components/Inspiration";
import PartnersSection from "@/components/Partners";
import Philosophy from "@/components/Philosophy"; 
import Services from "@/components/Services"; 
import Contact from "@/components/contact";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <Hero />
      <Philosophy />
      <Services />
      <InspirationGallery/>
      <Creations/>
      <TestimonialSection/>
      <PartnersSection/>
      <Contact />
      <Footer/>
      
    </div>
  );
}