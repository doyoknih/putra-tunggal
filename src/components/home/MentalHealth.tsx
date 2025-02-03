"use client";

import { useQueryArticles } from "@/api/article/queries";
import Image from "next/image";

const MentalHealth = () => {
  const { dataArticles } = useQueryArticles();

  return (
    <div className="Container">
      {dataArticles?.slice(0, 1).map((item, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-2 items-start gap-8 lg:gap-20"
        >
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <p className="titleSection hidden lg:block">{item.title}</p>
            <p>{item.desc}</p>
          </div>
          <div className="order-1 lg:order-2 w-full flex justify-end">
            <p className="titleSection text-center mb-4 lg:hidden">
              {item.title}
            </p>
            <div className="lg:w-[464px] lg:h-[333px] w-full rounded-3xl shadow-md border overflow-hidden">
              {item.image && (
                <Image
                  src={item.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { MentalHealth };
