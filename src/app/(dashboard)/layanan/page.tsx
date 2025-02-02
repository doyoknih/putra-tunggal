"use client";

import { useQueryProfile } from "@/api/user/queries";
import Layanan from "@/components/(dashboard)/layanan";
import LayananAdmin from "@/components/(dashboard)/layanan/admin";
import React from "react";

const LayananPage = () => {
  const { dataProfile } = useQueryProfile();

  return dataProfile?.role?.role === "Admin" ? <LayananAdmin /> : <Layanan />;
};

export default LayananPage;
