import React from "react";

export default class UploadButton extends React.Component {
    render() {
        return (
            <div>
                <button 
                className="uploadButton"
                onClick={this.props.clickHandler}>
                Upload your files
                </button>
            </div>
        )
    }
}