import React from "react";
import AuthPanel from "./AuthPanel.js";

import { authenticationService } from '../_services/authentication.service.js';
import { history } from '../_helpers/history.js';

export default class GlobalHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedStatus: authenticationService.currentUser.source._value
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
        this.setState({
            loggedStatus: null
        })
    }

    render() {
        return (
            <div className="main-header">
                {this.state.loggedStatus ?
                <AuthPanel 
                user={this.state.loggedStatus}
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
