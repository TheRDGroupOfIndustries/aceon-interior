"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaFacebook, FaBars, FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';

function Elements() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about-us" },
    { name: "Services", link: "#services" },
    { name: "Contacts", link: "#contacts" },
  ];

  return (
    <div className="w-full h-full absolute inset-0 z-50">
      {/* Desktop Navigation - unchanged */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex w-3/4 h-10 mt-4 justify-end items-center gap-10 px-8"
      >
        {links.map((items, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            <Link className='text-white text-xl' href={items.link}>
              {items.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden flex justify-end items-center w-full px-4 mt-4 h-10"
      >
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-2xl z-[100] p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-8"
          >
            {links.map((items, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link 
                  className='text-white text-2xl hover:text-[#b98663] transition-colors' 
                  href={items.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {items.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="h-full flex justify-center items-start flex-col px-4 sm:px-6 md:px-8">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='text-4xl sm:text-5xl md:text-8xl font-playfair text-white leading-tight md:leading-normal'
        >
          creating comfort <br /> with style
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='text-base sm:text-xl md:text-3xl mt-4 md:mt-3 font-light font-playfair text-white leading-relaxed'
        >
          Design smart, live smart, and always <br /> choose Aceon for interiors
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center mt-6 md:mt-8 w-full sm:w-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all'
          >
            Get Started
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-2 rounded-xl border hover:bg-white hover:text-[#b98663] transition-all border-white text-white text-lg md:text-xl font-medium'
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>

      {/* Social Media Links */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-2 px-1 bg-white/20 rounded-xl absolute right-2 md:right-4 top-1/6 flex flex-col justify-center items-center gap-2"
      >
          <Link href="#" className="rounded-full hover:bg-[#a87147] transition-colors p-2">
            <FaInstagram className="w-5 h-5 md:w-6 md:h-6 text-current" />
          </Link>
          <Link href="#" className="rounded-full hover:bg-[#a87147] transition-colors p-2">
            <FaFacebook className="w-5 h-5 md:w-6 md:h-6 text-current" />
          </Link>
          <Link href="#" className="rounded-full hover:bg-[#a87147] transition-colors p-2">
            <FaXTwitter className="w-5 h-5 md:w-6 md:h-6 text-current" />
          </Link>
      </motion.div>

      {/* Feature Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative md:absolute bottom-4 sm:bottom-6 md:bottom-6 right-0 left-0 mx-auto md:right-5 md:left-auto md:mx-0 bg-white shadow-lg rounded-2xl p-3 sm:p-4 w-[90%] sm:w-[75%] md:w-[40%] lg:w-[33%] h-auto min-h-[140px] sm:min-h-[180px] md:h-[200px] flex flex-col sm:flex-row z-10 overflow-hidden max-w-[90vw]"
      >
        <div className="relative w-full sm:w-1/3 h-[120px] sm:h-full rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/Rectangle 269.svg"
            alt="Designed room"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 75vw, 33vw"
            priority
          />
        </div>

        <div className="flex-1 min-w-0 mt-3 sm:mt-0 sm:ml-3 flex flex-col justify-center overflow-hidden">
          <h3 className="text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-1">
            Furniture Design
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 overflow-hidden line-clamp-3 pr-1">
            &quot;Custom furniture solutions for your home or office - stylish,
            functional, and within your budget. Serving Varanasi on time.&quot;
          </p>
          <span className="block mt-1 sm:mt-2 text-[10px] sm:text-sm font-semibold text-gray-900 truncate line-clamp-1">
            Style Within Your ₹ Budget
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <div className='w-screen h-screen overflow-hidden grid place-items-center'>
      <div className="w-full h-full md:w-[90%] md:h-[95%] relative">
        <Elements />

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <Image 
            src="/Rectangle 263.svg"
            alt='bg'
            fill
            className='scale-x-105 object-cover md:object-contain'
            priority
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16 absolute top-1 left-2 sm:left-3 md:left-0 md:top-0 z-[60]"
        >
          <Image
            src="/aceonlogo.svg"
            alt="Aceon Interio"
            width={10}
            height={10}
            className="w-full h-full object-contain md:ml-4 md:mt-1.5"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="w-72 h-14 sm:w-80 sm:h-14 md:w-96 md:h-16 absolute right-2 top-0 z-[90] hidden sm:flex justify-center items-center cursor-pointer"
        >
          <Image 
            src="/buildrectangle.svg"
            alt='Rect'
            fill
            className='w-full h-full object-contain scale-105'
          />
          <span className='text-white text-lg sm:text-xl md:text-2xl relative text-center z-50 font-playfair px-2'>
            Build a modern Interior
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;