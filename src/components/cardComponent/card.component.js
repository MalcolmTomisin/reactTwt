import React from 'react';
import './card.styles.css';
import { contributorUploadApi } from '../../network/endpoint';
import { PostData } from '../../services/PostData';
export default class CardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            coordinates: "",
            bilbordTag: "",
            bilbordPin: "",
            uploadFile: [],
            errors: [],
        }
    }
    handleFileChange(event) {
        this.setState({ selectFile: event.target.files[0]})
    }

    onCoordinatesChange(e) {
        this.setState({ coordinates: e.target.value });
        this.clearValidationErr("coordinates");
    }

    onBilbordTagChange(e) {
        this.setState({ bilbordTag: e.target.value });
        this.clearValidationErr("bilbordTag");
    }

    onBilbordPinChange(e) {
        this.setState({ bilbordPin: e.target.value });
        this.clearValidationErr("bilbordPin");
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

    submitUpload(e) {
        e.preventDefault();
        
        console.log(this.state);
        
        let validFields = this.checkFields();

        if(!validFields) {
            let uploadData = {
                coordinates: this.state.coordinates,
                bilbordTag: this.state.bilbordTag,
                bilbordPin: this.state.bilbordPin,
                uploadFile: this.state.uploadFile
            }
            PostData(contributorUploadApi, uploadData)
            .then((result) => {
                console.log(result)
            })
        }
    }

    checkFields() {
        if (this.state.coordinates === "") {
            this.showValidationErr("coordinates", "Coordinates Cannot be empty!");
        }
        if (this.state.bilbordTag === "") {
            this.showValidationErr("bilbordTag", "Bilbord Tag Cannot be empty!");
        }
        if (this.state.bilbordPin === "") {
            this.showValidationErr("bilbordPin", "Bilbord Pin Cannot be empty!");
        }
        if (this.state.uploadFile === ""){
            this.showValidationErr("uploadFile", "File cannot be empty!");
        }
    }
    render() {
        let coordinatesErr = null,
            bilbordTagErr = null,
            bilbordPinErr = null,
            uploadFileErr = null;

        for (let err of this.state.errors) {
            if (err.elm == "username") {
                coordinatesErr = err.msg;
            }
            if (err.elm == "password") {
                bilbordTagErr = err.msg;
            }
            if (err.elm == "email") {
                uploadFileErr = err.msg;
            }
            if (err.elm == "phone") {
                bilbordPinErr = err.msg;
            }
        }
        return(
            <div className="container">
                <div className="header-text">
                    Upload Image/Video and provide required information
                </div>
                    <div className="input-group">
                        <label htmlFor="coordinates" className="upload-label">Coordinates</label>
                        <input type="text" name="coordinates" placeholder="Enter coordinates" className="upload-input" onChange={this.onCoordinatesChange.bind(this)}/>
                        <small className="danger-error">{coordinatesErr ? coordinatesErr : ""}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="bilbordTag" className="upload-label">Bilbord Tag</label>
                        <input type="text" name="bilbordTag" placeholder="Enter the Bilbord Tag" className="upload-input" onChange={this.onBilbordTagChange.bind(this)}/>
                        <small className="danger-error">{bilbordTagErr ? bilbordTagErr : ""}</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="bilbordPin" className="upload-label">Bilbord PIN</label>
                        <input type="text" name="bilbordPin" placeholder="Enter the Bilbord Pin" className="upload-input" onChange={this.onBilbordTagChange.bind(this)}/>
                        <small className="danger-error">{bilbordPinErr ? bilbordPinErr : ""}</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="uploadFile" className="upload-label">Upload image/video</label>
                        <input type="file" name="uploadFile" placeholder="Enter the Bilbord Pin" className="span-text" onChange={this.onBilbordTagChange.bind(this)}/>
                        <small className="danger-error">{uploadFileErr ? uploadFileErr : ""}</small>
                    </div>

                    <button type="button" className="upload-btn" onClick={this.submitLogin}>Submit Bilbord</button>
                </div>
            
        );
    }   
}
