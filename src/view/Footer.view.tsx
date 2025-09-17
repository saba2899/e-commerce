import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-24 text-white bg-black pb-2">
      <div className="grid gap-10 py-12 page-container md:grid-cols-5">
        <div>
          <h3 className="text-xl font-semibold">Exclusive</h3>
          <p className="mt-4 text-sm opacity-80">Subscribe</p>
          <p className="mt-1 text-sm opacity-80">
            Get 10% off your first order
          </p>
          <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 pr-10 text-white bg-transparent border rounded-md border-white/30 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute grid w-8 h-8 text-white rounded-md right-1 top-1 place-items-center hover:bg-gray-400"
              >
                <FiSend size={16} />
              </button>
            </div>
          </form>
        </div>

        <div>
          <h4 className="font-semibold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>111 Rustaveli Ave, Tbilisi, Georgia</li>
            <li>exclusive@gmail.com</li>
            <li>+995593141312</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Account</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Quick Link</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Download App</h4>
          <p className="mt-4 text-xs opacity-80">
            Save $3 with App New User Only
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="grid w-16 h-16 text-xs font-semibold text-black bg-white rounded-md place-items-center">
              QR
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-3 py-2 text-xs text-white rounded-md bg-white/10">
                Get it on Google Play
              </button>
              <button className="px-3 py-2 text-xs text-white rounded-md bg-white/10">
                Download on the App Store
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 opacity-80">
            <a aria-label="Facebook" className="hover:opacity-100" href="#">
              <FaFacebookF />
            </a>
            <a aria-label="Twitter" className="hover:opacity-100" href="#">
              <FaTwitter />
            </a>
            <a aria-label="Instagram" className="hover:opacity-100" href="#">
              <FaInstagram />
            </a>
            <a aria-label="LinkedIn" className="hover:opacity-100" href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="border-top border-white/10">
        <div className="py-4 text-xs text-center page-container opacity-70">
          © Copyright Rimel 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
}
