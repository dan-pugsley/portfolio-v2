import React from 'react';
import ReactDOM from 'react-dom/client';

import SvgResources from './SvgResources';
import NavBar from './NavBar';
import BioSection from './BioSection';
import ExpSection from './ExpSection';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolled: false,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        this.setState({
            isScrolled: window.scrollY > 0
        });
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <>
                <SvgResources />
                <NavBar isPageScrolled={this.state.isScrolled} />
                <BioSection />
                <ExpSection tags={tags} />
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('js-container')).render(<Page />);
