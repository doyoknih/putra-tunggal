"use client";
import React, { useState } from "react";
import moment from "moment";
import { useQueryHistories } from "@/api/history/queries";

const TableRiwayat = ({
  searchValue,
  serviceFilter,
}: {
  searchValue: string;
  serviceFilter: string;
}) => {
  const dataThead = [
    "No",
    "Nama Pasien",
    "Layanan",
    "Tanggal",
    "Waktu",
    "Keterangan",
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
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.user?.namaLengkap}</td>
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
                {moment(item.order?.createdAt).format("DD-MM-YYYY")}
              </td>
              {item?.layanan === "Online" ? (
                <td className="py-2">
                  {moment(item.order?.createdAt).format("HH:mm")} -{" "}
                  {moment(item.order?.createdAt).add(1, "hour").format("HH:mm")}
                </td>
              ) : (
                <td className="py-2">
                  {moment(item.order?.createdAt).format("HH:mm")}
                </td>
              )}
              <td className="py-2">
                <p
                  className={`${
                    item.order?.status === "Success"
                      ? "bg-green-200"
                      : "bg-red/10"
                  } rounded-full w-max mx-auto py-2 px-4`}
                >
                  {item?.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRiwayat;
