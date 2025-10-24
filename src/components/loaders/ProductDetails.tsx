import React from "react";

/**
 * Renders a skeleton screen loader for the Product Details Page.
 * This mimics the layout of the actual page to improve perceived loading time.
 */
const ProductDetailsLoader = () => {
  // Base classes for skeleton elements
  const skeletonBase = "bg-gray-200 rounded-lg animate-pulse";

  // Helper component for generic skeleton blocks
  const SkeletonBlock = ({ className = "h-4 w-full" }) => (
    <div className={`${skeletonBase} ${className}`}></div>
  );

  return (
    <div className="max-w-7xl mx-auto min-h-screen  p-4 sm:p-8">
      {/* Back Button Placeholder */}
      <SkeletonBlock className="h-4 w-32 mb-8" />

      {/* --- Main Product Section Skeleton --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery Skeleton */}
        <div className="lg:sticky lg:top-8 h-fit">
          {/* Main Image Placeholder */}
          <SkeletonBlock className="w-full aspect-square rounded-xl shadow-lg mb-4" />

          {/* Thumbnails Placeholder */}
          <div className="flex space-x-3 justify-center">
            <SkeletonBlock className="w-16 h-16" />
            <SkeletonBlock className="w-16 h-16" />
            <SkeletonBlock className="w-16 h-16" />
            <SkeletonBlock className="w-16 h-16" />
          </div>
        </div>

        {/* Right Column: Details & Actions Skeleton */}
        <div className="space-y-6">
          {/* Title Placeholder */}
          <SkeletonBlock className="h-8 w-3/4 mb-2" />
          <SkeletonBlock className="h-6 w-1/2" />

          {/* Price and Rating Placeholder */}
          <div className="flex items-center space-x-6 py-4 border-y border-gray-200">
            <SkeletonBlock className="h-8 w-24" /> {/* Current Price */}
            <SkeletonBlock className="h-6 w-16" /> {/* Original Price */}
            <SkeletonBlock className="h-5 w-20" /> {/* Rating Stars */}
          </div>

          {/* Variants Skeleton (Size and Color) */}
          <div className="space-y-4">
            {/* Variant 1 */}
            <div>
              <SkeletonBlock className="h-5 w-20 mb-2" />
              <div className="flex space-x-2">
                <SkeletonBlock className="h-10 w-20" />
                <SkeletonBlock className="h-10 w-20" />
                <SkeletonBlock className="h-10 w-20" />
              </div>
            </div>
            {/* Variant 2 */}
            <div>
              <SkeletonBlock className="h-5 w-20 mb-2" />
              <div className="flex space-x-2">
                <SkeletonBlock className="h-10 w-10 rounded-full" />
                <SkeletonBlock className="h-10 w-10 rounded-full" />
                <SkeletonBlock className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Action Buttons Placeholder */}
          <div className="flex space-x-4 pt-4">
            <SkeletonBlock className="h-14 flex-1" />
            <SkeletonBlock className="h-14 flex-1" />
          </div>

          {/* Features/Policies Placeholder */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-5 w-1/2" />
          </div>
        </div>
      </div>

      {/* --- Description and Specifications Skeleton --- */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <SkeletonBlock className="h-8 w-40 mb-6" /> {/* Section Title */}
        <div className="space-y-3 mb-10">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-11/12" />
          <SkeletonBlock className="h-4 w-10/12" />
        </div>
        {/* Specs Table Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonBlock className="h-20" />
          <SkeletonBlock className="h-20" />
          <SkeletonBlock className="h-20" />
        </div>
      </div>

      {/* --- Reviews Section Skeleton --- */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <SkeletonBlock className="h-8 w-40 mb-6" /> {/* Reviews Title */}
        {/* Review Summary */}
        <div className="flex items-center space-x-4 mb-8">
          <SkeletonBlock className="h-8 w-16" /> {/* Avg Rating Number */}
          <SkeletonBlock className="h-6 w-32" /> {/* Star Blocks */}
        </div>
        {/* Review Form Button Placeholder */}
        <SkeletonBlock className="h-12 w-48 mb-10" />
        {/* Individual Review Items Placeholder */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <SkeletonBlock className="h-4 w-3/4 mb-2" />
            <SkeletonBlock className="h-4 w-1/4 mb-4" />
            <SkeletonBlock className="h-5 w-20" />
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <SkeletonBlock className="h-4 w-2/3 mb-2" />
            <SkeletonBlock className="h-4 w-1/4 mb-4" />
            <SkeletonBlock className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
