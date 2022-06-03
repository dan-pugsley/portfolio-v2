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
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.prevTime = 0;
        this.prevScroll = 0;
    }

    closeNavBarMenu() {
        this.setState({
            isNavBarMenuOpen: false,
        });
    }

    updatePrevWidth() {
        this.prevWidth = window.innerWidth;
    }

    handleResize() {
        if (window.innerWidth !== this.prevWidth)
            this.closeNavBarMenu();

        this.updatePrevWidth();
    }

    handleScroll() {
        if (this.state.isNavBarMenuOpen)
            return;

        const data = constants.navBar;
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
                partialState.isNavBarHidden = scrollVel >= data.hideVel;
            else if (scrollVel <= -data.showVel)
                partialState.isNavBarHidden = false;
            return partialState;
        });

        this.prevTime = time;
        this.prevScroll = scroll;
    }

    handleTouchMove(e) {
        if (this.state.isNavBarMenuOpen)
            e.preventDefault();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('scroll', this.handleScroll);
        document.addEventListener('touchmove', this.handleTouchMove);
        this.updatePrevWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('touchmove', this.handleTouchMove);
    }

    enableDocumentNavScrollPadding(value) {
        document.documentElement.classList.toggle('nav-scroll-padding', value);
    }

    handleNavBarLinkClick(e) {
        const hrefEl = getHrefElement(e.target);

        if (hrefEl) {
            /**
             * If the href element requires scrolling UP, 
             * this will cause the nav-bar to reveal and require 
             * the HTML element to have additional scroll padding.
             */
            const requiresScrollUp = getScrollOffset(hrefEl) < 0;
            this.enableDocumentNavScrollPadding(requiresScrollUp);
        }
        
        this.closeNavBarMenu();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isNavBarMenuOpen !== prevState.isNavBarMenuOpen)
            document.body.classList.toggle('no-scroll', this.state.isNavBarMenuOpen);
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
