import { SwiperSlide } from "swiper/react";
import { BEST_PRODUCTS_MOCK } from "../data/bestCard";
import ProductSlide from "./ProductSlide";
import SectionTitle from "./SectionTitle";
import Tag from "./Tag";
import Card from "./Card";
import Button from "./Button";

export default function BestProducts() {
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
        items={BEST_PRODUCTS_MOCK}
        renderItem={(product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        )}
      />
    </div>
  );
}
