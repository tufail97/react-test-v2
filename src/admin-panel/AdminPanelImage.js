import React from 'react';
import Axios from 'axios';

import ThumbnailRender from "./ThumbnailRender.js";
import PreviewRender from "./PreviewRender.js";
import UploadForm from "./UploadForm.js";
import UploadButton from "./UploadButton.js";

export default class AdminPanelImage extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: [],
            selectedFile: null,
            previewImages: null
        }
        this.removeChecked = this.removeChecked.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getPreviewImages = this.getPreviewImages.bind(this);
        this.getEncodedImage = this.getEncodedImage.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    //*************
    removeChecked(valArray) {
        var headerInfo = {
            headers: {'Authorization': "bearer " + this.props.currentUser.token}
        }
        this.setState({isLoading: true});
        console.log(this.state.data);
        Axios.post("http://localhost:3000/images/remove", valArray, headerInfo)
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = this.state.data;
        console.log('this is statecopy', stateCopy);
        for (var j = 0; j < valArray.length; j++) {
            for (var i = 0; i < stateCopy.length; i++) {
                if (stateCopy[i]._id === valArray[j].objectId) {
                    console.log(stateCopy[i]._id, valArray[j].objectId)
                    stateCopy.splice(i,1);
                    break;
                }
            }
        }
        this.setState({data: stateCopy, isLoading: false});
        console.log(this.state.data);
    }

     getData() {
        Axios.get('http://localhost:3000/images/retreive')
        .then(res => {
            var objArray = res.data;
            this.setState({
                data: objArray,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
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
               console.log('preview images done');
               console.log(previewArray);
               this.setState({previewImages: previewArray});
               console.log(this.state);
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
            var {data, isLoading} = this.state;
            this.setState({isLoading: true});
            console.log(this.state.data);
            var data = new FormData();
            for (let i = 0; i < this.state.selectedFile.length; i++) {
                data.append('file', this.state.selectedFile[i]);
            }
            Axios.post("http://localhost:3000/images/upload", data, headerInfo
            )
            .then(res => {
                Axios.get('http://localhost:3000/images/retreive')
                .then(res => {
                    this.setState({data: res.data, isLoading: false});
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

    render() {
        return(
            <div className="grid-outer">
                <ThumbnailRender 
                data={this.state.data} 
                isLoading={this.state.isLoading} 
                remove={this.removeChecked}/>   

                <div className="grid-right">
                    <UploadForm 
                    onChange={this.onChangeHandler}/>

                    <PreviewRender 
                    images={this.state.previewImages} />

                    <UploadButton 
                    clickHandler={this.onClickHandler} />
                </div>
            </div>
        )
    }
}

