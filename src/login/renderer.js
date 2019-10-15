import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../services/PostData';
import { contributorSignInApi } from '../network/endpoint';
import './login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class LoginBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
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

    onEmailChange(e) {
        this.setState({ email: e.target.value });
        this.clearValidationErr("email");
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }

    submitLogin(e) {
        e.preventDefault();
        
        let validFields = this.checkFields();
        if (!validFields) {
            let userData = {
                email: this.state.email,
                password: this.state.password
            }            
            PostData(contributorSignInApi, userData)
            .then((result) => {
                console.log(result)
                if(result.success === true) {
                    localStorage.setItem('userData', result.token);
                    this.setState({ redirect: true })
                }else {
                    console.log("Cannot login")
                }
            })
        }
    }
        

    checkFields() {
        if (this.state.email === "" ) {
            this.showValidationErr("email", "Email Cannot be empty!");
        }
        if (this.state.password === "") {
            this.showValidationErr("password", "Password Cannot be empty!");
        }   
    }

    
    render() {
        let emailErr = null,
            passwordErr = null

            for (let err of this.state.errors) {
                if (err.elm == "email") {
                    emailErr = err.msg;
                }
                if (err.elm == "password") {
                    passwordErr = err.msg;
                }
            }
            
        if (this.state.redirect === true) {
            return(<Redirect to={"/home"}/>)
        }
        if (localStorage.getItem("userData")) {
            return(<Redirect to={"/home"}/>)
        }
        return (
            <div className="inner-container">
                
                <div className="header">Sign In</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email" className="login-label">Email Address</label>
                        <input type="email" name="email" placeholder="Email Address" className="login-input" onChange={this.onEmailChange.bind(this)}/>
                        <small className="danger-error">{emailErr ? emailErr : ""}</small>
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

// toast.configure();
