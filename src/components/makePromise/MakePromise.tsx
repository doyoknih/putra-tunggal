"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutationOrderOffline } from "@/api/orderOffline/mutation";
import { useRouter } from "next/navigation";
import { useQueryServices } from "@/api/services/queries";
import { Input } from "../ui/input";

import dynamic from "next/dynamic";
import { Button } from "../ui/button";
const Maps = dynamic(() => import("@/components/Map"), { ssr: false });

export const MakePromise = () => {
  const { dataServices } = useQueryServices();
  const router = useRouter();
  const [payload, setPayload] = useState({
    time: "",
    dokterId: "",
    serviceId: "",
  });
  const [selectedDokter, setSelectedDokter] = useState<string>("");

  const onValueChange = (value: string, name: string) => {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "serviceId") {
      // Cari dokter berdasarkan serviceId
      const selectedService = dataServices?.find(
        (service) => service.id === value
      );
      if (selectedService) {
        setPayload((prev) => ({
          ...prev,
          dokterId: selectedService.dokterId!,
        }));
        setSelectedDokter(selectedService.dokter?.namaLengkap || ""); // Set nama dokter
      }
    }
  };

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

  const { serviceOrderOffline, isPending } = useMutationOrderOffline();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await serviceOrderOffline({
      type: "create",
      body: payload,
    });

    if (res.message !== "Unauthorized") {
      router.push("/login");
    }

    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <p className="titleContent border-b-2 border-black pb-2">
        Layanan Reservasi
      </p>
      <p className="text-center">
        Anda tidak sendirian, kami ada untuk Anda. Temukan solusi bersama
        psikolog.
      </p>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Layanan</p>
          <Select
            name="serviceId"
            onValueChange={(value) => onValueChange(value, "serviceId")}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih jenis layanan" />
            </SelectTrigger>
            <SelectContent>
              {dataServices?.map((item, index) => (
                <SelectItem key={item.id} value={item.id!}>
                  {item?.namaService}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={selectedDokter} // Menampilkan nama dokter
            readOnly
            placeholder="Nama dokter"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Waktu</p>
            <input
              type="datetime-local"
              className="border text-sm p-2 rounded overflow-hidden"
              onChange={onInputChange}
              name="time"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Lokasi</p>
          <p>
            Jalan Wahid Hasyim 37, Karangklesem, Kec. Purwokerto Sel., Kabupaten
            Banyumas, Jawa Tengah 53144
          </p>
          <div className="bg-white shadow border w-full h-32 rounded-xl overflow-hidden">
            <Maps />
          </div>
        </div>
      </div>
      <Button
        disabled={isPending ? true : false}
        className="bg-red text-white mx-auto"
      >
        {isPending ? "Loading..." : "Buat Janji"}
      </Button>
    </form>
  );
};
