"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

// --- Inline SVG Icon Components (Replaced react-icons) ---

const StarFillIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CartPlusIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17 18c-1.11 0-2 .9-2 2s.89 2 2 2 2-.9 2-2-.89-2-2-2M1 2v2h2.2l3.12 7.15L5.7 14h12.5L15.3 11h-8.7L6.8 9.5H19c.8 0 1.5-.5 1.8-1.2L22 5.5V5c0-.6-.4-1-1-1H5.4l-.8-2H1zm16 16c-1.11 0-2 .9-2 2s.89 2 2 2 2-.9 2-2-.89-2-2-2zM21 9h-2V7h-2V9h-2v2h2v2h2v-2h2z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const ChevronLeftIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldCheckmarkIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

const ClockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// --- Static Product Data (Loaded from API in a real app) ---
const PRODUCT_DATA = {
  sku: "SCND-BFRM-QN-01",
  name: "Scandinavian Minimalist Bed Frame",
  category: "Bedroom",
  subcategory: "Bed Frames",
  pricing: {
    current_price: 45000.0,
    original_price: 55000.0,
    currency: "INR",
    discount: 10000.0,
    discount_percent: 18.18,
    is_on_sale: true,
  },
  stock: {
    available_quantity: 42,
    estimated_delivery: "5-7 business days",
  },
  description: {
    tagline: "A serene sanctuary with plush upholstery and clean lines.",
    long_description:
      "Our signature bed frame combines the tranquility of Nordic design with luxurious comfort. Features a low-profile silhouette, sturdy wooden legs, and a rich velvet headboard. The integrated wood slat system offers superior mattress support without the need for a box spring. Perfect for achieving a light, airy, and functional bedroom aesthetic.",
    features: [
      "Plush velvet upholstered headboard",
      "Solid Pine and engineered wood construction",
      "Integrated slat support (Box spring not required)",
      "350 kg weight capacity",
      "Easy, tool-free assembly (15 mins)",
    ],
  },
  media: {
    main_image: "/images/bed_frame_main.jpg",
    images: [
      {
        url: "https://placehold.co/800x600/008080/FFFFFF?text=Teal+Bed+View+1",
        alt: "Main Teal Bed Frame",
      },
      {
        url: "https://placehold.co/800x600/A9A9A9/FFFFFF?text=Stone+Gray+Bed",
        alt: "Stone Gray Variant View",
      },
      {
        url: "https://placehold.co/800x600/556B2F/FFFFFF?text=Wood+Detail",
        alt: "Close-up of wooden legs",
      },
      {
        url: "https://placehold.co/800x600/D3D3D3/000000?text=Room+Setting",
        alt: "Bed Frame in a full room setting",
      },
    ],
    video_url: "https://vimeo.com/bed-assembly-guide",
  },
  specifications: {
    size: "Queen",
    materials: {
      frame: "Solid Knot-Free Pine Wood",
      support: "Wood Slats",
    },
    dimensions_cm: {
      overall: "215 L x 160 W x 120 H",
      clearance_under_bed: "15 H",
    },
    weight_capacity_kg: 350,
    assembly_required: true,
    warranty: "3-Year Limited Warranty",
  },
  variants: [
    {
      type: "Size",
      options: [
        { value: "King", sku: "SCND-BFRM-KG-01", price_adjust: 7000.0 },
        { value: "Queen", sku: "SCND-BFRM-QN-01", price_adjust: 0.0 },
      ],
    },
    {
      type: "Color",
      options: [
        { value: "Teal Velvet", sku_suffix: "UT", hex_code: "#008080" },
        { value: "Stone Gray", sku_suffix: "SG", hex_code: "#A9A9A9" },
      ],
    },
  ],
  reviews: {
    average_rating: 4.8,
    rating_count: 156,
    review_list: [
      {
        user: "Priya S.",
        rating: 5,
        date: "2025-10-15",
        title: "Stunning and Sturdy",
        comment:
          "The teal velvet is gorgeous and the frame feels incredibly solid. Took less than 20 minutes to put together!",
      },
      {
        user: "Rahul K.",
        rating: 4,
        date: "2025-09-28",
        title: "High Quality",
        comment:
          "Excellent quality for the price. Only complaint is the delivery was delayed by a day. Highly recommend the Queen size.",
      },
    ],
  },
  shipping_returns: {
    shipping_policy: "Free standard shipping.",
    return_policy: "30-Day Hassle-Free Returns.",
    assembly_service: true,
  },
};

// --- Component ---
const ProductDetailsPage = ({ productId }: { productId: string }) => {
  const { products } = useSelector((state: RootState) => state.product);

  const [product, setProduct] = useState(
    products.find((p) => p._id === productId) || PRODUCT_DATA
  );

  const [selectedSize, setSelectedSize] = useState(
    product.variants.find((v) => v.type === "Size")?.options[1].value || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.variants.find((v) => v.type === "Color")?.options[0].value || ""
  );
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const router = useRouter();

  // --- Review Form State ---
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewData, setNewReviewData] = useState({
    user: "",
    rating: 0,
    title: "",
    comment: "",
  });

  // --- Review Form Handlers ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const { user, rating, comment } = newReviewData;

    if (!user || rating === 0 || !comment.trim()) {
      // In a real app, display an error message to the user instead of logging.
      console.error("Please provide your name, a rating, and a comment.");
      return;
    }

    const newReview = {
      ...newReviewData,
      date: new Date().toISOString().split("T")[0], // Simple YYYY-MM-DD date format
      rating: newReviewData.rating,
    };

    // --- Simulation of API Update ---
    const updatedReviews = [...product.reviews.review_list, newReview];
    const newRatingCount = updatedReviews.length;
    const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAverageRating = (totalRatingSum / newRatingCount).toFixed(1);

    // setProduct((prevProduct) => ({
    //   ...prevProduct,
    //   reviews: {
    //     ...prevProduct.reviews,
    //     review_list: updatedReviews,
    //     rating_count: newRatingCount,
    //     average_rating: parseFloat(newAverageRating),
    //   },
    // }));

    // Reset form and close it
    setNewReviewData({ user: "", rating: 0, title: "", comment: "" });
    setShowReviewForm(false);
  };

  // --- Derived State (Current Price Calculation) ---
  const calculatedPrice = useMemo(() => {
    const sizeVariant = product.variants
      .find((v) => v.type === "Size")
      ?.options.find((o) => o.value === selectedSize);
    const colorVariant = product.variants
      .find((v) => v.type === "Color")
      ?.options.find((o) => o.value === selectedColor);

    let price = product.pricing.current_price;
    price += sizeVariant?.price_adjust || 0;
    // You could also add color price adjustments here if defined

    return price;
  }, [
    selectedSize,
    selectedColor,
    product.pricing.current_price,
    product.variants,
  ]);

  // --- Image Slider Functions ---
  const totalImages = product.media.images.length;
  const nextImage = () => setMainImageIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () =>
    setMainImageIndex((prev) => (prev - 1 + totalImages) % totalImages);

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  const ratingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarFillIcon
          key={i}
          className={`w-4 h-4 transition-colors ${i < Math.floor(rating) ? "text-primary" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-6 transition-colors cursor-pointer"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
      </button>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Back Link */}

        {/* --- Product Hero Section (Image & Details) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 ">
          {/* LEFT COLUMN: Image Slider */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              {/* Main Image */}
              <img
                src={product.media.images[mainImageIndex]?.url}
                alt={product.media.images[mainImageIndex]?.alt}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Slider Controls */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
              </button>

              {/* Sale Badge */}
              {product.pricing.is_on_sale && (
                <div className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                  SALE {product.pricing.discount_percent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex space-x-3 mt-4 overflow-x-auto justify-center">
              {product.media.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.alt}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all border-2 ${
                    index === mainImageIndex
                      ? "border-primary shadow-md"
                      : "border-gray-200 hover:border-amber-400"
                  }`}
                  onClick={() => setMainImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details and Actions */}
          <div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair text-gray-900 mt-2 mb-4 leading-tight">
              {product.name} ({selectedColor})
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex mr-2">
                {ratingStars(product.reviews.average_rating)}
              </div>
              <span className="text-lg font-semibold text-gray-800 mr-2">
                {product.reviews.average_rating}
              </span>
              <span className="text-sm text-gray-500">
                ({product.reviews.rating_count} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-primary ">
                {formatPrice(calculatedPrice)}
              </p>
              {product.pricing.is_on_sale && (
                <p className="mt-1 text-xl text-gray-400 line-through font-medium">
                  {formatPrice(product.pricing.original_price)}
                </p>
              )}
              <span className="text-sm font-semibold text-green-600 mt-2 block">
                You save {formatPrice(product.pricing.discount)}!
              </span>
            </div>

            {/* Variants */}
            <div className="space-y-6 mb-8">
              {product.variants.map((variantGroup, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    {variantGroup.type}:{" "}
                    {variantGroup.type === "Color"
                      ? selectedColor
                      : selectedSize}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {variantGroup.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => {
                          if (variantGroup.type === "Size") {
                            setSelectedSize(option.value);
                          } else {
                            setSelectedColor(option.value);
                          }
                        }}
                        className={`
                          p-3 border-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            (variantGroup.type === "Size" &&
                              option.value === selectedSize) ||
                            (variantGroup.type === "Color" &&
                              option.value === selectedColor)
                              ? "border-primary text-primary ring-2 ring-primary shadow-md"
                              : "border-gray-300 text-gray-700 hover:border-gray-500"
                          }
                        `}
                      >
                        {variantGroup.type === "Color" && option.hex_code ? (
                          <div className="flex items-center">
                            <span
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: option.hex_code }}
                            ></span>
                            {option.value}
                          </div>
                        ) : (
                          <span>{option.value}</span>
                        )}
                        {option.price_adjust > 0 &&
                          variantGroup.type === "Size" && (
                            <span className="ml-2 text-xs text-gray-500">
                              (+{formatPrice(option.price_adjust)})
                            </span>
                          )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Link
                href={`/checkout/${productId}`}
                className="flex-1 flex items-center justify-center bg-primary text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:bg-amber-900 cursor-pointer transition-all duration-300"
              >
                <CartPlusIcon className="w-5 h-5 mr-2" /> Buy Now
              </Link>
              {/* <button className="flex-1 flex items-center justify-center bg-white text-primary border-2 border-primary text-lg font-semibold py-4 rounded-xl shadow-lg hover:bg-amber-50 transition-all duration-300">
                Buy Now
              </button> */}
            </div>

            {/* Shipping & Warranty */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <ShieldCheckmarkIcon className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Warranty:</span>{" "}
                  {product.specifications.warranty}
                </p>
              </div>
              <div className="flex items-start">
                <ClockIcon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Delivery:</span>{" "}
                  {product.shipping_returns.shipping_policy} (
                  {product.stock.estimated_delivery})
                </p>
              </div>
              {product.shipping_returns.assembly_service && (
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">
                    <span className="font-semibold">Assembly Included:</span>{" "}
                    Complimentary professional assembly service is provided.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Product Description, Features, and Specs --- */}
        <div className="mt-32 ">
          <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-6 border-b pb-2">
            Product Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1: Long Description */}
            <div className="md:col-span-2">
              <p className="text-xl font-semibold text-gray-700 mb-4 font-playfair">
                {product.description.tagline}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description.long_description}
              </p>
            </div>

            {/* Column 2: Key Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 font-playfair">
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.description.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <CheckIcon className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">
              Detailed Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-gray-600">
              <SpecItem
                title="Overall Dimensions"
                value={product.specifications.dimensions_cm.overall}
                unit="cm"
              />
              <SpecItem
                title="Material (Frame)"
                value={product.specifications.materials.frame}
              />
              <SpecItem
                title="Weight Capacity"
                value={product.specifications.weight_capacity_kg}
                unit="kg"
              />
              <SpecItem
                title="Headboard Height"
                value={product.specifications.dimensions_cm.headboard_height}
                unit="cm"
              />
              <SpecItem
                title="Mattress Support"
                value={product.specifications.materials.support}
              />
              <SpecItem
                title="Assembly Required"
                value={product.specifications.assembly_required ? "Yes" : "No"}
              />
            </div>
          </div>
        </div>

        {/* --- Customer Reviews Section --- */}
        <div className="mt-32 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 font-playfair">
            Customer Reviews ({product.reviews.rating_count})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold text-primary">
                    {product.reviews.average_rating}
                  </span>
                  <span className="text-xl text-gray-600 ml-2">/ 5.0</span>
                </div>
                <div className="flex mt-2 sm:mt-0">
                  <div className="flex mr-4">
                    {ratingStars(product.reviews.average_rating)}
                  </div>
                </div>
              </div>

              {/* Individual Reviews List */}
              <div className="space-y-8">
                {product.reviews.review_list.length > 0 ? (
                  product.reviews.review_list.map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex mr-3">
                          {ratingStars(review.rating)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {review.title}
                        </span>
                      </div>
                      <p className="text-gray-600 italic mb-3">
                        "{review.comment}"
                      </p>
                      <div className="text-xs text-gray-400">
                        Reviewed by{" "}
                        <span className="font-medium text-gray-500">
                          {review.user}
                        </span>{" "}
                        on {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border-b border-gray-100 pb-6 last:border-b-0 min-h-40 flex items-center justify-center">
                    <p className="text-gray-600 italic mb-3 text-center">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <form
              onSubmit={handleReviewSubmit}
              className=" p-6 border border-gray-200 rounded-xl space-y-4"
            >
              <h3 className="text-xl font-semibold font-playfair text-gray-800 mb-3">
                Submit Your Review
              </h3>

              {/* Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-1">
                  {/* Interactive Star Rating */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarFillIcon
                      key={star}
                      className={`w-6 h-6 transition-colors ${
                        star <= newReviewData.rating
                          ? "text-primary"
                          : "text-gray-300"
                      } cursor-pointer hover:text-primary`}
                      onClick={() =>
                        setNewReviewData((prev) => ({ ...prev, rating: star }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  required
                  value={newReviewData.user}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-primary outline-primary text-black rounded-lg "
                  placeholder="e.g., Jane D."
                />
              </div>

              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Review Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newReviewData.title}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-primary outline-primary text-black rounded-lg "
                  placeholder="e.g., Stunning design and quality"
                />
              </div>

              {/* Comment Input */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  required
                  value={newReviewData.comment}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-primary outline-primary text-black rounded-lg resize-none "
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover cursor-pointer transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Specifications
const SpecItem = ({ title, value, unit = "" }) => (
  <div className="flex justify-between border-b border-gray-100 pb-1">
    <span className="font-medium text-gray-800">{title}</span>
    <span className="text-gray-600">
      {value} {unit}
    </span>
  </div>
);

export default ProductDetailsPage;
