import { useState } from "react";
import { useNavigate } from "react-router";
import {
  HiEye,
  HiEyeSlash,
  HiUserPlus,
  HiArrowRight,
  HiLockClosed,
} from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { logIn } from "../services/auth";
import { useUser } from "../context/useUser";

export function MobileLoginLayout() {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      const user = await logIn(email, password);
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

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white sm:hidden">
      {/* Header */}
      <div className="pt-16 pb-8 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue shopping</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
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
                  placeholder="Enter your password"
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
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-red-500 text-sm font-medium hover:underline">
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-6 text-white">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2">New to Exclusive?</h3>
            <p className="text-sm opacity-90">
              Create an account and enjoy exclusive benefits
            </p>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-white text-red-600 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
          >
            <HiUserPlus size={20} />
            <span>Create Account</span>
            <HiArrowRight size={16} />
          </button>
        </div>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-5 h-5 bg-blue-500 rounded"></div>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-5 h-5 bg-blue-600 rounded"></div>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className="font-semibold text-gray-800 text-sm">Secure</h4>
            <p className="text-xs text-gray-600">Your data is protected</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-gray-800 text-sm">Fast</h4>
            <p className="text-xs text-gray-600">Quick checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
