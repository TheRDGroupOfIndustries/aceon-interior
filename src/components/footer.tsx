// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { motion } from "framer-motion";
// import { BsInstagram, BsTwitterX } from "react-icons/bs";
// import { FaFacebook } from "react-icons/fa6";

// const Footer: React.FC = () => {
//   // Animation variants
//   const fadeUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, delay: i * 0.2, ease: "easeOut" },
//     }),
//   };

//   return (
//     <motion.footer
//       className="bg-[#B09579] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-base leading-relaxed"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: false, amount: 0.2 }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-5">
//           {/* Column 1: Logo & Description */}
//           <motion.div
//             className="w-full"
//             variants={fadeUp}
//             custom={0}
//           >
//             <div className="mb-5">
//               <img
//                 src="/images/logo.png"
//                 alt="Aceon Interio Logo"
//                 className="max-w-[180px] h-auto mix-blend-color-burn block"
//               />
//             </div>
//             <p className="mb-5 text-base font-light font-poppins leading-normal">
//               Smart, stylish, and tailored interiors for homes, offices & retail spaces across India. Creating comfort with purpose.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
//               >
//                 <BsInstagram />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="X (Twitter)"
//                 className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
//               >
//                 <BsTwitterX />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
//               >
//                 <FaFacebook />
//               </a>
//             </div>
//           </motion.div>

//           {/* Column 2: Quick Links */}
//           <motion.div
//             className="w-full"
//             variants={fadeUp}
//             custom={1}
//           >
//             <h3 className="text-[25px] mb-6 font-medium">Quick Links</h3>
//             <ul className="list-disc list-inside space-y-1">
//               <li><a href="#" className="text-white no-underline text-[18px] transition-colors hover:text-gray-200">Home</a></li>
//               <li><a href="#" className="text-white no-underline text-[18px] transition-colors hover:text-gray-200">Services</a></li>
//               <li><a href="#" className="text-white no-underline text-[18px] transition-colors hover:text-gray-200">About Us</a></li>
//               <li><a href="#" className="text-white no-underline text-[18px] transition-colors hover:text-gray-200">Contact</a></li>
//             </ul>
//           </motion.div>

//           {/* Column 3: Contact Info */}
//           <motion.div
//             className="w-full"
//             variants={fadeUp}
//             custom={2}
//           >
//             <h3 className="text-[25px] mb-6 font-medium">Contact Info</h3>
//             <div className="space-y-4">
//               <div className="flex text-[18px] items-center gap-3">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z"/></svg>
//                 <span>Ankit Sandiliya</span>
//               </div>
//               <div className="flex text-[18px] items-center gap-3">
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
//                   <path d="M16.23 12.2598L13.69 11.9698C13.3914 11.9347 13.0886 11.9678 12.8046 12.0665C12.5206 12.1652 12.2626 12.327 12.05 12.5398L10.21 14.3798C7.37144 12.9357 5.0641 10.6284 3.62004 7.78977L5.47004 5.93977C5.90004 5.50977 6.11004 4.90977 6.04004 4.29977L5.75004 1.77977C5.69356 1.29186 5.45951 0.841791 5.0925 0.515361C4.7255 0.188932 4.25121 0.00896555 3.76004 0.0097683H2.03004C0.900041 0.0097683 -0.0399593 0.949768 0.0300407 2.07977C0.560041 10.6198 7.39004 17.4398 15.92 17.9698C17.05 18.0398 17.99 17.0998 17.99 15.9698V14.2398C18 13.2298 17.24 12.3798 16.23 12.2598Z" fill="white"/>
//                 </svg>
//                 <span>+91 99197 55066</span>
//               </div>
//               <div className="flex text-[18px] items-center gap-3">
//                 <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
//                   <path fillRule="evenodd" clipRule="evenodd" d="M13.5099 0.11189C13.8411 -0.00878455 14.1998 -0.032419 14.544 0.0437643C14.8881 0.119947 15.2033 0.292782 15.4526 0.541956C15.7019 0.79113 15.8749 1.10629 15.9513 1.45039C16.0276 1.79449 16.0041 2.15323 15.8836 2.48446L11.7991 14.7267C11.6997 15.0276 11.5248 15.2979 11.2911 15.5118C11.0573 15.7257 10.7726 15.876 10.4642 15.9485C10.1565 16.0233 9.83461 16.0169 9.53009 15.93C9.22558 15.843 8.94887 15.6785 8.72705 15.4525L6.53505 13.2707L4.23334 14.4616C4.14511 14.5074 4.04647 14.5293 3.94716 14.5253C3.84785 14.5213 3.75131 14.4914 3.66707 14.4387C3.58283 14.3859 3.5138 14.3121 3.4668 14.2246C3.41979 14.137 3.39644 14.0387 3.39905 13.9393L3.49391 10.3005L11.5453 4.45246C11.6213 4.39731 11.6856 4.32773 11.7347 4.24771C11.7837 4.1677 11.8165 4.0788 11.8312 3.9861C11.8459 3.8934 11.8422 3.79871 11.8203 3.70745C11.7984 3.61618 11.7588 3.53012 11.7036 3.45418C11.6485 3.37823 11.5789 3.3139 11.4989 3.26485C11.4189 3.21579 11.33 3.18298 11.2373 3.16828C11.1446 3.15358 11.0499 3.15729 10.9586 3.17918C10.8673 3.20108 10.7813 3.24073 10.7053 3.29589L2.51791 9.24332L0.540768 7.26617C0.327686 7.05303 0.17059 6.79053 0.0834574 6.50201C-0.00367549 6.2135 -0.0181438 5.90792 0.0413395 5.61246C0.101047 5.28958 0.245552 4.98838 0.460037 4.73975C0.674523 4.49113 0.951273 4.30401 1.26191 4.1976H1.26648L13.5099 0.11189Z" fill="white"/>
//                 </svg>
//                 <span>care@aceoninterio.com</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         <div className="text-center mt-8 text-sm font-poppins opacity-80 font-light">
//           <p>&copy; {new Date().getFullYear()} Aceon Interio. Interior Design & Innovation. All rights reserved.</p>
//         </motion.div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView ,Variants} from "framer-motion";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

const Footer: React.FC = () => {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { margin: "-100px" });

  // Faster staggered container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger
      },
    },
  };

  const textVariants:Variants = {
    hidden: (direction: string = "up") => ({
      opacity: 0,
      y: direction === "up" ? 20 : 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      rotate: direction === "up" ? 2 : 0,
    }),
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4, // faster
        ease: "easeOut",
        delay: index * 0.08, // faster stagger
      },
    }),
  };

  const buttonVariants:Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: index * 0.08,
      },
    }),
  };

  return (
    <motion.footer
      className="bg-[#B09579] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-base leading-relaxed"
      ref={footerRef}
      initial="hidden"
      animate={isFooterInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-5">
          {/* Column 1: Logo & Description */}
          <motion.div className="w-full" variants={containerVariants}>
            <motion.div className="mb-5" variants={buttonVariants} custom={0}>
              <Image
                src="/images/logo.png"
                alt="Aceon Interio Logo"
                width={180}
                height={60}
                className="mix-blend-color-burn block"
              />
            </motion.div>
            <motion.p
              className="mb-5 text-base font-light font-poppins leading-normal"
              variants={textVariants}
              custom={1}
            >
              Smart, stylish, and tailored interiors for homes, offices & retail
              spaces across India. Creating comfort with purpose.
            </motion.p>
            <motion.div
              className="flex gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
                variants={buttonVariants}
                custom={2}
              >
                <BsInstagram />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
                variants={buttonVariants}
                custom={3}
              >
                <BsTwitterX />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex justify-center items-center w-10 h-10 rounded-full bg-[#8b6e5b] text-white transition-colors hover:bg-[#a3846c]"
                variants={buttonVariants}
                custom={4}
              >
                <FaFacebook />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="w-full" variants={containerVariants}>
            <motion.h3
              className="text-[25px] mb-6 font-medium"
              variants={textVariants}
              custom={5}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="list-disc list-inside space-y-1"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.li variants={textVariants} custom={6}>
                <Link
                  href="#"
                  className="text-white no-underline text-[18px] transition-colors hover:text-gray-200"
                >
                  Home
                </Link>
              </motion.li>
              <motion.li variants={textVariants} custom={7}>
                <Link
                  href="#"
                  className="text-white no-underline text-[18px] transition-colors hover:text-gray-200"
                >
                  Services
                </Link>
              </motion.li>
              <motion.li variants={textVariants} custom={8}>
                <Link
                  href="#"
                  className="text-white no-underline text-[18px] transition-colors hover:text-gray-200"
                >
                  About Us
                </Link>
              </motion.li>
              <motion.li variants={textVariants} custom={9}>
                <Link
                  href="#"
                  className="text-white no-underline text-[18px] transition-colors hover:text-gray-200"
                >
                  Contact
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div className="w-full" variants={containerVariants}>
            <motion.h3
              className="text-[25px] mb-6 font-medium"
              variants={textVariants}
              custom={10}
            >
              Contact Info
            </motion.h3>
            <motion.div
              className="space-y-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div className="flex text-[18px] items-center gap-3" variants={textVariants} custom={11}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z"
                    fill="white"
                  />
                </svg>
                <span>Ankit Sandiliya</span>
              </motion.div>
              <motion.div className="flex text-[18px] items-center gap-3" variants={textVariants} custom={12}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M16.23 12.2598L13.69 11.9698C13.3914 11.9347 13.0886 11.9678 12.8046 12.0665C12.5206 12.1652 12.2626 12.327 12.05 12.5398L10.21 14.3798C7.37144 12.9357 5.0641 10.6284 3.62004 7.78977L5.47004 5.93977C5.90004 5.50977 6.11004 4.90977 6.04004 4.29977L5.75004 1.77977C5.69356 1.29186 5.45951 0.841791 5.0925 0.515361C4.7255 0.188932 4.25121 0.00896555 3.76004 0.0097683H2.03004C0.900041 0.0097683 -0.0399593 0.949768 0.0300407 2.07977C0.560041 10.6198 7.39004 17.4398 15.92 17.9698C17.05 18.0398 17.99 17.0998 17.99 15.9698V14.2398C18 13.2298 17.24 12.3798 16.23 12.2598Z"
                    fill="white"
                  />
                </svg>
                <span>+91 99197 55066</span>
              </motion.div>
              <motion.div className="flex text-[18px] items-center gap-3" variants={textVariants} custom={13}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5099 0.11189C13.8411 -0.00878455 14.1998 -0.032419 14.544 0.0437643C14.8881 0.119947 15.2033 0.292782 15.4526 0.541956C15.7019 0.79113 15.8749 1.10629 15.9513 1.45039C16.0276 1.79449 16.0041 2.15323 15.8836 2.48446L11.7991 14.7267C11.6997 15.0276 11.5248 15.2979 11.2911 15.5118C11.0573 15.7257 10.7726 15.876 10.4642 15.9485C10.1565 16.0233 9.83461 16.0169 9.53009 15.93C9.22558 15.843 8.94887 15.6785 8.72705 15.4525L6.53505 13.2707L4.23334 14.4616C4.14511 14.5074 4.04647 14.5293 3.94716 14.5253C3.84785 14.5213 3.75131 14.4914 3.66707 14.4387C3.58283 14.3859 3.5138 14.3121 3.4668 14.2246C3.41979 14.137 3.39644 14.0387 3.39905 13.9393L3.49391 10.3005L11.5453 4.45246C11.6213 4.39731 11.6856 4.32773 11.7347 4.24771C11.7837 4.1677 11.8165 4.0788 11.8312 3.9861C11.8459 3.8934 11.8422 3.79871 11.8203 3.70745C11.7984 3.61618 11.7588 3.53012 11.7036 3.45418C11.6485 3.37823 11.5789 3.3139 11.4989 3.26485C11.4189 3.21579 11.33 3.18298 11.2373 3.16828C11.1446 3.15358 11.0499 3.15729 10.9586 3.17918C10.8673 3.20108 10.7813 3.24073 10.7053 3.29589L2.51791 9.24332L0.540768 7.26617C0.327686 7.05303 0.17059 6.79053 0.0834574 6.50201C-0.00367549 6.2135 -0.0181438 5.90792 0.0413395 5.61246C0.101047 5.28958 0.245552 4.98838 0.460037 4.73975C0.674523 4.49113 0.951273 4.30401 1.26191 4.1976H1.26648L13.5099 0.11189Z"
                    fill="white"
                  />
                </svg>
                <span>care@aceoninterio.com</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8 text-sm font-poppins opacity-80 font-light"
          variants={textVariants}
          custom={14}
        >
          <p>
            &copy; {new Date().getFullYear()} Aceon Interio. Interior Design &
            Innovation. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
