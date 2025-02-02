import { useMutation } from "@tanstack/react-query";
import { TypeOrderOffline } from "./types";
import {
  createOrderOffline,
  deleteOrderOffline,
  updateOrderOffline,
} from "./fetcher";
import { useQueryHistories } from "../history/queries";

interface MUTATION_TYPE {
  type: "create" | "update" | "delete";
  body?: TypeOrderOffline;
  id?: string;
}

const useMutationOrderOffline = () => {
  const { refetch } = useQueryHistories();

  const mutation = useMutation({
    mutationKey: ["OrderOffline mutation"],
    mutationFn: ({ body, type, id }: MUTATION_TYPE) => {
      switch (type) {
        case "create":
          return createOrderOffline(body);
        case "update":
          return updateOrderOffline({ body, id });
        case "delete":
          return deleteOrderOffline(id);
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  return {
    serviceOrderOffline: mutation.mutateAsync,
    ...mutation,
  };
};

export { useMutationOrderOffline };
