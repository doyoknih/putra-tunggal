"use client";

import { useQuery } from "@tanstack/react-query";
import { getHistory } from "./fetcher";
import { TypeHistory } from "./types";
import { ApiResponse } from "../_global/ApiResponse";

const useQueryHistories = () => {
  const query = useQuery<ApiResponse<TypeHistory[]>>({
    queryKey: ["history"],
    queryFn: () => getHistory(),
  });

  return {
    dataHistories: query.data?.data,
    ...query,
  };
};

export { useQueryHistories };
