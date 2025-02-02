import Image from "next/image";
import React, { FC } from "react";
import psikologIMG from "@/assets/person-empty.png";
import { FaIdCard, FaJoget } from "react-icons/fa";
import { calculateAge, formatIDR } from "@/lib/format";
import { MdCastForEducation } from "react-icons/md";
import { ServiceType } from "@/interface/service.interface";

const ProfilePsikolog: FC<{ service: ServiceType }> = ({ service }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="col-span-1 rounded-xl overflow-hidden h-48 md:h-64 lg:h-full">
        <Image
          src={service.dokter.foto ?? psikologIMG}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="col-span-1 flex flex-col gap-5">
        <div className="flex flex-col items-start gap-2">
          <p className="titleContent">{service.dokter.namaLengkap}</p>
          <p>{service.namaService}</p>
          <div className="flex items-center gap-3 py-1 px-2 bg-primary rounded">
            <FaJoget className="w-5 h-5 text-white" />
            <p className="text-white text-sm">
              {calculateAge(service?.dokter?.tanggal_lahir!)} Tahun
            </p>
          </div>
        </div>
        <div className="bg-red/20 w-full rounded-xl px-2 py-4">
          <p className="titleContent">{formatIDR(service.harga)}</p>
        </div>
        <div className="flex items-start gap-2">
          <FaIdCard />
          <div>
            <p className="font-semibold">Nomor STR</p>
            <p>{service?.dokter?.str}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePsikolog;
