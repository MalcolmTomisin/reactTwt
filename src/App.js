import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Authrender from './authrenderer/renderer';
import Home from './home/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path='/' exact component={Authrender}/>
                <Route path="/home" component={Home} />
            </BrowserRouter>
        );
    }
  
}

