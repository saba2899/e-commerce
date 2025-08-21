import clsx from "clsx";

export function Burger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      onClick={onClick}
      className="relative grid w-10 h-10 text-black place-items-center"
    >
      <span
        className={clsx(
          "absolute block h-0.5 w-6 bg-current transition-transform duration-300",
          isOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
        )}
      />
      <span
        className={clsx(
          "absolute block h-0.5 w-6 bg-current transition-opacity duration-300",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={clsx(
          "absolute block h-0.5 w-6 bg-current transition-transform duration-300",
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
        )}
      />
    </button>
  );
}
