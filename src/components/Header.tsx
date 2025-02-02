"use client";

import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";
import { PiChatCircleText } from "react-icons/pi";
import { ButtonSmall } from "./Button";
import { usePathname } from "next/navigation";
import { Fade as Hamburger } from "hamburger-react";
import { storeIsLogin } from "@/store/isLogin";
import { useAtomValue } from "jotai";
import { Loader, User } from "lucide-react";
import { useQueryProfile } from "@/api/user/queries";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setOpen] = React.useState(false);
  const isLogin = useAtomValue(storeIsLogin);
  const { dataProfile, isLoading } = useQueryProfile();

  const ItemHeader = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Artikel",
      link: "/article",
    },
    {
      name: "Layanan",
      link: "/service",
    },
    {
      name: "Tentang Kami",
      link: "/about",
    },
  ];

  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href;

  return (
    <div className="max-w-screen-2xl flex items-center justify-between py-2 lg:py-5 bg-primary text-white fixed w-full z-50 ContainerX">
      <div>
        <Logo />
      </div>
      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
      </div>
      <div
        className={`flex flex-col lg:flex-row lg:items-center lg:justify-center gap-5 md:gap-10 lg:gap-16 lg:static w-full lg:w-auto absolute left-0 bg-primary rounded-b-3xl lg:bg-none p-5 md:px-20 md:py-10 lg:p-0 transition-all ${
          isOpen ? "top-full" : "-top-[900px]"
        }`}
      >
        {ItemHeader?.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            onClick={() => setOpen(false)}
            className={`text-sm relative group ${
              isActiveLink(item.link) ? "font-bold" : "font-light"
            }`}
          >
            {item.name}
            <span
              className={`hidden lg:block h-2 absolute -bottom-7 left-0 bg-white lg:bg-white group-hover:w-full transition-full duration-300 ${
                isActiveLink(item.link) ? "w-full" : "w-0"
              }`}
            ></span>
          </Link>
        ))}
        <p className="md:hidden text-center text-base my-8">
          Menuju hidup yang lebih sehat dan seimbang
        </p>
        <Link href="login" className="w-full flex justify-center md:hidden">
          <ButtonSmall className="bg-red">Login</ButtonSmall>
        </Link>
      </div>
      <div className=" md:flex items-center gap-5 hidden">
        <Link href={"consultation"}>
          <PiChatCircleText size={32} />
        </Link>
        {isLogin ? (
          <Link
            href={"/profile"}
            className="h-7 w-7 rounded-full border flex justify-center items-center cursor-pointer overflow-hidden"
          >
            {isLoading ? (
              <Loader />
            ) : dataProfile?.foto ? (
              <Image
                src={dataProfile.foto}
                alt={dataProfile?.namaLengkap!}
                width={0}
                height={0}
                sizes="100vw"
                className="w-7 h-7"
              />
            ) : (
              <User />
            )}
          </Link>
        ) : (
          <Link href="login">
            <ButtonSmall className="bg-red">Login</ButtonSmall>
          </Link>
        )}
      </div>
    </div>
  );
};
