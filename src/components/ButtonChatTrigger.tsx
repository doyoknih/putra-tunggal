"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import iconIMG from "@/assets/chat_icon.svg";

const ButtonChatTrigger = () => {
  return (
    <div className="bottom-10 md:bottom-20 lg:bottom-0 fixed z-50 w-full max-w-screen-2xl mx-auto flex items-center justify-end">
      <Link href={"/service"} className="h-20 lg:h-28">
        <Image src={iconIMG} alt="" width={0} height={0} sizes="100vw" />
      </Link>
    </div>
  );
};

export default ButtonChatTrigger;
