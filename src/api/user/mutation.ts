import { useMutation } from "@tanstack/react-query";
import { TypeUser } from "./types";
import { updateUser, deleteUser } from "./fetcher";
import { useQueryUsers } from "./queries";

interface MUTATION_TYPE {
  type: "update" | "delete";
  body?: TypeUser;
  id?: string;
}

const useMutationUser = () => {
  const { refetch } = useQueryUsers();
  const mutation = useMutation({
    mutationKey: ["user mutation"],
    mutationFn: ({ body, type, id }: MUTATION_TYPE) => {
      switch (type) {
        case "update":
          return updateUser({ body, id });
        case "delete":
          return deleteUser(id as string);
      }
    },
    onSuccess: (res) => {
      if (res.status === 400) {
        alert(res.message);
      } else {
        refetch();
      }
    },
  });
  return {
    serviceUser: mutation.mutateAsync,
    ...mutation,
  };
};

export { useMutationUser };
