import './index.css'
import React from "react";
import Repository from "../Repository";

function Repositories (props) {

    let {repositories} = props
    if ('string' === typeof repositories) repositories = JSON.parse(repositories)

    console.log({repositories})

    return (
        <section className="Repositories">
            {repositories.map(repository => (
                <Repository key={repository.id} {...repository} />
            ))}
        </section>
    )

}

export default Repositories
