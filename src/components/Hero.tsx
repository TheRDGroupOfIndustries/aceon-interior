

import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { Fragment } from 'react';

export default function Hero() {
 return (
  <div className="relative w-full min-h-screen bg-white p-4 md:p-[50px] flex items-start justify-center">
   {/* Main container for the hero card with the background image */}
  <div className="relative w-full max-w-[1350px] md:h-[720px] h-[620px] rounded-[20px] overflow-hidden shadow-lg border-4">
    {/* Background Image */}
    <Image src="/Rectangle 263.svg" alt="Living room interior" fill className="object-cover object-center" />
  {/* Remove dark gradient overlay - show the image clearly. Keep a transparent white veil for text legibility if needed */}
  <div className="absolute inset-0 bg-transparent pointer-events-none" />

    {/* Notched Frame Effect - positioned outside the main container */}
    {/* Logo area - top left outside the frame */}
  <div className="absolute -left-0 -top-3 w-[130px] h-[80px] bg-white rounded-2xl border-4 border-white z-30 flex items-center justify-center">
     <Image src="/aceonlogo.svg" alt="Aceon Interio" width={112} height={80} className="object-contain" />
    </div>
    
  {/* Build rectangle (buildrectangle) - top right */}
  <div className="absolute -right-9 -top-6 z-30 hidden md:block" aria-label="buildrectangle">
   <div className="relative bg-white rounded-2xl p-2 shadow-md border border-white">
    {/* Outer white frame with inner brown chip to match the provided design */}
    <div className="bg-[#b98663] text-white rounded-[12px] w-[349px] h-[64px] flex items-center justify-center pl-6 pr-6">
     <span className="font-serif text-[20px] tracking-wide">Build a modern Interior</span>
    </div>
    {/* small white inner notch effect on the top-left of the chip to match rounded white frame */}
    <div className="absolute -left-3 -top-3 w-6 h-6 bg-white rounded-tl-lg" aria-hidden />
   </div>
  </div>

    {/* Bottom center notch - outside the frame */}
  <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[160px] h-[40px] bg-white rounded-t-2xl border-4 border-white border-b-0 z-30" />

    {/* Nav Menu inside the main hero container */}
  <nav className="absolute top-[20px] left-1/2 -translate-x-1/5 hidden md:flex gap-8 text-white text-sm z-40">
     <a href="Home" className="hover:underline font-semibold">Home</a>
     <a href="Services" className="hover:underline font-semibold">Services</a>
     <a href="About" className="hover:underline font-semibold">About</a>
     <a href="Contact" className="hover:underline font-semibold">Contact</a>
    </nav>

    {/* Main Hero Content */}
  <div className="relative z-30 flex flex-col items-start h-full p-6 pt-16 sm:pt-24 md:pt-48">
     {/* Headline Text and Buttons */}
  <div className="max-w-[634px] md:h-[206px] text-white relative md:absolute md:top-1/3 md:left-[40px] w-full md:w-auto">
     <h1 className="text-[28px] sm:text-[44px] md:text-[64px] lg:text-[84px] leading-[0.95] font-serif text-center md:text-left">
       creating comfort
       <br />
       with style
      </h1>
    <p className="font-serif mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-[466px] mx-auto md:mx-0 text-center md:text-left">
       Design smart, live smart, and always choose Aceon
       <br/>for interiors
      </p>
      {/* CTA Buttons */}
    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
      <button className="bg-[#b98663] text-white rounded-2xl font-semibold shadow-md w-full sm:w-[159px] h-[52px] flex items-center justify-center">Get Started</button>
      <button className="border border-white/60 text-white rounded-2xl font-medium w-full sm:w-[159px] h-[52px] flex items-center justify-center">Contact Us</button>
    </div>
     </div>
    </div>

    {/* Social Icons - positioned as a vertical stack on the right */}
  <div className="absolute top-1/2 right-[20px] -translate-y-1/2 hidden md:flex md:flex-col gap-3 z-40">
   <a href="#" aria-label="Instagram" className="w-12 h-12 bg-white/60 backdrop-blur-sm text-neutral-900 rounded-xl flex items-center justify-center text-lg border border-white/40">
      <FaInstagram />
     </a>
   <a href="#" aria-label="Facebook" className="w-12 h-12 bg-white/60 backdrop-blur-sm text-neutral-900 rounded-xl flex items-center justify-center text-lg border border-white/40">
      <FaFacebookF />
     </a>
   <a href="#" aria-label="Twitter" className="w-12 h-12 bg-white/60 backdrop-blur-sm text-neutral-900 rounded-xl flex items-center justify-center text-lg border border-white/40">
      <FaXTwitter />
     </a>
    </div>

    {/* Furniture Design Card - Desktop */}
    <div className="hidden sm:block absolute bottom-[40px] right-[40px] z-40">
     <div className="bg-white rounded-2xl p-4 w-[497px] h-[199px] shadow-lg flex gap-4 items-start">
      <div className="relative w-[153px] h-[176px] rounded-lg overflow-hidden flex-shrink-0">
       <Image src="/Rectangle 269.svg" alt="Designed room" width={153} height={176} className="object-cover" />
      </div>
      <div className="flex-1">
       <h3 className="font-semibold text-neutral-900 text-lg">Furniture Design</h3>
       <p className="text-sm text-neutral-700 mt-1">“Custom furniture solutions for your home or office — stylish, functional, and within your budget.” Serving varanasi with premium designs, on time.</p>
       <p className="mt-2 text-xs text-neutral-500 font-semibold">Style Within Your Budget</p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}