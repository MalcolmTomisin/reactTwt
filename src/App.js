import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterBox from './register/renderer';
import Home from './home/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBox from './login/renderer';


export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/signin' exact component={LoginBox}/>
                <Route path="/register" exact component={RegisterBox} />
                <Route path="/" component={Home} />
            </Switch>
        );
    }
  
}

