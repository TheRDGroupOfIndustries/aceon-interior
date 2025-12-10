"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

const PartnersSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const elementVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.3 },
    }),
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.3 },
    }),
  };

  return (
    <section className="bg-white py-10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize"
            variants={elementVariants}
            custom={0}
          >
            Our Trusted Partners
          </motion.h2>
          <motion.p
            className="font-prata text-[#423F3F] text-xl md:text-[30px] mt-4 max-w-4xl mx-auto"
            variants={elementVariants}
            custom={1}
          >
            Working together with trusted brands to deliver excellence.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center relative w-full h-[200px] md:h-[300px] lg:h-[400px]"
          variants={imageVariants}
          custom={2}
        >
          <Image
            src="/images/partners-horizontal.png"
            alt="A banner displaying the logos of our trusted partners"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
