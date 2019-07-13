import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: [],
            selectedFile: null
        }
        this.removeChecked = this.removeChecked.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    removeChecked(valArray) {
        var {data, isLoading} = this.state;
        this.setState({isLoading: true});
        console.log(this.state.data);
        Axios.post("http://localhost:3000/deleteimage", valArray, {
        })
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
        Axios.get('http://localhost:3000/images')
        .then(res => {
            var objArray = res.data;
            console.log('looooooaddddded');
            this.setState({
                data: objArray,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentWillMount() {
        this.getData();
    }

    onChangeHandler(e) {
        console.log(e.target.files);
        this.setState({
            selectedFile: e.target.files
        })
    }

    onClickHandler(e) {
        var {data, isLoading} = this.state;
        this.setState({isLoading: true});
        console.log(this.state.data);
        var data = new FormData();
        for (let i = 0; i < this.state.selectedFile.length; i++) {
            data.append('file', this.state.selectedFile[i]);
        }
        Axios.post("http://localhost:3000/upload", data, {
        })
        .then(res => {
            Axios.get('http://localhost:3000/images')
            .then(res => {
                this.setState({data: res.data, isLoading: false});
            })
          })
    }


    render() {
        const {isLoading, data} = this.state;
        return (
            <div>
                <div>
                    <form>
                        <label>Upload your files here</label>
                        <input type="file" multiple onChange={this.onChangeHandler} />
                    </form>
                    <button onClick={this.onClickHandler}>Upload some files</button>
                </div>
                <ThumbnailRender data={this.state.data} isLoading={this.state.isLoading} remove={this.removeChecked}/>
            </div>
        )
    }
}

class ThumbnailRender extends React.Component {
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

class ElementDeleteButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <button onClick={this.props.getCheckBoxes}>Remove elements</button>
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('root')); 