import { SwiperSlide } from "swiper/react";
import { ProductSlide, Card, ExploreTitle } from "../components";

import { useEffect, useState } from "react";

import type { Product } from "../types/productCard";

export function ExploreProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const skeletonRow: Product[] = Array.from({ length: 4 }).map((_, i) => ({
    id: -1 - i,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  }));

  const topRow = loading ? skeletonRow : items.slice(0, 4);
  const bottomRow = loading ? skeletonRow : items.slice(4, 8);

  return (
    <div className="flex flex-col gap-4 mt-20 page-container">
      <ExploreTitle />

      <ProductSlide
        showArrows={true}
        items={topRow}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            {loading ? (
              <div className="bg-gray-100 rounded-lg h-60 animate-pulse" />
            ) : (
              <Card product={product as Product} />
            )}
          </SwiperSlide>
        )}
      />

      <ProductSlide
        showArrows={false}
        items={bottomRow}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            {loading ? (
              <div className="bg-gray-100 rounded-lg h-60 animate-pulse" />
            ) : (
              <Card product={product as Product} />
            )}
          </SwiperSlide>
        )}
        className="mt-6"
      />
    </div>
  );
}
