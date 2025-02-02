"use client";
import React, { useState } from "react";
import TableRiwayat from "@/components/(dashboard)/riwayat/Table";
import Toolbar from "@/components/(dashboard)/riwayat/Toolbar";

const Page = () => {
  const [searchValue, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  return (
    <>
      <Toolbar
        setSearch={setSearch}
        searchValue={searchValue}
        setServiceFilter={setServiceFilter}
      />
      <TableRiwayat searchValue={searchValue} serviceFilter={serviceFilter} />
    </>
  );
};

export default Page;
