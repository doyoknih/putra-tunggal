"use client";

import { useQueryArticles } from "@/api/article/queries";

const Article1 = () => {
  const { dataArticles } = useQueryArticles();

  return dataArticles?.slice(1, 2).map((item, index) => (
    <div key={index} className="ContainerX flex flex-col gap-y-5">
      <p className="titleContent">{item.title}</p>
      <p>{item.desc}</p>
    </div>
  ));
};

export default Article1;
