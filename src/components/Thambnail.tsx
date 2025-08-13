import type { ProductCard } from "../types/productCard";
import StarRating from "./StarRating";
import { useMemo, useState } from "react";

export default function Thambnail({ product }: { product?: ProductCard }) {
  const images = useMemo<string[]>(() => {
    if (!product?.image) return new Array(4).fill("");
    return [product.image, product.image, product.image, product.image];
  }, [product?.image]);

  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [quantity, setQuantity] = useState<number>(2);

  const increase = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrease = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleBuyNow = () => {
    const summary = {
      id: product?.id,
      title: product?.title,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    alert(`Buying now: ${JSON.stringify(summary)}`);
  };

  return (
    <div className="flex justify-center gap-5 page-container mt-20">
      <div className="flex gap-5 w-full items-stretch">
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImageIdx(i)}
              className={`h-24 w-24 rounded-md bg-gray-100 grid place-items-center ring-1 ring-black/5 ${
                selectedImageIdx === i
                  ? "outline outline-2 outline-black/20"
                  : ""
              }`}
              aria-label={`Select image ${i + 1}`}
            >
              {src ? (
                <img
                  src={src}
                  alt={`${product?.title ?? "Product"} ${i + 1}`}
                  className="object-contain max-h-20"
                />
              ) : (
                <div className="bg-gray-200 h-20 w-20 rounded" />
              )}
            </button>
          ))}
        </div>

        <div
          className="rounded-md bg-gray-100 grid place-items-center"
          style={{ width: 560, height: 520 }}
        >
          {images[selectedImageIdx] ? (
            <img
              src={images[selectedImageIdx]}
              alt={product?.title}
              className="object-contain max-h-[460px]"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full" />
          )}
        </div>
      </div>

      <div className="w-full">
        <h1 className="font-semibold text-2xl">
          {product?.title ?? "Product name"}
        </h1>
        {typeof product?.rating === "number" && (
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <StarRating rating={product.rating} size="md" />
            {typeof product.reviews === "number" && (
              <span className="text-sm">({product.reviews} reviews)</span>
            )}
          </div>
        )}
        {(product?.newPrice || product?.oldPrice) && (
          <p className="mt-3 text-2xl font-semibold">
            {product?.newPrice ? `$${product.newPrice}` : null}
            {product?.oldPrice ? (
              <span className="ml-3 text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            ) : null}
          </p>
        )}
        {Array.isArray(product?.colors) && product?.colors?.length ? (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Colours:</p>
            <div className="flex items-center gap-2">
              {product!.colors!.map((c) => (
                <button
                  type="button"
                  key={c}
                  aria-label={`Choose color ${c}`}
                  onClick={() => setSelectedColor(c)}
                  className={`h-5 w-5 rounded-full ring-1 ${
                    selectedColor === c ? "ring-black" : "ring-gray-300"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {product?.description && (
          <>
            <hr className="my-4" />
            <p className="text-sm text-gray-700 max-w-prose">
              {product.description}
            </p>
          </>
        )}

        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Size:</span>
            {(["XS", "S", "M", "L", "XL"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`h-8 w-8 grid place-items-center text-sm rounded border transition ${
                  selectedSize === s
                    ? "bg-black text-white border-black"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center border rounded">
            <button
              type="button"
              className="px-3 py-2"
              onClick={decrease}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 select-none" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="px-3 py-2"
              onClick={increase}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleBuyNow}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Buy Now
          </button>
          <button className="p-2 rounded border" aria-label="Add to wishlist">
            ❤
          </button>
        </div>

        <div className="mt-5 border rounded p-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="font-medium">Free Delivery</span>
            <span className="text-gray-500">
              Enter your postal code for Delivery Availability
            </span>
          </div>
          <hr className="my-3" />
          <div className="flex items-start gap-3">
            <span className="font-medium">Return Delivery</span>
            <span className="text-gray-500">
              Free 30 Days Delivery Returns. Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
