import './index.css'

function Profile(props) {

    console.log('Profile', {props})

    const {
        login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url,
        starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin,
        name
    } = props

    const style = {
        backgroundImage: `url(${avatar_url})`
    }

    return (
        <article className="Profile">
            <div className="avatar" style={style}></div>
            <div className="username">{name}</div>
        </article>
    )

}

export default Profile
