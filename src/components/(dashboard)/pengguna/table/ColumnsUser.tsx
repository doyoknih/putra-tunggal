import { ColumnDef } from "@tanstack/react-table";
import { TypeUser } from "@/api/user/types";
import ActionButtons from "./ActionButtons";

export const ColumnsUsers: ColumnDef<TypeUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "namaLengkap",
    header: () => <p className="text-nowrap">Nama Lengkap</p>,
  },
  {
    accessorKey: "noTlp",
    header: () => <p className="text-nowrap">No Telephone</p>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role?.role;
      return <p>{role}</p>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const item = row.original;
      const itemId = row.original.id;

      return <ActionButtons item={item} itemId={itemId ?? ""} />;
    },
  },
];
