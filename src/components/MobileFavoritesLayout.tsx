import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineStar,
  HiOutlineArrowLeft,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowsUpDown,
} from "react-icons/hi2";
import { useFavorites } from "../context/favorites-context";
import { useCart } from "../context/cart-context";
import type { Product } from "../types/productCard";

export function MobileFavoritesLayout() {
  const navigate = useNavigate();
  const { favorites, count, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setAllProducts(data);
      } catch {
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const items = useMemo(() => {
    if (!allProducts.length) return [] as Product[];
    const ids = new Set(Array.from(favorites.values()));
    const filteredItems = allProducts.filter((p) => ids.has(String(p.id)));

    // Sort items
    return filteredItems.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price":
          return a.price - b.price;
        case "rating":
          return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        default:
          return 0;
      }
    });
  }, [allProducts, favorites, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleViewProduct = (product: Product) => {
    navigate("/productdetails", { state: { product } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveFavorite = (productId: number) => {
    toggleFavorite(productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HiOutlineArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="px-6 py-8">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HiOutlineArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-sm text-gray-500">{count} items saved</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <HiOutlineAdjustmentsHorizontal size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineArrowsUpDown size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
            </div>
            <div className="flex gap-2">
              {[
                { value: "name", label: "Name" },
                { value: "price", label: "Price" },
                { value: "rating", label: "Rating" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    sortBy === option.value
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {items.length === 0 ? (
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                <HiOutlineHeart size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Favorites Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                Start building your wishlist by tapping the heart icon on
                products you love.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-1000 delay-${index * 100} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <HiOutlineTrash size={12} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <HiOutlineStar className="text-yellow-400" size={14} />
                        <span className="text-sm text-gray-600">
                          {product.rating?.rate || 0} (
                          {product.rating?.count || 0})
                        </span>
                      </div>
                      <div className="text-lg font-bold text-red-500 mb-3">
                        ${product.price}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          <HiOutlineEye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          <HiOutlineShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <HiOutlineShoppingCart size={20} />
              View Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
