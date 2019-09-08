import React from 'react';
import Axios from 'axios';

import ElementDeleteButton from "./ElementDeleteButton.js";

export default class ImageRender extends React.Component {
    constructor() {
        super();
        this.state = {
            checkBoxes: null
        }
        this.getChecked = this.getChecked.bind(this);
        this.handleState = this.handleState.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
    }

    getChecked() {
        var imageCheckboxes = document.querySelectorAll('.imageCheckboxes');
        var checkedVals = [];
        imageCheckboxes.forEach(function(checkbox) {
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
        Axios.post("http://localhost:3000/images/remove", valArray, headerInfo)
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = this.props.imageData;
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
        this.handleState('imageData', stateCopy);
        this.handleState('isLoading', false);
        console.log(this.props.imageData);
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
                    this.props.imageData.map(function(x) {
                        return (
                            <div key={x._id}>
                                <img 
                                className="thumbnailCurrentImage"
                                key ={x._id + "a"} 
                                src={`http://localhost:3000/${x.filePath}`} />
                                <input 
                                className='imageCheckboxes' 
                                type='checkbox' 
                                key={x._id + "b"} 
                                data-object-id={x._id}
                                data-file-path={x.filePath}>
                                </input>
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