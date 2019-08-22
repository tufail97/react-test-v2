import React from "react";
import AuthPanel from "./AuthPanel.js";
import { BehaviorSubject } from 'rxjs';

import { authenticationService } from '../_services/authentication.service.js';
import { history } from '../_helpers/history.js';

export default class GlobalHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            headerStorage: 0
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
        this.setState({
            headerStorage: 0
        })
    }

    componentWillMount () {
        this.setState({
            headerStorage: 1
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="main-header">
                {this.props.storage === 1 || this.state.headerStorage === 1 ?
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
