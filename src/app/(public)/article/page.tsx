import Article1 from "@/components/article/Article1";
import Article2 from "@/components/article/Article2";
import FaqArticle from "@/components/article/FaqArticle";
import HighlightArticle from "@/components/article/Highlight";
// import RelatedNews from "@/components/article/RelatedNews";
import React from "react";

const page = () => {
  return (
    <div className="pt-10">
      <HighlightArticle />
      <Article1 />
      <FaqArticle />
      <Article2 />
      {/* <RelatedNews /> */}
    </div>
  );
};

export default page;
