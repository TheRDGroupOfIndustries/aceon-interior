"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Disable body scroll when menu open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isMenuOpen]);

  const [links, setLinks] = useState([
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About", link: "/#about" },
    { name: "Services", link: "/#services" },
    { name: "Contact", link: "/#contact" },
  ]);

  // Dynamically add profile/admin routes
  useEffect(() => {
    let newLinks = [
      { name: "Home", link: "/" },
      { name: "Products", link: "/products" },
      { name: "About", link: "/#about" },
      { name: "Services", link: "/#services" },
      { name: "Contact", link: "/#contact" },
    ];

    if (session?.user) {
      if (session.user.role === "admin") {
        // newLinks.push({ name: "Profile", link: "/profile" });
        newLinks.push({ name: "Dashboard", link: "/admin" });
      } else if (session.user.role === "user") {
        // newLinks.push({ name: "Profile", link: "/profile" });
      }
    }

    setLinks(newLinks);
  }, [session?.user]);

  // Handle navigation for smooth scrolling or page change
  const navigateTo = (link: string) => {
    setIsMenuOpen(false);

    if (link.startsWith("#") || link.includes("/#")) {
      const id = link.replace("/#", "").replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    router.push(link);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 py-3 flex items-center justify-between px-4 md:px-8 gap-20 z-50">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-[#A97C51] transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex  md:flex-1 items-center justify-between w-full">
          <div className="hidden md:flex items-center gap-8">
            {links.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => navigateTo(item.link)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="text-gray-700 hover:text-[#A97C51] font-medium transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </div>
          <div className="">
            {!session?.user ? (
              <motion.button
                onClick={() => router.push("/auth/signin")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + 2 * 0.1 }}
                className="px-6 py-2.5 rounded-xl bg-[#A97C51] text-white text-lg font-playfair font-medium hover:bg-white hover:text-[#A97C51] border border-[#A97C51] transition-all"
              >
                Get Started
              </motion.button>
            ) : (
              <motion.button
                onClick={() => router.push("/profile")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + 2 * 0.1 }}
                className="px-6 py-2 rounded-xl bg-[#A97C51] text-white text-lg font-medium hover:bg-white hover:text-[#A97C51] border border-[#A97C51] transition-all"
              >
                Profile
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800 text-2xl p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97C51]"
        >
          {isMenuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/90 z-[90] flex flex-col items-center justify-center gap-8 px-6"
          >
            {links.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => navigateTo(item.link)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-white text-2xl hover:text-[#A97C51] transition-colors"
              >
                {item.name}
              </motion.button>
            ))}

            {!session?.user && (
              <motion.button
                onClick={() => navigateTo("/auth/signin")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-[#A97C51] text-white text-lg font-playfair font-medium hover:bg-white hover:text-[#A97C51] transition-all"
              >
                Get Started
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
