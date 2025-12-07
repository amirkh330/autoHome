import {
  Autoplay,
  Navigation,
  Pagination
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import "swiper/css";
import "swiper/swiper-bundle.css";

const Carousel = ({
  images,
  items,
}: {
  images?: string[];
  items?: React.ReactNode[];
}) => {
  return (
    <Swiper
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      slidesPerView={1}
      centeredSlides={true}
      speed={500}
      style={{ margin: 0, height: "140px" }}
      spaceBetween={16}
      centeredSlidesBounds
      slidesPerGroup={1}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {images?.map((item, index) => {
        return (
          <SwiperSlide key={index} style={{ margin: 0 }}>
            <img
              src={item}
              style={{ width: "240", height: "240px", objectFit: "cover" }}
            />
          </SwiperSlide>
        );
      })}
      {items?.map((item, index) => {
        return (
          <SwiperSlide key={index} style={{ margin: 0 }}>
            {item}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
