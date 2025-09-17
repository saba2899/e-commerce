import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router";
export function CartButton({ count: countProp }: { count?: number }) {
  const { count } = useCart();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="Cart"
      onClick={() => navigate("/cart")}
      className="relative hidden p-2 cursor-pointer lg:block rounded:md hover:bg-black/5 "
    >
      <CiShoppingCart size={22} />
      {(countProp ?? count) > 0 && (
        <span className="absolute  -right-1 -top-1 min-w-5 h-5 rounded-full bg-red-500 text-white text-[10px] leading-5 text-center px-1">
          {countProp ?? count}
        </span>
      )}
    </button>
  );
}
