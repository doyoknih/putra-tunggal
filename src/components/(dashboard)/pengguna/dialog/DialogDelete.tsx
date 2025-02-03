"use client";

import React from "react";
import DialogLayout from "../../layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { useMutationUser } from "@/api/user/mutation";
import { Loader } from "lucide-react";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialog);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const { serviceUser, isPending } = useMutationUser();

  const handleDelete = async () => {
    await serviceUser({
      type: "delete",
      id: dialog.data?.id,
    });
    closeDialog();
  };
  return (
    <DialogLayout
      show={dialog.type === "DELETE" && dialog.show}
      onHide={closeDialog}
      titleDelete="Hapus item ini dari User ?"
    >
      <div className="flex items-center justify-center gap-5">
        <Button variant={"outline"} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant={"danger"} onClick={handleDelete}>
          {isPending ? <Loader /> : "Delete"}
        </Button>
      </div>
    </DialogLayout>
  );
};

export default DialogDelete;
