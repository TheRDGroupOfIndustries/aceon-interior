"use client";

import { cancelOrder } from "@/redux/features/orderSlice";
import Image from "next/image";
import { RootState } from "@/redux/store";
import {
  ChevronLeftIcon,
  Loader2,
  MinusCircleIcon,
  ShoppingBag,
  UserIcon,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// --- Modal Component for Order Details ---

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  console.log(order);

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
            Order #{order._id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Summary */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold font-playfair mb-3">
              Product Ordered
            </h3>
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                {order.productId.media?.main_image && (
                  <Image
                    fill={true}
                    src={order.productId.media.main_image}
                    alt={order.productId.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {order.productId.name}
                </p>
                <p className="text-sm text-gray-500">
                  Variant:{" "}
                  {typeof order.variant === "object"
                    ? Object.entries(order.variant)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")
                    : order.variant}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {order.quantity} @
                  {formatPrice(
                    (order.productId as any).pricing?.current_price || 0
                  )}{" "}
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
              value={formatPrice(
                ((order.productId as any).pricing?.current_price || 0) *
                  order.quantity
              )}
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
  const { orders } = useSelector((state: RootState) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for modal
  const [cancelling, setCancelling] = useState<null | string>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return router.push("/login");
  }, [session]);

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
    if (cancelling === orderId) return;
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel order ${orderId}? This action cannot be undone.`
    );
    setCancelling(orderId);

    if (isConfirmed) {
      dispatch(cancelOrder({ orderId }) as any).unwrap();
      setCancelling(null);
    } else {
      setCancelling(null);
    }
  };

  // --- Tab Content Components ---

  const ProfileDetailsTab = ({ data }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-4 border-b pb-2">
        Account Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="User Id" value={data?.user.id} />
        <InfoCard title="Full Name" value={data?.user.name} />
        <InfoCard title="Email Address" value={data?.user.email} />
        <InfoCard title="Phone Number" value={data?.user.phone || "N/A"} />
      </div>

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
          key={order._id}
          className="bg-card p-5 rounded-xl  border border-gray-100 transition-shadow hover:shadow-md"
        >
          <div className="flex justify-between items-start border-b pb-3 mb-3">
            <div className="">
              <p className="text-xs font-medium text-gray-500">ORDER ID</p>
              <p className="text-lg font-bold font-playfair text-gray-900">
                {order._id}
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
                {(order.productId as any).name} ({order.quantity} item
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

            {order.status !== "cancelled" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                disabled={cancelling === order._id}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 font-semibold rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
              >
                {cancelling === order._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MinusCircleIcon className="w-4 h-4" />
                )}
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
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
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
      <div className="max-w-7xl mx-auto  p-4 sticky bg-background top-0 z-10 h-14 flex items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center text-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer "
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
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
              <TabButton
                id="orders"
                label="Order History"
                icon={<ShoppingBag />}
              />
              {/* Add a placeholder Logout button */}
              <button
                onClick={() => signOut()}
                className="w-full text-left py-3 px-6 text-red-600 font-semibold hover:bg-red-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area (3/4 width) */}
          <div className="lg:w-3/4 min-h-[600px]">
            {activeTab === "profile" && <ProfileDetailsTab data={session} />}
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
