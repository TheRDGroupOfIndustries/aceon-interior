"use client";

import CreationCardClient from "./CreationCardClient";

interface Creation {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
}

export default function PortfolioListing({ creationsData }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4 text-primary-500">Portfolio </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
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
  );
}
