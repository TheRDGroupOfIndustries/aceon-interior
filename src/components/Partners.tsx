"use client"

import React from 'react';

const PartnersSection: React.FC = () => {
  return (
    // The main section container with padding
    <section className="bg-white py-16 md:py-24 ">
      <div className="container mx-auto">
        
        {/* 1. Our Trusted Partners Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">
            Our Trusted Partners
          </h2>
          <p className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto">
            Working together with trusted brands to deliver excellence.
          </p>
        </div>

        <div className="flex justify-center mb-16 md:mb-24">
          <img 
            src="/images/partners-horizontal.png" 
            alt="A banner displaying the logos of our trusted partners"
            className="w-full max-w-[1440px] h-auto"
            loading="lazy"
          />
        </div>

        {/* 2. "Bring Your Dream Space to Life" CTA Banner */}
      <div className="relative w-full h-[400px] overflow-hidden">
  {/* Background Image */}
  <img
    src="/images/modern.png"
    alt="Elegant modern dining room"
    className="absolute inset-0 z-0 w-full h-full object-cover object-center"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 z-10 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
    {/* Move heading up slightly */}
    <div className="mb-6">
      <h3 className="font-playfair font-medium text-4xl md:text-[48px] leading-tight">
        Bring Your Dream Space to Life
      </h3>
      <p className="font-prata text-lg md:text-[20px] mt-4 max-w-2xl">
        From concept to creation, we make interiors effortless and elegant.
      </p>
    </div>

    {/* Buttons with more spacing from text */}
 <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
  <button className="bg-[#A97C51] font-poppins text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
    Plan Your Paradise With Us
  </button>
  <button className="border-2 border-white hover:bg-white/10 text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
    Apply For EMI Options
  </button>
</div>


  </div>
</div>

        
      </div>
    </section>
  );
};

export default PartnersSection;