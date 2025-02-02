"use client";

import React from "react";
import DialogUpdate from "./dialog/DialogUpdate";
import DialogDelete from "./dialog/DialogDelete";
import TableLayananAdmin from "./table/table";
import { TableToolbar } from "./table/TableToolbar";
import { TypeHistory } from "@/api/history/types";
import moment from "moment";
import { formatDate } from "@/lib/format";
import * as XLSX from "xlsx";

const LayananAdmin = () => {
  const [searchValue, setSearch] = React.useState("");
  const [serviceFilter, setServiceFilter] = React.useState("");

  const exportToExcel = (filteredHistories: TypeHistory[]) => {
    const formattedData = filteredHistories.map((item) => ({
      Layanan: item?.layanan,
      Tanggal:
        item?.layanan === "Online"
          ? moment().format("DD-MM-YYYY")
          : formatDate(item.time!),
      Jam:
        item?.layanan === "Online"
          ? `${moment(item?.createdAt).format("hh:mm")} - ${moment(
              item?.createdAt
            )
              .add(1, "hour")
              .format("hh:mm")}`
          : moment(item?.time).format("hh:mm"),
      Pasien: item.user?.namaLengkap,
      Dokter: item.orderItem?.[0].service?.dokter?.namaLengkap,
      Service: item.orderItem?.[0].service?.namaService,
    }));

    // Create a worksheet from the formatted data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Layanan");

    // Export to Excel file
    XLSX.writeFile(workbook, "Layanan_Admin.xlsx");
  };

  return (
    <>
      <TableToolbar
        setSearch={setSearch}
        searchValue={searchValue}
        setServiceFilter={setServiceFilter}
      />
      <TableLayananAdmin
        searchValue={searchValue}
        serviceFilter={serviceFilter}
        exportToExcel={exportToExcel}
      />
      <DialogUpdate />
      <DialogDelete />
    </>
  );
};

export default LayananAdmin;
