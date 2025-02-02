"use client";

import DialogCreate from "@/components/(dashboard)/pengguna/dialog/DialogCreate";
import { Profile } from "@/components/profile/Profile";
import TableHistory from "@/components/profile/TableHistory";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="Container w-10/12 mx-auto flex flex-col gap-10">
      <Profile />
      <TableHistory />
      <DialogCreate />
    </div>
  );
};

export default ProfilePage;
