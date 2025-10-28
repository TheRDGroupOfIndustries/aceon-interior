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
import { useMemo, useState } from "react";
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
import { deleteProduct } from "@/redux/features/productSlice";
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
        className="bg-white  shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto transform transition-all"
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
              src={product.media.main_image}
              alt={product.name}
              className=" rounded-lg shadow-md object-cover bg-gray-100"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x300/e0e0e0/505050?text=No+Image";
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
              Price: {formatPrice(product.pricing.current_price)}
              {product.pricing.is_on_sale && (
                <span className="ml-2 text-sm text-red-500 line-through font-normal">
                  {formatPrice(product.pricing.original_price)}
                </span>
              )}
            </div>
            {renderDetail("Delivery", product.stock.estimated_delivery)}
            {renderDetail("Warranty", product.specifications.warranty)}
          </div>

          {/* Column 2: Core Details & Description & Specifications*/}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">
              Core Information
            </h3>
            {renderDetail("SKU", product.sku)}
            {renderDetail(
              "Category",
              `${product.category} / ${product.subcategory}`
            )}
            {renderDetail("Stock Qty", product.stock.available_quantity)}
            {renderDetail(
              "Avg. Rating",
              `${product.reviews.average_rating || 0} (${product.reviews.rating_count || 0} reviews)`
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

export default function ProductListing({
  totalProducts,
}: {
  totalProducts: number;
}) {
  const { products, loading, pagination } = useSelector(
    (state: RootState) => state.product
  );
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const dispatch = useDispatch();

  const allCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All Categories", ...Array.from(cats)];
  }, [products]);

  const [query, setQuery] = useState({
    page: 1,
    limit: 5, // Keep limit low for demonstration
    search: "",
    category: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState<IProduct | null>(null);
  const [deleting, setDeleting] = useState(null);

  //  const { products, loading, pagination } = useProducts(query);

  // Handlers for UI changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value === "All Categories" ? "" : value,
      page: 1, // Reset to page 1 on filter change
    }));
  };

  const handleSearchChange = (e) => {
    // Debounce logic would go here in a real app
    setQuery((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handlePaginationChange = (newPage) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  // Simulated CRUD Actions
  const handleCreate = () => {
    // In a real app, open a creation form modal/page
    console.log("Action: Create new product triggered.");
    window.alert("Simulated: Navigating to Product Creation Form.");
  };

  const handleEdit = (product) => {
    // In a real app, open an editing form modal/page pre-filled with product data
    console.log(`Action: Edit product ${product.name}`);
    window.alert(`Simulated: Opening Edit Form for SKU: ${product.sku}`);
  };

  const handleDelete = async (id) => {
    // In a real app, this would be an API call (DELETE)
    console.log(`Action: Deleting product ${id}`);
    setDeleting(id);
    await dispatch(deleteProduct(id) as any)
      .unwrap()
      .finally(() => {
        setDeleting(null);
      });
  };

  // --- Render Content ---
  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="p-8 text-center text-gray-500">
            Loading products...
          </td>
        </tr>
      );
    }

    if (products.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="p-8 text-center text-gray-500">
            No products found matching your criteria.
          </td>
        </tr>
      );
    }

    return products.map((product) => (
      <tr key={product._id} className="hover:bg-gray-50 border-b">
        <td className="p-4 text-sm">
          <div className="h-[50px] w-[50px] bg-amber-400 rounded-sm overflow-hidden">
            <Image
              src={product.media.main_image}
              alt={product.name}
              width={50}
              height={50}
              className="rounded-sm object-cover h-full w-full "
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/50x50/e0e0e0/505050?text=No+Image";
              }}
            />
          </div>
        </td>
        <td className="p-4 text-sm font-medium text-gray-900 truncate max-w-[150px]">
          <span>{product.name}</span>
        </td>
        <td className="p-4 text-sm text-gray-600">{product.sku}</td>
        <td className="p-4 text-sm text-gray-600">{product.category}</td>
        <td className="p-4 text-sm font-semibold">
          {formatPrice(product.pricing.current_price)}
        </td>
        <td className="p-4 text-sm text-gray-600">
          {product.stock.available_quantity}
        </td>
        <td className="p-4 text-sm text-gray-600">
          {product.reviews.average_rating.toFixed(1) || 0} (
          {product.reviews.rating_count || 0})
        </td>
        <td className="p-4 text-sm">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewProduct(product)}
              className="text-amber-600 hover:text-amber-800 p-1 rounded-md transition-colors"
              title="View Details"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setEditForm(product)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-colors"
              title="Edit Product"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            {/* <button
              onClick={() => handleDelete(product)}
              className="text-red-600 hover:text-red-800 p-1 rounded-md transition-colors"
              title="Delete Product"
            >
              <TrashIcon className="w-5 h-5" />
            </button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <button
                type=""
                  className="text-red-600 hover:text-red-800 p-1 rounded-md transition-colors"
                  title="Delete Product"
                >
                </button> */}
                {deleting === product._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <TrashIcon className="w-5 h-5" />
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product from the database. Are you absolutely sure?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(product._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="">
      {/* Product Listing Title and Actions */}
      <div className="flex justify-between items-center mb-6">
        <select
          name="category"
          value={query.category}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/4 focus:ring-amber-500 focus:border-amber-500"
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat === "All Categories" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={() => setCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* <input
          type="text"
          name="search"
          placeholder="Search by name or SKU..."
          value={query.search}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/3 focus:ring-amber-500 focus:border-amber-500"
        /> */}
        {/* <select
          name="category"
          value={query.category}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/4 focus:ring-amber-500 focus:border-amber-500"
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat === "All Categories" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select> */}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderTableContent()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-md">
        <span className="text-sm text-gray-700">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} entries
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePaginationChange(pagination.page - 1)}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-semibold text-amber-800">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePaginationChange(pagination.page + 1)}
            disabled={!pagination.hasNext || loading}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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
