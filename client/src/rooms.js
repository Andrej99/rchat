import React from 'react';
import './index.css'


class SidebarItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {selected: false};
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(){
        this.props.onSelected(this.props.name);
        this.setState({selected: true});
    }

    render(){
    //TODO Toggle on selected
        return (
            <div className={this.state.selected ? "sidebar-item-selected": "sidebar-item"} onClick={this.Clicked} >
                <p>{this.props.name}</p>
            </div>
            );

    }

}

class Rooms extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:""}
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick(){
        if (this.state.value){
            this.props.onRoomAdd(this.state.value)
        }
    }


    render(){
        const rooms = this.props.roomList.map( (rm) => {
            return <SidebarItem key={rm.id} name={rm.name} onSelected = {this.props.onRoomSelcted}/>
            
        });

    return (
    <div className="sidebar">
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Add channel</button>
        {rooms}
    </div>
    );
    }
}

export default Rooms;