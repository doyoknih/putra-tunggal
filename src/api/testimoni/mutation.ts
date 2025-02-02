import { useMutation } from "@tanstack/react-query";
import { TypeTestimoni } from "./types";
import { createTestimoni, updateTestimoni, deletetestimoni } from "./fetcher";
import { useQueryTestomoni } from "./queries";

interface MUTATION_TYPE {
  type: "create" | "update" | "delete";
  body?: TypeTestimoni;
  id?: string;
}

const useMutationTestimoni = () => {
  const { refetch } = useQueryTestomoni();
  const mutation = useMutation({
    mutationKey: ["testimoni mutation"],
    mutationFn: ({ body, type, id }: MUTATION_TYPE) => {
      switch (type) {
        case "create":
          return createTestimoni(body);
        case "update":
          return updateTestimoni({ body, id });
        case "delete":
          return deletetestimoni(id as string);
      }
    },
    onSuccess: () => {
      refetch();
    },
  });
  return {
    serviceTestimoni: mutation.mutateAsync,
    ...mutation,
  };
};

export { useMutationTestimoni };
