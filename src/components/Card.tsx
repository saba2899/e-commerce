import type { Product } from "../types/productCard";
import StarRating from "./StarRating";
import { cn } from "../utils/cn";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import LoginModal from "./LoginModal";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

type CardProps = {
  product: Product;
  onAddToCart?: (p: Product) => void;
  showRating?: boolean;
  oldPrice?: number;
  discountPercent?: number;
  ctaLabel?: string;
  variant?: "default" | "compact";
  className?: string;
};
export default function Card({
  product,
  onAddToCart,
  showRating = true,
  oldPrice,
  discountPercent,
  ctaLabel = "Add To Cart",
  variant = "default",
  className,
}: CardProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loginOpen, setLoginOpen] = useState(false);
  const title = product.title;
  const image = product.image;
  const newPrice = Number(product.price?.toFixed?.(2) ?? product.price);
  const rating = product.rating?.rate ?? 0;
  const reviews = product.rating?.count ?? 0;

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col rounded-lg p-4",
          variant === "default" ? "p-4" : "p-3",
          className
        )}
      >
        <div className="relative rounded-lg bg-gray-100 overflow-hidden">
          {typeof discountPercent === "number" && discountPercent > 0 && (
            <span className="absolute left-3 top-3 z-10 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
              -{discountPercent}%
            </span>
          )}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => {
                if (!user) {
                  setLoginOpen(true);
                  return;
                }
              }}
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-black hover:text-white transition"
            >
              <CiHeart size={16} />
            </button>
            <button
              type="button"
              aria-label="View details"
              onClick={() =>
                navigate("/productdetails", { state: { product } })
              }
              className="grid h-8 w-8 place-items-center cursor-pointer rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-black hover:text-white transition"
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

        <h3
          className="mt-3 text-base font-semibold text-black leading-6 min-h-[48px] max-h-[48px] overflow-hidden break-words"
          title={title}
        >
          {title}
        </h3>

        <p className="mt-2 text-red-500 min-h-[28px]">
          ${newPrice}
          {typeof oldPrice === "number" && oldPrice > newPrice ? (
            <span className="ml-3 text-gray-400 line-through">${oldPrice}</span>
          ) : null}
        </p>

        {showRating && (
          <div className="mt-2 flex items-center gap-2 text-gray-500 text-sm min-h-[20px]">
            <StarRating rating={rating} />
            <span>({reviews})</span>
          </div>
        )}
      </article>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
