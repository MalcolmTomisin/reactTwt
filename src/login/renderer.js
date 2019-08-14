import React, { Component } from 'react';
import reactDom from 'react-dom';
import './login.css';


export default class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    submitLogin(e) {
        
    }

    render() {
        return (
            <div className="inner-container">
                <div className="header">Sign In</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username" className="login-label">Username</label>
                        <input type="text" name="username" placeholder="Username" className="login-input"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input type="password" name="password" placeholder="Password" className="login-input"/>
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Sign In</button>
                </div>
            </div>
        )
    }
}

