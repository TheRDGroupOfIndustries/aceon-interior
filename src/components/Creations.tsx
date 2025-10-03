// import React from 'react';

// interface CreationCardProps {
//   imageSrc: string;
//   title: string;
//   description: string;
// }

// const creationsData: CreationCardProps[] = [
//   {
//     imageSrc: '/images/creation1.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
//   {
//     imageSrc: '/images/creation2.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
//   {
//     imageSrc: '/images/creation3.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
// ];

// const CreationCard: React.FC<CreationCardProps> = ({ imageSrc, title, description }) => {
//   return (
//     <article className="flex-1 min-w-0 shrink">
//       <div className="aspect-[373/311] overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
//         />
//       </div>
//       <div className="mt-6 text-left">
//         <h3 className="font-poppins font-semibold text-2xl md:text-[32px] text-gray-800 uppercase leading-tight h-16">
//           {title}
//         </h3>
//         <p className="font-poppins pt-7 text-gray-500 mt-2 text-base text-justify leading-relaxed">
//           {description}
//         </p>
//         <div className="mt-6 text-right">
//           <a
//             href="#"
//             className="font-poppins font-medium text-lg md:text-[20px] text-[#936a53] inline-block capitalize hover:text-[#7d5945] transition-colors"
//           >
//             Read More →
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// };

// const Creations: React.FC = () => {
//   return (
//     <section className="bg-white py-16 md:py-24 lg:px-36 px-4">
//       <div className="container mx-auto text-center">
//         <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[68px] leading-tight">
//           Best of our creations
//         </h2>
//         <p className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4">
//           Comprehensive solutions tailored to your needs.
//         </p>

//         {/* 3 cards: stack on mobile, single row on tablet/desktop */}
//         <div className="mt-10 sm:mt-16 flex flex-col md:flex-row xl:flex-row justify-center gap-8 md:gap-x-12 xl:gap-x-12 items-stretch">
//           {creationsData.map((creation, index) => (
//             <CreationCard
//               key={index}
//               imageSrc={creation.imageSrc}
//               title={creation.title}
//               description={creation.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Creations;

"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CreationCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const creationsData: CreationCardProps[] = [
  {
    imageSrc: "/images/creation1.png",
    title: "TITLE FOR THE CARD",
    description:
      "Figma ipsum component variant main layer. Opacity slice line distribute inspect font. Scrolling italic move move inspect connection.",
  },
  {
    imageSrc: "/images/creation2.png",
    title: "TITLE FOR THE CARD",
    description:
      "Figma ipsum component variant main layer. Opacity slice line distribute inspect font. Scrolling italic move move inspect connection.",
  },
  {
    imageSrc: "/images/creation3.png",
    title: "TITLE FOR THE CARD",
    description:
      "Figma ipsum component variant main layer. Opacity slice line distribute inspect font. Scrolling italic move move inspect connection.",
  },
];

const CreationCard: React.FC<CreationCardProps> = ({
  imageSrc,
  title,
  description,
}) => {
  // Reference for the card to detect visibility
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { margin: "-50px" }); // Removed once: true

  // Animation variants for card elements
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.article
      className="flex-1 min-w-0 shrink"
      ref={cardRef}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <motion.div
        className="aspect-[373/311] overflow-hidden"
        variants={imageVariants}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </motion.div>
      <motion.div className="mt-6 text-left" variants={textVariants}>
        <h3 className="font-poppins font-semibold text-2xl  text-gray-800 uppercase leading-tight h-10">
          {title}
        </h3>
        <p className=" text-gray-500   text-sm text-justify leading-relaxed">
          {description}
        </p>
        <motion.div className="mt-6 text-right" variants={linkVariants}>
          <a
            href="#"
            className="font-poppins font-medium text-lg  text-[#936a53] inline-block capitalize hover:text-[#7d5945] transition-colors"
          >
            Read More →
          </a>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

const Creations: React.FC = () => {
  // Reference for the section to detect visibility
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" }); // Removed once: true

  // Animation variants for heading and subtitle
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white py-16 md:py-24 lg:px-36 px-4" ref={ref}>
      <div className="container mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          <motion.h2
            className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[68px] leading-tight"
            variants={textVariants}
          >
            Best of our creations
          </motion.h2>
          <motion.p
            className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4"
            variants={textVariants}
          >
            Comprehensive solutions tailored to your needs.
          </motion.p>
        </motion.div>

        {/* 3 cards: stack on mobile, single row on tablet/desktop */}
        <div className="mt-10 sm:mt-16 flex flex-col md:flex-row xl:flex-row justify-center gap-8 md:gap-x-12 xl:gap-x-12 items-stretch">
          {creationsData.map((creation, index) => (
            <CreationCard
              key={index}
              imageSrc={creation.imageSrc}
              title={creation.title}
              description={creation.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creations;
