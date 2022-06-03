import React from 'react';
import ReactDOM from 'react-dom/client';

import SvgResources from './SvgResources';
import NavBar from './NavBar';
import BioSection from './BioSection';
import ExpSection from './ExpSection';
import ContactSection from './ContactSection';
import SocialLinks from './SocialLinks';
import Footer from './Footer';
import {getHrefElement, getScrollOffset} from '../utils';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolled: false,
            isNavBarHidden: false,
            isNavBarMenuOpen: false,
        };
        this.closeNavBarMenu = this.closeNavBarMenu.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.prevTime = 0;
        this.prevScroll = 0;
    }

    handleScroll() {
        if (this.state.isNavBarMenuOpen)
            return;
            
        const time = performance.now();
        const deltaTime = time - this.prevTime;

        const scroll = window.scrollY;
        const deltaScroll = scroll - this.prevScroll;
        const scrollVel = deltaScroll / deltaTime;

        const partialState = {
            isScrolled: scroll > 0
        };
        
        this.setState(prevState => {
            if (!prevState.isNavBarHidden)
                partialState.isNavBarHidden = scrollVel > 0.07;
            else if (scrollVel <= -0.185)
                partialState.isNavBarHidden = false;
            return partialState;
        });

        this.prevTime = time;
        this.prevScroll = scroll;
    }

    componentDidMount() {
        window.addEventListener('resize', this.closeNavBarMenu);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closeNavBarMenu);
        document.removeEventListener('scroll', this.handleScroll);
    }

    closeNavBarMenu() {
        this.setState({
            isNavBarMenuOpen: false,
        });
    }

    handleNavBarLinkClick(e) {
        const hrefEl = getHrefElement(e.target);

        /**
         * If the href element requires scrolling UP, 
         * this will cause the nav-bar to reveal and require 
         * the HTML element to have additional scroll padding.
         */
        if (hrefEl)
            document.documentElement.classList.toggle('nav-scroll-padding', getScrollOffset(hrefEl) < 0);
        
        this.closeNavBarMenu();
    }

    renderBlocker() {
        return <div className="blocker" onClick={this.closeNavBarMenu}></div>;
    }

    render() {
        return (
            <>
                <div id="top"></div>
                <SvgResources />
                <NavBar
                    isHidden={this.state.isNavBarHidden}
                    isPageScrolled={this.state.isScrolled}
                    isMenuOpen={this.state.isNavBarMenuOpen}
                    onMenuToggle={e => this.setState({isNavBarMenuOpen: e.target.checked})}
                    onLinkClick={e => this.handleNavBarLinkClick(e)}
                />
                <BioSection />
                <ExpSection />
                <ContactSection />
                <SocialLinks />
                <Footer />
                {this.state.isNavBarMenuOpen && this.renderBlocker()}
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('js-container')).render(<Page />);
