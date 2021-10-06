import React from 'react';
import io from 'socket.io-client';
import './index.css'
import Messages from './messages';
import Rooms from './rooms';

//TODO Store messges in client

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={ messages: [], room: null, rooms: []};

        this.sendmsg = this.sendmsg.bind(this);
        this.roomSelect = this.roomSelect.bind(this);
        this.addRoom = this.addRoom.bind(this);
    }

    componentDidMount(){
        this.socket = io.connect('/');
        this.socket.on("connection")

        this.socket.on("channel_list", (arg) => {
            console.log(arg);
            this.setState({rooms: arg});
        });

        this.socket.on("response", (arg) => {
            this.setState(prevState => ({messages: [...prevState.messages, arg]}))
        });


    }

    roomSelect(room){
        console.log("room selected: ",room);
        this.setState({room: room});
        this.socket.emit("get-messages",room,(responseData) => {
            console.log(responseData);
            this.setState({messages: responseData });
        });
    }

    addRoom(room){
        console.log("New room: ", room );
        this.setState({room: room,messages: []});

        this.socket.emit("channel-add",room, (chlist) =>{
            //TODO Handle errors...
            this.setState({rooms: chlist});
        });
           
    }

    sendmsg(message){
        
        this.setState(prevState => ({messages: [...prevState.messages, {user: this.props.username,msg: message}]}))
        this.socket.emit("message",{user: this.props.username,msg: message});

    }

    render(){
        
    var msg =(
            <div className = "no-messages">
                 <h3>To begin chatting, create or join channel on the left!</h3>
            </div>
            );
        
        
      if (this.state.room){
        msg = <Messages messages = {this.state.messages} onNewMsg = {this.sendmsg} />
      } 
         
     
        
       return ( 
        <div className="container"> 
            <p>Hi {this.props.username}</p>
            <div className="content">
                <Rooms roomList = {this.state.rooms} onRoomSelcted = {this.roomSelect} onRoomAdd = {this.addRoom}/>
                {msg}
            </div>
        </div>
        );
    }
};

export default Chat;