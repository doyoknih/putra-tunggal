"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile, getRole, getUserById, getUsers } from "./fetcher";
import { TypeRole, TypeUser } from "./types";
import { ApiResponse } from "../_global/ApiResponse";
import { useParams } from "next/navigation";

const useQueryRoles = () => {
  const query = useQuery<ApiResponse<TypeRole[]>>({
    queryKey: ["role"],
    queryFn: () => getRole(),
  });

  return {
    dataRole: query.data?.data,
    ...query,
  };
};
const useQueryProfile = () => {
  const query = useQuery<ApiResponse<TypeUser>>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  return {
    dataProfile: query.data?.data,
    ...query,
  };
};

const useQueryUsers = () => {
  const query = useQuery<ApiResponse<TypeUser[]>>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return {
    dataUsers: query.data?.data,
    ...query,
  };
};

const useQueryDetailUser = () => {
  const { id } = useParams() as { id: string };
  const query = useQuery<ApiResponse<TypeUser>>({
    queryKey: ["detail users", { id }],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  return {
    detailUser: query.data?.data,
    ...query,
  };
};

export { useQueryUsers, useQueryDetailUser, useQueryRoles, useQueryProfile };
