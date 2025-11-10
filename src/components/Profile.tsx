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
  Lock,
  Wrench,
  Heart,
  Users,
  X,
  LogOut,
  MessageCircle, // Added LogOut icon for the logout button
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EMIApplicationModal from "./EMIApplicationModal";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";
import { FaBucket } from "react-icons/fa6";
import { BsCash } from "react-icons/bs";

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
                {order.productId?.media?.main_image && (
                  <Image
                    fill={true}
                    src={order.productId.media.main_image}
                    alt={order.productId?.name || "Product image"}
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
                  <span className="text-xl font-extrabold text-[#A97C51]">
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [emiApplications, setEmiApplications] = useState([]);
  const [loadingEmi, setLoadingEmi] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session, update } = useSession();

  const fetchUserStats = async () => {
    try {
      const response = await fetch("/api/user/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Stats:", data);
        setUserStats(data);
      } else {
        const error = await response.json();
        console.error("Error fetching user stats:", error);
      }
      
    } catch (error) {
      console.error("Error fetching user stats:", error);
      
    }
  }

  // Fetch admin-level stats (total EMI applications) when user is admin
  const fetchAdminEmiCount = async () => {
    try {
      // Use the EMI listing endpoint to read the total count from pagination
      const res = await fetch('/api/emi?limit=1&page=1', { method: 'GET' });
      if (!res.ok) {
        console.error('Failed to fetch EMI list for admin:', await res.text());
        return 0;
      }
      const json = await res.json();
      // Try to read total from response structure
      const total = json?.data?.pagination?.total ?? json?.data?.filters?.status?.total ?? 0;
      return total;
    } catch (err) {
      console.error('Error fetching admin EMI count:', err);
      return 0;
    }
  }

  // Fetch user EMI applications
  const fetchUserEmiApplications = async () => {
    if (session?.user?.role === "admin") return; // Admins don't need user EMI applications
    
    console.log("Fetching EMI applications for user:", session?.user?.email);
    setLoadingEmi(true);
    try {
      const response = await fetch("/api/emi/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("EMI API response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("EMI API response data:", data);
        setEmiApplications(data.data?.applications || []);
        // Update user stats with EMI count
        setUserStats(prev => ({ 
          ...prev, 
          emiApplications: data.data?.applications?.length || 0 
        }));
      } else {
        console.error("Failed to fetch EMI applications:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching EMI applications:", error);
    } finally {
      setLoadingEmi(false);
    }
  };

  useEffect(() => {
    if (!session?.user) return router.push("/auth/signin");
    dispatch(fetchUserOrders({}) as any);
    (async () => {
      // fetch regular user stats first
      await fetchUserStats();

      // if admin, also fetch global EMI count and merge into state so UI shows total
      try {
        if (session?.user?.role === 'admin') {
          const adminEmiTotal = await fetchAdminEmiCount();
          setUserStats((prev) => ({ ...(prev ?? {}), emiApplications: adminEmiTotal }));
        } else {
          // For regular users, fetch their EMI applications
          await fetchUserEmiApplications();
        }
      } catch (e) {
        console.error('Error fetching admin stats:', e);
      }
    })();
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
    console.log(orderId);
    setCancelling(orderId);

    dispatch(cancelOrder({ orderId }) as any).unwrap();
    setCancelling(null);
  };

  const handleEditProfile = async (formData) => {
    setUpdatingProfile(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated successfully:", data);
        await update({
          ...session,
          user: {
            ...session.user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
        });
        setIsEditModalOpen(false);
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // --- Tab Content Components ---

  const ProfileDetailsTab = ({ data }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Center column: Account Overview + Quick Actions */}
      <div className="lg:col-span-2 space-y-6">
        {/* Account Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Account Overview
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {session?.user?.role === "admin" ? (
              <Link
                href="/admin?tab=ORDERS"
                aria-label="Go to admin orders"
              >
                <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <FaBucket className="w-6 h-6 text-[#A97C51] mb-2" />
                  <div className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800">
                    {userStats ? userStats.orders : 0}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Total Orders</div>
                </div>
              </Link>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center">
                <FaBucket className="w-6 h-6 text-[#A97C51] mb-2" />
                <div className="text-3xl md:text-4xl font-extrabold font-serif text-[#010100]">
                  {userStats ? userStats.orders : 0}
                </div>
                <div className="text-sm text-gray-500 mt-1">Total Orders</div>
              </div>
            )}

            {session?.user?.role === "admin" ? (
              <Link
                href="/admin?tab=CONTACT"
                className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-shadow"
                aria-label="Go to admin contact messages"
                title="Go to admin dashboard (Contact tab)"
              >
                <MessageCircle className="w-6 h-6 text-[#A97C51] mb-2" />
                <div className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800">
                  {userStats ? userStats.messages : 0}
                </div>
                <div className="text-sm text-gray-500 mt-1">Your Messages</div>
              </Link>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center">
                <MessageCircle className="w-6 h-6 text-[#A97C51] mb-2" />
                <div className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800">
                  {userStats && typeof userStats.messages === 'number' && userStats.messages > 0 ? userStats.messages : 0}
                </div>
                <div className="text-sm text-gray-500 mt-1">Your Messages</div>
              </div>
            )}

            <button
              onClick={() => setActiveTab("emi")}
              className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <BsCash className="w-6 h-6 text-[#A97C51] mb-2" />
              <div className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800">
                {userStats ? userStats.emiApplications ?? 0 : 0}
              </div>
              <div className="text-sm text-gray-500 mt-1">EMI Applications</div>
            </button>

            {/* <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center text-center">
              <Users className="w-6 h-6 text-[#A97C51] mb-2" />
              <div className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800">
                3
              </div>
              <div className="text-sm text-gray-500 mt-1">Consultations</div>
            </div> */}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/products"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
                🛒
              </div>
              <div className="text-left">
                <div className="font-semibold">Browse Products</div>
                <div className="text-sm text-gray-500">
                  Explore our latest furniture collection
                </div>
              </div>
            </Link>

            <Link
              href="https://calendly.com/prashantgoel1806/30min"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center text-green-600">
                📅
              </div>
              <div className="text-left">
                <div className="font-semibold">Book Consultation</div>
                <div className="text-sm text-gray-500">
                  Schedule a free interior design consultation
                </div>
              </div>
            </Link>

            <button
              onClick={() => setActiveTab("orders")}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-md bg-orange-50 flex items-center justify-center text-orange-600">
                🚚
              </div>
              <div className="text-left">
                <div className="font-semibold">Track Orders</div>
                <div className="text-sm text-gray-500">
                  Check the status of your recent orders
                </div>
              </div>
            </button>

            <Link
              href={"/portfolio"}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                🖼️
              </div>
              <div className="text-left">
                <div className="font-semibold">Design Gallery</div>
                <div className="text-sm text-gray-500">
                  View our portfolio of completed projects
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right column: Account Information */}
      <aside className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h3>

          <div className="space-y-3">
            <label className="block text-xs text-gray-500">USER ID</label>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 break-all">
              {session?.user?.id ?? session?.user?.sub ?? "-"}
            </div>

            <label className="block text-xs text-gray-500">FULL NAME</label>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {session?.user?.name ?? "-"}
            </div>

            <label className="block text-xs text-gray-500">EMAIL ADDRESS</label>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {session?.user?.email ?? "-"}
            </div>

            <label className="block text-xs text-gray-500">PHONE NUMBER</label>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {session?.user?.phone ?? "-"}
            </div>

            <label className="block text-xs text-gray-500">ADDRESS</label>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {session?.user?.address ?? "-"}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-2 rounded-md bg-[#A97C51] text-white font-semibold hover:bg-[#8B6238] transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </aside>
    </div>
  );

  const OrderHistoryTab = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-serif text-[#A97C51] mb-6">
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
              <p className="text-xl font-bold text-[#A97C51] font-serif">
                {(order.productId as any).name[0].toUpperCase() +
                  (order.productId as any).name.slice(1)}
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
            <p className="text-3xl font-extrabold text-[#A97C51]">
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

  // EMI Applications Tab Component
  const EmiApplicationsTab = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold font-serif text-gray-900">
            EMI Applications
          </h2>
          <button
            className="inline-flex items-center px-4 py-2 bg-[#A97C51] text-white font-semibold rounded-lg hover:bg-[#8B6B42] transition-colors ml-4"
            onClick={() => setShowEmiModal(true)}
          >
            Apply For EMI Options
          </button>
          {loadingEmi && <Loader2 className="w-6 h-6 animate-spin text-[#A97C51] ml-4" />}
        </div>
        {emiApplications.length === 0 ? (
          <div className="text-center py-12">
            <BsCash className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No EMI Applications Found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't applied for any EMI plans yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-[#A97C51] text-white font-semibold rounded-lg hover:bg-[#8B6B42] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {emiApplications.map((emi, index) => (
              <div
                key={emi._id || index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {emi.fullName || emi.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {emi.email} • {emi.phoneNumber || emi.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied on: {new Date(emi.createdAt || emi.submittedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    {emi.status || "UNDER_REVIEW"}
                  </span>
                </div>
                {/* Financial Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{(emi.totalAmount || 0).toLocaleString("en-IN")}
                    </p>
                    {emi.downPayment && (
                      <p className="text-xs text-gray-600">
                        Down Payment: ₹{emi.downPayment.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Monthly EMI
                    </p>
                    <p className="text-xl font-bold text-[#A97C51] flex items-center gap-2">
                      ₹{(emi.calculatedEMI || 0).toLocaleString("en-IN")}
                      <span className="text-xs text-gray-500 font-normal">approx</span>
                    </p>
                    {emi.emiTenure && (
                      <p className="text-xs text-gray-600">Tenure: {emi.emiTenure} months</p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Monthly Income
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{(emi.monthlyIncome || 0).toLocaleString("en-IN")}
                    </p>
                    {emi.employmentType && (
                      <p className="text-xs text-gray-600">{emi.employmentType}</p>
                    )}
                  </div>
                </div>
                {/* Additional Details */}
                {(emi.address || emi.panNumber || emi.aadharNumber) && (
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Additional Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {emi.address && (
                        <div>
                          <span className="font-medium text-gray-600">Address:</span>
                          <p className="text-gray-700">{emi.address}</p>
                        </div>
                      )}
                      {emi.panNumber && (
                        <div>
                          <span className="font-medium text-gray-600">PAN:</span>
                          <p className="text-gray-700">{emi.panNumber}</p>
                        </div>
                      )}
                      {emi.aadharNumber && (
                        <div>
                          <span className="font-medium text-gray-600">Aadhar:</span>
                          <p className="text-gray-700">{emi.aadharNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* EMI Modal */}
        {showEmiModal && (
          <EMIApplicationModal isOpen={showEmiModal} onClose={() => setShowEmiModal(false)} />
        )}
      </div>
    );
  };

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
                  "bg-[#A97C51] text-white shadow-lg "
                : "text-gray-700 hover:bg-amber-50 hover:text-[#A97C51]"
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
            <h1 className="text-4xl font-extrabold font-serif text-[#A97C51] mb-2">
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
              {session?.user?.role !== "admin" && (
                <TabButton
                  id="emi"
                  label="EMI Applications"
                  icon={<BsCash />}
                />
              )}
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
            {activeTab === "emi" && <EmiApplicationsTab />}
          </div>
        </div>
      </div>

      {/* Order Details Modal Render */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditProfile}
          initialData={{
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            phone: session?.user?.phone || "",
            address: session?.user?.address || "",
          }}
          updating={updatingProfile}
        />
      )}
    </div>
  );
};

export default Profile;
