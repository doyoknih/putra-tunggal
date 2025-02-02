"use client";

import React, { useState } from "react";
import Sidebar from "../_global/Sidebar";
import Header from "../_global/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col ml-72 p-5">
        <Header />
        <div className="py-10">{children}</div>
      </div>
    </>
  );
}
