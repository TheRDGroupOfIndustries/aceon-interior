"use client";
import React, { useState, useEffect } from "react";

interface EMIApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;

  // Loan/EMI Details
  interiorPackage: string;
  totalAmount: string;
  emiTenure: string;
  downPayment: string;

  // Financial Information
  monthlyIncome: string;
  employmentType: string;
  bankDetails: string;

  // Consent
  agreeTerms: boolean;
  agreeCreditCheck: boolean;
}

const EMIApplicationModal: React.FC<EMIApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    interiorPackage: "",
    totalAmount: "",
    emiTenure: "",
    downPayment: "",
    monthlyIncome: "",
    employmentType: "",
    bankDetails: "",
    agreeTerms: false,
    agreeCreditCheck: false,
  });

  const [calculatedEMI, setCalculatedEMI] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Calculate EMI whenever relevant fields change
  useEffect(() => {
    if (formData.totalAmount && formData.emiTenure) {
      const principal =
        Number(formData.totalAmount) - Number(formData.downPayment || 0);
      const tenure = Number(formData.emiTenure);
      if (principal > 0 && tenure > 0) {
        const emi = calculateEMI(principal, tenure);
        setCalculatedEMI(emi);
      } else {
        setCalculatedEMI(0);
      }
    } else {
      setCalculatedEMI(0);
    }
  }, [formData.totalAmount, formData.emiTenure, formData.downPayment]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/emi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: Number(formData.totalAmount),
          emiTenure: Number(formData.emiTenure),
          downPayment: Number(formData.downPayment) || 0,
          monthlyIncome: Number(formData.monthlyIncome),
          calculatedEMI,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Application submitted successfully! We'll contact you soon."
        );
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          interiorPackage: "",
          totalAmount: "",
          emiTenure: "",
          downPayment: "",
          monthlyIncome: "",
          employmentType: "",
          bankDetails: "",
          agreeTerms: false,
          agreeCreditCheck: false,
        });
        setCalculatedEMI(0);

        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setMessage("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // EMI calculation function
  function calculateEMI(
    principal: number,
    tenure: number,
    interestRate: number = 12
  ): number {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  }

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#A97C51] to-[#8b6e5b] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">EMI Application</h2>
              <p className="text-white/90 mt-1">
                Easy financing for your dream interior
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-light bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 bg-gray-50/30">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-center border ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Loan/EMI Details */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Loan Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interior Package *
                </label>
                <select
                  name="interiorPackage"
                  value={formData.interiorPackage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">
                    Select Package
                  </option>
                  <option value="Basic Interior" className="text-gray-900">
                    Basic Interior
                  </option>
                  <option value="Premium Interior" className="text-gray-900">
                    Premium Interior
                  </option>
                  <option value="Luxury Interior" className="text-gray-900">
                    Luxury Interior
                  </option>
                  <option value="Custom Design" className="text-gray-900">
                    Custom Design
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount (₹) *
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                  placeholder="500000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMI Tenure *
                  </label>
                  <select
                    name="emiTenure"
                    value={formData.emiTenure}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-500">
                      Select Tenure
                    </option>
                    <option value="3" className="text-gray-900">
                      3 Months
                    </option>
                    <option value="6" className="text-gray-900">
                      6 Months
                    </option>
                    <option value="9" className="text-gray-900">
                      9 Months
                    </option>
                    <option value="12" className="text-gray-900">
                      12 Months
                    </option>
                    <option value="18" className="text-gray-900">
                      18 Months
                    </option>
                    <option value="24" className="text-gray-900">
                      24 Months
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* EMI Display */}
              {calculatedEMI > 0 && (
                <div className="bg-gradient-to-r from-[#F8F4F0] to-[#F0EBE5] p-4 rounded-lg border border-[#E5DED5]">
                  <p className="text-sm text-gray-600 font-medium">
                    Estimated Monthly EMI
                  </p>
                  <p className="text-2xl text-[#A97C51] font-bold">
                    ₹{calculatedEMI.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on {formData.emiTenure} months tenure with{" "}
                    {formData.downPayment
                      ? `₹${Number(formData.downPayment).toLocaleString()} down payment`
                      : "no down payment"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="mt-8 space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Financial Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₹) *
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900"
                  placeholder="75000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type *
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-500">
                    Select Type
                  </option>
                  <option value="salaried" className="text-gray-900">
                    Salaried
                  </option>
                  <option value="self-employed" className="text-gray-900">
                    Self-Employed
                  </option>
                  <option value="other" className="text-gray-900">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account/Card Details (Optional)
              </label>
              <textarea
                name="bankDetails"
                value={formData.bankDetails}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C51] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-900 resize-none"
                placeholder="Provide bank details for faster processing (optional)"
              />
            </div>
          </div>

          {/* Consent */}
          <div className="mt-8 space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Consent & Agreements
            </h3>

            <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 text-[#A97C51] focus:ring-[#A97C51] rounded border-gray-300 group-hover:border-[#A97C51] transition-colors duration-200"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-[#A97C51] font-medium">
                    Terms & Conditions
                  </span>{" "}
                  and understand that this application is subject to approval
                  based on creditworthiness and other factors.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeCreditCheck"
                  checked={formData.agreeCreditCheck}
                  onChange={handleChange}
                  required
                  className="mt-1 text-[#A97C51] focus:ring-[#A97C51] rounded border-gray-300 group-hover:border-[#A97C51] transition-colors duration-200"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I authorize Aceon Interio to perform credit checks and verify
                  the information provided. I understand this is a standard
                  procedure for EMI approval.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium hover:border-gray-400 hover:shadow-sm"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.agreeTerms ||
                !formData.agreeCreditCheck
              }
              className="px-8 py-3 bg-gradient-to-r from-[#A97C51] to-[#8b6e5b] text-white rounded-lg hover:from-[#8b6e5b] hover:to-[#7a5f4d] transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl disabled:shadow-none transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Apply for EMI"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EMIApplicationModal;
