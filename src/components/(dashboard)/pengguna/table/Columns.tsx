import { ColumnDef } from "@tanstack/react-table";
import { TypeUser } from "@/api/user/types";
import { formatIDR } from "@/lib/format";
import ActionButtons from "./ActionButtons";

export const Columns: ColumnDef<TypeUser>[] = [
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
    accessorKey: "service",
    header: "Harga",
    cell: ({ row }) => {
      const role = row.original.role?.role;
      const service = row.original.Service; // Mengambil array Service
      if (role === "Dokter" && service && service.length > 0) {
        const harga = service.map((item) => item.harga).join(", "); // Gabungkan semua harga jika ada lebih dari satu service
        return <p>{formatIDR(Number(harga))}</p>;
      }
      return <p>-</p>; // Tampilkan tanda "-" jika bukan Dokter atau tidak ada harga
    },
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
