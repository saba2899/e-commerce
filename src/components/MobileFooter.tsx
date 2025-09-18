import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FiSend, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { HiOutlineQrCode } from "react-icons/hi2";
import { useUser } from "../context/useUser";

export function MobileFooter() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [email, setEmail] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    }
  };

  const footerSections = [
    {
      id: "support",
      title: "Support",
      items: [
        {
          icon: <FiMapPin size={16} />,
          text: "111 Rustaveli Ave, Tbilisi, Georgia",
        },
        { icon: <FiMail size={16} />, text: "exclusive@gmail.com" },
        { icon: <FiPhone size={16} />, text: "+995593141312" },
      ],
    },
    {
      id: "account",
      title: "Account",
      items: [
        { text: "My Account", onClick: () => navigate("/profile") },
        // Only show login/register link when user is not logged in
        ...(user
          ? []
          : [{ text: "Login / Register", onClick: () => navigate("/login") }]),
        { text: "Cart", onClick: () => navigate("/cart") },
        { text: "Wishlist", onClick: () => navigate("/favorites") },
        { text: "Shop", onClick: () => navigate("/") },
      ],
    },
    {
      id: "quicklink",
      title: "Quick Link",
      items: [
        { text: "About", onClick: () => navigate("/about") },
        { text: "Privacy Policy", onClick: () => navigate("/privacy") },
        { text: "Terms Of Use", onClick: () => navigate("/terms") },
        { text: "FAQ", onClick: () => navigate("/faq") },
        { text: "Contact", onClick: () => navigate("/contact") },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Exclusive</h3>
          <p className="text-sm opacity-90 mb-4">
            Get 10% off your first order
          </p>
          <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-12 text-gray-900 bg-white rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 mobile-newsletter-input"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FiSend size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="p-6 space-y-6">
        {/* Collapsible Sections */}
        {footerSections.map((section) => (
          <div key={section.id} className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-lg">{section.title}</h4>
              {expandedSections.has(section.id) ? (
                <FaChevronUp size={16} className="text-gray-400" />
              ) : (
                <FaChevronDown size={16} className="text-gray-400" />
              )}
            </button>

            {expandedSections.has(section.id) && (
              <div className="mt-4 space-y-3 mobile-footer-animate">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    onClick={item.onClick}
                    className={`flex items-center gap-3 text-gray-300 ${
                      item.onClick
                        ? "cursor-pointer hover:text-white transition-colors"
                        : ""
                    }`}
                  >
                    {item.icon && item.icon}
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Download App Section */}
        <div className="border-b border-gray-700 pb-4">
          <h4 className="font-semibold text-lg mb-4">Download App</h4>
          <p className="text-sm text-gray-300 mb-4">
            Save $3 with App New User Only
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <HiOutlineQrCode size={24} className="text-gray-600" />
            </div>
            <div className="flex-1 space-y-2">
              <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-sm">
                Get it on Google Play
              </button>
              <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-sm">
                Download on the App Store
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors mobile-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors mobile-social-icon"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors mobile-social-icon"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors mobile-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center pt-4">
          <button
            onClick={scrollToTop}
            className="px-6 py-3 text-white rounded-xl hover:bg-red-600 transition-colors font-medium mobile-back-to-top"
          >
            Back to Top
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-4">
        <div className="text-center text-sm text-gray-400">
          © Copyright Rimel 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
}
