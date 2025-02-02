"use client";

import React from "react";
import DialogLayout from "../../layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialog);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };
  return (
    <DialogLayout
      show={dialog.type === "DELETE" && dialog.show}
      onHide={closeDialog}
      titleDelete="Hapus item ini dari Testimoni ?"
    >
      <div className="flex items-center justify-center gap-5">
        <Button variant={"outline"} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant={"danger"} onClick={closeDialog}>
          Delete
        </Button>
      </div>
    </DialogLayout>
  );
};

export default DialogDelete;
