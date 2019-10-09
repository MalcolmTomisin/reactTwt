import React, { Component } from 'react';
import reactDom from 'react-dom';
import { Redirect } from 'react-router-dom';
import { PostData } from '../services/PostData';
import { contributorSignInApi } from '../network/endpoint';
import './login.css';


export default class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: [],
            redirect: false,
        }
        this.submitLogin = this.submitLogin.bind(this)
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                    elm,
                    msg
                }
            ]
        }));
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm != err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };
        });
    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value });
        this.clearValidationErr("username");
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }

    submitLogin(e) {
        e.preventDefault();
        
        console.log(this.state);

        if (this.state.username === "" && this.state.username === undefined ) {
            this.showValidationErr("username", "Username Cannot be empty!");
        }
        if (this.state.password === "" && this.state.password === undefined ) {
            this.showValidationErr("password", "Password Cannot be empty!");
        }    
        
        let userData = {
           username: this.username,
           password: this.password
        }

        PostData(contributorSignInApi, userData)
            .then((result) => {
                let responseJson = result;
                
                if(responseJson) {
                    localStorage.setItem('userData', responseJson);
                    console.log("Home Page");
                    this.setState({ redirect: true })
                }else {
                    console.log("Login Error")
                }
            })
    }

    render() {
        let usernameErr = null,
            passwordErr = null

            for (let err of this.state.errors) {
                if (err.elm == "username") {
                    usernameErr = err.msg;
                }
                if (err.elm == "password") {
                    passwordErr = err.msg;
                }
            }
            
        if (this.state.redirect) {
            return(<Redirect to={"/home"}/>)
        }

        // if (localStorage.getItem("userData")) {
        //     return(<Redirect to={"/home"}/>)
        // }
        return (
            <div className="inner-container">
                <div className="header">Sign In</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username" className="login-label">Username</label>
                        <input type="text" name="username" placeholder="Username" className="login-input" onChange={this.onUsernameChange.bind(this)}/>
                        <small className="danger-error">{usernameErr ? usernameErr : ""}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input type="password" name="password" placeholder="Password" className="login-input" onChange={this.onPasswordChange.bind(this)}/>
                        <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitLogin}>Sign In</button>
                </div>
            </div>
        )
    }
}

