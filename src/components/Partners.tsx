// "use client"
// import React from 'react';

// const PartnersSection: React.FC = () => {
//   return (
//     <section className="bg-white py-16 md:py-24">
//       <div className="container mx-auto px-4">
        
//         {/* "Our Trusted Partners" Content */}
//         <div className="text-center mb-12 md:mb-16">
//           <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">
//             Our Trusted Partners
//           </h2>
//           <p className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto">
//             Working together with trusted brands to deliver excellence.
//           </p>
//         </div>

//         <div className="flex justify-center">
//           <img 
//             src="/images/partners-horizontal.png" 
//             alt="A banner displaying the logos of our trusted partners"
//             className="w-full max-w-[1440px] h-auto"
//             loading="lazy"
//           />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default PartnersSection;


"use client";
import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const PartnersSection: React.FC = () => {
  // Reference for the section to detect visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "-100px" }); // No once: true

  // Animation variants for container
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger for child elements
      },
    },
  };

  // Animation variants for text and image elements
  const elementVariants:Variants = {
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

  // Animation variants for the image
  const imageVariants:Variants = {
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
    <section className="bg-white py-16 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* "Our Trusted Partners" Content */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize"
            variants={elementVariants}
            custom={0} // First to appear
          >
            Our Trusted Partners
          </motion.h2>
          <motion.p
            className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto"
            variants={elementVariants}
            custom={1} // Second to appear
          >
            Working together with trusted brands to deliver excellence.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          variants={imageVariants}
          custom={2} // Third to appear
        >
          <img
            src="/images/partners-horizontal.png"
            alt="A banner displaying the logos of our trusted partners"
            className="w-full max-w-[1440px] h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;