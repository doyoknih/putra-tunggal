import React from "react";
import Card from "../_global/Card";
import { useQueryHistories } from "@/api/history/queries";
import moment from "moment";

const Offline = () => {
  const dataThead = ["Layanan", "Tanggal", "Waktu", "Nama Pasien"];
  const { dataHistories = [] } = useQueryHistories();

  // Fungsi untuk memisahkan data hari ini dan akan datang
  const filterDataByDate = (data: any[]) => {
    const today = moment().startOf("day"); // Awal hari ini (00:00)

    // Data untuk hari ini
    const todayData = data.filter((item) => {
      const orderDate = moment(item?.time).startOf("day");
      return orderDate.isSame(today);
    });

    // Data untuk tanggal yang akan datang
    const upcomingData = data.filter((item) => {
      const orderDate = moment(item?.time).startOf("day");
      return orderDate.isAfter(today);
    });

    return { todayData, upcomingData };
  };

  const { todayData, upcomingData } = filterDataByDate(dataHistories);

  return (
    <>
      {/* Card Hari Ini */}
      <Card className="rounded-xl p-5 mb-10">
        <p className="text-lg font-semibold mb-5">Hari ini</p>
        <div className="grid grid-cols-4 gap-5 mb-5">
          {dataThead.map((item, index) => (
            <p
              key={index}
              className="text-center text-base border-b-2 border-primary pb-3"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="grid gap-5">
          {todayData.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-5">
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {item.orderItem?.[0]?.service?.namaService}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {moment(item?.time).format("DD-MM-YYYY")}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {moment(item?.time).format("HH:mm")}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {item?.user?.namaLengkap}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Card Akan Datang */}
      <Card className="rounded-xl p-5 mb-10">
        <p className="text-lg font-semibold mb-5 text-primary/50">
          Akan Datang
        </p>
        <div className="grid grid-cols-4 gap-5 mb-5">
          {dataThead.map((item, index) => (
            <p
              key={index}
              className="text-center text-base border-b-2 border-primary pb-3"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="grid gap-5">
          {upcomingData.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-5">
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {item.orderItem?.[0]?.service?.namaService}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {moment(item?.time).format("DD-MM-YYYY")}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {moment(item?.time).format("HH:mm")}
              </p>
              <p className="text-center text-base bg-online/20 rounded-full py-2 px-4 w-max mx-auto">
                {item?.user?.namaLengkap}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Offline;
