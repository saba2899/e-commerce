import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

type ArrowProps = {
  swiperRef: React.RefObject<SwiperType | null>;
};

export function Arrow({ swiperRef }: ArrowProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous products"
        className="grid w-10 h-10 transition rounded-full place-items-center ring-1 ring-gray-200 hover:bg-black hover:text-white"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaArrowLeft />
      </button>
      <button
        type="button"
        aria-label="Next products"
        className="grid w-10 h-10 transition rounded-full place-items-center ring-1 ring-gray-200 hover:bg-black hover:text-white"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
