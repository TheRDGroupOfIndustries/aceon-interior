import {
  fetchUserOrders,
  updateOrderStatus,
} from "@/redux/features/orderSlice";
import { RootState } from "@/redux/store";
import { ChevronLeftIcon, ChevronRightIcon, Eye, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
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
      return "bg-green-100 text-green-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "pending":
    default:
      return "bg-gray-100 text-gray-700";
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
                onError={(e) => {
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
            {Object.entries(order.variant).map(([type, value]) => (
              <DetailRow key={type} label={type} value={value} />
            ))}

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
  // const [orders, setOrders] = useState(INITIAL_MOCK_ORDER_DATA);
  const { orders, total } = useSelector((state: RootState) => state.order);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  const ordersPerPage = 10;

  // --- Mock Data Operations ---

  const handleStatusChange = async (orderId, newStatus) => {
    console.log(`Updating Order ${orderId} to status: ${newStatus}`);
    await dispatch(updateOrderStatus({ orderId, status: newStatus }) as any);
  };

  // --- Filtering & Pagination Logic ---

  // const filteredOrders = useMemo(() => {
  //   let list = orders;

  //   // 1. Filter by Status
  //   if (currentFilter !== "all") {
  //     list = list.filter((order) => order.status === currentFilter);
  //   }

  //   // 2. Search
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     list = list.filter(
  //       (order) =>
  //         order._id.toLowerCase().includes(query) ||
  //         order.userId.name.toLowerCase().includes(query) ||
  //         order.productId.name.toLowerCase().includes(query)
  //     );
  //   }
  //   return list;
  // }, [orders, currentFilter, searchQuery]);

  // 3. Pagination
  const totalPages = Math.ceil(total / ordersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(
        fetchUserOrders({ page: newPage, status: currentFilter }) as any
      );
    }
  };

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
    setCurrentPage(1);
    dispatch(
      fetchUserOrders({ status: e.target.value, page: currentPage }) as any
    );
  };

  const handleCancelOrder = (orderId) => {
    const confirmation = window.confirm(
      `Are you sure you want to cancel order ${orderId.substring(0, 8)}...?`
    );
    if (confirmation) {
      // Logic for canceling the order (updates status to 'cancelled')
      handleStatusChange(orderId, "cancelled");
      alert(
        `Order ${orderId.substring(0, 8)}... has been successfully cancelled (Mock Action).`
      );
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-6">
          Order Management
        </h1> */}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-6">
          {/* Status Filter */}
          <select
            value={currentFilter}
            onChange={handleFilterChange}
            className="w-full md:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Search Input */}
          {/* <input
            type="text"
            placeholder="Search by Order ID or User Name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500"
          /> */}
        </div>

        {/* Order Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-40">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    {/* Order ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-800">
                      {order._id.substring(0, 8)}...
                    </td>

                    {/* Product Name & Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded object-cover mr-3 bg-gray-100"
                          src={(order.productId as any).media.main_image}
                          alt={(order.productId as any).name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/40x40/e0e0e0/505050?text=P";
                          }}
                        />
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {(order.productId as any).name}
                        </div>
                      </div>
                    </td>

                    {/* User Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {(order.userId as any).name}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.quantity}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatPrice(order.grandTotal)}
                    </td>

                    {/* Order Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status Selector */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`w-full p-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 text-xs font-semibold capitalize ${getStatusClasses(
                          order.status
                        )}`}
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
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {/* {(order.status === "pending" ||
                          order.status === "processing") && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                            title="Cancel Order"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )} */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-700">
            Showing {Math.min((currentPage - 1) * ordersPerPage + 1, total)} to{" "}
            {Math.min(currentPage * ordersPerPage, total)} of {total} orders
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg font-semibold">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
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
