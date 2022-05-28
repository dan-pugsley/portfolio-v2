function ButtonLink(props) {
    const classNames = ['btn'];
    classNames.push(props.isSecondary ? 'btn--sec' : 'btn--pri');

    return (
        <a className={classNames.join(' ')} role={props.role} href={props.url} target={props.target}>
            {props.children}
            <span>{props.text}</span>
        </a>
    );
}

export default ButtonLink;
