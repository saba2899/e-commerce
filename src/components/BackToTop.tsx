import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-6 bottom-6 z-50 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg ring-1 ring-black/10 transition-opacity ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <FiArrowUp />
    </button>
  );
}
