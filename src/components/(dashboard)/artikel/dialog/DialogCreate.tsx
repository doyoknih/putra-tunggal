"use client";

import React from "react";
import DialogLayout from "../../layout/DialogLayout";
import { storeDialog } from "@/store/dialog";
import { useAtom } from "jotai";
import Image from "next/image";
import useImagePreview from "@/hooks/useImagePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/api/upload/fetcher";
import { TypeArticle } from "@/api/article/types";
import { useMutationArticle } from "@/api/article/mutation";
import { imageURL } from "@/constants/variables";

const DialogCreate = () => {
  const [dialog, setDialog] = useAtom(storeDialog);
  const { previewUrl, setPreviewUrl, handleImageChange } = useImagePreview();
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const imageSrc = previewUrl || dialog.data?.image || "";

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
    setPreviewUrl("");
    setImageFile(null);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = dialog.data?.image ?? null;

    if (imageFile) {
      const allowedTypes = ["image/png", "image/jpeg"];
      const maxSize = 1 * 1024 * 1024;

      if (!allowedTypes.includes(imageFile.type)) {
        alert("Hanya file PNG dan JPG yang diperbolehkan.");
        return;
      }

      if (imageFile.size > maxSize) {
        alert("Ukuran file maksimal 1MB.");
        return;
      }

      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadResponse = await uploadImage(formData);
        if (uploadResponse?.data) {
          imageUrl = `${imageURL}/${uploadResponse.data.id}`;
        }
      } catch (error) {
        console.error("Gagal mengupload gambar:", error);
        return; // Hentikan eksekusi jika upload gagal
      }
    }

    const payloadArticle: TypeArticle = {
      image: imageUrl,
      title: dialog.data?.title ?? "",
      desc: dialog.data?.desc ?? 0,
      date: dialog.data?.date ?? "",
    };

    try {
      if (dialog.type === "CREATE") {
        // Call create gallery API
        await serviceArticle({
          type: "create",
          body: payloadArticle,
        });
        closeDialog();
      } else {
        // Call update gallery API
        await serviceArticle({
          type: "update",
          body: payloadArticle,
          id: dialog.data?.id,
        });
        closeDialog();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={dialog.type === "CREATE" ? "Tambah Artikel" : "Update Artikel"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="w-full h-52 rounded-xl border bg-white shadow-1 overflow-hidden mb-2">
          {previewUrl || dialog.data?.image ? (
            <Image
              src={imageSrc}
              alt="Preview"
              width={0}
              height={0}
              sizes="100vw"
            />
          ) : null}
        </div>
        <Input
          type="file"
          name="image"
          onChange={(e) => {
            handleImageChange(e); // Update preview
            const file = e.target.files?.[0];
            setImageFile(file ?? null); // Set file for upload
          }}
          className="max-w-72"
        />
        <div className="flex flex-col gap-1">
          <p>Judul</p>
          <Input
            type="text"
            placeholder="Title"
            value={dialog.data?.title ?? ""}
            onChange={onInputChange}
            name="title"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>Deskripsi</p>
          <textarea
            name="desc"
            id=""
            value={dialog.data?.desc ?? ""}
            onChange={onInputChange}
            className="h-52 outline-none p-2 border rounded-md text-sm w-full"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <p>Tanggal</p>
          <input
            type="date"
            onChange={onInputChange}
            name="date"
            value={dialog.data?.date ?? ""}
            className="border text-sm shadow-sm rounded-md overflow-hidden p-1 outline-none"
          />
        </div>
        <Button type="submit">
          {dialog.type === "CREATE" ? "Tambah Artikel" : "Simpan Perubahan"}
        </Button>
      </form>
    </DialogLayout>
  );
};

export default DialogCreate;
