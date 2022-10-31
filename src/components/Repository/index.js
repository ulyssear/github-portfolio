import './index.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faStar, faCodeBranch, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import React from "react";


function Repository (props) {

    let {
        name, description, language, stargazers_count, forks, html_url, handleRepositoryClick, fork, private: _private
    } = props

    return (
        <article className="Repository" data-url={html_url} onClick={handleRepositoryClick} data-is-fork={fork}>
            <div className="Repository-labels">
                {
                    fork ? <span className="Repository-labels-fork"><FontAwesomeIcon icon={faCodeBranch}/>&nbsp;Fork</span> : null
                }
                {
                    _private ? <span className="Repository-labels-private"><FontAwesomeIcon icon={faUserSecret}/>&nbsp;Private</span> : null
                }
            </div>
            <span className="Repository-name">{name}</span>
            <span className="Repository-description">{description}</span>
            <div className="Repository-infos">
                <span className="Repository-infos-language"><FontAwesomeIcon icon={faCode}/>&nbsp;{language}</span>
                <span className="Repository-infos-stars"><FontAwesomeIcon icon={faStar}/>&nbsp;{stargazers_count}</span>
                <span className="Repository-infos-stars"><FontAwesomeIcon icon={faCodeBranch}/>&nbsp;{forks}</span>
            </div>
        </article>
    )

}

export default Repository
