// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaInstagram,
//   FaXTwitter,
//   FaFacebook,
//   FaBars,
//   FaX,
// } from "react-icons/fa6";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { useSession } from "next-auth/react";
// import EMIApplicationModal from "./EMIApplicationModal";

// function Elements() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);

//   const { data: session } = useSession();

//   useEffect(() => {
//     const original = document.body.style.overflow;
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = original || "";
//     }
//     return () => {
//       document.body.style.overflow = original || "";
//     };
//   }, [isMenuOpen]);

//   const [links, setLinks] = useState([
//     { name: "Home", link: "#home" },
//     { name: "Products", link: "/products" },
//     { name: "About", link: "#about" },
//     { name: "Services", link: "#services" },
//     { name: "Contact", link: "#contact" },
//   ]);

//   const elementVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (index: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut", delay: index * 0.3 },
//     }),
//   };

//   // useEffect(() => {
//   //   // Create a base set of links
//   //   const newLinks = [
//   //     { name: "Home", link: "#home" },
//   //     { name: "Products", link: "/products" },
//   //     { name: "About", link: "#about" },
//   //     { name: "Services", link: "#services" },
//   //     { name: "Portfolio", link: "/portfolio" },
//   //     { name: "Contact", link: "#contact" },
//   //   ];

//   //   if (session?.user) {
//   //     if (session?.user.role === "admin") {
//   //       newLinks.push({ name: "Profile", link: "/profile" });
//   //       newLinks.push({ name: "Dashboard", link: "/admin" });
//   //     } else if (session?.user.role === "user") {
//   //       newLinks.push({ name: "Profile", link: "/profile" });
//   //     }
//   //   }
//   //   setLinks(newLinks);
//   // }, [session?.user]);

//   return (
//     <div className="w-full h-full absolute inset-0 z-30">
//       {/* Desktop Navigation */}
//       {/* <div className="absolute top-3 left-0  z-40 pt-4 sm:pt-8 md:top-0 px-2 sm:px-4 md:px-10">
//         <div className="max-w-[1100px] mx-auto flex items-center justify-between">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-4"
//           >
//             {links.map((items, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
//               >
//                 <Link className="text-white text-base lg:text-lg xl:text-xl hover:text-[#b98663] transition-colors" href={items.link}>
//                   {items.name}
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>

//         </div>
//       </div> */}
//       <svg className="hidden">
//         <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
//           <feTurbulence
//             type="fractalNoise"
//             baseFrequency="0.008 0.008"
//             numOctaves="2"
//             seed="92"
//             result="noise"
//           />
//           <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
//           <feDisplacementMap
//             in="SourceGraphic"
//             in2="blurred"
//             scale="70"
//             xChannelSelector="R"
//             yChannelSelector="G"
//           />
//         </filter>
//       </svg>

//       {/* =========================================================
//         2. DESKTOP NAVIGATION - LIQUID GLASS
//         (Replaces the old commented-out and the simple glass div)
//         =========================================================
//       */}
//       <div className="absolute top-3 left-0 z-40 hidden md:block w-full">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           // Outer container styling. NOW LEFT-ALIGNED.
//           className="
//           max-w-fit
//           ml-4 md:ml-8 lg:ml-4
//           p-1
//           flex
//           items-center
//           justify-center
//           gap-6
//           rounded-full
//           shadow-2xl

//           /* Core Liquid Glass Container Styles */
//           relative
//           isolation-isolate
//           overflow-hidden
//           bg-transparent
//           border border-white/20
//         "
//         >
//           {/* LAYER 1: The Distortion Layer */}
//           <div
//             className="absolute inset-0 z-0 rounded-full"
//             style={{ filter: "url(#lg-dist)", backdropFilter: "blur(24px)" }}
//           />

//           {/* LAYER 2: The Base Color/Overlay Layer */}
//           <div className="absolute inset-0 z-10 bg-white/5 rounded-full" />

//           {/* LAYER 3: The Specular Highlight Layer */}
//           <div
//             className="absolute inset-0 z-20 rounded-full"
//             style={{
//               boxShadow:
//                 "inset 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 0 5px rgba(255, 255, 255, 0.75)",
//             }}
//           />

//           {/* LAYER 4: The Content Layer */}
//           <div className="relative z-30 flex items-center  px-4 py-2">
//             {links.map((items, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
//               >
//                 <Link
//                   className="
//                   text-white
//                   font-anta
//                   text-sm
//                   px-3 py-2
//                   rounded-full
//                   hover:bg-white/30
//                   transition-colors
//                 "
//                   href={items.link}
//                 >
//                   {items.name}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//       {/* Mobile Navigation */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="md:hidden flex justify-end items-center w-full px-2 mt-4 h-10"
//       >
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white text-2xl z-[100]  rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//           aria-label="Toggle menu"
//           aria-expanded={isMenuOpen}
//           aria-controls="mobile-menu"
//         >
//           {isMenuOpen ? <FaX /> : <FaBars />}
//         </button>
//       </motion.div>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             id="mobile-menu"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-8 px-6 pb-10 pt-16"
//           >
//             {links.map((items, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3, delay: i * 0.1 }}
//               >
//                 <Link
//                   className="text-white text-2xl hover:text-[#b98663] transition-colors"
//                   href={items.link}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {items.name}
//                 </Link>
//               </motion.div>
//             ))}
//             {/* Mobile CTA */}
//             {!session?.user ? (
//               <Link href="/auth/signin" className="block w-full sm:w-auto mt-8">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//                 >
//                   Get Started
//                 </motion.button>
//               </Link>
//             ) : session.user.role === "admin" ? (
//               <Link href="/admin" className="block w-full sm:w-auto mt-8">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//                 >
//                   Go to Dashboard
//                 </motion.button>
//               </Link>
//             ) : (
//               <Link href="/profile" className="block w-full sm:w-auto mt-8">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg:white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//                 >
//                   Go to Profile
//                 </motion.button>
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <div className="h-full flex flex-col justify-center items-center md:items-start max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-8 sm:mt-4 md:mt-0 lg:mt-[-1rem]">
//         <motion.h1
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair text-white leading-tight  text-balance text-center md:text-left w-full"
//         >
//           {"Creating comfort "}
//           <br className="hidden sm:block" />
//           {"with style"}
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-2 md:mt-3 font-light font-playfair text-white text-pretty max-w-[40ch] sm:max-w-none text-center md:text-left mx-auto md:mx-0"
//         >
//           {"Design smart, live smart, and always "}
//           <br className="hidden sm:block" />
//           {"choose Aceon for interiors"}
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.7 }}
//           className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mt-4 sm:mt-6 md:mt-8 w-full md:w-auto"
//         >
//           {/* <Link href="/auth/signin" className="block w-full sm:w-auto">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//             >
//               Get Started
//             </motion.button>
//           </Link> */}

//           {/* Apply For EMI Options - now on top */}
//           <motion.button
//             onClick={() => setIsEMIModalOpen(true)}
//             className="order-1 md:order-2 w-full md:w-auto bg-[#A97C51] text-white font-semibold h-[48px] sm:h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-xs sm:text-sm md:text-base px-6 sm:px-8 md:px-10 hover:bg-[#8b6e5b]"
//             variants={elementVariants}
//             custom={4}
//           >
//             Apply For EMI Options
//           </motion.button>

//           {/* Contact Us - moved below EMI button */}
//           <Link
//             href="#contact"
//             className="block w-full md:w-auto order-2 md:order-1"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 md:py-2 rounded-xl border hover:bg-white hover:text-[#b98663] transition-all border-white text-white text-base sm:text-lg md:text-xl font-medium whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
//             >
//               Contact Us
//             </motion.button>
//           </Link>
//         </motion.div>

//         <div className="flex md:hidden justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
//           <Link
//             href="#"
//             aria-label="Instagram"
//             className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
//           >
//             <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//           </Link>
//           <Link
//             href="#"
//             aria-label="Facebook"
//             className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
//           >
//             <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//           </Link>
//           <Link
//             href="#"
//             aria-label="X (Twitter)"
//             className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
//           >
//             <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//           </Link>
//         </div>
//       </div>

//       {/* Social Media Links (Vertical bar for desktop only) */}
//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.8 }}
//         className="hidden md:flex py-3 px-2 bg-white/20 rounded-xl absolute right-4 lg:right-6 top-1/4 flex-col justify-center items-center gap-3 backdrop-blur-sm"
//       >
//         <Link
//           href="#"
//           aria-label="Instagram"
//           className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
//         >
//           <FaInstagram className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
//         </Link>
//         <Link
//           href="#"
//           aria-label="Facebook"
//           className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
//         >
//           <FaFacebook className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
//         </Link>
//         <Link
//           href="#"
//           aria-label="X (Twitter)"
//           className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
//         >
//           <FaXTwitter className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
//         </Link>
//       </motion.div>

//       {/* Feature Card — hidden on mobile and small tablets, shows on large screens */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.9 }}
//         className="hidden lg:flex absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-2 sm:right-4 md:right-6 lg:right-8 bg-white shadow-lg rounded-2xl p-3 sm:p-4 lg:p-5 w-[250px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[400px] h-[150px] sm:h-[160px] md:h-[180px] lg:h-[200px] flex-row z-20"
//       >
//         <div className="relative w-[80px] sm:w-[90px] md:w-[100px] lg:w-[120px] h-full rounded-lg overflow-hidden flex-shrink-0">
//           <Image
//             src="/Rectangle 269.svg"
//             alt="Designed room"
//             fill
//             className="object-cover"
//             sizes="120px"
//             priority
//           />
//         </div>
//         <div className="flex-1 ml-3 sm:ml-4 flex flex-col justify-center">
//           <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//             Furniture Design
//           </h3>
//           <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 line-clamp-3 mb-2 sm:mb-3">
//             &quot;Custom furniture solutions for your home or office - stylish,
//             functional, and within your budget. Serving Varanasi on time.&quot;
//           </p>
//           <span className="text-xs sm:text-sm md:text-sm lg:text-base font-semibold text-gray-900">
//             Style Within Your ₹ Budget
//           </span>
//         </div>
//       </motion.div>

//       <EMIApplicationModal
//         isOpen={isEMIModalOpen}
//         onClose={() => setIsEMIModalOpen(false)}
//       />
//     </div>
//   );
// }

// function Hero() {
//   const { data: session } = useSession();

//   return (
//     <div className="w-full min-h-screen overflow-visible md:overflow-hidden flex items-center justify-center ">
//       <div className="relative w-full max-w-[1500px] aspect-auto sm:aspect-video min-h-[100dvh] sm:min-h-[90vh] md:min-h-[70vh]">
//         <Elements />

//         {/* {!session?.user && (
//           <Link
//             href="/auth/signin"
//             className="hidden md:block absolute top-24 right-5 z-30"
//           >
//             <motion.button
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.6 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="font-anta px-3 py-1.5 lg:px-4 lg:py-2 xl:px-6 xl:py-3 rounded-xl bg-[#A97C51] text-white text-xs sm:text-sm lg:text-base xl:text-lg font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 font-playfair"
//             >
//               Get Started
//             </motion.button>
//           </Link>
//         )} */}

//         <motion.div
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           className="absolute inset-0 w-full h-full"
//         >
//           <Image
//             src="/svgs/Aceon_Hero.svg"
//             alt="bg"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//         </motion.div>

//         {/* Logo */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="
//   absolute
//   top-1
//   left-1/2
//   -translate-x-1/2
//   z-50

//   w-28 h-14         /* Bigger on mobile */
//   sm:w-32 sm:h-16   /* Bigger on small screens */
//   md:w-32 md:h-16  /* Larger on desktop */
// "
//         >
//           <Image
//             src="/aceonlogo.svg"
//             alt="Aceon Interio Logo"
//             width={128}
//             height={64}
//             className="w-full h-full object-contain"
//           />
//         </motion.div>

//         {/* Top Right Navigation Container - Hidden on mobile */}
//         <div className="absolute top-2 right-10 sm:top-6 sm:right-6 hidden md:flex items-center gap-2 sm:gap-3 md:gap-10">
//           {!session?.user ? (
//             <Link href="/auth/signin">
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="z-50 relative w-[5rem] sm:w-[12rem] md:w-[10rem] lg:w-[14rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
//               >
//                 <Image
//                   src="/buildrectangle.svg"
//                   alt="Rect"
//                   fill
//                   className="object-contain pointer-events-none"
//                 />
//                 <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
//                   Get Started
//                 </span>
//               </motion.div>
//             </Link>
//           ) : session.user.role === "admin" ? (
//             <Link href="/admin">
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="z-50 relative w-[6rem] sm:w-[13rem] md:w-[11rem] lg:w-[15rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
//               >
//                 <Image
//                   src="/buildrectangle.svg"
//                   alt="Rect"
//                   fill
//                   className="object-contain pointer-events-none"
//                 />
//                 <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
//                   Go to Dashboard
//                 </span>
//               </motion.div>
//             </Link>
//           ) : (
//             <Link href="/profile">
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="z-50 relative w-[5rem] sm:w-[12rem] md:w-[10rem] lg:w-[14rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
//               >
//                 <Image
//                   src="/buildrectangle.svg"
//                   alt="Rect"
//                   fill
//                   className="object-contain pointer-events-none"
//                 />
//                 <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
//                   Go to Profile
//                 </span>
//               </motion.div>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaBars,
  FaX,
} from "react-icons/fa6";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSession } from "next-auth/react";
import EMIApplicationModal from "./EMIApplicationModal";

function Elements() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const original = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isMenuOpen]);

  const [links, setLinks] = useState([
    { name: "Home", link: "#home" },
    { name: "Products", link: "/products" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Contact", link: "#contact" },
  ]);

  const elementVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.3 },
    }),
  };

  // The commented-out useEffect block is kept as is per your request.
  // useEffect(() => {
  //    // Create a base set of links
  //    const newLinks = [
  //       { name: "Home", link: "#home" },
  //       { name: "Products", link: "/products" },
  //       { name: "About", link: "#about" },
  //       { name: "Services", link: "#services" },
  //       { name: "Portfolio", link: "/portfolio" },
  //       { name: "Contact", link: "#contact" },
  //    ];

  //    if (session?.user) {
  //       if (session?.user.role === "admin") {
  //          newLinks.push({ name: "Profile", link: "/profile" });
  //          newLinks.push({ name: "Dashboard", link: "/admin" });
  //       } else if (session?.user.role === "user") {
  //          newLinks.push({ name: "Profile", link: "/profile" });
  //       }
  //    }
  //    setLinks(newLinks);
  // }, [session?.user]);

  return (
    <div className="w-full h-full absolute inset-0 z-30">
      {/* Desktop Navigation (Old commented out block is removed to clean up, keeping only the SVG filter and the active Liquid Glass Nav) */}
      <svg className="hidden">
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* =========================================================
        2. DESKTOP NAVIGATION - LIQUID GLASS 
        *** ADJUSTED FOR CENTER ALIGNMENT ON DESKTOP ***
        =========================================================
      */}
      <div className="absolute top-3 left-2 z-40 hidden lg:flex w-full justify-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // Outer container styling. NOW CENTER-ALIGNED with 'justify-center' on the parent.
          className="
            max-w-fit 
            p-1 
            flex 
            items-center 
            justify-center 
            gap-6 
            rounded-full 
            shadow-2xl
            
            /* Core Liquid Glass Container Styles */
            relative 
            isolation-isolate 
            overflow-hidden 
            bg-transparent 
            border border-white/20
          "
        >
          {/* LAYER 1: The Distortion Layer */}
          <div
            className="absolute inset-0 z-0 rounded-full"
            style={{ filter: "url(#lg-dist)", backdropFilter: "blur(24px)" }}
          />

          {/* LAYER 2: The Base Color/Overlay Layer */}
          <div className="absolute inset-0 z-10 bg-white/5 rounded-full" />

          {/* LAYER 3: The Specular Highlight Layer */}
          <div
            className="absolute inset-0 z-20 rounded-full"
            style={{
              boxShadow:
                "inset 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 0 5px rgba(255, 255, 255, 0.75)",
            }}
          />

          {/* LAYER 4: The Content Layer */}
          <div className="relative z-30 flex items-center  px-4 py-2">
            {links.map((items, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <Link
                  className="
                    text-white 
                    font-anta
                    text-sm
                    px-3 py-2 
                    rounded-full
                    hover:bg-white/30 
                    transition-colors
                  "
                  href={items.link}
                >
                  {items.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation - Burger Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        // Adjusted padding for better fit on small screens
        className="lg:hidden flex justify-end items-center w-full px-4 mt-4 h-10"
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-2xl z-[100]  rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-8 px-6 pb-10 pt-16"
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
                  className="text-white text-2xl hover:text-[#b98663] transition-colors"
                  href={items.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {items.name}
                </Link>
              </motion.div>
            ))}
            {/* Mobile CTA - Kept structure as is */}
            {!session?.user ? (
              <Link href="/auth/signin" className="block w-full sm:w-auto mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Get Started
                </motion.button>
              </Link>
            ) : session.user.role === "admin" ? (
              <Link href="/admin" className="block w-full sm:w-auto mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg-white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Go to Dashboard
                </motion.button>
              </Link>
            ) : (
              <Link href="/profile" className="block w-full sm:w-auto mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-[#b98663] text-white text-lg md:text-xl font-medium hover:bg:white hover:text-[#b98663] transition-all whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Go to Profile
                </motion.button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        // Adjusted the vertical margin for better spacing on all viewports, and improved horizontal padding.
        className="h-full flex flex-col justify-center items-center md:items-start max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 "
      >
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair text-white leading-tight  text-balance text-center md:text-left w-full"
        >
          {"Creating comfort "}
          <br className="hidden sm:block" />
          {"with style"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-2 md:mt-3 font-light font-playfair text-white text-pretty max-w-[40ch] sm:max-w-none text-center md:text-left mx-auto md:mx-0"
        >
          {"Design smart, live smart, and always "}
          <br className="hidden sm:block" />
          {"choose Aceon for interiors"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          // Added margin top for better separation on all screen sizes
          className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mt-6 sm:mt-8 md:mt-10 w-full md:w-auto"
        >
          {/* Apply For EMI Options - kept structure as is */}
          <motion.button
            onClick={() => setIsEMIModalOpen(true)}
            className="order-1 md:order-2 w-full sm:w-auto bg-[#A97C51] text-white font-semibold h-[48px] sm:h-[52px] rounded-[10px] flex items-center justify-center transition-colors duration-300 text-xs sm:text-sm md:text-base px-6 sm:px-8 md:px-10 hover:bg-[#8b6e5b]"
            variants={elementVariants}
            custom={4}
          >
            Apply For EMI Options
          </motion.button>

          {/* Contact Us - kept structure as is */}
          <Link
            href="#contact"
            className="block w-full md:w-auto order-2 md:order-1"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 md:py-2 rounded-xl border hover:bg-white hover:text-[#b98663] transition-all border-white text-white  text-base sm:text-lg md:text-xl font-medium whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>

        {/* Mobile Social Media Links - Kept structure as is */}
        <div className="flex md:hidden justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Link
            href="#"
            aria-label="Instagram"
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
          >
            <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </Link>
          <Link
            href="#"
            aria-label="Facebook"
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
          >
            <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </Link>
          <Link
            href="#"
            aria-label="X (Twitter)"
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-[#a87147] transition-colors"
          >
            <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </Link>
        </div>
      </div>

      {/* Social Media Links (Vertical bar for desktop only) - Kept structure as is */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden lg:flex py-3 px-2 bg-white/20 rounded-xl absolute right-4 lg:right-6 top-1/4 flex-col justify-center items-center gap-3 backdrop-blur-sm"
      >
        <Link
          href="#"
          aria-label="Instagram"
          className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
        >
          <FaInstagram className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </Link>
        <Link
          href="#"
          aria-label="Facebook"
          className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
        >
          <FaFacebook className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </Link>
        <Link
          href="#"
          aria-label="X (Twitter)"
          className="rounded-full hover:bg-[#a87147] transition-colors p-2 lg:p-3"
        >
          <FaXTwitter className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </Link>
      </motion.div>

      {/* Feature Card - Kept structure as is */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden lg:flex absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-2 sm:right-4 md:right-6 lg:right-8 bg-white shadow-lg rounded-2xl p-3 sm:p-4 lg:p-5 w-[250px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[400px] h-[150px] sm:h-[160px] md:h-[180px] lg:h-[200px] flex-row z-20"
      >
        <div className="relative w-[80px] sm:w-[90px] md:w-[100px] lg:w-[120px] h-full rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/Rectangle 269.svg"
            alt="Designed room"
            fill
            className="object-cover"
            sizes="120px"
            priority
          />
        </div>
        <div className="flex-1 ml-3 sm:ml-4 flex flex-col justify-center">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
            Furniture Design
          </h3>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 line-clamp-3 mb-2 sm:mb-3">
            &quot;Custom furniture solutions for your home or office - stylish,
            functional, and within your budget. Serving Varanasi on time.&quot;
          </p>
          <span className="text-xs sm:text-sm md:text-sm lg:text-base font-semibold text-gray-900">
            Style Within Your ₹ Budget
          </span>
        </div>
      </motion.div>

      <EMIApplicationModal
        isOpen={isEMIModalOpen}
        onClose={() => setIsEMIModalOpen(false)}
      />
    </div>
  );
}

function Hero() {
  const { data: session } = useSession();

  return (
    <div className="w-full min-h-screen overflow-visible md:overflow-hidden flex items-center justify-center ">
      <div className="relative w-full max-w-[1500px] aspect-auto sm:aspect-video min-h-[100dvh] sm:min-h-[100vh] md:min-h-[100vh]">
        <Elements />

        {/* Top Right Navigation Container - Hidden on mobile */}
        <div className="absolute top-2 right-10 sm:top-6 sm:right-6 hidden lg:flex items-center gap-2 sm:gap-3 md:gap-10">
          {!session?.user ? (
            <Link href="/auth/signin">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="z-50 relative w-[5rem] sm:w-[12rem] md:w-[10rem] lg:w-[14rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
              >
                <Image
                  src="/buildrectangle.svg"
                  alt="Rect"
                  fill
                  className="object-contain pointer-events-none"
                />
                <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
                  Get Started
                </span>
              </motion.div>
            </Link>
          ) : session.user.role === "admin" ? (
            <Link href="/admin">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="z-50 relative w-[6rem] sm:w-[13rem] md:w-[11rem] lg:w-[15rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
              >
                <Image
                  src="/buildrectangle.svg"
                  alt="Rect"
                  fill
                  className="object-contain pointer-events-none"
                />
                <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
                  Go to Dashboard
                </span>
              </motion.div>
            </Link>
          ) : (
            <Link href="/profile">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="z-50 relative w-[5rem] sm:w-[12rem] md:w-[10rem] lg:w-[14rem] h-8 sm:h-12 md:h-14 md:bottom-4 flex justify-center items-center cursor-pointer"
              >
                <Image
                  src="/buildrectangle.svg"
                  alt="Rect"
                  fill
                  className="object-contain pointer-events-none"
                />
                <span className="font-anta text-white text-xs sm:text-sm relative text-center px-1 sm:px-2">
                  Go to Profile
                </span>
              </motion.div>
            </Link>
          )}
        </div>

        {/* Background Image - Kept structure as is */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/svgs/Aceon_Hero_2.svg"
            alt="bg"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Logo - Kept structure as is */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            absolute 
            top-1
            left-1/2 
            -translate-x-1/2 
            z-50 

            w-28 h-14       
            sm:w-32 sm:h-16    
            md:w-32 md:h-16  
          "
        >
          <Image
            src="/aceonlogo.svg"
            alt="Aceon Interio Logo"
            width={128}
            height={64}
            className="w-full h-full object-contain"
          />
        </motion.div> */}
      </div>
    </div>
  );
}

export default Hero;
