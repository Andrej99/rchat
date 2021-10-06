const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3001

const users = []
app.get('/', (req, res) => {
  res.send("Dela?")
  console.log('dsds')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  

  socket.on('message',(arg)=>{
    console.log(arg);
    socket.broadcast.emit('response',arg);

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log('listening on *: {port}');
});