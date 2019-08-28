import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            logoutOpacity: 0
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter() {
        console.log('mouse in');
        this.setState({
            logoutOpacity: 1
        })
        console.log(this.state);
    }

    mouseLeave() {
        console.log('mouse out');
        this.setState({
            logoutOpacity: 0
        })
        console.log(this.state);
    }

    render() {
        return(
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="authPanel">
                <div className="userDisplay">{JSON.parse(localStorage.getItem('currentUser')).username}</div>
                <div className="adminDisplay">Admin</div>
                <button style={{opacity:this.state.logoutOpacity}} onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}