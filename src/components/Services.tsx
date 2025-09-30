import Image from "next/image";

export default function Services(){
  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[44px] font-serif text-[#b98663]">Our Services</h2>
        <p className="text-neutral-600 mt-2 mb-8">Comprehensive solutions tailored to your needs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({length:3}).map((_,i)=> (
            <article key={i} className="bg-[#f7f7f7] rounded-[18px] p-6 relative overflow-hidden">
              <div className="w-full h-[440px] rounded-[14px] overflow-hidden mb-4">
                <div className="relative w-full h-full">
                  <Image src="/services.svg" alt={`service-${i}`} fill className="object-cover" />
                </div>
              </div>

              

              
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
