import React, { Component } from 'react';
import { Provider } from "react-redux";
import './Main.css';
import { withAuthenticator } from 'aws-amplify-react';
import store from '../store/redux/store';
import { PAGES } from './constants';
import SignUp from './SignUp/SignUp'
import SignIn from './SignUp/SignIn'
// import  from 'aws-amplify-react/src/Auth/index'
// import { Auth } from 'aws-amplify';

import Sidebar from './Sidebar/Sidebar'
import ContentArea from './ContentArea/_ContentArea'


class Main extends Component {
    constructor(props) {
        super(props);
        document.title = "Simply Share Ideas";
        this.state = {
            visible: {
                "Home": true
            },
            projects: [],
            screens: new Map([
                [PAGES.Home, { visible: true }],
                [PAGES.Edit, {}],
                [PAGES.Present, {}],
            ]),
        }

    }

    componentDidMount = () => {
        if (this.appHeaderRef) {
            let sectionContainer = document.querySelector("#root > div:nth-of-type(1)");
            let loginDiv = sectionContainer.querySelector("div:nth-of-type(1)");
            loginDiv.style.float = "right";
            sectionContainer.appendChild(this.appHeaderRef);
        }
    }

    componentWillUnmount = () => {
        if (this.appHeaderRef) {
            this.appHeaderRef.parentElement.removeChild(this.appHeaderRef);
        }
    }

    /**
     *
     * @param {string} navTo
     */
    handleNav = (navTo) => {
        const { screens: oScreens } = this.state;
        const screens = new Map();
        for (let [key, value] of oScreens) {
            if (key === navTo) {
                screens.set(key, { ...value, visible: true })
            } else {
                screens.set(key, { ...value, visible: false })
            }
        }
        this.setState({
            screens
        })
    }

    render() {
        const { screens } = this.state;
        return (
            <Provider store={store}>
                <div className="App">
                    <div ref={ref => this.appHeaderRef = ref} className="App-header">
                        <h1 className="App-title">Simply Share Ideas</h1>
                    </div>
                    <Sidebar
                        items={screens}
                        itemCallback={this.handleNav}
                    />
                    <ContentArea
                        screens={screens}
                    />
                </div>
            </Provider>
        );
    }
}

export default withAuthenticator(Main, { includeGreetings: true, });
