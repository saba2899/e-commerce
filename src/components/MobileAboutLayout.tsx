import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import girls from "../assets/girls.jpg";

export function MobileAboutLayout() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: HiOutlineShoppingBag,
      number: "10.5K",
      label: "Active Sellers",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: HiOutlineUsers,
      number: "3M+",
      label: "Happy Customers",
      color: "from-green-500 to-green-600",
    },
    {
      icon: HiOutlineGlobeAlt,
      number: "300+",
      label: "Brands",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: HiOutlineStar,
      number: "1M+",
      label: "Products",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const values = [
    {
      icon: HiOutlineHeart,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above all else.",
      color: "text-red-500",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Trust & Security",
      description:
        "Your data and transactions are protected with industry-leading security.",
      color: "text-blue-500",
    },
    {
      icon: HiOutlineTruck,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping to get your orders to you faster.",
      color: "text-green-500",
    },
    {
      icon: HiOutlineChatBubbleLeftRight,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to help you whenever you need.",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl font-bold mb-4">About Exclusive</h1>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              South Asia's premier online shopping marketplace since 2015
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Our Story Section */}
      <section className="px-6 py-12 bg-white">
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <img
                src={girls}
                alt="Our team"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-700 leading-relaxed mb-4">
                Launched in 2015, Exclusive is South Asia's premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                serving 3 million customers across the region.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast pace. Exclusive offers a diverse assortment in
                categories ranging from consumer electronics to fashion and
                lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-300">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 delay-${
                  600 + index * 200
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-12 bg-white">
        <div
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600">What drives us every day</p>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 delay-${
                  1000 + index * 200
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${value.color}`}
                    >
                      <value.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-12 bg-gradient-to-br from-red-500 to-pink-500 text-white">
        <div
          className={`transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="text-lg leading-relaxed mb-6">
                To democratize commerce and make quality products accessible to
                everyone, everywhere. We believe in empowering sellers and
                delighting customers through innovative technology and
                exceptional service.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-white text-red-500 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="px-6 py-12 bg-gray-900 text-white">
        <div
          className={`transition-all duration-1000 delay-1400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Follow Our Journey</h2>
            <p className="text-gray-300">Stay connected with us</p>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
