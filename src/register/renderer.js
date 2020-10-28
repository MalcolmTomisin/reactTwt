import React, { Component } from 'react';
import './register.css';
import  { PostData }  from '../services/PostData';
import { contributorSignUpApi } from '../network/endpoint';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import logoBox from '../ic_home.png';

export default class RegisterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: [],
            pwdState: null,
            redirect: false,
        }
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

    onNameChange(e) {
        this.setState({ name: e.target.value });
        this.clearValidationErr("name");
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
        this.clearValidationErr("email");
    }

    onPhoneChange(e) {
        this.setState({ phone: e.target.value });
        this.clearValidationErr("phone");
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
        
        this.setState({ pwdState: "weak" });
        if (e.target.value.length > 8) {
            this.setState({ pwdState: "medium" });
        } else if (e.target.value.length > 12) {
            this.setState({ pwdState: "strong" });
        }

    }

    submitRegister(e) {
        e.preventDefault();
            let userData = {
                email: this.state.email,
                password: this.state.password
            }

            fetch(
              "https://nodetwt-ihossamalbraak686393.codeanyapp.com/users/create",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  },
                body: JSON.stringify(userData)
              }
            ).then(res => res.json())
                .then((result) => {
              if (result.success) {
                this.setState({ redirect: true });
                toast.success("Welcome", {
                  autoClose: 10000,
                });
              } else {
                toast.error(result.status, { autoClose: 10000 });
              }
            });
        
    }

    checkFields() {
        if (this.state.name === "") {
            this.showValidationErr("name", "Name Cannot be empty!");
        }
        if (this.state.email === "") {
            this.showValidationErr("email", "Email Cannot be empty!");
        }
        if (this.state.password === "") {
            this.showValidationErr("password", "Password Cannot be empty!");
        }
        if (this.state.phone === ""){
            this.showValidationErr("phone", "Phone cannot be empty!");
        }
    }

    render() {
        let nameErr = null,
            passwordErr = null,
            phoneErr = null,
            emailErr = null;

        for (let err of this.state.errors) {
            if (err.elm === "name") {
                nameErr = err.msg;
            }
            if (err.elm === "password") {
                passwordErr = err.msg;
            }
            if (err.elm === "email") {
                emailErr = err.msg;
            }
            if (err.elm === "phone") {
                phoneErr = err.msg;
            }
        }

        let pwdWeak = false,
            pwdMedium = false,
            pwdStrong = false;

        if (this.state.pwdState === "weak") {
            pwdWeak = true;
        } else if (this.state.pwdState === "medium") {
            pwdWeak = true;
            pwdMedium = true;
        } else if (this.state.pwdState === "strong") {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }

        if (this.state.redirect === true) {
            return(<Redirect to={"/signin"}/>)
        }

        return (   
            <div className="inner-container">
                <img src={logoBox} alt="Logo" width="70px"/>
                <div className="header">Register</div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input type="email" name="email" placeholder="yourmail@mail.com" className="login-input" onChange={this.onEmailChange.bind(this)} />
                        <small className="danger-error">{emailErr
                            ? emailErr
                            : ""}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input type="password" name="password" placeholder="Password" className="login-input" onChange={this.onPasswordChange.bind(this)} />
                        <small className="danger-error">{passwordErr
                            ? passwordErr
                            : ""}</small>

                        {this.state.password && <div className="password-state">
                            <div
                                className={"pwd pwd-weak " + (pwdWeak
                                    ? "show"
                                    : "")}></div>
                            <div
                                className={"pwd pwd-medium " + (pwdMedium
                                    ? "show"
                                    : "")}></div>
                            <div
                                className={"pwd pwd-strong " + (pwdStrong
                                    ? "show"
                                    : "")}></div>
                        </div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password" className="login-label">Confirm Password</label>
                        <input type="password" name="password" placeholder="Confirm Password" className="login-input" />
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
                </div>
                <p className="change-screen">Already have an account <Link style={{ color: "#D60000"}} to="/signin">Sign In</Link> </p>
            </div>
        )
    }
}