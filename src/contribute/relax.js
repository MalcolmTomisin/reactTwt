import React, { Component } from 'react';

export default class Contribute extends Component{
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    render() {
        return (
            <div className="inner-container">
                <div className="header">Upload Image/Video and Provide required Information</div>
                <div className="box">
                    <div className="input-group">
                        <input type="file" className="login-upload" onChange={this.handleChange}/>
                        <img src={this.state.file}/>
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="coordinates" className="login-label">Coordinates</label>
                        <input type="number" name="coordinates" placeholder="Enter Coordinates" className="login-input" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="bilbord-tag" className="login-label">Bilbord Tag</label>
                        <input type="text" name="bilbord-tag" placeholder="Enter Bilbord Tag" className="login-input" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="bilbord-pin" className="login-label">Bilbord Pin</label>
                        <input type="text" name="bilbord-pin" placeholder="Enter the Bilbord Pin" className="login-input" />
                    </div>

                    <button type="button" className="login-btn" onClick={()=> {}}>Submit Bilbord</button>
                </div>
            </div>
        )
    }
}