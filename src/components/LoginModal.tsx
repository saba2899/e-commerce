import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { HiUserPlus, HiArrowRight } from "react-icons/hi2";

import { Input } from "../components";

import { logIn } from "../services/auth";

import { useUser } from "../context/useUser";

import singup from "../assets/signup.avif";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const u = await logIn(email, password);
      setUser(u);
      onClose();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSignUp() {
    onClose();
    navigate("/signup");
  }

  return createPortal(
    <div
      className="fixed   inset-0 z-[2000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] pt-10 pb-10 rounded-lg bg-white shadow-2xl overflow-hidden sm:max-w-md sm:mx-4 mobile-login-modal md:max-w-3xl">
        <div className="flex flex-col items-stretch h-full pl-2 pr-2 md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-gray-50">
            <img
              src={singup}
              alt="Login"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full p-6 overflow-auto md:w-1/2 md:p-10 sm:p-8">
            <h2 className="mb-1 text-2xl font-semibold">Log in to Exclusive</h2>
            <p className="mb-6 text-sm text-gray-600">
              Enter your details below
            </p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Mobile Registration Button */}

              <div className="flex flex-col gap-3 pt-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 mobile-modal-button mobile-modal-cancel"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 mobile-modal-button mobile-modal-login"
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </div>

                <div className="text-center">
                  <a className="text-sm text-red-500 hover:underline" href="#">
                    Forget Password?
                  </a>
                </div>
              </div>

              <div className="md:hidden mb-4">
                <p className="text-xs text-gray-500 text-center mt-2">
                  Join thousands of happy customers
                </p>
              </div>

              <div className="relative">
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full flex items-center justify-center gap-3 p-4 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 bg-gradient-to-r from-red-500 to-pink-500 shadow-lg hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                    minHeight: "48px",
                  }}
                >
                  <HiUserPlus size={20} />
                  <span>Create New Account</span>
                  <HiArrowRight size={16} />
                </button>
              </div>

              {/* Desktop Registration Link */}
              <div className="hidden md:block pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Don't have an account?
                  </p>
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <HiUserPlus size={18} />
                    <span>Sign Up</span>
                    <HiArrowRight size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
