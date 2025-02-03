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
import { TypeUser } from "@/api/user/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutationAuth } from "@/api/auth/mutations";
import { useMutationUser } from "@/api/user/mutation";
import { useQueryProfile, useQueryRoles } from "@/api/user/queries";
import { imageURL } from "@/constants/variables";
import { Loader } from "lucide-react";

const DialogCreate = () => {
  const [dialog, setDialog] = useAtom(storeDialog);
  const { previewUrl, setPreviewUrl, handleImageChange } = useImagePreview();
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const { dataRole } = useQueryRoles();
  const { dataProfile } = useQueryProfile();

  const imageSrc = previewUrl || dialog.data?.foto || "";

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
    setPreviewUrl("");
    setImageFile(null);
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

    setDialog((prev) => {
      if (name === "namaService" || name === "harga") {
        return {
          ...prev,
          data: {
            ...prev.data,
            Service: [
              {
                ...prev.data?.Service?.[0],
                [name]: value,
              },
            ],
          },
        };
      }

      return {
        ...prev,
        data: {
          ...prev.data,
          [name]: value,
        },
      };
    });
  };

  const { refetch } = useQueryProfile();
  const { serviceAuth } = useMutationAuth();
  const { serviceUser, isPending } = useMutationUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = dialog.data?.foto ?? null; // Default gunakan foto yang ada

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

    // Pastikan harga adalah integer
    let harga = dialog.data?.harga ?? null; // Mengambil harga dari dialog, misalnya
    if (harga !== null) {
      harga = parseInt(harga.toString(), 10); // Konversi menjadi integer
      if (isNaN(harga)) {
        alert("Harga harus berupa angka yang valid.");
        return;
      }
    }

    const payloadUser: TypeUser = {
      roleId: dialog.data?.roleId ?? null,
      foto: imageUrl,
      email: dialog.data?.email ?? null,
      namaLengkap: dialog.data?.namaLengkap ?? null,
      noTlp: dialog.data?.noTlp ?? null,
      jenis_kelamin: dialog.data?.jenis_kelamin ?? null,
      tanggal_lahir: dialog.data?.tanggal_lahir ?? null,
      alamat: dialog.data?.alamat ?? null,
      str: dialog?.data.str ?? null,
      password: dialog.data?.password ?? null,
      Service: dialog.data?.Service
        ? dialog.data.Service.map((service: any) => ({
            ...service,
            harga: parseInt(service.harga, 10) || 0, // Pastikan harga adalah integer
          }))
        : [],
    };

    try {
      if (dialog.type === "CREATE") {
        const res = await serviceAuth({
          type: "regsiter",
          body: payloadUser,
        });
        if (res.status !== 400) {
          closeDialog();
          refetch();
        }
      } else {
        const res = await serviceUser({
          type: "update",
          body: payloadUser,
          id: dialog.data?.id,
        });
        if (res.status !== 400) {
          closeDialog();
          refetch();
        }
      }
    } catch (error) {
      console.error("Error saat menjalankan mutation:", error);
    }
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={dialog.type === "CREATE" ? "Tambah Pengguna" : "Update Pengguna"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="h-52 w-52 rounded-full mx-auto border bg-white shadow-1 overflow-hidden mb-2">
          {previewUrl || dialog.data?.foto ? (
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
          className="max-w-72 mx-auto p-1"
        />
        {dataProfile?.role?.role === "Admin" && (
          <div className="flex flex-col gap-1">
            <p>Role</p>
            <Select
              value={dialog.data?.roleId}
              onValueChange={(value) => onValueChange(value, "roleId")}
              required
            >
              <SelectTrigger className="w-full border-2 border-primary/50">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {dataRole?.map((item, index) => (
                  <SelectItem key={index} value={item.id!}>
                    {item.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p>Email</p>
          <Input
            type="email"
            placeholder="Email"
            value={dialog.data?.email ?? ""}
            onChange={onInputChange}
            name="email"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>Nama Lengkap</p>
          <Input
            name="namaLengkap"
            placeholder="Nama Lengkap"
            id=""
            value={dialog.data?.namaLengkap ?? ""}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>No Telephone</p>
          <Input
            type="number"
            name="noTlp"
            placeholder="No Telephone"
            value={dialog.data?.noTlp ?? ""}
            onChange={onInputChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Jenis Kelamin</p>
          <Select
            value={dialog.data?.jenis_kelamin}
            onValueChange={(value) => onValueChange(value, "jenis_kelamin")}
          >
            <SelectTrigger className="w-full border-2 border-primary/50">
              <SelectValue placeholder="Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Laki - laki</SelectItem>
              <SelectItem value="P">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p>Tanggal Lahir</p>
          <input
            type="date"
            onChange={onInputChange}
            name="tanggal_lahir"
            value={dialog.data?.tanggal_lahir ?? ""}
            className="border text-sm shadow-sm rounded-md overflow-hidden p-1 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Alamat</p>
          <textarea
            name="alamat"
            onChange={onInputChange}
            placeholder="Alamat"
            value={dialog.data?.alamat ?? ""}
            className="border h-32 text-sm shadow-sm rounded-md overflow-hidden p-1 outline-none"
          ></textarea>
        </div>
        {dataProfile?.role?.role === "Admin" &&
          dialog.data?.role?.role !== "User" && (
            <>
              <div className="flex flex-col gap-1">
                <p>STR</p>
                <Input
                  type="text"
                  placeholder="Str"
                  value={dialog.data?.str ?? ""}
                  onChange={onInputChange}
                  name="str"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Nama Service</p>
                <Input
                  type="text"
                  placeholder="Nama Service"
                  value={dialog.data?.Service?.[0]?.namaService ?? ""}
                  onChange={onInputChange}
                  name="namaService"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Harga</p>
                <Input
                  type="number"
                  placeholder="Harga"
                  value={dialog.data?.Service?.[0]?.harga ?? ""}
                  onChange={onInputChange}
                  name="harga"
                />
              </div>
            </>
          )}
        <div className="flex flex-col gap-1">
          <p>password</p>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={dialog.data?.password ?? ""}
            onChange={onInputChange}
          />
        </div>
        <Button type="submit">
          {isPending ? (
            <Loader />
          ) : dialog.type === "CREATE" ? (
            "Tambah Pengguna"
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </form>
    </DialogLayout>
  );
};

export default DialogCreate;
