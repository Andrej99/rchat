const express = require('express');
const http = require('http');
const login = require('./login');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const DataInstance = require("./data");

const Data = new DataInstance().getInstance();
const port = 3001

app.use('/login',login);

//TODO Add timestamps to make message updates more efficient (store them in client).

app.get('/', (req, res) => {
  console.log('dsds');
});


io.use(function(socket,next){
  if (socket.handshake.query && socket.handshake.query.token){
    console.log(socket.handshake.query.token);
    let token = Data.checkToken(socket.handshake.query.token);
    
    
    if(token === undefined){
      console.warn("Invalid token!")
      return next(new Error('Authentication error'));
    }
    socket.token = token[1];
    next();

  }else{
    console.warn("Authentication error");
    next(new Error('Authentication error'));
  }
})
.on('connection', (socket) => {
  console.log('a user connected:',socket.id);


  socket.emit("channel_list",Data.getChannels());


  socket.on("channel-add", (room,callback) =>{
    //TODO: Can't create channel with same name, don't assign same name to socket channels and channels
    //Error handling
    Data.addUserChannel(room.channel);
    console.log(room.name, " Added: ",room.channel);

    let ch = Data.getUserChannel(room.name);
    socket.leave(ch);
    Data.setChannel(room.channel,room.name);
    socket.join(room.channel);
   

    socket.broadcast.emit("channel_list",Data.getChannels());
    callback(Data.getChannels()); 
  });


  socket.on("get-messages", (room,callback) => {
    //Error handling 
    console.log(room);
    let ch = Data.getUserChannel(room.name);
    socket.leave(ch);
    console.log(socket.id, " joined: ",room);
    Data.setChannel(room.channel,room.name);
    socket.join(room.channel);
    callback(Data.getMessages(room.channel));
  });

  socket.on("channel_remove", (room) => {
    console.log("Removing channel: ",room);
    Data.removeChannel(room);
    socket.broadcast.emit("remove-channel",room);

  });
  

  socket.on('message',(arg)=>{
    console.log(arg);
    Data.addMessage(arg);
    socket.to(arg.channel).emit('response',arg);

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
    Data.clearUser(socket.token.user);
  });
});


server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});