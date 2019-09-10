import React from 'react';

function ElementDeleteButton(props) {
    return (
        <div>
            <button 
            className="removeElementsButton"
            onClick={props.getCheckBoxes}>
            Remove elements
            </button>
        </div>
    )
}

export default ElementDeleteButton;