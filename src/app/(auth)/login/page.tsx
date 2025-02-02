import Image from "next/image";
import React from "react";
import { FormLogin } from "@/components/auth/FormLogin";

// assets
import login2IMG from "@/assets/Login2.jpg";
import LogoLarge from "@/assets/logo_large.png";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-h-screen">
      <div className="lg:w-3/5 h-screen">
        <Image src={login2IMG} alt="" width={0} height={0} sizes="100vw" />
      </div>
      <div className="lg:w-[40%] lg:static absolute bottom-0 w-full rounded-t-3xl bg-white">
        <div className="h-full w-3/4 lg:w-3/5 mx-auto flex flex-col gap-10 lg:gap-0 justify-between py-10">
          <div className="text-center flex flex-col gap-2">
            <p className="titleSection text-primary">
              Biro Psikologi Putra Tunggal Selamat Datang
            </p>
            <p>
              “Menuju hidup yang lebih sehat dan seimbang”
            </p>
          </div>
          <div className="w-1/3 md:w-1/5 lg:w-1/3 mx-auto">
            <Image src={LogoLarge} alt="" width={0} height={0} sizes="100vw" />
          </div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default page;
