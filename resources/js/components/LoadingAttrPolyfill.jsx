import React from 'react';
import ReadDOMServer from 'react-dom/server';
import loadingAttributePolyfill from 'loading-attribute-polyfill';

class LoadingAttrPolyfill extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (this.ref.current) {
            const parent = this.ref.current.parentElement;
            loadingAttributePolyfill.prepareElement(this.ref.current);

            if (this.props.onLoad) {
                const resource = parent.querySelector('img, iframe');
                if (resource)
                    resource.addEventListener('load', this.props.onLoad);
            }
        }
    }

    render() {
        const staticMarkup = ReadDOMServer.renderToStaticMarkup(this.props.children);
        return <noscript ref={this.ref} dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
    }
}

export default LoadingAttrPolyfill;
