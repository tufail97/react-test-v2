import React from 'react';
import Axios from 'axios';

import ThumbnailRender from "./content/ThumbnailRender.js";
import BreadcrumbBanner from './BreadcrumbBanner.js';
import AdminPanelVideo from './AdminPanelVideo.js';
import UploadPanel from './upload/UploadPanel.js';

import { authenticationService } from '../_services/authentication.service.js';
import { userService } from "../_services/user.service.js";

export default class AdminPage extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            display: "image",
            isLoading: true,
            imageData: []
        }
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        this.getData();
        userService.getAll().then(users => this.setState({ users }));
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    changeState(state, newVal) {
        console.log('in changeState');
        this.setState({
            [state]: newVal
        })
        console.log(this.state);
    }

    getData() {
        Axios.get('http://localhost:3000/images/retreive')
        .then(res => {
            var objArray = res.data;
            this.setState({
                imageData: objArray,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    displayDecision(type) {
        return type === "image" ? <ThumbnailRender 
        passUpState={this.changeState}
        imageData={this.state.imageData} 
        isLoading={this.state.isLoading} 
        currentUser={this.state.currentUser} 
        users={this.state.users}/> 
        : type === "video" ? <AdminPanelVideo />
        : ""
    }

    render() {
        return (
            <div>
                <BreadcrumbBanner />
                <div className="grid-outer">
                    { this.displayDecision(this.state.display) }

                    <div className="grid-right">
                        <UploadPanel 
                        passUpState={this.changeState}
                        imageData={this.state.imageData}
                        currentUser={this.state.currentUser} 
                        users={this.state.users} 
                        isLoading={this.state.isLoading} />
                    </div>
                </div>
            </div>
        )
    }
}