// import React from 'react';

// const CtaBanner: React.FC = () => {
//   return (
//     <section className="relative w-full h-[400px] overflow-hidden">
    
//       <img
//         src="/images/modern.png"
//         alt="Elegant modern dining room"
//         className="absolute inset-0 z-0 w-full h-full object-cover object-center"
//       />

//       <div className="absolute inset-0 z-10 bg-black/50"></div>

//       <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
        
//         <div className="flex flex-col items-center">
          
//           <h3 className="font-playfair font-medium text-4xl md:text-[48px] leading-tight">
//             Bring Your Dream Space to Life
//           </h3>
//           <p className="font-prata text-lg md:text-[20px] mt-4 max-w-2xl">
//             From concept to creation, we make interiors effortless and elegant.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
//             <button className="bg-[#A97C51] font-poppins text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
//               Plan Your Paradise With Us
//             </button>
//             <button className="border-2 border-white hover:bg-white/10 text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6">
//               Apply For EMI Options
//             </button>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default CtaBanner;


"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CtaBanner: React.FC = () => {
  // Reference for the section to detect visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "-100px" }); // No once: true

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger for child elements
      },
    },
  };

  // Animation variants for text and button elements
  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.3, // Staggered delay based on index
      },
    }),
  };

  // Animation variants for the background image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.3,
      },
    }),
  };

  return (
    <section className="relative w-full h-[400px] overflow-hidden" ref={sectionRef}>
      {/* Background Image and Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={imageVariants}
        custom={0} // First to appear
      >
        <img
          src="/images/modern.png"
          alt="Elegant modern dining room"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-black/50"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.h3
            className="font-playfair font-medium text-4xl md:text-[48px] leading-tight"
            variants={elementVariants}
            custom={1} // Second to appear
          >
            Bring Your Dream Space to Life
          </motion.h3>
          <motion.p
            className="font-prata text-lg md:text-[20px] mt-4 max-w-2xl"
            variants={elementVariants}
            custom={2} // Third to appear
          >
            From concept to creation, we make interiors effortless and elegant.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            <motion.button
              className="bg-[#A97C51] font-poppins text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6"
              variants={elementVariants}
              custom={3} // Fourth to appear
            >
              Plan Your Paradise With Us
            </motion.button>
            <motion.button
              className="border-2 border-white hover:bg-white/10 text-white font-medium w-full sm:w-[340px] h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-sm sm:text-base px-4 sm:px-6"
              variants={elementVariants}
              custom={4} // Fifth to appear
            >
              Apply For EMI Options
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CtaBanner;