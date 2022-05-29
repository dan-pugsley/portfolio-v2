import SocialLinks from './SocialLinks';

function Footer() {
    return (
        <footer className="footer">
            <small className="tk-lato">Built by {constants.bio.name}</small>
            <SocialLinks />
        </footer>
    );
}

export default Footer;
