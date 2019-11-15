import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  CardComponent  from '../components/cardComponent/card.component';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            redirect: false
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem("userData")) {
            console.log("Call user feed");
        }else {
            this.setState({ redirect: true });
        }
    }

    logout() {
        localStorage.setItem("userData","");
        localStorage.clear();
        this.setState({redirect: true})
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={"/signin"}/>)
        }
        if (!localStorage.getItem("userData")) {
            return(<Redirect to={"/signin"}/>)
        }
        return (
          <div>
            <div>
              <CardComponent />
            </div>
            <button type="button" className="logout-btn" onClick={this.logout}>
              Logout
            </button>
          </div>
        );
    }
}

export default Home;