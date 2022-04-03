import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import ChooseUsername from './username';
import Chat from './chat';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {username: "",token:undefined}
    this.handleLogin= this.handleLogin.bind(this);
  }
  handleLogin(name,token){
    this.setState({username: name,token:token});

  }

  render(){
  if(this.state.token===undefined){
    return <ChooseUsername onLogin={this.handleLogin}/>
  }else{
    return <Chat username= {this.state.username} token = {this.state.token}/>
  }
  }

};


ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);


