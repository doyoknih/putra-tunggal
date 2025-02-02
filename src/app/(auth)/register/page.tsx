import Image from "next/image";
import React from "react";

// assets
import login2IMG from "@/assets/Login2.jpg";
import FormRegister from "@/components/auth/FormRegister";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-h-screen">
      <div className="lg:w-3/5 min-h-screen">
        <Image src={login2IMG} alt="" width={0} height={0} sizes="100vw" />
      </div>
      <div className="lg:w-[40%] lg:static absolute bottom-0 w-full rounded-t-3xl bg-white overflow-y-auto">
        <div className="h-full w-11/12 md:w-3/4 lg:w-10/12 mx-auto flex flex-col gap-5 md:gap-10 lg:gap-0 justify-between py-5 md:py-10">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">PENDAFTARAN</p>
            <p>
              Pengguna baru, Silahkan mendaftar untuk mengakses forum{" "}
              <span className="text-primary font-semibold">
                BIRO PSIKOLOGI PUTRA TUNGGAL
              </span>
            </p>
          </div>
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default page;
