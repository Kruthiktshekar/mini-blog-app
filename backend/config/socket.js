import {Server} from 'socket.io'
import express from 'express'
import http from 'http'


const configScoket = () => {

const app = express();
const server = http.createServer(app)
let io = new Server(server, {
    cors: {
      origin: "https://mini-blog-app-psi.vercel.app",
    },
    connectionStateRecovery: {}
  });
  const userSocketMap = new Map();
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("add-user", (userId) => {
        console.log(userId, socket.id, 'jjjj')
        userSocketMap.set(userId, socket.id)
    });

    socket.on("send-msgs" , (data) =>{
        console.log(data,'from socket')
        const recipientSocketId = userSocketMap.get(data.to);
        console.log(recipientSocketId)
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive-msg", data);
        } else {
            console.log("User is not connected");
        }
    })
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

export default configScoket
