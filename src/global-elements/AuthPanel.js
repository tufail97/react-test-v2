import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            logoutOpacity: 0,
            logoutPointer: "none",
            logoutMobile: false
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    mouseEnter() {
        this.setState({
            logoutOpacity: 1,
        })
        if (this.state.logoutMobile === false) {
            this.setState({
                logoutPointer: "auto"
            })
        }
    }

    mouseLeave() {
        this.setState({
            logoutOpacity: 0,
            logoutPointer: "none"
        })
    }

    mouseClick() {
        this.setState({
            logoutOpacity: 1,
            logoutPointer: "auto",
            logoutMobile: true
        })
    }

    render() {
        return(
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="authPanel">
                <div onClick={this.mouseClick}>
                    <div className="userDisplay">{JSON.parse(localStorage.getItem('currentUser')).username}</div>
                    <div className="adminDisplay">Admin</div>
                </div>
                <button style={{opacity:this.state.logoutOpacity, pointerEvents:this.state.logoutPointer}} onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}