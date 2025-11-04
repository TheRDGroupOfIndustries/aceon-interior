"use client";

import { IProduct } from "@/models/Product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsStarFill } from "react-icons/bs";

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const { data: session }: any = useSession();

  const redirectToCheckout = () => {
    console.log("session", session);
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    sessionStorage.setItem(
      "checkoutProduct",
      JSON.stringify({
        id: product._id,
        name: product?.name,
        current_price: product.pricing.current_price,
        original_price: product.pricing.original_price,
        main_image: product?.media.images[0]?.url,
      })
    );
    router.push(`/checkout/${product._id}`);
  };

  return (
    // Outer Card Container: Rounded corners, shadow, max-width
    <div className="bg-card rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
      {/* 1. Image and Save Badge */}
      <div className="relative">
        {/* Replace with your actual image component or Next.js Image component */}
        <div className="h-[250px] w-full overflow-hidden">
          <Image
            fill={true}
            className="w-full h-full object-cover "
            src={product.media.main_image} // Placeholder path
            alt={product.name}
          />
        </div>

        {/* Save Badge */}
        {/* {product.pricing.original_price > product.pricing.current_price && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            Save ₹
            {product.pricing.original_price - product.pricing.current_price}
          </div>
        )} */}
      </div>

      {/* 2. Product Details Section */}
      <div className="p-4 sm:p-5">
        {/* Category and Rating */}
        <div className="flex justify-between items-center mb-1">
          {/* Category Tag */}
          <span className="text-sm font-medium font-playfair text-[#A97C51] bg-primary/20 px-3 py-1 rounded-md">
            {product.category}
          </span>

          {/* Rating */}
          <div className="flex items-center text-primary">
            <BsStarFill className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold text-gray-700">
              {product.reviews.average_rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h2 className="text-xl font-bold font-playfair text-gray-900 mb-3 leading-snug line-clamp-1">
          {product.name[0].toLocaleUpperCase() + product.name.slice(1)}
        </h2>

        {/* Price and Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Price */}
          <div className="flex items-baseline mb-3 font-playfair">
            <span className="text-2xl font-bold text-[#A97C51] mr-2">
              ₹{product.pricing.current_price}
            </span>
            {product.pricing.original_price > product.pricing.current_price && (
              <span className="text-lg text-gray-400 line-through font-medium">
                ₹{product.pricing.original_price}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* View Details Button */}
            <Link
              href={`/products/${product._id}`}
              className="flex-1 border-2 border-[#A97C51] text-[#A97C51] font-semibold py-3 rounded-lg hover:bg-[#9c724a] hover:text-white transition-colors duration-200 cursor-pointer text-center font-playfair"
            >
              View Details
            </Link>

            {/* Buy Now Link */}
            <button
              onClick={redirectToCheckout}
              className="flex-1 bg-[#A97C51] border-2 border-[#A97C51] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#9c724a] transition-colors duration-200 cursor-pointer text-center font-playfair"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
