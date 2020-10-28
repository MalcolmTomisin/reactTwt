import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { PostData } from '../services/PostData';
import { contributorSignInApi } from '../network/endpoint';
import './login.css';
import logoBox from '../ic_home.png';
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
                if (elm !== err.elm) {
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
            console.log(userData)
            fetch(
              "https://nodetwt-ihossamalbraak686393.codeanyapp.com/users/login",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            )
              .then((res) => res.json())
              .then((result) => {
                console.log("res", result);
                if (result.user) {
                  toast.success("", {
                    autoClose: 10000,
                  });
                  localStorage.setItem("userData", result.token);
                  localStorage.setItem(
                    "userId",
                    JSON.stringify(result.user.id)
                  );
                  this.setState({ redirect: true });
                } else {
                  toast.error(result.status, { autoClose: 10000 });
                }
              });
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
                if (err.elm === "email") {
                    emailErr = err.msg;
                }
                if (err.elm === "password") {
                    passwordErr = err.msg;
                }
            }
            
        if (this.state.redirect === true) {
            return(<Redirect to={"/"}/>)
        }
        if (localStorage.getItem("userData")) {
            return(<Redirect to={"/"}/>)
        }
        return (
            <div className="inner-container">
                <img src={logoBox} alt="Logo" width="70px"/>
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

                <span className="change-screen">You dont have an account yet <Link style={{ color: "#D60000"}} to="/register">Register</Link> </span>
                
            </div>
        )
    }
}

toast.configure();
