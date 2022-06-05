import React from 'react';
import {isImgLoaded} from '../utils';

class ImgFadeIn extends React.Component {
    handleLoad(e) {
        const el = e.target;
        if (isImgLoaded(el))
            el.classList.add('fade-in');
    }

    render() {
        return (
            <img
                style={{ opacity: 0 }}
                src={this.props.src}
                srcSet={this.props.srcSet}
                alt={this.props.alt}
                onLoad={e => this.handleLoad(e)}
            />
        );
    }
}

export default ImgFadeIn;
