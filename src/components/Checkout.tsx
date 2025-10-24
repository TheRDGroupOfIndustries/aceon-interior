"use client";

import React, { useState, useMemo, useEffect } from "react";
import CheckoutPageLoader from "./loaders/CheckoutPageLoader";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/redux/features/orderSlice";
import { RootState } from "@/redux/store";

// --- Inline SVG Icons ---
const StarFillIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CashIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 7V5M12 19v-2M15 9.5a2.5 2.5 0 01-5 0M12 14.5a2.5 2.5 0 015 0"></path>
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.323 4.128-1.681-1.68a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.144-.094l4.25-5.378z"
      clipRule="evenodd"
    />
  </svg>
);

// Mock data for the product being checked out
const MOCK_PRODUCT = {
  sku: "SCND-BFRM-QN-01",
  name: "Scandinavian Minimalist Bed Frame (Queen, Teal Velvet)",
  price: 45000.0,
  original_price: 55000.0,
  main_image: "https://placehold.co/100x100/008080/FFFFFF?text=Product",
  shipping_cost: 1500.0, // Example shipping cost
  tax_rate: 0.18, // 18% GST example
};

const CheckoutPage = () => {
  const { loading } = useSelector((state: RootState) => state.order);
  const [loader, setLoader] = useState(true);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showModal, setShowModal] = useState<{ title: string; message: string; type: string } | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCheckoutProduct = sessionStorage.getItem("checkoutProduct");
    console.log("fetchCheckoutProduct:", fetchCheckoutProduct);
    if (fetchCheckoutProduct) {
      setCheckoutProduct(JSON.parse(fetchCheckoutProduct));
    } else {
      setCheckoutProduct(MOCK_PRODUCT);
    }
    setLoader(false);
  }, []);

  const formatPrice = (price) =>
    `₹${(price ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // --- Calculations ---
  const { subtotal, shipping, grandTotal, discount } = useMemo(() => {
    const itemPrice = checkoutProduct?.original_price;
    const sub = itemPrice * quantity;
    const disc =
      (checkoutProduct?.original_price - checkoutProduct?.current_price) *
      quantity;

    const shipping = checkoutProduct?.shipping_cost || 99;

    const total = sub - disc + shipping;

    return {
      subtotal: sub,
      discount: disc,
      shipping,
      grandTotal: total,
    };
  }, [quantity, checkoutProduct]);

  // --- Handlers ---

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return Math.min(prev + 1, 10); // Max 10 items
      if (type === "dec") return Math.max(prev - 1, 1); // Min 1 item
      return prev;
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    // Simple validation check
    const requiredFields = [
      "fullName",
      "street",
      "city",
      "postalCode",
      "phone",
    ];
    const valid = requiredFields.every((field) => address[field].trim() !== "");
    console.log("valid:", valid);
    setIsAddressValid(valid);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!isAddressValid) {
      setShowModal({
        title: "Missing Address Details",
        message:
          "Please fill in all required address fields before placing the order.",
        type: "error",
      });
      return;
    }

    if (paymentMethod !== "cod") {
      setShowModal({
        title: "Payment Error",
        message: "Only Cash on Delivery (COD) is supported for this checkout.",
        type: "error",
      });
      return;
    }

    // Simulate order submission success
    const orderData = {
      productId: checkoutProduct.id,
      quantity,
      variant: checkoutProduct.variant || "Standard",
      address,
      paymentMethod,
      grandTotal,
    };
    console.log("Order Placed:", orderData);

    dispatch(createOrder(orderData) as any)
      .unwrap()
      .then(() => {
        setOrderPlaced(true);
        setShowModal({
          title: "Order Placed Successfully!",
          message: `Your order for ${quantity} x ${checkoutProduct?.name} has been confirmed and will be shipped to ${address.city}. Total amount: ${formatPrice(grandTotal)}.`,
          type: "success",
        });
        router.push("/profile");
      });
  };

  // --- Modal for Confirmation/Error ---
  const Modal = () => (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className=" p-6 rounded-xl shadow-2xl max-w-sm w-full text-center space-y-4">
        <div
          className={`mx-auto w-12 h-12 ${showModal.type === "success" ? "text-primary" : "text-red-500"}`}
        >
          <CheckCircleIcon />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{showModal.title}</h3>
        <p className="text-gray-600">{showModal.message}</p>
        <button
          type="button"
          onClick={() => setShowModal(null)}
          className={`w-full py-2 rounded-lg font-semibold text-white cursor-pointer ${showModal.type === "success" ? "bg-primary hover:bg-primary" : "bg-primary hover:bg-amber-900"}`}
        >
          Close
        </button>
      </div>
    </div>
  );

  if (loader) return <CheckoutPageLoader />;
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl p-4 sm:p-8 mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-6 transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" /> Go Back
        </button>

        {orderPlaced ? (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="p-10 bg-green-50 border border-green-300 rounded-xl shadow-lg text-center space-y-4">
              <div className="w-16 h-16 mx-auto text-green-600">
                <CheckCircleIcon />
              </div>
              <h2 className="text-3xl font-bold text-green-700">
                Thank You! Order Confirmed.
              </h2>
              <p className="text-lg text-gray-600">
                Your order has been successfully placed. A confirmation email
                will be sent shortly.
              </p>
              <p className="text-xl font-bold text-gray-800 pt-2">
                Total Amount Paid: {formatPrice(grandTotal)}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Product, Address, Payment */}
            <div className="lg:col-span-2 space-y-8">
              <div className=" p-6 bg-card rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold font-playfair text-gray-800 mb-4 border-b pb-2">
                  Product Details
                </h2>
                <div className="flex space-x-4">
                  <img
                    src={checkoutProduct?.main_image}
                    alt={checkoutProduct?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold font-playfair text-gray-900 mb-1">
                      {checkoutProduct?.name}
                    </h3>
                    <p className="text-lg font-bold font-playfair text-primary">
                      {formatPrice(checkoutProduct?.current_price)}
                      {checkoutProduct?.original_price >
                        checkoutProduct?.current_price && (
                        <span className="text-sm text-gray-400 line-through font-medium ml-2">
                          {formatPrice(checkoutProduct?.original_price)}
                        </span>
                      )}
                    </p>
                    {checkoutProduct?.variant && (
                      <span className="text-sm font-playfair text-gray-600">
                        Variant:{" "}
                        {Object.keys(checkoutProduct?.variant || {}).length > 0
                          ? Object.values(checkoutProduct.variant).join(", ")
                          : "Standard"}
                      </span>
                    )}
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center border border-gray-300 rounded-lg h-10">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("dec")}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x text-gray-800 font-medium">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("inc")}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className=" p-6 rounded-xl bg-card border border-gray-100">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold font-playfair text-gray-800 mb-4 border-b pb-2">
                    1. Shipping Address
                  </h2>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    required
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address, Apt No. *"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={address.city}
                      onChange={handleAddressChange}
                      className="w-full p-3 border border-gray-300 rounded-lg "
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code *"
                      value={address.postalCode}
                      onChange={handleAddressChange}
                      className="w-full p-3 border border-gray-300 rounded-lg "
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number *"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    readOnly
                    disabled
                    className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg "
                  />
                </div>
              </div>
              <div className=" p-6 rounded-xl bg-card border border-gray-100">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold font-playfair text-gray-800 mb-4 border-b pb-2">
                    2. Payment Method
                  </h2>
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-amber-500 bg-amber-50 shadow-md"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-6 h-6 mr-3 text-primary">
                      <CashIcon />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay securely with cash or card upon delivery.
                      </p>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="text-green-600 w-5 h-5">
                        <CheckCircleIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className=" p-6 rounded-xl bg-card border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold font-playfair text-gray-800 mb-4 pb-2 border-b">
                  Order Summary
                </h2>

                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({quantity} items):</span>
                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-red-600">
                    <span>Discount:</span>
                    <span className="font-semibold">
                      - {formatPrice(discount)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-semibold">
                      {formatPrice(shipping)}
                    </span>
                  </div>

                  {/* <div className="flex justify-between border-b pb-3">
                    <span>Tax ({checkoutProduct?.tax_rate * 100}%):</span>
                    <span className="font-semibold">
                      {formatPrice(taxAmount)}
                    </span>
                  </div> */}

                  <div className="flex font-playfair justify-between pt-3 text-xl font-extrabold text-primary">
                    <span>Order Total:</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handlePlaceOrder}
                  disabled={loading || !isAddressValid}
                  className={`w-full mt-6 py-4 rounded-lg font-bold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
                    orderPlaced
                      ? "bg-green-600"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>

                {!isAddressValid && (
                  <p className="text-xs text-red-500 mt-2 text-center">
                    * Please fill all required address fields.
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default CheckoutPage;
