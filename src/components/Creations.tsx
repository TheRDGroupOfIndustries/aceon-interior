
import React from "react";
import { client } from "@/sanity/lib/sanity";
import CreationCardClient from "./CreationCardClient"; 

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
          {creationsData.map((c: Creation) => (
            <CreationCardClient
              key={c.slug}
              imageSrc={c.imageSrc}
              title={c.title}
              description={c.description}
              slug={c.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creations;
