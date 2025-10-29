"use client";

import { cancelOrder, fetchUserOrders } from "@/redux/features/orderSlice";
import Image from "next/image";
import { RootState } from "@/redux/store";
import {
  ChevronLeftIcon,
  Loader2,
  MinusCircleIcon,
  ShoppingBag,
  UserIcon,
  X,
  LogOut, // Added LogOut icon for the logout button
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

// --- Modal Component for Order Details (Updated Styling) ---

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  // console.log(order);

  const formatPrice = (price) =>
    `₹${(price ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const DetailRow = ({ label, value }) => (
    // Updated border color and text style for a softer look
    <div className="flex justify-between border-b border-gray-200 py-3">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );

  const AddressBlock = ({ address }) => (
    // Updated background and border for a premium box
    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 shadow-inner mt-2">
      <p className="font-bold text-gray-800">{address.fullName}</p>
      <p className="text-gray-700">
        {address.street}, {address.city}
      </p>
      <p className="text-gray-700">
        {address.country} - {address.postalCode}
      </p>
      <p className="text-gray-700 font-medium">Phone: {address.phone}</p>
    </div>
  );

  return (
    <div
      // Softer backdrop
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        // Rounded corners and stronger shadow for the modal
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
          {/* Accent font for heading */}
          <h2 className="text-3xl font-bold font-serif text-gray-900">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Order ID and Date */}
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="text-sm font-medium text-gray-500">ORDER ID</p>
              <p className="text-xl font-bold text-gray-800 break-all">
                {order._id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">DATE PLACED</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Product Summary */}
          <div className="border border-gray-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold font-serif mb-4 text-gray-900">
              Product Ordered
            </h3>
            <div className="flex items-center space-x-5">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                {order.productId.media?.main_image && (
                  <Image
                    fill={true}
                    src={order.productId.media.main_image}
                    alt={order.productId.name}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-bold text-xl text-gray-900">
                  {order.productId.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {typeof order.variant === "object"
                    ? Object.entries(order.variant)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")
                    : order.variant}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Qty: <span className="font-semibold">{order.quantity}</span> @
                  <span className="font-semibold">
                    {formatPrice(
                      (order.productId as any).pricing?.current_price || 0
                    )}
                  </span>{" "}
                  each
                </p>
              </div>
            </div>
          </div>

          {/* Order Details & Shipping Address Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h3 className="text-xl font-bold font-serif mb-3 pb-2 border-b">
                Billing Summary
              </h3>
              <div className="space-y-1">
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
                {/* Grand Total Row - Highlighted */}
                <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                  <span className="text-xl font-bold font-serif">
                    Grand Total
                  </span>
                  {/* Applied the rich amber/gold color */}
                  <span className="text-xl font-extrabold text-amber-700">
                    {formatPrice(order.grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-xl font-bold font-serif mb-3 pb-2 border-b">
                Shipping Address
              </h3>
              <AddressBlock address={order.address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Profile Page Component (Updated Styling) ---

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
    dispatch(fetchUserOrders({}) as any);
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
    setCancelling(orderId);

    dispatch(cancelOrder({ orderId }) as any).unwrap();
    setCancelling(null);
  };

  // --- Tab Content Components ---

  const ProfileDetailsTab = ({ data }) => (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4 border-b pb-3">
        Account Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="User Id" value={data?.user.id} />
        <InfoCard title="Full Name" value={data?.user.name} />
        <InfoCard title="Email Address" value={data?.user.email} />
        {/* Removed placeholder phone card */}
      </div>

      {/* <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors">
        Edit Profile
      </button> */}
    </div>
  );

  const OrderHistoryTab = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">
        Order History ({orders.length})
      </h2>

      {orders.length === 0 && (
        <div className="p-10 text-center bg-white rounded-xl shadow-lg border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">
            No orders found.
          </p>
          <p className="text-gray-500 mt-2">
            Start shopping to see your purchase history here!
          </p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          // Updated card styling for a cleaner look, using a soft shadow
          className="bg-white p-6 rounded-xl border border-gray-200 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
            <div className="">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                ORDER ID
              </p>
              <p className="text-lg font-bold font-serif text-gray-900 break-all">
                {order._id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE PLACED
              </p>
              <p className="text-gray-700 font-semibold">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Item and Total Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="mb-3 sm:mb-0">
              <p className="text-xl font-bold text-gray-800 font-serif">
                {(order.productId as any).name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                ({order.quantity} item
                {order.quantity > 1 ? "s" : ""})
              </p>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full mt-2 inline-block ${getStatusClasses(order.status)}`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-amber-700">
              {formatPrice(order.grandTotal)}
            </p>
          </div>

          {/* --- Order Actions (Details and Cancel) --- */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3">
            {/* Styled "View Details" to match the image's "Contact Us" button (dark border, light fill) */}
            <button
              onClick={() => setSelectedOrder(order)}
              className="px-6 py-2 text-sm font-semibold rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition-colors"
            >
              View Details
            </button>

            {order.status !== "cancelled" &&
              order.status !== "shipped" &&
              order.status !== "delivered" && (
                // Styled "Cancel Order" to match the image's "Apply for EMI" button (rich color fill)
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={cancelling === order._id}
                  className="flex items-center space-x-2 px-6 py-2 text-sm text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-colors disabled:bg-red-300"
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
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-xl font-semibold text-gray-800 mt-1 font-serif">
        {value}
      </p>
    </div>
  );

  const getStatusClasses = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-600 text-white"; // Stronger contrast for delivered
      case "processing":
        return "bg-amber-100 text-amber-800"; // Using the new brand color
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
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
            flex items-center space-x-3 py-3 px-5 rounded-lg font-semibold transition-all duration-200 w-full text-left
            ${
              isActive
                ? // Used a rich, dark primary color for the active state
                  "bg-amber-700 text-white shadow-lg shadow-amber-200"
                : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
            }
          `}
      >
        <span className="w-5 h-5">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    // Set a subtle background color for the page body
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Navigation (1/4 width) - Styled for a prominent look */}
          <div className="lg:w-1/4 md:sticky md:top-20 self-start bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-4xl font-extrabold font-serif text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-gray-600 font-medium mb-10">
              Manage your profile and track purchases.
            </p>
            <div className="space-y-3">
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
              {/* Logout button styled to stand out */}
              <button
                onClick={() => signOut()}
                className="w-full text-left flex items-center space-x-3 py-3 px-5 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors mt-4 border-t pt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
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
