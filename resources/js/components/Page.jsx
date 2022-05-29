import React from 'react';
import ReactDOM from 'react-dom/client';

import SvgResources from './SvgResources';
import NavBar from './NavBar';
import BioSection from './BioSection';
import ExpSection from './ExpSection';
import ContactSection from './ContactSection';
import SocialLinks from './SocialLinks';
import Footer from './Footer';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavMenuOpen: false,
            isScrolled: false,
        };
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleResize() {
        this.setState({
            isNavMenuOpen: false,
        });
    }

    handleScroll() {
        this.setState({
            isScrolled: window.scrollY > 0
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <>
                <SvgResources />
                <NavBar
                    isMenuOpen={this.state.isNavMenuOpen}
                    onMenuToggle={e => this.setState({isNavMenuOpen: e.target.checked})}
                    isPageScrolled={this.state.isScrolled}
                />
                <BioSection />
                <ExpSection tags={tags} />
                <ContactSection />
                <SocialLinks />
                <Footer />
                {this.state.isNavMenuOpen && <div className="blocker"></div>}
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('js-container')).render(<Page />);
