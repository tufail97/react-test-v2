import React, {useEffect, useState} from 'react';
import Axios from 'axios';

import ElementDeleteButton from "./ElementDeleteButton.js";
import FileCheckbox from './FileCheckbox.js';
import HandleState from './HandleState.js';

const ImageRender = (props) => {
    const [checkBoxes, setCheckBoxes] = useState(null);

    const getChecked = () => {
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
        setCheckBoxes(checkedVals);
        removeChecked(checkedVals);
    }

    const removeChecked = (valArray) => {
        var headerInfo = {
            headers: {'Authorization': "bearer " + props.currentUser.token}
        }
        HandleState('isLoading', true, props.passUpState);
        Axios.post("http://localhost:3000/images/remove", valArray, headerInfo)
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = props.imageData;
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
        HandleState('imageData', stateCopy, props.passUpState);
        HandleState('isLoading', false, props.passUpState);
        console.log(props.imageData);
    }

    return (
        <div className="grid-left">
            {
            props.isLoading ? <div>Loading....</div> :
            <div className="thumbnail-grid">
            {
                props.imageData.map(function(x) {
                    return (
                        <div key={x._id}>
                            <img 
                            className="thumbnailCurrentImage"
                            key ={x._id + "a"} 
                            src={`http://localhost:3000/${x.filePath}`} />
                            <FileCheckbox 
                            fileData={x}/>
                        </div>
                    )
                })
            }
            </div>
            }
            <ElementDeleteButton 
            getCheckBoxes={getChecked}/>
        </div>
    )
}

export default ImageRender;