import React, { Component } from 'react';
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
        this.handleCallback();
    }

    handleCallback = () => {
        this.props.callback();
    }


    render() {

        return (
            <div className="home" >
                <h1>Welcome to Simply Share Ideas!</h1>
                <br/>
                <br/>
                <br/>
                <div>Create and share presentations!</div>
                <br/>
            </div>
        );
    }
}

export default Home;
