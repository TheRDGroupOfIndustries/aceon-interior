import React from 'react';

interface GalleryItem {
  name?: string;
  src: string;
  width: number;
  height: number;
}

const galleryRow1: GalleryItem[] = [
  { name: 'Bedroom', src: '/images/bedroom.jpg', width: 358, height: 400 },
  { name: 'Living Room', src: '/images/living-room.png', width: 600, height: 400 },
  { name: 'Dining Room', src: '/images/dining-room.png', width: 358, height: 400 },
];

const galleryRow2: GalleryItem[] = [
  { name: 'Walk-in Closet', src: '/images/walk-in-closet.png', width: 358, height: 400 },
  { name: 'Bathroom', src: '/images/bathroom.png', width: 358, height: 400 },
  { name: 'Gallery Wall', src: '/images/gallery-wall.png', width: 600, height: 400 },
];

const allGalleryItems = [...galleryRow1, ...galleryRow2];

const InspirationGallery: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[58px] leading-tight">
            Inspiration to Elevate Your Living
          </h1>
          <p className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4">
            From cozy corners to luxury living, explore designs that match your taste.
          </p>
        </div>

        {/* --- DESKTOP LAYOUT (Original) --- */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-5">
          {[galleryRow1, galleryRow2].map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap items-center justify-center gap-5">
              {row.map((item, itemIndex) => (
                <div
                  key={`${rowIndex}-${itemIndex}`}
                  className="relative group overflow-hidden rounded-[20px]"
                  style={{ width: `${item.width}px`, height: `${item.height}px` }}
                >
                  <img
                    src={item.src}
                    alt={item.name || `Gallery image ${rowIndex * 3 + itemIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                  />
                  {item.name && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="text-white text-4xl font-playfair font-medium text-center drop-shadow-md">
                        {item.name}
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* --- MOBILE & TABLET LAYOUT (Responsive Grid) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
            {allGalleryItems.map((item, index) => (
                <div key={index} className="relative group overflow-hidden rounded-[20px] aspect-[4/3]">
                    <img
                        src={item.src}
                        alt={item.name || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                    />
                    {item.name && (
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h2 className="text-white text-2xl font-playfair font-medium text-center drop-shadow-md">
                                {item.name}
                            </h2>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationGallery;