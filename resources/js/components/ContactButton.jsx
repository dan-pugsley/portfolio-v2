import ButtonLink from "./ButtonLink";

function ContactButton(props) {
    return (
        <ButtonLink role={props.role} url={`mailto:${constants.emailAddress}`} text="Say hi">
            <svg viewBox="0 0 21 20" width="21" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18.83 1.67-9.16 9.16m9.16-9.16L13 18.33l-3.33-7.5-7.5-3.33 16.66-5.83Z"/>
            </svg>
        </ButtonLink>
    );
}

export default ContactButton;
