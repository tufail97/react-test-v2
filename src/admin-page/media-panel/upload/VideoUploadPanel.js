import React from 'react';
import Axios from 'axios';

import VideoPreviewRender from "./VideoPreviewRender.js";
import UploadForm from "./UploadForm.js";
import UploadButton from "./UploadButton.js";

export default class VideoUploadPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null,
            previewVideos: null
        }
        this.getPreviewVideos = this.getPreviewVideos.bind(this);
        this.getEncodedVideo = this.getEncodedVideo.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            selectedFile: e.target.files
        })
        this.getPreviewVideos(e.target.files);
    }

    getPreviewVideos(files) {
        var previewImagesArray = [];
        for (var i = 0; i < files.length; i++) {
            this.getEncodedVideo(files[i],previewImagesArray, files.length);
        }
    }

    getEncodedVideo(file, previewArray, targetLength) {
        var reader = new FileReader();
        console.log(reader);
        reader.readAsDataURL(file);
        reader.addEventListener('load', (e) => {
            var targetFile = e.target.result;
            console.log(targetFile);
            previewArray.push(targetFile);
           if (previewArray.length === targetLength) {
               this.setState({
                   previewVideos: previewArray
                });
           } else {
               console.log('preview images not done');
           }
        })
    }

    onClickHandler(e) {
        var headerInfo = {
            headers: {'Authorization': "bearer " + this.props.currentUser.token}
        }
        console.log(this.props.currentUser);
        if (this.state.selectedFile) {
            this.handleState('isLoading', true);
            console.log(this.props.imageData);
            var formData = new FormData();
            for (let i = 0; i < this.state.selectedFile.length; i++) {
                formData.append('file', this.state.selectedFile[i]);
            }
            Axios.post("http://localhost:3000/videos/upload", formData, headerInfo
            )
            .then(res => {
                Axios.get('http://localhost:3000/videos/retreive')
                .then(res => {
                    this.handleState('videoData', res.data);
                    this.handleState('isLoading', false);
                })
            })
            document.querySelector('.fileInput').value = null;
            this.setState({
                selectedFile: null,
                previewVideos: null
            });
        } else {
            console.log('insert error warning');
        }
    }
    
    handleState(state, value) {
        this.props.passUpState(state, value);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <UploadForm 
                onChange={this.onChangeHandler}/>

                <VideoPreviewRender 
                videos={this.state.previewVideos} />

                <UploadButton 
                clickHandler={this.onClickHandler} />
            </div>
        )
    }
}