// components/contact.tsx - Corrected
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white py-20 font-sans text-[#333]">
         <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          /* Applying system serif font for "playfair" and "prata" look */
          .font-playfair, .font-prata {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          }
        `}
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="text-center mb-16">
        <h1 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight capitalize">Contact Us</h1>
        <p className="font-prata text-[#423F3F] text-xl md:text-[30px]">Let's start shaping your dream space together.</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-[1300px] mx-auto gap-[80px] items-start px-2 lg:px-0"> {/* Adjusted max-w and gap for precise fit */}
        {/* Left Section - Contact Info */}
        <div className="w-full md:w-[320px] flex-shrink-0"> {/* Adjusted width to be more precise */}
          <p className="text-lg leading-relaxed mb-8 text-[#666]">
            Feel free to reach out if you have a question, a project in mind, or want to say hello.
          </p>
          <div className="mb-4 flex items-center">
            <span className="text-2xl text-[#8b6e5b] mr-2">👤</span>
            <span className="text-lg text-[#333]">Ankit Sandiliya</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-2xl text-[#8b6e5b] mr-2">📞</span>
            <span className="text-lg text-[#333]">+91 99197 55066</span>
          </div>
          <div className="mb-8 flex items-center">
            <span className="text-2xl text-[#8b6e5b] mr-2">✉️</span>
            <span className="text-lg text-[#333]">care@aceoninterio.com</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]">
              <img src="/images/Vector.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]">
              <img src="/images/prime_twitter.png" alt="X" className="w-6 h-6" />
            </a>
            <a href="#" className="flex justify-center items-center w-10 h-10 rounded-full bg-[#a3846c] text-white text-xl transition-colors hover:bg-[#8b6e5b]">
              <img src="/images/facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="flex-1"> {/* This allows the form to take remaining space */}
          <form className="p-0 bg-white">
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input type="text" placeholder="Name" className="flex-1 py-4 px-5 border border-[#ddd] rounded-md text-base text-[#333] bg-white focus:outline-none focus:ring-1 focus:ring-[#a3846c]" /> {/* Adjusted padding, removed shadow */}
              <input type="email" placeholder="Email" className="flex-1 py-4 px-5 border border-[#ddd] rounded-md text-base text-[#333] bg-white focus:outline-none focus:ring-1 focus:ring-[#a3846c]" /> {/* Adjusted padding, removed shadow */}
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input type="text" placeholder="Number" className="flex-1 py-4 px-5 border border-[#ddd] rounded-md text-base text-[#333] bg-white focus:outline-none focus:ring-1 focus:ring-[#a3846c]" /> {/* Adjusted padding, removed shadow */}
              <input type="text" placeholder="Address" className="flex-1 py-4 px-5 border border-[#ddd] rounded-md text-base text-[#333] bg-white focus:outline-none focus:ring-1 focus:ring-[#a3846c]" /> {/* Adjusted padding, removed shadow */}
            </div>
            <textarea placeholder="Description" rows={6} className="w-full py-4 px-5 border border-[#ddd] rounded-md text-base text-[#333] bg-white resize-y focus:outline-none focus:ring-1 focus:ring-[#a3846c]"></textarea> {/* Adjusted padding, removed shadow */}
            <div className="text-right mt-8">
              <button type="submit" className="bg-[#a3846c] text-white py-4 px-10 border-none rounded-md text-lg cursor-pointer transition-colors hover:bg-[#8b6e5b] shadow-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;