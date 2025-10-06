// import React from 'react';

// interface GalleryItem {
//   name?: string;
//   src: string;
//   width: number;
//   height: number;
// }

// const galleryRow1: GalleryItem[] = [
//   { name: 'Bedroom', src: '/images/bedroom.jpg', width: 358, height: 400 },
//   { name: 'Living Room', src: '/images/living-room.png', width: 600, height: 400 },
//   { name: 'Dining Room', src: '/images/dining-room.png', width: 358, height: 400 },
// ];

// const galleryRow2: GalleryItem[] = [
//   { name: 'Walk-in Closet', src: '/images/walk-in-closet.png', width: 358, height: 400 },
//   { name: 'Bathroom', src: '/images/bathroom.png', width: 358, height: 400 },
//   { name: 'Gallery Wall', src: '/images/gallery-wall.png', width: 600, height: 400 },
// ];

// const allGalleryItems = [...galleryRow1, ...galleryRow2];

// const InspirationGallery: React.FC = () => {
//   return (
//     <section className="bg-white py-16 px-8">
//       <div className="container mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight">
//             Inspiration to Elevate Your Living
//           </h1>
//           <p className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4">
//             From cozy corners to luxury living, explore designs that match your taste.
//           </p>
//         </div>

//         {/* --- DESKTOP LAYOUT with fixed pixel widths --- */}
// {/* --- DESKTOP LAYOUT with proportional widths --- */}
// <div className="hidden px-15 lg:flex flex-col items-center gap-5 w-full">
//   {[galleryRow1, galleryRow2].map((row, rowIndex) => {
//     const total = row.reduce((sum, item) => sum + item.width, 0);
//     return (
//       <div
//         key={rowIndex}
//         className="flex items-center justify-center gap-5 w-full"
//       >
//         {row.map((item, itemIndex) => {
//           const flexBasis = `${(item.width / total) * 100}%`;
//           return (
//             <div
//               key={`${rowIndex}-${itemIndex}`}
//               className="relative group overflow-hidden rounded-[20px] shrink-0"
//               style={{ flexBasis, aspectRatio: `${item.width}/${item.height}` }}
//             >
//               <img
//                 src={item.src}
//                 alt={item.name || `Gallery image ${rowIndex * 3 + itemIndex + 1}`}
//                 className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
//               />
//               {item.name && (
//                 <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <h2 className="text-white text-4xl font-playfair font-medium text-center drop-shadow-md">
//                     {item.name}
//                   </h2>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   })}
// </div>



//         {/* --- MOBILE & TABLET LAYOUT --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
//           {allGalleryItems.map((item, index) => (
//             <div
//               key={index}
//               className="relative group overflow-hidden rounded-[20px] aspect-[4/3]"
//             >
//               <img
//                 src={item.src}
//                 alt={item.name || `Gallery image ${index + 1}`}
//                 className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
//               />
//               {item.name && (
//                 <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <h2 className="text-white text-2xl font-playfair font-medium text-center drop-shadow-md">
//                     {item.name}
//                   </h2>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InspirationGallery;



"use client";
import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface GalleryItem {
  name?: string;
  src: string;
  width: number;
  height: number;
}

const galleryRow1: GalleryItem[] = [
  { name: "Bedroom", src: "/images/bedroom.jpg", width: 358, height: 400 },
  { name: "Living Room", src: "/images/living-room.png", width: 600, height: 400 },
  { name: "Dining Room", src: "/images/dining-room.png", width: 358, height: 400 },
];

const galleryRow2: GalleryItem[] = [
  { name: "Walk-in Closet", src: "/images/walk-in-closet.png", width: 358, height: 400 },
  { name: "Bathroom", src: "/images/bathroom.png", width: 358, height: 400 },
  { name: "Gallery Wall", src: "/images/gallery-wall.png", width: 600, height: 400 },
];

const allGalleryItems = [...galleryRow1, ...galleryRow2];

const InspirationGallery: React.FC = () => {
  // Reference for the section to detect visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "-100px" }); // No once: true

  // Animation variants for heading and subtitle
  const textVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for gallery rows (desktop)
  const rowVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increased stagger for one-by-one effect
      },
    },
  };

  // Animation variants for images
  const imageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.3, // Delay based on index for staged appearance
      },
    }),
  };

  return (
    <section className="bg-white py-16 px-8" ref={sectionRef}>
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          <motion.h1
            className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight"
            variants={textVariants}
          >
            Inspiration to Elevate Your Living
          </motion.h1>
          <motion.p
            className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4"
            variants={textVariants}
          >
            From cozy corners to luxury living, explore designs that match your taste.
          </motion.p>
        </motion.div>

        {/* --- DESKTOP LAYOUT with proportional widths --- */}
        <div className="hidden px-15 lg:flex flex-col items-center gap-5 w-full">
          {[galleryRow1, galleryRow2].map((row, rowIndex) => {
            const total = row.reduce((sum, item) => sum + item.width, 0);
            return (
              <motion.div
                key={rowIndex}
                className="flex items-center justify-center gap-5 w-full"
                initial="hidden"
                animate={isSectionInView ? "visible" : "hidden"}
                variants={rowVariants}
              >
                {row.map((item, itemIndex) => {
                  const flexBasis = `${(item.width / total) * 100}%`;
                  return (
                    <motion.div
                      key={`${rowIndex}-${itemIndex}`}
                      className="relative group overflow-hidden rounded-[20px] shrink-0"
                      style={{ flexBasis, aspectRatio: `${item.width}/${item.height}` }}
                      variants={imageVariants}
                      custom={itemIndex} // Pass itemIndex for staggered delay
                    >
                      <img
                        src={item.src}
                        alt={item.name || `Gallery image ${rowIndex * 3 + itemIndex + 1}`}
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                      />
                      {item.name && (
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h2 className="text-white text-4xl font-playfair font-medium text-center drop-shadow-md">
                            {item.name}
                          </h2>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

        {/* --- MOBILE & TABLET LAYOUT --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
          {allGalleryItems.map((item, index) => {
            // Reference for each image to detect visibility
            const imageRef = useRef(null);
            const isImageInView = useInView(imageRef, { margin: "-50px" }); // No once: true

            return (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-[20px] aspect-[4/3]"
                ref={imageRef}
                initial="hidden"
                animate={isImageInView ? "visible" : "hidden"}
                variants={imageVariants}
                custom={index} // Pass index for staggered delay
              >
                <img
                  src={item.src}
                  alt={item.name || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                />
                {item.name && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-white text-2xl font-playfair font-medium text-center drop-shadow-md">
                      {item.name}
                    </h2>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InspirationGallery;