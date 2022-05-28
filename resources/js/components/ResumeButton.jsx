import ButtonLink from "./ButtonLink";

function ResumeButton(props) {
    return (
        <ButtonLink isSecondary={true} role={props.role} url="#" target="_blank" text="Resume">
            <svg viewBox="0 0 20 20" width="20" fill="none" stroke="#38A186" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.67 1.67H5a1.67 1.67 0 0 0-1.67 1.66v13.34A1.67 1.67 0 0 0 5 18.33h10a1.67 1.67 0 0 0 1.67-1.66v-10l-5-5Zm1.66 12.5H6.67m6.66-3.34H6.67M8.33 7.5H6.67"/>
                <path d="M11.67 1.67v5h5"/>
            </svg>
        </ButtonLink>
    );
}

export default ResumeButton;
