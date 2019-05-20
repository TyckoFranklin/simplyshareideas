import React, { Component } from 'react';
import './Present.css';
import { overlay } from '../overlay'
import ReactMarkdown from 'react-markdown';
import { sortMapByProperty } from '../../../utilities/sort'


class Present extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainContent: true,
            slideShowId: undefined,
            showSlideshow: false,
            createSlide: {},
            currentSlide: 0,
            previousSlide: 0,
            incoming: "",
            outgoing: "",
        }

    }

    componentDidMount = () => {
        this.fragment = document.createDocumentFragment();
    }

    componentDidUpdate() {
        this.something();
    }

    handleReturn = () => {
        this.setState({ showMainContent: false })
    }

    handleSlidshowClick = (key, owner) => {
        this.setState({
            showMainContent: false,
            showSlideshow: true,
            slideShowId: key
        })
    }

    handleFilterReset = () => {
        this.setState({ filtered: false, filterText: "" });
    }

    handleFilterChange = (e) => {
        this.setState({ filtered: true, filterText: e.target.value });
    }

    handleLeftArrow = () => {
        this.setState({
            currentSlide: this.previousSlide,
            previousSlide: this.state.currentSlide,
            incoming: "from-left",
            outgoing: "from-right",
        })
    }

    handleRightArrow = () => {
        this.setState({
            currentSlide: this.nextSlide,
            previousSlide: this.state.currentSlide,
            incoming: "from-right",
            outgoing: "from-left",
        })
    }

    keydownEventListener = (e) => {
        console.log(e.key);
        if (e.key === "Escape") {
            this.handleEscape();
        }
        if (e.key === "ArrowLeft") {
            this.handleLeftArrow();
        }
        if (e.key === "ArrowRight" || e.key === "Enter") {
            this.handleRightArrow();
        }
    }
    handleEscape = () => {
        window.removeEventListener("keydown", this.keydownEventListener);
        this.setState({
            showMainContent: true,
            slideShowId: undefined,
            showSlideshow: false,
        })

    }

    something = () => {
        if (this.overlayRef) {
            // document.body.appendChild(this.overlayRef);
            document.body.requestFullscreen();
            window.addEventListener("keydown", this.keydownEventListener)
        }
    }

    handleOverlayRef = (ref) => {
        this.overlayRef = ref;
    }

    renderForOverlay = () => {
        let elements = [];
        const sorted = [...sortMapByProperty(this.props.slides, "order").values()].filter((value)=>{
            return value.slideshow &&  value.slideshow.id === this.state.slideShowId;
        });
        this.nextSlide = this.state.currentSlide + 1 < sorted.length ? this.state.currentSlide + 1 : sorted.length - 1;
        this.previousSlide = this.state.currentSlide - 1 > -1 ? this.state.currentSlide - 1 : 0;
        const value = sorted[this.state.currentSlide];
        const value1 = sorted[this.state.previousSlide];
        let config = {};
        try {
            config = JSON.parse(value.config);
        } catch (e) {

        }

        const content = value.files ? value.content.replace("S3IMAGE", this.props.files.get(value.files[0])) : value.content;
        const content1 = value1.files ? value1.content.replace("S3IMAGE", this.props.files.get(value1.files[0])) : value1.content;
        let comingIn = "";
        let goingOut = "";
        let notGoingOutOfBounds = this.state.previousSlide !== this.state.currentSlide;
        if(notGoingOutOfBounds){
            comingIn = this.state.incoming;
            goingOut = this.state.outgoing;
        }

        return (
            <div className="display-container">
                <div className="slide-info">
                    Slide {this.state.currentSlide + 1} of {sorted.length}
                </div>
                {/* {notGoingOutOfBounds ? <div key={`slideshow$1`} className={`display-area outgoing ${goingOut}`}>
                    <ReactMarkdown source={content1} />
                </div> : null } */}
                <div key={`slideshow$`} className={`display-area incoming ${comingIn}`}>
                    <ReactMarkdown source={content} />
                </div>
            </div>
        );
    }

    renderSlideshowList = () => {
        let elements = [];
        if (this.state.createSlideshow) {
            elements.push(
                <div className="slideshow" >
                    <input onChange={this.handleCreateNameChange} value={this.state.createName} />
                    <button onClick={this.handleCreateSlideshow}>Create!</button>
                </div>
            )
        } else {
            for (let [key, value] of this.props.slideshows) {
                if (this.state.filtered && !value.name.toLowerCase().includes(this.state.filterText.toLowerCase())) {
                    continue;
                }
                elements.push(
                    <div key={`slideshow${key}`} className="slideshow" onClick={() => this.handleSlidshowClick(key, value.owner)}>
                        <div className="user-name" >
                            {value.title}
                        </div>
                    </div>
                )
            }
        }
        return elements;
    }

    render() {
        return (
            !this.state.showSlideshow ? <div className="edit-slides">
                <div className="edit-slides-header">
                    <div className="filter" >
                        <label>Filter Name</label>
                        <input type="text" value={this.state.filterText} onChange={this.handleFilterChange}></input>
                    </div>
                    <div className="button filter-button" onClick={this.handleFilterReset}>Reset Filter</div>
                </div>
                <div className="edit-slides-container">
                    {this.state.showMainContent ? this.renderSlideshowList() : null}
                </div>
            </div>
                :
                overlay(this.handleOverlayRef, this.renderForOverlay)
        );
    }
}

export default Present;
