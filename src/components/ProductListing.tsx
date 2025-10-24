"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, ChevronLeftIcon } from "lucide-react";
// import { fetchProducts } from "@/services/productServices";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/features/productSlice";
import { RootState } from "@/redux/store";

interface Product {
  _id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  subcategory: string;
  images: string[];
  description: {
    short_description: string;
    long_description: string;
  };
  stock: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function ProductListingPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState<PaginationData | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, error, pagination } = useSelector((state: RootState) => state.product);

  const router = useRouter();
  const dispatch = useDispatch()

  // Categories and subcategories (you can fetch these from your API)
  const categories = [
    { value: "storage", label: "Storage" },
    { value: "lighting", label: "Lighting" },
    { value: "living-room", label: "Living Room" },
    { value: "bedroom", label: "Bedroom" },
    { value: "kitchen", label: "Kitchen" },
    { value: "dining", label: "Dining" },
  ];

  const subcategories: { [key: string]: { value: string; label: string }[] } = {
    furniture: [
      { value: "sofa", label: "Sofas" },
      { value: "chair", label: "Chairs" },
      { value: "table", label: "Tables" },
    ],

    lighting: [
      { value: "pendant", label: "Pendant Lights" },
      { value: "floor", label: "Floor Lamps" },
      { value: "wall", label: "Wall Lights" },
    ],
  };

  const sortOptions = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  useEffect(() => {

    dispatch(
      fetchProducts({
        page: currentPage,
        category: selectedCategory,
        search: searchQuery,
        sortBy,
        sortOrder,
      }) as any
    )

    // fetchProducts({
    //   currentPage,
    //   searchQuery,
    //   selectedCategory,
    //   selectedSubcategory,
    //   sortBy,
    //   sortOrder,
    // }).then((data) => {
    //   if (data) {
    //     setProducts(data.data.products);
    //     setPagination(data.data.pagination);
    //   } else {
    //     setProducts([]);
    //     setPagination(null);
    //   }
    //   setLoading(false);
    // });
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-");
    setSortBy(field);
    setSortOrder(order);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen  ">
      {/* Top Bar */}
      <div className=" sticky bg-background top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center text-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer "
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary rounded-lg outline-primary text-primary"
              />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-background"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full appearance-none px-4 py-2 pr-10 border rounded-lg  outline-primary border-primary cursor-pointer text-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {(selectedCategory || selectedSubcategory || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubcategory("");
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setSelectedSubcategory("");
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700 ml-6"
                    >
                      Clear category
                    </button>
                  )}
                </div>
              </div>

              {/* Subcategory Filter */}
              {selectedCategory && subcategories[selectedCategory] && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Subcategory
                  </h3>
                  <div className="space-y-2">
                    {subcategories[selectedCategory].map((sub) => (
                      <label
                        key={sub.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="subcategory"
                          value={sub.value}
                          checked={selectedSubcategory === sub.value}
                          onChange={(e) => {
                            setSelectedSubcategory(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {sub.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Filters Summary */}
              {pagination && (
                <div className="pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    Showing {pagination.total}{" "}
                    {pagination.total === 1 ? "product" : "products"}
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="bg-gray-200 h-64"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    // <div
                    //   key={product._id}
                    //   className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                    // >
                    //   <div className="relative h-64 bg-gray-100 overflow-hidden">
                    //     {product.images?.[0] ? (
                    //       <img
                    //         src={product.images[0]}
                    //         alt={product.name}
                    //         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    //       />
                    //     ) : (
                    //       <div className="flex items-center justify-center h-full text-gray-400">
                    //         No image
                    //       </div>
                    //     )}
                    //     {product.stock === 0 && (
                    //       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    //         <span className="text-white font-semibold">
                    //           Out of Stock
                    //         </span>
                    //       </div>
                    //     )}
                    //   </div>
                    //   <div className="p-4">
                    //     <p className="text-xs text-gray-500 mb-1">
                    //       {product.category}
                    //     </p>
                    //     <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    //       {product.name}
                    //     </h3>
                    //     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    //       {product.description?.short_description}
                    //     </p>
                    //     <div className="flex items-center justify-between">
                    //       <span className="text-lg font-bold text-amber-600">
                    //         ₹{product.price?.toLocaleString()}
                    //       </span>
                    //       <span className="text-xs text-gray-500">
                    //         {product.sku}
                    //       </span>
                    //     </div>
                    //   </div>
                    // </div>
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={!pagination.hasPrev}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:"
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === pagination.totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-lg ${
                                page === currentPage
                                  ? "bg-amber-600 text-white"
                                  : "border border-gray-300 hover:"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span
                              key={page}
                              className="w-10 h-10 flex items-center justify-center"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={!pagination.hasNext}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
