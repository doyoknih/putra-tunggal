"use client";
import { Input } from "@/components/Input";
import { Dispatch, FC, SetStateAction } from "react";

const Toolbar: FC<{
  setSearch: Dispatch<SetStateAction<string>>;
  setServiceFilter: Dispatch<SetStateAction<string>>;
  searchValue: string;
}> = ({ setSearch, setServiceFilter, searchValue }) => {
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <p>Pencarian</p> :
          <Input
            placeholder="Cari Nama Pasien"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <p>Jenis Layanan : </p>
        <div className="flex items-center gap-1">
          <p>All</p>
          <input
            id="jenis_layanan"
            name="jenis_layanan"
            type="radio"
            value=""
            onChange={(e) => setServiceFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          <p>Offline</p>
          <input
            id="jenis_layanan"
            name="jenis_layanan"
            type="radio"
            value="Offline"
            onChange={(e) => setServiceFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          <p>Online</p>
          <input
            id="jenis_layanan"
            name="jenis_layanan"
            type="radio"
            value="Online"
            onChange={(e) => setServiceFilter(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
