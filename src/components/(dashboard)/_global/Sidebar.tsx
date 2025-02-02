"use client";

import React from "react";
import Card from "./Card";
import { CiGrid42 } from "react-icons/ci";
import { PiChatCircleText } from "react-icons/pi";
import {
  MdArticle,
  MdFeedback,
  MdMedicalServices,
  MdOutlineHistoryToggleOff,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Users } from "lucide-react";
import { useMutationAuth } from "@/api/auth/mutations";
import { storeIsLogin } from "@/store/isLogin";
import { useAtom } from "jotai";
import { useQueryProfile } from "@/api/user/queries";
import { LogoDashboard } from "@/components/Logo";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

type Role = "Admin" | "Dokter";

// Define a MenuItem type
interface MenuItem {
  icon: React.JSX.Element;
  label: string;
  route: string;
  children?: { label: string; route: string }[]; // Make 'children' optional
}

const getMenuGroups = (role: Role): MenuItem[] => {
  const commonMenuItems: MenuItem[] = [
    {
      icon: <CiGrid42 size={24} />,
      label: "Dashboard",
      route: "/dashboard",
    },
  ];

  const menuGroups = {
    Admin: [
      ...commonMenuItems,
      {
        icon: <MdMedicalServices size={24} />,
        label: "Layanan",
        route: "/layanan",
      },
      {
        icon: <MdArticle size={24} />,
        label: "Artikel",
        route: "/artikel",
      },
      {
        icon: <Users size={24} />,
        label: "Pengguna",
        route: "/pengguna",
      },
    ],
    Dokter: [
      ...commonMenuItems,
      {
        icon: <MdMedicalServices size={24} />,
        label: "Layanan",
        route: "/layanan",
      },
      {
        icon: <MdOutlineHistoryToggleOff size={24} />,
        label: "Riwayat",
        route: "/riwayat",
      },
    ],
  };

  return menuGroups[role];
};

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href;
  const { serviceAuth } = useMutationAuth();
  const [_, setIsLogin] = useAtom(storeIsLogin);
  const router = useRouter();
  const { dataProfile, isLoading } = useQueryProfile();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const menuItems = dataProfile
    ? getMenuGroups(dataProfile.role?.role as Role)
    : [];

  const handleLogout = async () => {
    await serviceAuth({
      type: "logout",
      body: "",
    });

    setIsLogin(false);
    router.push("/");
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-72 py-5">
      <Card className="flex flex-col overflow-y-hidden w-full h-full rounded-r-3xl px-5 py-10 justify-between">
        <div>
          <div className="mx-auto flex justify-center border-b-2 pb-2 border-primary mb-10">
            <LogoDashboard />
          </div>
          {menuItems?.map((group, groupIndex) => (
            <ul key={groupIndex} className="mb-6 flex flex-col gap-2">
              <li className="rounded-full overflow-hidden">
                <Link
                  href={group.route}
                  className={`${
                    isActiveLink(group.route) ? "bg-primary text-white" : ""
                  } group relative flex items-center gap-2.5 rounded-sm p-4 font-medium`}
                >
                  {group.icon}
                  {group.label}
                </Link>
              </li>
            </ul>
          ))}
        </div>
        <div
          onClick={handleLogout}
          className="mx-auto flex justify-center gap-2 text-red cursor-pointer border-b-2 pb-2 border-primary mb-10"
        >
          <LogOut />
          <p>Log out</p>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
