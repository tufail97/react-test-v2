import React from "react";

export default class GlobalHeader extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="main-header">
                <div className="header-logo"></div>
                <div className="main-title">Anxious Film Club</div>
                <div className="header-border"></div>
            </div>
        )
    }
}
