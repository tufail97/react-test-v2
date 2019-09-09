import React from 'react';
import Axios from 'axios';

import UploadPanel from './media-panel/upload/UploadPanel.js';
import ImageRender from "./media-panel/content/ImageRender.js";
import VideoRender from './media-panel/content/VideoRender.js';

export default class MediaPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            display: "image",
            isLoading: true,
            imageData: []
        }
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {
        this.getData('http://localhost:3000/images/retreive', 'imageData');
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

    //     displayDecision(type) {
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
                <div className="grid-outer">
                <ImageRender 
                imageData={this.state.imageData}
                currentUser={this.props.currentUser}
                users={this.props.users}
                passUpState={this.changeState}
                />
                {/* <VideoRender /> */}
               
                    <div className="grid-right">
                        <UploadPanel 
                        passUpState={this.changeState}
                        imageData={this.state.imageData}
                        currentUser={this.props.currentUser} 
                        users={this.props.users} 
                        isLoading={this.state.isLoading} />
                    </div>
                </div>
            </div>
        )
    }

} 