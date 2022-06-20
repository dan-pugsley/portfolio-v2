function ButtonLink(props) {
    const classNames = ['btn'];
    classNames.push(props.isSecondary ? 'btn--sec' : 'btn--pri');

    const onClick = () => {
        if (props.clickEventName)
            gtag('event', props.clickEventName, {location: props.clickEventLocation});
    };

    return (
        <a
            className={classNames.join(' ')}
            role={props.role}
            href={props.url}
            target={props.target}
            onClick={onClick}
        >
            {props.children}
            <span>{props.text}</span>
        </a>
    );
}

export default ButtonLink;
