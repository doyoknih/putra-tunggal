"use client";

import React from "react";
import Card from "../_global/Card";
import { useQueryHistories } from "@/api/history/queries";
import moment from "moment";
import { useQueryProfile } from "@/api/user/queries";

export const TodaysTask = () => {
  const { dataProfile } = useQueryProfile();
  const { dataHistories } = useQueryHistories();

  const today = moment().startOf("day");

  // Pisahkan data menjadi Online & Non-Online
  const onlineData = dataHistories
    ?.filter((item) => {
      const orderDate = moment(item?.createdAt);
      return orderDate.isSame(today, "day") && item.layanan === "Online";
    })
    .sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt))); // Urutkan berdasarkan waktu

  const nonOnlineData = dataHistories?.filter(
    (item) =>
      item.layanan !== "Online" && moment(item?.createdAt).isSame(today, "day")
  );

  // Menyimpan data Online dalam rentang 1 jam
  const filteredOnlineData: typeof onlineData = [];
  const seenUsers: Record<string, moment.Moment> = {};

  onlineData?.forEach((item) => {
    const userId = item.userId;
    const createdAt = moment(item.createdAt);

    if (!seenUsers[userId] || createdAt.diff(seenUsers[userId], "hours") >= 1) {
      filteredOnlineData.push(item);
      seenUsers[userId] = createdAt;
    }
  });

  // Gabungkan data Online yang sudah difilter dengan Non-Online yang tetap ditampilkan semua
  const finalData = [...filteredOnlineData, ...(nonOnlineData || [])];

  console.log("today data", finalData);

  return (
    <Card className="rounded-xl p-5">
      <p className="text-base font-semibold mb-5">Task Hari ini</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-black py-2 text-neutral-400">
              Layanan
            </th>
            <th className="border-b border-black py-2 text-neutral-400">
              Nama Pasien
            </th>
            {dataProfile?.role?.role === "Admin" && (
              <th className="border-b border-black py-2 text-neutral-400">
                Nama Dokter
              </th>
            )}
            <th className="border-b border-black py-2 text-neutral-400">
              Waktu
            </th>
          </tr>
        </thead>
        <tbody>
          {finalData?.map((item, index) => (
            <tr key={index} className="text-center">
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
              <td className="py-2">{item.user?.namaLengkap}</td>
              {dataProfile?.role?.role === "Admin" && (
                <td className="py-2">
                  {item.orderItem?.[0].service?.dokter?.namaLengkap}
                </td>
              )}
              <td className="py-2">
                {moment(item?.createdAt).format("HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
