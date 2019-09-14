import React from "react";

const UploadButton = (props) => {
    return (
        <div>
            <button 
            className="uploadButton"
            onClick={props.clickHandler}>
            Upload your files
            </button>
        </div>
    )
}

export default UploadButton;