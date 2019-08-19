import React from 'react';

export default class PreviewRender extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div className="previewOuter">
                {
                    !this.props.images ? <div>hello</div> : 
                    <div>
                        {
                            this.props.images.map(function(x) {
                                return (
                                    <img 
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