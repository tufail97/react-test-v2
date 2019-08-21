import React from "react";

export default class AuthPanel extends React.Component {

    render() {
        return(
            <div>
                <div>You are logged in as {this.props.user.username}!</div>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}