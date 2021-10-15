import React from 'react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'


class AddChannel extends React.Component{

    constructor(props){
        super(props);
        this.state = {value:"", selected: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick(){
        if (this.state.value){
            this.props.newChannel(this.state.value);
            this.setState({value:""});
        }
    }

    showMenu(){
        this.setState(prevState => ({selected: !prevState.selected}));
    }
    render(){

        var addChannel =(
        <div>      
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <button onClick={this.handleClick}>Add channel</button>
        </div>
        );
        
        
        


        return(
        <div>
            <div className="add-channel" onClick={this.showMenu}>
            <FontAwesomeIcon icon={faCirclePlus} size="2x"  transform= {this.state.selected ? { rotate: 45 } : {}} />
             <p>Add channel</p>
             </div>
            {this.state.selected &&  addChannel}
        </div>
        );
    }
}

export default AddChannel;