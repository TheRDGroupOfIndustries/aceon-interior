import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#B09579] text-white py-16 px-4 md:px-0 font-sans text-base leading-relaxed">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start pb-10 border-b border-white border-opacity-20">
        <div className="w-full md:w-1/3 mb-10 md:mb-0 md:mr-10">
          <div className="mb-5">
            {/* Assuming a logo image */}
            <img src="/images/logo.png" alt="Aceon Interio Logo" className="max-w-[180px] h-auto bg-white block" />
          </div>
          <p className="mb-5">
            Smart, stylish, and tailored interiors for homes, offices & retail spaces across India. Creating comfort with purpose.
          </p>
          <div className="flex gap-4">
            <a href="#" className="flex justify-center items-center w-8 h-8 rounded-full bg-[#B09579] text-[#a3846c] text-lg transition-colors hover:bg-gray-100">
              <img src="/images/Vector.png" alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="#" className="flex justify-center items-center w-8 h-8 rounded-full bg-[#B09579] text-[#a3846c] text-lg transition-colors hover:bg-gray-100">
              <img src="/images/prime_twitter.png" alt="X" className="w-5 h-5" />
            </a>
            <a href="#" className="flex justify-center items-center w-8 h-8 rounded-full bg-[#B09579] text-[#a3846c] text-lg transition-colors hover:bg-gray-100">
              <img src="/images/facebook.png" alt="Facebook" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/3 mb-10 md:mb-0 md:mr-10">
          <h3 className="text-xl mb-6 font-bold">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="mb-3"><a href="#" className="text-white no-underline transition-colors hover:text-gray-200">Home</a></li>
            <li className="mb-3"><a href="#" className="text-white no-underline transition-colors hover:text-gray-200">Services</a></li>
            <li className="mb-3"><a href="#" className="text-white no-underline transition-colors hover:text-gray-200">About Us</a></li>
            <li className="mb-3"><a href="#" className="text-white no-underline transition-colors hover:text-gray-200">Contact</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-xl mb-6 font-bold">Contact Info</h3>
          <div className="mb-4 flex items-center">
            <span className="text-xl mr-2">👤</span>
            <span className="text-base">Ankit Sandiliya</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-xl mr-2">📞</span>
            <span className="text-base">+91 99197 55066</span>
          </div>
          <div className="mb-4 flex items-center">
            <span className="text-xl mr-2">✉️</span>
            <span className="text-base">care@aceoninterio.com</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm opacity-80">
        <p>2025 Aceon Interio. Interior Design & Innovation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;