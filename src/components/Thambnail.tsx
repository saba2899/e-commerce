import type { Product } from "../types/productCard";
import { StarRating } from "../components";
import { useMemo, useState, useEffect } from "react";

export function Thambnail({ product }: { product?: Product }) {
  const images = useMemo<string[]>(() => {
    if (!product?.image) return new Array(4).fill("");
    return [product.image, product.image, product.image, product.image];
  }, [product?.image]);

  const [selectedImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);

  // Scroll to top when product changes
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

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
    <div className="flex justify-center gap-5 mt-20 page-container">
      <div className="flex items-stretch w-full gap-5">
        {/* <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImageIdx(i)}
              className={`h-24 w-24 rounded-md bg-gray-100 grid place-items-center ring-1 ring-black/5 ${
                selectedImageIdx === i ? "outline-2 outline-black/20" : ""
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
                <div className="w-20 h-20 bg-gray-200 rounded" />
              )}
            </button>
          ))}
        </div> */}

        <div
          className="grid bg-gray-100 rounded-md place-items-center"
          style={{ width: 560, height: 520 }}
        >
          {images[selectedImageIdx] ? (
            <img
              src={images[selectedImageIdx]}
              alt={product?.title}
              className="object-contain max-h-[460px]"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-2xl font-semibold">
          {product?.title ?? "Product name"}
        </h1>
        {typeof product?.rating?.rate === "number" && (
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <StarRating rating={product.rating.rate} size="md" />
            {typeof product.rating.count === "number" && (
              <span className="text-sm">({product.rating.count} reviews)</span>
            )}
          </div>
        )}
        {typeof product?.price === "number" && (
          <p className="mt-3 text-2xl font-semibold">
            ${Number(product.price.toFixed(2))}
          </p>
        )}

        {product?.description && (
          <>
            <hr className="my-4" />
            <p className="text-sm text-gray-700 max-w-prose">
              {product.description}
            </p>
          </>
        )}

        <div className="flex items-center gap-4 mt-5">
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

        <div className="flex items-center gap-3 mt-4">
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
            className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Buy Now
          </button>
          <button className="p-2 border rounded" aria-label="Add to wishlist">
            ❤
          </button>
        </div>

        <div className="p-4 mt-5 text-sm border rounded">
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
