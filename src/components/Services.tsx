"use client";
import Image from "next/image";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

const servicesData = [
  {
    title: "Full Interior",
    desc: "Aceon Interio offers complete interior solutions tailored to your budget and space. Whether it's a shop, villa, hotel, restaurant, or showroom, we design with precision and ensure that functionality meets aesthetics seamlessly.",
    img: "/livingRoom.png",
  },
  {
    title: "Custom Furniture",
    desc: "We create bespoke furniture designed to perfectly fit your lifestyle and space requirements, blending comfort with elegance.",
    img: "/livingRoom.png",
  },
  {
    title: "Renovation",
    desc: "Our renovation services transform outdated spaces into modern, functional, and visually appealing environments.",
    img: "/livingRoom.png",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[44px] sm:text-5xl font-playfair text-[#b98663]">
          Our Services
        </h2>
        <p className="text-neutral-600 mt-2 mb-8 text-base sm:text-lg">
          Comprehensive solutions tailored to your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
function ServiceCard({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortText = desc.slice(0, 140) + "...";

  return (
    <article className="relative">
      <div className="relative w-full min-h-[500px] rounded-[14px] overflow-hidden">
        <Image
          src="/card_shape.svg"
          alt="card background"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute top-0 left-0 w-full h-[50%]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover p-4 rounded-3xl"
            sizes="100vw"
          />
        </div>

        <div className="absolute top-[50%] left-0 w-full h-[50%] px-4 text-black text-start flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 font-playfair">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 font-light flex-1 overflow-y-auto pr-1">
            {expanded ? desc : shortText}
            {desc.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm sm:text-base text-blue-600 ml-1"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        <button className="absolute bottom-2 right-0 bg-gray-200 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-md hover:bg-gray-300 transition">
          <span className="text-2xl sm:text-3xl font-bold text-[#A97C51]">
            <IoEyeOutline />
          </span>
        </button>
      </div>
    </article>
  );
}
