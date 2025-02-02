"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ButtonMedium } from "../Button";
import Link from "next/link";
import { roleId } from "@/constants/variables";
import { useMutationAuth } from "@/api/auth/mutations";
import { Loader } from "lucide-react";

const FormRegister = () => {
  const [payload, setPayload] = React.useState({
    roleId: roleId!,
    email: "",
    namaLengkap: "",
    alamat: "",
    noTlp: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    password: "",
  });

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { serviceAuth, isPending } = useMutationAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await serviceAuth({
      type: "regsiter",
      body: payload,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-5">
      <div className="flex flex-col gap-2">
        <Input placeholder="Email" name="email" onChange={onInputChange} />
        <Input
          placeholder="Nama Lengkap"
          type="text"
          name="namaLengkap"
          onChange={onInputChange}
        />
        <textarea
          placeholder="Alamat"
          name="alamat"
          onChange={onInputChange}
          className="rounded-lg border-2 border-primary/50 p-2 text-sm outline-none"
        ></textarea>
        <Input
          placeholder="Nomer Telepon"
          type="number"
          name="noTlp"
          onChange={onInputChange}
        />
        <Input
          placeholder="Kata Sandi"
          type="password"
          name="password"
          onChange={onInputChange}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm">Jenis Kelamin</p>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="jenis_kelamin"
              value={"L"}
              onChange={onInputChange}
            />
            <label className="text-sm">Laki - laki</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="jenis_kelamin"
              value={"P"}
              onChange={onInputChange}
            />
            <label className="text-sm">Perempuan</label>
          </div>
        </div>
        <div className="flex items-center gap-5 justify-between">
          <p className="text-sm text-nowrap">Tanggal Lahir</p>
          <input
            type="date"
            className="rounded-lg border-2 border-primary/50 px-2 py-1 text-sm"
            name="tanggal_lahir"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="flex items-start gap-2">
        <input type="checkbox" required />
        <p className="text-xs text-black/70">
          Dengan mendaftar, saya bersedia memberikan informasi yang benar dan
          menyetujui penggunaan data saya sesuai dengan syarat dan
          ketentuan yang berlaku.
        </p>
      </div>
      <ButtonMedium className="bg-red text-white flex justify-center items-center">
        {isPending ? <Loader /> : "Daftar"}
      </ButtonMedium>
      <p className="text-sm">
        Sudah Punya Akun?{" "}
        <Link href="/login" className="font-bold text-primary">
          Login
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
