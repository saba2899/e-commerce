import type { ProductCard } from "../types/productCard";
import StarRating from "./StarRating";
import { cn } from "../utils/cn";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

type CardProps = {
  product: ProductCard;
  onAddToCart?: (p: ProductCard) => void;
  showRating?: boolean;
  showDiscount?: boolean;
  ctaLabel?: string;
  variant?: "default" | "compact";
  className?: string;
};
export default function Card({
  product,
  onAddToCart,
  showRating = true,
  showDiscount = true,
  ctaLabel = "Add To Cart",
  variant = "default",
  className,
}: CardProps) {
  const {
    title,
    image,
    newPrice,
    oldPrice,
    discount,
    rating,
    reviews,
    isNew,
    colors,
  } = product;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-lg p-4",
        variant === "default" ? "p-4" : "p-3",
        className
      )}
    >
      <div className="relative rounded-lg bg-gray-100 overflow-hidden">
        {showDiscount && typeof discount === "number" && (
          <span className="absolute left-3 top-3 z-10 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute left-3 top-3 z-10 bg-green-500 text-white px-2 py-1 text-xs rounded-md">
            NEW
          </span>
        )}
        {/* top-right actions */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Add to wishlist"
            className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-black hover:text-white transition"
          >
            <CiHeart size={16} />
          </button>
          <button
            type="button"
            aria-label="Compare item"
            className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-black hover:text-white transition"
          >
            <IoEyeOutline size={16} />
          </button>
        </div>
        <div className="grid aspect-square place-items-center">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-36 w-36 object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="absolute w-full bottom-3 left-0 right-0 mx-auto bg-black text-white px-3 py-2 text-sm rounded
                     opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
          aria-label={`Add ${title} to cart`}
        >
          {ctaLabel}
        </button>
      </div>

      <h3 className="mt-3 text-base font-semibold text-black">{title}</h3>

      <p className="mt-2 text-red-500">
        ${newPrice}
        {oldPrice && (
          <span className="ml-3 text-gray-400 line-through">${oldPrice}</span>
        )}
      </p>

      {showRating && (
        <div className="mt-2 flex items-center gap-2 text-gray-500 text-sm">
          <StarRating rating={rating} />
          <span>({reviews})</span>
        </div>
      )}

      {Array.isArray(colors) && colors.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          {colors.map((c) => (
            <button
              key={c}
              aria-label={`Choose color ${c}`}
              className="h-4 w-4 rounded-full ring-1 ring-gray-300"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </article>
  );
}
