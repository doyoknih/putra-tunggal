"use client";

import React from "react";
import DialogLayout from "@/components/(dashboard)/layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { useMutationOrderOffline } from "@/api/orderOffline/mutation";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialog);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const { serviceOrderOffline } = useMutationOrderOffline();

  const handleDelete = async () => {
    await serviceOrderOffline({
      type: "delete",
      id: dialog.data?.id,
    });
    closeDialog();
  };
  return (
    <DialogLayout
      show={dialog.type === "DELETE" && dialog.show}
      onHide={closeDialog}
      titleDelete="Hapus item ini dari Layanan ?"
    >
      <div className="flex items-center justify-center gap-5">
        <Button variant={"outline"} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant={"danger"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </DialogLayout>
  );
};

export default DialogDelete;
