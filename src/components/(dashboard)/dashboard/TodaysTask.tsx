"use client";

import React from "react";
import Card from "../_global/Card";
import { useQueryHistories } from "@/api/history/queries";
import moment from "moment";

export const TodaysTask = () => {
  const dataThead = ["Layanan", "Nama Pasien", "Waktu"];

  const { dataHistories } = useQueryHistories();

  const today = moment().startOf("day");
  const todayData = dataHistories?.filter((item) => {
    const orderDate = moment(item?.time).startOf("day");
    return orderDate.isSame(today);
  });

  return (
    <Card className="rounded-xl p-5">
      <p className="text-base font-semibold mb-5">Task Hari ini</p>
      <table className="w-full">
        <thead>
          <tr>
            {dataThead.map((item, index) => (
              <th
                key={index}
                className="border-b border-black py-2 text-neutral-400"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todayData?.map((item, index) => (
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
