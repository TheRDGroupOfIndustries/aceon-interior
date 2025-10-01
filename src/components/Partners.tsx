import React from 'react';

const PartnersSection: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">
            Our Trusted Partners
          </h2>
          <p className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto">
            Working together with trusted brands to deliver excellence.
          </p>
        </div>

        <div className="flex justify-center">
          <img 
            src="/images/partners-horizontal.png" 
            alt="A banner displaying the logos of our trusted partners like Fevicol, Pidilite, Asian Paints, and more"
            className="w-full max-w-[1440px] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;