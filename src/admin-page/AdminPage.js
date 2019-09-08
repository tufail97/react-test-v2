import React from 'react';

import BreadcrumbBanner from './BreadcrumbBanner.js';
import MediaPanel from './MediaPanel.js';

import { authenticationService } from '../_services/authentication.service.js';
import { userService } from "../_services/user.service.js";

export default class AdminPage extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        }
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    render() {
        return (
            <div>
                <BreadcrumbBanner />
                <MediaPanel 
                currentUser={this.state.currentUser}
                users={this.state.users}/>
            </div>
        )
    }
}