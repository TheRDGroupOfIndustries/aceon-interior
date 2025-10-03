// import React from 'react';
// import { BsInstagram, BsTwitterX } from 'react-icons/bs';
// import { FaTelegramPlane } from 'react-icons/fa';
// import { FaFacebook } from 'react-icons/fa6';
// import { IoPerson } from 'react-icons/io5';
// import { MdLocalPhone } from 'react-icons/md';

// const Contact: React.FC = () => {
//   // Define common styles for all input/textarea fields for consistency
//   const inputStyles = "w-full py-3 px-5 bg-white border border-[#D4C1B4] rounded-[10px] text-base text-[#333] placeholder-[#967A66] focus:outline-none focus:ring-1 focus:ring-[#A97C51]";

//   return (
//     <div className="bg-white py-20 font-sans text-[#333]">
//       <div className="text-center mb-16">
//         <h1 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">Contact Us</h1>
//         <p className="font-prata text-[#423F3F] pt-5 text-xl md:text-[25px]">Let&apos;s start shaping your dream space together.</p>
//       </div>

//    <div className="flex flex-col md:flex-row max-w-[1300px] mx-auto gap-[80px] items-start px-4 sm:px-6 lg:px-10">
//               {/* Left Section - Contact Info */}
//         <div className="w-full md:w-[320px] flex-shrink-0">
//           <p className="text-lg font-poppins leading-relaxed mb-8 text-[#666]">
//             Feel free to reach out if you have a question, a project in mind, or want to say hello.
//           </p>
//           <div className="mb-4 flex items-center gap-4">
//            <IoPerson className='text-[#A97C51] text-lg'/> 
//             <span className="text-lg text-[#333]">Ankit Sandiliya</span>
//           </div>
//           <div className="mb-4 flex items-center gap-4">
//            <MdLocalPhone className='text-[#A97C51] text-lg'/>
//             <span className="text-lg text-[#333]">+91 99197 55066</span>
//           </div>
//           <div className="mb-8 flex items-center gap-4">
//             <FaTelegramPlane className='text-[#A97C51] text-lg'/> 
//             <span className="text-lg text-[#333]">care@aceoninterio.com</span>
//           </div>
          
//           {/* Social Media Links Section */}
//           <div className="flex gap-4">
//             {/* Instagram Link */}
//             <a 
//               href="https://www.instagram.com" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               aria-label="Visit our Instagram page"
//               className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
//             >
//               <BsInstagram/>
//             </a>
//             {/* X (Twitter) Link */}
//             <a 
//               href="https://www.twitter.com" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               aria-label="Visit our X (Twitter) page"
//               className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
//             >
//                <BsTwitterX/>
//             </a>
//             {/* Facebook Link */}
//             <a 
//               href="https://www.facebook.com" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               aria-label="Visit our Facebook page"
//               className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
//             >
//              <FaFacebook/>
//             </a>
//           </div>
//         </div>

//         {/* Right Section - Contact Form */}
//         <div className="flex-1 w-full">
//           <form className="p-0 bg-white">
//             <div className="flex flex-col md:flex-row gap-5 mb-5">
//               <input type="text" placeholder="Name" className={`${inputStyles} flex-1 `} />
//               <input type="email" placeholder="Email" className={`${inputStyles} flex-1`} />
//             </div>
//             <div className="flex flex-col md:flex-row gap-5 mb-5">
//               <input type="text" placeholder="Number" className={`${inputStyles} flex-1`} />
//               <input type="text" placeholder="Address" className={`${inputStyles} flex-1`} />
//             </div>
//             <textarea placeholder="Description" rows={6} className={`${inputStyles} resize-y`}></textarea>
//             <div className="text-right mt-8">
//               <button type="submit" className="bg-[#a3846c] text-white py-3 px-10 border-none rounded-[10px] text-lg cursor-pointer transition-colors hover:bg-[#8b6e5b]">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const Contact: React.FC = () => {
  const inputStyles =
    "w-full py-3 px-5 bg-white border border-[#D4C1B4] rounded-[10px] text-base text-[#333] placeholder-[#967A66] focus:outline-none focus:ring-1 focus:ring-[#A97C51]";

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="bg-white py-20 font-sans text-[#333]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
      >
        <h1 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">
          Contact Us
        </h1>
        <p className="font-prata text-[#423F3F] pt-5 text-xl md:text-[25px]">
          Let&apos;s start shaping your dream space together.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row max-w-[1300px] mx-auto gap-[80px] items-start px-4 sm:px-6 lg:px-10">
        {/* Left Section - Contact Info */}
        <motion.div
          className="w-full md:w-[320px] flex-shrink-0"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg font-poppins leading-relaxed mb-8 text-[#666]">
            Feel free to reach out if you have a question, a project in mind, or want to say hello.
          </p>
          <div className="mb-4 flex items-center gap-4">
            <IoPerson className="text-[#A97C51] text-lg" />
            <span className="text-lg text-[#333]">Ankit Sandiliya</span>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <MdLocalPhone className="text-[#A97C51] text-lg" />
            <span className="text-lg text-[#333]">+91 99197 55066</span>
          </div>
          <div className="mb-8 flex items-center gap-4">
            <FaTelegramPlane className="text-[#A97C51] text-lg" />
            <span className="text-lg text-[#333]">care@aceoninterio.com</span>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
            >
              <BsInstagram />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our X (Twitter) page"
              className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]"
            >
              <FaFacebook />
            </a>
          </div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.div
          className="flex-1 w-full"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <form className="p-0 bg-white">
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input type="text" placeholder="Name" className={`${inputStyles} flex-1`} />
              <input type="email" placeholder="Email" className={`${inputStyles} flex-1`} />
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input type="text" placeholder="Number" className={`${inputStyles} flex-1`} />
              <input type="text" placeholder="Address" className={`${inputStyles} flex-1`} />
            </div>
            <textarea placeholder="Description" rows={6} className={`${inputStyles} resize-y`}></textarea>
            <div className="text-right mt-8">
              <button
                type="submit"
                className="bg-[#a3846c] text-white py-3 px-10 border-none rounded-[10px] text-lg cursor-pointer transition-colors hover:bg-[#8b6e5b]"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
