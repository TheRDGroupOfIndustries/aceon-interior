// components/CtaBanner.tsx

import React from 'react';

const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
    
      <img
        src="/images/modern.png"
        alt="Elegant modern dining room"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 z-10 bg-black/50"></div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
        
        <div className="flex flex-col items-center">
          
          <h3 className="font-playfair font-medium text-4xl md:text-[48px] leading-tight">
            Bring Your Dream Space to Life
          </h3>
          <p className="font-prata text-lg md:text-[20px] mt-4 max-w-2xl">
            From concept to creation, we make interiors effortless and elegant.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button className="bg-[#A97C51] font-poppins text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
              Plan Your Paradise With Us
            </button>
            <button className="border-2 border-white hover:bg-white/10 text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
              Apply For EMI Options
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaBanner;