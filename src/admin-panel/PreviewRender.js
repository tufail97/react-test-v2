import React from 'react';

export default class PreviewRender extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div className="previewOuter">
                {
                    !this.props.images ? <div>This is where images to be uploaded are displayed</div> : 
                    <div>
                        {
                            this.props.images.map(function(x,index) {
                                return (
                                    <img 
                                    key={index}
                                    className="prevImage"
                                    src={x} />
                                    )
                                }
                                )
                        }
                    </div>
                }
            </div>
        )
    }
} 