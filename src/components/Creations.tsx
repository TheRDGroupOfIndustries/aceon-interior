// import React from 'react';

// interface CreationCardProps {
//   imageSrc: string;
//   title: string;
//   description: string;
// }

// const creationsData: CreationCardProps[] = [
//   {
//     imageSrc: '/images/creation1.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
//   {
//     imageSrc: '/images/creation2.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
//   {
//     imageSrc: '/images/creation3.png',
//     title: 'TITLE FOR THE CARD',
//     description:
//       'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
//   },
// ];

// const CreationCard: React.FC<CreationCardProps> = ({ imageSrc, title, description }) => {
//   return (
//     <article className="flex-1 min-w-0 max-w-[373px] shrink">
//       <div className="aspect-[373/311] overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
//         />
//       </div>
//       <div className="mt-6 text-left">
//         <h3 className="font-poppins font-semibold text-2xl md:text-[32px] text-gray-800 uppercase leading-tight h-16">
//           {title}
//         </h3>
//         <p className="font-poppins pt-7 text-gray-500 mt-2 text-base text-justify leading-relaxed">
//           {description}
//         </p>
//         <div className="mt-6 text-right">
//           <a
//             href="#"
//             className="font-poppins font-medium text-lg md:text-[20px] text-[#936a53] inline-block capitalize hover:text-[#7d5945] transition-colors"
//           >
//             Read More →
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// };

// const Creations: React.FC = () => {
//   return (
//     <section className="bg-white py-16 md:py-24 px-4">
//       <div className="container mx-auto text-center">
//         <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[68px] leading-tight">
//           Best of our creations
//         </h2>
//         <p className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4">
//           Comprehensive solutions tailored to your needs.
//         </p>

//         {/* 3 cards stay in one row, shrink proportionally on window resize */}
//         <div className="mt-16 flex justify-center gap-x-12 gap-y-10 flex-wrap">
//           {creationsData.map((creation, index) => (
//             <CreationCard
//               key={index}
//               imageSrc={creation.imageSrc}
//               title={creation.title}
//               description={creation.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Creations;


import React from 'react';

interface CreationCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const creationsData: CreationCardProps[] = [
  {
    imageSrc: '/images/creation1.png',
    title: 'TITLE FOR THE CARD',
    description:
      'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
  },
  {
    imageSrc: '/images/creation2.png',
    title: 'TITLE FOR THE CARD',
    description:
      'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
  },
  {
    imageSrc: '/images/creation3.png',
    title: 'TITLE FOR THE CARD',
    description:
      'Figma Ipsum Component Variant Main Layer. Opacity Slice Line Distribute Inspect Font. Scrolling Italic Move Move Inspect Connection.',
  },
];

const CreationCard: React.FC<CreationCardProps> = ({ imageSrc, title, description }) => {
  return (
    <article className="flex-1 min-w-0 max-w-[373px] shrink">
      <div className="aspect-[373/311] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="mt-6 text-left">
        <h3 className="font-poppins font-semibold text-2xl md:text-[32px] text-gray-800 uppercase leading-tight h-16">
          {title}
        </h3>
        <p className="font-poppins pt-7 text-gray-500 mt-2 text-base text-justify leading-relaxed">
          {description}
        </p>
        <div className="mt-6 text-right">
          <a
            href="#"
            className="font-poppins font-medium text-lg md:text-[20px] text-[#936a53] inline-block capitalize hover:text-[#7d5945] transition-colors"
          >
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
};

const Creations: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-playfair font-medium text-[#A97C51] text-4xl md:text-[68px] leading-tight">
          Best of our creations
        </h2>
        <p className="font-prata text-[#423F3F] text-lg md:text-[20px] mt-4">
          Comprehensive solutions tailored to your needs.
        </p>

        {/* Responsive 3 column grid on md, 2 column on sm, 1 column on mobile */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10 justify-center">
          {creationsData.map((creation, index) => (
            <CreationCard
              key={index}
              imageSrc={creation.imageSrc}
              title={creation.title}
              description={creation.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creations;
