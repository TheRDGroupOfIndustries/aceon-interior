// import React from 'react';
// import Image from 'next/image';
// import { CiPlay1 } from 'react-icons/ci';

// const TestimonialSection: React.FC = () => {
//   return (
//     <section className="relative w-full text-white">

//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/images/back.jpg"
//           alt="Luxury living room background"
//           layout="fill"
//           objectFit="cover"
//           quality={75}
//           priority={false}
//           placeholder="blur"
//           blurDataURL="/images/back_blur.jpg"
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:pt-12 lg:h-[885px] flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
//         {/* Left Column: Text Content */}
//         <div className="w-full lg:w-1/2 text-center lg:text-left">
//           <div className="max-w-[569px] mx-auto lg:mx-0 mb-16 lg:mb-32">
//             <h1 className="font-playfair font-medium text-3xl md:text-4xl lg:text-[48px] leading-none">
//               What Home Owners Feels
//             </h1>
//             <p className="font-poppins text-lg md:text-xl mt-4 opacity-90">
//               Every Home Tells Different Story
//             </p>
//           </div>

//           <div className="space-y-2 pt-14 max-w-xl mx-auto lg:mx-0">
//             <p className="font-poppins text-base md:text-[18px] tracking-tight text-gray-300 uppercase font-light">
//               CTO | DESIGNER
//             </p>
//             <h2 className="font-poppins font-semibold text-3xl md:text-4xl lg:text-[48px] leading-none tracking-tight">
//               Adarsh Pandit
//             </h2>
//             <p className="font-poppins font-light text-sm md:text-[20px] tracking-tight text-gray-300 pt-5 leading-relaxed">
//               Figma ipsum component variant main layer. Scrolling thumbnail share text team follower select flatten move. Align ipsum shadow line share duplicate comment component. Undo device comment invite bold.
//             </p>
//           </div>
//         </div>

//         {/* Right Column: Image */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
//           <div className="relative w-full max-w-sm md:max-w-md pt-10 lg:w-[480px] lg:h-[711px]">
//             <Image
//               src="/images/woman.jpg"
//               alt="A smiling Adarsh Pandit"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-[30px] blur-[2.5px]"
//               priority={true}
//             />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <button aria-label="Play video" className="transform transition-transform hover:scale-110 focus:outline-none p-3 bg-white rounded-full text-black text-2xl items-center justify-center">
//                 <CiPlay1 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;

// "use client";
// import React, { useRef } from "react";
// import Image from "next/image";
// import { CiPlay1 } from "react-icons/ci";
// import { motion, useInView } from "framer-motion";

// const TestimonialSection: React.FC = () => {
//   const sectionRef = useRef(null);
//   const isSectionInView = useInView(sectionRef, { margin: "-100px" });

//   // Text animation
//   const textVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
//     }),
//   };

//   // Image container animation
//   const imageContainerVariants = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.3 } }, // image first, then button
//   };

//   // Image animation
//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.9, y: 40 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   // Play button animation
//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
//     hover: { scale: 1.15, transition: { yoyo: Infinity, duration: 0.6 } },
//   };

//   return (
//     <section className="relative w-full text-white" ref={sectionRef}>
//       {/* Background */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         initial={{ opacity: 0 }}
//         animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <Image
//           src="/images/back.jpg"
//           alt="Luxury living room background"
//           layout="fill"
//           objectFit="cover"
//           quality={75}
//           priority={false}
//           placeholder="blur"
//           blurDataURL="/images/back_blur.jpg"
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//       </motion.div>

//       {/* Content */}
//       <motion.div
//         className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:pt-12 lg:h-[885px] flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8"
//       >
//         {/* Left Column */}
//         <div className="w-full lg:w-1/2 text-center lg:text-left">
//           <div className="max-w-[569px] mx-auto lg:mx-0 mb-16 lg:mb-32">
//             <h1 className="font-playfair font-medium text-3xl md:text-4xl lg:text-[48px] leading-none">
//               What Home Owners Feels
//             </h1>
//             <p className="font-poppins text-lg md:text-xl mt-4 opacity-90">
//               Every Home Tells Different Story
//             </p>
//           </div>

//           <div className="space-y-2 pt-14 max-w-xl mx-auto lg:mx-0">
//             <p className=" text-base md:text-[18px] tracking-tight text-gray-300 uppercase font-light">
//               CTO | DESIGNER
//             </p>
//             <h2 className=" font-semibold text-3xl md:text-4xl lg:text-[48px] leading-none tracking-tight">
//               Adarsh Pandit
//             </h2>
//             <p className=" font-light text-sm md:text-[20px] tracking-tight text-gray-300 pt-5 leading-relaxed">
//               Figma ipsum component variant main layer. Scrolling thumbnail share text team follower select flatten move. Align ipsum shadow line share duplicate comment component. Undo device comment invite bold.
//             </motion.p>
//           </motion.div>
//         </div>

//         {/* Right Column: Image */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
//           <div className="relative w-full max-w-sm md:max-w-md lg:w-[480px] lg:h-[711px] h-[400px] sm:h-[500px] md:h-[600px]">
//             <Image
//               src="/images/woman.jpg"
//               alt="A smiling Adarsh Pandit"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-[30px] blur-[2.5px]"
//               priority={true}
//             />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <button aria-label="Play video" className="transform transition-transform hover:scale-110 focus:outline-none p-3 bg-white rounded-full text-black text-2xl items-center justify-center">
//                 <CiPlay1 />
//               </button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default TestimonialSection;

// "use client";
// import React from "react";
// import Image from "next/image";
// import { CiPlay1 } from "react-icons/ci";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const TestimonialSection: React.FC = () => {
//   // Reference for the section to detect visibility
//   const sectionRef = useRef(null);
//   const isSectionInView = useInView(sectionRef, { margin: "-100px" }); // No once: true

//   // Animation variants for containers
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15, // Faster stagger for dynamic pacing
//       },
//     },
//   };

//   // Animation variants for text elements
//   const textVariants = {
//     hidden: (direction: string = "up") => ({
//       opacity: 0,
//       y: direction === "up" ? 30 : 0,
//       x: direction === "left" ? -30 : 0,
//       rotate: direction === "up" ? 3 : 0, // Subtle rotation for headings
//     }),
//     visible: (index: number) => ({
//       opacity: 1,
//       y: 0,
//       x: 0,
//       rotate: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         delay: index * 0.15,
//       },
//     }),
//   };

//   // Animation variants for background image
//   const backgroundVariants = {
//     hidden: { opacity: 0 },
//     visible: (index: number) => ({
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         delay: index * 0.15,
//       },
//     }),
//   };

//   // Animation variants for right-side image
//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.9, y: 40 },
//     visible: (index: number) => ({
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         delay: index * 0.15,
//       },
//     }),
//   };

//   // Animation variants for play button
//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8, rotate: -10 },
//     visible: (index: number) => ({
//       opacity: 1,
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//         delay: index * 0.15,
//       },
//     }),
//   };

//   return (
//     <section className="relative w-full text-white" ref={sectionRef}>
//       {/* Background */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         initial="hidden"
//         animate={isSectionInView ? "visible" : "hidden"}
//         variants={backgroundVariants}
//         custom={0} // First to appear
//       >
//         <Image
//           src="/images/back.jpg"
//           alt="Luxury living room background"
//           layout="fill"
//           objectFit="cover"
//           quality={75}
//           priority={false}
//           placeholder="blur"
//           blurDataURL="/images/back_blur.jpg"
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//       </motion.div>

//       {/* Content */}
//       <motion.div
//         className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:pt-12 lg:h-[885px] flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8"
//         initial="hidden"
//         animate={isSectionInView ? "visible" : "hidden"}
//         variants={containerVariants}
//       >
//         {/* Left Column */}
//         <div className="w-full lg:w-1/2 text-center lg:text-left">
//           <motion.div
//             className="max-w-[569px] mx-auto lg:mx-0 mb-16 lg:mb-32"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
//             }}
//           >
//             <motion.h1
//               className="font-playfair font-medium text-3xl md:text-4xl lg:text-[48px] leading-none"
//               variants={textVariants}
//               custom={3} // Fourth to appear
//             >
//               What Home Owners Feels
//             </motion.h1>
//             <motion.p
//               className="font-poppins text-lg md:text-xl mt-4 opacity-90"
//               variants={textVariants}
//               custom={4} // Fifth to appear
//             >
//               Every Home Tells Different Story
//             </motion.p>
//           </motion.div>

//           <motion.div
//             className="space-y-2 pt-14 max-w-xl mx-auto lg:mx-0"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
//             }}
//           >
//             <motion.p
//               className="font-poppins text-base md:text-[18px] tracking-tight text-gray-300 uppercase font-light"
//               variants={textVariants}
//               custom={5} // Sixth to appear
//               // custom="left"
//             >
//               CTO | DESIGNER
//             </motion.p>
//             <motion.h2
//               className="font-poppins font-semibold text-3xl md:text-4xl lg:text-[48px] leading-none tracking-tight"
//               variants={textVariants}
//               custom={6} // Seventh to appear
//             >
//               Adarsh Pandit
//             </motion.h2>
//             <motion.p
//               className="font-poppins font-light text-sm md:text-[20px] tracking-tight text-gray-300 pt-5 leading-relaxed"
//               variants={textVariants}
//               custom={7} // Eighth to appear
//             >
//               Figma ipsum component variant main layer. Scrolling thumbnail share
//               text team follower select flatten move. Align ipsum shadow line
//               share duplicate comment component. Undo device comment invite bold.
//             </motion.p>
//           </motion.div>
//         </div>

//         {/* Right Column: Image */}
//         <motion.div
//           className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end"
//           variants={containerVariants}
//         >
//           <motion.div
//             className="relative w-full max-w-sm md:max-w-md lg:w-[480px] lg:h-[711px] h-[400px] sm:h-[500px] md:h-[600px]"
//             variants={imageContainerVariants}
//           >
//             <motion.div
//               variants={imageVariants}
//               custom={1} // Second to appear
//             >
//               <Image
//                 src="/images/woman.jpg"
//                 alt="A smiling Adarsh Pandit"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-[30px] blur-[2.5px]"
//                 priority={true}
//               />
//             </motion.div>
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center"
//               variants={buttonVariants}
//               custom={2} // Third to appear
//               whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.3 } }}
//             >
//               <button
//                 aria-label="Play video"
//                 className="transform transition-transform hover:scale-110 focus:outline-none p-3 bg-white rounded-full text-black text-2xl items-center justify-center"
//               >
//                 <CiPlay1 />
//               </button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default TestimonialSection;

"use client";
import React from "react";
import Image from "next/image";
import { CiPlay1 } from "react-icons/ci";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const TestimonialSection: React.FC = () => {
  // Reference for the section to detect visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "-100px" }); // No once: true

  // Animation variants for containers
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Faster stagger for dynamic pacing
      },
    },
  };

  // Animation variants for image container
  const imageContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger image and button
      },
    },
  };

  // Animation variants for text elements
  const textVariants: Variants = {
    hidden: (direction: string = "up") => ({
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : 0,
      rotate: direction === "up" ? 3 : 0, // Subtle rotation for headings
    }),
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15,
      },
    }),
  };

  // Animation variants for background image
  const backgroundVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.15,
      },
    }),
  };

  // Animation variants for right-side image
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15,
      },
    }),
  };

  // Animation variants for play button
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section className="relative w-full text-white" ref={sectionRef}>
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={backgroundVariants}
        custom={0} // First to appear
      >
        <Image
          src="/images/back.jpg"
          alt="Luxury living room background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority={false}
          placeholder="blur"
          blurDataURL="/images/back_blur.jpg"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:pt-12 lg:h-[885px] flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Left Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            className="max-w-[569px] mx-auto lg:mx-0 mb-16 lg:mb-32"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              className="font-playfair font-medium text-3xl md:text-4xl lg:text-[48px] leading-none"
              variants={textVariants}
              custom={3} // Fourth to appear
            >
              What Our Customers Say
            </motion.h1>
            <motion.p
              className="font-poppins text-lg md:text-xl mt-4 opacity-90"
              variants={textVariants}
              custom={4} // Fifth to appear
            >
              Every Crafted Space Has Its Own Story{" "}
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-2 pt-14 max-w-xl mx-auto lg:mx-0"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {/* <motion.p
              className="font-poppins text-base md:text-[18px] tracking-tight text-gray-300 uppercase font-light"
              variants={textVariants}
              custom={5} // Sixth to appear
            >
              CTO | DESIGNER
            </motion.p>
            <motion.h2
              className="font-poppins font-semibold text-3xl md:text-4xl lg:text-[48px] leading-none tracking-tight"
              variants={textVariants}
              custom={6} // Seventh to appear
            >
              Adarsh Pandit
            </motion.h2> */}
            <motion.p
              className="font-poppins font-light text-sm md:text-[20px] tracking-tight text-gray-300 pt-5 leading-relaxed text-shadow-md"
              variants={textVariants}
              custom={7} // Eighth to appear
            >
              “Each home we touch reflects a story of craftsmanship and comfort.
              From rustic wooden textures to modern minimalism, our designs
              bring warmth and personality into every corner. Here’s how our
              clients feel living in the spaces we’ve built together.”
            </motion.p>
          </motion.div>
        </div>

        {/* Right Column: Image */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end"
          variants={containerVariants}
        >
          <motion.div
            className="relative w-full max-w-sm md:max-w-md lg:w-[480px] lg:h-[711px] h-[400px] sm:h-[500px] md:h-[600px]"
            variants={imageContainerVariants}
          >
            <motion.div
              variants={imageVariants}
              custom={1} // Second to appear
            >
              <Image
                src="/images/woman.jpg"
                alt="A smiling Adarsh Pandit"
                layout="fill"
                objectFit="cover"
                className="rounded-[30px] blur-[2.5px]"
                priority={true}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={buttonVariants}
              custom={2} // Third to appear
              whileHover={{
                scale: 1.15,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <button
                aria-label="Play video"
                className="transform transition-transform hover:scale-110 focus:outline-none p-3 bg-white rounded-full text-black text-2xl items-center justify-center"
              >
                <CiPlay1 />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
