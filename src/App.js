import React, {Component} from 'react';
import reactDom from 'react-dom';
import './App.css';
import LoginBox from './login/renderer';
import RegisterBox from './register/renderer';

export default class App extends Component {
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
                    <div className="controller" onClick={this.showLoginBox.bind(this)}>
                        Sign In
                    </div>
                    <div className="controller" onClick={this.showRegisterBox.bind(this)}>
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

