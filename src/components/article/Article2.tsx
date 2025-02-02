"use client";

import { useQueryArticles } from "@/api/article/queries";
import Image from "next/image";

const Article2 = () => {
  const { dataArticles } = useQueryArticles();

  return dataArticles?.slice(2, 3).map((item, index) => (
    <div
      key={index}
      className="ContainerX pb-14 md:pb-16 lg:pb-24 min-h-[340px] mb-10"
    >
      <div className="float-left mr-5 mb-3 w-full h-auto md:w-96 md:max-w-96 lg:min-w-[479px] lg:max-w-[479px] shadow-md border rounded-xl overflow-hidden">
        <Image src={item.image!} alt="" width={0} height={0} sizes="100vw" />
      </div>
      <p className="titleContent text-red mb-3">{item.title}</p>
      <p className="mb-5">{item.desc}</p>
      <p className="text-blue/80">{item.date}</p>
    </div>
  ));
};

export default Article2;
