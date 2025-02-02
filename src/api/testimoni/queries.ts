"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestimoni } from "./fetcher";
import { TypeTestimoni } from "./types";
import { ApiResponse } from "../_global/ApiResponse";

const useQueryTestomoni = () => {
  const query = useQuery<ApiResponse<TypeTestimoni[]>>({
    queryKey: ["testimoni"],
    queryFn: () => getTestimoni(),
  });

  return {
    dataTestimoni: query.data?.data,
    ...query,
  };
};

export { useQueryTestomoni };
