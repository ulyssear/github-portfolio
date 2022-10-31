/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers, faMapMarkedAlt, faPaperclip, faAt} from '@fortawesome/free-solid-svg-icons'

import React from "react";

function Profile(props) {

    console.log('Profile', {props})

    // id, node_id, gravatar_id, url, followers_url, following_url, gists_url,
    // starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin,
    const {
        login, avatar_url, html_url, company,
        name, location, bio, handleBackClick, hireable, email
    } = props

    const style = {
        backgroundImage: `url(${avatar_url})`
    }

    return (
        <article className="Profile">
            <div className="avatar" style={style}></div>
            <div className="Profile-description">
                {name ? <div className="username">{name}</div> : null}
                {login ? <a href={html_url}><div className="login">@{login}</div></a> : null}
                {bio ? <div className="bio">{bio}</div> : null}
            </div>
            <div className="Profile-status">
                {email && <div className="email"><FontAwesomeIcon icon={faAt}/>&nbsp;{email}</div>}
                {hireable && <div className="hireable"><FontAwesomeIcon icon={faPaperclip}/>&nbsp;En recherche d'emploi</div>}
                {company ? <div className="company"><FontAwesomeIcon icon={faUsers}/>&nbsp;{company}</div> : null}
                {location ? <div className="location"><FontAwesomeIcon icon={faMapMarkedAlt}/>&nbsp;{location}</div> : null}
            </div>
            <div className="Profile-links">
                <a href="javascript:void(0)" className="active">Repositories</a>
            </div>
            <div className="Profile-footer">
                <button onClick={handleBackClick}>Back</button>
            </div>
        </article>
    )

}

export default Profile
