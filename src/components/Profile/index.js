import './index.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

import React from "react";

function Profile(props) {

    console.log('Profile', {props})

    const {
        login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, company,
        starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin,
        name, location
    } = props

    const style = {
        backgroundImage: `url(${avatar_url})`
    }

    return (
        <article className="Profile">
            <div className="avatar" style={style}></div>
            {name ? <div className="username">{name}</div> : null}
            {login ? <a href={html_url}><div className="login">@{login}</div></a> : null}
            {company ? <div className="company"><FontAwesomeIcon icon={faUsers}/>&nbsp;{company}</div> : null}
            {location ? <div className="location"><FontAwesomeIcon icon={faMapMarkedAlt}/>&nbsp;{location}</div> : null}
        </article>
    )

}

export default Profile
