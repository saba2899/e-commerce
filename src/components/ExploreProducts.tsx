import { SwiperSlide } from "swiper/react";
import ProductSlide from "./ProductSlide";
import Card from "./Card";
import { EXPLORE_PRODUCTS_MOCK } from "../data/Explore";
import ExploreTitle from "./ExploreTitle";

export default function ExploreProducts() {
  return (
    <div className="flex flex-col gap-4 mt-20 page-container">
      <ExploreTitle />

      <ProductSlide
        showArrows={true}
        items={EXPLORE_PRODUCTS_MOCK.slice(0, 4)}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        )}
      />

      <ProductSlide
        showArrows={false}
        items={EXPLORE_PRODUCTS_MOCK.slice(4, 8)}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        )}
        className="mt-6"
      />
    </div>
  );
}
