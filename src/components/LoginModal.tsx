import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { Input, Button } from "../components";

import { logIn } from "../services/auth";

import { useUser } from "../hooks/useUser";

import singup from "../assets/signup.avif";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { setUser } = useUser();
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
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] pt-10 pb-10 rounded-lg bg-white shadow-2xl overflow-hidden">
        <div className="flex flex-col items-stretch h-full pl-2 pr-2 md:flex-row">
          <div className="hidden md:flex md:w-1/2 bg-gray-50">
            <img
              src={singup}
              alt="Login"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full p-8 overflow-auto md:w-1/2 md:p-10">
            <h2 className="mb-1 text-2xl font-semibold">Log in to Exclusive</h2>
            <p className="mb-6 text-sm text-gray-600">
              Enter your details below
            </p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <Input
                type="email"
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
              <div className="flex items-center justify-between pt-2">
                <a className="text-sm text-red-500 hover:underline" href="#">
                  Forget Password?
                </a>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    className="px-4 py-2 border rounded-md"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 text-white bg-red-500 rounded-md disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
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
