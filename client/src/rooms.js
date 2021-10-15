import React from 'react';
import AddChannel from './addchannel';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan} from '@fortawesome/free-solid-svg-icons';


class SidebarItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {selected: false};
        this.Clicked = this.Clicked.bind(this);
        this.removeChannel = this.removeChannel.bind(this);
    }

    removeChannel(e){
        e.stopPropagation();
        this.props.onRemoved(this.props.name);
    }

    Clicked(){
        this.props.onSelected(this.props.name);
        this.setState({selected: true});
    }

    render(){
    //TODO Toggle on selected
        return (
            <div className={this.state.selected ? "sidebar-item": "sidebar-item"} onClick={this.Clicked}>
                <p>{this.props.name}</p>
                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={this.removeChannel} />
            </div>
            );

    }

}

class Rooms extends React.Component{
    constructor(props){
        super(props);

        this.handleNewChannel = this.handleNewChannel.bind(this);

    }

    handleNewChannel(value){
            this.props.onRoomAdd(value); 
    }


    render(){
        const rooms = this.props.roomList.map( (rm) => {
            return <SidebarItem key={rm.id} name={rm.name} onSelected = {this.props.onRoomSelcted} onRemoved = {this.props.onRoomRemove}/>
            
        });

    return (
    <div className="sidebar">
        <AddChannel newChannel = {this.handleNewChannel}></AddChannel>
        {rooms}
    </div>
    );
    }
}

export default Rooms;