import type { Product } from "../types/productCard";

import { StarRating, LoginModal } from "../components";

import { cn } from "../utils/cn";

import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

import { useState } from "react";

import { useUser } from "../hooks/useUser";

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
export function Card({
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
        <div className="relative overflow-hidden bg-gray-100 rounded-lg">
          {typeof discountPercent === "number" && discountPercent > 0 && (
            <span className="absolute z-10 px-2 py-1 text-xs text-white bg-red-500 rounded-md left-3 top-3">
              -{discountPercent}%
            </span>
          )}
          <div className="absolute z-10 flex flex-col gap-2 right-3 top-3">
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => {
                if (!user) {
                  setLoginOpen(true);
                  return;
                }
              }}
              className="grid w-8 h-8 transition bg-white rounded-full shadow-sm cursor-pointer place-items-center ring-1 ring-black/5 hover:bg-black hover:text-white"
            >
              <CiHeart size={16} />
            </button>
            <button
              type="button"
              aria-label="View details"
              onClick={() =>
                navigate("/productdetails", { state: { product } })
              }
              className="grid w-8 h-8 transition bg-white rounded-full shadow-sm cursor-pointer place-items-center ring-1 ring-black/5 hover:bg-black hover:text-white"
            >
              <IoEyeOutline size={16} />
            </button>
          </div>
          <div className="grid aspect-square place-items-center">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="object-contain h-36 w-36"
            />
          </div>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="absolute left-0 right-0 w-full px-3 py-2 mx-auto text-sm text-white transition-all duration-200 translate-y-1 bg-black rounded opacity-0 bottom-3 group-hover:opacity-100 group-hover:translate-y-0"
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
