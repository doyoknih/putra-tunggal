import { useMutation } from "@tanstack/react-query";
import { TypeArticle } from "./types";
import { createArticle, updateArticle, deleteArticle } from "./fetcher";
import { useQueryArticles } from "./queries";

interface MUTATION_TYPE {
  type: "create" | "update" | "delete";
  body?: TypeArticle;
  id?: string;
}

const useMutationArticle = () => {
  const { refetch } = useQueryArticles();
  const mutation = useMutation({
    mutationKey: ["article mutation"],
    mutationFn: ({ body, type, id }: MUTATION_TYPE) => {
      switch (type) {
        case "create":
          return createArticle(body);
        case "update":
          return updateArticle({ body, id });
        case "delete":
          return deleteArticle(id!);
      }
    },
    onSuccess: () => {
      refetch();
    },
  });
  return {
    serviceArticle: mutation.mutateAsync,
    ...mutation,
  };
};

export { useMutationArticle };
