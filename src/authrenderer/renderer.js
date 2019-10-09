import React from 'react';
import './App.css';
import LoginBox from '../login/renderer';
import RegisterBox from '../register/renderer';

export default class Authrender extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isRegisterOpen: false };
    }

    showLoginBox() {
        this.setState({
            isLoginOpen: true, isRegisterOpen: false
        });
    }

    showRegisterBox() {
        this.setState({
            isLoginOpen: false, isRegisterOpen: true
        });
    }

    render() {
        return (
            <div className="root-container">
                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Sign In
                    </div>
                    <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>
                <div className="box-container">
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <RegisterBox />}
                </div>
            </div>
        );
    }
}