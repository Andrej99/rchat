import React from 'react';
import './index.css';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginButton extends React.Component{

 
    pressed = () =>{
       
        this.props.clicked();
    }

    render(){
        if (!this.props.loading){
            return(<button type="submit"  onClick={this.pressed} className="frm-button">Sign in</button>);
        } else {
            return(<button type="submit"  className="frm-button-pressed" >Signing in <FontAwesomeIcon icon={faSpinner} spin className="spin-icon"/></button>)

        }
    }
}

export default LoginButton;