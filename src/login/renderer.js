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
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>

                    <button type="button" className="signIn-btn" onClick={this.submitLogin.bind(this)}>Sign In</button>
                </div>
            </div>
        )
    }
}

