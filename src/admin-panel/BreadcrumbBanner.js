import React from "react";

export default class BreadcrumbBanner extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="breadcrumbContainer">
                <div className="breadcrumbCopyContainer">
                    <div className="breadcrumbPath location">Front Page</div>
                    <div className="breadcrumbPath locationSeparator">&#9632;</div>
                    <div className="breadcrumbPath option">Images</div>
                </div>
                <div className="breadcrumbBorder"></div>
            </div>
        )
    }
}