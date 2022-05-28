import React from 'react';
import ExpItem from './ExpItem';

class Header extends React.Component {
    renderTagOptions() {
        return this.props.tags.map(data => {
            return <option key={data.id} value={data.id}>{data.name}</option>;
        });
    }

    render() {
        return (
            <header className="exp__header">
                <h2>Experience</h2>
                <select
                    className="exp__tag-select tk-source-code-pro"
                    value={this.props.selectedTagId}
                    onChange={this.props.onTagChange}
                >
                    {this.renderTagOptions()}
                </select>
            </header>
        );
    }
}

function Loader(props) {
    return (
        <div className="exp-loader" style={{"--progress": props.progress}}>
            <svg viewBox="0 0 41 45">
                <mask id="exp-loader__mask">
                    <path className="exp-loader__mask-path" transform="translate(0 12)" fill="white" d="M16.5 6.99995C7.3 4.19995 -1.33333 8.16661 -4.5 10.4999V53H43.5C43.4151 36.5 43.4151 32.5 43.4151 6C43.3588 3.33233 42.1803 1.31801 39 0.999977C29 -2.34842e-05 28 10.4999 16.5 6.99995Z"/>
                </mask>
                <use href="#logo-path" fill="#F5F5F5"/>
                <use href="#logo-path" mask="url(#exp-loader__mask)" fill="#032F40"/>
            </svg>
            <span>Loading experience...</span>
        </div>
    );
}

function MoreButton(props) {
    const classNames = ['exp-more-btn', 'btn', 'btn--sec'];

    if (props.isLoading)
        classNames.push('exp-more-btn--loading');
    
    return (
        <button className={classNames.join(' ')}>
            <div>
                <span>Load more</span>
                <svg viewBox="0 0 22 22" width="22" fill="none">
                    <circle cx="11" cy="11" r="9.5" stroke="#F5F5F5" strokeWidth="3"/>
                    <circle className="exp-more-btn__spinner" cx="11" cy="11" r="9.5" strokeWidth="3" strokeDasharray="29.85"/>
                </svg>
            </div>
        </button>
    );
}

class ExpSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTagId: this.props.tags[0].id,
            isLoading: false,
            isLoadingMore: false,
        };
    }

    handleTagChange(e) {
        this.setState({
            selectedTagId: Number(e.target.value),
            isLoading: true,
        });
        // TODO: fetch new data and update
    }

    renderItems() {
        return [
            <ExpItem key="1" radiosName="1" />,
            <ExpItem key="2" radiosName="2" />,
            <ExpItem key="3" radiosName="3" />,
            <ExpItem key="4" radiosName="4" />,
        ];
    }
    
    render() {
        return (
            <section className="exp tk-lato">
                <Header
                    tags={this.props.tags}
                    selectedTagId={this.state.selectedTagId}
                    onTagChange={e => this.handleTagChange(e)}
                />
                <hr/>
                <div className="exp__items">
                    {this.state.isLoading ? <Loader progress={0.5} /> : this.renderItems()}
                </div>
                <hr/>
                <MoreButton isLoading={this.state.isLoadingMore} />
            </section>
        );
    }
}

export default ExpSection;
