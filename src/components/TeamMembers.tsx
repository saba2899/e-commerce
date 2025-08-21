import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TEAMMEMBERS } from "../data/TeamMembers";
import TeamCard from "./TeamCard";

export default function TeamMembers() {
  return (
    <section className="w-full px-4 mt-10 page-container ">
      <div>
        <Swiper
          className="hero-swiper"
          slidesPerView={3}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {TEAMMEMBERS.map((m) => (
            <SwiperSlide key={m.id} className="mb-20">
              <TeamCard card={m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
