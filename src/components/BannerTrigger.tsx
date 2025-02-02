"use client";

import React from "react";

// image
import bannerTriggerIMG from "@/assets/bannerTrigger.png";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { MakePromise } from "./makePromise/MakePromise";

export const BannerTrigger = ({
  refBannerTrigger,
}: {
  refBannerTrigger: any;
}) => {
  return (
    <div id="bannerTrigger" ref={refBannerTrigger} className="ContainerX">
      <div className="relative bg-white shadow-md shadow-black/25 border rounded-3xl p-10 md:p-16 lg:p-20 flex flex-col gap-10 items-center justify-between h-96">
        <div className="flex flex-col gap-5 text-center z-20">
          <p>
            Kesehatan mental sama pentingnya dengan kesehatan fisik. Jangan ragu
            untuk berkonsultasi dengan psikolog. Dapatkan dukungan yang Anda
            butuhkan untuk menjalani hidup yang lebih baik.
          </p>
          <p className="titleHighlight">Ayo Nikmati Layanan Kami!</p>
        </div>
        <Dialog>
          <DialogTrigger className="animate-zoom-in-out bg-red text-white z-20 text-sm rounded-full font-bold shadow py-2 px-6 md:py-3 md:px-12">
            BUAT JANJI SEKARANG
          </DialogTrigger>
          <DialogContent>
            <DialogTitle />
            <MakePromise />
          </DialogContent>
        </Dialog>
        <div className="absolute bottom-5 lg:right-5 w-full flex justify-center lg:justify-end z-10">
          <Image
            src={bannerTriggerIMG}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-52"
          />
        </div>
      </div>
    </div>
  );
};
