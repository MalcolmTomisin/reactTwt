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
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>

                    <button type="button" className="register-btn" onClick={this.submitRegister.bind(this)}>Register</button>
                </div>
            </div>
        )
    }
}