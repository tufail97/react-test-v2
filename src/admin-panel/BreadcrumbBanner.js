import React from "react";

export default class BreadcrumbBanner extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="breadcrumbContainer">
                <div className="breadcrumbCopyContainer">
                    <div className="breadcrumbPath locationParent">Location 1</div>
                    <div className="breadcrumbPath locationSeparator">&#9632;</div>
                    <div className="breadcrumbPath locationChild">Location 2</div>
                </div>
                <div className="breadcrumbBorder"></div>
            </div>
        )
    }
}