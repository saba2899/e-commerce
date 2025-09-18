import { useState } from "react";
import { useNavigate } from "react-router";
import {
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiLockClosed,
  HiUser,
} from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { signUp } from "../services/auth";
import { useUser } from "../context/useUser";

export function MobileSignUpLayout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const nameRegex = /^[\p{L}][\p{L}'-]{1,}(?: [\p{L}'-]{2,})*$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!nameRegex.test(name.trim())) {
      setError(
        "Name must be at least 2 letters; letters, spaces, '-' and ' allowed"
      );
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include upper, lower, number, and symbol"
      );
      setLoading(false);
      return;
    }

    try {
      const user = await signUp(name, email, password);
      setUser(user);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white sm:hidden">
      {/* Header */}
      <div className="pt-16 pb-8 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join our community and start shopping</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        {/* Signup Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-base"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-base"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <HiEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Must include uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* Login Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-white">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2">Already have an account?</h3>
            <p className="text-sm opacity-90">Sign in to access your account</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-blue-600 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Sign In</span>
            <HiArrowRight size={16} />
          </button>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-red-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-red-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">🎁</div>
            <h4 className="font-semibold text-gray-800 text-sm">
              Exclusive Deals
            </h4>
            <p className="text-xs text-gray-600">Member-only offers</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">🚚</div>
            <h4 className="font-semibold text-gray-800 text-sm">
              Free Shipping
            </h4>
            <p className="text-xs text-gray-600">On orders over $50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
