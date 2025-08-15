import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import product1 from "../assets/product1.webp";
import product2 from "../assets/product2.webp";
import product3 from "../assets/product3.webp";
import product4 from "../assets/product4.webp";
import product5 from "../assets/product5.webp";

const slides = [product1, product2, product3, product4, product5];

export function Slider() {
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
      {slides.map((src, i) => (
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
