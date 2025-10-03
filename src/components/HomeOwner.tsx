import React from 'react';

// A simple, self-contained SVG component for the play button
const PlayIcon = () => (
  <svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="white" />
    <path d="M55 39.5L32.5 52.9904L32.5 26.0096L55 39.5Z" fill="#1E1E1E" />
  </svg>
);

const TestimonialSection: React.FC = () => {
  return (
    <section className="relative w-full text-white">
      {/* Background Image and Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/back.jpg"
          alt="Luxury living room background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* 1. CHANGED: Reduced top padding from lg:pt-[87px] to lg:pt-12 to move everything up */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:pt-12 lg:h-[885px] flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* 2. CHANGED: Increased bottom margin from lg:mb-20 to lg:mb-32 to push the content below further down */}
          <div className="max-w-[569px] mx-auto lg:mx-0 mb-16 lg:mb-32">
            <h1 className="font-playfair font-medium text-3xl md:text-4xl lg:text-[48px] leading-none">
              What Home Owners Feels
            </h1>
            <p className="font-poppins text-lg md:text-xl mt-4  opacity-90">
              Every Home Tells Different Story
            </p>
          </div>
          
          <div className="space-y-3 pt-14 max-w-xl mx-auto lg:mx-0">
            <p className="font-poppins text-base md:text-[20px] tracking-tight text-gray-300 uppercase">
              CTO | DESIGNER
            </p>
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl lg:text-[48px] leading-none tracking-tight">
              Adarsh Pandit
            </h2>
            <p className="font-poppins font-medium text-lg md:text-[24px] tracking-tight text-gray-200 pt-5 leading-snug">
              Figma ipsum component variant main layer. Scrolling thumbnail share text team follower select flatten move. Align ipsum shadow line share duplicate comment component. Undo device comment invite bold.
            </p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-sm md:max-w-md pt-10 lg:w-[480px] lg:h-[711px]">
            <img 
              src="/images/woman.jpg" 
              alt="A smiling Adarsh Pandit" 
              className="w-full h-full object-cover rounded-[30px] blur-[2.5px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button aria-label="Play video" className="transform transition-transform hover:scale-110 focus:outline-none">
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;