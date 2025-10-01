// import Image from "next/image";

// export default function Services(){
//   return (
//     <section className="bg-white py-12 px-6 md:px-12">
//       <div className="max-w-[1200px] mx-auto text-center">
//         <h2 className="text-[44px] font-serif text-[#b98663]">Our Services</h2>
//         <p className="text-neutral-600 mt-2 mb-8">Comprehensive solutions tailored to your needs.</p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {Array.from({length:3}).map((_,i)=> (
//             <article key={i} className=" rounded-[18px] p-6 relative overflow-hidden">
//               <div className="w-full h-[440px] rounded-[14px] overflow-hidden mb-4">
//                 <div className="relative w-full h-full">
//                   <Image src="/card_shape.svg" alt={`service-${i}`} fill className="object-cover" />
//                 </div>
//               </div>

//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import Image from "next/image";
import { useState } from "react";

const servicesData = [
  {
    title: "Full Interior",
    desc: "Aceon Interio offers complete interior solutions tailored to your budget and space. Whether it's a shop, villa, hotel, restaurant, or showroom, we design with precision and ensure that functionality meets aesthetics seamlessly.",
    bg: "/card_shape.svg", // background SVG
    img: "/livingRoom.png",  // image on top
  },
  {
    title: "Custom Furniture",
    desc: "We create bespoke furniture designed to perfectly fit your lifestyle and space requirements, blending comfort with elegance.",
    bg: "/card_shape.svg",
    img: "/livingRoom.png",
  },
  {
    title: "Renovation",
    desc: "Our renovation services transform outdated spaces into modern, functional, and visually appealing environments.",
    bg: "/card_shape.svg",
    img: "/livingRoom.png",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[44px] font-serif text-[#b98663]">Our Services</h2>
        <p className="text-neutral-600 mt-2 mb-8">
          Comprehensive solutions tailored to your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
  bg,
  img,
}: {
  title: string;
  desc: string;
  bg: string;
  img: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortText = desc.slice(0, 100) + "...";

  return (
    <article className="rounded-[18px] relative overflow-hidden shadow-md">
      {/* Background shape */}
      <div className="relative w-full h-[440px] rounded-[14px] overflow-hidden">
        <Image src={bg} alt="card background" fill className="object-cover" />

        {/* Service image INSIDE background */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-2xl">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-end text-start p-6 text-black">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm leading-relaxed">
            {expanded ? desc : shortText}
          </p>
          {desc.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-semibold underline hover:text-[#b98663]"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}