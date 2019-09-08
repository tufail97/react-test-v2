import React from 'react';

import ImageRender from "./ImageRender.js";
import VideoRender from './VideoRender.js';

export default class ContentPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            display: "image"
        }
    }

    // displayDecision(type) {
    //     return type === "image" ? <ImageRender 
    //     passUpState={this.changeState}
    //     imageData={this.state.imageData} 
    //     isLoading={this.state.isLoading} 
    //     currentUser={this.props.currentUser} 
    //     users={this.props.users}/> 
    //     : type === "video" ? <VideoRender />
    //     : ""
    // }

    render() {
        return(
            <div>
                <ImageRender 
                test={this.test}
                imageData={this.props.imageData}
                currentUser={this.props.currentUser}
                users={this.props.users}
                passUpState={this.props.passUpState}
                />
                <VideoRender />
            </div>
        )
    }
}