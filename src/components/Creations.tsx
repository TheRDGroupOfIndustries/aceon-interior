import React from "react";
import { client } from "@/sanity/lib/sanity";
import CreationCardClient from "./CreationCardClient";
import Link from "next/link";

const getCreationsQuery = `*[_type == "creation"] | order(order asc) {
  title,
  description,
  "slug": slug.current,
  "imageSrc": image.asset->url
}`;

interface Creation {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
}

const Creations: React.FC = async () => {
  const creationsData: Creation[] = await client.fetch(getCreationsQuery);

  return (
    <section className="bg-white py-16 md:py-24 lg:px-36 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[68px] leading-tight">
          Best of our creations
        </h2>
        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {creationsData.slice(0, 3).map((c: Creation) => (
            <CreationCardClient
              key={c.slug}
              imageSrc={c.imageSrc}
              title={c.title}
              description={c.description}
              slug={c.slug}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-12">
          <Link
            href="/portfolio"
            className="bg-[#A97C51] text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-[#9c724a] transition-colors duration-200 cursor-pointer"
          >
            View All Creations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Creations;
