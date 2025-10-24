import React from "react";

/**
 * Renders a skeleton screen loader for the Checkout Page.
 * This mimics the structure (2/3 + 1/3 grid) of the actual CheckoutPage.
 */
const CheckoutPageLoader = () => {
  // Base classes for skeleton elements
  const skeletonBase = "bg-gray-200 rounded-lg animate-pulse";

  const SkeletonBlock = ({ className = "h-4 w-full" }) => (
    <div className={`${skeletonBase} ${className}`}></div>
  );

  const ProductCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <SkeletonBlock className="h-6 w-1/3 mb-4 border-b pb-2" />{" "}
      {/* Section Title */}
      <div className="flex space-x-4">
        <SkeletonBlock className="w-20 h-20 rounded-lg" />{" "}
        {/* Image Placeholder */}
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-4 w-3/4" /> {/* Product Name */}
          <SkeletonBlock className="h-6 w-1/4" /> {/* Price */}
        </div>
        {/* Quantity Control Placeholder */}
        <SkeletonBlock className="w-24 h-10" />
      </div>
    </div>
  );

  const AddressFormSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <SkeletonBlock className="h-6 w-1/2 mb-4 border-b pb-2" />{" "}
      {/* Section Title */}
      <div className="space-y-4">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonBlock className="h-10 w-full" />
          <SkeletonBlock className="h-10 w-full" />
        </div>
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
    </div>
  );

  const PaymentSectionSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <SkeletonBlock className="h-6 w-1/3 mb-4 border-b pb-2" />{" "}
      {/* Section Title */}
      <div className="p-4 border border-gray-300 rounded-lg">
        <div className="flex items-center space-x-3">
          <SkeletonBlock className="w-6 h-6 rounded-full" /> {/* Icon */}
          <div className="flex-1 space-y-1">
            <SkeletonBlock className="h-4 w-1/2" /> {/* Title */}
            <SkeletonBlock className="h-3 w-3/4" /> {/* Description */}
          </div>
        </div>
      </div>
    </div>
  );

  const OrderSummarySkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-8">
      <SkeletonBlock className="h-8 w-2/3 mb-4 pb-2 border-b" />{" "}
      {/* Section Title */}
      <div className="space-y-4 text-gray-600">
        <div className="flex justify-between">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between border-b pb-4">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>

        {/* Grand Total */}
        <div className="flex justify-between pt-2 text-xl font-extrabold">
          <SkeletonBlock className="h-6 w-1/3" />
          <SkeletonBlock className="h-6 w-1/3" />
        </div>
      </div>
      <SkeletonBlock className="w-full h-14 mt-6" /> {/* Place Order Button */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Title Placeholder */}
        <SkeletonBlock className="h-10 w-1/3 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product, Address, Payment */}
          <div className="lg:col-span-2 space-y-8">
            <ProductCardSkeleton />
            <AddressFormSkeleton />
            <PaymentSectionSkeleton />
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <OrderSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageLoader;
