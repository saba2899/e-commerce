import { SwiperSlide } from "swiper/react";
import ProductSlide from "./ProductSlide";
import SectionTitle from "./SectionTitle";
import Tag from "./Tag";
import Card from "./Card";
import Button from "./Button";
import { useEffect, useState } from "react";
import type { Product } from "../types/productCard";

export default function BestProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setItems(data.slice(0, 4));
      } catch (e) {
        console.error(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const skeletonItems: Product[] = Array.from({ length: 4 }).map((_, i) => ({
    id: -1 - i,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  }));

  return (
    <div className="flex flex-col gap-4 mt-20 page-container">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <Tag> This Month</Tag>
          <SectionTitle>Best Selling Products</SectionTitle>
        </div>
        <Button className="w-40 bg-red-400 text-white hover:bg-red-500">
          View All
        </Button>
      </div>

      <ProductSlide
        items={loading ? skeletonItems : items}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            {loading ? (
              <div className="h-60 rounded-lg bg-gray-100 animate-pulse" />
            ) : (
              <Card product={product as Product} />
            )}
          </SwiperSlide>
        )}
      />
    </div>
  );
}
