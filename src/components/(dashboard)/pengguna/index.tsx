"use client";

import { User, User2 } from "lucide-react";
import React from "react";
import Card from "../_global/Card";
import { useQueryUsers } from "@/api/user/queries";
import { DataTable } from "./table/DataTable";
import { Columns } from "./table/Columns";
import { Button } from "@/components/ui/button";
import { ColumnsUsers } from "./table/ColumnsUser";
import { storeDialog } from "@/store/dialog";
import { useSetAtom } from "jotai";
import * as XLSX from "xlsx";
import { TypeServices } from "@/api/services/types";
import { TypeUser } from "@/api/user/types";

const Pengguna = () => {
  const setDialog = useSetAtom(storeDialog);
  const [tabActive, setTabActive] = React.useState("Psikolog");
  const { dataUsers } = useQueryUsers();

  const dataDokter =
    dataUsers?.filter((item) => item.role?.role === "Dokter") || [];

  const dataPasien =
    dataUsers?.filter((item) => item.role?.role === "User") || [];

  const exportToExcel = (data: TypeUser[]) => {
    // Determine whether to include "namaService" or not based on user role
    const isDokter = data[0]?.role?.role === "Dokter";

    // Map the data to the required format
    const formattedData = data.map((item: any) => {
      const baseData = {
        email: item.email,
        namaLengkap: item.namaLengkap,
        alamat: item.alamat,
        noTlp: item.noTlp,
        jenis_kelamin: item.jenis_kelamin,
        tanggal_lahir: item.tanggal_lahir,
      };

      // If the role is Dokter, include the "namaService" field
      if (isDokter) {
        const namaService = item.Service?.map(
          (service: TypeServices) => service.namaService
        ).join(", ");
        return { ...baseData, namaService };
      }

      // If the role is User, return just the base data (without namaService)
      return baseData;
    });

    // Convert the formatted data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Export the file
    XLSX.writeFile(workbook, "User_Data.xlsx");
  };

  // Merge data based on tab selection
  const dataToExport = tabActive === "Psikolog" ? dataDokter : dataPasien;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setTabActive("Psikolog")}
            className={`${
              tabActive === "Psikolog" ? "bg-primary text-white" : ""
            } flex items-center gap-1 rounded-full overflow-hidden py-2 px-4 text-sm`}
          >
            <User2 size={28} />
            Psikolog
          </button>
          <button
            onClick={() => setTabActive("User")}
            className={`${
              tabActive === "User" ? "bg-primary text-white" : ""
            } flex items-center gap-1 rounded-full overflow-hidden py-2 px-4 text-sm`}
          >
            <User size={28} />
            User
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setDialog({
                type: "CREATE",
                show: true,
                data: null,
              });
            }}
            className="bg-primary"
          >
            Tambah Pengguna
          </Button>
          <Button
            onClick={() => exportToExcel(dataToExport)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Export to Excel
          </Button>
        </div>
      </div>
      <Card className="p-5 rounded-xl overflow-hidden">
        {tabActive === "Psikolog" ? (
          <DataTable data={dataDokter} columns={Columns} />
        ) : (
          <DataTable data={dataPasien} columns={ColumnsUsers} />
        )}
      </Card>
    </>
  );
};

export default Pengguna;
