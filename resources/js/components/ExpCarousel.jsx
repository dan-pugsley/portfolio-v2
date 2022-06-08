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
        const srcSet = data.url_2x ? `${data.url_2x} 2x` : null;

        if (data.is_portrait)
            classNames.push('exp-item__resource--portrait');
            
        return (
            <div className={classNames.join(' ')} key={data.id} ref={this.addResourceEl}>
                <LoadingAttrPolyfill onLoad={e => this.handleImgLoad(e)} >
                    <img src={data.url} srcSet={srcSet} alt={data.name} loading="lazy" />
                </LoadingAttrPolyfill>
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
