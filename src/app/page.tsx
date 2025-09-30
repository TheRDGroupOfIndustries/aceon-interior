import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Hero />
      <Philosophy />
      <Services />
    </div>
  );
}
