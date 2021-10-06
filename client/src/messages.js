import React from 'react';
import './index.css'

class Messages extends React.Component{
    constructor(props){
        super(props);
        this.state={value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.submitMsg = this.submitMsg.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    submitMsg(){
        this.props.onNewMsg(this.state.value);
    }

    keyDown(e){
        console.log(e.keyCode);
        if (e.keyCode ===  13){
            this.submitMsg();
        }

    }

    render(){
        const messages = this.props.messages.map( (message,index) => <p key={index}><strong>{message.user}:</strong>{message.msg}</p>);

        return(
        <div className="chat">
            <input type='text' value={this.state.value} onKeyDown = {this.keyDown} onChange={this.handleChange}/>
            <button onClick={this.submitMsg} >Send message</button>
            {messages}
        </div>
        );
    }
}

export default Messages;