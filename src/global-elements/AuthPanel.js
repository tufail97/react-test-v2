import React from "react";

export default class AuthPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            logoutOpacity: 0,
            logoutDisplay: "none"
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
    }

    mouseEnter() {
        console.log('mouse in');
        this.setState({
            logoutOpacity: 1,
            logoutDisplay: "block"
        })
    }

    mouseLeave() {
        console.log('mouse out');
        this.setState({
            logoutOpacity: 0,
            logoutDisplay: "none"
        })
    }

    mouseClick() {
        console.log('clicked');
        this.setState({
            logoutDisplay: "block",
            logoutOpacity: 1
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
                <button style={{opacity:this.state.logoutOpacity, display:this.state.logoutDisplay}} onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}