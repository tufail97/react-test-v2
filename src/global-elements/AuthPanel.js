import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            logoutOpacity: 0,
            logoutVisibility: "hidden",
            logoutPointer: "none",
            logoutMobile: false
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    mouseEnter() {
        console.log('mouse in');
        this.setState({
            logoutOpacity: 1,
            logoutVisibility: "visible"
        })
        if (this.state.logoutMobile === false) {
            this.setState({
                logoutPointer: "auto"
            })
        }
    }

    mouseLeave() {
        console.log('mouse out');
        this.setState({
            logoutOpacity: 0,
            logoutVisibility: "hidden",
            logoutPointer: "none"
        })
    }

    mouseClick() {
        console.log('clicked');
        this.setState({
            logoutVisibility: "visible",
            logoutOpacity: 1,
            logoutPointer: "auto",
            logoutMobile: true
        })
    }

    render() {
        console.log(this.state);
        return(
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="authPanel">
                <div onClick={this.mouseClick}>
                    <div className="userDisplay">{JSON.parse(localStorage.getItem('currentUser')).username}</div>
                    <div className="adminDisplay">Admin</div>
                </div>
                <button style={{opacity:this.state.logoutOpacity, visibility:this.state.logoutVisibility,pointerEvents:this.state.logoutPointer}} onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}