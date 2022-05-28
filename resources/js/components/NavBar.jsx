import React from 'react';
import ResumeButton from './ResumeButton';
import ContactButton from './ContactButton';
import { className } from 'postcss-selector-parser';

function Logo() {
    return (
        <a className="nav__logo" href="#">
            <svg viewBox="0 0 41 45" width="41">
                <use href="#logo-path" fill="#032F40"/>
            </svg>
        </a>
    );
}

function Link(props) {
    return <a className="nav__link" role={props.role} href={props.url}>{props.text}</a>;
}

function BioLink(props) {
    return <Link role={props.role} url="#" text="Bio" />;
}

function ExpLink(props) {
    return <Link role={props.role} url="#" text="Experience" />;
}

function Links() {
    return (
        <div className="nav__links">
            <BioLink />
            <ExpLink />
            <div>
                <ResumeButton />
                <ContactButton />
            </div>
        </div>
    );
}

function MenuToggle(props) {
    return (
        <label className="nav__menu-btn">
            <input className="invisible" type="checkbox" onChange={props.onChange} aria-haspopup="true" aria-controls="nav__menu"/>
            <svg viewBox="0 0 25 19" width="25" fill="#38A186">
                <rect width="25" height="3" rx="1"/>
                <rect y="8" width="25" height="3" rx="1"/>
                <rect y="16" width="25" height="3" rx="1"/>
            </svg>
            <svg viewBox="0 0 19 20" width="19" fill="#657C85">
                <rect x="1.72" width="25" height="3" rx="1" transform="rotate(45 1.72 0)"/>
                <rect x="19.4" y="2.12" width="25" height="3" rx="1" transform="rotate(135 19.4 2.12)"/>
            </svg>
        </label>
    );
}

function Menu() {
    return (
        // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
        <div id="nav__menu" className="nav__menu" role="menu">
            <BioLink role="menuitem" />
            <ExpLink role="menuitem" />
            <div role="none">
                <ResumeButton role="menuitem" />
                <ContactButton role="menuitem" />
            </div>
        </div>
    );
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
        this.ref = React.createRef();
    }

    render() {
        const classNames = ['nav', 'tk-lato'];

        if (this.props.isPageScrolled)
            classNames.push('nav--scrolling');

        if (this.state.isMenuOpen)
            classNames.push('nav--menu-open');

        return (
            <nav className={classNames.join(' ')}>
                <Logo />
                <Links />
                <MenuToggle onChange={e => this.setState({isMenuOpen: e.target.checked})}/>
                {this.state.isMenuOpen && <Menu />}
            </nav>
        );
    }
}

export default NavBar;
