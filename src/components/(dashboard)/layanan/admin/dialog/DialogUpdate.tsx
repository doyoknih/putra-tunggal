"use client";

import React from "react";
import DialogLayout from "@/components/(dashboard)/layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutationOrderOffline } from "@/api/orderOffline/mutation";

const DialogUpdate = () => {
  const [dialog, setDialog] = useAtom(storeDialog);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
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

  const { serviceOrderOffline } = useMutationOrderOffline();
  const mutationArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await serviceOrderOffline({
      type: "update",
      body: {
        time: dialog.data?.time,
      },
      id: dialog.data?.id,
    });
    closeDialog();
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title="Update Jadwal"
    >
      <form onSubmit={mutationArticle} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p>Pasien</p>
          <Input
            type="text"
            value={dialog.data?.user?.namaLengkap ?? ""}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Dokter</p>
          <Input
            type="text"
            value={
              dialog.data?.orderItem?.[0]?.service?.dokter?.namaLengkap ?? ""
            }
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Layanan</p>
          <Input
            type="text"
            value={dialog.data?.orderItem?.[0]?.service?.namaService ?? ""}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Jadwal</p>
          <Input
            type="datetime-local"
            value={dialog.data?.time ?? ""}
            onChange={onInputChange}
            name="time"
            required
          />
        </div>
        <Button type="submit">Simpan Perubahan</Button>
      </form>
    </DialogLayout>
  );
};

export default DialogUpdate;
