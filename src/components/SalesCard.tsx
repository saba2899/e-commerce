// src/components/SalesCard.tsx
import { SwiperSlide } from "swiper/react";
import ProductSlide from "./ProductSlide";
import { PRODUCTS_MOCK } from "../MOCK/PRODUCTS_MOCK";
import Card from "./Card";
import SalesTime from "./SalesTime";

export default function SalesCard() {
  return (
    <ProductSlide
      className="page-container"
      items={PRODUCTS_MOCK}
      renderItem={(p) => (
        <SwiperSlide key={p.id}>
          <Card product={p} />
        </SwiperSlide>
      )}
      titleSlot={<SalesTime />}
      showArrows={true}
    />
  );
}
