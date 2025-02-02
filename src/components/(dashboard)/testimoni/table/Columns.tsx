"use client";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { TypeTestimoni } from "@/api/testimoni/types";
import { TypeUser } from "@/api/user/types";

export const columns: ColumnDef<TypeTestimoni>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue("user") as TypeUser; // Pastikan kita melakukan casting ke TypeUser
      const imageUrl = user?.foto;

      // Jika imageUrl ada dan tidak kosong, render Image, jika tidak, jangan render apa-apa
      if (!imageUrl || imageUrl === "") {
        return null; // Tidak merender gambar jika tidak ada
      }

      return (
        <div className="flex items-center gap-2">
          <div className="min-w-16 w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={imageUrl as string}
              alt="Article image"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <p>{user?.namaLengkap}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "testimoni",
    header: "Testimoni",
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const item = row.original;
      const itemId = row.original.id;
      return <ActionButtons item={item} itemId={itemId} />;
    },
  },
];
