import React from 'react';
import './card.styles.css';
import { contributorUploadApi } from '../../network/endpoint';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class CardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            latitude: "",
            coordinates: "",
            bilbordTag: "",
            bilbordPin: "",
            uploadFile: [],
            errors: [],
            longitude: "",
            isLoading: false
        }
    }
    handleFileChange(e) {
        this.setState({ uploadFile: e.target.files[0]})
        this.clearValidationErr("uploadFile");
    }

    onCoordinatesChange(e) {
        this.setState({ coordinates: e.target.value });
        this.clearValidationErr("coordinates");
    }

    onLatitudeChange(e) {
        this.setState({ latitude: e.target.value });
        this.clearValidationErr("latitude");
    }

    onLongitudeChange(e) {
        this.setState({ longitude: e.target.value });
        this.clearValidationErr("longitude");
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
                if (elm !== err.elm) {
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

        if (validFields) {
            this.setState({ isLoading: false });
            let formData = new FormData();
            let uploadData = {
                coordinates: this.state.coordinates,
                bilbordTag: this.state.bilbordTag,
                bilbordPin: this.state.bilbordPin,
                uploadFile: this.state.uploadFile
            }
            for (let key in uploadData) {
                formData.append(key, uploadData[key])
                console.log(uploadData[key])
            }

            fetch(contributorUploadApi, {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem("userData"),
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    res.success
                      ? toast.success(res.status, { autoClose: 6000 })
                      : toast.error(res.status, { autoClose: 10000 });
                })
                .catch(err => {
                    console.log(err)
                    toast.error('Error',{autoClose: 3000})
                })
            .finally(() => this.setState({isLoading: false}))
        } else {
            toast.error('Invalid fields', {autoClose: 3000})
        }
    }

    checkFields() {
        const {  bilbordTag, bilbordPin, uploadFile, latitude, longitude } = this.state;
        if (longitude === "") {
            this.showValidationErr("longitude", "Longitude Cannot be empty!")
            return false;
        }
        if (latitude === "") {
            this.showValidationErr("latitude", "Latitude Cannot be empty!")
            return false;
        }
        if (bilbordTag === "") {
            this.showValidationErr("bilbordTag", "Bilbord Tag Cannot be empty!");
            return false;
        }
        if (bilbordPin === "") {
            this.showValidationErr("bilbordPin", "Bilbord Pin Cannot be empty!");
            return false;
        }
        if (uploadFile === ""){
            this.showValidationErr("uploadFile", "File cannot be empty!");
            return false;
        }
        return true;
    }
    render() {
        const { isLoading } = this.state;
        let bilbordTagErr = null,
            bilbordPinErr = null,
            uploadFileErr = null,
            latitudeErr = null,
            longitudeErr = null;

        for (let err of this.state.errors) {
            if (err.elm === "bilbordTag") {
                bilbordTagErr = err.msg;
            }
            if (err.elm === "uploadFile") {
                uploadFileErr = err.msg;
            }
            if (err.elm === "bilbordPin") {
                bilbordPinErr = err.msg;
            }
            if (err.elm === "latitude") {
                latitudeErr = err.msg;
            }
            if (err.elm === "longitude") {
                longitudeErr = err.msg;
            }
        }
        if (isLoading) {
            return (
              <Loader type="Circles" color="#D60000" height={80} width={80} />
            );
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="header-text">
                            Upload Image/Video and provide required information
                        </div>
                        <div className="input-group">
                            <label htmlFor="latitude" className="upload-label">Latitude</label>
                            <input type="text" name="latitude" placeholder="Enter Latitude" className="upload-input" onChange={this.onCoordinatesChange.bind(this)}/>
                            <small className="danger-error">{latitudeErr ? latitudeErr : ""}</small>
                        </div>
                        <div className="input-group">
                            <label htmlFor="longitude" className="upload-label">Longitude</label>
                            <input type="text" name="longitude" placeholder="Enter Longitude" className="upload-input" onChange={this.onCoordinatesChange.bind(this)} />
                            <small className="danger-error">{longitudeErr ? longitudeErr : ""}</small>
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

                        <button type="button" className="upload-btn" onClick={this.submitUpload.bind(this)}>Submit Bilbord</button>
                    </div>
                </div>
            </div>
        );
    }   
}

toast.configure();
