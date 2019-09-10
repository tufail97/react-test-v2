import React from "react";

function UploadForm(props) {
    return (
        <div>
            <form className="uploadForm">
                <label className="fileInputLabel" htmlFor="fileInput">Select your files here</label>
                <input 
                id="fileInput"
                className="fileInput"
                type="file" 
                multiple 
                onChange={props.onChange} />
            </form>
        </div>
    )
}

export default UploadForm;