import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-24 bg-black text-white">
      <div className="page-container py-12 grid gap-10 md:grid-cols-5">
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
                className="w-full rounded-md border border-white/30 bg-transparent px-3 pr-10 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-md  text-white hover:bg-gray-400"
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
          <div className="mt-3 flex items-center gap-3">
            <div className="grid place-items-center w-16 h-16 rounded-md bg-white text-black text-xs font-semibold">
              QR
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded-md bg-white/10 px-3 py-2 text-xs text-white">
                Get it on Google Play
              </button>
              <button className="rounded-md bg-white/10 px-3 py-2 text-xs text-white">
                Download on the App Store
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 opacity-80">
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
        <div className="page-container py-4 text-center text-xs opacity-70">
          © Copyright Rimel 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
}
