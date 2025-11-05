import {
  fetchAllOrdersByAdmin,
  updateOrderStatus,
  deleteOrder,
} from "@/redux/features/orderSlice";
import { RootState } from "@/redux/store";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Eye,
  X,
  Package,
  Trash2,
  Loader,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// --- Constants & Helper Functions ---

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const formatPrice = (price) =>
  `₹${
    price?.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) || "0"
  }`;

const getStatusClasses = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700 border-green-300";
    case "shipped":
      return "bg-blue-100 text-blue-700 border-blue-300";
    case "processing":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-300";
    case "pending":
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

// --- Sub-Components ---

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-100 py-2">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-gray-800 text-sm">{value}</span>
    </div>
  );

  const product = order.productId;
  const address = order.address;

  return (
    <div
      className="fixed inset-0 bg-gray-800/20 backdrop-blur-sm z-[99] flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-amber-800">
            Order Details: {order._id.substring(0, 8)}...
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Order Summary */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Summary</h3>
            <DetailRow label="Order ID" value={order._id} />
            <DetailRow
              label="Placed On"
              value={new Date(order.createdAt).toLocaleDateString()}
            />
            <DetailRow label="User Name" value={order.userId.name} />
            <DetailRow
              label="Total Amount"
              value={formatPrice(order.grandTotal)}
            />
            <DetailRow
              label="Payment Method"
              value={order.paymentMethod.toUpperCase()}
            />
            <DetailRow
              label="Status"
              value={
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusClasses(order.status)}`}
                >
                  {order.status}
                </span>
              }
            />
          </div>

          {/* Column 2: Product Details */}
          <div className="lg:col-span-2 space-y-4 border-l pl-8">
            <h3 className="text-xl font-semibold border-b pb-2">
              Product: {product.name}
            </h3>

            <div className="flex space-x-4">
              <Image
                width={64}
                height={64}
                src={(order.productId as any).media.main_image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover shadow-sm bg-gray-100"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/64x64/e0e0e0/505050?text=P";
                }}
              />
              <div className="flex-grow space-y-1">
                <DetailRow label="Product Name" value={product.name} />
                <DetailRow
                  label="Product Price"
                  value={formatPrice(product.pricing.current_price)}
                />
                <DetailRow label="Quantity" value={order.quantity} />
              </div>
            </div>

            <h4 className="text-lg font-semibold border-b pb-2 pt-4">
              Variants Ordered
            </h4>
            {order.variant
              ? order.variant === "Standard"
                ? "Standard"
                : Object.entries(order.variant).map(([type, value]) => (
                    <DetailRow key={type} label={type} value={value} />
                  ))
              : "N/A"}

            <h4 className="text-lg font-semibold border-b pb-2 pt-4">
              Shipping Address
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p>{address.fullName}</p>
              <p>{address.street}</p>
              <p>
                {address.city} - {address.postalCode}, {address.country}
              </p>
              <p>Phone: {address.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const OrderListing = () => {
  const { orders, total } = useSelector((state: RootState) => state.order);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);
  const dispatch = useDispatch();

  const ordersPerPage = 12;

  const handleStatusChange = async (orderId, newStatus) => {
    console.log(`Updating Order ${orderId} to status: ${newStatus}`);
    setUpdatingStatus(orderId);
    await dispatch(updateOrderStatus({ orderId, status: newStatus }) as any);
    setUpdatingStatus(null);
  };

  const handleDeleteOrder = async (orderId) => {
    setDeletingOrder(orderId);
    await dispatch(deleteOrder(orderId) as any);
    setDeletingOrder(null);
  };

  const totalPages = Math.ceil(total / ordersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(
        fetchAllOrdersByAdmin({ page: newPage, status: currentFilter }) as any
      );
    }
  };

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
    setCurrentPage(1);
    dispatch(
      fetchAllOrdersByAdmin({
        status: e.target.value,
        page: 1,
      }) as any
    );
  };

  useEffect(() => {
    dispatch(fetchAllOrdersByAdmin({}) as any);
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <select
            value={currentFilter}
            onChange={handleFilterChange}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white"
          >
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Order Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
              >
                {/* Header: Order ID and Status Badge */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Order #{order._id.substring(0, 8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase border ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Customer Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Customer Details
                  </h4>
                  <p className="text-base font-medium text-gray-900">
                    {(order.userId as any).name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(order.userId as any).email || "No email provided"}
                  </p>
                  {order.address?.phone && (
                    <p className="text-sm text-gray-600">
                      {order.address.phone}
                    </p>
                  )}
                </div>

                {/* Products Section */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    PRODUCTS
                  </h4>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <Image
                      width={60}
                      height={60}
                      className="h-14 w-14 rounded-lg object-cover bg-gray-200"
                      src={(order.productId as any).media.main_image}
                      alt={(order.productId as any).name}
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/60x60/e0e0e0/505050?text=P";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {(order.productId as any).name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {order.quantity}
                      </p>
                      {order.variant &&
                        order.variant !== "Standard" &&
                        Object.keys(order.variant).length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {Object.entries(order.variant).map(
                              ([key, value], idx) => (
                                <span key={key}>
                                  {key}: {value as string}
                                  {idx <
                                    Object.keys(order.variant).length - 1 &&
                                    " • "}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {/* {order.address && (
                  <div className="mb-4 pb-4 border-b">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.address.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.address.street}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.address.city} - {order.address.postalCode}
                    </p>
                  </div>
                )} */}

                {/* Total Amount */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-800">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-amber-800">
                      {formatPrice(order.grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={updatingStatus === order._id}
                    className={`flex-1 px-4 py-3 rounded-full text-sm font-semibold capitalize border-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${getStatusClasses(
                      order.status
                    )} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-white text-gray-900"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-3 bg-amber-800 text-white font-semibold rounded-full hover:bg-amber-900 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      disabled={deletingOrder === order._id}
                      className="px-4 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingOrder === order._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No orders found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md">
          <p className="text-sm text-gray-700">
            Showing {Math.min((currentPage - 1) * ordersPerPage + 1, total)} to{" "}
            {Math.min(currentPage * ordersPerPage, total)} of {total} orders
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg font-semibold">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderListing;
