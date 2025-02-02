"use client";

import { ArrowLeft, User } from "lucide-react";
import React, { useState } from "react";
import { Online } from "./Online";
import Card from "../_global/Card";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Offline from "./Offline";
import { RoomType } from "@/interface/room.interface";
import ChatBox from "@/components/chatbox/chatbox";

const Layanan = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [tabActive, setTabActive] = React.useState("Online");

  return (
    <>
      {selectedRoom !== null ? (
        <Button
          onClick={() => setSelectedRoom(null)}
          className="bg-red hover:bg-red/80 mb-5"
        >
          <ArrowLeft /> Kembali
        </Button>
      ) : (
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setTabActive("Online")}
            className={`${
              tabActive === "Online" ? "bg-primary text-white" : ""
            } flex items-center gap-1 rounded-full overflow-hidden py-2 px-4 text-sm`}
          >
            <User size={28} />
            Online
          </button>
          <button
            onClick={() => setTabActive("Offline")}
            className={`${
              tabActive === "Offline" ? "bg-primary text-white" : ""
            } flex items-center gap-1 rounded-full overflow-hidden py-2 px-4 text-sm`}
          >
            <RiCalendarScheduleLine size={28} />
            Offline
          </button>
        </div>
      )}
      <div>
        {tabActive === "Online" ? (
          <Card className="rounded-xl p-5">
            <Online isOpenChat={selectedRoom !== null} setSelectedRoom={setSelectedRoom} />
            {
              selectedRoom && (
                <div >
                  <ChatBox h="h-[calc(100vh-300px)]" room={selectedRoom} role="User" />
                </div>
              )
            }
          </Card>
        ) : (
          <Offline />
        )}
      </div>
    </>
  );
};

export default Layanan;
