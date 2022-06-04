import React from 'react';
import ResumeButton from './ResumeButton';
import ContactButton from './ContactButton';

function Logo(props) {
    return (
        <a className="nav__logo" href="#top" onClick={props.onClick}>
            <svg viewBox="0 0 41 45" width="41">
                <use href="#logo-path" fill="#032F40"/>
            </svg>
        </a>
    );
}

function Link(props) {
    return <a className="nav__link" role={props.role} href={props.url} onClick={props.onClick}>{props.text}</a>;
}

function BioLink(props) {
    return <Link role={props.role} url="#bio" text="Bio" onClick={props.onClick} />;
}

function ExpLink(props) {
    return <Link role={props.role} url="#exp" text="Experience" onClick={props.onClick} />;
}

function Links(props) {
    return (
        <div className="nav__links">
            <BioLink onClick={props.onLinkClick} />
            <ExpLink onClick={props.onLinkClick} />
            <div>
                <ResumeButton />
                <ContactButton />
            </div>
        </div>
    );
}

class MenuToggleAnim extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.start && !prevProps.start)
            this.ref.current.beginElement();
    }

    render() {
        const Tag = this.props.attributeName === 'transform' ? 'animateTransform' : 'animate';
        return (
            <Tag
                ref={this.ref}
                attributeName={this.props.attributeName}
                attributeType="XML"
                type={this.props.type}
                from={this.props.from}
                to={this.props.to}
                dur="200ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0 0 .58 1"
            />
        );
    }
}

function MenuToggle(props) {
    return (
        <label className="nav__menu-btn">
            <input
                className="invisible"
                type="checkbox"
                checked={props.isChecked}
                onChange={props.onChange}
                aria-haspopup="true"
                aria-controls="nav__menu"
            />
            <svg viewBox="0 0 25 19" width="25" fill="#38A186">
                <MenuToggleAnim attributeName="fill" to="#657C85" start={props.isChecked} />
                <MenuToggleAnim attributeName="fill" to="#38A186" start={!props.isChecked} />
                <rect x="0" y="0" width="25" height="3" rx="1" transform="rotate(0 0 0)">
                    <MenuToggleAnim attributeName="x" to="4.72" start={props.isChecked} />
                    <MenuToggleAnim attributeName="y" to="-0.4" start={props.isChecked} />
                    <MenuToggleAnim attributeName="transform" type="rotate" to="45 4.72 -0.4" start={props.isChecked} />
                    <MenuToggleAnim attributeName="x" from="4.72" to="0" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="y" from="-0.4" to="0" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="transform" type="rotate" from="45 4.72 -0.4" to="0 0 0" start={!props.isChecked} />
                </rect>
                <rect x="0" y="8" width="25" height="3" rx="1" transform="rotate(0 0 8)">
                    <MenuToggleAnim attributeName="x" to="12.5" start={props.isChecked} />
                    <MenuToggleAnim attributeName="width" to="0" start={props.isChecked} />
                    <MenuToggleAnim attributeName="opacity" to="0" start={props.isChecked} />
                    <MenuToggleAnim attributeName="x" from="12.5" to="0" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="width" from="0" to="25" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="opacity" from="0" to="1" start={!props.isChecked} />
                </rect>
                <rect x="0" y="16" width="25" height="3" rx="1" transform="rotate(0 0 16)">
                    <MenuToggleAnim attributeName="x" to="2.6" start={props.isChecked} />
                    <MenuToggleAnim attributeName="y" to="17.28" start={props.isChecked} />
                    <MenuToggleAnim attributeName="transform" type="rotate" to="-45 2.6 17.28" start={props.isChecked} />
                    <MenuToggleAnim attributeName="x" from="2.6" to="0" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="y" from="17.28" to="16" start={!props.isChecked} />
                    <MenuToggleAnim attributeName="transform" type="rotate" from="-45 2.6 17.28" to="0 0 16" start={!props.isChecked} />
                </rect>
            </svg>
        </label>
    );
}

function Menu(props) {
    return (
        // https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
        <div id="nav__menu" className="nav__menu" role="menu">
            <BioLink role="menuitem" onClick={props.onLinkClick} />
            <ExpLink role="menuitem" onClick={props.onLinkClick} />
            <div role="none">
                <ResumeButton role="menuitem" />
                <ContactButton role="menuitem" />
            </div>
            <div className="nav__blocker" onClick={props.onBlockerClick}></div>
        </div>
    );
}

function NavBar(props) {
    const classNames = ['nav', 'tk-lato'];

    if (props.isHidden) classNames.push('nav--hidden');
    if (props.isPageScrolled) classNames.push('nav--page-scrolled');
    if (props.isMenuOpen) classNames.push('nav--menu-open');

    return (
        <nav className={classNames.join(' ')}>
            <Logo onClick={props.onLogoClick}/>
            <Links onLinkClick={props.onLinkClick} />
            <MenuToggle
                isChecked={props.isMenuOpen}
                onChange={props.onMenuToggle}
            />
            {props.isMenuOpen && <Menu onLinkClick={props.onLinkClick} onBlockerClick={props.onMenuBlockerClick} />}
        </nav>
    );
}

export default NavBar;
