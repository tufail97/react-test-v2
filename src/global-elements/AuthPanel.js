import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="authPanel">
                <div>{this.props.user}</div>
                <div>Admin</div>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}