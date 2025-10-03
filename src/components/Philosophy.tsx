import Image from "next/image";

export default function Philosophy() {
  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Centered heading */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-serif text-[#b98663]">Our Philosophy</h2>
          <p className="text-sm md:text-base text-neutral-600 mt-2 font-serif">
            Designing spaces that reflect your lifestyle and inspire everyday living.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left column: text */}
          <div className="md:w-1/2">
            <p className="text-neutral-700 text-[16px] md:text-[20px] leading-relaxed">
              Aceon Interio offers complete interior solutions tailored to your budget and space. Whether it&apos;s a shop, villa, hotel, restaurant, or showroom, we design with precision and style. Experience innovative space management and modern aesthetics, all under one roof. Transform your space beautifully and affordably with Aceon Interio.
            </p>
          </div>

          {/* Right column: responsive collage */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[560px] aspect-[16/9] md:aspect-[560/300]">
              {/* Slanted base */}
              <div
                className="absolute top-0 right-0 w-full h-full overflow-hidden shadow-lg"
                style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)" }}
              >
                <Image src="/philosophy1.svg" alt="collage-main" fill className="object-cover" />
              </div>

              {/* Medium framed image */}
              <div className="absolute left-[5%] top-[10%] w-[35%] md:w-[25%] aspect-[7/6] overflow-hidden shadow-md">
                <Image src="/top-left.svg" alt="thumb-1" fill className="object-cover" />
              </div>

              {/* Small top-right thumbnail */}
              <div className="absolute right-[-5%] top-[-5%] w-[25%] md:w-[15%] aspect-square overflow-hidden shadow-sm">
                <Image src="/top-right.svg" alt="thumb-2" fill className="object-cover" />
              </div>

              {/* Bottom-right small card */}
              <div className="absolute right-[5%] bottom-[-5%] w-[35%] md:w-[30%] aspect-square overflow-hidden shadow-md">
                <Image src="/bottom-right.svg" alt="thumb-3" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
