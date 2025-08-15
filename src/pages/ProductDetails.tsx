import type { ProductCard } from "../types/productCard";

import { useLocation } from "react-router";
import { SwiperSlide } from "swiper/react";

import { ProductSlide, Card, Thumbnail } from "../components";

import { BEST_PRODUCTS_MOCK } from "../MOCK/BEST_CARD_MOCK";

export function ProductDetails() {
  const { state } = useLocation();
  const product: ProductCard | undefined = state?.product as
    | ProductCard
    | undefined;
  return (
    <>
      <Thumbnail product={product} />

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
