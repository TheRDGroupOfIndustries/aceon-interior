import React from 'react';

const PartnersSection: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      {"use client"}
      {/* Tailwind CSS Script for the component to be runnable */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          /* Applying system serif font for "playfair" and "prata" look */
          .font-playfair, .font-prata {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          }
        `}
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">
            Our Trusted Partners
          </h2>
          <p className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto">
            Working together with trusted brands to deliver excellence.
          </p>
        </div>

        {/* 1. Partner Logos Image */}
        <div className="flex justify-center mb-16 md:mb-24"> {/* Added bottom margin for separation */}
          <img 
            src="/images/partners-horizontal.png" 
            alt="A banner displaying the logos of our trusted partners like Fevicol, Pidilite, Asian Paints, and more"
            className="w-full max-w-[1440px] h-auto"
            loading="lazy"
            
          />
        </div>

        {/* 2. New Image (Banner.png) placed directly below the partners */}
        <div className="flex justify-center pt-8"> {/* Added top padding for spacing from the logos */}
          <img 
            src="/images/Banner.png" 
            alt="A separate promotional banner or message related to the company's services."
            className="w-full max-w-[1440px] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;