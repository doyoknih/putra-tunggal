"use client";

import Breadcrumb from "@/components/(dashboard)/_global/Breadcrumb";
import { DataTable } from "@/components/(dashboard)/artikel/table/DataTable";
import React from "react";
import { columns } from "@/components/(dashboard)/artikel/table/Columns";
import DialogDelete from "@/components/(dashboard)/artikel/dialog/DialogDelete";
import DialogCreate from "@/components/(dashboard)/artikel/dialog/DialogCreate";
import { useSetAtom } from "jotai";
import { storeDialog } from "@/store/dialog";
import { useQueryArticles } from "@/api/article/queries";

const Article = () => {
  const setDialog = useSetAtom(storeDialog);
  const { dataArticles } = useQueryArticles();
  return (
    <>
      <Breadcrumb
        pageName="Artikel"
        onClick={() => {
          setDialog({
            type: "CREATE",
            show: true,
            data: null,
          });
        }}
      />
      <DataTable columns={columns} data={dataArticles ?? []} />
      <DialogDelete />
      <DialogCreate />
    </>
  );
};

export default Article;
