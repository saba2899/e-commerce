import { Swiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperProps } from "swiper/react";
import { A11y } from "swiper/modules";
import { useRef } from "react";
import { cn } from "../utils/cn";
import Arrow from "./Arrow";

import "swiper/css";

type ProductSlideProps<T> = {
  items?: T[];
  renderItem?: (item: T, idx: number) => React.ReactNode;
  children?: React.ReactNode;
  titleSlot?: React.ReactNode;
  showArrows?: boolean;
  swiperProps?: SwiperProps;
  className?: string;
};

export default function ProductSlide<T>({
  items,
  renderItem,
  children,
  titleSlot,
  showArrows = false,
  swiperProps,
  className,
}: ProductSlideProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);
  console.log("hii");

  return (
    <section className={cn("mt-5", className)}>
      <div className="mb-5 flex items-end justify-between">
        <div className="ml-3">{titleSlot}</div>

        {showArrows && <Arrow swiperRef={swiperRef} />}
      </div>

      <Swiper
        modules={[A11y]}
        onSwiper={(s) => (swiperRef.current = s)}
        className="products-swiper"
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        {...swiperProps}
      >
        {children
          ? children
          : items && renderItem
          ? items.map((item, idx) => renderItem(item, idx))
          : null}
      </Swiper>
    </section>
  );
}
