import React from 'react';
import ElementDeleteButton from "./ElementDeleteButton.js";


export default class ThumbnailRender extends React.Component {
    constructor() {
        super();
        this.state = {
            checkBoxes: null
        }
        this.getChecked = this.getChecked.bind(this);
    }

    //*************
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
        this.props.remove(checkedVals);
    }

    render() {
        return (
            <div className="grid-left">
                {
                this.props.isLoading ? <div>Loading....</div> :
                <div className="thumbnail-grid">
                {
                    this.props.data.map(function(x) {
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