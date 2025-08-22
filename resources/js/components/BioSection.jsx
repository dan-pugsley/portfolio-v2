import React from 'react';
import ImgFadeIn from './ImgFadeIn';
import {startUpdate, clamp, rad2deg} from '../utils';

function TextContent(props) {
    return (
        <div className="bio__text-content">
            <header className="bio__header">
                <h1>{props.title}</h1>
                <span className="subtitle">{props.subtitle}</span>
            </header>
            <div className="bio__desc">{props.children}</div>
        </div>
    );
}

class AvatarTags extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.picRef = React.createRef();
        this.calculateRadius = this.calculateRadius.bind(this);
        this.prevScroll = 0;
        this.angularVel = 0;
        this.angle = 0;
    }

    calculateRadius() {
        this.radius = 0.5 * this.ref.current.offsetWidth;
    }

    update(deltaTime) {
        const data = constants.bio.avatar.tags;

        // Calculate scroll change
        const scroll = window.scrollY;
        const deltaScroll = scroll - this.prevScroll;

        // Convert to angle change, velocity and direction
        const deltaAngle = data.scrollRatio * deltaScroll / this.radius;
        const angularVel = deltaAngle / deltaTime;
        const angularDir = Math.sign(angularVel);

        // If the calculated angular velocity if faster than current,
        // or in opposite direction, modify current to match.
        if (angularDir !== 0 &&
            (angularDir !== Math.sign(this.angularVel) ||
            Math.abs(angularVel) > Math.abs(this.angularVel))) {
            this.angularVel = angularVel;
        }

        // Apply friction
        if (this.angularVel !== 0) {
            const currentAngularDir = Math.sign(this.angularVel);
            this.angularVel -= currentAngularDir * data.friction * Math.sqrt(Math.abs(this.angularVel)) * deltaTime;

            // If angular direction has changed due to friction, clamp to 0.
            if (Math.sign(this.angularVel) !== currentAngularDir)
                this.angularVel = 0;
        }

        // Apply max limit to angular velocity
        this.angularVel = clamp(
            this.angularVel,
            -data.maxAngularVel,
            data.maxAngularVel);

        // Apply angular velocity
        this.angle -= this.angularVel * deltaTime;
        this.picRef.current.style.transform = `rotate(${rad2deg(this.angle)}deg)`;
        this.prevScroll = scroll;
    }

    componentDidMount() {
        this.calculateRadius();
        window.addEventListener('resize', this.calculateRadius);
        this.stopUpdate = startUpdate(this.update.bind(this));
    }

    componentWillUnmount() {
        this.stopUpdate();
        window.removeEventListener('resize', this.calculateRadius);
    }

    render() {
        const data = constants.bio.avatar.tags;
        return (
            <div className="bio-avatar__tags" ref={this.ref}>
                <picture ref={this.picRef}>
                    {/* WARNING: Any changes to these min-width
                        values need to be matched in app.css */}
                    <source media="(min-width: 885px)" srcSet={`${data.imgUrls.large.x1}, ${data.imgUrls.large.x2} 2x`} />
                    <source media="(min-width: 507px)" srcSet={`${data.imgUrls.med.x1}, ${data.imgUrls.med.x2} 2x`} />
                    <ImgFadeIn srcSet={`${data.imgUrls.small.x1}, ${data.imgUrls.small.x2} 2x`} alt={data.imgAlt} />
                </picture>
            </div>
        );
    }
}

function Avatar() {
    const imgUrl = constants.bio.avatar.imgUrl;
    const imgAlt = constants.bio.name;
    return (
        <div className="bio-avatar">
            <div className="bio-avatar__disc"></div>
            <div className="bio-avatar__img-cont">
                <ImgFadeIn srcSet={`${imgUrl.x1}, ${imgUrl.x2} 2x`} alt={imgAlt} />
            </div>
            <AvatarTags />
        </div>
    );
}

function BioSection() {
    const bio = constants.bio;
    return (
        <section id="bio" className="bio tk-lato fade-in">
            <TextContent title={bio.name} subtitle={bio.subtitle}>
                <p>Do you have a highly complex or interactive design that needs building in React? Do you need it built to a very high standard and for it to <em>feel</em> great for users? I specialise in building high-complexity designs to the highest standard. I have a background in video games and private aviation, where I’ve built UI-heavy web apps that run flawlessly and <em>feel</em> great. I love a challenge and can handle anything from huge data dashboards, graphs and calendars to 3D or real-time physics simulation. I only take 1 client at a time to ensure the best service possible. If you think we’d be a good fit, please <a href="mailto:dan@pugs.ly" target="_blank">get in touch</a>. You can also watch a short intro video <a href="https://youtu.be/ZvY_8_S1z-4" target="_blank">here</a>.</p>
            </TextContent>
            <Avatar/>
            <div></div> {/* improves flex layout */}
        </section>
    );
}

export default BioSection;
