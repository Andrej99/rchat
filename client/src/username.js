import React from 'react';
import './index.css'


class ChooseUsername extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log("Username is: ",this.state.value);
        this.props.onUsernameInput(this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <label>Enter your name:
            <input type="text"  value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="submit"/>
        </form>
        );
    }      
}

export default ChooseUsername;