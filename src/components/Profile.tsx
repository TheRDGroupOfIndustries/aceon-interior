"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// --- Mock Data (Updated to reflect Order Schema) ---

const MOCK_USER = {
  name: "Anya Sharma",
  email: "anya.sharma@example.com",
  phone: "+91 98765 43210",
  join_date: "2024-08-15",
  address: {
    street: "45 Whitefield Main Rd",
    city: "Bangalore",
    postalCode: "560066",
    country: "India",
  },
};

const INITIAL_MOCK_ORDERS = [
  {
    id: "ORD-98765",
    createdAt: "2025-10-20T10:00:00.000Z",
    status: "Delivered",
    grandTotal: 46500.0,
    product: {
      name: "Scandinavian Minimalist Bed Frame",
      price: 45000,
      image: "/path/to/bed.jpg",
    },
    quantity: 1,
    variant: "Queen / Teal Velvet",
    paymentMethod: "Cash on Delivery",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-12345",
    createdAt: "2025-09-01T15:30:00.000Z",
    status: "Processing",
    grandTotal: 1250.0,
    product: {
      name: "Modern White Desk Lamp",
      price: 500,
      image: "/path/to/lamp.jpg",
    },
    quantity: 2,
    variant: "White",
    paymentMethod: "Cash on Delivery",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-54321",
    createdAt: "2025-07-25T08:15:00.000Z",
    status: "Cancelled",
    grandTotal: 8999.0,
    product: {
      name: "Velvet Armchair",
      price: 8999,
      image: "/path/to/chair.jpg",
    },
    quantity: 1,
    variant: "Stone Gray",
    paymentMethod: "Credit Card",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-98765",
    createdAt: "2025-10-20T10:00:00.000Z",
    status: "Delivered",
    grandTotal: 46500.0,
    product: {
      name: "Scandinavian Minimalist Bed Frame",
      price: 45000,
      image: "/path/to/bed.jpg",
    },
    quantity: 1,
    variant: "Queen / Teal Velvet",
    paymentMethod: "Cash on Delivery",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-12345",
    createdAt: "2025-09-01T15:30:00.000Z",
    status: "Processing",
    grandTotal: 1250.0,
    product: {
      name: "Modern White Desk Lamp",
      price: 500,
      image: "/path/to/lamp.jpg",
    },
    quantity: 2,
    variant: "White",
    paymentMethod: "Cash on Delivery",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
  {
    id: "ORD-54321",
    createdAt: "2025-07-25T08:15:00.000Z",
    status: "Cancelled",
    grandTotal: 8999.0,
    product: {
      name: "Velvet Armchair",
      price: 8999,
      image: "/path/to/chair.jpg",
    },
    quantity: 1,
    variant: "Stone Gray",
    paymentMethod: "Credit Card",
    address: {
      fullName: "Anya Sharma",
      street: "45 Whitefield Main Rd",
      city: "Bangalore",
      postalCode: "560066",
      country: "India",
      phone: "+91 98765 43210",
    },
  },
];

// --- Inline SVG Icons ---

// User Icon
const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.61-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

// Bag Icon
const BagIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6v.75H5.513c-.96 0-1.76.671-1.925 1.638a1.69 1.69 0 00-.198.818.75.75 0 00.75.75H9v.75H4.14c-.958 0-1.758.674-1.926 1.643a1.69 1.69 0 00-.199.818.75.75 0 00.75.75H9v.75H1.673c-.76 0-1.428.472-1.666 1.154l-.226.666a.75.75 0 00.673.967h21.054a.75.75 0 00.673-.967l-.226-.666c-.238-.682-.906-1.154-1.666-1.154H15v-.75h4.86c.958 0 1.758-.674 1.926-1.643a1.69 1.69 0 00.199-.818.75.75 0 00-.75-.75H15v-.75h3.487c.96 0 1.76-.671 1.925-1.638a1.69 1.69 0 00.198-.818.75.75 0 00-.75-.75H15V6zM9 9h6v3H9V9z"
      clipRule="evenodd"
    />
  </svg>
);

// Minus Circle Icon
const MinusCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.75 10.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z"
      clipRule="evenodd"
    />
  </svg>
);

// Close Icon
const XMarkIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Modal Component for Order Details ---

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const formatPrice = (price) =>
    `₹${(price ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between border-b border-gray-100 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );

  const AddressBlock = ({ address }) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-2">
      <p className="font-semibold text-gray-800">{address.fullName}</p>
      <p className="text-gray-600">
        {address.street}, {address.city}
      </p>
      <p className="text-gray-600">
        {address.country} - {address.postalCode}
      </p>
      <p className="text-gray-600">Phone: {address.phone}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-gray-200/50 backdrop-blur-md z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold  font-playfair text-gray-900">
            Order #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold font-playfair mb-3">
              Product Ordered
            </h3>
            <div className="flex items-center space-x-4">
              {/* Placeholder for Product Image */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                {/* Ideally, use the actual product image URL */}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {order.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  Variant: {order.variant}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {order.quantity} @ {formatPrice(order.product.price)}{" "}
                  each
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="text-xl font-semibold font-playfair mb-3 border-b pb-1">
              Order Summary
            </h3>
            <DetailRow label="Order Date" value={formatDate(order.createdAt)} />
            <DetailRow label="Status" value={order.status} />
            <DetailRow label="Payment Method" value={order.paymentMethod} />
            <DetailRow
              label="Subtotal"
              value={formatPrice(order.product.price * order.quantity)}
            />
            <DetailRow label="Shipping" value={"FREE"} />
            <div className="flex justify-between border-t-2 border-primary font-playfair pt-3 mt-3">
              <span className="text-lg font-bold">Grand Total</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(order.grandTotal)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-xl font-semibold font-playfair mb-3 border-b pb-1">
              Shipping Address
            </h3>
            <AddressBlock address={order.address} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Profile Page Component ---

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState(INITIAL_MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for modal
  const router = useRouter();

  const formatPrice = (price) =>
    `₹${(price ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // --- Action Handler ---
  const handleCancelOrder = (orderId) => {
    // In a real app, this would be an API call (PATCH or DELETE)
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel order ${orderId}? This action cannot be undone.`
    );

    if (isConfirmed) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId && order.status === "Processing"
            ? { ...order, status: "Cancelled" }
            : order
        )
      );
      // In a real app: toast notification for success
      console.log(`Order ${orderId} successfully cancelled.`);
    }
  };

  // --- Tab Content Components ---

  const ProfileDetailsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-4 border-b pb-2">
        Account Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Full Name" value={MOCK_USER.name} />
        <InfoCard title="Email Address" value={MOCK_USER.email} />
        <InfoCard title="Phone Number" value={MOCK_USER.phone} />
        <InfoCard
          title="Member Since"
          value={formatDate(MOCK_USER.join_date)}
        />
      </div>

      {/* <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 pt-4">
        Primary Address
      </h2>
      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <p className="font-semibold text-gray-800">{MOCK_USER.name}</p>
        <p className="text-gray-600">{MOCK_USER.address.street}</p>
        <p className="text-gray-600">
          {MOCK_USER.address.city} - {MOCK_USER.address.postalCode}
        </p>
        <p className="text-gray-600">{MOCK_USER.address.country}</p>
      </div> */}

      <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors">
        Edit Profile
      </button>
    </div>
  );

  const OrderHistoryTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-4">
        Order History ({orders.length})
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-card p-5 rounded-xl  border border-gray-100 transition-shadow hover:shadow-md"
        >
          <div className="flex justify-between items-start border-b pb-3 mb-3">
            <div className="">
              <p className="text-xs font-medium text-gray-500">ORDER ID</p>
              <p className="text-lg font-bold font-playfair text-gray-900">
                {order.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500">DATE PLACED</p>
              <p className="text-gray-700">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Item and Total Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="mb-2 sm:mb-0">
              <p className="text-base font-semibold text-gray-800 font-playfair">
                {order.product.name} ({order.quantity} item
                {order.quantity > 1 ? "s" : ""})
              </p>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusClasses(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-primary">
              {formatPrice(order.grandTotal)}
            </p>
          </div>

          {/* --- Order Actions (Details and Cancel) --- */}
          <div className="pt-3 border-t flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedOrder(order)}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-primary text-primary hover:bg-amber-50 transition-colors"
            >
              View Details
            </button>

            {order.status === "Processing" && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 font-semibold rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
              >
                <MinusCircleIcon className="w-4 h-4" />
                <span>Cancel Order</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // --- Helper Components & Functions ---

  const InfoCard = ({ title, value }) => (
    <div className="bg-card p-4 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );

  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const TabButton = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`
                    flex items-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 w-full
                    ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-200"
                    }
                `}
      >
        <span className="w-5 h-5">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto  py-4 sticky bg-background top-0 z-10 h-14 flex items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center text-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer "
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Navigation (1/4 width) */}
          <div className="lg:w-1/4 sticky top-18 self-start bg-card p-6 rounded-xl">
            <h1 className="text-4xl font-extrabold font-playfair text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-gray-500 font-playfair mb-8">
              Manage your profile and track your purchases.
            </p>
            <div className=" space-y-2">
              <TabButton
                id="profile"
                label="Profile Details"
                icon={<UserIcon />}
              />
              <TabButton id="orders" label="Order History" icon={<BagIcon />} />
              {/* Add a placeholder Logout button */}
              <button className="w-full text-left py-3 px-6 text-red-600 font-semibold hover:bg-red-100 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area (3/4 width) */}
          <div className="lg:w-3/4 min-h-[600px]">
            {activeTab === "profile" && <ProfileDetailsTab />}
            {activeTab === "orders" && <OrderHistoryTab />}
          </div>
        </div>
      </div>

      {/* Order Details Modal Render */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Profile;
