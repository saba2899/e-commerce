import { useEffect, useState } from "react";
import clsx from "clsx";
import { CiSearch } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import { SearchBar } from "./SearchBar";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
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
    <div className="sm:hidden">
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
          "h-[60vh]",
          "rounded-t-3xl bg-white p-6 shadow-2xl",
          panelAnim
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CiSearch className="text-gray-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Search Products
            </h2>
          </div>
          <button
            onClick={() => {
              setClosing(true);
              onClose?.();
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close search"
          >
            <HiXMark size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Popular Searches */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Electronics",
              "Clothing",
              "Home & Garden",
              "Sports",
              "Books",
              "Beauty",
            ].map((term) => (
              <button
                key={term}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
