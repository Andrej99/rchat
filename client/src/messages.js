import React from 'react';
import './index.css'
import MessageInput from './messageinput';

class Messages extends React.Component{

    render(){
        const messages = this.props.messages.map( (message,index) => <p key={index}><strong>{message.user}:</strong>{message.msg}</p>);

        return(
        <div className="chat">
            <MessageInput onMessage={this.props.onNewMsg}/>
            {messages}
        </div>
        );
    }
}

export default Messages;