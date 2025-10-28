"use client";

import CategoryListing from "@/components/admin/CategoryListing";
import OrderListing from "@/components/admin/OrderListing";
import ProductListing from "@/components/admin/ProductListing";
import {
  fetchAllOrdersByAdmin,
  fetchUserOrders,
} from "@/redux/features/orderSlice";
import { fetchProducts } from "@/redux/features/productSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";

interface EMIApplication {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  interiorPackage: string;
  totalAmount: number;
  downPayment: number;
  emiTenure: number;
  calculatedEMI: number;
  monthlyIncome: number;
  employmentType: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  createdAt: string;
  bankDetails?: string;
  adminNotes?: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  number?: string;
  address?: string;
  description: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "emi" | "contact" | "products" | "order" | "category"
  >("emi");
  const [emiApplications, setEmiApplications] = useState<EMIApplication[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [emiPage, setEmiPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [emiTotal, setEmiTotal] = useState(0);
  const [contactTotal, setContactTotal] = useState(0);
  const [emiFilter, setEmiFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmiApp: 0,
    totalMessages: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCategory: 0,
  });
  const [statusStats, setStfirsttats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    under_review: 0,
    total: 0,
  });

  const { data: session } = useSession();

  const [selectedApp, setSelectedApp] = useState<EMIApplication | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] =
    useState<EMIApplication["status"]>("pending");
  const [updateAdminNotes, setUpdateAdminNotes] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const limit = 10;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchEMIApplications = useCallback(async () => {
    setLoading(true);
    try {
      const statusParam = emiFilter !== "all" ? `&status=${emiFilter}` : "";
      const response = await fetch(
        `/api/emi?page=${emiPage}&limit=${limit}${statusParam}`
      );
      const data = await response.json();
      if (data.success) {
        setEmiApplications(data.data.applications);
        // setEmiTotal(data.data.pagination.total);
        // setStatusStats(data.data.filters.status);
      }
    } catch (error) {
      console.error("Error fetching EMI applications:", error);
    } finally {
      setLoading(false);
    }
  }, [emiPage, emiFilter, limit]);

  useEffect(() => {
    if (activeTab === "emi") fetchEMIApplications();
  }, [fetchEMIApplications, activeTab]);

  const fetchContactMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/contact?page=${contactPage}&limit=${limit}`
      );
      const data = await response.json();
      setContactMessages(data.messages);
      setContactTotal(data.pagination.total);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  }, [contactPage, limit]);

  useEffect(() => {
    if (activeTab === "contact") fetchContactMessages();
  }, [fetchContactMessages, activeTab]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setIsUpdating(true);
    setNotification(null);
    try {
      const response = await fetch("/api/emi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: selectedApp._id,
          status: updateStatus,
          adminNotes: updateAdminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNotification({
          message: "Application updated successfully!",
          type: "success",
        });
        setSelectedApp(null);
        fetchEMIApplications();
      } else {
        throw new Error(data.error || "Failed to update application");
      }
    } catch (error) {
      setNotification({ message: (error as Error).message, type: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const filterButtons = [
    { key: "all", label: "All", count: statusStats.total },
    { key: "pending", label: "Pending", count: statusStats.pending },
    {
      key: "under_review",
      label: "Under Review",
      count: statusStats.under_review,
    },
    { key: "approved", label: "Approved", count: statusStats.approved },
    { key: "rejected", label: "Rejected", count: statusStats.rejected },
  ];

  const dispatch = useDispatch();

  const getLengths = async () => {
    try {
      const res = await fetch("/api/stats", {
        method: "GET",
      });
      const data = await res.json();
      console.log("getLengths", data.data);
      setStats(data.data);
    } catch (error) {
      console.error("Error fetching lengths:", error);
    }
  };

  useEffect(() => {
    if (session) {
      getLengths();
      dispatch(fetchProducts({}) as any);
      dispatch(fetchAllOrdersByAdmin({}) as any);
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto border-b flex items-center justify-between p-4">
        <div className="px-4 sm:px-6 py-8 gap-3">
          <h1
            className="text-2xl sm:text-4xl font-serif mb-1 sm:mb-2"
            style={{ color: "#A97C51" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage inquiries and applications
          </p>
        </div>
        {/* <button
          onClick={() => signOut()}
          className=" py-3 px-6 text-red-600 font-semibold hover:bg-red-100 rounded-lg transition-colors"
        >
          Logout
        </button> */}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex gap-1 border-b mb-8">
          <button
            onClick={() => setActiveTab("emi")}
            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "emi" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            EMI Applications ({stats.totalEmiApp})
            {activeTab === "emi" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#A97C51" }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "contact" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Contact Messages ({stats.totalMessages})
            {activeTab === "contact" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#A97C51" }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "contact" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Products ({stats.totalProducts})
            {activeTab === "products" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#A97C51" }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "contact" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Orders ({stats.totalOrders})
            {activeTab === "order" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#A97C51" }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("category")}
            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === "contact" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Category ({stats.totalCategory})
            {activeTab === "category" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#A97C51" }}
              />
            )}
          </button>
        </div>

        {activeTab === "emi" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {filterButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => {
                    setEmiFilter(btn.key);
                    setEmiPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emiFilter === btn.key ? "text-white shadow-sm" : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"}`}
                  style={
                    emiFilter === btn.key ? { backgroundColor: "#A97C51" } : {}
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div
                    className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: "#A97C51",
                      borderTopColor: "transparent",
                      borderWidth: "3px",
                    }}
                  />
                </div>
              ) : emiApplications.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">
                    No applications found for this filter.
                  </p>
                </div>
              ) : (
                emiApplications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b">
                      <div>
                        <h3 className="text-xl font-serif text-black mb-2">
                          {app.fullName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{app.email}</p>
                          <p>{app.phoneNumber}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(app.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: "#A97C51" }}
                      >
                        {app.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Total Amount
                        </p>
                        <p
                          className="text-2xl font-semibold"
                          style={{ color: "#A97C51" }}
                        >
                          {formatCurrency(app.totalAmount)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Down Payment: {formatCurrency(app.downPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Monthly EMI
                        </p>
                        <p
                          className="text-2xl font-semibold"
                          style={{ color: "#A97C51" }}
                        >
                          {formatCurrency(app.calculatedEMI)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Tenure: {app.emiTenure} months
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Monthly Income
                        </p>
                        <p
                          className="text-2xl font-semibold"
                          style={{ color: "#A97C51" }}
                        >
                          {formatCurrency(app.monthlyIncome)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {app.employmentType}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setUpdateStatus(app.status);
                          setUpdateAdminNotes(app.adminNotes || "");
                        }}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {emiTotal > limit && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Showing {(emiPage - 1) * limit + 1} to{" "}
                  {Math.min(emiPage * limit, emiTotal)} of {emiTotal}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEmiPage((p) => Math.max(1, p - 1))}
                    disabled={emiPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:border-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setEmiPage((p) => p + 1)}
                    disabled={emiPage * limit >= emiTotal}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:border-gray-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{
                        borderColor: "#A97C51",
                        borderTopColor: "transparent",
                        borderWidth: "3px",
                      }}
                    />
                    <p className="text-gray-500">Loading...</p>
                  </div>
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg mb-2">No messages yet</p>
                  <p className="text-gray-400 text-sm">
                    Contact form submissions will appear here
                  </p>
                </div>
              ) : (
                contactMessages.map((message) => (
                  <div
                    key={message._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 pb-4 border-b">
                      <div>
                        <h3 className="text-xl font-serif text-black mb-2">
                          {message.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <span>📧</span>
                            {message.email}
                          </p>
                          {message.number && (
                            <p className="flex items-center gap-2">
                              <span>📞</span>
                              {message.number}
                            </p>
                          )}
                          {message.address && (
                            <p className="flex items-center gap-2">
                              <span>📍</span>
                              {message.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm leading-relaxed text-gray-700 line-clamp-3">
                        {message.description}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>ID: {message._id}</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`mailto:${message.email}`}
                          className="px-3 py-1 bg-[#A97C51] text-white text-xs rounded hover:bg-[#8b6e5b] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Reply
                        </a>
                        {message.number && (
                          <a
                            href={`tel:${message.number}`}
                            className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {contactTotal > limit && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Showing {(contactPage - 1) * limit + 1} to{" "}
                  {Math.min(contactPage * limit, contactTotal)} of{" "}
                  {contactTotal}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContactPage((p) => Math.max(1, p - 1))}
                    disabled={contactPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setContactPage((p) => p + 1)}
                    disabled={contactPage * limit >= contactTotal}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <ProductListing totalProducts={stats.totalProducts} />
        )}
        {activeTab === "order" && <OrderListing />}
        {activeTab === "category" && <CategoryListing />}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-lg text-black font-serif">
                Update Application Status
              </h3>
              <p className="text-sm text-gray-500">
                {selectedApp.fullName} - {selectedApp._id}
              </p>
            </div>
            <form onSubmit={handleStatusUpdate}>
              <div className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={updateStatus}
                    onChange={(e) =>
                      setUpdateStatus(
                        e.target.value as EMIApplication["status"]
                      )
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#A97C51]"
                  >
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="adminNotes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Admin Notes
                  </label>
                  <textarea
                    id="adminNotes"
                    value={updateAdminNotes}
                    onChange={(e) => setUpdateAdminNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border placeholder:text-gray-700 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#A97C51]"
                    placeholder="Add notes for the applicant..."
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-white shadow-sm disabled:opacity-70"
                  style={{ backgroundColor: "#A97C51" }}
                >
                  {isUpdating ? "Updating..." : "Update & Notify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <div
          className="fixed bottom-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white"
          style={{
            backgroundColor:
              notification.type === "success" ? "#10B981" : "#EF4444",
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
