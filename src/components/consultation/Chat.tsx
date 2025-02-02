"use client";

import HistoryChat from "./History";
import ChatBox from "../chatbox/chatbox";
import { RoomType } from "@/interface/room.interface";
import { useState } from "react";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  return (
    <div className="grid lg:grid-cols-2 gap-x-5 lg:divide-x-4 divide-black/20">
      <div
        className={`${
          selectedRoom ? "hidden lg:flex" : "flex"
        }  relative md:min-w-[497px] w-full h-screen pt-10 md:pt-20 lg:pt-24 flex-col gap-5`}
      >
        <HistoryChat setSelectedRoom={setSelectedRoom} />
      </div>
      {selectedRoom && (
        <div className="pt-20">
          <ChatBox
            h="h-[calc(100vh-100px)]"
            room={selectedRoom}
            role="Dokter"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
