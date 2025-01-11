const express = require("express");
const {createServer} = require("node:http");
const {join} = require('node:path');
// import {Server} from "socket.io"; //ES module style
const { Server } = require("socket.io"); //JS-style

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
   return res.sendFile(join(__dirname,'index.html'))
});

io.on('connection',(socket) => {
    //this handles connect/disconnect noti on console
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //this handles chat message
    socket.on('chat message',(msg) => {
        io.emit('chat message', msg);
        
        
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

   