import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  CardComponent  from '../components/cardComponent/card.component';
import Uploadsvg from '../images/undraw_going_up_ttm5 (1).svg';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        if(localStorage.getItem("userData")) {
            console.log("Call user feed");
        }else {
            this.setState({ redirect: true });
        }
    }
    render() {
        if(this.state.redirect) {
            return (<Redirect to={"/login"}/>)
        }
        return( 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6" style={{ position: "absolute", left: "70px", top:"150px"}}>
                        <CardComponent />
                    </div>
                    <div className="col-md-6">
                        <img src={Uploadsvg} style={{position:"fixed", left:"650px", top:"70px" }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;