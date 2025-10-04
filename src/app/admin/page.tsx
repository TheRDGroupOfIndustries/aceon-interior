"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"

interface EMIApplication {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  interiorPackage: string
  totalAmount: number
  downPayment: number
  emiTenure: number
  calculatedEMI: number
  monthlyIncome: number
  employmentType: string
  status: "pending" | "approved" | "rejected" | "under_review"
  createdAt: string
  bankDetails?: string
  adminNotes?: string
}

interface ContactMessage {
  _id: string
  name: string
  email: string
  phone?: string
  number?: string
  address?: string
  description: string
  message: string
  createdAt: string

}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"emi" | "contact">("emi")
  const [emiApplications, setEmiApplications] = useState<EMIApplication[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [emiPage, setEmiPage] = useState(1)
  const [contactPage, setContactPage] = useState(1)
  const [emiTotal, setEmiTotal] = useState(0)
  const [contactTotal, setContactTotal] = useState(0)
  const [emiFilter, setEmiFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [statusStats, setStatusStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    under_review: 0,
    total: 0,
  })

  const limit = 10

  useEffect(() => {
    fetchEMIApplications()
  }, [emiPage, emiFilter])

  useEffect(() => {
    fetchContactMessages()
  }, [contactPage])

  const fetchEMIApplications = async () => {
    setLoading(true)
    try {
      const statusParam = emiFilter !== "all" ? `&status=${emiFilter}` : ""
      const response = await fetch(`/api/emi?page=${emiPage}&limit=${limit}${statusParam}`)
      const data = await response.json()

      if (data.success) {
        setEmiApplications(data.data.applications)
        setEmiTotal(data.data.pagination.total)
        setStatusStats(data.data.filters.status)
      }
    } catch (error) {
      console.error("Error fetching EMI applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchContactMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/contact?page=${contactPage}&limit=${limit}`)
      const data = await response.json()

      setContactMessages(data.messages)
      setContactTotal(data.pagination.total)
    } catch (error) {
      console.error("Error fetching contact messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}


<div className="border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center gap-3">
    <Link
      href="/"
      className="text-gray-600 hover:text-[#A97C51] transition-colors"
    >
      <BsArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
    </Link>
    <div className="pl-6 sm:pl-10">
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
  </div>
</div>



      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b mb-8">
          <button
            onClick={() => setActiveTab("emi")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "emi" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            EMI Applications ({statusStats.total})
            {activeTab === "emi" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#A97C51" }} />
            )}
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "contact" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Contact Messages ({contactTotal})
            {activeTab === "contact" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#A97C51" }} />
            )}
          </button>
        </div>

        
        {activeTab === "emi" && (
          <div>
      
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => {
                  setEmiFilter("all")
                  setEmiPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  emiFilter === "all"
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                style={emiFilter === "all" ? { backgroundColor: "#A97C51" } : {}}
              >
                All ({statusStats.total})
              </button>
              <button
                onClick={() => {
                  setEmiFilter("pending")
                  setEmiPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  emiFilter === "pending"
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                style={emiFilter === "pending" ? { backgroundColor: "#A97C51" } : {}}
              >
                Pending ({statusStats.pending})
              </button>
              <button
                onClick={() => {
                  setEmiFilter("under_review")
                  setEmiPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  emiFilter === "under_review"
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                style={emiFilter === "under_review" ? { backgroundColor: "#A97C51" } : {}}
              >
                Under Review ({statusStats.under_review})
              </button>
              <button
                onClick={() => {
                  setEmiFilter("approved")
                  setEmiPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  emiFilter === "approved"
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                style={emiFilter === "approved" ? { backgroundColor: "#A97C51" } : {}}
              >
                Approved ({statusStats.approved})
              </button>
              <button
                onClick={() => {
                  setEmiFilter("rejected")
                  setEmiPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  emiFilter === "rejected"
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                style={emiFilter === "rejected" ? { backgroundColor: "#A97C51" } : {}}
              >
                Rejected ({statusStats.rejected})
              </button>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{ borderColor: "#A97C51", borderTopColor: "transparent", borderWidth: "3px" }}
                    />
                    <p className="text-gray-500">Loading...</p>
                  </div>
                </div>
              ) : emiApplications.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No applications found</p>
                </div>
              ) : (
                emiApplications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b">
                      <div>
                        <h3 className="text-xl font-serif text-black mb-2">{app.fullName}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{app.email}</p>
                          <p>{app.phoneNumber}</p>
                          <p className="text-xs text-gray-500">{formatDate(app.createdAt)}</p>
                        </div>
                      </div>
                      <div>
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: "#A97C51",
                            color: "white",
                          }}
                        >
                          {app.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                        <p className="text-2xl font-semibold" style={{ color: "#A97C51" }}>
                          {formatCurrency(app.totalAmount)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Down Payment: {formatCurrency(app.downPayment)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                        <p className="text-2xl font-semibold" style={{ color: "#A97C51" }}>
                          {formatCurrency(app.calculatedEMI)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Tenure: {app.emiTenure} months</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Income</p>
                        <p className="text-2xl font-semibold" style={{ color: "#A97C51" }}>
                          {formatCurrency(app.monthlyIncome)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{app.employmentType}</p>
                      </div>
                    </div>

                
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-500">Package:</span>{" "}
                        <span className="font-medium text-black">{app.interiorPackage}</span>
                      </p>
                      {app.bankDetails && (
                        <p>
                          <span className="text-gray-500">Bank Details:</span>{" "}
                          <span className="font-medium text-black">{app.bankDetails}</span>
                        </p>
                      )}
                      {app.adminNotes && (
                        <div className="bg-gray-50 p-3 rounded-lg mt-3">
                          <p className="text-gray-500 text-xs mb-1">Admin Notes</p>
                          <p className="font-medium">{app.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {emiTotal > limit && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Showing {(emiPage - 1) * limit + 1} to {Math.min(emiPage * limit, emiTotal)} of {emiTotal}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEmiPage((p) => Math.max(1, p - 1))}
                    disabled={emiPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setEmiPage((p) => p + 1)}
                    disabled={emiPage * limit >= emiTotal}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === "contact" && (
          <div>
            <div className="space-y-4">
              {loading ? (
            <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div
              className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: "#A97C51", borderTopColor: "transparent", borderWidth: "3px" }}
            />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      ) : contactMessages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-lg mb-2">No messages yet</p>
          <p className="text-gray-400 text-sm">Contact form submissions will appear here</p>
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
                <h3 className="text-xl font-serif text-black mb-2">{message.name}</h3>
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
                  Showing {(contactPage - 1) * limit + 1} to {Math.min(contactPage * limit, contactTotal)} of{" "}
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
      </div>
    </div>
  )
}
