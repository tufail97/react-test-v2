import React from 'react'

export default class ElementDeleteButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <button 
                onClick={this.props.getCheckBoxes}>
                Remove elements
                </button>
            </div>
        )
    }
}