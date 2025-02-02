"use client";

import Image from "next/image";
import ActionButtons from "./ActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { TypeArticle } from "@/api/article/types";

export const columns: ColumnDef<TypeArticle>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image");

      // Jika imageUrl ada dan tidak kosong, render Image, jika tidak, jangan render apa-apa
      if (!imageUrl || imageUrl === "") {
        return null; // Tidak merender gambar jika tidak ada
      }

      return (
        <Image
          src={imageUrl as string}
          alt="Article image"
          width={0}
          height={0}
          sizes="100vw"
          className="min-w-40 w-40 h-40"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "desc",
    header: "Deskripsi",
    cell: ({ row }) => <p className="line-clamp-3">{row.getValue("desc")}</p>,
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => <p className="text-nowrap">{row.getValue("date")}</p>,
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
