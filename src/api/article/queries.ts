"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticle } from "./fetcher";
import { TypeArticle } from "./types";
import { ApiResponse } from "../_global/ApiResponse";

const useQueryArticles = () => {
  const query = useQuery<ApiResponse<TypeArticle[]>>({
    queryKey: ["articles"],
    queryFn: () => getArticle(),
  });

  return {
    dataArticles: query.data?.data,
    ...query,
  };
};

export { useQueryArticles };
