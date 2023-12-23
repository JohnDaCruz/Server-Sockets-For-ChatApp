import express from 'express';
import { Server } from "socket.io";
import {createServer} from "node:http";

const app = express();
const server = createServer(app);

const URL = process.env.URL_SITE
const PORT = process.env.PORT ||3000

const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-nextjs93105.netlify.app/account","https://chat-app-nextjs93105.netlify.app","http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING, ${PORT}`);
});