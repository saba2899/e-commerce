import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineArrowLeft,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineHome,
  HiOutlineBuildingOffice,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useCart } from "../context/cart-context";
import { useUser } from "../context/useUser";

export function MobileCheckoutLayout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [couponCode, setCouponCode] = useState("");

  // Error state
  const [err, setErr] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    const key = `checkout_info_${user.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const d = JSON.parse(saved) as Record<string, string>;
      setFirstName(d.firstName ?? "");
      setLastName(d.lastName ?? "");
      setCompany(d.company ?? "");
      setStreet(d.street ?? user.address ?? "");
      setApt(d.apt ?? "");
      setCity(d.city ?? "");
      setPhone(d.phone ?? "");
      setEmail(d.email ?? user.email ?? "");
      setRemember(true);
      return;
    }
    const tokens = (user.name ?? "").trim().split(/\s+/);
    setFirstName(tokens[0] ?? "");
    setLastName(tokens.slice(1).join(" "));
    setEmail(user.email ?? "");
    setStreet(user.address ?? "");
  }, [user]);

  function persistIfNeeded() {
    if (!user || !remember) return;
    const key = `checkout_info_${user.id}`;
    const data = {
      firstName,
      lastName,
      company,
      street,
      apt,
      city,
      phone,
      email,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  function validate(): boolean {
    const nameOk = firstName.trim().length >= 2;
    const lastOk = lastName.trim().length >= 2;
    const streetOk = street.trim().length >= 3;
    const cityOk = city.trim().length >= 2;
    const phoneOk = /[+]?\d[\d\s-]{6,}/.test(phone.trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
    setErr({
      firstName: nameOk ? "" : "Please enter your first name (min 2).",
      lastName: lastOk ? "" : "Please enter your last name (min 2).",
      street: streetOk ? "" : "Street address is required.",
      city: cityOk ? "" : "Town/City is required.",
      phone: phoneOk ? "" : "Enter a valid phone number.",
      email: emailOk ? "" : "Enter a valid email address.",
    });
    return nameOk && lastOk && streetOk && cityOk && phoneOk && emailOk;
  }

  function placeOrder() {
    if (!validate()) return;
    setPlacing(true);
    setTimeout(() => {
      persistIfNeeded();
      clear();
      navigate("/", { replace: true });
      alert("Order placed successfully! 🎉");
    }, 2000);
  }

  const steps = [
    { number: 1, title: "Information", completed: currentStep > 1 },
    { number: 2, title: "Payment", completed: currentStep > 2 },
    { number: 3, title: "Review", completed: currentStep > 3 },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden mobile-checkout-container">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 w-full">
          <div className="flex items-center gap-3 max-w-full">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <HiOutlineArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 truncate">
              Checkout
            </h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="px-4 py-16 text-center w-full max-w-full">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <HiOutlineCreditCard size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            Add some items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden mobile-checkout-container">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 w-full">
        <div className="flex items-center gap-3 max-w-full">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <HiOutlineArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              Checkout
            </h1>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mt-4 mobile-checkout-progress">
          {steps.map((step, index) => (
            <div key={step.number} className="mobile-checkout-progress-step">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : step.number === currentStep
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.completed ? (
                  <HiOutlineCheckCircle size={12} />
                ) : (
                  step.number
                )}
              </div>
              <span className="ml-1 text-xs font-medium text-gray-700 truncate">
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="w-4 h-0.5 bg-gray-200 mx-1 flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 w-full max-w-full">
        {/* Step 1: Information */}
        {currentStep === 1 && (
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full max-w-full overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <form className="space-y-6" onChange={persistIfNeeded}>
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>

                  {/* Name Fields */}
                  <div className="mobile-checkout-grid">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        First Name*
                      </label>
                      <div className="relative">
                        <HiOutlineUser
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      {err.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {err.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Last Name*
                      </label>
                      <div className="relative">
                        <HiOutlineUser
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      {err.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {err.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <div className="relative">
                      <HiOutlineBuildingOffice
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                        placeholder="Acme Inc."
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Address Information
                  </h3>

                  {/* Street Address */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Street Address*
                    </label>
                    <div className="relative">
                      <HiOutlineHome
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                        placeholder="123 Main St"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    {err.street && (
                      <p className="mt-1 text-xs text-red-600">{err.street}</p>
                    )}
                  </div>

                  {/* Apartment and City */}
                  <div className="mobile-checkout-grid">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Apartment, floor, etc.
                      </label>
                      <div className="relative">
                        <HiOutlineHome
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="Apt 4B"
                          value={apt}
                          onChange={(e) => setApt(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Town/City*
                      </label>
                      <div className="relative">
                        <HiOutlineHome
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="Gotham"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      {err.city && (
                        <p className="mt-1 text-xs text-red-600">{err.city}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Contact Information
                  </h3>

                  {/* Phone and Email */}
                  <div className="mobile-checkout-grid">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Phone*
                      </label>
                      <div className="relative">
                        <HiOutlineDevicePhoneMobile
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="(+995) 555 55 55"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      {err.phone && (
                        <p className="mt-1 text-xs text-red-600">{err.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email*
                      </label>
                      <div className="relative">
                        <HiOutlineEnvelope
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={16}
                        />
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {err.email && (
                        <p className="mt-1 text-xs text-red-600">{err.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Info */}
                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Save this information for faster checkout
                  </label>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full max-w-full overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">
                <div
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === "card"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 text-red-500"
                    />
                    <HiOutlineCreditCard size={20} className="text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === "cod"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-red-500"
                    />
                    <HiOutlineTruck size={20} className="text-gray-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Coupon Code
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base min-w-0"
                  />
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full max-w-full overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-red-500">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex items-center gap-4 mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <HiOutlineShieldCheck size={16} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineLockClosed size={16} />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden w-full max-w-full">
        <div className="flex gap-3 w-full max-w-full">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex-shrink-0"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={() => {
                if (currentStep === 1 && validate()) {
                  setCurrentStep(2);
                } else if (currentStep === 2) {
                  setCurrentStep(3);
                }
              }}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium min-w-0"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={placeOrder}
              disabled={placing}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium min-w-0 disabled:opacity-60"
            >
              {placing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Placing Order...
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
