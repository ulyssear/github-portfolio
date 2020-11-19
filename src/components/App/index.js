import './index.css';

import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'

import Profile from "../Profile";
import Repositories from "../Repositories";

class App extends React.Component {

    static KEY_PROFILE_CACHE = 'github_portfolio_profile_cache'
    static KEY_REPOSITORIES_CACHE = 'github_portfolio_repositories_cache'
    static KEY_REPOSITORIES_VISIBILITY_CACHE = 'github_portfolio_repositories_visibility_cache'

    state = {
        profile: localStorage.getItem(App.KEY_PROFILE_CACHE),
        repositories: localStorage.getItem(App.KEY_REPOSITORIES_CACHE),
        repositoriesVisibility : localStorage.getItem(App.KEY_REPOSITORIES_VISIBILITY_CACHE)
    }

    constructor(props) {
        super(props)

        this.updateProfile = this.updateProfile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRepositoryClick = this.handleRepositoryClick.bind(this)
        this.handleRepositoriesVisibilityClick = this.handleRepositoriesVisibilityClick.bind(this)
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
                                <small className="error-helper">Unknown user</small>
                            </form>
                        </div>
                    </section>
                    <section className="App-section-portfolio hide">
                        <aside className="App-section-portfolio-profile">
                            <Profile {...profile} handleBackClick={App.handleBackClick}/>
                        </aside>
                        <section className="App-section-portfolio-repositories">
                            <header className="App-section-portfolio-repositories-header">
                                <h2>Repositories</h2>
                                <div className="App-section-portfolio-repositories-actions">
                                    <div className="list-button">
                                        <button className="active" data-value="all" onClick={this.handleRepositoriesVisibilityClick}>All</button>
                                        <button data-value="owns" onClick={this.handleRepositoriesVisibilityClick}>Owns</button>
                                        <button data-value="forks" onClick={this.handleRepositoriesVisibilityClick}>Forks</button>
                                    </div>
                                </div>
                            </header>
                            <Repositories repositories={repositories} handleRepositoryClick={this.handleRepositoryClick}/>
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
                const {message} = profile

                if (!!message && 'Not Found' === message) {
                    App.handleErrorFetch()
                    return
                }

                App.removeClassHasErrorForFormGithubProfile()

                this.updateProfile(profile)
                const {repos_url} = profile

                fetch(repos_url)
                    .then(response => response.json())
                    .then(repositories => {

                        this.updateRepositories(repositories)
                        App.showPortfolioSection()

                    })
                    .catch(reason => console.log)
            })
            .catch(reason => console.error)
    }


    handleRepositoryClick(event) {
        event.preventDefault()

        const {target} = event
        const {url} = target.dataset

        window.location.href = url
    }


    handleRepositoriesVisibilityClick(event) {
        event.preventDefault()

        const {target} = event

        const {value} = target.dataset

        const listButton = target.closest('.list-button')

        const currentActivebutton = listButton.querySelector('button.active')
        if (!!currentActivebutton) currentActivebutton.classList.remove('active')

        target.classList.add('active')

        this.updateRepositoriesVisibility(value)

        App.toggleRepositoriesVisibility()
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


    updateRepositoriesVisibility(repositoriesVisibility = 'all') {
        console.log('App : updateRepositoriesVisibility()', {repositoriesVisibility})
        localStorage.setItem(App.KEY_REPOSITORIES_VISIBILITY_CACHE, repositoriesVisibility)
        this.setState({repositoriesVisibility})
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


    static toggleRepositoriesVisibility() {
        let repositoriesVisibility = localStorage.getItem(App.KEY_REPOSITORIES_VISIBILITY_CACHE)
        if (!repositoriesVisibility) return;

        const repositories = document.querySelectorAll('.Repository')
        for (let repository of repositories) {

            const {isFork} = repository.dataset;

            if ('owns' === repositoriesVisibility && "true" === isFork) {
                repository.classList.add('hide')
                continue
            }

            if ('forks' === repositoriesVisibility && "false" === isFork) {
                repository.classList.add('hide')
                continue
            }

            repository.classList.remove('hide')

        }
    }


    static handleErrorFetch() {
        App.addClassHasErrorForFormGithubProfile()
    }

    static addClassHasErrorForFormGithubProfile() {
        const formGithubProfile = document.forms['github-profile']
        formGithubProfile.classList.add('has-error')
    }

    static removeClassHasErrorForFormGithubProfile() {
        const formGithubProfile = document.forms['github-profile']
        formGithubProfile.classList.remove('has-error')
    }


    static handleBackClick(event) {
        event.preventDefault()

        App.showMainSection()
    }

}

export default App
