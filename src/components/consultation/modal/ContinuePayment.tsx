import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

// assets
import psikologIMG from "@/assets/person-empty.png";
import { FaJoget } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { formatIDR } from "@/lib/format";
import { ButtonSmall } from "@/components/Button";
import { ServiceType } from "@/interface/service.interface";

const ContinuePayment: FC<{ serviceId: string }> = ({ serviceId }) => {
  const [service, setService] = React.useState<ServiceType | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string | null>(null);

  const clickPay = async () => {
    try {
      setIsloading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: serviceId,
          qty: 1,
        }),
      });
      const data = await res.json();
      setLinkUrl(data.data.redirectUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (linkUrl) return;
    (async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        const data = await res.json();
        setService(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [linkUrl, serviceId]);

  if (!service) {
    return <p>Loading...</p>;
  }

  if (linkUrl) {
    return (
      <div className="w-full h-[500px]">
        <iframe
          src={linkUrl}
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="titleContent w-1/2 mx-auto border-b-2 border-black pb-2 text-center">
        LANJUTKAN KONSULTASI
      </p>
      <div className="grid grid-cols-3 gap-x-5">
        <div className="col-span-1 min-h-40 rounded-3xl overflow-hidden shadow-md border">
          <Image
            src={service.dokter.foto ?? psikologIMG}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-[6px]">
            <p className="font-semibold">{service.dokter.namaLengkap}</p>
            <p>CBT Therapist</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 py-1 px-2 bg-primary rounded">
                <FaJoget className="w-5 h-5 text-white" />
                <p className="text-white text-sm">20 Tahun</p>
              </div>
              <div className="flex items-center gap-3 py-1 px-2 bg-primary rounded">
                <BiLike className="w-5 h-5 text-white" />
                <p className="text-white text-sm">100 %</p>
              </div>
            </div>
          </div>
          <p className="font-semibold">{formatIDR(service.harga)}</p>
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
      <p className="text-center">
        Perjalanan menuju kesembuhan Anda belum selesai. Lanjutkan konsultasi
        sekarang
      </p>
      <ButtonSmall
        className={`${isLoading ? "bg-gray-600" : "bg-red"} text-white ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        onClick={clickPay}
      >
        {isLoading ? "Loading..." : "Lanjutkan Pemabayaran"}
      </ButtonSmall>
    </div>
  );
};

export default ContinuePayment;
