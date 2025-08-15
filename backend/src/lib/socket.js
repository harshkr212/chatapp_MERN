import {Server } from 'socket.io'
import http from 'http'
import express from 'express'
const app=express();
const server= http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["https://chatapp-mern-3-dtk4.onrender.com"],
    },
});
//sending the receiver sockedId to the caller
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}
//used for storing online user
const userSocketMap={}; //{userId:sockeId}
io.on('connection',(socket)=>{
    console.log("a user is connected ",socket.id);
    //Taking the user id from the frontend from useAuthStore->connectSocket
    const userId=socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id;

   //io.emit() is used to send events to all connected user
   io.emit("getOnlineUser",Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        //deletes the current user from the userSocketMap
        delete userSocketMap[userId];
        //resending the userSocketMap after deleting the current offline user
        io.emit("getOnlineUser",Object.keys(userSocketMap));

    console.log("a user is disconnected ",socket.id);
        
    })
})
export {io,app,server};