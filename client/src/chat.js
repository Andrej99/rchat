import React from 'react';
import io from 'socket.io-client';
import './index.css'
import Messages from './messages';
import Rooms from './rooms';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={ messages: [], room:''};

        this.sendmsg = this.sendmsg.bind(this);
        
    }

    componentDidMount(){
        this.socket = io.connect('/');
        this.socket.on("connection")

        this.socket.on("response", (arg) => {
            this.setState(prevState => ({messages: [...prevState.messages, arg]}))
        });
    }

    sendmsg(message){
        
        this.setState(prevState => ({messages: [...prevState.messages, {user: this.props.username,msg: message}]}))
        this.socket.emit("message",{user: this.props.username,msg: message});

    }

    render(){
        
       return ( 
        <div className="container"> 
            <p>Hi {this.props.username}</p>
            <div className="content">
                <Rooms/>
                <Messages messages = {this.state.messages} onNewMsg = {this.sendmsg} />
            </div>
        </div>
        );
    }
};

export default Chat;