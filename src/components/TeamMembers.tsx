import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TEAMMEMBERS } from "../data/TeamMembers";
import TeamCard from "./TeamCard";

export default function TeamMembers() {
  return (
    <section className="page-container  w-full  mt-10 px-4 ">
      <div>
        <Swiper
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
