import React from "react";
import Axios from "axios";


export default class MainImageRender extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading : true,
            images : null
        }
    }

    getData() {
        Axios.get("http://localhost:3000/images/retreive")
        .then(res => {
            var objArray = res.data;
            this.setState({
                images: objArray,
                isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const {isLoading, images} = this.state;
        return (
            <div>
                {
                isLoading ? <div>Loading...</div> :
                <div id="glitchImagesContainer">
                    {
                        images.map(function(x) {
                            return (
                                <img 
                                key={x._id} 
                                className="glitchImages" 
                                src={`http://localhost:3000/${x.imagePath}`} />
                            )
                        })
                    }
                </div>
                }
            </div>
        )
    }
}