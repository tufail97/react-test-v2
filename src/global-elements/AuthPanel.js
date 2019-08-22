import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
    }


    render() {
        return(
            <div className="authPanel">
                <div>You are logged in as xxxxx</div>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}