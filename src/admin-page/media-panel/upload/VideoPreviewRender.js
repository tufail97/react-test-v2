import React from 'react';

function VideoPreviewRender(props) {
    return (
        <div>
            {
            !props.videos ? <div>This is where images to be uploaded are displayed (preview before uploading)</div> : 
            <div>
                {
                props.videos.map(function(x,index) {
                    return (
                        <div key={index}>
                            <video 
                            key={index + "a"}
                            className="prevImage"
                            src={x}
                            ></video>
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

export default VideoPreviewRender;