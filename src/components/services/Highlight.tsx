"use client";

import imgBg from "@/assets/highlightService.png";
import Image from "next/image";

// components
import ListPsikolog from "../psikolog/ListPsikolog";

// swiper
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// data
import { carouselServices, service } from "@/lib/data";
import { FC } from "react";

const HighlightService: FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return (
    <div className="Container">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[55%]">
          <Swiper
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2500,
            }}
            modules={[Navigation, Autoplay]}
            className="max-h-[327px] bg-white shadow-md border rounded-xl"
          >
            {carouselServices?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full flex flex-col gap-5 justify-end items-center overflow-hidden px-5 pt-5 md:px-20 lg:px-10 text-center">
                  <p className="text-primary font-medium">{item.desc}</p>
                  <div className="h-36 lg:h-[177px]">
                    <Image
                      src={item.image}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-10 lg:h-96 overflow-y-auto">
            {service?.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-2 mb-5">
                <p className="titleContent">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <ListPsikolog isLogin={isLogin} />
      </div>
    </div>
  );
};

export default HighlightService;
