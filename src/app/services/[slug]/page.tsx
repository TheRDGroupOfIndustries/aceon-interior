"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data";
import { motion, Variants } from "framer-motion";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ServicePage({ params }: Props) {
  // ✅ FIX: unwrap params using React.use()
  const { slug } = React.use(params);

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) notFound();

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white min-h-screen py-10 md:py-16 px-6 md:px-12 relative">
      <div className="max-w-[1000px] mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6 sm:left-10 z-50"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#b98663] transition-colors font-serif"
          >
            <IoArrowBack />
            Back to All Services
          </Link>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="pt-12 md:pt-16">
          {/* --- Main Details Section --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              className="relative w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div className="flex flex-col gap-4" variants={sectionVariants}>
              <motion.h1 className="text-4xl md:text-5xl font-serif text-[#b98663]" variants={itemVariants}>
                {service.title}
              </motion.h1>
              <motion.p className="text-base md:text-lg text-neutral-700 leading-relaxed" variants={itemVariants}>
                {service.desc}
              </motion.p>
            </motion.div>
          </div>

          <motion.hr variants={itemVariants} className="my-12 md:my-16 border-t border-neutral-200" />

          {/* --- Key Features Section --- */}
          {service.keyFeatures && (
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-serif text-neutral-800 mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {service.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <IoCheckmarkCircleOutline className="text-xl text-[#b98663] mt-1 flex-shrink-0" />
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.hr variants={itemVariants} className="my-12 md:my-16 border-t border-neutral-200" />

          {/* --- Our Process Section --- */}
          {service.process && (
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-serif text-neutral-800 mb-8 text-center">Our Process</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((step) => (
                  <div key={step.step} className="text-center p-4">
                    <div className="text-4xl font-serif font-bold text-[#b98663] mb-2">{step.step}</div>
                    <h3 className="text-lg font-bold text-neutral-700 mb-1">{step.title}</h3>
                    <p className="text-sm text-neutral-500">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
