import { SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import ProductSlide from "../components/ProductSlide";
import Thambnail from "../components/Thambnail";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { Product } from "../types/productCard";

export default function ProductDetails() {
  const { state } = useLocation();
  const product: Product | undefined = state?.product as Product | undefined;

  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setRelated(data.slice(0, 8));
      } catch (e) {
        console.error(e);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const skeletonItems: Product[] = Array.from({ length: 8 }).map((_, i) => ({
    id: -1 - i,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  }));

  return (
    <>
      <Thambnail product={product} />

      <ProductSlide
        className="page-container"
        items={loading ? skeletonItems : related}
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
    </>
  );
}
