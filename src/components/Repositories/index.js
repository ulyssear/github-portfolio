import './index.css'
import React from "react";
import Repository from "../Repository";

function Repositories(props) {

    let {repositories, handleRepositoryClick} = props
    if ('string' === typeof repositories) repositories = JSON.parse(repositories)

    return (
        <section className="Repositories">
            {
                !! repositories ? repositories.map(repository => (
                    <Repository key={repository.id} {...repository} handleRepositoryClick={handleRepositoryClick}/>
                )) : (
                    <article>No repository found</article>
                )
            }
        </section>
    )

}

export default Repositories
