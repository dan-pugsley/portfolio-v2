import React from 'react';
import {wrapIndex} from '../utils';

class ScrollArea extends React.Component {
    renderImage(data) {
        return <div key={data.id}><img src={data.url} alt={data.name} /></div>;
    }

    renderVideo(data) {
        return (
            <div key={data.id}>
                <iframe
                    src={data.url}
                    title={data.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }

    renderResources() {
        return this.props.resources.map(data => {
            return data.is_video ? this.renderVideo(data) : this.renderImage(data);
        });
    }

    render() {
        return <div className="exp-item__scroll no-scrollbar">{this.renderResources()}</div>;
    }
}

class ControlsButton extends React.Component {
    getIconPath() {
        return this.props.isPrev ? "M6 1.75 1 7.37 6 13" : "m1 12.25 5-5.63L1 1";
    }

    render() {
        return (
            <button className="circle-btn" onClick={this.props.onClick} disabled={this.props.isDisabled}>
                <div>
                    <svg viewBox="0 0 7 14" width="7">
                        <path fill="none" d={this.getIconPath()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>
        );
    }
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
        this.state = {
            selectedIndex: 0
        };
    }

    handleButtonClick(inc) {
        this.setState((prevState) => ({
            selectedIndex: wrapIndex(prevState.selectedIndex + inc, this.props.resources.length),
        }));
    }

    handleRadioChange(e) {
        this.setState({
            selectedIndex: this.props.resources.findIndex(r => r.id == e.target.value),
        });
    }

    render() {
        return (
            <div className="exp-item__carousel">
                <ScrollArea
                    resources={this.props.resources}
                    selectedIndex={this.state.selectedIndex}
                />
                <Controls
                    items={this.props.resources}
                    radiosName={this.props.radiosName}
                    selectedIndex={this.state.selectedIndex}
                    onButtonClick={inc => this.handleButtonClick(inc)}
                    onRadioChange={e => this.handleRadioChange(e)}
                />  
            </div>
        );
    }
}

export default Carousel;
