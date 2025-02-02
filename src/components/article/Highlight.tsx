"use client";

// swiper
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { dataHighlightArticle } from "@/data/artikel";

const HighlightArticle = () => {
  return (
    <div className="Container">
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="bg-white border rounded-xl shadow-md"
      >
        {dataHighlightArticle.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="grid md:grid-cols-2 h-[343px]">
              <div className="col-span-1 flex flex-col justify-center text-center md:text-start gap-2 px-10">
                <p className="titleHighlight">{item.title}</p>
                <p className="text-xs md:text-sm text-primary/70 leading-6">
                  {item.desc}
                </p>
              </div>
              <div className="col-span-1 mx-auto flex justify-center items-center">
                <Image
                  src={item.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 md:h-3/4 lg:h-full lg:w-10/12 mx-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HighlightArticle;
