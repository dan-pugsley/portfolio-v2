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
        this.closeNavMenu = this.closeNavMenu.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('scroll', this.handleScroll);
    }

    closeNavMenu() {
        this.setState({
            isNavMenuOpen: false,
        });
    }

    handleResize() {
        this.closeNavMenu();
    }

    handleScroll(e) {
        this.setState({
            isScrolled: window.scrollY > 0
        });
    }

    render() {
        return (
            <>
                <SvgResources />
                <NavBar
                    isMenuOpen={this.state.isNavMenuOpen}
                    onMenuToggle={e => this.setState({isNavMenuOpen: e.target.checked})}
                    onMenuLinkClick={this.closeNavMenu}
                    isPageScrolled={this.state.isScrolled}
                />
                <BioSection />
                <ExpSection tags={tags} />
                <ContactSection />
                <SocialLinks />
                <Footer />
                {this.state.isNavMenuOpen && <div className="blocker" onClick={this.closeNavMenu}></div>}
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('js-container')).render(<Page />);
