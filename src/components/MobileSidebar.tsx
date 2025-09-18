import { useEffect, useState } from "react";
import clsx from "clsx";
import { CiSearch } from "react-icons/ci";
import { CATEGORIES } from "../data/categories";
import { SearchBar } from "./SearchBar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);

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

  if (!mounted) return null;

  const panelAnim = isOpen && !closing ? "animate-in-up" : "animate-out-down";
  const overlayAnim =
    isOpen && !closing ? "animate-fade-in" : "animate-fade-out";

  return (
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
          "rounded-t-3xl bg-white text-red-500 hover:bg-red-50 p-6 shadow-2xl",
          panelAnim
        )}
      >
        {/* Mobile Search Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CiSearch className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Search Products
            </h3>
          </div>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        <nav className="space-y-4 text-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h3>
          <ul className="flex flex-col items-center gap-1">
            {CATEGORIES.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block px-4 py-3 text-gray-700 transition-colors rounded-lg text-md hover:bg-red-50 hover:text-red-600"
                >
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
