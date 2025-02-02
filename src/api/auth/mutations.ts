"use client";

import { useMutation } from "@tanstack/react-query";
import { TypeBodyLogin } from "./types";
import { fetchAuth, fetchLogout } from "./fetcher";
import { useRouter } from "next/navigation";

type MUTATION_TYPE =
  | { type: "login"; body: TypeBodyLogin }
  | { type: "regsiter"; body: any }
  | { type: "logout"; body: "" };

const useMutationAuth = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["auth"],
    mutationFn: ({ type, body }: MUTATION_TYPE) => {
      switch (type) {
        case "login":
          return fetchAuth({
            params: "login",
            body,
          });
        case "regsiter":
          return fetchAuth({
            params: "register",
            body,
          });
        case "logout":
          return fetchLogout();
      }
    },
    onSuccess: (res) => {
      if (res.status === 400) {
        alert(res.message);
      } else {
        router.push("/login");
      }
    },
  });

  return {
    ...mutation,
    serviceAuth: mutation.mutateAsync,
  };
};

export { useMutationAuth };
