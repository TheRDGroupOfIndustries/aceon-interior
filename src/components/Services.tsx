"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { motion, useInView, Variants } from "framer-motion";

const servicesData = [
  {
    title: "Full Interior",
    desc: "Aceon Interio offers complete interior solutions tailored to your budget and space. Whether it's a shop, villa, hotel, restaurant, or showroom, we design with precision and ensure that functionality meets aesthetics seamlessly.",
    img: "/livingRoom.png",
  },
  {
    title: "Custom Furniture",
    desc: "We create bespoke furniture designed to perfectly fit your lifestyle and space requirements, blending comfort with elegance.",
    img: "/livingRoom.png",
  },
  {
    title: "Renovation",
    desc: "Our renovation services transform outdated spaces into modern, functional, and visually appealing environments.",
    img: "/livingRoom.png",
  },
];

export default function Services() {
  // Reference for the section to detect visibility
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" }); // No once: true

  // Animation variants for section heading and subtitle
  const textVariants:Variants = {
    hidden: (direction: string = "up") => ({
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      rotate: direction === "up" ? 3 : 0, // Subtle rotation for heading
    }),
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section className="bg-white py-12 px-6 md:px-12" ref={ref}>
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2
            className="text-[44px] sm:text-5xl font-playfair text-[#b98663]"
            variants={textVariants}
            custom={0} // First to appear
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-neutral-600 mt-2 mb-8 text-base sm:text-lg"
            variants={textVariants}
            custom={1} // Second to appear
          >
            Comprehensive solutions tailored to your needs.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  desc,
  img,
  index,
}: {
  title: string;
  desc: string;
  img: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortText = desc.slice(0, 140) + "...";

  // Reference for the card to detect visibility
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { margin: "-50px" });

  // Animation variants
  const cardVariants:Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15 + 0.3,
        staggerChildren: 0.15,
      },
    }),
  };

  const imageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.article
      className="relative"
      ref={cardRef}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      variants={cardVariants}
      custom={index + 2}
    >
      <div className="relative w-full min-h-[500px] rounded-[14px] overflow-hidden">
        {/* Background shape */}
        <motion.div variants={imageVariants}>
          <Image
            src="/card_shape.svg"
            alt="card background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Main Image with hover zoom */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[50%] overflow-hidden group"
          variants={imageVariants}
        >
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover p-2 rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="100vw"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="absolute top-[50%] left-0 w-full h-[50%] px-4 text-black text-start flex flex-col"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h3
            className="text-xl sm:text-2xl font-bold mb-2 font-playfair"
            variants={textVariants}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm sm:text-base text-gray-500 font-light flex-1 overflow-y-auto pr-1"
            variants={textVariants}
          >
            {expanded ? desc : shortText}
            {desc.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm sm:text-base text-blue-600 ml-1"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </motion.p>
        </motion.div>

        {/* Eye icon button */}
        <motion.button
          className="absolute bottom-2 -right-0 bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:bg-gray-300 transition"
          variants={buttonVariants}
        >
          <span className="text-3xl font-bold text-[#A97C51]">
            <IoEyeOutline />
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
}
