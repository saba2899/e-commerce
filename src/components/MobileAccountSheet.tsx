import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useNavigate } from "react-router";
import {
  CiUser,
  CiHeart,
  CiShoppingCart,
  CiSettings,
  CiLogout,
} from "react-icons/ci";
import { useUser } from "../hooks/useUser";
import { logOut } from "../services/auth";

interface MobileAccountSheetProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function MobileAccountSheet({
  isOpen,
  onClose,
}: MobileAccountSheetProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
      document.body.classList.add("overflow-hidden");
    } else if (mounted) {
      setClosing(true);
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, mounted]);

  const finishClose = () => {
    if (closing) {
      setMounted(false);
      setClosing(false);
    }
  };

  function handleLogOut() {
    logOut();
    setUser(null);
    setClosing(true);
    onClose?.();
    navigate("/");
  }

  if (!mounted) return null;

  const panelAnim = isOpen && !closing ? "animate-in-up" : "animate-out-down";
  const overlayAnim =
    isOpen && !closing ? "animate-fade-in" : "animate-fade-out";

  const sheet = (
    <div className="md:hidden">
      <div
        className={clsx(
          "fixed inset-0 z-[60] bg-black/40",
          overlayAnim,
          closing && "pointer-events-none"
        )}
        onClick={() => {
          setClosing(true);
          onClose?.();
        }}
        onAnimationEnd={finishClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        onAnimationEnd={finishClose}
        className={clsx(
          "fixed left-0 right-0 bottom-0 z-[70]",
          "h-[calc(100dvh-4rem)]",
          "rounded-t-3xl bg-white p-6 shadow-2xl pb-24",
          panelAnim
        )}
      >
        <div className="px-2 py-3 mb-2 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
          <p className="text-base font-medium text-gray-900">
            {user?.name
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : user?.email || "Account"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.email || "Manage your account"}
          </p>
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => {
              onClose?.();
              navigate("/profile");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
          >
            <CiUser size={18} />
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              onClose?.();
              navigate("/favorites");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
          >
            <CiHeart size={18} />
            <span>Wishlist</span>
          </button>

          <button
            onClick={() => {
              onClose?.();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
          >
            <CiShoppingCart size={18} />
            <span>Orders</span>
          </button>

          <button
            onClick={() => {
              onClose?.();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
          >
            <CiSettings size={18} />
            <span>Settings</span>
          </button>

          <div className="border-t border-gray-100 my-2" />

          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-left"
          >
            <CiLogout size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(sheet, document.body);
}
