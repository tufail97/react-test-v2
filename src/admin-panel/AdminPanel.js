import React from 'react';

import { authenticationService } from '../_services/authentication.service.js';
import { userService } from "../_services/user.service.js";

import BreadcrumbBanner from './BreadcrumbBanner.js';
import AdminPanelImage from './AdminPanelImage.js';
import AdminPanelVideo from './AdminPanelVideo.js';

export default class AdminPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            display: "image"
        }
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    displayDecision(type) {
        return type === "image" ? <AdminPanelImage currentUser={this.state.currentUser} users={this.state.users}/> 
        : type === "video" ? <AdminPanelVideo />
        : ""
    }

    render() {
        return (
            <div>
                <BreadcrumbBanner />
                { this.displayDecision(this.state.display) }
            </div>
        )
    }
}