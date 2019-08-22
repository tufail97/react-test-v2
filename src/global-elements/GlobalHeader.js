import React from "react";
import AuthPanel from "./AuthPanel.js";
import { BehaviorSubject } from 'rxjs';

import { authenticationService } from '../_services/authentication.service.js';
import { history } from '../_helpers/history.js';

export default class GlobalHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: null
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        console.log(localStorage);
        this.setState({
            loggedIn: false
        })
        authenticationService.logout();
        history.push('/login');
    }


    render() {
        console.log(this.props);
        return (
            <div className="main-header">
                <div className="main-header-inner">
                    {localStorage.length === 1 ? <AuthPanel 
                    user={this.props.user}
                    logout={this.logout}/> : null
                    }
                    
                    <div className="main-badge-container">
                        <div className="header-logo"></div>
                        <div className="main-title">Anxious Film Club</div>
                    </div>
                </div>
                <div className="header-border"></div>
            </div>
        )
    }
}
