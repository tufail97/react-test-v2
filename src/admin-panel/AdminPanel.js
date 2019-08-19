import React from 'react';
import Axios from "axios";
import ThumbnailRender from "./ThumbnailRender.js";
import PreviewRender from "./PreviewRender.js";
import "./AdminPanelStyles.css";

import { history } from '../_helpers/history.js';
import { authenticationService } from '../_services/authentication.service.js';
import { userService } from "../_services/user.service.js";

export default class AdminPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: [],
            selectedFile: null,
            currentUser: authenticationService.currentUserValue,
            users: null,
            previewImages: null
        }
        this.removeChecked = this.removeChecked.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.getBase = this.getBase.bind(this);
    }

    removeChecked(valArray) {
        var headerInfo = {
            headers: {'Authorization': "bearer " + this.state.currentUser.token}
        }
        var {data, isLoading} = this.state;
        this.setState({isLoading: true});
        console.log(this.state.data);
        Axios.post("http://localhost:3000/images/remove", valArray, headerInfo)
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = this.state.data;
        for (var j = 0; j < valArray.length; j++) {
            for (var i = 0; i < stateCopy.length; i++) {
                if (stateCopy[i].imagePath === valArray[j].imageId) {
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

    componentDidMount() {
        this.getData();
        userService.getAll().then(users => this.setState({ users }));
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    onChangeHandler(e) {
        this.setState({
            selectedFile: e.target.files
        })
        var files = e.target.files;
        console.log(files.length);
        var previewImagesArray = [];
        for (var i = 0; i < files.length; i++) {
            this.getBase(files[i],previewImagesArray, files.length);
        }
    }

    getBase(file, previewArray, targetLength) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (e) => {
            var targetFile = e.target.result;
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


    onClickHandler(e) {
        var headerInfo = {
            headers: {'Authorization': "bearer " + this.state.currentUser.token}
        }
        console.log(this.state.currentUser);
        if (this.state.selectedFile) {
            var {data, isLoading, currentUser, users} = this.state;
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
        const {isLoading, data} = this.state;
        //console.log(this.state);
        return (
            <div>
                <div>You are logged in as {this.state.currentUser.username}!</div>
                <button onClick={this.logout}>Logout</button>
                <div>
                    <form>
                        <label className="fileInputLabel" htmlFor="fileInput">Upload your files here</label>
                        <input 
                        id="fileInput"
                        className="fileInput"
                        type="file" 
                        multiple 
                        onChange={this.onChangeHandler} />
                    </form>
                    <PreviewRender 
                    images={this.state.previewImages} />
                    <button 
                    onClick={this.onClickHandler}>
                    Upload some files
                    </button>
                </div>
                <ThumbnailRender 
                data={this.state.data} 
                isLoading={this.state.isLoading} 
                remove={this.removeChecked}/>
            </div>
        )
    }
}