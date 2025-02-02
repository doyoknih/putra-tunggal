import Image from "next/image";
import { InputSearch } from "@/components/Input";
import { GoDotFill } from "react-icons/go";
import React, { Dispatch, FC, useEffect, useState } from "react";
import moment from 'moment'
import EmptyPerson from "@/assets/person-empty.png";
import { SetStateAction } from "jotai";
import { RoomType } from "@/interface/room.interface";
import { socket } from "@/providers/socket";

const HistoryChat: FC<{setSelectedRoom: Dispatch<SetStateAction<RoomType | null>>}> = ({setSelectedRoom}) => {
const [rooms, setRooms] = useState<RoomType[]>([])
const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/rooms");
        const data = await res.json();
        setRooms(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleclickRoom = (room: RoomType) => {
    socket.emit("join_room", room.id)
    setSelectedRoom(room)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const onlineRoom = rooms.filter(room => moment(room.expiredDate).isAfter(moment()))
  const expiredRoom = rooms.filter(room => moment(room.expiredDate).isBefore(moment()))

  return (
    <>
      <div className="flex flex-col gap-y-5 bg-white">
        <p className="titleContent">Chat</p>
        <InputSearch placeholder="Cari percakapan konsultasi" />
      </div>

      {/* online */}
      <div className="flex flex-col gap-5 border-b-2 border-black/30 pb-5">
        <div className="flex items-center gap-2">
          <GoDotFill className="w-5 h-5 text-[#3EA057]" />
          <p className="text-black font-semibold">Online</p>
        </div>
        { onlineRoom.length == 0 ? <p>No Online Chat</p> : onlineRoom.map((item, index) => {
          const user = item.RoomUser.find((user) => user.user.role.role === "Dokter")
          return (
            <div key={index} className="flex items-start gap-2 md:gap-5 cursor-pointer" onClick={() => handleclickRoom(item)}>
              <div className="bg-white border min-w-16 w-16 h-16 md:min-w-20 md:w-20 md:h-20 overflow-hidden shadow-md rounded-full">
                <Image src={user?.user.foto ?? EmptyPerson} alt="" width={0} height={0} sizes="100vw" />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <p className="font-semibold">{user?.user.namaLengkap}</p>
                <p className="line-clamp-2 md:line-clamp-3 text-xs">
                  {item.lastMessage}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      {/* end online */}

      {/* expired */}
      <div className="flex flex-col gap-5 overflow-hidden overflow-y-scroll h-full">
        <p className="text-black/50 bg-white font-semibold sticky top-0">
          Expired
        </p>
        {expiredRoom.length == 0 ? <p>No Expired Chat</p> : expiredRoom.map((item, index) => {
          const user = item.RoomUser.find((user) => user.user.role.role === "Dokter")
          return (
            <div key={index} className="flex items-start gap-2 md:gap-5 cursor-pointer" onClick={() => handleclickRoom(item)}>
              <div className="bg-white border min-w-16 w-16 h-16 md:min-w-20 md:w-20 md:h-20 overflow-hidden shadow-md rounded-full">
                <Image src={user?.user.foto ?? EmptyPerson} alt="" width={0} height={0} sizes="100vw" />
              </div>
              <div className="flex flex-col  gap-1 md:gap-2 text-black/60">
                <p className="font-semibold">{user?.user.namaLengkap}</p>
                <p className="line-clamp-2 md:line-clamp-3 text-xs">
                  {item.lastMessage}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      {/* end expired */}
    </>
  );
};

export default HistoryChat;
