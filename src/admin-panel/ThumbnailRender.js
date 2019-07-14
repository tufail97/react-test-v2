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

    getChecked() {
        var imageCheckboxes = document.querySelectorAll('.imageCheckboxes');
        var checkedVals = [];
        imageCheckboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            checkedVals.push({imageId: checkbox.value});
          }
        })
        this.setState({checkBoxes: checkedVals})
        console.log(checkedVals);
        console.log(this.state);
        this.props.remove(checkedVals);
    }

    render() {
        return (
            <div>
                {
                   this.props.isLoading ? <div>Loading....</div> :
                   <div>
                   {this.props.data.map(function(x) {
                       return (
                           <div key={x._id}>
                               <img key ={x._id + "a"} style={{width:200, height:200}} src={`http://localhost:3000/${x.imagePath}`} />
                               <input className='imageCheckboxes' type='checkbox' key={x._id} value={x.imagePath}></input>
                           </div>
                       )
                   })}
                   </div>
               }
               <ElementDeleteButton getCheckBoxes={this.getChecked}/>
            </div>
        )
    }
}