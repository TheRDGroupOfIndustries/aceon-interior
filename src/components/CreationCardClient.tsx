// CreationCardClient.tsx (Client Component)
"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imageSrc: string;
  title: string;
  description: string;
  slug: string;
}

const CreationCardClient: React.FC<Props> = ({ imageSrc, title, description, slug }) => {
  const cardRef = useRef(null);
  
  const isInView = useInView(cardRef, { margin: "-50px" });

 
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This creates the staggered effect
      },
    },
  };

  const imageVariants:Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textContentVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.article
      className="w-full max-w-[400px] flex flex-col"
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants} // Apply the main card variants here
    >
      {/* 1. Image Animation */}
      <motion.div
        className="aspect-[373/311] overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={380}
          height={285}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </motion.div>

      {/* 2. Text Content Animation (Title, Description, and Link) */}
      <motion.div
        className="mt-6 text-left flex flex-col flex-grow"
        variants={textContentVariants}
      >
        <h3 className="font-semibold text-[28px] text-gray-800 uppercase leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-[16px] mt-4 text-justify leading-relaxed">
          {description}
        </p>
        <div className="mt-auto pt-6 text-right">
          <Link
            href={`/creations/${slug}`}
            className="font-poppins font-medium text-lg text-[#936a53] inline-block capitalize hover:text-[#7d5945] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default CreationCardClient;