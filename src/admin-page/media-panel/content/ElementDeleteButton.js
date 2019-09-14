import React from 'react';

const ElementDeleteButton = (props) => {
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