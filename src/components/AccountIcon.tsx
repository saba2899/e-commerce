import { useState, useRef, useEffect } from "react";
import {
  CiUser,
  CiHeart,
  CiShoppingCart,
  CiSettings,
  CiLogout,
} from "react-icons/ci";
import { logOut } from "../services/auth";
import { useUser } from "../hooks/useUser";

export default function AccountIcon() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogOut() {
    logOut();
    setUser(null);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md hover:bg-black/5 transition-colors"
        aria-label="Account menu"
      >
        <CiUser size={22} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-900">
              {user?.name
                ? user?.name.charAt(0).toLocaleUpperCase() + user?.name.slice(1)
                : user?.email || "Account"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "Manage your account"}
            </p>
          </div>

          <div className="py-2">
            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CiUser size={18} />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CiHeart size={18} />
              <span>Wishlist</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CiShoppingCart size={18} />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CiSettings size={18} />
              <span>Settings</span>
            </button>
          </div>

          <div className="border-t border-gray-100"></div>

          <div className="py-2">
            <button
              onClick={handleLogOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <CiLogout size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
