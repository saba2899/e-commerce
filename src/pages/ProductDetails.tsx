import { SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import ProductSlide from "../components/ProductSlide";
import { BEST_PRODUCTS_MOCK } from "../MOCK/BEST_CARD_MOCK";
import Thambnail from "../components/Thambnail";
import { useLocation } from "react-router";
import type { ProductCard } from "../types/productCard";

export default function ProductDetails() {
  const { state } = useLocation();
  const product: ProductCard | undefined = state?.product as
    | ProductCard
    | undefined;
  return (
    <>
      <Thambnail product={product} />

      <ProductSlide
        className="page-container"
        items={BEST_PRODUCTS_MOCK}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        )}
      />
    </>
  );
}
