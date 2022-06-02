import React from 'react';
import Carousel from './ExpCarousel';

function Header(props) {
    return (
        <header className="exp-item__header">
            <div className="exp-item__role">
                <h3>{props.role}</h3>
                <svg viewBox="0 0 1 14" width="1">
                    <path d="M.5 0v14"/>
                </svg>
                <span className="tk-source-code-pro">{props.duration}</span>
            </div>
            {props.company && <span className="exp-item__company">{props.company}</span>}
        </header>
    );
}

function BarLink(props) {
    return <a className="circle-btn circle-btn--light" href={props.url} target="_blank">{props.children}</a>;
}

class Bar extends React.Component {
    renderGitHubLink(url) {
        return (
            <BarLink url={url}>
                <svg viewBox="0 0 17 19" width="17">
                    <path fill="#38A186" fillRule="evenodd" clipRule="evenodd" d="M6.77 16.5c0 .11-.01.22-.03.32a1.9 1.9 0 0 1-.23.57c-.3.52-.83.86-1.51.86-1.6 0-2.22-.78-3-2.73-.53-1.33-.78-1.64-1.38-1.64v-1.75c1.6 0 2.22.78 3 2.74.53 1.32.78 1.63 1.38 1.63l-.01-.78c-.02-.71-.02-.86.01-1.05.01-.42.12-.71.34-1-1.96-.43-3.27-1.31-4.03-2.73l-.28-.67c-.28-.8-.4-1.7-.4-2.73 0-1.2.36-2.26 1.04-3.15a4.93 4.93 0 0 1 .29-3.06L2.1.95l.4-.13a.6.6 0 0 1 .18-.04c.77-.12 1.86.16 3.28 1.07a11.6 11.6 0 0 1 4.95-.05C12.3.93 13.36.66 14.1.78a.6.6 0 0 1 .2.04l.39.12.15.39c.41 1.03.48 1.98.33 2.8a5.2 5.2 0 0 1 1.2 3.41 9.8 9.8 0 0 1-.3 2.75l-.24.66c-.63 1.42-2.02 2.3-4.16 2.73.23.3.33.62.33 1.07v3.51c-.75 0-1.3-.37-1.57-.94a1.8 1.8 0 0 1-.18-.83v-1.74c0-.07 0-.07-.18-.25-.48-.48-.7-.84-.7-1.5v-.79l.8-.08c2.34-.23 3.61-.88 4.03-1.84l.2-.54c.16-.56.22-1.25.22-2.2 0-1.03-.35-1.87-1.02-2.54l-.38-.38.16-.5a3 3 0 0 0 .02-1.57l-.07.02a6.4 6.4 0 0 0-1.76.88l-.32.22-.38-.1a9.6 9.6 0 0 0-4.83.06l-.4.1-.33-.22a6.57 6.57 0 0 0-1.92-.96c-.17.7-.1 1.26.07 1.7l.2.5-.37.41c-.6.65-.92 1.44-.92 2.37 0 .86.1 1.56.29 2.1l.23.54c.57 1.07 1.79 1.72 3.95 1.95l.79.09V13c0 .66-.22 1.02-.7 1.5-.18.18-.18.18-.18.25l-.02.16v.77a34.67 34.67 0 0 1 .04.82Z"/>
                </svg>
            </BarLink>
        );
    }

    renderLiveLink(url) {
        return (
            <BarLink url={url}>
                <svg viewBox="0 0 17 17" width="17">
                    <path fill="#38A186" fillRule="evenodd" clipRule="evenodd" d="m8.24 10 6.38-6.39v4.02h1.75v-7h-7v1.75h4.02L7 8.75l1.24 1.23Zm6.38 4.63v-4.38h-1.74v4.38H2.38V4.13h4.37V2.38H2.37c-.96 0-1.75.78-1.75 1.75v10.5c0 .96.79 1.74 1.75 1.74h10.5c.97 0 1.76-.78 1.76-1.75Z"/>
                </svg>
            </BarLink>
        );
    }

    render() {
        const classNames = ['exp-item-bar'];
        if (!this.props.project)
            classNames.push('exp-item-bar--no-project');

        return (
            <div className={classNames.join(' ')}>
                <div className="exp-item-bar__content">
                    {this.props.project && <span className="exp-item-bar__project">{this.props.project}</span>}
                    <span className="exp-item-bar__tags tk-source-code-pro ellipsis-multiline">{this.props.tags.join(' / ')}</span>
                </div>
                <div className="exp-item-bar__links">
                    {this.props.githubUrl && this.renderGitHubLink(this.props.githubUrl)}
                    {this.props.liveUrl && this.renderLiveLink(this.props.liveUrl)}
                </div>
            </div>
        )
    }
}

function Description(props) {
    return <div className="exp-item__desc" dangerouslySetInnerHTML={{__html: props.children}}></div>
}

class ExpItem extends React.Component {
    render() {
        return (
            <div className="exp-item">
                <div className="exp-item__info">
                    <Header
                        role={this.props.role}
                        duration={this.props.duration}
                        company={this.props.company}
                    />
                    <Bar
                        project={this.props.project}
                        tags={this.props.tags}
                        githubUrl={this.props.githubUrl}
                        liveUrl={this.props.liveUrl}
                    />
                    <Description>
                        {this.props.descriptionHtml}
                    </Description>
                </div>
                <Carousel
                    radiosName={this.props.id}
                    resources={this.props.resources}
                />
            </div>
        );
    }
}

export default ExpItem;
