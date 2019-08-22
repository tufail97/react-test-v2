import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="authPanel">
                <div>{console.log("just before props",this.props)}{this.props.user}</div>
                <div>Admin</div>
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}