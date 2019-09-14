import React from 'react';

const ImagePreviewRender = (props) => {
    return (
        <div>
            {
            !props.images ? <div>This is where images to be uploaded are displayed (preview before uploading)</div> : 
            <div>
                {
                props.images.map(function(x,index) {
                    return (
                        <div key={index}>
                            <img 
                            key={index + "a"}
                            className="prevImage"
                            src={x} />
                            <div key={index+ "b"}>
                                <div>XX FILENAME XX</div>
                                <div>XX TYPE XX</div>
                                <div>XX DIMENSIONS XX</div>
                                <div>XX SIZE XX</div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            }
        </div>
    )
}

export default ImagePreviewRender;