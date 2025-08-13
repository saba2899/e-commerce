import { SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import ProductSlide from "../components/ProductSlide";
import { BEST_PRODUCTS_MOCK } from "../data/bestCard";

export default function ProductDetails() {
  return (
    <>
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
