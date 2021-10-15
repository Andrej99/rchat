const { exception } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3001


//TODO Add timestamps to make message updates more efficient (store them in client).
const channels = [];

function getChannels(ch){
  return channels.map((channel) => {return {id: channel.id, name: channel.name}});
}

function getMessages(chname){
  console.log(channels);
  m = channels.find((elem) => elem.name === chname);
  console.log(m);
  if(m===undefined){
    return [];
  }

  return m.messages;
}

var currentRoom = 'Default';

app.get('/', (req, res) => {
  console.log('dsds');
});

io.on('connection', (socket) => {
  console.log('a user connected:',socket.id);
  socket.emit("channel_list",getChannels(channels));


  socket.on("channel-add", (room,callback) =>{
    //TODO: Can't create channel with same name, don't assign same name to socket channels and channels
    //Error handling
    var lid = 0;
    if (channels.length > 0){
      lid = channels.slice(-1)[0].id + 1;
    }
    channels.push({id:lid, name: room, messages: []});
    console.log(socket.id, " Added: ",room);
    console.log(channels);
    currentRoom = room;
    socket.leave(currentRoom);
    socket.join(room);
    socket.broadcast.emit("channel_list",getChannels(channels));
    callback(getChannels(channels)); 
  });


  socket.on("get-messages", (room,callback) => {
    //Error handling 
    console.log(socket.id, " joined: ",room);
    currentRoom = room;
    socket.leave(currentRoom);
    socket.join(room);
    callback(getMessages(room));
  });

  socket.on("channel_remove", (room) => {
    console.log("Removing channel: ",room);
    currentRoom = "Default";
    channels.splice(channels.findIndex((ch) => ch.name === room));
    socket.broadcast.emit("remove-channel",room);

  });
  

  socket.on('message',(arg)=>{
    console.log(arg);
    i = channels.findIndex((elem) => elem.name === currentRoom);
    channels[i].messages.push(arg);
    socket.to(currentRoom).emit('response',arg);

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log('listening on *: {port}');
});