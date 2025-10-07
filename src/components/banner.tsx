import React from 'react';
import Image from 'next/image';

const BannerSection: React.FC = () => {
  return (
    <section className="bg-white relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:py-0 lg:h-[885px] flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
      <div className="flex -mt-80 justify-center w-full relative h-[500px] lg:h-[885px]">
        <Image
          src="/images/Banner.png"
          alt="A banner displaying the logos of our trusted partners like Fevicol, Pidilite, Asian Paints, and more"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default BannerSection;
