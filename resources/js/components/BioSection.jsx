import React from 'react';

function Content(props) {
    return (
        <div className="bio__text">
            <header className="bio__header">
                <h1>{props.title}</h1>
                <span className="subtitle">{props.subtitle}</span>
            </header>
            <div className="bio__desc">{props.children}</div>
        </div>
    );
}

class Spinner extends React.Component {
    render() {
        return (
            /**
             * Curved text references:
             * https://css-tricks.com/snippets/svg/curved-text-along-path/
             * https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
             */
            <div className="bio-spinner">
                <div className="bio-spinner__disc"></div>
                <div className="bio-spinner__image">
                    <img src={this.props.imgSrc} alt={this.props.imgAlt}></img>
                </div>
                <div className="bio-spinner__text">
                    <svg viewBox="0 0 100 100">
                        <path id="bio-spinner__text-path" fill="none" d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"/>
                        <text width="100">
                            <textPath xlinkHref="#bio-spinner__text-path">PHP&nbsp;&nbsp;•&nbsp;&nbsp;SQL&nbsp;&nbsp;•&nbsp;&nbsp;JavaScript&nbsp;&nbsp;•&nbsp;&nbsp;CSS&nbsp;&nbsp;•&nbsp;&nbsp;HTML&nbsp;&nbsp;•&nbsp;&nbsp;Node.js&nbsp;&nbsp;•&nbsp;&nbsp;Express.js&nbsp;&nbsp;•&nbsp;vNGINX&nbsp;&nbsp;•&nbsp;&nbsp;AWS&nbsp;&nbsp;•&nbsp;&nbsp;Unity engine&nbsp;&nbsp;•&nbsp;&nbsp;C#&nbsp;&nbsp;•&nbsp;&nbsp;Figma&nbsp;&nbsp;•&nbsp;&nbsp;Adobe XD&nbsp;&nbsp;•&nbsp;&nbsp;C++</textPath>
                        </text>
                    </svg>
                </div>
            </div>
        );
    }
}

class BioSection extends React.Component {
    render() {
        return (
            <section className="bio tk-lato">
                <Content title={bio.name} subtitle={bio.subtitle}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eleifend tortor tempus auctor. Donec varius, velit eu hendrerit volutpat, odio augue sollicitudin dolor, sed efficitur odio diam <a href="#">vitae ante</a>. Ut sit amet cursus neque hendrerit volutpat.</p>
                    <p>Donec varius, velit eu hendrerit volutpat, odio augue sollicitudin dolor, sed efficitur odio.</p>
                </Content>
                <Spinner imgSrc={bio.imgSrc} imgAlt={bio.name} />
                <div></div> {/* helps with flex layout */}
            </section>
        );
    }
}

export default BioSection;
