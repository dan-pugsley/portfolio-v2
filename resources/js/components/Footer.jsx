import SocialLinks from './SocialLinks';

function Footer() {
    return (
        <footer className="footer fade-in">
            <small className="tk-lato"><a href={constants.repoUrl} target="_blank">Built by {constants.bio.name}</a></small>
            <SocialLinks />
        </footer>
    );
}

export default Footer;
