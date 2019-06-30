import React, { Component } from 'react'

export default class MyRender extends Component {
    
    
    render() {
        const {data} = this.props;
        console.log(data);
        return (
            <div>
            {data.map(function(x) {
                return (
                    <div key={x._id}>
                        <img key ={x._id = "a"} src={`http://localhost:3000/${x.imagePath}`} />
                        <input type='checkbox' key={x._id} value={x.imagePath}></input>
                    </div>
                )
            })}
                This is the render from MyRender
            </div>
        )
    }
}