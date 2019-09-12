import React from 'react';

function FileCheckbox(props) {
    console.log(props);
    return (
        <input 
        className='fileCheckboxes' 
        type='checkbox' 
        key={props.fileData._id + "b"} 
        data-object-id={props.fileData._id}
        data-file-path={props.fileData.filePath}>
        </input>
    )
}

export default FileCheckbox;