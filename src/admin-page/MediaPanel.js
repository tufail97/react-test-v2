import React from 'react';
import Axios from 'axios';

import ImageUploadPanel from './media-panel/upload/ImageUploadPanel.js';
import VideoUploadPanel from './media-panel/upload/VideoUploadPanel.js';
import ImageRender from "./media-panel/content/ImageRender.js";
import VideoRender from './media-panel/content/VideoRender.js';

export default class MediaPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            display: "image",
            isLoading: true,
            imageData: [],
            videoData: []
        }
        this.changeState = this.changeState.bind(this);
        this.contentDecision = this.contentDecision.bind(this);
        this.uploadecision = this.uploadDecision.bind(this);
    }

    componentDidMount() {
        this.getData('http://localhost:3000/images/retreive', 'imageData');
        this.getData('http://localhost:3000/videos/retreive', 'videoData');
    }

    getData(endPoint, stateToSet) {
        Axios.get(endPoint)
        .then(res => {
            var objArray = res.data;
            this.setState({
                [stateToSet]: objArray,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    changeState(state, newVal) {
        console.log('in changeState');
        this.setState({
            [state]: newVal
        })
        console.log(this.state);
    }

    contentDecision(type) {
        return type === "image" ? <ImageRender 
        display={this.state.display}
        passUpState={this.changeState}
        imageData={this.state.imageData} 
        isLoading={this.state.isLoading} 
        currentUser={this.props.currentUser} 
        users={this.props.users}/> 
        : type === "video" ? <VideoRender 
        display={this.state.display}
        videoData={this.state.videoData}
        currentUser={this.props.currentUser}
        users={this.props.users}
        passUpState={this.changeState} />
        : ""
    }

    uploadDecision(type) {
        return type === "image" ? <ImageUploadPanel 
        passUpState={this.changeState}
        imageData={this.state.imageData}
        currentUser={this.props.currentUser} 
        users={this.props.users} 
        isLoading={this.state.isLoading} />
        : type === "video" ? <VideoUploadPanel
        passUpState={this.changeState}
        videoData={this.state.videoData}
        currentUser={this.props.currentUser} 
        users={this.props.users} 
        isLoading={this.state.isLoading} />
        : ""
    }

    render() {
        console.log(this.state);
        return(
            <div>
                <div className="grid-outer">
                {this.contentDecision(this.state.display)}
               
                    <div className="grid-right">
                    {this.uploadDecision(this.state.display)}
                    </div>
                </div>
            </div>
        )
    }

} 