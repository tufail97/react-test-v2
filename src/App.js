import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import MyRender from "./MyRender.js";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: null
        }
    }

    getData() {
        Axios.get('http://localhost:3000/images')
        .then(res => {
            var objArray = res.data;
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

    render() {
        const {isLoading, data} = this.state;
        //console.log(this.state);
        return (
            <div>
               {
                   isLoading ? <div>Loading....</div> : <MyRender data= {this.state.data}/>
               }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root')); 