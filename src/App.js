import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import ThumbnailRender from "./ThumbnailRender.js";

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

ReactDOM.render(<App />, document.getElementById('root')); 