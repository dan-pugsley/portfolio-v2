import React from 'react';
import LoadingAttrPolyfill from './LoadingAttrPolyfill';
import {isImgLoaded, wrapIndex} from '../utils';

class ScrollArea extends React.Component {
    constructor(props) {
        super(props);
        this.resourceEls = [];
        this.addResourceEl = el => {
            if (el)
                this.resourceEls.push(el);
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedIndex !== prevProps.selectedIndex
            && this.props.jumpToSelected) {
            this.resourceEls[this.props.selectedIndex].scrollIntoView({
                behaviour: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }

    handleImgLoad(e) {
        const el = e.target;
        if (isImgLoaded(el))
            el.classList.add('fade-in');
    }

    renderImage(data) {
        const classNames = ['exp-item__resource'];
        const emptyIconId = `exp-carousel-img-${data.id}-empty-icon`;
        const srcSet = data.url_2x ? `${data.url_2x} 2x` : null;
        const hasUrl = !!data.url;

        if (data.is_portrait)
            classNames.push('exp-item__resource--portrait');

        return (
            <div
                ref={this.addResourceEl}
                className={classNames.join(' ')}
                key={data.id}
            >
                {hasUrl ? <LoadingAttrPolyfill onLoad={e => this.handleImgLoad(e)} >
                    <img src={data.url} srcSet={srcSet} alt={data.name} loading="lazy" />
                </LoadingAttrPolyfill> : <div className="exp-item__no-img">
                    <svg viewBox="0 0 64 64" width="64" fill="none">
                        <g clipPath={`url(#${emptyIconId})`}>
                            <path d="M59.04 16.49h-9.53L33.71.94a3.3 3.3 0 0 0-4.63 0L13.28 16.5h-9.4c-1.16 0-2.29.45-3.12 1.27a4.32 4.32 0 0 0-1.3 3.08v38.8a4.3 4.3 0 0 0 1.3 3.08A4.46 4.46 0 0 0 3.89 64h55.17c1.17 0 2.3-.46 3.12-1.28a4.32 4.32 0 0 0 1.3-3.07V20.84a4.3 4.3 0 0 0-1.3-3.08 4.43 4.43 0 0 0-3.14-1.27ZM30.75 2.04c.32-.3.21-.46.65-.46.44 0 .33.17.65.46L46.7 16.47H16.1L30.75 2.04Z" fill="#E4E4E4"/>
                            <path d="M59.45 24.18v32.28a3.41 3.41 0 0 1-.38 1.57c-.2.42-.5.79-.84 1.09l-.16.14a3.9 3.9 0 0 1-2.43.82H8.1a4 4 0 0 1-2.43-.82l-.16-.14a3.55 3.55 0 0 1-1.23-2.66V24.18c.02-.98.43-1.9 1.15-2.59a3.8 3.8 0 0 1 2.67-1.03h47.54c1-.02 1.96.35 2.67 1.03a3.66 3.66 0 0 1 1.14 2.59Z" fill="#F5F5F5"/>
                            <path d="M31.87 4.74a2.4 2.4 0 0 0 2.4-2.37A2.4 2.4 0 0 0 31.88 0a2.4 2.4 0 0 0-2.41 2.37 2.4 2.4 0 0 0 2.4 2.37Zm27.58 35.41v16.28a3.46 3.46 0 0 1-.38 1.59c-.2.41-.5.79-.84 1.1l-.16.13a3.9 3.9 0 0 1-2.43.83H8.1c-.88 0-1.74-.29-2.43-.83l-.16-.14a3.58 3.58 0 0 1-1.23-2.68v-1.5c.1-.15.23-.3.38-.4 5.16-3.78 13.24-9.39 15.79-9.39 3.84 0 17.1 3.83 19 2.92 1.38-.65 10.98-5.65 18.61-8.47a1.14 1.14 0 0 1 1.4.56ZM23.3 39a5.05 5.05 0 0 0 5.09-5 5.05 5.05 0 0 0-5.1-5.01 5.05 5.05 0 0 0-5.08 5A5.05 5.05 0 0 0 23.3 39Z" fill="#E4E4E4"/>
                        </g>
                        <defs>
                            <clipPath id={emptyIconId}>
                                <path fill="#fff" d="M0 0h64v64H0z"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Awaiting preview</span>
                </div>}
            </div>
        );
    }

    renderYtEmbed(data) {
        return (
            <div className="exp-item__resource" key={data.id} ref={this.addResourceEl}>
                <LoadingAttrPolyfill>
                    <iframe
                        src={data.url}
                        title={data.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </LoadingAttrPolyfill>
            </div>
        );
    }

    renderResources() {
        return this.props.resources.map(data => {
            return data.is_yt_embed ? this.renderYtEmbed(data) : this.renderImage(data);
        });
    }

    render() {
        return (
            <div
                ref={this.props.innerRef}
                className="exp-item__scroll no-scrollbar"
                onMouseEnter={this.props.onMouseEnter}
                onTouchStart={this.props.onTouchStart}
                onScroll={this.props.onScroll}
            >
                {this.renderResources()}
            </div>
        );
    }
}

function ControlsButton(props) {
    const iconPath = props.isPrev ? "M6 1.75 1 7.37 6 13" : "m1 12.25 5-5.63L1 1";
    return (
        <button className="circle-btn" onClick={props.onClick} disabled={props.isDisabled}>
            <div>
                <svg viewBox="0 0 7 14" width="7">
                    <path fill="none" d={iconPath} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </button>
    );
}

function ControlsRadio(props) {
    return (
        <label>
            <input
                className="invisible"
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.isChecked}
                onChange={props.onChange}
            />
            <div className="exp-item-radios__dot"></div>
        </label>
    );
}

class Controls extends React.Component {
    renderRadios() {
        return this.props.items.map((item, index) => {
            return (
                <ControlsRadio
                    key={item.id}
                    name={this.props.radiosName}
                    value={item.id}
                    isChecked={index === this.props.selectedIndex}
                    onChange={this.props.onRadioChange}
                />
            );
        });
    }

    render() {
        return (
            <div className="exp-item__scroll-nav">
                <ControlsButton isPrev={true} onClick={e => this.props.onButtonClick(-1)} />
                <div className="exp-item-radios">{this.renderRadios()}</div>
                <ControlsButton onClick={e => this.props.onButtonClick(1)} />
            </div>
        );
    }
}

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.scrollAreaRef = React.createRef();
        this.state = {
            selectedIndex: 0,
            showControls: true,
            controlScroll: false,
        };
        this.updateShowControls = this.updateShowControls.bind(this);
    }

    updateShowControls() {
        const scrollArea = this.scrollAreaRef.current;
        this.setState({
            showControls: this.props.resources.length > 1 && scrollArea.scrollWidth > scrollArea.clientWidth
        });
    }

    componentDidMount() {
        this.updateShowControls();
        window.addEventListener('resize', this.updateShowControls);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateShowControls);
    }

    handleScroll(e) {
        const t = e.target;
        const normScrollPos = (t.scrollLeft + 0.5 * t.offsetWidth) / t.scrollWidth;
        const scrollIndex = Math.floor(normScrollPos * this.props.resources.length);

        if (!this.state.controlScroll) {
            this.setState({
                selectedIndex: scrollIndex
            });
        } else if (scrollIndex === this.state.selectedIndex) {
            this.setState({
                controlScroll: false
            });
        }
    }

    handleButtonClick(incr) {
        this.setState(prevState => ({
            selectedIndex: wrapIndex(prevState.selectedIndex + incr, this.props.resources.length),
            controlScroll: true,
        }));
    }

    handleRadioChange(e) {
        this.setState({
            selectedIndex: this.props.resources.findIndex(r => r.id == e.target.value),
            controlScroll: true,
        });
    }

    renderControls() {
        return (
            <Controls
                items={this.props.resources}
                radiosName={this.props.radiosName}
                selectedIndex={this.state.selectedIndex}
                onButtonClick={inc => this.handleButtonClick(inc)}
                onRadioChange={e => this.handleRadioChange(e)}
            />
        );
    }

    render() {
        return (
            <div className="exp-item__carousel">
                <ScrollArea
                    innerRef={this.scrollAreaRef}
                    resources={this.props.resources}
                    selectedIndex={this.state.selectedIndex}
                    jumpToSelected={this.state.controlScroll}
                    onMouseEnter={() => this.setState({controlScroll: false})}
                    onTouchStart={() => this.setState({controlScroll: false})}
                    onScroll={e => this.handleScroll(e)}
                />
                {this.state.showControls && this.renderControls()}
            </div>
        );
    }
}

export default Carousel;
