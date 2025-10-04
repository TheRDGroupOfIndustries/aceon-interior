"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const inputStyles =
    "w-full py-3 px-5 bg-white border border-[#D4C1B4] rounded-[10px] text-base text-[#333] placeholder-[#967A66] focus:outline-none focus:ring-1 focus:ring-[#A97C51]";

  // Animations
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for your message! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          number: "",
          address: "",
          description: "",
        });
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          <form onSubmit={handleSubmit} className="p-0 bg-white">
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputStyles} flex-1`}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputStyles} flex-1`}
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input
                type="text"
                name="number"
                placeholder="Number"
                value={formData.number}
                onChange={handleChange}
                className={`${inputStyles} flex-1`}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={`${inputStyles} flex-1`}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`${inputStyles} resize-y`}
              required
            ></textarea>
            
            {message && (
              <div className={`mt-4 p-3 rounded-[10px] text-center ${
                message.includes("Thank you") 
                  ? "bg-green-100 text-green-800 border border-green-200" 
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}>
                {message}
              </div>
            )}
            
            <div className="text-right mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#a3846c] text-white py-3 px-10 border-none rounded-[10px] text-lg cursor-pointer transition-colors hover:bg-[#8b6e5b] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;