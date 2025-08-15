import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export type SliderProps = {
  list: string[],
}
export function Slider({ list }: SliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y, Keyboard]}
      loop
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      className="hero-swiper w-full"
      aria-roledescription="carousel"
      aria-label="Promotions"
    >
      {list.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[320px] lg:h-[380px]">
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="block h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
