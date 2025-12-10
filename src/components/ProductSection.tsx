"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Main Services Component (No changes here)
export default function ProductSection() {
  const { fearureProducts } = useSelector((state: RootState) => state.product);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section
      id="services"
      className="bg-white py-10 px-6 md:px-12"
      ref={ref}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-5xl font-serif text-[#b98663]"
            variants={textVariants}
          >
            Explore Products
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-neutral-600 mt-2 font-serif"
            variants={textVariants}
          >
            Discover our most popular furniture pieces that combine style,
            comfort, and functionality.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {fearureProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        <div className="w-full flex justify-center mt-12">
          <Link
            href="/products"
            className="bg-[#A97C51] text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-[#9c724a] transition-colors duration-200 cursor-pointer"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
