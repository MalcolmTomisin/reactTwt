import React from 'react';
import { Card } from 'react-bootstrap';
import  IosAddCircleOutline  from 'react-ionicons/lib/IosAddCircleOutline';
import './card.styles.css';


const iconStyle = {
    position: 'relative',
    right: '4px',
    bottom: '1px',
    fontWeight: '400',
}

export default class CardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            selectFile: null
        }
    }
    handleFileChange = (event) => {
        this.setState({ selectFile: event.target.files[0]})
    }

    uploadFileHandler = () => {

    }
    
    render() {
        return(
            <Card style={{ width: '30rem', height: '30rem', border: 'none', backgroundColor: '#FEDDD9' }}>
                <div>
                    <h1 className="center">Upload File</h1>
                    <div>
                        <h4 className="center">Click button to upload files</h4>
                        
                    </div>
                    <input 
                        className="input-file" 
                        type="file" 
                        name="selectedFile" 
                        onChange={this.handleFileChange}
                        ref={fileInput => this.fileInput = fileInput}
                        multiple
                    />            
                    <button 
                      className="btn btn-danger"
                      onClick={() => this.fileInput.click()}
                    >
                        <IosAddCircleOutline color="#fff" fontSize="25px" style={iconStyle}/>
                        Add Files
                    </button>
                    <button className="upload-button" onClick={this.uploadFileHandler}></button>
                </div>        
            </Card>
        );
    }   
}
