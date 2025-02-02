import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import person from "@/assets/psikolog.jpg";

interface IChat {
  isOpenChat: boolean;
  setIsOpenChat: React.Dispatch<boolean>;
}

export const Chat = ({ isOpenChat, setIsOpenChat }: IChat) => {
  return (
    <div
      className={`relative w-full h-[70vh] ${
        isOpenChat ? "flex" : "hidden"
      } flex-col gap-5`}
    >
      <div className="flex items-center gap-x-4 border-b-2 border-black/20 w-full pb-5">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="lg:hidden"
            onClick={() => setIsOpenChat(false)}
          />
          <div className="w-14 h-14 lg:min-w-20 lg:w-20 lg:h-20 rounded-full overflow-hidden border shadow">
            <Image src={person} alt="" width={0} height={0} sizes="100vw" />
          </div>
        </div>
        <div className="">
          <p className="font-semibold">Dr. John Cena</p>
          <div className="flex items-center">
            <GoDotFill className="w-5 h-5 text-[#3EA057]" />
            <p className="text-black text-xs">Online</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 overflow-hidden overflow-y-scroll h-full pb-10">
        <div className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip
        </div>
        <div className="flex justify-end">
          <p className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </p>
        </div>
        <div className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip
        </div>
        <div className="flex justify-end">
          <p className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </p>
        </div>
        <div className="flex justify-end">
          <p className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </p>
        </div>
      </div>
      <div className="absolute w-full bottom-0 border bg-white flex items-center justify-between py-2 px-5">
        <input
          type="text"
          placeholder="Type something..."
          className="w-full h-full outline-none text-xs"
        />
        <div className="flex items-center gap-x-2 text-black h-5">
          <div className="w-5 h-5 rounded-full flex justify-center items-center">
            <IoMdSend className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
