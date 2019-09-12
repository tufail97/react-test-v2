import React from 'react';
import Axios from 'axios';

import ElementDeleteButton from './ElementDeleteButton.js';
import FileCheckbox from './FileCheckbox.js';

export default class VideoRender extends React.Component {
    constructor() {
        super();
        this.state = {
            checkBoxes: null
        }
        this.handleState = this.handleState.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
        this.getChecked = this.getChecked.bind(this);
    }


    getChecked() {
        var fileCheckboxes = document.querySelectorAll('.fileCheckboxes');
        var checkedVals = [];
        fileCheckboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            checkedVals.push({
                localPath: checkbox.dataset.filePath, 
                objectId:checkbox.dataset.objectId
            });
          }
        })
        this.setState({checkBoxes: checkedVals})
        this.removeChecked(checkedVals);
    }

    removeChecked(valArray) {
        var headerInfo = {
            headers: {'Authorization': "bearer " + this.props.currentUser.token}
        }
        this.handleState('isLoading', true);
        Axios.post("http://localhost:3000/videos/remove", valArray, headerInfo)
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = this.props.videoData;
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
        this.handleState('videoData', stateCopy);
        this.handleState('isLoading', false);
        console.log(this.props.videoData);
    }

    handleState(state, value) {
        this.props.passUpState(state, value);
    }

    render() {
        return (
            <div className="grid-left">
                {
                this.props.isLoading ? <div>Loading....</div> :
                <div className="thumbnail-grid">
                {
                    this.props.videoData.map(function(x) {
                        return (
                            <div key={x._id}>
                                <video 
                                className="thumbnailCurrentImage"
                                key ={x._id + "a"} 
                                src={`http://localhost:3000/${x.filePath}`}>
                                </video>
                                <FileCheckbox 
                                fileData={x}/>
                            </div>
                        )
                    })
                }
                </div>
                }
               <ElementDeleteButton 
               getCheckBoxes={this.getChecked}/>
            </div>
        )
    }
}