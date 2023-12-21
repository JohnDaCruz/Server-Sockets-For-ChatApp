import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import {createServer} from "node:http";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket:any) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data:any) => {
        socket.join(data);
    });

    socket.on("send_message", (data:any) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(3001, () => {
    console.log("RUNNING");
});