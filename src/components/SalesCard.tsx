import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { ProductSlide, Card, SalesTime } from "../components";
import type { Product } from "../types/productCard";

export function SalesCard() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setItems(data.slice(0, 20));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const skeletonItems: Product[] = Array.from({ length: 20 }).map((_, i) => ({
    id: -1 - i,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  }));

  if (loading) {
    return (
      <ProductSlide
        className="page-container"
        items={skeletonItems}
        renderItem={(p) => (
          <SwiperSlide key={String(p.id)}>
            <div className="bg-gray-100 rounded-lg h-60 animate-pulse" />
          </SwiperSlide>
        )}
        titleSlot={<SalesTime />}
        showArrows
      />
    );
  }

  return (
    <ProductSlide
      className="page-container"
      items={items}
      renderItem={(p) => (
        <SwiperSlide key={String(p.id)}>
          {(() => {
            const oldPrice = Number((p.price * 1.25).toFixed(2));
            const discountPercent = 25;
            const discountedProduct = {
              ...p,
              price: Number((p.price * 0.75).toFixed(2)),
            } as Product;
            return (
              <Card
                product={discountedProduct}
                oldPrice={oldPrice}
                discountPercent={discountPercent}
              />
            );
          })()}
        </SwiperSlide>
      )}
      titleSlot={<SalesTime />}
      showArrows
    />
  );
}
