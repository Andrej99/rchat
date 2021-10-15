import React from 'react';
import './index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight} from '@fortawesome/free-solid-svg-icons'



class MessageInput extends React.Component{

    constructor(props){
        super(props);
        this.state={value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.submitMsg = this.submitMsg.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    submitMsg(){
        if(this.state.value!==''){
        
        this.setState({value:''});
        this.props.onMessage(this.state.value);
        }
    }

    keyDown(e){
        console.log(e.keyCode);
        if (e.keyCode ===  13){
            this.submitMsg();
        }

    }

    handleChange(event){
        this.setState({value: event.target.value})
    }


    render(){
       return (
            <div className="message-input">
                <input type='text' className="chat-input" value={this.state.value} onKeyDown = {this.keyDown} onChange={this.handleChange}/>
                
                <FontAwesomeIcon icon={faCircleRight} size="3x" className="message-send" onClick={this.submitMsg}/>
            </div>
            );
    }
}

export default MessageInput;