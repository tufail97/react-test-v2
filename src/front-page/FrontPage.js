import React from "react";
import MainImageRender from "./MainImageRender.js";
import "./FrontPageStyles.css";

export default class FrontPage extends React.Component {
 
    render () {
        return (
            <div>
                <MainImageRender />
            </div>
        )
    }
}