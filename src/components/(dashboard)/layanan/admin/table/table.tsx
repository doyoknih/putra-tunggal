"use client";
import React, { useState } from "react";
import moment from "moment";
import { useQueryHistories } from "@/api/history/queries";
import ActionButtons from "./ActionButtons";
import { formatDate } from "@/lib/format";
import { TypeHistory } from "@/api/history/types";
import { Button } from "@/components/ui/button";

const TableLayananAdmin = ({
  searchValue,
  serviceFilter,
  exportToExcel,
}: {
  searchValue: string;
  serviceFilter: string;
  exportToExcel: (filteredHistories: TypeHistory[]) => void;
}) => {
  const dataThead = [
    "Layanan",
    "Tanggal",
    "Jam",
    "Pasien",
    "Dokter",
    "Service",
    "Action",
  ];
  const { dataHistories = [], isLoading } = useQueryHistories();

  // Filter data berdasarkan namaLengkap dan jenis layanan
  const filteredHistories = dataHistories.filter((item) => {
    const matchName = item.user?.namaLengkap
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchService =
      serviceFilter === "" || item?.layanan === serviceFilter;

    return matchName && matchService;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => exportToExcel(filteredHistories)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Export to Excel
        </Button>
      </div>
      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {dataThead.map((item, index) => (
                <th key={index} className="bg-primary p-2 text-white">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredHistories.map((item, index) => (
              <tr key={index} className="text-center border-b-2">
                <td className="py-2">
                  <div
                    className={`${
                      item?.layanan === "Online"
                        ? "bg-online/20"
                        : "bg-offline/20"
                    } flex items-center gap-2 rounded-full py-2 px-4 w-max mx-auto`}
                  >
                    <span
                      className={`${
                        item?.layanan === "Online" ? "bg-online" : "bg-offline"
                      } w-5 h-5 rounded-full`}
                    ></span>
                    {item?.layanan}
                  </div>
                </td>
                <td className="py-2">
                  {item?.layanan === "Online" ? (
                    <p className="badge">{moment().format("DD-MM-YYYY")}</p>
                  ) : (
                    <p className="badge">{formatDate(item.time!)}</p>
                  )}
                </td>
                <td className="py-2">
                  {item?.layanan === "Online" ? (
                    <p className="badge">
                      {moment(item?.createdAt).format("hh:mm")} -{" "}
                      {moment(item?.createdAt).add(1, "hour").format("hh:mm")}
                    </p>
                  ) : (
                    <p className="badge">
                      {moment(item?.time).format("hh:mm")}
                    </p>
                  )}
                </td>
                <td className="py-2">{item.user?.namaLengkap}</td>
                <td className="py-2">
                  {item.orderItem?.[0].service?.dokter?.namaLengkap}
                </td>
                <td className="py-2">
                  {item.orderItem?.[0].service?.namaService}
                </td>
                <td className="py-2">
                  <ActionButtons item={item} itemId={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLayananAdmin;
