import React from "react";

export default class UploadForm extends React.Component {
    render() {
        return (
            <div>
                <form className="uploadForm">
                    <label className="fileInputLabel" htmlFor="fileInput">Select your files here</label>
                    <input 
                    id="fileInput"
                    className="fileInput"
                    type="file" 
                    multiple 
                    onChange={this.props.onChange} />
                </form>
            </div>
        )
    }
}