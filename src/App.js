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
        this.getChecked = this.getChecked.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    getChecked() {
        var {data} = this.state;
        console.log(this.state.data);
        var imageCheckboxes = document.querySelectorAll('.imageCheckboxes');
        var checkedVals = [];
        imageCheckboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            checkedVals.push({imageId: checkbox.value});
          }
        })
        Axios.post("http://localhost:3000/deleteimage", checkedVals, {
        })
        .then(res => {
        })
        .catch(function (error) {
          console.log(error);
        });
        var stateCopy = this.state.data;
        for (var j = 0; j < checkedVals.length; j++) {
            for (var i = 0; i < stateCopy.length; i++) {
                if (stateCopy[i].imagePath === checkedVals[j].imageId) {
                    stateCopy.splice(i,1);
                    break;
                }
            }
        }
        this.setState({data: stateCopy});
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
        var {data} = this.state;
        console.log(this.state.data);
        var data = new FormData();
        for (let i = 0; i < this.state.selectedFile.length; i++) {
            data.append('file', this.state.selectedFile[i]);
        }
        Axios.post("http://localhost:3000/upload", data, {
        })
        .then(res => { // then print response status
            console.log(res.statusText);
            Axios.get('http://localhost:3000/images')
            .then(res => {
                this.setState({data: res.data});
                console.log(this.state.data);
                console.log(res.data);
            })
          })
          //console.log(data);
    }


    render() {
        const {isLoading, data} = this.state;
        //console.log(this.state);
        return (
            <div>
            <div>
                <form>
                    <label>Upload your files here</label>
                    <input type="file" multiple onChange={this.onChangeHandler} />
                </form>
                <button onClick={this.onClickHandler}>Upload some files</button>
            </div>
               {
                   isLoading ? <div>Loading....</div> :
                   <div>
                   {data.map(function(x) {
                       return (
                           <div key={x._id}>
                               <img key ={x._id + "a"} style={{width:200, height:200}} src={`http://localhost:3000/${x.imagePath}`} />
                               <input className='imageCheckboxes' type='checkbox' key={x._id} value={x.imagePath}></input>
                           </div>
                       )
                   })}
                   <button onClick={this.getChecked}>Remove elements</button>
                   </div>
               }
            </div>
        )
    }
}




ReactDOM.render(<App />, document.getElementById('root')); 