// // 'use client'
// // import Image from "next/image";
// // import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
// // import { useState } from "react";
// // import { FaBars, FaTimes } from "react-icons/fa";
// // export default function Hero() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-transparent flex items-start justify-center relative px-4">
// //       {/* Main hero card with rounded background */}
// //       <div className="relative w-full md:h-[720px] h-auto min-h-[620px] max-w-[1440px] rounded-[20px] overflow-hidden flex flex-col justify-between">
// //         {/* Background image */}
// //         <div className="absolute inset-0">
// //           <Image
// //             src="/Rectangle 263.svg"
// //             alt="Living room interior"
// //             fill
// //             priority
// //             className="object-cover md:object-fill"
// //             sizes="(max-width: 768px) 100vw, 1440px"
// //           />
// //         </div>
// //         {/* Overlay */}
// //         <div className="absolute inset-0 bg-transparent pointer-events-none" />

// //         {/* Top bar: Logo, Nav, Rectangle in flex row */}
// //         <div className="absolute top-6 left-0 w-full flex items-center justify-between py-3 z-50 ">
// //           {/* Logo */}
// //           <div className="w-[100px] h-[50px] rounded-2xl border-4 border-white flex items-center justify-center bg-white ml-4">
// //             <Image
// //               src="/aceonlogo.svg"
// //               alt="Aceon Interio"
// //               width={112}
// //               height={80}
// //               className="object-contain"
// //             />
// //           </div>
// //           {/* Hamburger Icon for Mobile */}
// //           <button
// //             className="md:hidden text-black z-50 relative mr-5"
// //             onClick={toggleMenu}
// //             aria-label="Toggle navigation menu"
// //           >
// //             {isMenuOpen ? (
// //               <FaTimes className="w-6 h-6 text-black" />
// //             ) : (
// //               <FaBars className="w-6 h-6 text-black" />
// //             )}
// //           </button>
// //           {/* Navigation for Desktop */}
// //           <nav className="hidden md:flex gap-8 text-white text-sm ml-60">
// //             <a href="/home" className="hover:underline font-semibold">
// //               Home
// //             </a>
// //             <a href="/services" className="hover:underline font-semibold">
// //               Services
// //             </a>
// //             <a href="/about" className="hover:underline font-semibold">
// //               About
// //             </a>
// //             <a href="/contact" className="hover:underline font-semibold">
// //               Contact
// //             </a>
// //           </nav>
// //           {/* Rectangle for Desktop */}
// //           <div className="hidden md:block">
// //             <div
// //               className="text-black h-[50px] flex items-center justify-center px-4"
// //               style={{
// //                 width: "320px",
// //                 backgroundImage: "url('/buildrectangle.svg')",
// //                 backgroundSize: "100% 100%",
// //                 backgroundPosition: "center",
// //                 backgroundRepeat: "no-repeat",
// //               }}
// //             >
// //               <span className="font-playfair text-[18px] tracking-wide text-white">
// //                 Build a modern Interior
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mobile Navigation Menu */}
// //         <div
// //           className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white z-40 transform ${
// //             isMenuOpen ? "translate-x-0" : "translate-x-full"
// //           } transition-transform duration-300 ease-in-out flex flex-col items-center pt-20`}
// //         >
// //           <nav className="flex flex-col gap-6 text-black text-lg font-semibold">
// //             <a href="/home" className="hover:underline" onClick={toggleMenu}>
// //               Home
// //             </a>
// //             <a href="/services" className="hover:underline" onClick={toggleMenu}>
// //               Services
// //             </a>
// //             <a href="/about" className="hover:underline" onClick={toggleMenu}>
// //               About
// //             </a>
// //             <a href="/contact" className="hover:underline" onClick={toggleMenu}>
// //               Contact
// //             </a>
// //           </nav>
// //         </div>

// //         {/* Hero content */}
// //         <div className="relative flex flex-col items-start h-full pt-28 sm:pt-32 pb-48 md:pb-6 px-4 sm:px-6 md:p-6">
// //           <div className="max-w-[670px] text-white relative md:absolute md:top-1/3 md:left-[40px] w-full md:w-auto text-left">
// //             <h1 className="text-[32px] sm:text-[36px] md:text-[64px] lg:text-[84px] leading-[0.95] font-playfair">
// //               Creating Comfort
// //               With Style
// //             </h1>
// //             <p className="font-playfair mt-4 sm:mt-6 text-lg sm:text-lg md:text-lg text-white/90 w-[75%] sm:w-full max-w-[466px]">
// //               Design smart, live smart, and always choose Aceon for interiors
// //             </p>

// //             {/* CTA Buttons */}
// //             <div className="mt-6 sm:mt-8 flex flex-row gap-4 items-start w-full md:w-auto">
// //               <button className="bg-[#b98663] text-white rounded-2xl font-semibold shadow-md w-[140px] sm:w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-[#a87147] transition-colors">
// //                 Get Started
// //               </button>
// //               <button className="border border-white/60 text-white rounded-2xl font-medium w-[140px] sm:w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-white hover:text-[#b98663] transition-colors">
// //                 Contact Us
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Social icons */}
// //         <div className="absolute top-1/3 right-2 sm:right-4 flex flex-col space-y-2 bg-gray-100/20 p-1 rounded-lg z-10">
// //           <a
// //             href="#"
// //             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
// //           >
// //             <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-current" />
// //           </a>
// //           <a
// //             href="#"
// //             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
// //           >
// //             <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-current" />
// //           </a>
// //           <a
// //             href="#"
// //             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
// //           >
// //             <FaXTwitter className="w-6 h-6 md:w-7 md:h-7 text-current" />
// //           </a>
// //         </div>

// //         {/* Furniture Design Card */}
// //         <div
// //           className="relative md:absolute bottom-12 right-0 md:right-5 bg-white shadow-lg rounded-2xl p-3 sm:p-4
// //           w-[75%] sm:w-[65%] md:w-2/6 mx-auto md:mx-0
// //           h-auto min-h-[140px] sm:min-h-[180px] md:h-[200px] flex flex-col sm:flex-row z-10"
// //         >
// //           <div className="relative w-full sm:w-1/3 h-[120px] sm:h-full rounded-lg overflow-hidden flex-shrink-0">
// //             <Image
// //               src="/Rectangle 269.svg"
// //               alt="Designed room"
// //               fill
// //               className="object-cover"
// //               sizes="(max-width: 768px) 75vw, 33vw"
// //               priority
// //             />
// //           </div>

// //           <div className="flex-1 min-w-0 mt-3 sm:mt-0 sm:ml-3 flex flex-col justify-center">
// //             <h3 className="text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
// //               Furniture Design
// //             </h3>
// //             <p className="text-xs sm:text-sm text-gray-600 overflow-hidden overflow-ellipsis">
// //               &quot;Custom furniture solutions for your home or office - stylish,
// //               functional, and within your budget. Serving Varanasi on time.&quot;
// //             </p>
// //             <span className="block mt-1 sm:mt-2 text-[10px] sm:text-sm font-semibold text-gray-900 truncate">
// //               Style Within Your ₹ Budget
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// 'use client'
// import Image from "next/image";
// import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Hero() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="w-full min-h-screen bg-transparent flex items-start justify-center relative sm:px-4 px-1 sm:py-0 py-1">
//       {/* Main hero card with rounded background */}
//       <div className="relative w-full md:h-[720px] h-auto min-h-[620px] max-w-[1440px] rounded-[20px] overflow-hidden flex flex-col justify-between">
//         {/* Background image */}
//         <div className="absolute inset-0">
//           <Image
//             src="/Rectangle 263.svg"
//             alt="Living room interior"
//             fill
//             priority
//             className="object-cover md:object-fill"
//             sizes="(max-width: 768px) 100vw, 1440px"
//           />
//         </div>
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-transparent pointer-events-none" />

//         {/* Top bar: Logo, Nav, Rectangle in flex row */}
//         <div className="absolute top-0 left-2 right-0 w-full flex items-center justify-between py-4 md:py-10 z-50 px-4">
//           {/* Logo - Using percentage-based sizing */}
//           <div className="w-[90px] md:w-[110px] h-[45px] md:h-[55px] rounded-2xl  flex items-center justify-center  flex-shrink-0">
//             <div className="relative w-full h-full p-1">
//               <Image
//                 src="/aceonlogo.svg"
//                 alt="Aceon Interio"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           </div>

//           {/* Hamburger Icon for Mobile */}
//           <button
//             className="md:hidden text-black z-50 relative flex-shrink-0"
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//           >
//             {isMenuOpen ? (
//               <FaTimes className="w-6 h-6 text-black" />
//             ) : (
//               <FaBars className="w-6 h-6 text-black" />
//             )}
//           </button>

//           {/* Navigation for Desktop */}
//           <nav className="hidden md:flex gap-6 lg:gap-8 text-white text-sm flex-shrink-0">
//             <a href="/home" className="hover:underline font-semibold whitespace-nowrap">
//               Home
//             </a>
//             <a href="/services" className="hover:underline font-semibold whitespace-nowrap">
//               Services
//             </a>
//             <a href="/about" className="hover:underline font-semibold whitespace-nowrap">
//               About
//             </a>
//             <a href="/contact" className="hover:underline font-semibold whitespace-nowrap">
//               Contact
//             </a>
//           </nav>

//           {/* Rectangle for Desktop - Using aspect ratio */}
//           <div className="hidden md:block flex-shrink-0">
//             <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center justify-center">
//               <Image
//                 src="/buildrectangle.svg"
//                 alt="Build rectangle background"
//                 fill
//                 className="object-contain"
//               />
//               <span className="relative z-10 font-playfair text-base lg:text-[18px] tracking-wide text-white whitespace-nowrap">
//                 Build a modern Interior
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div
//           className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white z-40 transform ${
//             isMenuOpen ? "translate-x-0" : "translate-x-full"
//           } transition-transform duration-300 ease-in-out flex flex-col items-center pt-20`}
//         >
//           <nav className="flex flex-col gap-6 text-black text-lg font-semibold">
//             <a href="/home" className="hover:underline" onClick={toggleMenu}>
//               Home
//             </a>
//             <a href="/services" className="hover:underline" onClick={toggleMenu}>
//               Services
//             </a>
//             <a href="/about" className="hover:underline" onClick={toggleMenu}>
//               About
//             </a>
//             <a href="/contact" className="hover:underline" onClick={toggleMenu}>
//               Contact
//             </a>
//           </nav>
//         </div>

//         {/* Hero content */}
//         <div className="relative flex flex-col items-start h-full pt-24 sm:pt-32 pb-48 md:pb-6 px-4 sm:px-6 md:px-8">
//           <div className="max-w-[670px] text-white relative md:absolute md:top-1/3 md:left-8 lg:left-[40px] w-full md:w-auto text-left">
//             <h1 className="text-[32px] sm:text-[36px] md:text-[56px] lg:text-[72px] xl:text-[84px] leading-[0.95] font-playfair">
//               Creating Comfort
//               With Style
//             </h1>
//             <p className="font-playfair mt-4 sm:mt-6 text-base sm:text-lg md:text-lg text-white/90 w-[85%] sm:w-full max-w-[466px]">
//               Design smart, live smart, and always choose Aceon for interiors
//             </p>

//             {/* CTA Buttons */}
//             <div className="mt-6 sm:mt-8 flex flex-row gap-4 items-start w-full md:w-auto">
//               <button className="bg-[#b98663] text-white rounded-2xl font-semibold shadow-md w-[140px] sm:w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-[#a87147] transition-colors">
//                 Get Started
//               </button>
//               <button className="border border-white/60 text-white rounded-2xl font-medium w-[140px] sm:w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-white hover:text-[#b98663] transition-colors">
//                 Contact Us
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Social icons - Using percentage positioning */}
//         <div className="absolute top-[35%] md:top-1/3 right-2 sm:right-4 flex flex-col space-y-2 bg-gray-100/20 p-1 rounded-lg z-10">
//           <a
//             href="#"
//             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
//           >
//             <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-current" />
//           </a>
//           <a
//             href="#"
//             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
//           >
//             <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-current" />
//           </a>
//           <a
//             href="#"
//             className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
//           >
//             <FaXTwitter className="w-6 h-6 md:w-7 md:h-7 text-current" />
//           </a>
//         </div>

//         {/* Furniture Design Card */}
//         <div
//           className="relative md:absolute bottom-8 md:bottom-12 right-0 md:right-5 bg-white shadow-lg rounded-2xl p-3 sm:p-4
//           w-[75%] sm:w-[65%] md:w-[40%] lg:w-2/6 mx-auto md:mx-0
//           h-auto min-h-[140px] sm:min-h-[180px] md:h-[200px] flex flex-col sm:flex-row z-10"
//         >
//           <div className="relative w-full sm:w-1/3 h-[120px] sm:h-full rounded-lg overflow-hidden flex-shrink-0">
//             <Image
//               src="/Rectangle 269.svg"
//               alt="Designed room"
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 75vw, 33vw"
//               priority
//             />
//           </div>

//           <div className="flex-1 min-w-0 mt-3 sm:mt-0 sm:ml-3 flex flex-col justify-center">
//             <h3 className="text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//               Furniture Design
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-3">
//               &quot;Custom furniture solutions for your home or office - stylish,
//               functional, and within your budget. Serving Varanasi on time.&quot;
//             </p>
//             <span className="block mt-1 sm:mt-2 text-[10px] sm:text-sm font-semibold text-gray-900 truncate">
//               Style Within Your ₹ Budget
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import Image from "next/image";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full min-h-screen bg-transparent flex items-start justify-center relative sm:px-4 px-1 sm:py-2 py-1 overflow-hidden">
      {/* Main hero card with rounded background - Use relative heights to adapt to zoom */}
      <div className="relative w-full h-[100vh] md:h-[100vh] min-h-[730px] max-w-[1440px] rounded-[20px] overflow-hidden flex flex-col justify-between">
        {/* Background image - Ensure it covers without overflow */}
        <div className="absolute inset-0">
          <Image
            src="/Rectangle 263.svg"
            alt="Living room interior"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1440px"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />

        {/* Top bar: Logo, Nav, Rectangle in flex row - Use flex to prevent overflow */}
        <div className="absolute top-0 left-2 right-0 w-full flex items-center justify-between py-2  z-50 px-2 overflow-hidden">
          {/* Logo - Use rem for better zoom scaling */}
          <div className="w-[5.625rem] md:w-[6.875rem] h-[2.8125rem] md:h-[3.4375rem] rounded-2xl flex items-center justify-center flex-shrink-0">
            <div className="relative w-full h-full p-1">
              <Image
                src="/aceonlogo.svg"
                alt="Aceon Interio"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-black z-50 relative flex-shrink-0"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-black" />
            ) : (
              <FaBars className="w-6 h-6 text-black" />
            )}
          </button>

          {/* Navigation for Desktop - Use flex-nowrap to prevent wrapping on zoom */}
          <nav className="hidden md:flex gap-6 lg:gap-8 text-white text-sm flex-shrink-0 flex-nowrap">
            <a href="/home" className="hover:underline font-semibold whitespace-nowrap">
              Home
            </a>
            <a href="/services" className="hover:underline font-semibold whitespace-nowrap">
              Services
            </a>
            <a href="/about" className="hover:underline font-semibold whitespace-nowrap">
              About
            </a>
            <a href="/contact" className="hover:underline font-semibold whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Rectangle for Desktop - Use percentage-based width for adaptability */}
          <div className="hidden md:block flex-shrink-0">
            <div className="relative w-[22%] min-w-[280px] lg:w-[25%] lg:min-w-[320px] aspect-[280/50] flex items-center justify-center">
              <Image
                src="/buildrectangle.svg"
                alt="Build rectangle background"
                fill
                className="object-contain"
              />
              <span className="relative z-10 font-playfair text-base lg:text-[18px] tracking-wide text-white whitespace-nowrap">
                Build a modern Interior
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Ensure it doesn't overflow screen */}
        <div
          className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-white z-40 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out flex flex-col items-center pt-20 overflow-y-auto`}
        >
          <nav className="flex flex-col gap-6 text-black text-lg font-semibold w-full px-4">
            <a href="/home" className="hover:underline py-2" onClick={toggleMenu}>
              Home
            </a>
            <a href="/services" className="hover:underline py-2" onClick={toggleMenu}>
              Services
            </a>
            <a href="/about" className="hover:underline py-2" onClick={toggleMenu}>
              About
            </a>
            <a href="/contact" className="hover:underline py-2" onClick={toggleMenu}>
              Contact
            </a>
          </nav>
        </div>

        {/* Hero content - Use relative positioning and clamp widths to prevent overflow */}
        <div className="relative flex flex-col items-start h-full pt-24 sm:pt-32 pb-48 md:pb-6 px-4 sm:px-6 md:px-8 overflow-hidden">
          <div className="max-w-[670px] text-white relative md:absolute md:top-1/3 md:left-8 lg:left-[40px] w-full md:w-auto text-left clamp-w-[85%] max-w-[90vw]">
            <h1 className="text-[32px] sm:text-[36px] md:text-[56px] lg:text-[72px] xl:text-[84px] leading-[0.95] font-playfair">
              Creating Comfort
              With Style
            </h1>
            <p className="font-playfair mt-4 sm:mt-6 text-base sm:text-lg md:text-lg text-white/90 w-[85%] sm:w-full max-w-[466px] clamp-w-[90%]">
              Design smart, live smart, and always choose Aceon for interiors
            </p>

            {/* CTA Buttons - Use min-width and flex to adapt */}
            <div className="mt-6 sm:mt-8 flex flex-row gap-4 items-start w-full md:w-auto">
              <button className="bg-[#b98663] text-white rounded-2xl font-semibold shadow-md min-w-[140px] sm:min-w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-[#a87147] transition-colors flex-shrink-0">
                Get Started
              </button>
              <button className="border border-white/60 text-white rounded-2xl font-medium min-w-[140px] sm:min-w-[159px] h-[48px] sm:h-[52px] flex items-center justify-center hover:bg-white hover:text-[#b98663] transition-colors flex-shrink-0">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Social icons - Position with percentages for zoom adaptability */}
        <div className="absolute top-[35%] md:top-1/3 right-2 sm:right-4 flex flex-col space-y-2 bg-gray-100/20 p-1 rounded-lg z-10">
          <a
            href="#"
            className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
          >
            <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-current" />
          </a>
          <a
            href="#"
            className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
          >
            <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-current" />
          </a>
          <a
            href="#"
            className="p-1 rounded-full hover:bg-[#a87147] transition-colors"
          >
            <FaXTwitter className="w-6 h-6 md:w-7 md:h-7 text-current" />
          </a>
        </div>

        {/* Furniture Design Card - Use percentages and clamp for no overflow */}
        <div
          className="relative md:absolute bottom-8 md:bottom-12 right-0 md:right-5 bg-white shadow-lg rounded-2xl p-3 sm:p-4
          w-[75%] sm:w-[65%] md:w-[40%] lg:w-[33%] mx-auto md:mx-0
          h-auto min-h-[140px] sm:min-h-[180px] md:h-[200px] flex flex-col sm:flex-row z-10 overflow-hidden max-w-[90vw]"
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
        </div>
      </div>
    </div>
  );
}
