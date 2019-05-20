import React, { Component } from 'react';
import Home from './Home/Home'
import Present from './Present/_Present';
import EditSlideShow from './EditSlideShow/_EditSlideShow'
import './ContentArea.css';
import { PAGES } from '../constants';


class ContentArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {screens} = this.props;
        return (
            <div className="content-area">
                {screens.get(PAGES.Home).visible ? <Home callback={this.props.initialLoad} />:null}
                {screens.get(PAGES.Edit).visible ? <EditSlideShow />:null}
                {screens.get(PAGES.Present).visible ? <Present />:null}

            </div>
        );
    }
}

export default ContentArea;
