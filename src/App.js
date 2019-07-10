import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: []
        }
        this.getChecked = this.getChecked.bind(this);
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

    render() {
        const {isLoading, data} = this.state;
        //console.log(this.state);
        return (
            <div>
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