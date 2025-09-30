import Image from "next/image";

export default function Philosophy() {
  return (
  <section className="bg-white py-10 px-6 md:px-12 md:-mt-14">
      <div className="max-w-[1200px] mx-auto">
        {/* Centered heading */}
        <div className="text-center mb-8">
          <h2 className="text-[36px] md:text-[48px] font-serif text-[#b98663]">Our Philosophy</h2>
          <p className="text-sm md:text-base text-neutral-600 mt-2 font-serif font-4xl">Designing spaces that reflect your lifestyle and inspire everyday living.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left column: large paragraph */}
          <div className="md:w-1/2">
            <div className="text-neutral-700 text-[18px] md:text-[20px] leading-relaxed max-w-[560px]">
              Aceon Interio offers complete interior solutions tailored to your budget and space. Whether it's a shop, villa, hotel, restaurant, or showroom, we design with precision and style. Experience innovative space management and modern aesthetics, all under one roof. Transform your space beautifully and affordably with Aceon Interio.
            </div>
          </div>

          {/* Right column: stylized collage */}
          <div className="md:-w-1/2 flex justify-end">
            <div className="relative w-[560px] h-[300px]">
              {/* Slanted base - approximated with clip-path */}
              <div className="absolute top-0 right-0 w-[520px] h-[300px] rounded-md overflow-hidden shadow-lg" style={{clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)'}}>
                <Image src="/philosophy1.svg" alt="collage-main" fill className="object-cover" />
              </div>

              {/* medium framed image overlapping */}
              <div className="absolute left-15 top-7 w-[140px] h-[120px] rounded-md overflow-hidden shadow-md  ">
                <Image src="/top-left.svg" alt="thumb-1" width={140} height={120} className="object-cover" />
              </div>

              {/* small top-right thumbnail */}
              <div className="absolute -right-7 -top-8 w-[80px] h-[80px] rounded-md overflow-hidden shadow-sm hidden md:block">
                <Image src="/top-right.svg" alt="thumb-2" width={80} height={80} className="object-cover" />
              </div>

              {/* bottom-right small card */}
              <div className="absolute right-2 -bottom-6 w-[150px] h-[150px] rounded-md overflow-hidden shadow-md">
                <Image src="/bottom-right.svg" alt="thumb-3" width={150} height={150} className="object-cover" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
