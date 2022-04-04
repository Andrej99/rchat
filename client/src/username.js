
import React from 'react';
import './index.css'
import LoginButton from "./loginbutton";


class ChooseUsername extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: '', password: '',error:"",loading:false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
 

   handleSubmit(){
       
       this.setState({loading:true});

       fetch('/login',{
            method: "post",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.value, password: this.state.password})
        }).then(response => {
            if(response.status === 401){
                throw new Error("Invalid username or password")
            }else{
                return response.json()
            }
        })
        .then(dd =>{
            console.log("Login ok");
            this.props.onLogin(this.state.value,dd);
        }).catch((error) => {
            console.error('Error:', error);
            this.setState({loading:false,error:error.message});

          });
        
    }

    handleChange(event) {
        this.setState({value: event.target.value,error:""});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value,error:""});
       
    }

    render(){
        return (
            <div className="container">
                <div className="frm">
                <label>Username:
                    <input type="text"  value={this.state.value} onChange={this.handleChange} className="frm-input" disabled = {this.state.loading}/>
                </label>
                <label>Password:
                    <input type="password" value= {this.state.password} onChange={this.handlePasswordChange} className="frm-input" 
                    disabled = {this.state.loading}/>
                 </label>
                 <p className="login-error">{this.state.error}</p>
                <LoginButton clicked = {this.handleSubmit} loading = {this.state.loading}/>
                <p className="inf">Test usernames and passwords: user-user test-test</p>
                </div>
            </div>
        );
    }      
}

export default ChooseUsername;