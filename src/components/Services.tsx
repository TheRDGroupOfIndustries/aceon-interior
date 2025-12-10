"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { motion, useInView, Variants } from "framer-motion";
import { servicesData } from "@/lib/data"; // Make sure to import from your data file

// Main Services Component (No changes here)
export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section id="services" className="bg-white py-10 px-6 md:px-12" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.h2 className="text-5xl font-serif text-[#b98663]" variants={textVariants}>
            Our Services
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-neutral-600 mt-2 font-serif"
            variants={textVariants}
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

// Service Card Component (RESTORED to original with Link wrapper)
function ServiceCard({
  title,
  desc,
  img,
  slug, // Added slug prop
  index,
}: {
  title: string;
  desc: string;
  img: string;
  slug: string; // Added slug type
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortText = desc.slice(0, 140) + "...";

  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Your original variants, unchanged
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.15 },
    },
  };
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    // This stops the click from triggering the parent <Link> navigation
    e.stopPropagation();
    e.preventDefault();
    setExpanded(!expanded);
  };
  
  return (
    // The entire card is wrapped in a Link
    <Link href={`/services/${slug}`} className="block">
      <motion.article
        ref={cardRef}
        initial="hidden"
        animate={isCardInView ? "visible" : "hidden"}
        variants={cardVariants}
        className="cursor-pointer"
      >
        {/* Your original JSX for the card is preserved below */}
        <div className="relative w-full min-h-[500px] rounded-[14px] overflow-hidden">
          <motion.div variants={imageVariants}>
            <Image src="/card_shape.svg" alt="card background" fill className="object-cover" sizes="100vw" />
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 w-full h-[50%] overflow-hidden group"
            variants={imageVariants}
          >
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover p-2 rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-103"
              sizes="100vw"
            />
          </motion.div>

          <motion.div
            className="absolute top-[50%] left-0 w-full h-[50%] px-4 text-black text-start flex flex-col"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h3 className="text-xl sm:text-2xl font-bold mb-2 font-playfair" variants={textVariants}>
              {title}
            </motion.h3>
            <motion.p
              className="text-sm sm:text-base text-gray-500 font-light flex-1 overflow-y-auto pr-1"
              variants={textVariants}
            >
              {expanded ? desc : shortText}
              {desc.length > 120 && (
                <button
                  onClick={handleReadMoreClick} // Use the safe click handler
                  className="text-sm sm:text-base text-blue-600 ml-1"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              )}
            </motion.p>
          </motion.div>

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
    </Link>
  );
}