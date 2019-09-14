import React from "react";

const BreadcrumbBanner = () => {
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

export default BreadcrumbBanner;