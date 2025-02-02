"use client";

import React from "react";
import Card from "./Card";
import Image from "next/image";
import { useQueryProfile } from "@/api/user/queries";

const Header = () => {
  const { dataProfile } = useQueryProfile();

  return (
    <Card className="bg-primary sticky top-0 z-50 p-5 rounded-full w-full">
      <div className="text-white flex items-center justify-between">
        <p className="text-lg">DASHBOARD</p>
        <div className="flex items-center gap-2">
          <div className="bg-white shadow border w-10 h-10 rounded-full overflow-hidden">
            {dataProfile?.foto && (
              <Image
                src={dataProfile?.foto}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p>{dataProfile?.namaLengkap}</p>
            <p className="text-xs">{dataProfile?.role?.role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;
