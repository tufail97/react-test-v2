import React from 'react';
import Axios from 'axios';

import PreviewRender from "./PreviewRender.js";
import UploadForm from "./UploadForm.js";
import UploadButton from "./UploadButton.js";

export default class UploadPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null,
            previewImages: null
        }
        this.getPreviewImages = this.getPreviewImages.bind(this);
        this.getEncodedImage = this.getEncodedImage.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            selectedFile: e.target.files
        })
        this.getPreviewImages(e.target.files);
    }

    getPreviewImages(files) {
        var previewImagesArray = [];
        for (var i = 0; i < files.length; i++) {
            this.getImageSize(files[0]);
            this.getImageName(files[0]);
            this.getImageType(files[0]);
            this.getEncodedImage(files[i],previewImagesArray, files.length);
        }
    }

    getImageSize(fileInList) {
        console.log("this is the size",fileInList.size);
    }

    getImageName(fileInList) {
        console.log("this is the name",fileInList.name);
    }

    getImageType(fileInList) {
        console.log("this is the type",fileInList.type);
    }

    getEncodedImage(file, previewArray, targetLength) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (e) => {
            var targetFile = e.target.result;
            this.getImageDimensions(targetFile);
            previewArray.push(targetFile);
           if (previewArray.length === targetLength) {
               this.setState({
                   previewImages: previewArray
                });
           } else {
               console.log('preview images not done');
           }
        })
    }

    getImageDimensions(imageSrc) {
        var currentImage = new Image();
        currentImage.src = imageSrc;
        currentImage.addEventListener('load', function(e){
            console.log("this is the width",currentImage.width);
            console.log("this is the height",currentImage.height);
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
            Axios.post("http://localhost:3000/images/upload", formData, headerInfo
            )
            .then(res => {
                Axios.get('http://localhost:3000/images/retreive')
                .then(res => {
                    this.handleState('imageData', res.data);
                    this.handleState('isLoading', false);
                })
            })
            document.querySelector('.fileInput').value = null;
            this.setState({
                selectedFile: null,
                previewImages: null
            });
        } else {
            console.log('insert error warning');
        }
    }

    handleState(state, value) {
        this.props.passUpState(state, value);
    }

    render() {
        return (
            <div>
                <UploadForm 
                onChange={this.onChangeHandler}/>

                <PreviewRender 
                images={this.state.previewImages} />

                <UploadButton 
                clickHandler={this.onClickHandler} />
            </div>
        )
    }
}