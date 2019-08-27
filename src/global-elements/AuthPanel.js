import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="authPanel">
                <div>{JSON.parse(localStorage.getItem('currentUser')).username}</div>
                <div>Admin</div>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}