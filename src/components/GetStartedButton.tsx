import React from 'react';

const GetStartedButton = () => {
  return (
    <button
      // This is the main container for the button
      className="
        bg-[#b88c6a]  /* The main brown color */
        text-white    /* White text */
        text-2xl      /* Large font size for the text */
        font-semibold /* Semi-bold text */
        py-4          /* Vertical padding */
        px-12         /* Horizontal padding */
        rounded-lg    /* Default rounded corners (optional, but good for base) */
        shadow-lg     /* Add a shadow for depth */
        transition duration-300 ease-in-out /* Smooth transition for hover effects */
        hover:bg-[#a67d5e] /* Slightly darker on hover */

        /* Custom shape using clip-path (for the diagonal cut) and border */
        relative      /* Needed for the absolute border element */
      "
      style={{
        // Define the custom shape using a CSS clip-path polygon
        // This creates the angled cut on the top-left corner
        clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)'
      }}
    >
      {/* Absolute positioning for the white border */}
      <span
        className="
          absolute inset-0
          border-2 border-white
          pointer-events-none /* Allows clicks to pass through to the button */
        "
        style={{
          // Apply the exact same clip-path to the border
          clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)',
          // Adjust position slightly to ensure the border is fully visible
          top: '-1px',
          left: '-1px',
          right: '-1px',
          bottom: '-1px',
        }}
        aria-hidden="true" // Hide from screen readers
      ></span>
      
      <span className="relative z-10">Get Started</span>
    </button>
  );
};

export default GetStartedButton;