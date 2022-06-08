import axios from 'axios';
import React from 'react';
import ExpItem from './ExpItem';
import {startUpdate, clamp01, lerp} from '../utils';
import dayjs from 'dayjs';

dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

class Header extends React.Component {
    renderTagOptions() {
        const options = tags.map(data => {
            return <option key={data.id} value={data.id}>{data.name}</option>;
        });
        // Prepend an 'All' option
        options.unshift(<option key={0} value={0}>All</option>);
        return options;
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

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    setProgress(value) {
        this.ref.current.style.setProperty('--progress', value);
    }

    update(deltaTime) {
        const data = constants.exp.loader;
        const normTime = clamp01((this.time - data.startTime) / data.endTime);
        const logTime = Math.log(lerp(1, data.logAmount, normTime));
        const logTimeMax = Math.log(data.logAmount);
        this.setProgress(clamp01(logTime / logTimeMax));
        this.time += deltaTime;
    }

    componentDidMount() {
        this.time = 0;
        this.stopUpdate = startUpdate(this.update.bind(this));
    }

    componentWillUnmount() {
        this.stopUpdate();
        this.setProgress(1);
    }

    render() {
        return (
            <div className="exp-loader fade-in" ref={this.ref}>
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
}

function MoreButton(props) {
    const classNames = ['exp-more-btn', 'btn', 'btn--sec'];
    if (props.isLoading)
        classNames.push('exp-more-btn--loading');
    
    return (
        <button className={classNames.join(' ')} onClick={props.onClick} disabled={props.isDisabled}>
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
            selectedTagId: 0,
            page: 0,
            isLoading: true,
            isLoadingMore: false,
            projects: null,
            canLoadMore: false,
        };
    }

    fetchProjects(append = false) {
        if (this.abortController)
            this.abortController.abort();

        this.abortController = new AbortController();

        const page = append ? this.state.page + 1 : 0;
        const params = {page};
        
        if (this.state.selectedTagId)
            params.tag_id = this.state.selectedTagId;

        axios.get('/api/projects', {
            params,
            signal: this.abortController.signal,
        }).then(res => {
            this.setState(prevState => ({
                page,
                isLoading: false,
                isLoadingMore: false,
                projects: append ? prevState.projects.concat(res.data) : res.data,
                canLoadMore: res.data.length >= constants.exp.pageSize,
            }));
        }).catch(error => {
            this.setState({
                isLoading: false,
                isLoadingMore: false,
            });
            console.error(error.response ? error.response.data.message : error);
        });
    }

    componentDidMount() {
        this.fetchProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTagId !== prevState.selectedTagId)
            this.fetchProjects();
    }

    handleClickMore() {
        this.setState({
            isLoadingMore: true
        });
        this.fetchProjects(true);
    }

    renderItems() {
        return this.state.projects.map(data => {
            // Replace 'role' with 'project' if it doesn't exist.
            const hasRole = !!data.role;
            return (
                <ExpItem
                    key={data.id}
                    id={data.id}
                    role={hasRole ? data.role : data.name}
                    duration={dayjs.duration({days: data.days}).humanize()}
                    company={data.company_name}
                    project={hasRole ? data.name : null}
                    tags={data.tags}
                    githubUrl={data.github_url}
                    liveUrl={data.live_url}
                    descriptionHtml={data.description_html}
                    resources={data.resources}
                />
            );
        });
    }

    renderMoreButton() {
        return (
            <MoreButton
                onClick={() => this.handleClickMore()}
                isLoading={this.state.isLoadingMore}
                isDisabled={this.state.isLoadingMore}
            />
        );
    }
    
    render() {
        return (
            <section id="exp" className="exp tk-lato">
                <Header
                    selectedTagId={this.state.selectedTagId}
                    onTagChange={e => this.setState({selectedTagId: Number(e.target.value), isLoading: true})}
                />
                <hr/>
                <div>
                    {this.state.isLoading ? <Loader /> : this.renderItems()}
                </div>
                <hr/>
                {this.state.canLoadMore && !this.state.isLoading && this.renderMoreButton()}
            </section>
        );
    }
}

export default ExpSection;
