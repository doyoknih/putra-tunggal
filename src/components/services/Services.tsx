"use client";

import { dataServices } from "@/lib/data";
import React from "react";
import ServicesCard from "./ServiceCard";

// swiper
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Services = () => {
  return (
    <div className="ContainerY flex flex-col">
      <p className="titleSection mb-10 text-center">Pelayanan Putra Tunggal</p>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={true}
        breakpoints={{
          // Untuk layar lebih besar dari 1200px (desktop besar)
          1200: {
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
          // Untuk layar lebih besar dari 992px (desktop medium)
          992: {
            slidesPerView: 3.5,
            spaceBetween: 30,
          },
          // Untuk layar lebih besar dari 768px (tablet)
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
        }}
        spaceBetween={40}
        modules={[Autoplay]}
        style={{ paddingBottom: "10px" }}
      >
        {dataServices.map((item, index) => (
          <SwiperSlide key={index}>
            <ServicesCard img={item.img} title={item.title} desc={item.desc} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
