"use client";

import { useQuery } from "@tanstack/react-query";
import { getServices } from "./fetcher";
import { TypeServices } from "./types";
import { ApiResponse } from "../_global/ApiResponse";

const useQueryServices = () => {
  const query = useQuery<ApiResponse<TypeServices[]>>({
    queryKey: ["Services"],
    queryFn: () => getServices(),
  });

  return {
    dataServices: query.data?.data,
    ...query,
  };
};

export { useQueryServices };
