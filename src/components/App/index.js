import './index.css';

import React from "react";

class App extends React.Component {


    constructor(props) {
        super(props)

    }


    componentDidMount() {

    }


    componentWillUnmount() {
    }


    render() {

        return (
            <div className="App">
                <section className="App-section">
                    <section className="App-section-main">
                        <div className="container">
                            <h1>Select a github profile<br />to generate a portfolio</h1>
                            <form action="#" name="github-profile">
                                <div className="form-group">
                                    <input type="text" name="username" id="username" placeholder=" " />
                                    <label htmlFor="username">Pseudo Github</label>
                                </div>
                            </form>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

}

export default App
