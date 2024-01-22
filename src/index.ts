import express from 'express';
import { Server } from "socket.io";
import {createServer} from "node:http";

const app = express();
const server = createServer(app);

const URL = process.env.URL_SITE
const PORT = process.env.PORT || 3001

const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-nextjs93105.netlify.app/account","https://chat-app-nextjs93105.netlify.app","http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    },
    transports:["websocket", "polling"]
});

io.on("connection", (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on("disconnect", data=> {
        console.log(`Socket: ${socket.id} saiu`)
    })

    socket.on("join_room", sala => {
        socket.join(sala);
        console.log(`Socket: ${socket.id} na sala ${sala}`)
    });

    socket.on("send_message", data => {
        io.to(data.room).emit("receive_message", data);
        const {sender, message, room} = data
        console.log(`Socket: ${socket.id},  Info:{
        sender:${sender},
        message:${message},
        room:${room}
        }`)
    });
});

server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING, ${PORT}`);
});