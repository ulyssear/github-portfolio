import './index.css'
import React from "react";
import Repository from "../Repository";

function Repositories(props) {

    let {repositories, handleRepositoryClick} = props
    if (!repositories) repositories = []
    if ('string' === typeof repositories) repositories = JSON.parse(repositories)

    return (
        <section className="Repositories">
            {
                0 < repositories.length ? repositories.map(repository => (
                    <Repository key={repository.id} {...repository} handleRepositoryClick={handleRepositoryClick}/>
                )) : (
                    <article>No repository found</article>
                )
            }
        </section>
    )

}

export default Repositories
