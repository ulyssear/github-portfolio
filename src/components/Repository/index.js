import './index.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faStar, faCodeBranch} from '@fortawesome/free-solid-svg-icons'
import React from "react";


function Repository (props) {

    const {name, description, language, stargazers_count, forks, html_url, handleRepositoryClick} = props

    return (
        <article className="Repository" data-url={html_url} onClick={handleRepositoryClick}>
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
