import './index.css';

import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'

import Profile from "../Profile";
import Repositories from "../Repositories";

class App extends React.Component {

    static KEY_PROFILE_CACHE = 'github_portfolio_profile_cache'
    static KEY_REPOSITORIES_CACHE = 'github_portfolio_repositories_cache'

    state = {
        profile: localStorage.getItem(App.KEY_PROFILE_CACHE),
        repositories: localStorage.getItem(App.KEY_REPOSITORIES_CACHE)
    }

    constructor(props) {
        super(props)

        this.updateProfile = this.updateProfile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        document.addEventListener('keydown', App.handleDocumentKeypress, false)
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', App.handleDocumentKeypress, false)
    }


    render() {

        const {profile, repositories} = this.state

        return (
            <div className="App">
                <section className="App-section">
                    <section className="App-section-main show">
                        <div className="container">
                            <h1>Select a github profile<br/>to generate a portfolio</h1>
                            <form action="#" name="github-profile">
                                <div className="form-group">
                                    <input type="text" name="username" id="username" placeholder=" "/>
                                    <label htmlFor="username">Pseudo Github</label>
                                </div>
                                <button role="button" type="submit" onClick={this.handleSubmit}><FontAwesomeIcon
                                    icon={faArrowCircleRight}/></button>
                            </form>
                        </div>
                    </section>
                    <section className="App-section-portfolio hide">
                        <aside className="App-section-portfolio-profile">
                            <Profile {...profile} />
                        </aside>
                        <section className="App-section-portfolio-repositories">
                            <h2>Repositories</h2>
                            <Repositories repositories={repositories}/>
                        </section>
                    </section>
                </section>
            </div>
        )
    }

    handleSubmit(event) {
        event.preventDefault();

        const formGithubProfile = document.forms['github-profile']
        const username = formGithubProfile.elements.username.value

        const endpoint = `https://api.github.com/users/${username}`
        fetch(endpoint)
            .then(response => response.json())
            .then(profile => {
                this.updateProfile(profile)
                const {repos_url} = profile

                fetch(repos_url)
                    .then(response => response.json())
                    .then(repositories => {

                        this.updateRepositories(repositories)
                        App.showPortfolioSection()

                    })
                    .catch(reason => console.log)
                /* const {
                    id, node_id, name, full_name, private, owner, html_url, description, fork, url, forks_url, keys_url,
                    collaborators_url, teams_url, hooks_url, issue_events_url, events_url, assignees_url, branches_url,
                    tags_url, blobs_url, git_tags_url, git_refs_url, trees_url, statuses_url, languages_url,
                    stargazers_url, contributors_url, subscribers_url, subscription_url, commits_url, git_commits_url,
                    comments_url, issue_comment_url, contents_url, compare_url, merges_url, archive_url, downloads_url,
                    issues_url, pulls_url, milestones_url, notifications_url, labels_url, releases_url, deployments_url,
                    created_at, updated_at, pushed_at, git_url, ssh_url, clone_url, svn_url, homepage, size,
                    stargazers_count, watchers_count, language, has_issues, has_projects, has_downloads, has_wiki,
                    has_pages, forks_count, mirror_url, archived, disabled, open_issues_count, license, forks,
                    open_issues, watchers, default_branch
                } = repository */
            })
            .catch(reason => console.log)
    }


    updateProfile(profile) {
        console.log('App : updateProfile()', {profile})
        if (!profile) profile = {}
        localStorage.setItem(App.KEY_PROFILE_CACHE, JSON.stringify(profile))
        this.setState({profile})
    }


    updateRepositories(repositories = {}) {
        console.log('App : updateRepositories()', {repositories})
        if (!repositories) repositories = {}
        localStorage.setItem(App.KEY_REPOSITORIES_CACHE, JSON.stringify(repositories))
        this.setState({repositories})
    }


    static showPortfolioSection() {
        const portfolioSection = document.querySelector('.App-section-portfolio')
        portfolioSection.classList.add('show')
        portfolioSection.classList.remove('hide')

        const mainSection = document.querySelector('.App-section-main')
        mainSection.classList.add('hide')
    }


    static showMainSection() {
        const mainSection = document.querySelector('.App-section-main')
        mainSection.classList.add('show')
        mainSection.classList.remove('hide')

        const portfolioSection = document.querySelector('.App-section-portfolio')
        portfolioSection.classList.add('hide')
    }


    static handleDocumentKeypress(event) {
        const {keyCode} = event
        if (27 === keyCode) App.showMainSection()
    }

}

export default App
