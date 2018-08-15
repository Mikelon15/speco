import React, { Component } from 'react';
import LogIn from './login/LoginPage';
import SignUp from './registration/SignUp';
import './Token.css';

export default class Token extends Component {
    render(){
        let { onSignUp, onSignIn, toggleUserSubscribing, subscribing, error } = this.props; 
        let authType = (subscribing) ?
            (<SignUp 
                onSubmit={onSignUp} 
                toggle={toggleUserSubscribing} />) : 
            (<LogIn
                toggle={toggleUserSubscribing}
                onSubmit={onSignIn} />)
        let errorMessage = (error) ? error.toString() : "";
        return(
            <div className="grid-container">
                <div className="grid-item"></div>
                <div className="grid-item main">
                    <h1 class="logo">speco</h1>
                    { errorMessage }
                    { authType }
                </div>
                <div className="grid-item"></div>
            </div>
        )
    }
}
