import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import {
  HiHeart,
  HiOutlineHeart,
  HiMinus,
  HiPlus,
  HiShoppingCart,
  HiArrowLeft,
} from "react-icons/hi2";
import { StarRating } from "./StarRating";
import { useFavorites } from "../context/favorites-context";
import { useCart } from "../context/cart-context";
import type { Product } from "../types/productCard";

interface MobileProductDetailsProps {
  product?: Product;
}

export function MobileProductDetails({ product }: MobileProductDetailsProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);

  // Scroll to top when product changes
  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

  const images = useMemo<string[]>(() => {
    if (!product?.image) return new Array(4).fill("");
    return [product.image, product.image, product.image, product.image];
  }, [product?.image]);

  const isFav = product ? isFavorite(product.id) : false;

  const increase = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrease = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      // Show success feedback
      alert(`Added ${quantity} ${product.title} to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity);
      navigate("/checkout");
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id);
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL"] as const;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <HiArrowLeft size={24} />
            </button>
            <div className="text-lg font-semibold">Product Details</div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="p-4 space-y-4">
          <div className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
          <div className="space-y-3">
            <div className="bg-gray-200 h-6 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-8 w-1/3 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <HiArrowLeft size={24} />
          </button>
          <div className="text-lg font-semibold truncate max-w-48">
            {product.title}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFav ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            {isFav ? <HiHeart size={24} /> : <HiOutlineHeart size={24} />}
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet mobile-pagination-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active mobile-pagination-bullet-active",
          }}
          onSlideChange={(swiper) => {
            // Handle slide change if needed
            console.log("Slide changed to:", swiper.activeIndex);
          }}
          className="mobile-product-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative bg-white">
                <img
                  src={src}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-80 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="bg-white rounded-t-3xl -mt-4 relative z-10 p-6">
        {/* Title and Rating */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          {typeof product.rating?.rate === "number" && (
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating.rate} size="sm" />
              <span className="text-sm text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        {typeof product.price === "number" && (
          <div className="mb-6">
            <span className="text-3xl font-bold text-red-600">
              ${Number(product.price.toFixed(2))}
            </span>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Size</h3>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-xl border-2 transition-all ${
                  selectedSize === size
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Quantity</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-xl">
              <button
                onClick={decrease}
                className="p-3 hover:bg-gray-50 transition-colors"
                disabled={quantity <= 1}
              >
                <HiMinus size={20} />
              </button>
              <span className="px-6 py-3 text-lg font-semibold min-w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="p-3 hover:bg-gray-50 transition-colors"
                disabled={quantity >= 99}
              >
                <HiPlus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleBuyNow}
            className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full border-2 border-red-500 text-red-500 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <HiShoppingCart size={20} />
            Add to Cart
          </button>
        </div>

        {/* Delivery Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-900">Free Delivery</h4>
              <p className="text-sm text-gray-600">
                Enter your postal code for delivery availability
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-900">Return Delivery</h4>
              <p className="text-sm text-gray-600">
                Free 30 days delivery returns. Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
