import React from 'react';
import ReadDOMServer from 'react-dom/server';
import loadingAttributePolyfill from 'loading-attribute-polyfill';

class LoadingAttrPolyfill extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (this.ref.current)
            loadingAttributePolyfill.prepareElement(this.ref.current);
    }

    render() {
        const staticMarkup = ReadDOMServer.renderToStaticMarkup(this.props.children);
        return <noscript ref={this.ref} dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
    }
}

export default LoadingAttrPolyfill;
