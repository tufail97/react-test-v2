import React from "react";
import AuthPanel from "./AuthPanel.js";
import { BehaviorSubject } from 'rxjs';

import { authenticationService } from '../_services/authentication.service.js';
import { history } from '../_helpers/history.js';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
console.log(currentUserSubject._value);


export default class GlobalHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedOn: null
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState({
            loggedOn: currentUserSubject._value
        })
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
        this.setState({
            loggedOn: null
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="main-header">
                {this.state.loggedOn || this.props.loggedIn ?
                <AuthPanel 
                loggedOn={this.state.loggedOn}
                logout={this.logout}/> : null
                }
                <div className="main-badge-container">
                    <div className="header-logo"></div>
                    <div className="main-title">Anxious Film Club</div>
                </div>
                <div className="header-border"></div>
            </div>
        )
    }
}
