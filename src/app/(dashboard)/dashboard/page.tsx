import { TodaysTask } from "@/components/(dashboard)/dashboard/TodaysTask";
import React from "react";

const page = () => {
  return (
    <>
      <p className="w-1/2 mb-5">
        Hallo, Selamat datang diforum{" "}
        <span className="text-primary font-semibold">PUTRA TUNGGAL</span>{" "}
        Berinteraksi dengan nyaman demi kesehatan mental yang baik
      </p>
      <TodaysTask />
    </>
  );
};

export default page;
