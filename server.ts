import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { IMessageData } from "@/interface/sendMessage,interface";
import dotenv from "dotenv";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "0.0.0.0";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`user join room ${roomId}`);
    });

    socket.on("send_message", async (data: IMessageData) => {
      try {
        io.to(data.roomId).emit("receive_message", data);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
