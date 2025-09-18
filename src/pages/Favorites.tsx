import { HiHeart } from "react-icons/hi2";
import { useFavorites } from "../context/favorites-context";
import { Card, MobileFavoritesLayout } from "../components";
import type { Product } from "../types/productCard";
import { useEffect, useMemo, useState } from "react";

export const Favorites = () => {
  const { favorites, count } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
    return allProducts.filter((p) => ids.has(String(p.id)));
  }, [allProducts, favorites]);

  if (loading) {
    return (
      <>
        {/* Mobile Loading */}
        <div className="sm:hidden">
          <MobileFavoritesLayout />
        </div>

        {/* Desktop Loading */}
        <div className="hidden sm:block py-8 page-container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg h-60 animate-pulse"
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <MobileFavoritesLayout />
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block py-8 page-container">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Wishlist ({count})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center">
            <HiHeart className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <p className="text-gray-600">
              No favorites yet. Save items with the heart.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <Card key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
