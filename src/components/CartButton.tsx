import { CiShoppingCart } from "react-icons/ci";
export default function CartButton({ count = 0 }: { count?: number }) {
  return (
    <button
      type="button"
      aria-label="Cart"
      className="hidden lg:block relative p-2 rounded-md hover:bg-amber-950black/5
    "
    >
      <CiShoppingCart size={22} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 min-w-5 h-5 rounded-full bg-red-500 text-white text-[10px] leading-5 text-center px-1">
          {count}
        </span>
      )}
    </button>
  );
}
