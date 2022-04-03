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
        this.removeRoom = this.removeRoom.bind(this);
    }

    componentDidMount(){
        this.socket = io.connect('/',{
            query: this.props.token,
          });
        

        this.socket.on("channel_list", (arg) => {
            console.log(arg);
            this.setState({rooms: arg});
        });

        this.socket.on("response", (arg) => {
            this.setState(prevState => ({messages: [...prevState.messages, arg]}))
        });

        this.socket.on("remove-channel", (room) => {
            if(this.state.room === room){
                this.setState({room:null,messages:[]});
            }
            
            const rm = this.state.rooms.findIndex( r => r.name === room);
            const newArr = [].concat(this.state.rooms);
            newArr.splice(rm,1);
    
            this.setState({rooms: newArr});

        });

        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
            alert("Authentication error!");
            window.location.reload();

          });


    }

    removeRoom(room){
        //TODO Fix indexes (uid for each room on server)
        console.log("Removing channel: ",room);
        //TODO Check for errors from server
        this.socket.emit("channel_remove",room);

        if(this.state.room === room){
            this.setState({room:null,messages:[]});
        }

        //TODO replace with filter
        const rm = this.state.rooms.findIndex( r => r.name === room);
        const newArr = [].concat(this.state.rooms);
        newArr.splice(rm,1);

        this.setState({rooms: newArr});
        
    }

    roomSelect(room){
        console.log("room selected: ",room);
    
            
       
        this.setState({room: room});
        this.socket.emit("get-messages",{channel:room,name:this.props.username},(responseData) => {
            console.log(responseData);
            this.setState({messages: responseData });
        });
    
    }

    addRoom(room){
        console.log("New room: ", room );
        this.setState({room: room,messages: []});

        this.socket.emit("channel-add",{channel:room,name:this.props.username}, (chlist) =>{
            //TODO Handle errors...
            this.setState({rooms: chlist});
        });
           
    }

    sendmsg(message){
        
        this.setState(prevState => ({messages: [...prevState.messages, {user: this.props.username,msg: message}]}))
        this.socket.emit("message",{channel:this.state.room,user: this.props.username,msg: message});

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
                <Rooms roomList = {this.state.rooms} onRoomSelcted = {this.roomSelect} onRoomAdd = {this.addRoom} onRoomRemove = {this.removeRoom}/>
                {msg}
            </div>
        </div>
        );
    }
};

export default Chat;