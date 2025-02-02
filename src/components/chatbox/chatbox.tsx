import { Chat, Role, Room, User } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import EmptyPerson from "@/assets/person-empty.png";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ContinuePayment from "../consultation/modal/ContinuePayment";
import moment from "moment";
import { socket } from "@/providers/socket";
import { IMessageData } from "@/interface/sendMessage,interface";
import { createId } from "@paralleldrive/cuid2";

interface UserRole extends User {
  role: Role;
}

interface RoomType extends Room {
  RoomUser: {
    user: UserRole;
  }[];
}

const ChatBox: FC<{ room: RoomType; role: "Dokter" | "User"; h?: string }> = ({
  room,
  role,
  h,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>("");
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const user = room.RoomUser.find((user) => user.user.role.role === role);

  useEffect(() => {
    (async () => {
      try {
        setIsloading(true);
        const res = await fetch(`/api/chats?roomId=${room.id}`);
        const data = await res.json();
        setChats(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    })();
  }, [room.id]);

  const storeMessage = async (chatData: Chat) => {
    console.log(chatData, "store");
    try {
      await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", async (data: IMessageData) => {
      try {
        const chatData: Chat = {
          pesan: data.pesan,
          senderId: data.senderId,
          roomId: data.roomId,
          id: createId(),
          createdAt: moment().toDate(),
          updatedAt: moment().toDate(),
        };
        setChats((ch) => [chatData, ...ch]);
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage === "") return;
    if (user) {
      if (moment(room.expiredDate).isBefore(moment()) && role == "Dokter") {
        triggerRef.current?.click();
        return;
      }
      const chatData: Chat = {
        pesan: inputMessage,
        senderId: user.user.id,
        roomId: room.id,
        id: createId(),
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      };
      const messageData: IMessageData = {
        pesan: inputMessage,
        roomId: room.id,
        senderId: user.user.id,
      };
      storeMessage(chatData);
      socket.emit("send_message", messageData);
      setInputMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex relative w-full ${
        h ?? "h-screen"
      } lg:pl-5 flex-col gap-5`}
    >
      <div className="flex items-center gap-x-4 border-b-2 border-black/20 w-full pb-5">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="lg:hidden"
            //   onClick={() => setSelectedRoom(null)}
          />
          <div className="w-14 h-14 lg:min-w-20 lg:w-20 lg:h-20 rounded-full overflow-hidden border shadow">
            <Image
              src={user?.user.foto ?? EmptyPerson}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
        <div className="">
          <p className="font-semibold">{user?.user.namaLengkap}</p>
          <div className="flex items-center">
            <GoDotFill className="w-5 h-5 text-[#3EA057]" />
            <p className="text-black text-xs">Online</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 overflow-hidden overflow-y-scroll h-full pb-[4em]">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`${
              user?.user.id === chat.senderId
                ? "flex justify-end"
                : "flex justify-start"
            }`}
          >
            <p className="min-w-[30%] max-w-[85%] border border-black/20 p-2 rounded-[20px] text-xs">
              {chat.pesan}
            </p>
          </div>
        ))}
      </div>
      <div className="fixed right-0 lg:absolute w-full bottom-0 border bg-white flex items-center justify-between p-[1.2em]">
        <input
          type="text"
          placeholder="Type something..."
          className="w-full h-full outline-none text-xs"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <div className="flex items-center gap-x-2 text-black h-5">
          <div className="w-5 h-5 rounded-full flex justify-center items-center">
            {/* {(moment(room.expiredDate).isAfter(moment()) && role == 'Dokter') ? ( */}
            <IoMdSend
              className="h-full w-full cursor-pointer"
              onClick={handleSendMessage}
            />
            {/* ) : ( */}
            <Dialog>
              <DialogTrigger>
                <div ref={triggerRef}>
                  {/* <IoMdSend className="h-full w-full" /> */}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <ContinuePayment serviceId={room.serviceId} />
              </DialogContent>
            </Dialog>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
