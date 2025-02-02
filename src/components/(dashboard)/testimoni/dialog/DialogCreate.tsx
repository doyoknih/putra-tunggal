"use client";

import React from "react";
import DialogLayout from "../../layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutationArticle } from "@/api/article/mutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryUsers } from "@/api/user/queries";

const DialogCreate = () => {
  const [dialog, setDialog] = useAtom(storeDialog);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const onValueChange = (value: string, name: string) => {
    setDialog((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDialog((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const { serviceArticle } = useMutationArticle();
  const mutationArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { dataUsers } = useQueryUsers();

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={dialog.type === "CREATE" ? "Tambah testimoni" : "Update testimoni"}
    >
      <form onSubmit={mutationArticle} className="flex flex-col gap-3">
        <Select
          onValueChange={(value) => onValueChange(value, "userId")}
          value={dialog.data?.userId ?? ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih User" />
          </SelectTrigger>
          <SelectContent>
            {dataUsers?.map((item, index) => (
              <SelectItem key={index} value={item.id!}>
                {item.namaLengkap}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-full flex flex-col gap-1">
          <p>Testimoni</p>
          <textarea
            name="testimoni"
            id=""
            value={dialog.data?.testimoni ?? ""}
            onChange={onInputChange}
            className="h-32 outline-none p-2 border rounded-md text-sm w-full"
          ></textarea>
        </div>

        <Button type="submit">
          {dialog.type === "CREATE" ? "Tambah testimoni" : "Simpan Perubahan"}
        </Button>
      </form>
    </DialogLayout>
  );
};

export default DialogCreate;
