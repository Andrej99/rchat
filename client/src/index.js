import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import ChooseUsername from './username';
import Chat from './chat';



/*
class TextInput extends React.Component{

  constructor(props){
    super(props);
    this.state = {txt: "", buffer: []}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    socket.on("tt", (arg) => {
      console.log(arg)
      this.setState({txt:arg})
    });
  }
  


    handleChange(event){

      this.setState(prevState => ({buffer: [...prevState.buffer, event.target.value]}))

      socket.emit("text",event.target.value)
      this.setState({txt: event.target.value})


    }

  render(){
    return <div><textarea type = "text" value={this.state.txt} onChange={this.handleChange}></textarea> </div>
  }


    componentDidMount() {
    socket.on("message", (arg) => {
      console.log(arg)
      this.setState({message:arg})
    });
  }

};*/

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {username: ""}
    this.handleUsername = this.handleUsername.bind(this);
  }
  handleUsername(name){
    this.setState({username: name});

  }

  render(){
  if(!this.state.username){
    return <ChooseUsername onUsernameInput={this.handleUsername}/>
  }else{
    return <Chat username= {this.state.username}/>
  }
  }

};


ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);


