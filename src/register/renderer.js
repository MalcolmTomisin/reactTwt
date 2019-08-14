import React, { Component } from 'react';
import reactDom from 'react-dom';
import './register.css';


export default class RegisterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    submitRegister(e) {
        
    }

    render() {
        return (
            <div className="inner-container">
                <div className="header">Register</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username" className="login-label">Name</label>
                        <input type="text" name="username" placeholder="Username" className="login-input" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone" className="login-label">Phone</label>
                        <input type="phone" name="phone" placeholder="080xxxxxxxx" className="login-input"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input type="email" name="email" placeholder="yourmail@mail.com" className="login-input"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input type="password" name="password" placeholder="Password" className="login-input"/>
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
                </div>
            </div>
        )
    }
}