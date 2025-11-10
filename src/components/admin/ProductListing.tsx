"use client";

import { IProduct } from "@/models/Product";
import { RootState } from "@/redux/store";
import {
  EyeIcon,
  Loader2,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteProduct, fetchProducts } from "@/redux/features/productSlice";
import ProductForm from "../ProductForm";

// --- Utility Functions ---

const formatPrice = (price) =>
  `₹${(price ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// --- Modals and Utility Components ---

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const DetailRow = ({ label, value, className = "" }) => (
    <div
      className={`flex justify-between border-b border-gray-100 py-2 ${className}`}
    >
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );

  // Helper function to render a detail if its value is truthy
  const renderDetail = (label, value, isPrice = false) => {
    if (value || value === false) {
      return (
        <DetailRow
          label={label}
          value={isPrice ? formatPrice(value) : value.toString()}
          className="border-none"
        />
      );
    }
    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800/20 backdrop-blur-md z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-amber-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Image & Pricing */}
          <div className="md:col-span-1 space-y-4">
            <Image
              height={400}
              width={400}
              src={product.media?.main_image || "/images/logo.png"}
              alt={product.name || "Product image"}
              className=" rounded-lg shadow-md object-cover bg-gray-100"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/images/logo.png";
              }}
            />
            {product?.media?.images && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {product.media.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img.url}
                    alt={img.alt}
                    width={200}
                    height={200}
                    className=""
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/200x200/e0e0e0/505050?text=No+Image";
                    }}
                  />
                ))}
              </div>
            )}
            <div className="text-lg font-bold">
              Price: {formatPrice(product.pricing?.current_price || 0)}
              {product.pricing?.is_on_sale && (
                <span className="ml-2 text-sm text-red-500 line-through font-normal">
                  {formatPrice(product.pricing?.original_price || 0)}
                </span>
              )}
            </div>
            {renderDetail("Delivery", product.stock?.estimated_delivery)}
            {renderDetail("Warranty", product.specifications?.warranty)}
          </div>

          {/* Column 2: Core Details & Description & Specifications*/}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">
              Core Information
            </h3>
            {renderDetail("SKU", product.sku)}
            {renderDetail(
              "Category",
              `${product.category} / ${product.subcategory || 'N/A'}`
            )}
            {renderDetail("Stock Qty", product.stock?.available_quantity || 0)}
            {renderDetail(
              "Avg. Rating",
              `${product.reviews?.average_rating || 0} (${product.reviews?.rating_count || 0} reviews)`
            )}

            <h3 className="text-xl font-semibold border-b pb-2 pt-4">
              Specifications
            </h3>
            {renderDetail("Size/Format", product.specifications.size)}
            {product.specifications.materials?.frame &&
              renderDetail(
                "Frame Material",
                product.specifications.materials.frame
              )}
            {product.specifications.materials?.support &&
              renderDetail(
                "Support Material",
                product.specifications.materials.support
              )}
            {product.specifications.dimensions_cm?.overall &&
              renderDetail(
                "Dimensions (cm)",
                product.specifications.dimensions_cm.overall
              )}
            {renderDetail(
              "Weight Capacity (kg)",
              product.specifications.weight_capacity_kg
            )}
            {renderDetail(
              "Assembly Required",
              product.specifications.assembly_required ? "Yes" : "No"
            )}
            {renderDetail(
              "Assembly Service",
              product.shipping_returns.assembly_service ? "Available" : "No"
            )}
          </div>

          {/* Column 3: Description & Variants */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Description</h3>
            <p className="text-gray-600 italic text-sm">
              {product.description?.tagline || "No tagline available."}
            </p>
            <p className="text-gray-700 text-sm">
              {product.description?.long_description ||
                "No detailed description provided."}
            </p>

            {product.description?.features?.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pt-2">
                {product.description.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}

            {product.variants?.length > 0 && (
              <>
                <h3 className="text-xl font-semibold border-b pb-2 pt-4">
                  Variants
                </h3>
                {product.variants.map((variant, vIndex) => (
                  <div
                    key={vIndex}
                    className="space-y-2 border p-3 rounded-lg bg-gray-50"
                  >
                    <p className="font-semibold text-gray-800">
                      {variant.type}
                    </p>
                    <div className="text-sm space-y-1">
                      {variant.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex justify-between">
                          <span className="text-gray-600">{option.value}</span>
                          <span
                            className={`font-medium ${option.price_adjust > 0 ? "text-green-600" : "text-gray-600"}`}
                          >
                            {option.price_adjust > 0
                              ? `+${formatPrice(option.price_adjust)}`
                              : option.price_adjust === 0
                                ? "Base Price"
                                : formatPrice(option.price_adjust)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductListing() {
  const { products, loading, pagination } = useSelector(
    (state: RootState) => state.product
  );
  const [categories, setCategories] = useState([])
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const dispatch = useDispatch();

  const fetchCategories = async ()=> {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setCategories(data.data);
      console.log(data)
      
    } catch (error) {
      console.log("Error Fetching Categories...", error)
      
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const allCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All Categories", ...Array.from(cats)];
  }, [products]);
  
  const [query, setQuery] = useState({
    page: 1,
    limit: 12,
    search: "",
    category: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [viewProduct, setViewProduct] = useState<IProduct | null>(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts(query) as any);
  }, [query]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value === "All Categories" ? "" : value,
      page: 1,
    }));
  };

  const handlePaginationChange = (newPage) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    await dispatch(deleteProduct(id) as any)
      .unwrap()
      .finally(() => {
        setDeleting(null);
      });
  };

  const renderProductCards = () => {
    if (loading) {
      return (
        <div className="col-span-full flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-800" />
          <span className="ml-3 text-gray-500">Loading products...</span>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full text-center py-20 text-gray-500">
          No products found matching your criteria.
        </div>
      );
    }

    return products.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
      >
        {/* Product Image Section */}
        <div className="relative h-64 bg-gray-100">
          <Image
            src={product.media?.main_image || "/images/logo.png"}
            alt={product.name || "Product image"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "/images/logo.png";
            }}
          />
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-amber-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {product.category}
          </span>
          {/* Status Badge */}
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow ${
              (product.stock?.available_quantity || 0) > 0
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {(product.stock?.available_quantity || 0) > 0 ? "In Stock" : "Out of Stock"}
          </span>
          {/* SKU Badge */}
          <span className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            SKU: {product.sku}
          </span>
        </div>

        {/* Product Details Section */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem] capitalize leading-tight">
            {product.name}
          </h3>

          {/* Price and Stock Row */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-amber-800">
                {formatPrice(product.pricing?.current_price || 0)}
              </span>
              {product.pricing?.is_on_sale && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.pricing?.original_price || 0)}
                </span>
              )}
            </div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                (product.stock?.available_quantity || 0) > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Stock: {product.stock?.available_quantity || 0}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium">
              {product.reviews?.average_rating?.toFixed(1) || "0.0"}
            </span>
            <span className="ml-1">
              ({product.reviews?.rating_count || 0} reviews)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => setViewProduct(product)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-200 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-300 transition-colors"
              title="View Details"
            >
              <EyeIcon className="w-4 h-4" />
              {/* View */}
            </button>
            <button
              onClick={() => setEditForm(product)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-200 text-amber-700 text-sm font-semibold rounded-lg hover:bg-amber-300 transition-colors"
              title="Edit Product"
            >
              <PencilIcon className="w-4 h-4" />
              {/* Edit */}
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-200 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-300 transition-colors disabled:opacity-50"
                  disabled={deleting === product._id}
                  title="Delete Product"
                >
                  {deleting === product._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <TrashIcon className="w-4 h-4" />
                      {/* Delete */}
                    </>
                  )}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="">
      {/* Header with Filter and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6">
        <select
          name="category"
          value={query.category}
          onChange={handleFilterChange}
          className="p-3 border bg-white border-gray-300 rounded-lg w-full sm:w-1/4 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value={""}>
            All 
          </option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setCreateForm(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {renderProductCards()}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md">
        <span className="text-sm text-gray-700">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} entries
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePaginationChange(pagination.page - 1)}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-semibold text-amber-800">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePaginationChange(pagination.page + 1)}
            disabled={!pagination.hasNext || loading}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />
      {createForm && <ProductForm onClose={() => setCreateForm(false)} />}
      {editForm && (
        <ProductForm onClose={() => setEditForm(false)} product={editForm} />
      )}
    </div>
  );
}
